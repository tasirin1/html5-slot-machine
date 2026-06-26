import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import JackpotAPI from "./JackpotAPI.js";

export default class Slot {
  constructor() {
    this.money = 0;
    this.bet = 100;
    this.config = null;
    this.spinning = false;
    this.spinCount = 0;
    this.lossStreak = 0;

    // DOM
    this.el = {};
    const ids = [
      "gameScreen",
      "playerMoney",
      "betDisplay",
      "betDisplay2",
      "winText",
      "winBox",
      "spinBtn",
      "autoplay",
      "resetBtn",
    ];
    for (const id of ids) this.el[id] = document.getElementById(id);

    this.reelElements = document.querySelectorAll(".reel");
    this.reels = Array.from(this.reelElements).map((el) => new Reel(el));

    // Events
    this.el.spinBtn.addEventListener("click", () => this.spin());
    if (this.el.resetBtn) {
      this.el.resetBtn.addEventListener("click", () => this.resetMoney());
    }
    this.el.autoplay.addEventListener("change", () => {
      if (this.el.autoplay.checked && !this.spinning && this.money >= this.bet)
        this.spin();
    });

    this.init();
  }

  async init() {
    // Fetch config and money from server
    const config = await JackpotAPI.fetchConfig();
    this.config = config || {
      winRate: 0.15,
      payoutMultiplier: 3,
      startingMoney: 1000,
      betAmount: 100,
    };
    this.bet = this.config.betAmount || 100;

    // Load saved money or use default
    const saved = localStorage.getItem("slot777_money");
    if (saved !== null) {
      this.money = parseInt(saved, 10) || this.config.startingMoney || 1000;
    } else {
      this.money = this.config.startingMoney || 1000;
    }

    // Sync money to server
    JackpotAPI.saveMoney(this.money);

    // Init reels with random symbols
    const initSymbols = this.reels.map(() => [
      Symbol.random(),
      Symbol.random(),
      Symbol.random(),
    ]);
    this.reels.forEach((reel, i) => reel.setSymbols(initSymbols[i]));

    this.updateUI();
    this.showMsg("🎰 SPIN TO WIN", "#FFD700");
    this.showWin(0);
  }

  async resetMoney() {
    const config = await JackpotAPI.fetchConfig();
    this.config = config || this.config;
    this.money = (config && config.startingMoney) || 1000;
    this.bet = (config && config.betAmount) || 100;
    localStorage.setItem("slot777_money", this.money);
    JackpotAPI.saveMoney(this.money);
    this.updateUI();
    this.showMsg("💰 BALANCE RESET", "#4CAF50");
    this.showWin(0);
  }

  updateUI() {
    if (this.el.playerMoney)
      this.el.playerMoney.textContent = JackpotAPI.formatNumber(this.money);
    if (this.el.betDisplay)
      this.el.betDisplay.textContent = JackpotAPI.formatNumber(this.bet);
    if (this.el.betDisplay2)
      this.el.betDisplay2.textContent = JackpotAPI.formatNumber(this.bet);
  }

  showMsg(text, color) {
    if (this.el.winText) {
      this.el.winText.textContent = text;
      this.el.winText.style.color = color || "#FFD700";
    }
  }

  showWin(amount) {
    if (this.el.winBox) {
      this.el.winBox.textContent =
        amount > 0 ? JackpotAPI.formatNumber(amount) : "—";
      this.el.winBox.style.color =
        amount > 0 ? "#FF6B6B" : "rgba(155,148,180,0.4)";
    }
  }

  async refreshConfig() {
    try {
      const c = await JackpotAPI.fetchConfig();
      if (c && c.winRate) this.config = c;
    } catch (e) {}
  }

  async spin() {
    if (this.spinning) return;
    if (this.money < this.bet) {
      this.showMsg("💸 Uang habis! Klik ↻ untuk reset.", "#ff4444");
      this.el.spinBtn.disabled = true;
      return;
    }

    this.spinning = true;
    this.el.spinBtn.disabled = true;
    this.money -= this.bet;
    this.updateUI();
    this.showMsg("Memutar...", "#888");

    await this.refreshConfig();

    const wr = (this.config && this.config.winRate) || 0.15;
    const pm = (this.config && this.config.payoutMultiplier) || 3;
    const minSpins = (this.config && this.config.minSpinsBeforeWin) || 0;

    this.lossStreak = this.lossStreak || 0;
    let win;
    if (minSpins > 0 && this.lossStreak >= minSpins) {
      win = true;
      this.lossStreak = 0;
    } else {
      win = Math.random() < wr;
      if (win) this.lossStreak = 0;
      else this.lossStreak++;
    }
    this.spinCount++;

    let resultSymbols;
    let winnings = 0;
    if (win) {
      const sym = Symbol.random();
      resultSymbols = [
        [this.randExcept(sym), sym, this.randExcept(sym)],
        [this.randExcept(sym), sym, this.randExcept(sym)],
        [this.randExcept(sym), sym, this.randExcept(sym)],
      ];
      const mult = Symbol.getData(sym).mult * pm;
      winnings = Math.floor(this.bet * mult);
      this.money += winnings;
    } else {
      resultSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];
    }

    const delays = [0, 150, 300];
    const promises = this.reels.map(
      (reel, i) =>
        new Promise((resolve) => {
          setTimeout(() => {
            reel.spin(resultSymbols[i]).then(resolve);
          }, delays[i]);
        }),
    );

    await Promise.all(promises);

    this.updateUI();
    if (win) {
      this.showMsg(
        "🎉 WIN " + JackpotAPI.formatNumber(winnings) + "!",
        "#FFD700",
      );
      this.showWin(winnings);
    } else {
      this.showMsg("", "#888");
      this.showWin(0);
    }

    // Save money
    localStorage.setItem("slot777_money", this.money);
    JackpotAPI.saveMoney(this.money);

    this.spinning = false;
    this.el.spinBtn.disabled = this.money < this.bet;

    if (this.el.autoplay.checked && this.money >= this.bet) {
      setTimeout(() => this.spin(), 300);
    } else {
      this.el.autoplay.checked = false;
    }
  }

  randExcept(exclude) {
    let s;
    do {
      s = Symbol.random();
    } while (s === exclude);
    return s;
  }
}
