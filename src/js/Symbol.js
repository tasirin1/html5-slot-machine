const SYMBOLS = {
  seven: {
    icon: "7",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#8B0000,#DC143C)",
    mult: 50,
  },
  bar: {
    icon: "BAR",
    color: "#fff",
    bg: "linear-gradient(135deg,#1a1a2e,#333)",
    mult: 25,
  },
  bell: {
    icon: "🔔",
    color: "#FFD700",
    bg: "linear-gradient(135deg,#4a0030,#8b0060)",
    mult: 15,
  },
  cherry: {
    icon: "🍒",
    color: "#fff",
    bg: "linear-gradient(135deg,#600,#cc0033)",
    mult: 10,
  },
  lemon: {
    icon: "🍋",
    color: "#fff",
    bg: "linear-gradient(135deg,#3a5000,#6b8e00)",
    mult: 8,
  },
  orange: {
    icon: "🍊",
    color: "#fff",
    bg: "linear-gradient(135deg,#803000,#cc5500)",
    mult: 6,
  },
  plum: {
    icon: "🍑",
    color: "#fff",
    bg: "linear-gradient(135deg,#400060,#7a00b3)",
    mult: 5,
  },
  melon: {
    icon: "🍉",
    color: "#fff",
    bg: "linear-gradient(135deg,#004d00,#008000)",
    mult: 4,
  },
  grapes: {
    icon: "🍇",
    color: "#fff",
    bg: "linear-gradient(135deg,#1a003a,#4a0080)",
    mult: 3,
  },
};

const SYMBOL_NAMES = Object.keys(SYMBOLS);

export default class Symbol {
  static getData(name) {
    return SYMBOLS[name] || SYMBOLS.seven;
  }

  static random() {
    return SYMBOL_NAMES[Math.floor(Math.random() * SYMBOL_NAMES.length)];
  }
}
