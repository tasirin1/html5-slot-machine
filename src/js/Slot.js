import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import JackpotAPI from "./JackpotAPI.js";

export default class Slot {
  constructor(domElement, config = {}) {
    Symbol.preload();

    this.container = domElement;
    this.config = config;

    // DOM elements
    this.jackpotDisplay = document.getElementById("jp");
    this.moneyDisplay = document.getElementById("playerMoney");
    this.betDisplay = document.getElementById("betDisplay");
    this.winMessage = document.getElementById("winMessage");
    this.connectionStatus = document.getElementById("connectionStatus");
    this.spinButton = document.getElementById("spin");
    this.autoPlayCheckbox = document.getElementById("autoplay");

    // State
    this.ready = false;
    this.money = 0;
    this.bet = 100;
    this.startingMoney = 1000;
    this.spinCount = 0;
    this.totalWins = 0;
    this.gameConfig = null;

    // Reels initial state
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

    this.reels = Array.from(this.container.getElementsByClassName("reel")).map(
      (reelContainer, idx) =>
        new Reel(reelContainer, idx, this.currentSymbols[idx]),
    );

    this.spinButton.addEventListener("click", () => this.spin());

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    this.init();
  }

  async init() {
    this.showStatus("Connecting...", "#ffaa00");
    this.spinButton.disabled = true;

    this.gameConfig = await JackpotAPI.fetchConfig();

    if (!this.gameConfig) {
      this.showStatus("Offline", "#ff4444");
      this.gameConfig = {
        difficulty: "Medium",
        winRate: 0.15,
        payoutMultiplier: 3,
        minSpinsBeforeWin: 10,
        startingMoney: 1000,
        betAmount: 100,
      };
    } else {
      this.showStatus("Connected", "#4CAF50");
    }

    this.startingMoney = this.gameConfig.startingMoney || 1000;
    this.bet = this.gameConfig.betAmount || 100;
    this.money = this.gameConfig.playerMoney || this.startingMoney;

    this.updateDisplay();
    this.ready = true;
    this.spinButton.disabled = false;

    console.log("Ready with config:", this.gameConfig);
  }

  showStatus(text, color) {
    if (this.connectionStatus) {
      this.connectionStatus.textContent = text;
      this.connectionStatus.style.color = color || "#888";
    }
  }

  updateDisplay() {
    if (this.jackpotDisplay && this.gameConfig) {
      this.jackpotDisplay.textContent =
        this.gameConfig.formattedJackpot ||
        JackpotAPI.formatNumber(this.gameConfig.jackpot || 5555555);
    }
    if (this.moneyDisplay) {
      this.moneyDisplay.textContent = JackpotAPI.formatNumber(this.money);
    }
    if (this.betDisplay) {
      this.betDisplay.textContent = JackpotAPI.formatNumber(this.bet);
    }
  }

  spin() {
    if (!this.ready) return;
    if (this.money < this.bet) {
      this.setWinMessage("💸 Game Over! Not enough money!", "#ff4444");
      this.spinButton.disabled = true;
      return;
    }

    this.money -= this.bet;
    this.updateDisplay();

    this.spinCount++;
    const result = this.determineWin();

    if (result.win) {
      const winnings = Math.floor(this.bet * result.payoutMult);
      this.money += winnings;
      this.totalWins += winnings;

      const winSymbol = result.symbol;
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];

      this.setWinMessage(
        "🎉 YOU WIN! " + JackpotAPI.formatNumber(winnings) + " coins!",
        "#D5AD6D",
      );
    } else {
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];

      this.setWinMessage("Try again!", "#888");
    }

    this.currentSymbols = this.nextSymbols;
    this.updateDisplay();

    JackpotAPI.updatePlayerMoney(this.money);

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  setWinMessage(text, color) {
    if (this.winMessage) {
      this.winMessage.innerHTML =
        "<span>" + text + '</span><span id="connectionStatus"></span>';
      this.connectionStatus = document.getElementById("connectionStatus");
      if (this.ready && this.connectionStatus) {
        this.connectionStatus.textContent = "Connected";
        this.connectionStatus.style.color = "#4CAF50";
      }
    }
  }

  determineWin() {
    if (!this.gameConfig) return { win: false };

    const winRate = this.gameConfig.winRate || 0.15;
    const payoutMult = this.gameConfig.payoutMultiplier || 3;
    const minSpins = this.gameConfig.minSpinsBeforeWin || 10;

    let willWin = false;
    if (this.spinCount >= minSpins && this.spinCount % minSpins === 0) {
      willWin = true;
    }
    if (!willWin && Math.random() < winRate) {
      willWin = true;
    }

    if (willWin) {
      return { win: true, payoutMult: payoutMult, symbol: Symbol.random() };
    }
    return { win: false };
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;
    this.setWinMessage("Spinning...", "#888");
    this.config.onSpinStart?.(symbols);
  }

  async onSpinEnd(symbols) {
    this.spinButton.disabled = this.money < this.bet || !this.ready;
    this.config.onSpinEnd?.(symbols);

    try {
      const data = await JackpotAPI.fetchJackpot();
      if (this.jackpotDisplay && data) {
        this.jackpotDisplay.textContent =
          data.formatted || JackpotAPI.formatNumber(data.jackpot);
      }
    } catch (e) {
      /* ignore */
    }

    if (this.autoPlayCheckbox && this.autoPlayCheckbox.checked) {
      if (this.money >= this.bet) {
        return window.setTimeout(() => this.spin(), 200);
      } else {
        this.autoPlayCheckbox.checked = false;
      }
    }
  }
}
