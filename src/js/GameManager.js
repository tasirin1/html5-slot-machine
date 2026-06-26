/**
 * GameManager — 3-Reel Classic Slot Machine
 *
 * All 3 reels start spinning SIMULTANEOUSLY.
 * Each reel stops at a different time (staggered) with smooth deceleration.
 * RNG determines the result BEFORE any animation begins.
 */

import ReelEngine from "./ReelEngine.js";
import { evaluate, totalWin } from "./Paylines.js";
import { weightedRandom, getRenderData, SYMBOLS } from "./Symbols.js";
import AnimationManager from "./AnimationManager.js";
import JackpotAPI from "./JackpotAPI.js";

// Make SYMBOLS accessible to Paylines
window.__SYMBOLS_DATA = SYMBOLS;

export default class GameManager {
  constructor() {
    this.anim = new AnimationManager();
    this.reels = [];

    // State
    this.state = {
      balance: 10000,
      bet: 100,
      lastWin: 0,
      totalWins: 0,
      spinning: false,
      autoplay: false,
      turbo: false,
      spinCount: 0,
      lossStreak: 0,
      config: null,
    };

    // Grid: [reel][row] = symbol ID
    this.grid = [
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
    ];

    // DOM cache
    this.el = {};

    this.init();
  }

  init() {
    this.cacheDOM();
    this.initReels();
    this.loadConfig();
    this.bindEvents();
    this.showGrid();
    this.updateUI();
    this.showMsg("🎰 SPIN TO WIN");
  }

  cacheDOM() {
    const ids = [
      "gameScreen",
      "playerMoney",
      "betDisplay",
      "betDisplay2",
      "winText",
      "spinBtn",
      "autoplay",
      "turboMode",
      "resetBtn",
      "totalWinDisplay",
      "betDown",
      "betUp",
      "maxBet",
    ];
    for (const id of ids) this.el[id] = document.getElementById(id);
  }

  initReels() {
    const reelEls = document.querySelectorAll(".reel");
    if (!reelEls) return;
    for (const reelEl of reelEls) {
      this.reels.push(new ReelEngine(reelEl, getRenderData, weightedRandom));
    }
  }

  /** Show initial symbols on all reels */
  showGrid() {
    for (let r = 0; r < this.reels.length && r < this.grid.length; r++) {
      this.reels[r].loadStrip(this.grid[r]);
    }
  }

