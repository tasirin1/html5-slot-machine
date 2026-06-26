/**
 * Animation Manager — 3-Reel Classic Slot
 * Smooth spin with blur, bounce, glow, particles
 */

// Symbol render data (shared)
const SYM_RENDER = {
  DIAMOND: {
    icon: "💎",
    bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
    color: "#00FFFF",
  },
  SEVEN: {
    icon: "7",
    bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
    color: "#FFD700",
  },
  BAR: {
    icon: "BAR",
    bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
    color: "#FFFFFF",
  },
  BELL: {
    icon: "🔔",
    bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
    color: "#FFD700",
  },
  CHERRY: {
    icon: "🍒",
    bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
    color: "#FFCCCC",
  },
  LEMON: {
    icon: "🍋",
    bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
    color: "#FFFFCC",
  },
  ORANGE: {
    icon: "🍊",
    bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
    color: "#FFFFFF",
  },
  PLUM: {
    icon: "🍑",
    bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
    color: "#FFDDFF",
  },
  WATERMELON: {
    icon: "🍉",
    bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
    color: "#CCFFCC",
  },
  GRAPES: {
    icon: "🍇",
    bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
    color: "#DDCCFF",
  },
};

function render(symId) {
  return SYM_RENDER[symId] || SYM_RENDER.BAR;
}

export default class AnimationManager {
  constructor() {
    this.pool = [];
  }

  /**
   * Spin a single reel with smooth deceleration
   */
  spinReel(reelEl, finalSymbols, duration = 700, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = reelEl.querySelectorAll(".sym");
        if (items.length === 0) {
          resolve();
          return;
        }

        // Add spinning blur
        reelEl.classList.add("spinning");

        const startTime = performance.now();
        const ANIMATION_POOL = [
          "SEVEN",
          "BAR",
          "BELL",
          "CHERRY",
          "LEMON",
          "ORANGE",
          "PLUM",
          "WATERMELON",
          "GRAPES",
          "DIAMOND",
        ];

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          if (progress >= 1) {
            // Stop spinning
            reelEl.classList.remove("spinning");

            // Set final symbols
            for (let i = 0; i < items.length && i < finalSymbols.length; i++) {
              const d = render(finalSymbols[i]);
              this._setSym(items[i], d);
            }

            // Bounce effect
            reelEl.classList.add("bounce");
            setTimeout(() => reelEl.classList.remove("bounce"), 250);

            resolve();
            return;
          }

          // Rapidly cycling symbols during spin (slower as progress increases)
          const speed = Math.max(1, Math.floor((1 - progress) * 20));
          if (
            Math.floor(elapsed / (speed * 20)) !==
            Math.floor((elapsed - 16) / (speed * 20))
          ) {
            for (const el of items) {
              const s =
                ANIMATION_POOL[
                  Math.floor(Math.random() * ANIMATION_POOL.length)
                ];
              const d = render(s);
              this._setSym(el, d);
            }
          }

          requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      }, delay);
    });
  }

  _setSym(el, data) {
    el.textContent = data.icon;
    el.style.background = data.bg;
    el.style.color = data.color;
  }

  /**
   * Highlight winning positions
   */
  highlightWins(positions) {
    // Clear previous
    document.querySelectorAll(".sym.win, .sym.win-glow").forEach((el) => {
      el.classList.remove("win", "win-glow");
    });

    for (const [reelIdx, rowIdx] of positions) {
      const reelEl = document.querySelectorAll(".reel")[reelIdx];
      if (!reelEl) continue;
      const items = reelEl.querySelectorAll(".sym");
      const item = items[rowIdx];
      if (item) {
        item.classList.add("win", "win-glow");
      }
    }
  }

  clearHighlights() {
    document.querySelectorAll(".sym.win, .sym.win-glow").forEach((el) => {
      el.classList.remove("win", "win-glow");
    });
  }

  /**
   * Animate number counting
   */
  countUp(el, target, duration = 500) {
    if (!el) return;
    const start = performance.now();
    const from = parseInt(el.textContent.replace(/[^0-9]/g, "")) || 0;

    const frame = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = Math.floor(from + (target - from) * eased);
      el.textContent = val.toLocaleString("id-ID");
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }

  flashWin(el) {
    if (!el) return;
    el.classList.add("win-flash");
    setTimeout(() => el.classList.remove("win-flash"), 900);
  }

  /**
   * Particle burst from a point
   */
  burst(x, y, color = "#FFD700") {
    const container = document.getElementById("gameScreen");
    if (!container) return;

    for (let i = 0; i < 16; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:${4 + Math.random() * 6}px; height:${4 + Math.random() * 6}px;
        border-radius:50%;
        background:${color};
        pointer-events:none; z-index:999;
        box-shadow:0 0 6px ${color};
      `;
      container.appendChild(p);

      const angle = (i / 16) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 30 + Math.random() * 80;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      p.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${tx}px,${ty}px) scale(0)`, opacity: 0 },
        ],
        { duration: 500 + Math.random() * 300, easing: "ease-out" },
      ).onfinish = () => p.remove();
    }
  }

  pulseSpinBtn(btn) {
    if (!btn) return;
    btn.classList.add("btn-pulse");
    setTimeout(() => btn.classList.remove("btn-pulse"), 300);
  }
}
