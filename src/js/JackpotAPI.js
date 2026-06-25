const API_BASE = window.location.origin;

const JackpotAPI = {
  async login(username, pin) {
    try {
      const r = await fetch(`${API_BASE}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pin }),
      });
      return await r.json();
    } catch (e) {
      return { success: false, error: "Connection failed" };
    }
  },

  async updateAccount(username, pin, balance) {
    try {
      const r = await fetch(`${API_BASE}/api/account`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, pin, balance }),
      });
      return await r.json();
    } catch (e) {
      return { success: false };
    }
  },

  async fetchConfig() {
    try {
      const r = await fetch(`${API_BASE}/api/config`);
      return await r.json();
    } catch (e) {
      return null;
    }
  },

  async fetchJackpot() {
    try {
      const r = await fetch(`${API_BASE}/api/jackpot`);
      return await r.json();
    } catch (e) {
      return { jackpot: 5555555, formatted: "5.555.555" };
    }
  },

  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};

export default JackpotAPI;
