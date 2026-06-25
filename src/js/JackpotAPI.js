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

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};

export default JackpotAPI;
