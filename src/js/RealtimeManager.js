/**
 * RealtimeManager — WebSocket client for real-time game config synchronization.
 *
 * Connects to the Android embedded WebSocket server (port 9090).
 * Receives events and dispatches them to GameManager.
 *
 * Events handled:
 *   configChanged      → update game config immediately
 *   jackpotChanged     → update jackpot display
 *   balanceChanged     → update player balance
 *   difficultyChanged  → update difficulty parameters
 *   maintenanceMode    → show/hide maintenance notice
 *   resetGame          → reset game state
 *
 * Auto-reconnect with exponential backoff (max 5 seconds).
 */

export default class RealtimeManager {
  constructor(gameManager) {
    this.gm = gameManager;
    this.ws = null;
    this.reconnectAttempts = 0;
    this.maxBackoff = 5000; // 5 seconds max
    this.intentionalClose = false;
    this.lastConfig = null;

    this.connect();
  }

  /**
   * Build WebSocket URL from current page origin
   */
  _getWsUrl() {
    const host = window.location.hostname || "localhost";
    const port = 9090;
    return `ws://${host}:${port}`;
  }

  /**
   * Establish WebSocket connection
   */
  connect() {
    if (
      this.ws &&
      (this.ws.readyState === WebSocket.OPEN ||
        this.ws.readyState === WebSocket.CONNECTING)
    ) {
      return;
    }

    this.intentionalClose = false;
    const url = this._getWsUrl();

    try {
      this.ws = new WebSocket(url);
    } catch (e) {
      console.warn("[Realtime] WebSocket creation failed:", e.message);
      this._scheduleReconnect();
      return;
    }

    this.ws.onopen = () => {
      console.log("[Realtime] Connected to " + url);
      this.reconnectAttempts = 0;
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        this._dispatch(data);
      } catch (e) {
        console.warn("[Realtime] Invalid message:", e.message);
      }
    };

    this.ws.onclose = (event) => {
      console.log("[Realtime] Disconnected (code=" + event.code + ")");
      if (!this.intentionalClose) {
        this._scheduleReconnect();
      }
    };

    this.ws.onerror = () => {
      // onclose will fire after this
    };
  }

  /**
   * Dispatch event to GameManager
   */
  _dispatch(data) {
    if (!data || !data.type) return;

    switch (data.type) {
      case "configChanged":
        this.lastConfig = data.config || {};
        if (this.gm && typeof this.gm.onConfigChanged === "function") {
          this.gm.onConfigChanged(this.lastConfig);
        }
        break;

      case "jackpotChanged":
        if (this.gm && typeof this.gm.onJackpotChanged === "function") {
          this.gm.onJackpotChanged(data.value);
        }
        break;

      case "balanceChanged":
        if (this.gm && typeof this.gm.onBalanceChanged === "function") {
          this.gm.onBalanceChanged(data.player, data.balance);
        }
        break;

      case "difficultyChanged":
        if (this.gm && typeof this.gm.onDifficultyChanged === "function") {
          this.gm.onDifficultyChanged(
            data.level,
            data.winRate,
            data.payoutMultiplier,
          );
        }
        break;

      case "maintenanceMode":
        if (this.gm && typeof this.gm.onMaintenanceMode === "function") {
          this.gm.onMaintenanceMode(data.enabled);
        }
        break;

      case "resetGame":
        if (this.gm && typeof this.gm.onResetGame === "function") {
          this.gm.onResetGame();
        }
        break;

      default:
        console.log("[Realtime] Unknown event type:", data.type);
    }
  }

  /**
   * Schedule reconnect with exponential backoff
   */
  _scheduleReconnect() {
    const delay = Math.min(
      1000 * Math.pow(2, this.reconnectAttempts),
      this.maxBackoff,
    );
    this.reconnectAttempts++;
    console.log(
      `[Realtime] Reconnecting in ${delay}ms (attempt ${this.reconnectAttempts})`,
    );
    setTimeout(() => this.connect(), delay);
  }

  /**
   * Gracefully close the connection
   */
  disconnect() {
    this.intentionalClose = true;
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {}
      this.ws = null;
    }
  }
}
