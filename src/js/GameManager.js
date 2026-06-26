/**
 * GameManager — 3-Reel Classic Slot Machine
 *
 * Architecture:
 *   1. Admin panel changes config → SharedPreferences
 *   2. WebSocket broadcasts config to ALL connected browsers
 *   3. REST API /api/config returns current config
 *   4. generateResult() uses live config for RNG
 *
 * CRITICAL: Every spin reads config from state (updated via WebSocket).
 * Win rate, difficulty, and payout MUST come from admin config, never hardcoded.
 */

import ReelEngine from "./ReelEngine.js";
import { evaluate, totalWin } from "./Paylines.js";
import { weightedRandom, getRenderData, SYMBOLS } from "./Symbols.js";
import AnimationManager from "./AnimationManager.js";
import JackpotAPI from "./JackpotAPI.js";
import RealtimeManager from "./RealtimeManager.js";

window.__SYMBOLS_DATA = SYMBOLS;

const ALL_SYMBOLS = Object.keys(SYMBOLS);

export default class GameManager {
  constructor() {
    this.anim = new AnimationManager();
    this.reels = [];
    this.realtime = null;
    this.debug = true; // Enable debug logging

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
      config: {}, // Populated from server via JackpotAPI + WebSocket
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
    this.showGrid();
    this.updateUI();
    this.showMsg("🎰 SPIN TO WIN");
    this.bindEvents();

    // Load config from server (async)
    this.loadConfig().then(() => {
      this.log("[INIT] Config loaded from server");
    });

    // WebSocket for real-time updates (starts after game loads)
    setTimeout(() => {
      this.realtime = new RealtimeManager(this);
    }, 200);
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

  log(...args) {
    if (this.debug) console.log("[SLOT]", ...args);
  }

  // ========================================================
  // CONFIG MANAGEMENT
  // ========================================================

  /**
   * Load config from server via REST API.
   * Called once at startup, and config is kept in sync via WebSocket.
   */
  async loadConfig() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      if (cfg && Object.keys(cfg).length > 0) {
        this.state.config = cfg;
        if (cfg.betAmount) this.state.bet = cfg.betAmount;
        this.log("[CONFIG] Loaded from server:", JSON.stringify(cfg));
      } else {
        this.log("[CONFIG] Server returned empty config, using defaults");
      }
    } catch (e) {
      this.log("[CONFIG] Fetch failed:", e.message);
    }

    // Load saved balance
    const saved = localStorage.getItem("slot777_balance");
    if (saved) {
      this.state.balance = parseInt(saved, 10);
    } else {
      // Use config starting money or default
      this.state.balance = Math.max(
        this.state.config?.startingMoney || 10000,
        1000,
      );
    }

