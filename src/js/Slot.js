import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import JackpotAPI from "./JackpotAPI.js";

export default class Slot {
  constructor() {
    this.user = null;
    this.pin = null;
    this.money = 0;
    this.bet = 100;
    this.config = null;
    this.spinning = false;

    // DOM
    this.el = {};
    const ids = [
      "loginScreen",
      "gameScreen",
      "loginUser",
      "loginPin",
      "loginBtn",
      "loginError",
      "logoutBtn",
      "playerMoney",
      "betDisplay",
      "winText",
      "playerName",
      "spinBtn",
      "autoplay",
    ];
    for (const id of ids) this.el[id] = document.getElementById(id);

    this.reelElements = document.querySelectorAll(".reel");
    this.reels = Array.from(this.reelElements).map((el) => new Reel(el));

    // Events
    this.el.loginBtn.addEventListener("click", () => this.doLogin());
    this.el.loginPin.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.doLogin();
    });
    this.el.logoutBtn.addEventListener("click", () => this.showLogin());
    this.el.spinBtn.addEventListener("click", () => this.spin());
    this.el.autoplay.addEventListener("change", () => {
      if (this.el.autoplay.checked && !this.spinning) this.autoSpin();
    });

    this.showLogin();
  }

  showLogin() {
    this.el.gameScreen.classList.remove("active");
    this.el.loginScreen.style.display = "flex";
    this.el.loginUser.value = "";
    this.el.loginPin.value = "";
    this.el.loginError.textContent = "";
    this.user = null;
    this.pin = null;
    this.spinning = false;
  }

  async doLogin() {
    const user = this.el.loginUser.value.trim();
    const pin = this.el.loginPin.value.trim();
    if (!user || !pin) {
      this.el.loginError.textContent = "Isi username dan PIN";
      return;
    }

    this.el.loginBtn.disabled = true;
    this.el.loginBtn.textContent = "Connecting...";

    const res = await JackpotAPI.login(user, pin);
    if (!res || !res.success) {
      this.el.loginError.textContent = (res && res.error) || "Login gagal";
      this.el.loginBtn.disabled = false;
      this.el.loginBtn.textContent = "PLAY";
      return;
    }

    this.user = user;
    this.pin = pin;
    this.config = res.config || {
      winRate: 0.15,
      payoutMultiplier: 3,
      startingMoney: 1000,
      betAmount: 100,
    };
    this.money =
      (res.account && res.account.balance) || this.config.startingMoney || 1000;
    this.bet = this.config.betAmount || 100;

    this.el.loginBtn.disabled = false;
    this.el.loginBtn.textContent = "PLAY";
    this.startGame();
  }

  startGame() {
    this.el.loginScreen.style.display = "none";
    this.el.gameScreen.style.display = "";
    this.el.gameScreen.classList.add("active");
    this.el.spinBtn.disabled = false;

    if (this.el.playerName) this.el.playerName.textContent = this.user;
    this.updateUI();
    this.showMsg("Mainkan " + this.user + "!", "#FFD700");
  }

  updateUI() {
    if (this.el.playerMoney)
      this.el.playerMoney.textContent = JackpotAPI.formatNumber(this.money);
    if (this.el.betDisplay)
      this.el.betDisplay.textContent = JackpotAPI.formatNumber(this.bet);
  }

  showMsg(text, color) {
    if (this.el.winText) {
      this.el.winText.textContent = text;
      this.el.winText.style.color = color || "#FFD700";
    }
  }

  async refreshConfig() {
    try {
      const c = await JackpotAPI.fetchConfig();
      if (c && c.winRate) this.config = c;
    } catch (e) {}
  }

  async spin() {
    if (this.spinning || !this.user) return;
    if (this.money < this.bet) {
      this.showMsg("💸 Uang habis! Minta admin isi ulang.", "#ff4444");
      this.el.spinBtn.disabled = true;
      return;
    }

    this.spinning = true;
    this.el.spinBtn.disabled = true;
    this.money -= this.bet;
    this.updateUI();
    this.showMsg("Memutar...", "#888");

    // Sync minus balance
    JackpotAPI.updateBalance(this.user, this.pin, this.money);

    // Refresh config from server
    await this.refreshConfig();

    // Determine win
    const wr = (this.config && this.config.winRate) || 0.15;
    const pm = (this.config && this.config.payoutMultiplier) || 3;
    const win = Math.random() < wr;

    // Generate reel results
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

    // Animate reels
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
        "🎉 MENANG " + JackpotAPI.formatNumber(winnings) + "!",
        "#FFD700",
      );
    } else {
      this.showMsg("", "#888");
    }

    // Sync final balance
    JackpotAPI.updateBalance(this.user, this.pin, this.money);

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
