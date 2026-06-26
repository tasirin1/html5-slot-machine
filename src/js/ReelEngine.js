/**
 * ReelEngine — Real continuous vertical spinning reel
 *
 * Each reel has a virtual strip of symbols. During spin, the strip scrolls
 * vertically using CSS transform: translateY. All reels start simultaneously;
 * each stops at a different time (staggered) with smooth cubic ease-out.
 *
 * The RNG result is determined BEFORE spin and the final offset is calculated
 * so the target symbols land precisely on the payline.
 */

export default class ReelEngine {
  /**
   * @param {HTMLElement} reelEl - The .reel container
   * @param {Function} renderFn - (symId) => { icon, bg, color }
   * @param {Function} randomFn - () => random symbolId
   */
  constructor(reelEl, renderFn, randomFn) {
    this.reelEl = reelEl;
    this.renderFn = renderFn;
    this.randomFn = randomFn;

    this.stripEl = null;
    this.symbolHeight = 50; // will be recalculated
    this.currentOffset = 0;
    this.totalSymbols = 0;
    this.isSpinning = false;

    this._build();
    this._calcSymbolHeight();
  }

  /** Build the strip container inside the reel element */
  _build() {
    this.reelEl.innerHTML = "";
    this.stripEl = document.createElement("div");
    this.stripEl.className = "reel-strip";
    this.stripEl.style.cssText =
      "position:absolute;left:0;right:0;top:0;" +
      "will-change:transform;backface-visibility:hidden;";
    this.reelEl.appendChild(this.stripEl);
  }

  /** Calculate symbol height dynamically */
  _calcSymbolHeight() {
    const h = this.reelEl.clientHeight;
    if (h > 0) this.symbolHeight = h / 3;
  }

  /**
   * Populate the strip DOM with symbol elements
   * @param {string[]} symbolIds
   */
  loadStrip(symbolIds) {
    this.totalSymbols = symbolIds.length;
    this.stripEl.innerHTML = "";
    const fontSize = Math.max(16, Math.min(40, this.symbolHeight * 0.5));

    for (const symId of symbolIds) {
      const d = this.renderFn(symId);
      const div = document.createElement("div");
      div.className = "sym";
      div.textContent = d.icon;
      div.style.cssText = [
        `height:${this.symbolHeight}px`,
        `font-size:${fontSize}px`,
        `background:${d.bg}`,
        `color:${d.color}`,
        "display:flex",
        "align-items:center",
        "justify-content:center",
        "font-weight:800",
        "text-shadow:0 2px 6px rgba(0,0,0,0.5)",
        "border-bottom:1px solid rgba(255,255,255,0.03)",
      ].join(";");
      this.stripEl.appendChild(div);
    }

    this.stripEl.style.height = this.totalSymbols * this.symbolHeight + "px";
    this.currentOffset = 0;
    this.stripEl.style.transform = "translateY(0px)";
  }

  /**
   * Build the spin strip shown during animation.
   * Structure: [random symbols ... | finalSymbols at the end]
   * The final 3 symbols will be visible after stopping.
   */
  buildSpinStrip(finalSymbols, randomCount = 25) {
    const s = [];
    for (let i = 0; i < randomCount; i++) s.push(this.randomFn());
    s.push(...finalSymbols); // [top, middle, bottom]
    return s;
  }

  /**
   * Spin the reel with real continuous scrolling.
   *
   * Phases (combined in one smooth animation):
   *   1. HIGH-SPEED (first 55% of duration) — strip scrolls fast linearly
   *   2. DECELERATION (last 45% of duration) — smooth ease-out to stop
   *
   * The final result symbols land precisely in the visible window.
   *
   * @param {string[]} finalSymbols - [top, middle, bottom]
   * @param {number} duration - Total spin duration in ms
   * @returns {Promise} Resolves when spin is complete
   */
  spin(finalSymbols, duration) {
    return new Promise((resolve) => {
      if (!this.stripEl) {
        resolve();
        return;
      }

      // Determine result BEFORE building strip
      const strip = this.buildSpinStrip(finalSymbols);
      this.loadStrip(strip);

      // Calculate offsets:
      // strip indices: [0 ... randomCount-1 | top, mid, bottom]
      // Show top result at strip index (total-3) in the visible window
      // translateY = -((total-3)-1) * symbolHeight shows indices (total-3, total-2, total-1)
      // Correction: show index (total-3) as top, (total-2) as middle, (total-1) as bottom
      // offset = -(total-3) * symbolHeight
      const stopIndex = this.totalSymbols - 3;
      const stopOffset = -(stopIndex * this.symbolHeight);
      const startOffset = 0;

      const startTime = performance.now();
      this.isSpinning = true;

      const animate = (now) => {
        const elapsed = now - startTime;
        const p = Math.min(elapsed / duration, 1);

        // Easing function:
        // First 55%: fast linear scroll through 88% of the strip
        // Last 45%: smooth ease-out deceleration for final 12%
        let eased;
        if (p < 0.55) {
          eased = (p / 0.55) * 0.88;
        } else {
          const d = (p - 0.55) / 0.45; // deceleration progress 0→1
          eased = 0.88 + 0.12 * (1 - Math.pow(1 - d, 4)); // quart ease-out
        }
        eased = Math.min(eased, 1);

        const offset = startOffset + (stopOffset - startOffset) * eased;
        this.currentOffset = offset;
        this.stripEl.style.transform = `translateY(${offset}px)`;

        if (p < 1) {
          requestAnimationFrame(animate);
        } else {
          // Snap to exact final position
          this.currentOffset = stopOffset;
          this.stripEl.style.transform = `translateY(${stopOffset}px)`;
          this.isSpinning = false;
          resolve();
        }
      };

      requestAnimationFrame(animate);
    });
  }

  /** Update on resize */
  updateSize() {
    this._calcSymbolHeight();
    if (this.stripEl && this.totalSymbols > 0) {
      this.stripEl.style.height = this.totalSymbols * this.symbolHeight + "px";
      const fontSize = Math.max(16, Math.min(40, this.symbolHeight * 0.5));
      const syms = this.stripEl.querySelectorAll(".sym");
      for (const sym of syms) {
        sym.style.height = this.symbolHeight + "px";
        sym.style.fontSize = fontSize + "px";
      }
    }
  }
}
