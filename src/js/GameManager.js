/**
 * GameManager — 3-Reel Classic Slot Machine
 * Orchestrates spinning, RNG, paylines, balance, UI
 */

import { evaluate, totalWin } from "./Paylines.js";
import { weightedRandom, buildReelStrips } from "./Symbols.js";
import AnimationManager from "./AnimationManager.js";
import JackpotAPI from "./JackpotAPI.js";

export default class GameManager {
  constructor() {
    this.anim = new AnimationManager();

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

    // Reel strips (virtual)
    this.strips = buildReelStrips();

    // Grid: [reel][row] = symbol ID, 3x3
    this.grid = [
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
      ["BAR", "BAR", "BAR"],
    ];

    // DOM cache
    this.el = {};
    this.reelEls = null;

    this.init();
  }

  init() {
    this.cacheDOM();
    this.ensureSymbols();
    this.loadConfig();
    this.bindEvents();
    this.renderGrid();
    this.updateUI();
    this.showMsg("🎰 PULL TO WIN");
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
    this.reelEls = document.querySelectorAll(".reel");
  }

  /**
   * Ensure each reel has 3 .sym children, creating them if missing
   */
  ensureSymbols() {
    if (!this.reelEls) return;
    for (const reel of this.reelEls) {
      let items = reel.querySelectorAll(".sym");
      if (items.length === 0) {
        // Create 3 .sym elements
        for (let i = 0; i < 3; i++) {
          const sym = document.createElement("div");
          sym.className = "sym";
          reel.appendChild(sym);
        }
        items = reel.querySelectorAll(".sym");
      }
    }
  }

  async loadConfig() {
    try {
      const cfg = await JackpotAPI.fetchConfig();
      this.state.config = cfg;
      if (cfg && cfg.betAmount) this.state.bet = cfg.betAmount;
    } catch (_) {
      // No server - use defaults
    }

    // Try to load saved balance
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

    // Space bar to spin
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this.state.spinning) {
        e.preventDefault();
        this.spin();
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

  renderGrid() {
    const SYM_RENDER = this.getSymRender();
    for (let r = 0; r < 3 && this.reelEls && r < this.reelEls.length; r++) {
      const reel = this.reelEls[r];
      const items = reel.querySelectorAll(".sym");
      for (let i = 0; i < 3 && i < items.length; i++) {
        const id = this.grid[r]?.[i] || "BAR";
        const d = SYM_RENDER[id] || SYM_RENDER.BAR;
        items[i].textContent = d.icon;
        items[i].style.background = d.bg;
        items[i].style.color = d.color;
        items[i].className = "sym";
      }
    }
  }

  // ---- SPIN ----

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

    // Re-render grid to DOM and animate
    const total = totalWin(wins);
    const duration = this.state.turbo ? 300 : 700;
    const stagger = this.state.turbo ? 80 : 150;

    this.showMsg(total > 0 ? "🎰 WINNING..." : "🎰 SPINNING...");

    // Spin each reel sequentially: left → middle → right
    const promises = [];
    for (let r = 0; r < 3 && r < this.reelEls.length; r++) {
      const reelEl = this.reelEls[r];
      const resultCol = this.grid[r] || ["BAR", "BAR", "BAR"];
      promises.push(
        this.anim.spinReel(reelEl, resultCol, duration, r * stagger),
      );
    }
    await Promise.all(promises);

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

      // Show win
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
      setTimeout(() => this.spin(), this.state.turbo ? 100 : 400);
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
      // Generate a guaranteed winning grid
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

    // No win — generate a non-winning grid
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

  getSymRender() {
    return {
      DIAMOND: {
        icon: "💎",
        bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
        color: "#00FFFF",
      },
      SEVEN: {
        icon: "7",
        bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
        color: "#FFD700",
      },
      BAR: {
        icon: "BAR",
        bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
        color: "#FFFFFF",
      },
      BELL: {
        icon: "🔔",
        bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
        color: "#FFD700",
      },
      CHERRY: {
        icon: "🍒",
        bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
        color: "#FFCCCC",
      },
      LEMON: {
        icon: "🍋",
        bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
        color: "#FFFFCC",
      },
      ORANGE: {
        icon: "🍊",
        bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
        color: "#FFFFFF",
      },
      PLUM: {
        icon: "🍑",
        bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
        color: "#FFDDFF",
      },
      WATERMELON: {
        icon: "🍉",
        bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
        color: "#CCFFCC",
      },
      GRAPES: {
        icon: "🍇",
        bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
        color: "#DDCCFF",
      },
    };
  }
}
