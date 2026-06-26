/**
 * JackpotAPI — communicates with embedded server's REST API
 * Falls back gracefully when server is not available
 */

const BASE = window.location.origin;

async function apiGet(path) {
  try {
    const r = await fetch(BASE + path, {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!r.ok) return null;
    return await r.json();
  } catch (e) {
    return null;
  }
}

async function apiPost(path, data) {
  try {
    const params = new URLSearchParams();
    for (const [key, val] of Object.entries(data)) {
      params.append(key, val);
    }
    const r = await fetch(BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });
    if (!r.ok) return { success: false };
    return await r.json();
  } catch (e) {
    return { success: false };
  }
}

const JackpotAPI = {
  /**
   * Fetch game configuration from server
   * Returns config object or null
   */
  async fetchConfig() {
    const data = await apiGet("/api/config");
    if (!data) return null;
    return {
      winRate: data.winRate !== undefined ? data.winRate : null,
      payoutMultiplier:
        data.payoutMultiplier !== undefined ? data.payoutMultiplier : null,
      minSpinsBeforeWin:
        data.minSpinsBeforeWin !== undefined ? data.minSpinsBeforeWin : null,
      jackpotHitRate:
        data.jackpotHitRate !== undefined ? data.jackpotHitRate : null,
      startingMoney:
        data.startingMoney !== undefined ? data.startingMoney : null,
      betAmount: data.betAmount !== undefined ? data.betAmount : null,
      jackpot: data.jackpot !== undefined ? data.jackpot : null,
      difficultyId: data.difficultyId !== undefined ? data.difficultyId : null,
      difficultyLabel: data.difficultyLabel || null,
    };
  },

  /**
   * Save balance to server
   */
  async saveMoney(balance) {
    return apiPost("/api/money", { balance: Math.floor(balance) });
  },

  /**
   * Fetch current balance from server
   */
  async fetchMoney() {
    const d = await apiGet("/api/money");
    return d || { balance: 1000 };
  },

  formatNumber(num) {
    return (num || 0).toLocaleString("id-ID");
  },
};

export default JackpotAPI;
