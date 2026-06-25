const BASE = window.location.origin;

async function apiPost(path, data) {
  try {
    const r = await fetch(BASE + path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return await r.json();
  } catch (e) {
    return { success: false, error: "Connection failed" };
  }
}

async function apiGet(path) {
  try {
    const r = await fetch(BASE + path);
    return await r.json();
  } catch (e) {
    return null;
  }
}

const JackpotAPI = {
  async login(username, pin) {
    return apiPost("/api/login", { username, pin });
  },

  async updateBalance(username, pin, balance) {
    return apiPost("/api/account", { username, pin, balance });
  },

  async fetchConfig() {
    return apiGet("/api/config");
  },

  async fetchJackpot() {
    const d = await apiGet("/api/jackpot");
    return d || { jackpot: 5555555, formatted: "5.555.555" };
  },

  formatNumber(num) {
    return String(num).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  },
};

export default JackpotAPI;
