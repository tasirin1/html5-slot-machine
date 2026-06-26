import GameManager from "./GameManager.js";

// Wait for DOM, then start game
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new GameManager());
} else {
  new GameManager();
}
