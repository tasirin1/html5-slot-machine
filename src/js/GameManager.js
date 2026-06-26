/**
 * GameManager — Main game controller
 * Orchestrates reel engine, paylines, UI, animations, balance
 */

import { evaluate } from "./Paylines.js";
import AnimationManager from "./AnimationManager.js";
import JackpotAPI from "./JackpotAPI.js";

export default class GameManager {
  constructor() {
    this.anim = new AnimationManager();

    // Game state
    this.state = {
      balance: 1000,
      bet: 100,
      totalWin: 0,
      spinning: false,
      autoplay: false,
      turbo: false,
      freeSpins: 0,
      spinCount: 0,
      lossStreak: 0,
      lastWin: 0,
      history: [],
      config: null,
    };

    // Reel state
    this.grid = []; // 5x3 grid of symbol IDs
    this.winResults = []; // Current spin win results

    // DOM refs
    this.el = {};
    this.cacheDOM();

    // RNG state for reel strips
    this.reelPositions = [0, 0, 0, 0, 0];
    this.reelStrips = this.buildStrips();

    this.init();
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
      "resetBtn",
      "controls",
      "topBar",
      "winMsg",
      "totalWinDisplay",
      "betDown",
      "betUp",
      "turboMode",
      "maxBet",
      "winHistory",
    ];
    for (const id of ids) this.el[id] = document.getElementById(id);

