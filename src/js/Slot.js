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
    this.spinButton = document.getElementById("spin");
    this.autoPlayCheckbox = document.getElementById("autoplay");
    this.configStatus = document.getElementById("configStatus");

    // State
    this.ready = false;
    this.money = 0;
    this.bet = 100;
    this.startingMoney = 1000;
    this.spinCount = 0;
    this.totalWins = 0;
    this.gameConfig = null;

    // Reels
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

    // Spin button
    this.spinButton.addEventListener("click", () => this.spin());

    if (config.inverted) {
      this.container.classList.add("inverted");
    }

    // Initialize: load config from server
    this.init();
  }

  async init() {
    if (this.configStatus) {
      this.configStatus.textContent = "Loading config from server...";
      this.configStatus.style.color = "#ffaa00";
    }

    this.spinButton.disabled = true;

    // Fetch config from server
    this.gameConfig = await JackpotAPI.fetchConfig();

    if (!this.gameConfig) {
      // Fallback if server is down
      if (this.configStatus) {
        this.configStatus.textContent = "⚠️ Server offline, using defaults";
        this.configStatus.style.color = "#ff4444";
      }
      this.gameConfig = {
        difficulty: "Medium",
        winRate: 0.15,
        payoutMultiplier: 3,
        minSpinsBeforeWin: 10,
        startingMoney: 1000,
        betAmount: 100,
      };
    } else {
      if (this.configStatus) {
        this.configStatus.textContent =
          "Difficulty: " + (this.gameConfig.difficulty || "Medium");
        this.configStatus.style.color = "#4CAF50";
      }
    }

    // Initialize money from config
    this.startingMoney = this.gameConfig.startingMoney || 1000;
    this.bet = this.gameConfig.betAmount || 100;
    this.money = this.gameConfig.playerMoney || this.startingMoney;

    this.updateDisplay();
    this.ready = true;
    this.spinButton.disabled = false;

    console.log("Slot machine initialized with config:", this.gameConfig);
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
    if (!this.ready) {
      console.log("Game not ready yet");
      return;
    }

    if (this.money < this.bet) {
      if (this.winMessage) {
        this.winMessage.textContent = "💸 Game Over! Not enough money!";
        this.winMessage.style.color = "#ff4444";
      }
      this.spinButton.disabled = true;
      return;
    }

    // Deduct bet
    this.money -= this.bet;
    this.updateDisplay();

    // Determine win/loss
    this.spinCount++;
    const result = this.determineWin();

    if (result.win) {
      const winnings = Math.floor(this.bet * result.payoutMult);
      this.money += winnings;
      this.totalWins += winnings;

      // Generate winning symbols
      const winSymbol = result.symbol;
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [winSymbol, winSymbol, winSymbol],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];

      if (this.winMessage) {
        this.winMessage.textContent =
          "🎉 YOU WIN! " + JackpotAPI.formatNumber(winnings) + " coins!";
        this.winMessage.style.color = "#D5AD6D";
      }
    } else {
      // Generate losing symbols
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];

      if (this.winMessage) {
        this.winMessage.textContent = "Try again!";
        this.winMessage.style.color = "#888";
      }
    }

    this.currentSymbols = this.nextSymbols;
    this.updateDisplay();

    // Sync money to server (fire & forget)
    JackpotAPI.updatePlayerMoney(this.money);

    this.onSpinStart(this.nextSymbols);

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd(this.nextSymbols));
  }

  determineWin() {
    if (!this.gameConfig) return { win: false };

    const winRate = this.gameConfig.winRate || 0.15;
    const payoutMult = this.gameConfig.payoutMultiplier || 3;
    const minSpins = this.gameConfig.minSpinsBeforeWin || 10;

    // Guaranteed win after minSpins spins (if haven't won recently)
    let willWin = false;
    if (this.spinCount >= minSpins && this.spinCount % minSpins === 0) {
      willWin = true;
    }

    // Random chance based on win rate
    if (!willWin && Math.random() < winRate) {
      willWin = true;
    }

    if (willWin) {
      return {
        win: true,
        payoutMult: payoutMult,
        symbol: Symbol.random(),
      };
    }

    return { win: false };
  }

  onSpinStart(symbols) {
    this.spinButton.disabled = true;
    if (this.winMessage) {
      this.winMessage.textContent = "Spinning...";
      this.winMessage.style.color = "#888";
    }
    this.config.onSpinStart?.(symbols);
  }

  async onSpinEnd(symbols) {
    this.spinButton.disabled = this.money < this.bet || !this.ready;
    this.config.onSpinEnd?.(symbols);

    // Refresh jackpot from server
    try {
      const data = await JackpotAPI.fetchJackpot();
      if (this.jackpotDisplay && data) {
        this.jackpotDisplay.textContent =
          data.formatted || JackpotAPI.formatNumber(data.jackpot);
      }
    } catch (e) {
      // ignore
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