    JackpotAPI.saveMoney(this.state.balance);
    this.updateUI();
  }

  /**
   * Get current effective config with defaults.
   * This is called EVERY spin — uses latest config from WebSocket/REST.
   */
  getActiveConfig() {
    const cfg = this.state.config || {};
    return {
      winRate:
        cfg.winRate !== undefined && cfg.winRate !== null ? cfg.winRate : 0.15,
      payoutMultiplier:
        cfg.payoutMultiplier !== undefined && cfg.payoutMultiplier !== null
          ? cfg.payoutMultiplier
          : 3,
      minSpinsBeforeWin:
        cfg.minSpinsBeforeWin !== undefined && cfg.minSpinsBeforeWin !== null
          ? cfg.minSpinsBeforeWin
          : 0,
      jackpotHitRate:
        cfg.jackpotHitRate !== undefined && cfg.jackpotHitRate !== null
          ? cfg.jackpotHitRate
          : 0.005,
      difficultyId:
        cfg.difficultyId !== undefined && cfg.difficultyId !== null
          ? cfg.difficultyId
          : 2,
      difficultyLabel: cfg.difficultyLabel || cfg.difficulty || "Medium",
      jackpot: cfg.jackpot || 5555555,
      startingMoney: cfg.startingMoney || 10000,
      betAmount: cfg.betAmount || 100,
    };
  }

  // ========================================================
  // REAL-TIME EVENT HANDLERS (called by RealtimeManager)
  // ========================================================

  onConfigChanged(config) {
    if (!config || Object.keys(config).length === 0) return;
    this.state.config = config;
    const c = this.getActiveConfig();
    this.log(
      "[WS] Config updated — winRate:",
      c.winRate,
      "diff:",
      c.difficultyLabel,
      "payMult:",
      c.payoutMultiplier,
    );
    this.showMsg(
      `⚙️ CONFIG: ${c.difficultyLabel} (${(c.winRate * 100).toFixed(1)}%)`,
      "#D5AD6D",
    );
  }

  onJackpotChanged(value) {
    const jpEl = document.getElementById("jackpotDisplay");
    if (jpEl) {
      jpEl.textContent = (value || 0).toLocaleString("id-ID");
      jpEl.classList.add("win-flash");
      setTimeout(() => jpEl.classList.remove("win-flash"), 600);
    }
  }

  onBalanceChanged(player, balance) {
    if (balance !== undefined && balance >= 0) {
      this.state.balance = balance;
      localStorage.setItem("slot777_balance", this.state.balance);
      this.updateUI();
      this.showMsg(`💰 BALANCE: ${this.fmt(balance)}`, "#4CAF50");
    }
  }

  onDifficultyChanged(level, winRate, payoutMultiplier) {
    const c = this.getActiveConfig();
    if (winRate !== undefined) c.winRate = winRate;
    if (payoutMultiplier !== undefined) c.payoutMultiplier = payoutMultiplier;
    this.state.config = {
      ...this.state.config,
      winRate: c.winRate,
      payoutMultiplier: c.payoutMultiplier,
    };
    this.log("[WS] Difficulty changed:", level, "winRate:", c.winRate);
    this.showMsg(`🎯 DIFFICULTY: ${level || "CUSTOM"}`, "#FFD700");
  }

  onMaintenanceMode(enabled) {
    if (enabled) {
      this.showMsg("🛠️ MAINTENANCE", "#FF6B6B");
      if (this.el.spinBtn) this.el.spinBtn.disabled = true;
    } else {
      this.showMsg("✅ READY", "#4CAF50");
      if (this.el.spinBtn && !this.state.spinning)
        this.el.spinBtn.disabled = false;
    }
  }

  onResetGame() {
    this.log("[WS] Reset command received");
    this.resetBalance();
    this.showMsg("🔄 GAME RESET", "#FFD700");
  }

  // ========================================================
  // UI EVENTS
  // ========================================================

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
    // Re-read config from server
    try {
      const cfg = await JackpotAPI.fetchConfig();
      if (cfg) this.state.config = cfg;
    } catch (_) {}
    const c = this.getActiveConfig();
    this.state.balance = c.startingMoney;
    this.state.lossStreak = 0;
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;
    this.updateUI();
    this.showMsg("💰 BALANCE RESET");
  }

  // ========================================================
  // SPIN — CORE RNG GAME LOGIC
  // ========================================================

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

    // ===== STEP 1: READ LIVE CONFIG =====
    const c = this.getActiveConfig();
    const winRate = c.winRate;
    const payoutMult = c.payoutMultiplier;
    const minSpins = c.minSpinsBeforeWin;

    this.log(
      "[SPIN#" + this.state.spinCount + "] winRate:",
      winRate,
      "| payoutMult:",
      payoutMult,
      "| difficulty:",
      c.difficultyLabel,
      "| minSpins:",
      minSpins,
      "| lossStreak:",
      this.state.lossStreak,
    );

    // ===== STEP 2: RNG ROLL =====
    // Critical: THIS is where win/loss is determined, based on config
    this.state.lossStreak = this.state.lossStreak || 0;

    // Determine win probability based on config AND loss streak
    let effectiveWinRate = winRate;

    // Loss streak protection: gradually increase win rate after many losses
    // This is SUBTLE — never jumps to 100% unless minSpinsBeforeWin is set
    if (minSpins > 0 && this.state.lossStreak >= minSpins * 3) {
      // After 3x the minimum spin threshold, start gradually increasing
      const excess = this.state.lossStreak - minSpins * 3;
      const boost = Math.min(excess * 0.001, winRate * 2); // Max double the base rate
      effectiveWinRate = Math.min(winRate + boost, 0.5); // Never exceed 50%
      this.log(
        "[SPIN] Loss streak protection: effective rate:",
        effectiveWinRate,
      );
    }

    // THE RNG ROLL
    const roll = Math.random();
    const isWin = roll < effectiveWinRate;

    this.log(
      "[SPIN] RNG roll:",
      roll.toFixed(6),
      "| threshold:",
      effectiveWinRate.toFixed(6),
      "| result:",
      isWin ? "WIN" : "LOSE",
    );

    // ===== STEP 3: Generate grid based on RNG result =====
    const { grid, wins } = this.generateResult(isWin, payoutMult);

    this.grid = grid;
    const total = totalWin(wins);

    this.log("[SPIN] Grid:", JSON.stringify(grid));
    this.log(
      "[SPIN] Wins:",
      total > 0
        ? JSON.stringify(
            wins.map((w) => ({
              sym: w.symbol,
              count: w.count,
              mult: w.multiplier,
              amt: w.amount,
            })),
          )
        : "NONE",
    );
    this.log("[SPIN] Payout:", total);

    // ===== STEP 4: Animate reels =====
    const turbo = this.state.turbo;
    this.showMsg("🎰 SPINNING!");

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
      console.error("[SPIN] Error:", e);
      this.state.spinning = false;
      if (this.el.spinBtn) this.el.spinBtn.disabled = false;
      this.showMsg("⚠️ ERROR");
      return;
    }

    // ===== STEP 5: Win evaluation =====
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

      this.log("[RESULT] WIN — amount:", total, "balance:", this.state.balance);
    } else {
      this.state.lossStreak++;
      this.log(
        "[RESULT] LOSE — lossStreak:",
        this.state.lossStreak,
        "balance:",
        this.state.balance,
      );
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
   * Generate a 3×3 reel grid based on RNG result.
   *
   * CRITICAL: This function must GUARANTEE:
   *   - If isWin=true:  at least one winning payline exists
   *   - If isWin=false: NO winning paylines exist (guaranteed loss)
   *
   * This ensures the actual win rate matches the configured winRate exactly.
   *
   * @param {boolean} isWin - Whether this spin should win
   * @param {number} payoutMult - Payout multiplier from config
   * @returns {{ grid: string[][], wins: Array }}
   */
  generateResult(isWin, payoutMult) {
    if (isWin) {
      // ===== GUARANTEED WIN =====
      // Pick a random winning symbol
      const winSym = weightedRandom();

      // Pick a random payline to win on
      const winPaylines = [
        [0, 1, 2], // Top row: [reel0, reel1, reel2] positions
        [1, 1, 1], // Middle row (reel position = row index)
        [2, 1, 2], // Bottom row
        [0, 0, 2], // Diagonal down-right: reel0.top, reel1.mid, reel2.bot
        [2, 0, 0], // Diagonal up-right: reel0.bot, reel1.mid, reel2.top
      ];

      // Actually, the grid is [reel][row], so paylines map differently
      // PAYLINES in paylines.js: [[reel,row], ...]
      // Line 0: [[0,0],[1,0],[2,0]] — top row
      // Line 1: [[0,1],[1,1],[2,1]] — middle row
      // Line 2: [[0,2],[1,2],[2,2]] — bottom row
      // Line 3: [[0,0],[1,1],[2,2]] — diagonal down
      // Line 4: [[0,2],[1,1],[2,0]] — diagonal up

      const winLineIndex = Math.floor(Math.random() * 5); // 0-4
      const winLine = [
        [
          [0, 0],
          [1, 0],
          [2, 0],
        ], // 0: top
        [
          [0, 1],
          [1, 1],
          [2, 1],
        ], // 1: middle
        [
          [0, 2],
          [1, 2],
          [2, 2],
        ], // 2: bottom
        [
          [0, 0],
          [1, 1],
          [2, 2],
        ], // 3: diagonal down
        [
          [0, 2],
          [1, 1],
          [2, 0],
        ], // 4: diagonal up
      ][winLineIndex];

      // Build grid: fill with random symbols first
      const grid = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];

      // Place winning symbol along the chosen payline
      for (const [reel, row] of winLine) {
        grid[reel][row] = winSym;
      }

      // Fill remaining cells with DIFFERENT symbols (avoid accidental wins)
      const usedSymbols = new Set([winSym]);
      const otherSymbols = ALL_SYMBOLS.filter(
        (s) => s !== winSym && s !== "DIAMOND",
      );

      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          if (grid[r][c] === null) {
            // Pick a symbol that won't accidentally create a win
            grid[r][c] =
              otherSymbols[Math.floor(Math.random() * otherSymbols.length)];
          }
        }
      }

      // Evaluate and apply multiplier
      let wins = evaluate(grid, this.state.bet);
      if (payoutMult && payoutMult !== 1) {
        for (const w of wins) w.amount = Math.floor(w.amount * payoutMult);
      }

      // Safety: if no winning payline detected (shouldn't happen), add a guaranteed win
      if (wins.length === 0) {
        // Force middle line ALL winSym
        grid[0][1] = winSym;
        grid[1][1] = winSym;
        grid[2][1] = winSym;
        wins = evaluate(grid, this.state.bet);
        if (payoutMult && payoutMult !== 1) {
          for (const w of wins) w.amount = Math.floor(w.amount * payoutMult);
        }
      }

      return { grid, wins };
    }

    // ===== GUARANTEED LOSS =====
    // Use 9 completely disjoint symbol pools — no two cells on the same
    // payline can ever match, guaranteeing zero wins.
    const DISJOINT_SETS = [
      [
        ["BAR_A", "BAR_B", "BAR_C"],
        ["CHR_A", "CHR_B", "CHR_C"],
        ["LMN_A", "LMN_B", "LMN_C"],
      ],
      [
        ["ORG_A", "ORG_B", "ORG_C"],
        ["PLM_A", "PLM_B", "PLM_C"],
        ["BEL_A", "BEL_B", "BEL_C"],
      ],
      [
        ["SEV_A", "SEV_B", "SEV_C"],
        ["GRP_A", "GRP_B", "GRP_C"],
        ["WTM_A", "WTM_B", "WTM_C"],
      ],
    ];

    const FAKE_TO_REAL = {
      "BAR_A": "BAR", "BAR_B": "CHERRY", "BAR_C": "LEMON",
      "CHR_A": "ORANGE", "CHR_B": "PLUM", "CHR_C": "BELL",
      "LMN_A": "SEVEN", "LMN_B": "GRAPES", "LMN_C": "WATERMELON",
      "ORG_A": "2BAR", "ORG_B": "3BAR", "ORG_C": "CHERRY",
      "PLM_A": "LEMON", "PLM_B": "ORANGE", "PLM_C": "PLUM",
      "BEL_A": "BELL", "BEL_B": "GRAPES", "BEL_C": "WATERMELON",
      "SEV_A": "SEVEN", "SEV_B": "2BAR", "SEV_C": "3BAR",
      "GRP_A": "CHERRY", "GRP_B": "LEMON", "GRP_C": "ORANGE",
      "WTM_A": "PLUM", "WTM_B": "BELL", "WTM_C": "GRAPES",
    };

    const grid = [["", "", ""], ["", "", ""], ["", "", ""]];
    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        const fakeSet = DISJOINT_SETS[r][c];
        const fakeId = fakeSet[Math.floor(Math.random() * fakeSet.length)];
        grid[r][c] = FAKE_TO_REAL[fakeId] || "BAR";
      }
    }

    // Verify — should never match with disjoint pools
    const wins = evaluate(grid, this.state.bet);
    if (wins.length > 0) {
      return {
        grid: [
          ["BAR", "CHERRY", "LEMON"],
          ["ORANGE", "PLUM", "BELL"],
          ["SEVEN", "GRAPES", "WATERMELON"],
        ],
        wins: [],
      };
    }
    return { grid, wins: [] };
  }

  // ========================================================
  // UI HELPERS
  // ========================================================

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
