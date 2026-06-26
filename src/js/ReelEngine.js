/**
 * ReelEngine — Real vertical spinning reel for classic slot machines
 * Uses CSS transform translateY with requestAnimationFrame for smooth animation.
 * Each reel has a strip of symbols that scrolls vertically through a fixed window.
 */

export default class ReelEngine {
  /**
   * @param {HTMLElement} reelEl - The .reel container DOM element
   * @param {Function} renderFn - Function(symbolId) => { icon, bg, color }
   * @param {Function} randomFn - Function() => random symbolId
   */
  constructor(reelEl, renderFn, randomFn) {
    this.reelEl = reelEl;
    this.renderFn = renderFn;
    this.randomFn = randomFn;

    this.stripEl = null;
    this.symbolHeight = 0;
    this.currentOffset = 0;
    this.isSpinning = false;
    this.totalSymbols = 0;

    this._build();
  }

  /**
   * Build the reel strip container inside the reel element
   */
  _build() {
    // Clear reel content
    this.reelEl.innerHTML = "";

    // Create strip container
    this.stripEl = document.createElement("div");
    this.stripEl.className = "reel-strip";
    this.stripEl.style.cssText = `
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      will-change: transform;
      backface-visibility: hidden;
    `;
    this.reelEl.appendChild(this.stripEl);

    // Calculate symbol height based on reel height
    this._calcSymbolHeight();
  }

  /**
   * Calculate symbol height dynamically based on reel container height
   */
  _calcSymbolHeight() {
    const reelHeight = this.reelEl.clientHeight;
    if (reelHeight > 0) {
      this.symbolHeight = reelHeight / 3;
    } else {
      this.symbolHeight = 50; // fallback until container is measured
    }
  }

  /**
   * Create the symbol elements in the strip
   * @param {string[]} symbolIds - Array of symbol IDs defining the strip
   */
  loadStrip(symbolIds) {
    this.totalSymbols = symbolIds.length;
    this.stripEl.innerHTML = "";

    for (const symId of symbolIds) {
      const div = document.createElement("div");
      div.className = "sym";
      const d = this.renderFn(symId);
      div.textContent = d.icon;
      div.style.cssText = `
        background: ${d.bg};
        color: ${d.color};
        height: ${this.symbolHeight}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 800;
        font-size: clamp(18px, 5vw, 40px);
        text-shadow: 0 2px 4px rgba(0,0,0,0.5);
        border-bottom: 1px solid rgba(255,255,255,0.03);
      `;
      this.stripEl.appendChild(div);
    }

    this.stripEl.style.height = this.totalSymbols * this.symbolHeight + "px";
    this.currentOffset = 0;
    this.stripEl.style.transform = "translateY(0px)";
  }

  /**
   * Build a spin strip: random symbols + final result at the end.
   * The visible window after spin ends shows the final 3 symbols.
   * @param {string[]} finalSymbols - [top, middle, bottom] result
   * @param {number} extraCount - Number of extra random symbols before result
   * @returns {string[]} Full strip
   */
  buildSpinStrip(finalSymbols, extraCount = 15) {
    const symbols = [];
    for (let i = 0; i < extraCount; i++) {
      symbols.push(this.randomFn());
    }
    symbols.push(...finalSymbols); // [top, middle, bottom]
    return symbols;
  }

  /**
   * Spin the reel with real vertical animation
   * @param {string[]} finalSymbols - [top, middle, bottom] to land on
   * @param {number} duration - Total spin duration in ms
   * @param {number} delay - Delay before starting spin in ms
   * @returns {Promise} Resolves when spin completes
   */
  spin(finalSymbols, duration = 800, delay = 0) {
    return new Promise((resolve) => {
      if (!this.stripEl || this.totalSymbols === 0) {
        resolve();
        return;
      }

      setTimeout(() => {
        this.isSpinning = true;

        // Build strip with result at the end
        const strip = this.buildSpinStrip(finalSymbols);
        this.loadStrip(strip);

        // Calculate target offset
        // We want the final 3 symbols centered in the visible window
        // Symbol at index (total - 2) = middle result symbol
        // Offset to show index `midIdx` as middle:
        //   offset = -(midIdx - 1) * symbolHeight
        const midIdx = this.totalSymbols - 2; // index of middle result symbol
        const startOffset = 0;
        const endOffset = -((midIdx - 1) * this.symbolHeight);

        // Add extra cycles for visual spin-through
        // The extra distance makes the reel spin more before stopping
        const extraCycles = 3;
        const cycleDistance = (this.totalSymbols - 3) * this.symbolHeight;
        const totalDistance =
          Math.abs(endOffset - startOffset) + extraCycles * cycleDistance;

        // Start from a negative offset to simulate spinning through cycles
        const animStartOffset = -(extraCycles * cycleDistance);
        this.currentOffset = animStartOffset;
        this.stripEl.style.transform = `translateY(${animStartOffset}px)`;

        const startTime = performance.now();

        const animate = (now) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);

          // Ease-out cubic for deceleration (natural slot feel)
          const eased = 1 - Math.pow(1 - progress, 3);

          const offset =
            animStartOffset + (endOffset - animStartOffset) * eased;
          this.currentOffset = offset;
          this.stripEl.style.transform = `translateY(${offset}px)`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            // Ensure exact final position
            this.currentOffset = endOffset;
            this.stripEl.style.transform = `translateY(${endOffset}px)`;
            this.isSpinning = false;
            resolve();
          }
        };

        requestAnimationFrame(animate);
      }, delay);
    });
  }

  /**
   * Reset reel to initial state
   */
  reset() {
    if (this.stripEl) {
      this.currentOffset = 0;
      this.stripEl.style.transform = "translateY(0px)";
    }
    this.isSpinning = false;
  }

  /**
   * Update symbol height (call on resize)
   */
  updateSize() {
    this._calcSymbolHeight();
    if (this.stripEl && this.totalSymbols > 0) {
      // Recalculate strip height
      this.stripEl.style.height = this.totalSymbols * this.symbolHeight + "px";
      const syms = this.stripEl.querySelectorAll(".sym");
      for (const sym of syms) {
        sym.style.height = this.symbolHeight + "px";
      }
      // Re-position
      this.stripEl.style.transform = `translateY(${this.currentOffset}px)`;
    }
  }
}
