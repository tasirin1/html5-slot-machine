/**
 * Animation Manager — handles all visual effects
 */
export default class AnimationManager {
  constructor() {
    this.animating = false;
  }

  /** Animate reel spin with final result */
  async spinReel(reelEl, finalSymbols, duration, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = reelEl.querySelectorAll(".sym");
        if (items.length === 0) return resolve();

        // Add spinning class for blur effect
        reelEl.classList.add("spinning");

        const start = performance.now();
        let frame;

        const animate = (now) => {
          const elapsed = now - start;
          if (elapsed >= duration) {
            reelEl.classList.remove("spinning");
            // Set final symbols with a small bounce
            this.setSymbols(items, finalSymbols);
            reelEl.classList.add("bounce");
            setTimeout(() => reelEl.classList.remove("bounce"), 200);
            resolve();
            return;
          }
          // Show random symbols during spin
          const symKeys = [
            "SEVEN",
            "BAR",
            "BELL",
            "CHERRY",
            "LEMON",
            "ORANGE",
            "PLUM",
            "MELON",
            "GRAPES",
            "WILD",
          ];
          for (const el of items) {
            const s = symKeys[Math.floor(Math.random() * symKeys.length)];
            const data = getSymbolData(s);
            el.textContent = data.icon;
            el.style.background = data.bg;
            el.style.color = data.color;
          }
          frame = requestAnimationFrame(animate);
        };
        frame = requestAnimationFrame(animate);
      }, delay);
    });
  }

  setSymbols(items, symbols) {
    for (let i = 0; i < items.length && i < symbols.length; i++) {
      const data = getSymbolData(symbols[i]);
      items[i].textContent = data.icon;
      items[i].style.background = data.bg;
      items[i].style.color = data.color;
    }
  }

  /** Highlight winning positions on reels */
  highlightWins(winPositions, grid) {
    // Clear all highlights
    document.querySelectorAll(".sym.win, .sym.win-glow").forEach((el) => {
      el.classList.remove("win", "win-glow");
    });

    // Highlight each winning position
    for (const [reel, row] of winPositions) {
      const reelEl = document.querySelectorAll(".reel")[reel];
      if (!reelEl) continue;
      const items = reelEl.querySelectorAll(".sym");
      const item = items[row];
      if (item) {
        item.classList.add("win", "win-glow");
      }
    }
  }

  /** Clear all win highlights */
  clearHighlights() {
    document.querySelectorAll(".sym.win, .sym.win-glow").forEach((el) => {
      el.classList.remove("win", "win-glow");
    });
  }

  /** Animate number counting (for win display) */
  countUp(el, target, duration = 600) {
    if (!el) return;
    const start = performance.now();
    const initial = 0;
    const frame = () => {
      const now = performance.now();
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
      const current = Math.floor(initial + (target - initial) * eased);
      el.textContent = current.toLocaleString("id-ID");
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  /** Flash effect on win amount */
  flashWin(el) {
    if (!el) return;
    el.classList.add("win-flash");
    setTimeout(() => el.classList.remove("win-flash"), 800);
  }

  /** Particle burst effect (simple DOM-based) */
  burst(x, y, color = "#FFD700") {
    const container = document.getElementById("gameScreen");
    if (!container) return;
    for (let i = 0; i < 12; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:6px; height:6px; border-radius:50%;
        background:${color};
        pointer-events:none; z-index:999;
        box-shadow: 0 0 6px ${color};
      `;
      container.appendChild(p);
      const angle = (i / 12) * Math.PI * 2;
      const dist = 40 + Math.random() * 60;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      p.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${tx}px,${ty}px) scale(0)`, opacity: 0 },
        ],
        { duration: 600 + Math.random() * 200, easing: "ease-out" },
      ).onfinish = () => p.remove();
    }
  }

  /** Pulse effect on spin button */
  pulseSpinBtn(btn) {
    if (!btn) return;
    btn.classList.add("btn-pulse");
    setTimeout(() => btn.classList.remove("btn-pulse"), 300);
  }
}

// Symbol data lookup (inline to avoid circular deps)
const SYM_DATA = {
  SEVEN: {
    icon: "7",
    bg: "linear-gradient(135deg,#8B0000,#DC143C,#8B0000)",
    color: "#FFD700",
  },
  BAR: {
    icon: "BAR",
    bg: "linear-gradient(135deg,#1a1a2e,#333,#1a1a2e)",
    color: "#FFFFFF",
  },
  BELL: {
    icon: "🔔",
    bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
    color: "#FFD700",
  },
  CHERRY: {
    icon: "🍒",
    bg: "linear-gradient(135deg,#600,#cc0033,#600)",
    color: "#FFFFFF",
  },
  LEMON: {
    icon: "🍋",
    bg: "linear-gradient(135deg,#3a5000,#6b8e00,#3a5000)",
    color: "#FFFFFF",
  },
  ORANGE: {
    icon: "🍊",
    bg: "linear-gradient(135deg,#803000,#cc5500,#803000)",
    color: "#FFFFFF",
  },
  PLUM: {
    icon: "🍑",
    bg: "linear-gradient(135deg,#400060,#7a00b3,#400060)",
    color: "#FFFFFF",
  },
  MELON: {
    icon: "🍉",
    bg: "linear-gradient(135deg,#004d00,#008000,#004d00)",
    color: "#FFFFFF",
  },
  GRAPES: {
    icon: "🍇",
    bg: "linear-gradient(135deg,#1a003a,#4a0080,#1a003a)",
    color: "#FFFFFF",
  },
  WILD: {
    icon: "⭐",
    bg: "linear-gradient(135deg,#8B4500,#FFD700,#8B4500)",
    color: "#1a0020",
  },
};

function getSymbolData(key) {
  return SYM_DATA[key] || SYM_DATA.SEVEN;
}
