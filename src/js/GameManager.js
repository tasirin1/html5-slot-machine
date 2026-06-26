/**
 * GameManager — 3-Reel Classic Slot Machine
 *
 * Orchestrates real reel spinning, RNG, paylines, balance, UI.
 * Receives real-time config updates via RealtimeManager.
 */

import ReelEngine from "./ReelEngine.js";
import { evaluate, totalWin } from "./Paylines.js";
import { weightedRandom, getRenderData, SYMBOLS } from "./Symbols.js";
import AnimationManager from "./AnimationManager.js";
import JackpotAPI from "./JackpotAPI.js";
import RealtimeManager from "./RealtimeManager.js";

window.__SYMBOLS_DATA = SYMBOLS;

export default class GameManager {
  constructor() {
    this.anim = new AnimationManager();
    this.reels = [];
    this.realtime = null;

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
      config: {},
    };

    this.grid = [
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
    ];

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

    // Start real-time sync AFTER game is initialized
    setTimeout(() => {
      this.realtime = new RealtimeManager(this);
    }, 100);
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

  showGrid() {
    for (let r = 0; r < this.reels.length && r < this.grid.length; r++) {
      this.reels[r].loadStrip(this.grid[r]);
    }
  }

  async loadConfig() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      if (cfg) {
        this.state.config = cfg;
        if (cfg.betAmount) this.state.bet = cfg.betAmount;
      }
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
      if (cfg) this.state.config = cfg;
    } catch (_) {}
    this.state.balance = this.state.config?.startingMoney || 10000;
    this.state.lossStreak = 0;
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;
    this.updateUI();
    this.showMsg("💰 BALANCE RESET");
  }

  // =====================
  // REAL-TIME EVENT HANDLERS
  // Called by RealtimeManager when server pushes changes
  // =====================

  /**
   * Config changed — update all game parameters immediately.
   * These take effect on the NEXT spin (no need to reload).
   */
  onConfigChanged(config) {
    if (!config) return;
    this.state.config = config;
    console.log("[Game] Config updated via WebSocket:", config);
    this.showMsg("⚙️ CONFIG UPDATED", "#D5AD6D");
    // Config is read on next spin — no reload needed
  }

  /**
   * Jackpot changed — update jackpot display immediately.
   */
  onJackpotChanged(value) {
    console.log("[Game] Jackpot updated:", value);
    // Update jackpot display if we have one
    const jpEl = document.getElementById("jackpotDisplay");
    if (jpEl) {
      const fmt = (value || 0).toLocaleString("id-ID");
      jpEl.textContent = fmt;
      jpEl.classList.add("win-flash");
      setTimeout(() => jpEl.classList.remove("win-flash"), 600);
    }
  }

  /**
   * Balance changed — update from admin panel.
   */
  onBalanceChanged(player, balance) {
    console.log("[Game] Balance update for", player, ":", balance);
    // Update our local balance to match server
    if (balance !== undefined && balance >= 0) {
      this.state.balance = balance;
      localStorage.setItem("slot777_balance", this.state.balance);
      this.updateUI();
      this.showMsg(`💰 BALANCE: ${this.fmt(balance)}`, "#4CAF50");
    }
  }

  /**
   * Difficulty changed — update winRate, payoutMultiplier immediately.
   */
  onDifficultyChanged(level, winRate, payoutMultiplier) {
    console.log("[Game] Difficulty changed:", level, winRate, payoutMultiplier);
    if (!this.state.config) this.state.config = {};
    if (winRate !== undefined) this.state.config.winRate = winRate;
    if (payoutMultiplier !== undefined)
      this.state.config.payoutMultiplier = payoutMultiplier;
    this.showMsg(`🎯 DIFFICULTY: ${level || "CUSTOM"}`, "#D5AD6D");
  }

  /**
   * Maintenance mode — show/hide overlay.
   */
  onMaintenanceMode(enabled) {
    console.log("[Game] Maintenance mode:", enabled);
    if (enabled) {
      this.showMsg("🛠️ MAINTENANCE MODE", "#FF6B6B");
      if (this.el.spinBtn) this.el.spinBtn.disabled = true;
    } else {
      this.showMsg("✅ READY", "#4CAF50");
      if (this.el.spinBtn && !this.state.spinning)
        this.el.spinBtn.disabled = false;
    }
  }

  /**
   * Reset game — force reload state from server.
   */
  onResetGame() {
    console.log("[Game] Reset command received");
    this.resetBalance();
    this.showMsg("🔄 GAME RESET", "#FFD700");
  }

  // =====================
  // SPIN LOGIC
  // =====================

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

    // ---- RNG with LIVE config ----
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
      const stagger = turbo ? 200 : 280;
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

    if (this.state.autoplay && this.state.balance >= this.state.bet) {
      setTimeout(() => this.spin(), turbo ? 100 : 400);
    } else {
      if (this.el.autoplay) this.el.autoplay.checked = false;
      this.state.autoplay = false;
    }
  }

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
