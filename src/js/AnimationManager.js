/**
 * AnimationManager — Win effects, particles, UI animations
 * All reel spinning is handled by ReelEngine
 */

export default class AnimationManager {
  /**
   * Highlight winning positions across all reels
   * @param {Array} positions - Array of [reelIdx, rowIdx]
   */
  highlightWins(positions) {
    document
      .querySelectorAll(".sym.highlight")
      .forEach((el) => el.classList.remove("highlight"));

    for (const [reelIdx, rowIdx] of positions) {
      const reelEl = document.querySelectorAll(".reel")[reelIdx];
      if (!reelEl) continue;
      const strip = reelEl.querySelector(".reel-strip");
      if (!strip) continue;
      const items = strip.querySelectorAll(".sym");
      const item = items[rowIdx];
      if (item) {
        item.classList.add("highlight");
      }
    }
  }

  clearHighlights() {
    document
      .querySelectorAll(".sym.highlight")
      .forEach((el) => el.classList.remove("highlight"));
  }

  /**
   * Animate number counting (ease-out)
   */
  countUp(el, target, duration = 600) {
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

  /**
   * Flash effect on win display element
   */
  flashWin(el) {
    if (!el) return;
    el.classList.add("win-flash");
    setTimeout(() => el.classList.remove("win-flash"), 900);
  }

  /**
   * Button press pulse
   */
  pulseSpinBtn(btn) {
    if (!btn) return;
    btn.classList.add("btn-pulse");
    setTimeout(() => btn.classList.remove("btn-pulse"), 300);
  }

  /**
   * Particle burst
   */
  burst(x, y, color = "#FFD700") {
    const container = document.getElementById("gameScreen");
    if (!container) return;

    for (let i = 0; i < 20; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.cssText = `
        position:fixed; left:${x}px; top:${y}px;
        width:${3 + Math.random() * 6}px; height:${3 + Math.random() * 6}px;
        border-radius:50%;
        background:${color};
        pointer-events:none; z-index:999;
        box-shadow:0 0 6px ${color};
      `;
      container.appendChild(p);

      const angle = (i / 20) * Math.PI * 2 + Math.random() * 0.3;
      const dist = 30 + Math.random() * 100;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;

      p.animate(
        [
          { transform: "translate(0,0) scale(1)", opacity: 1 },
          { transform: `translate(${tx}px,${ty}px) scale(0)`, opacity: 0 },
        ],
        { duration: 600 + Math.random() * 400, easing: "ease-out" },
      ).onfinish = () => p.remove();
    }
  }
}
