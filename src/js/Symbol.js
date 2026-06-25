const cache = {};

export default class Symbol {
  constructor(name = Symbol.random()) {
    this.name = name;

    if (cache[name]) {
      this.img = cache[name].cloneNode(true);
    } else {
      this.img = Symbol.createImage(name);
      cache[name] = this.img;
    }
  }

  static createImage(name) {
    const div = document.createElement("div");
    div.className = "sym " + name;
    div.style.cssText =
      "width:100%;aspect-ratio:1;display:flex;align-items:center;justify-content:center;" +
      "font-size:clamp(28px,5vw,52px);font-weight:bold;border-radius:8px;" +
      "margin:2px 0;user-select:none;";

    const data = Symbol.DATA[name] || Symbol.DATA["seven"];
    div.style.background = data.bg;
    div.style.color = data.color;
    div.style.textShadow = data.shadow || "none";
    div.style.border = data.border || "2px solid rgba(255,255,255,0.1)";
    div.textContent = data.icon;

    return div;
  }

  static preload() {
    Symbol.symbols.forEach((s) => new Symbol(s));
  }

  static get symbols() {
    return [
      "seven",
      "bar",
      "bell",
      "cherry",
      "lemon",
      "orange",
      "plum",
      "watermelon",
      "grapes",
    ];
  }

  static random() {
    return this.symbols[Math.floor(Math.random() * this.symbols.length)];
  }

  static get DATA() {
    return {
      seven: {
        icon: "7",
        color: "#FFD700",
        bg: "linear-gradient(135deg,#8B0000,#DC143C)",
        shadow: "0 0 10px #FFD700, 2px 2px 0 #400",
        border: "2px solid #FFD700",
      },
      bar: {
        icon: "BAR",
        color: "#fff",
        bg: "linear-gradient(135deg,#1a1a2e,#333)",
        shadow: "1px 1px 0 #000",
        border: "2px solid #666",
      },
      bell: {
        icon: "🔔",
        color: "#FFD700",
        bg: "linear-gradient(135deg,#4a0030,#8b0060)",
        shadow: "0 0 8px #FFD700",
        border: "2px solid #FFD700",
      },
      cherry: {
        icon: "🍒",
        color: "#fff",
        bg: "linear-gradient(135deg,#600,#cc0033)",
        shadow: "none",
        border: "2px solid #ff3366",
      },
      lemon: {
        icon: "🍋",
        color: "#fff",
        bg: "linear-gradient(135deg,#3a5000,#6b8e00)",
        shadow: "none",
        border: "2px solid #aadd00",
      },
      orange: {
        icon: "🍊",
        color: "#fff",
        bg: "linear-gradient(135deg,#803000,#cc5500)",
        shadow: "none",
        border: "2px solid #ff7700",
      },
      plum: {
        icon: "🍑",
        color: "#fff",
        bg: "linear-gradient(135deg,#400060,#7a00b3)",
        shadow: "none",
        border: "2px solid #aa44ff",
      },
      watermelon: {
        icon: "🍉",
        color: "#fff",
        bg: "linear-gradient(135deg,#004d00,#008000)",
        shadow: "none",
        border: "2px solid #33cc33",
      },
      grapes: {
        icon: "🍇",
        color: "#fff",
        bg: "linear-gradient(135deg,#1a003a,#4a0080)",
        shadow: "none",
        border: "2px solid #8833ff",
      },
    };
  }
}
