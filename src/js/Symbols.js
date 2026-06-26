/**
 * Klasik Slot Symbols — 3 Reel
 * Classic fruit machine symbols with weighted payouts
 */

export const SYMBOLS = {
  DIAMOND: {
    id: "DIAMOND",
    name: "Diamond",
    icon: "💎",
    color: "#00FFFF",
    bg: "linear-gradient(135deg,#003366,#0099FF,#003366)",
    mult: [0, 0, 200, 1000, 5000],
    wild: true,
  },
  SEVEN: {
    id: "SEVEN",
    name: "Seven",
    icon: "7",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#8B0000,#FF0000,#8B0000)",
    mult: [0, 0, 100, 500, 2500],
    wild: false,
  },
  BAR: {
    id: "BAR",
    name: "BAR",
    icon: "BAR",
    color: "#FFFFFF",
    bg: "linear-gradient(135deg,#1a1a2e,#444466,#1a1a2e)",
    mult: [0, 0, 50, 200, 1000],
    wild: false,
  },
  BELL: {
    id: "BELL",
    name: "Bell",
    icon: "🔔",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#4a0030,#8b0060,#4a0030)",
    mult: [0, 0, 25, 100, 500],
    wild: false,
  },
  CHERRY: {
    id: "CHERRY",
    name: "Cherry",
    icon: "🍒",
    color: "#FFCCCC",
    bg: "linear-gradient(135deg,#660000,#CC0033,#660000)",
    mult: [0, 5, 15, 50, 200],
    wild: false,
  },
  LEMON: {
    id: "LEMON",
    name: "Lemon",
    icon: "🍋",
    color: "#FFFFCC",
    bg: "linear-gradient(135deg,#3a5000,#8BB800,#3a5000)",
    mult: [0, 3, 10, 40, 150],
    wild: false,
  },
  ORANGE: {
    id: "ORANGE",
    name: "Orange",
    icon: "🍊",
    color: "#FFFFFF",
    bg: "linear-gradient(135deg,#803000,#FF6600,#803000)",
    mult: [0, 2, 8, 30, 100],
    wild: false,
  },
  PLUM: {
    id: "PLUM",
    name: "Plum",
    icon: "🍑",
    color: "#FFDDFF",
    bg: "linear-gradient(135deg,#400060,#9900CC,#400060)",
    mult: [0, 0, 6, 20, 75],
    wild: false,
  },
  WATERMELON: {
    id: "WATERMELON",
    name: "Melon",
    icon: "🍉",
    color: "#CCFFCC",
    bg: "linear-gradient(135deg,#004D00,#00AA00,#004D00)",
    mult: [0, 0, 5, 15, 50],
    wild: false,
  },
  GRAPES: {
    id: "GRAPES",
    name: "Grapes",
    icon: "🍇",
    color: "#DDCCFF",
    bg: "linear-gradient(135deg,#1a003a,#6600AA,#1a003a)",
    mult: [0, 0, 3, 10, 40],
    wild: false,
  },
};

export const SYMBOL_NAMES = Object.keys(SYMBOLS);

/**
 * Weighted random symbol selection for reel strips
 * Higher-value symbols appear less frequently
 */
export function weightedRandom() {
  const pool = [
    "DIAMOND",
    "DIAMOND",
    "DIAMOND",
    "SEVEN",
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
    "BAR",
    "BAR",
    "BELL",
    "BELL",
    "BELL",
    "BELL",
    "BELL",
    "BELL",
    "CHERRY",
    "CHERRY",
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
    "LEMON",
    "LEMON",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "ORANGE",
    "PLUM",
    "PLUM",
    "PLUM",
    "PLUM",
    "WATERMELON",
    "WATERMELON",
    "WATERMELON",
    "GRAPES",
    "GRAPES",
    "GRAPES",
  ];
  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Build 3 virtual reel strips (30 positions each)
 * Classic slot: each reel has its own strip composition
 */
export function buildReelStrips() {
  const strips = [];
  for (let r = 0; r < 3; r++) {
    const strip = [];
    for (let i = 0; i < 30; i++) {
      strip.push(weightedRandom());
    }
    strips.push(strip);
  }
  return strips;
}
