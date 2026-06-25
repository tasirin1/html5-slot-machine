const API_BASE = window.location.origin;

const JackpotAPI = {
  async fetchConfig() {
    try {
      const response = await fetch(`${API_BASE}/api/config`);
      if (!response.ok) throw new Error("HTTP " + response.status);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch config:", error);
      return null;
    }
  },

  async postConfig(body) {
    try {
      const response = await fetch(`${API_BASE}/api/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to post config:", error);
      return null;
    }
  },

  async fetchJackpot() {
    try {
      const response = await fetch(`${API_BASE}/api/jackpot`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch jackpot:", error);
      return { jackpot: 5555555, formatted: "5.555.555" };
    }
  },

  async updatePlayerMoney(money) {
    try {
      const response = await fetch(`${API_BASE}/api/config`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ playerMoney: money }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to sync money:", error);
      return null;
    }
  },

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};

export default JackpotAPI;
