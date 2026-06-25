const API_BASE = window.location.origin;

const JackpotAPI = {
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

  async fetchConfig() {
    try {
      const response = await fetch(`${API_BASE}/api/config`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Failed to fetch config:", error);
      return {
        difficulty: "Medium",
        winRate: 0.15,
        payoutMultiplier: 3,
        minSpinsBeforeWin: 10,
        jackpotHitRate: 0.005,
        jackpot: 5555555,
        formattedJackpot: "5.555.555",
      };
    }
  },

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};

export default JackpotAPI;
