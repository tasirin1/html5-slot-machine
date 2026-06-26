/**
 * GameManager — 3-Reel Classic Slot Machine
 * Orchestrates real mechanical reel spinning, RNG, paylines, balance, UI
 */

import ReelEngine from "./ReelEngine.js";
import { evaluate, totalWin } from "./Paylines.js";
import {
  weightedRandom,
  buildReelStrips,
  getRenderData,
  SYMBOLS,
} from "./Symbols.js";
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
      balance: 1000,
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
    this.renderInitial();
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
    for (const id of ids) {
      this.el[id] = document.getElementById(id);
    }
  }

  initReels() {
    const reelEls = document.querySelectorAll(".reel");
    if (!reelEls || reelEls.length === 0) return;

    for (const reelEl of reelEls) {
      const engine = new ReelEngine(reelEl, getRenderData, weightedRandom);
      this.reels.push(engine);
    }
  }

  /**
   * Show initial symbols on all reels
   */
  renderInitial() {
    for (let r = 0; r < this.reels.length && r < this.grid.length; r++) {
      const col = this.grid[r];
      // First spin will populate properly; for now build a strip
      const strip = [...col]; // just the 3 result symbols
      this.reels[r].loadStrip(strip);
    }
  }

  async loadConfig() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      this.state.config = cfg;
      if (cfg && cfg.betAmount) this.state.bet = cfg.betAmount;
    } catch (_) {}

    const saved = localStorage.getItem("slot777_balance");
    if (saved) {
      this.state.balance = parseInt(saved, 10);
    } else if (this.state.config && this.state.config.startingMoney) {
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

    // Handle resize
    window.addEventListener("resize", () => {
      for (const reel of this.reels) {
        reel.updateSize();
      }
    });
  }

  adjustBet(delta) {
    const min = 10;
    const max = Math.min(10000, this.state.balance);
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
    this.state.balance = this.state.config?.startingMoney || 1000;
    this.state.lossStreak = 0;
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;
    this.updateUI();
    this.showMsg("💰 BALANCE RESET");
  }

  // ---- SPIN LOGIC ----

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

    // RNG: determine result BEFORE animation
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

    // Spin parameters
    const baseDuration = turbo ? 500 : 1000;
    const stagger = turbo ? 120 : 250;

    this.showMsg(total > 0 ? "🎰 SPINNING!" : "🎰 SPINNING!");

    try {
      // Ensure reels are ready
      if (this.reels.length < 3) {
        throw new Error("Reels not initialized");
      }

      // Spin each reel sequentially: left → middle → right
      for (let r = 0; r < 3 && r < this.reels.length; r++) {
        const resultCol = this.grid[r] || ["BAR", "BAR", "BAR"];
        const duration = baseDuration + r * 200; // each subsequent reel spins slightly longer
        await this.reels[r].spin(resultCol, duration, r === 0 ? 0 : stagger);
      }
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

      // Highlight wins
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

      // Particles
      if (this.el.spinBtn) {
        const rect = this.el.spinBtn.getBoundingClientRect();
        this.anim.burst(rect.left + rect.width / 2, rect.top);
      }
    } else {
      this.state.lossStreak++;
    }

    // Save balance
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
   * Generate RNG result for 3 reels x 3 rows
   */
  generateResult(winChance, pm) {
    const win = Math.random() < winChance;

    if (win) {
      // Force at least one winning payline
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
        // Force middle line win
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

    // No win — generate non-winning grid
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
