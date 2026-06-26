const BASE = window.location.origin;

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
  async fetchConfig() {
    return apiGet("/api/config");
  },
  async saveMoney(balance) {
    return apiPost("/api/money", { balance });
  },
  async fetchMoney() {
    const d = await apiGet("/api/money");
    return d || { balance: 1000 };
  },
  formatNumber(num) {
    return (num || 0).toLocaleString("id-ID");
  },
};

export default JackpotAPI;