  async loadConfig() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      this.state.config = cfg;
      if (cfg?.betAmount) this.state.bet = cfg.betAmount;
    } catch (_) {}

    const saved = localStorage.getItem("slot777_balance");
    if (saved) {
      this.state.balance = parseInt(saved, 10);
    } else if (this.state.config?.startingMoney) {
      this.state.balance = this.state.config.startingMoney;
    }

    JackpotAPI.saveMoney(this.state.balance);
    this.updateUI();
  }

  bindEvents() {
    this.el.spinBtn?.addEventListener("click", () => this.spin());
    this.el.resetBtn?.addEventListener("click", () => this.resetBalance());
    this.el.betDown?.addEventListener("click", () => this.adjustBet(-50));
    this.el.betUp?.addEventListener("click", () => this.adjustBet(50));
    this.el.maxBet?.addEventListener("click", () => this.maxBet());

    this.el.autoplay?.addEventListener("change", () => {
      this.state.autoplay = this.el.autoplay.checked;
      if (
        this.state.autoplay &&
        !this.state.spinning &&
        this.state.balance >= this.state.bet
      ) {
        this.spin();
      }
    });

    this.el.turboMode?.addEventListener("change", () => {
      this.state.turbo = this.el.turboMode.checked;
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this.state.spinning) {
        e.preventDefault();
        this.spin();
      }
    });

    window.addEventListener("resize", () => {
      for (const reel of this.reels) reel.updateSize();
    });
  }

  adjustBet(delta) {
    const min = 10,
      max = Math.min(10000, this.state.balance);
    this.state.bet = Math.max(min, Math.min(max, this.state.bet + delta));
    this.updateUI();
  }

  maxBet() {
    this.state.bet = Math.min(10000, this.state.balance);
    this.updateUI();
  }

  async resetBalance() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      this.state.config = cfg;
    } catch (_) {}
    this.state.balance = this.state.config?.startingMoney || 10000;
    this.state.lossStreak = 0;
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;
    this.updateUI();
    this.showMsg("💰 BALANCE RESET");
  }

  // ===================== SPIN =====================

  async spin() {
    if (this.state.spinning) return;
    if (this.state.balance < this.state.bet) {
      this.showMsg("💸 BALANCE LOW");
      return;
    }

    this.state.spinning = true;
    this.state.balance -= this.state.bet;
    this.state.spinCount++;
    this.updateUI();
    if (this.el.spinBtn) this.el.spinBtn.disabled = true;

    this.anim.clearHighlights();
    this.anim.pulseSpinBtn(this.el.spinBtn);

    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);

    // ---- RNG: determine result BEFORE animation ----
    const cfg = this.state.config || {};
    const wr = cfg.winRate ?? 0.15;
    const pm = cfg.payoutMultiplier ?? 3;
    const minSpins = cfg.minSpinsBeforeWin ?? 0;

    this.state.lossStreak = this.state.lossStreak || 0;
    let forceWin = false;
    if (minSpins > 0 && this.state.lossStreak >= minSpins) {
      forceWin = true;
      this.state.lossStreak = 0;
    }

    const { grid, wins } = this.generateResult(forceWin ? 1.0 : wr, pm);
    this.grid = grid;
    const total = totalWin(wins);

    const turbo = this.state.turbo;
    this.showMsg(total > 0 ? "🎰 SPINNING!" : "🎰 SPINNING!");

    try {
      // All reels start SPINNING SIMULTANEOUSLY
      // Each has a different duration so they stop at staggered times:
      //   Left:    shortest duration (stops first)
      //   Middle:  medium duration   (stops second)
      //   Right:   longest duration  (stops last)
      const stagger = turbo ? 200 : 280; // ms between reel stops
      const baseDuration = turbo ? 800 : 1200;
      const durations = [
        baseDuration,
        baseDuration + stagger,
        baseDuration + stagger * 2,
      ];

      const promises = [];
      for (let r = 0; r < 3 && r < this.reels.length; r++) {
        const resultCol = this.grid[r] || ["BAR", "BAR", "BAR"];
        promises.push(this.reels[r].spin(resultCol, durations[r]));
      }

      // Wait for all reels to finish (they finish in order: left, middle, right)
      await Promise.all(promises);
    } catch (e) {
      console.error("Spin error:", e);
      this.state.spinning = false;
      if (this.el.spinBtn) this.el.spinBtn.disabled = false;
      this.showMsg("⚠️ ERROR");
      return;
    }

    // ---- WIN EVALUATION ----
    this.state.lastWin = total;
    this.state.totalWins += total;

    if (total > 0) {
      this.state.balance += total;
      this.state.lossStreak = 0;

      const allPos = [];
      for (const w of wins) {
        for (const pos of w.positions) allPos.push(pos);
      }
      this.anim.highlightWins(allPos);

      this.showMsg(`🎉 WIN ${this.fmt(total)}!`, "#FF6B6B");

      if (this.el.totalWinDisplay) {
        this.anim.countUp(this.el.totalWinDisplay, total);
        this.anim.flashWin(this.el.totalWinDisplay);
      }

      if (this.el.spinBtn) {
        const rect = this.el.spinBtn.getBoundingClientRect();
        this.anim.burst(rect.left + rect.width / 2, rect.top);
      }
    } else {
      this.state.lossStreak++;
    }

    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);

    this.state.spinning = false;
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;
    this.updateUI();

    // Auto-spin
    if (this.state.autoplay && this.state.balance >= this.state.bet) {
      setTimeout(() => this.spin(), turbo ? 100 : 400);
    } else {
      if (this.el.autoplay) this.el.autoplay.checked = false;
      this.state.autoplay = false;
    }
  }

  /**
   * Generate RNG result for 3 reels × 3 rows
   */
  generateResult(winChance, pm) {
    const win = Math.random() < winChance;

    if (win) {
      const winSym = weightedRandom();
      const grid = [
        [weightedRandom(), winSym, weightedRandom()],
        [weightedRandom(), winSym, weightedRandom()],
        [weightedRandom(), winSym, weightedRandom()],
      ];

      let wins = evaluate(grid, this.state.bet);
      if (pm && pm !== 1) {
        for (const w of wins) w.amount = Math.floor(w.amount * pm);
      }

      if (wins.length === 0) {
        grid[0][1] = winSym;
        grid[1][1] = winSym;
        grid[2][1] = winSym;
        wins = evaluate(grid, this.state.bet);
        if (pm && pm !== 1) {
          for (const w of wins) w.amount = Math.floor(w.amount * pm);
        }
      }

      return { grid, wins };
    }

    let grid;
    let attempts = 0;
    do {
      grid = [
        [weightedRandom(), weightedRandom(), weightedRandom()],
        [weightedRandom(), weightedRandom(), weightedRandom()],
        [weightedRandom(), weightedRandom(), weightedRandom()],
      ];
      attempts++;
    } while (evaluate(grid, this.state.bet).length > 0 && attempts < 50);

    return { grid, wins: [] };
  }

  // ---- UI ----

  fmt(n) {
    return (n ?? 0).toLocaleString("id-ID");
  }

  updateUI() {
    if (this.el.playerMoney)
      this.el.playerMoney.textContent = this.fmt(this.state.balance);
    if (this.el.betDisplay)
      this.el.betDisplay.textContent = this.fmt(this.state.bet);
    if (this.el.betDisplay2)
      this.el.betDisplay2.textContent = this.fmt(this.state.bet);
  }

  showMsg(text, color) {
    if (this.el.winText) {
      this.el.winText.textContent = text || "";
      this.el.winText.style.color = color || "#D5AD6D";
    }
  }
}
