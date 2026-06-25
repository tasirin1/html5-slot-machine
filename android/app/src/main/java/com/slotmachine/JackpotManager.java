package com.slotmachine;

import android.content.Context;
import android.content.SharedPreferences;

public class JackpotManager {
    private static final String PREFS_NAME = "slot_machine_prefs";
    private static final String KEY_JACKPOT = "jackpot_value";

    private static JackpotManager instance;
    private SharedPreferences prefs;
    private long currentJackpot;

    private JackpotManager(Context context) {
        prefs = context.getApplicationContext()
            .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        currentJackpot = prefs.getLong(KEY_JACKPOT, 5555555L);
    }

    public static synchronized JackpotManager getInstance(Context context) {
        if (instance == null) {
            instance = new JackpotManager(context);
        }
        return instance;
    }

    public static synchronized JackpotManager getInstance() {
        if (instance == null) {
            throw new IllegalStateException("JackpotManager not initialized with context");
        }
        return instance;
    }

    public synchronized long getJackpot() {
        return currentJackpot;
    }

    public synchronized void setJackpot(long value) {
        currentJackpot = value;
        prefs.edit().putLong(KEY_JACKPOT, value).apply();
    }

    public synchronized String getFormattedJackpot() {
        return String.format("%,d", currentJackpot).replace(",", ".");
    }
}