    this.reelEls = document.querySelectorAll(".reel");
    this.reelCount = this.reelEls.length;
  }

  buildStrips() {
    // 5 reel strips (virtual reels) - each ~30 positions
    const syms = [
      "SEVEN",
      "BAR",
      "BELL",
      "CHERRY",
      "LEMON",
      "ORANGE",
      "PLUM",
      "MELON",
      "GRAPES",
      "WILD",
    ];
    const strips = [];
    for (let r = 0; r < 5; r++) {
      const strip = [];
      for (let i = 0; i < 30; i++) {
        // Weighted random — higher symbols are rarer
        const idx =
          Math.random() < 0.7
            ? Math.floor(Math.random() * 7) + 2 // common: 2-9 (CHERRY to GRAPES)
            : Math.floor(Math.random() * 3); // rare: 0-2 (SEVEN, BAR, BELL)
        strip.push(syms[Math.min(idx, syms.length - 1)]);
      }
      // Ensure WILD appears ~3% of positions
      for (let i = 0; i < strip.length; i++) {
        if (Math.random() < 0.03) strip[i] = "WILD";
      }
      strips.push(strip);
    }
    return strips;
  }

  async init() {
    // Fetch config
    try {
      const config = await JackpotAPI.fetchConfig();
      this.state.config = config;
    } catch (e) {}

    this.state.bet = (this.state.config && this.state.config.betAmount) || 100;

    // Load saved money
    const saved = localStorage.getItem("slot777_balance");
    this.state.balance = saved
      ? parseInt(saved, 10)
      : (this.state.config && this.state.config.startingMoney) || 1000;

    // Save initial balance
    JackpotAPI.saveMoney(this.state.balance);

    // Build reels DOM if needed
    this.buildReelDOM();

    // Init grid with random symbols
    this.randomizeGrid();
    this.renderGrid();

    // Event listeners
    this.bindEvents();

    // Update UI
    this.updateUI();
    this.showMsg("🎰 SPIN TO WIN");
  }

  buildReelDOM() {
    // Create 5 reel elements if they don't exist
    const container = document.getElementById("reels");
    if (!container) return;

    // Clear existing
    container.innerHTML = "";

    for (let r = 0; r < 5; r++) {
      const reel = document.createElement("div");
      reel.className = "reel";
      for (let i = 0; i < 3; i++) {
        const sym = document.createElement("div");
        sym.className = "sym";
        reel.appendChild(sym);
      }
      container.appendChild(reel);
    }

    // Update reelEls
    this.reelEls = document.querySelectorAll(".reel");
    this.reelCount = this.reelEls.length;
  }

  randomizeGrid() {
    this.grid = [];
    const syms = [
      "SEVEN",
      "BAR",
      "BELL",
      "CHERRY",
      "LEMON",
      "ORANGE",
      "PLUM",
      "MELON",
      "GRAPES",
      "WILD",
    ];
    for (let r = 0; r < 5; r++) {
      const col = [];
      for (let i = 0; i < 3; i++) {
        col.push(syms[Math.floor(Math.random() * syms.length)]);
      }
      this.grid.push(col);
    }
  }

  renderGrid() {
    if (!this.reelEls) return;
    const syms = getSymbolDataMap();
    for (let r = 0; r < 5 && r < this.reelEls.length; r++) {
      const reelEl = this.reelEls[r];
      const items = reelEl.querySelectorAll(".sym");
      for (let i = 0; i < 3 && i < items.length; i++) {
        const symId = this.grid[r] ? this.grid[r][i] : "BAR";
        const data = syms[symId] || syms.BAR;
        items[i].textContent = data.icon;
        items[i].style.background = data.bg;
        items[i].style.color = data.color;
      }
    }
  }

  bindEvents() {
    if (this.el.spinBtn)
      this.el.spinBtn.addEventListener("click", () => this.spin());
    if (this.el.resetBtn)
      this.el.resetBtn.addEventListener("click", () => this.resetBalance());
    if (this.el.betDown)
      this.el.betDown.addEventListener("click", () => this.adjustBet(-50));
    if (this.el.betUp)
      this.el.betUp.addEventListener("click", () => this.adjustBet(50));
    if (this.el.maxBet)
      this.el.maxBet.addEventListener("click", () => this.maxBet());

    if (this.el.autoplay) {
      this.el.autoplay.addEventListener("change", () => {
        this.state.autoplay = this.el.autoplay.checked;
        if (
          this.state.autoplay &&
          !this.state.spinning &&
          this.state.balance >= this.state.bet
        ) {
          this.spin();
        }
      });
    }

    if (this.el.turboMode) {
      this.el.turboMode.addEventListener("change", () => {
        this.state.turbo = this.el.turboMode.checked;
      });
    }

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space" && !this.state.spinning) {
        e.preventDefault();
        this.spin();
      }
    });
  }

  adjustBet(delta) {
    const minBet = 10;
    const maxBet = 10000;
    let newBet = this.state.bet + delta;
    newBet = Math.max(minBet, Math.min(maxBet, newBet));
    this.state.bet = newBet;
    this.updateUI();
  }

  maxBet() {
    this.state.bet = Math.min(10000, this.state.balance);
    this.updateUI();
  }

  async resetBalance() {
    const config = await JackpotAPI.fetchConfig();
    this.state.config = config || this.state.config;
    this.state.balance = (config && config.startingMoney) || 1000;
    this.state.lossStreak = 0;
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);
    this.state.spinBtn?.removeAttribute("disabled");
    this.updateUI();
    this.showMsg("💰 BALANCE RESET");
  }

  async spin() {
    if (this.state.spinning) return;
    if (this.state.balance < this.state.bet) {
      this.showMsg("💸 INSUFFICIENT BALANCE");
      return;
    }

    // Deduct bet
    this.state.spinning = true;
    this.state.balance -= this.state.bet;
    this.state.spinCount++;
    this.updateUI();

    if (this.el.spinBtn) this.el.spinBtn.disabled = true;

    // Clear previous highlights
    this.anim.clearHighlights();

    // Show spin message
    this.showMsg(this.state.turbo ? "⚡ SPINNING..." : "🎰 SPINNING...");
    this.anim.pulseSpinBtn(this.el.spinBtn);

    // Save updated balance
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);

    // ---- RNG phase: determine result BEFORE animation ----
    const config = this.state.config || {};
    const wr = config.winRate || 0.15;
    const pm = config.payoutMultiplier || 3;
    const minSpins = config.minSpinsBeforeWin || 0;

    // Near miss / forced win logic
    this.state.lossStreak = this.state.lossStreak || 0;
    let forceWin = false;
    if (minSpins > 0 && this.state.lossStreak >= minSpins) {
      forceWin = true;
      this.state.lossStreak = 0;
    }

    // Generate final grid
    const resultGrid = this.generateResult(forceWin ? 1 : wr, pm);
    this.grid = resultGrid.grid;
    this.winResults = resultGrid.wins;

    // ---- Animation phase: spin with results ----
    const spinDuration = this.state.turbo ? 300 : 800;
    const staggerDelay = this.state.turbo ? 40 : 80;

    const promises = [];
    for (let r = 0; r < 5 && r < this.reelEls.length; r++) {
      const reelEl = this.reelEls[r];
      const finalCol = this.grid[r] || ["BAR", "BAR", "BAR"];
      promises.push(
        this.anim.spinReel(reelEl, finalCol, spinDuration, r * staggerDelay),
      );
    }
    await Promise.all(promises);

    // ---- Win evaluation ----
    const wins = resultGrid.wins;
    const totalWin = wins.reduce((sum, w) => sum + w.amount, 0);
    this.state.lastWin = totalWin;

    if (totalWin > 0) {
      this.state.balance += totalWin;
      this.state.totalWin += totalWin;
      this.state.lossStreak = 0;

      // Highlight winning positions
      const allPositions = [];
      for (const w of wins) {
        for (const pos of w.positions) {
          allPositions.push(pos);
        }
      }
      this.anim.highlightWins(allPositions, this.grid);

      // Show win
      const winStr = totalWin.toLocaleString("id-ID");
      this.showMsg(`🎉 WIN ${winStr}!`, "#FF6B6B");

      if (this.el.totalWinDisplay) {
        this.anim.countUp(this.el.totalWinDisplay, totalWin);
        this.anim.flashWin(this.el.totalWinDisplay);
      }

      // Particle burst
      if (this.el.spinBtn) {
        const rect = this.el.spinBtn.getBoundingClientRect();
        this.anim.burst(rect.left + rect.width / 2, rect.top);
      }
    } else {
      this.state.lossStreak++;
      this.showMsg("", "#888");
    }

    // Save final balance
    localStorage.setItem("slot777_balance", this.state.balance);
    JackpotAPI.saveMoney(this.state.balance);

    // Auto-spin
    this.state.spinning = false;
    if (this.el.spinBtn) this.el.spinBtn.disabled = false;

    if (this.state.autoplay && this.state.balance >= this.state.bet) {
      const delay = this.state.turbo ? 150 : 600;
      setTimeout(() => this.spin(), delay);
    } else {
      if (this.el.autoplay) this.el.autoplay.checked = false;
      this.state.autoplay = false;
    }

    this.updateUI();
  }

  generateResult(winChance, payoutMult) {
    const win = Math.random() < winChance;
    const grid = [];
    let wins = [];

    if (win) {
      // Generate a winning grid
      const winSym = weightedRandom();

      // Fill grid
      for (let r = 0; r < 5; r++) {
        const col = [];
        for (let i = 0; i < 3; i++) {
          // Middle row gets the win symbol
          if (i === 1 && r < 5) {
            col.push(winSym);
          } else {
            col.push(weightedRandom());
          }
        }
        grid.push(col);
      }

      // Evaluate wins
      wins = evaluate(grid, this.state.bet);

      // If no wins generated, add a 3-of-a-kind on middle line
      if (wins.length === 0) {
        for (let r = 0; r < 5; r++) {
          grid[r][1] = winSym;
        }
        wins = evaluate(grid, this.state.bet);
      }
    } else {
      // Generate random grid with near-miss possibility
      const nearMiss = Math.random() < 0.3;
      for (let r = 0; r < 5; r++) {
        const col = [];
        for (let i = 0; i < 3; i++) {
          if (nearMiss && r < 4 && i === 1) {
            // First 4 reels show same symbol, 5th breaks it
            col.push("SEVEN");
          } else if (nearMiss && r === 4 && i === 1) {
            col.push("CHERRY"); // Breaks the near-miss
          } else {
            col.push(weightedRandom());
          }
        }
        grid.push(col);
      }
      wins = [];
    }

    return { grid, wins };
  }

  updateUI() {
    const fmt = (n) => (n || 0).toLocaleString("id-ID");

    if (this.el.playerMoney)
      this.el.playerMoney.textContent = fmt(this.state.balance);
    if (this.el.betDisplay)
      this.el.betDisplay.textContent = fmt(this.state.bet);
    if (this.el.betDisplay2)
      this.el.betDisplay2.textContent = fmt(this.state.bet);

    if (this.el.totalWinDisplay && this.state.lastWin > 0) {
      this.el.totalWinDisplay.textContent = fmt(this.state.lastWin);
    }
  }

  showMsg(text, color) {
    if (this.el.winText) {
      this.el.winText.textContent = text || "";
      this.el.winText.style.color = color || "#D5AD6D";
    }
  }
}

