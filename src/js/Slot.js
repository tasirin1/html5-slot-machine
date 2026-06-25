import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import JackpotAPI from "./JackpotAPI.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();
    this.jackpotDisplay = document.getElementById("jp");

    this.currentSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.nextSymbols = [
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
      ["death_star", "death_star", "death_star"],
    ];

    this.container = domElement;

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx]),
    );

    this.spinButton = document.getElementById("spin");
    this.spinButton.addEventListener("click", () => this.spin());

    this.autoPlayCheckbox = document.getElementById("autoplay");
    this.spinCount = 0;
    this.gameConfig = null;

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.config = config;

    // Fetch config and jackpot from server
    this.loadConfig();
  }

  async loadConfig() {
    this.gameConfig = await JackpotAPI.fetchConfig();
    this.updateJackpotDisplay();
  }

  updateJackpotDisplay() {
    if (this.jackpotDisplay && this.gameConfig) {
      this.jackpotDisplay.textContent =
        this.gameConfig.formattedJackpot ||
        JackpotAPI.formatNumber(this.gameConfig.jackpot || 5555555);
    }
  }

  spin() {
    this.spinCount++;

    // Determine if this spin should be a win based on server config
    const willWin = this.shouldWin();

    if (willWin) {
      // Player wins: generate matching symbols
      const winSymbol = Symbol.random();
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];
    } else {
      // Player loses: generate all random symbols
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];
    }

    this.currentSymbols = this.nextSymbols;

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  shouldWin() {
    if (!this.gameConfig) return false;

    const winRate = this.gameConfig.winRate || 0.15;
    const minSpins = this.gameConfig.minSpinsBeforeWin || 10;

    // Guaranteed win after minimum spins
    if (this.spinCount >= minSpins && this.spinCount % minSpins === 0) {
      return true;
    }

    // Random chance based on win rate
    return Math.random() < winRate;
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;
    this.config.onSpinStart?.(symbols);
  }

  async onSpinEnd(symbols) {
    this.spinButton.disabled = false;
    this.config.onSpinEnd?.(symbols);

    // Refresh jackpot from server after each spin
    const data = await JackpotAPI.fetchJackpot();
    if (this.jackpotDisplay) {
      this.jackpotDisplay.textContent =
        data.formatted || JackpotAPI.formatNumber(data.jackpot);
    }

    if (this.autoPlayCheckbox.checked) {
      return window.setTimeout(() => this.spin(), 200);
    }
  }
}
