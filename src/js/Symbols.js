/**
 * Symbols — Classic 3-reel slot machine symbols
 * Defines symbols, payouts, and reel strip compositions
 */

export const SYMBOLS = {
  JACKPOT: {
    id: "JACKPOT",
    name: "Jackpot",
    icon: "💰",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
    mult: [0, 0, 500, 2500, 10000],
    weight: 2,
  },
  DIAMOND: {
    id: "DIAMOND",
    name: "Diamond",
    icon: "💎",
    color: "#00FFFF",
    bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
    mult: [0, 0, 200, 1000, 4000],
    weight: 3,
  },
  SEVEN: {
    id: "SEVEN",
    name: "Seven",
    icon: "7️⃣",
    color: "#FF0000",
    bg: "linear-gradient(135deg,#1a0000,#CC0000,#1a0000)",
    mult: [0, 0, 100, 500, 2000],
    weight: 5,
  },
  "3BAR": {
    id: "3BAR",
    name: "Triple BAR",
    icon: "Ⅲ", // Triple BAR
    color: "#FFFFFF",
    bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
    mult: [0, 0, 60, 250, 1000],
    weight: 6,
  },
  "2BAR": {
    id: "2BAR",
    name: "Double BAR",
    icon: "Ⅱ", // Double BAR
    color: "#CCCCCC",
    bg: "linear-gradient(135deg,#2a2a3e,#555577,#2a2a3e)",
    mult: [0, 0, 40, 150, 600],
    weight: 7,
  },
  BAR: {
    id: "BAR",
    name: "BAR",
    icon: "Ⅰ", // Single BAR
    color: "#AAAAAA",
    bg: "linear-gradient(135deg,#3a3a4e,#666688,#3a3a4e)",
    mult: [0, 0, 25, 100, 400],
    weight: 8,
  },
  BELL: {
    id: "BELL",
    name: "Bell",
    icon: "🔔",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#4a3000,#8B6800,#4a3000)",
    mult: [0, 0, 15, 60, 250],
    weight: 8,
  },
  CHERRY: {
    id: "CHERRY",
    name: "Cherry",
    icon: "🍒",
    color: "#FF6666",
    bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
    mult: [0, 3, 10, 40, 150],
    weight: 10,
  },
  LEMON: {
    id: "LEMON",
    name: "Lemon",
    icon: "🍋",
    color: "#FFFF66",
    bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
    mult: [0, 2, 8, 30, 100],
    weight: 10,
  },
  ORANGE: {
    id: "ORANGE",
    name: "Orange",
    icon: "🍊",
    color: "#FFCC66",
    bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
    mult: [0, 1, 6, 20, 75],
    weight: 11,
  },
  PLUM: {
    id: "PLUM",
    name: "Plum",
    icon: "🍑",
    color: "#FF99CC",
    bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
    mult: [0, 0, 5, 15, 50],
    weight: 10,
  },
  GRAPES: {
    id: "GRAPES",
    name: "Grapes",
    icon: "🍇",
    color: "#CC99FF",
    bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
    mult: [0, 0, 4, 12, 40],
    weight: 10,
  },
  WATERMELON: {
    id: "WATERMELON",
    name: "Melon",
    icon: "🍉",
    color: "#66FF66",
    bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
    mult: [0, 0, 3, 10, 30],
    weight: 10,
  },
};

export const SYMBOL_NAMES = Object.keys(SYMBOLS);

/**
 * Weighted random symbol selection
 * Higher-value symbols appear less frequently
 */
export function weightedRandom() {
  const pool = [];
  for (const name of SYMBOL_NAMES) {
    const sym = SYMBOLS[name];
    for (let i = 0; i < sym.weight; i++) {
      pool.push(sym.id);
    }
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Build a single reel strip with N random symbols
 * @param {number} length - Number of symbols in the strip
 * @returns {string[]} Array of symbol IDs
 */
export function buildReelStrip(length = 30) {
  const strip = [];
  for (let i = 0; i < length; i++) {
    strip.push(weightedRandom());
  }
  return strip;
}

/**
 * Build 3 reel strips for a classic slot machine
 * Each reel can have different compositions for variety
 */
export function buildReelStrips() {
  return [buildReelStrip(30), buildReelStrip(30), buildReelStrip(30)];
}

/**
 * Render data for a symbol ID
 */
export function getRenderData(symId) {
  const sym = SYMBOLS[symId];
  if (!sym)
    return {
      icon: "Ⅰ",
      bg: "linear-gradient(135deg,#3a3a4e,#666688,#3a3a4e)",
      color: "#AAAAAA",
    };
  return { icon: sym.icon, bg: sym.bg, color: sym.color };
}
