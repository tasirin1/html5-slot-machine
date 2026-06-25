import Reel from "./Reel.js";
import Symbol from "./Symbol.js";
import JackpotAPI from "./JackpotAPI.js";

export default class Slot {
  constructor(config = {}) {
    this.config = config;
    this.ready = false;
    this.money = 0;
    this.bet = 100;
    this.spinCount = 0;
    this.gameConfig = null;
    this.currentUser = null;
    this.currentPin = null;

    // DOM
    this.loginScreen = document.getElementById("loginScreen");
    this.gameScreen = document.getElementById("gameScreen");
    this.loginUser = document.getElementById("loginUser");
    this.loginPin = document.getElementById("loginPin");
    this.loginBtn = document.getElementById("loginBtn");
    this.loginError = document.getElementById("loginError");
    this.logoutBtn = document.getElementById("logoutBtn");
    this.jackpotDisplay = document.getElementById("jp");
    this.moneyDisplay = document.getElementById("playerMoney");
    this.betDisplay = document.getElementById("betDisplay");
    this.winMessage = document.getElementById("winMessage");
    this.winText = document.getElementById("winText");
    this.playerNameDisplay = document.getElementById("playerNameDisplay");
    this.spinButton = document.getElementById("spin");
    this.autoPlayCheckbox = document.getElementById("autoplay");

    // Reels
    this.currentSymbols = Array(3).fill(["seven", "seven", "seven"]);
    this.nextSymbols = Array(3).fill(["seven", "seven", "seven"]);

    this.reels = Array.from(document.querySelectorAll(".reel")).map(
      (el, i) => new Reel(el, i, this.currentSymbols[i]),
    );

    this.spinButton.addEventListener("click", () => this.spin());
    this.logoutBtn.addEventListener("click", () => this.showLogin());

    // Login handler
    this.loginBtn.addEventListener("click", () => this.doLogin());
    this.loginPin.addEventListener("keydown", (e) => {
      if (e.key === "Enter") this.doLogin();
    });

    Symbol.preload();
    this.showLogin();
  }

  showLogin() {
    this.gameScreen.classList.remove("active");
    this.gameScreen.style.display = "none";
    this.loginScreen.style.display = "flex";
    this.loginUser.value = "";
    this.loginPin.value = "";
    this.loginError.textContent = "";
    this.currentUser = null;
    this.currentPin = null;
    this.ready = false;
  }

  async doLogin() {
    const user = this.loginUser.value.trim();
    const pin = this.loginPin.value.trim();

    if (!user || !pin) {
      this.loginError.textContent = "Enter username and PIN";
      return;
    }

    this.loginBtn.disabled = true;
    this.loginBtn.textContent = "Connecting...";
    this.loginError.textContent = "";

    const result = await JackpotAPI.login(user, pin);

    if (!result.success) {
      this.loginError.textContent = result.error || "Login failed";
      this.loginBtn.disabled = false;
      this.loginBtn.textContent = "PLAY";
      return;
    }

    const account = result.account;
    this.gameConfig = result.config || {
      winRate: 0.15,
      payoutMultiplier: 3,
      minSpinsBeforeWin: 10,
      startingMoney: 1000,
      betAmount: 100,
    };

    this.currentUser = user;
    this.currentPin = pin;
    this.money = account.balance || this.gameConfig.startingMoney || 1000;
    this.bet = this.gameConfig.betAmount || 100;
    this.spinCount = 0;

    this.loginBtn.disabled = false;
    this.loginBtn.textContent = "PLAY";

    this.startGame();
  }

  startGame() {
    this.loginScreen.style.display = "none";
    this.gameScreen.style.display = "";
    this.gameScreen.classList.add("active");
    this.ready = true;
    this.spinButton.disabled = false;

    if (this.playerNameDisplay) {
      this.playerNameDisplay.textContent = "👤 " + this.currentUser;
    }

    this.updateDisplay();
    this.setWinMessage("🎰 Good luck " + this.currentUser + "!", "#FFD700");
  }

  updateDisplay() {
    if (this.moneyDisplay)
      this.moneyDisplay.textContent = JackpotAPI.formatNumber(this.money);
    if (this.betDisplay)
      this.betDisplay.textContent = JackpotAPI.formatNumber(this.bet);
    if (this.jackpotDisplay && this.gameConfig) {
      this.jackpotDisplay.textContent =
        this.gameConfig.formattedJackpot ||
        JackpotAPI.formatNumber(this.gameConfig.jackpot || 5555555);
    }
  }

  setWinMessage(text, color) {
    if (this.winText) {
      this.winText.textContent = text;
      this.winText.style.color = color || "#FFD700";
    }
  }

  spin() {
    if (!this.ready) return;

    if (this.money < this.bet) {
      this.setWinMessage("💸 Out of money! Ask admin to refill.", "#ff4444");
      this.spinButton.disabled = true;
      return;
    }

    this.money -= this.bet;
    this.updateDisplay();
    this.spinCount++;

    // Refresh config from admin panel
    this.refreshConfig();

    const result = this.determineWin();

    if (result.win) {
      const winnings = Math.floor(this.bet * result.payoutMult);
      this.money += winnings;

      const sym = result.symbol;
      this.nextSymbols = [
        [sym, sym, sym],
        [sym, sym, sym],
        [sym, sym, sym],
      ];

      this.setWinMessage(
        "🎉 WIN " + JackpotAPI.formatNumber(winnings) + "!",
        "#FFD700",
      );
    } else {
      this.nextSymbols = [
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
        [Symbol.random(), Symbol.random(), Symbol.random()],
      ];
      this.setWinMessage("", "#888");
    }

    this.currentSymbols = this.nextSymbols;
    this.updateDisplay();

    // Sync balance to server (async, don't wait)
    JackpotAPI.updateAccount(this.currentUser, this.currentPin, this.money);

    this.onSpinStart();

    return Promise.all(
      this.reels.map((reel) => {
        reel.renderSymbols(this.nextSymbols[reel.idx]);
        return reel.spin();
      }),
    ).then(() => this.onSpinEnd());
  }

  async refreshConfig() {
    try {
      const config = await JackpotAPI.fetchConfig();
      if (config) this.gameConfig = config;
    } catch (e) {}
  }

  determineWin() {
    if (!this.gameConfig) return { win: false };
    const wr = this.gameConfig.winRate || 0.15;
    const pm = this.gameConfig.payoutMultiplier || 3;

    const willWin = Math.random() < wr;

    if (willWin) return { win: true, payoutMult: pm, symbol: Symbol.random() };
    return { win: false };
  }

  onSpinStart() {
    this.spinButton.disabled = true;
    this.setWinMessage("Spinning...", "#888");
  }

  async onSpinEnd() {
    this.spinButton.disabled = this.money < this.bet || !this.ready;

    // Refresh jackpot and config
    try {
      const data = await JackpotAPI.fetchJackpot();
      await this.refreshConfig();
      if (this.jackpotDisplay && data) {
        this.jackpotDisplay.textContent =
          data.formatted || JackpotAPI.formatNumber(data.jackpot);
      }
    } catch (e) {}

    if (this.autoPlayCheckbox && this.autoPlayCheckbox.checked) {
      if (this.money >= this.bet) {
        setTimeout(() => this.spin(), 200);
      } else {
        this.autoPlayCheckbox.checked = false;
      }
    }
  }
}
