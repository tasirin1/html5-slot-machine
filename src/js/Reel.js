import Symbol from "./Symbol.js";

export default class Reel {
  constructor(element) {
    this.element = element;
    this.items = [];
    for (let i = 0; i < 3; i++) {
      const div = document.createElement("div");
      div.className = "sym";
      this.element.appendChild(div);
      this.items.push(div);
    }
  }

  setSymbols(names) {
    for (let i = 0; i < 3; i++) {
      const name = names[i] || Symbol.random();
      const d = Symbol.getData(name);
      this.items[i].textContent = d.icon;
      this.items[i].style.cssText = `background:${d.bg};color:${d.color};`;
    }
  }

  async spin(finalSymbols, duration = 600) {
    const start = Date.now();
    return new Promise((resolve) => {
      const timer = setInterval(() => {
        if (Date.now() - start >= duration) {
          clearInterval(timer);
          this.setSymbols(finalSymbols);
          resolve();
          return;
        }
        for (const el of this.items) {
          const sym = Symbol.random();
          const d = Symbol.getData(sym);
          el.textContent = d.icon;
          el.style.cssText = `background:${d.bg};color:${d.color};`;
        }
      }, 60);
    });
  }
}