/** Weighted random symbol (rarer symbols are less likely) */
function weightedRandom() {
  const pool = [
    "SEVEN",
    "SEVEN",
    "SEVEN",
    "SEVEN",
    "BAR",
    "BAR",
    "BAR",
    "BAR",
    "BAR",
    "BAR",
    "BELL",
    "BELL",
    "BELL",
    "BELL",
    "CHERRY",
    "CHERRY",
    "CHERRY",
    "CHERRY",
    "CHERRY",
    "LEMON",
    "LEMON",
    "LEMON",
    "LEMON",
    "LEMON",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "PLUM",
    "PLUM",
    "PLUM",
    "MELON",
    "MELON",
    "GRAPES",
    "GRAPES",
    "WILD",
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

/** Inline symbol data map */
function getSymbolDataMap() {
  return {
    SEVEN: {
      icon: "7",
      bg: "linear-gradient(135deg,#8B0000,#DC143C,#8B0000)",
      color: "#FFD700",
    },
    BAR: {
      icon: "BAR",
      bg: "linear-gradient(135deg,#1a1a2e,#333,#1a1a2e)",
      color: "#FFFFFF",
    },
    BELL: {
      icon: "🔔",
      bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
      color: "#FFD700",
    },
    CHERRY: {
      icon: "🍒",
      bg: "linear-gradient(135deg,#600,#cc0033,#600)",
      color: "#FFFFFF",
    },
    LEMON: {
      icon: "🍋",
      bg: "linear-gradient(135deg,#3a5000,#6b8e00,#3a5000)",
      color: "#FFFFFF",
    },
    ORANGE: {
      icon: "🍊",
      bg: "linear-gradient(135deg,#803000,#cc5500,#803000)",
      color: "#FFFFFF",
    },
    PLUM: {
      icon: "🍑",
      bg: "linear-gradient(135deg,#400060,#7a00b3,#400060)",
      color: "#FFFFFF",
    },
    MELON: {
      icon: "🍉",
      bg: "linear-gradient(135deg,#004d00,#008000,#004d00)",
      color: "#FFFFFF",
    },
    GRAPES: {
      icon: "🍇",
      bg: "linear-gradient(135deg,#1a003a,#4a0080,#1a003a)",
      color: "#FFFFFF",
    },
    WILD: {
      icon: "⭐",
      bg: "linear-gradient(135deg,#8B4500,#FFD700,#8B4500)",
      color: "#1a0020",
    },
  };
}
