package com.slotmachine;

import android.content.Context;
import android.content.SharedPreferences;

public class GameConfig {
    private static final String PREFS_NAME = "game_config_prefs";
    private static final String KEY_DIFFICULTY = "difficulty";
    private static final String KEY_JACKPOT = "jackpot_value";
    private static final String KEY_WIN_RATE = "win_rate";
    private static final String KEY_PAYOUT_MULTIPLIER = "payout_multiplier";
    private static final String KEY_MIN_SPINS = "min_spins_before_win";
    private static final String KEY_JACKPOT_HIT_RATE = "jackpot_hit_rate";
    private static final String KEY_STARTING_MONEY = "starting_money";
    private static final String KEY_BET_AMOUNT = "bet_amount";
    private static final String KEY_PLAYER_MONEY = "player_money";
    private static final String KEY_MIN_BET = "min_bet";
    private static final String KEY_MAX_BET = "max_bet";

    private static GameConfig instance;
    private final SharedPreferences prefs;

    public enum Difficulty {
        VERY_EASY(0, "Very Easy", 0.50f, 1.5f, 2, 0.02f),
        EASY(1, "Easy", 0.30f, 2.0f, 5, 0.01f),
        MEDIUM(2, "Medium", 0.15f, 3.0f, 10, 0.005f),
        HARD(3, "Hard", 0.08f, 5.0f, 20, 0.002f),
        VERY_HARD(4, "Very Hard", 0.03f, 10.0f, 50, 0.001f),
        IMPOSSIBLE(5, "Impossible", 0.005f, 20.0f, 100, 0.0001f);

        public final int id;
        public final String label;
        public final float winRate;
        public final float payoutMultiplier;
        public final int minSpinsBeforeWin;
        public final float jackpotHitRate;

        Difficulty(int id, String label, float winRate, float payoutMultiplier,
                   int minSpinsBeforeWin, float jackpotHitRate) {
            this.id = id;
            this.label = label;
            this.winRate = winRate;
            this.payoutMultiplier = payoutMultiplier;
            this.minSpinsBeforeWin = minSpinsBeforeWin;
            this.jackpotHitRate = jackpotHitRate;
        }

        public static Difficulty fromId(int id) {
            for (Difficulty d : values()) {
                if (d.id == id) return d;
            }
            return MEDIUM;
        }
    }

    private GameConfig(Context context) {
        prefs = context.getApplicationContext()
            .getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
    }

    public static synchronized GameConfig getInstance(Context context) {
        if (instance == null) {
            instance = new GameConfig(context);
        }
        return instance;
    }

    public static synchronized GameConfig getInstance() {
        if (instance == null) {
            throw new IllegalStateException("GameConfig not initialized");
        }
        return instance;
    }

    public void saveAll() {
        prefs.edit()
            .putInt(KEY_DIFFICULTY, getDifficulty().id)
            .putFloat(KEY_WIN_RATE, getWinRate())
            .putFloat(KEY_PAYOUT_MULTIPLIER, getPayoutMultiplier())
            .putInt(KEY_MIN_SPINS, getMinSpinsBeforeWin())
            .putFloat(KEY_JACKPOT_HIT_RATE, getJackpotHitRate())
            .putLong(KEY_JACKPOT, getJackpot())
            .putLong(KEY_STARTING_MONEY, getStartingMoney())
            .putLong(KEY_BET_AMOUNT, getBetAmount())
            .putLong(KEY_PLAYER_MONEY, getPlayerMoney())
            .apply();
    }

    // === Difficulty ===

    public Difficulty getDifficulty() {
        return Difficulty.fromId(prefs.getInt(KEY_DIFFICULTY, 2));
    }

    public void setDifficulty(Difficulty difficulty) {
        prefs.edit()
            .putInt(KEY_DIFFICULTY, difficulty.id)
            .putFloat(KEY_WIN_RATE, difficulty.winRate)
            .putFloat(KEY_PAYOUT_MULTIPLIER, difficulty.payoutMultiplier)
            .putInt(KEY_MIN_SPINS, difficulty.minSpinsBeforeWin)
            .putFloat(KEY_JACKPOT_HIT_RATE, difficulty.jackpotHitRate)
            .apply();
    }

    // === Jackpot ===

    public long getJackpot() { return prefs.getLong(KEY_JACKPOT, 5555555L); }
    public void setJackpot(long value) { prefs.edit().putLong(KEY_JACKPOT, value).apply(); }

    // === Win Config ===

    public float getWinRate() { return prefs.getFloat(KEY_WIN_RATE, 0.15f); }
    public float getPayoutMultiplier() { return prefs.getFloat(KEY_PAYOUT_MULTIPLIER, 3.0f); }
    public int getMinSpinsBeforeWin() { return prefs.getInt(KEY_MIN_SPINS, 10); }
    public float getJackpotHitRate() { return prefs.getFloat(KEY_JACKPOT_HIT_RATE, 0.005f); }

    public void setCustomConfig(float winRate, float payoutMultiplier,
                                 int minSpins, float jackpotHitRate) {
        prefs.edit()
            .putInt(KEY_DIFFICULTY, -1)
            .putFloat(KEY_WIN_RATE, winRate)
            .putFloat(KEY_PAYOUT_MULTIPLIER, payoutMultiplier)
            .putInt(KEY_MIN_SPINS, minSpins)
            .putFloat(KEY_JACKPOT_HIT_RATE, jackpotHitRate)
            .apply();
    }

    // === Money ===

    public long getStartingMoney() { return prefs.getLong(KEY_STARTING_MONEY, 1000); }
    public void setStartingMoney(long value) { prefs.edit().putLong(KEY_STARTING_MONEY, value).apply(); }

    public long getBetAmount() { return prefs.getLong(KEY_BET_AMOUNT, 100); }
    public void setBetAmount(long value) { prefs.edit().putLong(KEY_BET_AMOUNT, value).apply(); }

    public long getPlayerMoney() { return prefs.getLong(KEY_PLAYER_MONEY, getStartingMoney()); }
    public void setPlayerMoney(long value) { prefs.edit().putLong(KEY_PLAYER_MONEY, value).apply(); }

    public long getCurrentMoney() { return prefs.getLong("current_money", getStartingMoney()); }
    public void setCurrentMoney(long value) { prefs.edit().putLong("current_money", value).apply(); }

    public String getFormattedJackpot() {
        return String.format("%,d", getJackpot()).replace(",", ".");
    }

    public String getFormattedMoney(long value) {
        return String.format("%,d", value).replace(",", ".");
    }

    /** Generate JSON with all config */
    public String toJson() {
        return "{"
            + "\"difficulty\": \"" + getDifficulty().label + "\","
            + "\"difficultyId\": " + getDifficulty().id + ","
            + "\"jackpot\": " + getJackpot() + ","
            + "\"formattedJackpot\": \"" + getFormattedJackpot() + "\","
            + "\"winRate\": " + getWinRate() + ","
            + "\"payoutMultiplier\": " + getPayoutMultiplier() + ","
            + "\"minSpinsBeforeWin\": " + getMinSpinsBeforeWin() + ","
            + "\"jackpotHitRate\": " + getJackpotHitRate() + ","
            + "\"startingMoney\": " + getStartingMoney() + ","
            + "\"betAmount\": " + getBetAmount() + ","
            + "\"playerMoney\": " + getPlayerMoney()
            + "}";
    }
}
