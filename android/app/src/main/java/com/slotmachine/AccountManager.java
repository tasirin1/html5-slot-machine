package com.slotmachine;

import android.content.Context;
import android.content.SharedPreferences;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.Iterator;

public class AccountManager {
    private static final String PREFS_NAME = "accounts_prefs";
    private static final String KEY_ACCOUNTS = "accounts_json";
    private static final String KEY_SEQ = "next_id";

    private static AccountManager instance;
    private final SharedPreferences prefs;
    private JSONObject accounts;

    private AccountManager(Context context) {
        prefs = context.getApplicationContext()
            .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        load();
    }

    public static synchronized AccountManager getInstance(Context context) {
        if (instance == null) instance = new AccountManager(context);
        return instance;
    }

    public static synchronized AccountManager getInstance() {
        if (instance == null) throw new IllegalStateException("Not initialized");
        return instance;
    }

    private void load() {
        String json = prefs.getString(KEY_ACCOUNTS, "{}");
        try { accounts = new JSONObject(json); }
        catch (JSONException e) { accounts = new JSONObject(); }
    }

    private void save() {
        prefs.edit().putString(KEY_ACCOUNTS, accounts.toString()).apply();
    }

    /** Create a new account. Returns JSON with account data or error. */
    public String createAccount(String username, String pin, long balance) {
        try {
            if (username == null || username.trim().isEmpty())
                return error("Username required");
            if (pin == null || pin.length() < 3)
                return error("PIN must be at least 3 characters");

            String key = username.trim().toLowerCase();
            if (accounts.has(key))
                return error("Username already exists");

            JSONObject acc = new JSONObject();
            acc.put("username", username.trim());
            acc.put("pin", pin);
            acc.put("balance", balance);
            accounts.put(key, acc);
            save();
            return success("account", acc);
        } catch (JSONException e) {
            return error("Internal error");
        }
    }

    /** Authenticate and return account. */
    public String login(String username, String pin) {
        try {
            String key = username.trim().toLowerCase();
            if (!accounts.has(key))
                return error("Account not found");

            JSONObject acc = accounts.getJSONObject(key);
            if (!acc.getString("pin").equals(pin))
                return error("Wrong PIN");

            return success("account", acc);
        } catch (JSONException e) {
            return error("Internal error");
        }
    }

    /** Update account balance. Returns updated account or error. */
    public String updateBalance(String username, String pin, long newBalance) {
        try {
            String key = username.trim().toLowerCase();
            if (!accounts.has(key))
                return error("Account not found");

            JSONObject acc = accounts.getJSONObject(key);
            if (!acc.getString("pin").equals(pin))
                return error("Wrong PIN");

            acc.put("balance", Math.max(0, newBalance));
            accounts.put(key, acc);
            save();
            return success("account", acc);
        } catch (JSONException e) {
            return error("Internal error");
        }
    }

    /** Admin: get all accounts. */
    public String getAllAccounts() {
        try {
            JSONArray list = new JSONArray();
            Iterator<String> keys = accounts.keys();
            while (keys.hasNext()) {
                list.put(accounts.get(keys.next()));
            }
            JSONObject res = new JSONObject();
            res.put("success", true);
            res.put("accounts", list);
            res.put("count", list.length());
            return res.toString();
        } catch (JSONException e) {
            return error("Internal error");
        }
    }

    /** Admin: delete account. */
    public String deleteAccount(String username) {
        String key = username.trim().toLowerCase();
        if (!accounts.has(key))
            return error("Account not found");
        accounts.remove(key);
        save();
        return success("deleted", username.trim());
    }

    /** Admin: reset all balances to given amount. */
    public String resetAllBalances(long amount) {
        try {
            Iterator<String> keys = accounts.keys();
            while (keys.hasNext()) {
                JSONObject acc = accounts.getJSONObject(keys.next());
                acc.put("balance", amount);
            }
            save();
            return getAllAccounts();
        } catch (JSONException e) {
            return error("Internal error");
        }
    }

    /** Get total player money across all accounts. */
    public long getTotalMoney() {
        long total = 0;
        try {
            Iterator<String> keys = accounts.keys();
            while (keys.hasNext()) {
                total += accounts.getJSONObject(keys.next()).optLong("balance", 0);
            }
        } catch (JSONException ignored) {}
        return total;
    }

    public int getAccountCount() {
        return accounts.length();
    }

    private String success(String key, Object value) {
        try {
            JSONObject r = new JSONObject();
            r.put("success", true);
            r.put(key, value);
            return r.toString();
        } catch (JSONException e) {
            return "{\"success\":true}";
        }
    }

    private String error(String msg) {
        return "{\"success\":false,\"error\":\"" + msg + "\"}";
    }
}
