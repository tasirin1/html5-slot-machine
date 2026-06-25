package com.slotmachine;

import android.app.AlertDialog;
import android.os.Bundle;
import android.view.View;
import android.widget.*;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private SlotServer server;
    private GameConfig gameConfig;
    private AccountManager accountManager;

    // Views
    private TextView serverUrlText, statusText, currentJackpotText;
    private Spinner difficultySpinner;
    private SeekBar winRateSeekBar, payoutSeekBar;
    private TextView winRateValue, payoutValue;
    private EditText jackpotInput, startingMoneyInput, betAmountInput;
    private Button btnSaveJackpot, btnSaveMoney, btnAddAccount, btnResetAll;
    private TextView accountCountText, totalMoneyText;
    private LinearLayout accountListLayout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        try {
            initApp();
        } catch (Throwable e) {
            android.util.Log.e("MainActivity", "Init error", e);
            Toast.makeText(this, "Error: " + (e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName()), Toast.LENGTH_LONG).show();
        }
    }

    private void initApp() {
        gameConfig = GameConfig.getInstance(this);
        accountManager = AccountManager.getInstance(this);

        // Init views
        serverUrlText = findViewById(R.id.serverUrlText);
        statusText = findViewById(R.id.statusText);
        currentJackpotText = findViewById(R.id.currentJackpotText);
        difficultySpinner = findViewById(R.id.difficultySpinner);
        winRateValue = findViewById(R.id.winRateValue);
        winRateSeekBar = findViewById(R.id.winRateSeekBar);
        payoutValue = findViewById(R.id.payoutValue);
        payoutSeekBar = findViewById(R.id.payoutSeekBar);
        jackpotInput = findViewById(R.id.jackpotInput);
        btnSaveJackpot = findViewById(R.id.btnSaveJackpot);
        startingMoneyInput = findViewById(R.id.startingMoneyInput);
        betAmountInput = findViewById(R.id.betAmountInput);
        btnSaveMoney = findViewById(R.id.btnSaveMoney);
        btnAddAccount = findViewById(R.id.btnAddAccount);
        btnResetAll = findViewById(R.id.btnResetAll);
        accountCountText = findViewById(R.id.accountCountText);
        totalMoneyText = findViewById(R.id.totalMoneyText);
        accountListLayout = findViewById(R.id.accountListLayout);

        // Start server on background thread
        startServerAsync();

        setupDifficulty();
        setupSeekBars();
        setupJackpot();
        setupMoney();
        setupAccounts();

        updateDisplay();
    }

    private void startServerAsync() {
        new Thread(new Runnable() {
            @Override
            public void run() {
                try {
                    server = new SlotServer(MainActivity.this);
                    server.startServer();
                    final String url = server.getServerUrl();
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if (serverUrlText != null)
                                serverUrlText.setText(url);
                        }
                    });
                } catch (final Exception e) {
                    android.util.Log.e("MainActivity", "Server start error", e);
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if (serverUrlText != null)
                                serverUrlText.setText("Server error: " + 
                                    (e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName()));
                        }
                    });
                }
            }
        }).start();
    }

    // ===== DIFFICULTY =====

    private void setupDifficulty() {
        String[] items = {"Very Easy","Easy","Medium","Hard","Very Hard","Impossible","Custom"};
        difficultySpinner.setAdapter(new ArrayAdapter<>(this,
            android.R.layout.simple_spinner_dropdown_item, items));
        int pos = gameConfig.getDifficulty().id;
        if (pos >= 0 && pos < 6) difficultySpinner.setSelection(pos);
        difficultySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override public void onItemSelected(AdapterView<?> p, View v, int pos, long id) {
                if (pos < 6) {
                    gameConfig.setDifficulty(GameConfig.Difficulty.fromId(pos));
                    updateDisplay();
                    Toast.makeText(MainActivity.this, "Difficulty: " +
                        GameConfig.Difficulty.fromId(pos).label, Toast.LENGTH_SHORT).show();
                }
            }
            @Override public void onNothingSelected(AdapterView<?> p) {}
        });
    }

    private void setupSeekBars() {
        winRateSeekBar.setMax(149);
        winRateSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override public void onProgressChanged(SeekBar s, int p, boolean u) {
                winRateValue.setText(String.format("%.1f%%", 0.5f + p * 0.5f));
            }
            @Override public void onStartTrackingTouch(SeekBar s) {}
            @Override public void onStopTrackingTouch(SeekBar s) {
                float rate = 0.5f + s.getProgress() * 0.5f;
                gameConfig.setCustomConfig(rate/100f, gameConfig.getPayoutMultiplier(),
                    gameConfig.getMinSpinsBeforeWin(), gameConfig.getJackpotHitRate());
                difficultySpinner.setSelection(6);
                updateDisplay();
            }
        });

        payoutSeekBar.setMax(49);
        payoutSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override public void onProgressChanged(SeekBar s, int p, boolean u) {
                payoutValue.setText(String.format("%.0fx", 1f + p));
            }
            @Override public void onStartTrackingTouch(SeekBar s) {}
            @Override public void onStopTrackingTouch(SeekBar s) {
                float mult = 1f + s.getProgress();
                gameConfig.setCustomConfig(gameConfig.getWinRate(), mult,
                    gameConfig.getMinSpinsBeforeWin(), gameConfig.getJackpotHitRate());
                difficultySpinner.setSelection(6);
                updateDisplay();
            }
        });
    }

    // ===== JACKPOT =====

    private void setupJackpot() {
        jackpotInput.setText(String.valueOf(gameConfig.getJackpot()));
        btnSaveJackpot.setOnClickListener(v -> {
            try {
                long val = Long.parseLong(jackpotInput.getText().toString().trim());
                if (val < 0) { Toast.makeText(this, "Invalid", Toast.LENGTH_SHORT).show(); return; }
                gameConfig.setJackpot(val);
                updateDisplay();
                Toast.makeText(this, "Jackpot: " + gameConfig.getFormattedJackpot(), Toast.LENGTH_SHORT).show();
            } catch (Exception e) { Toast.makeText(this, "Invalid number", Toast.LENGTH_SHORT).show(); }
        });
    }

    // ===== MONEY =====

    private void setupMoney() {
        startingMoneyInput.setText(String.valueOf(gameConfig.getStartingMoney()));
        betAmountInput.setText(String.valueOf(gameConfig.getBetAmount()));
        btnSaveMoney.setOnClickListener(v -> {
            try {
                long sm = Long.parseLong(startingMoneyInput.getText().toString().trim());
                long bet = Long.parseLong(betAmountInput.getText().toString().trim());
                if (sm < 1 || bet < 1 || bet > sm) {
                    Toast.makeText(this, "Invalid values", Toast.LENGTH_SHORT).show(); return;
                }
                gameConfig.setStartingMoney(sm);
                gameConfig.setBetAmount(bet);
                updateDisplay();
                Toast.makeText(this, "Money settings saved", Toast.LENGTH_SHORT).show();
            } catch (Exception e) { Toast.makeText(this, "Invalid", Toast.LENGTH_SHORT).show(); }
        });
    }

    // ===== ACCOUNTS =====

    private void setupAccounts() {
        btnAddAccount.setOnClickListener(v -> showCreateAccountDialog());
        btnResetAll.setOnClickListener(v -> {
            new AlertDialog.Builder(this)
                .setTitle("Reset All Accounts?")
                .setMessage("All balances will be reset to " + gameConfig.getFormattedJackpot())
                .setPositiveButton("Reset", (d, w) -> {
                    accountManager.resetAllBalances(gameConfig.getStartingMoney());
                    refreshAccountList();
                    Toast.makeText(this, "All accounts reset", Toast.LENGTH_SHORT).show();
                })
                .setNegativeButton("Cancel", null)
                .show();
        });
        refreshAccountList();
    }

    private void refreshAccountList() {
        if (accountListLayout == null) return;
        // Remove all existing account rows safely
        while (accountListLayout.getChildCount() > 0) {
            accountListLayout.removeViewAt(0);
        }
        String json = accountManager.getAllAccounts();
        try {
            org.json.JSONObject res = new org.json.JSONObject(json);
            org.json.JSONArray list = res.getJSONArray("accounts");
            accountCountText.setText(list.length() + " accounts");
            long total = 0;
            for (int i = 0; i < list.length(); i++) {
                org.json.JSONObject acc = list.getJSONObject(i);
                total += acc.optLong("balance", 0);
                addAccountRow(acc);
            }
            totalMoneyText.setText(formatMoney(total));
        } catch (Exception e) {
            accountCountText.setText("0 accounts");
            totalMoneyText.setText("0");
        }
    }

    private void addAccountRow(org.json.JSONObject acc) throws Exception {
        View row = getLayoutInflater().inflate(R.layout.item_account, accountListLayout, false);
        TextView nameText = row.findViewById(R.id.accNameText);
        TextView balanceText = row.findViewById(R.id.accBalanceText);
        Button editBtn = row.findViewById(R.id.accEditBtn);
        Button deleteBtn = row.findViewById(R.id.accDeleteBtn);

        String username = acc.getString("username");
        long balance = acc.optLong("balance", 0);

        nameText.setText(username);
        balanceText.setText(formatMoney(balance));

        editBtn.setOnClickListener(v -> showEditAccountDialog(username, balance));
        deleteBtn.setOnClickListener(v -> {
            accountManager.deleteAccount(username);
            refreshAccountList();
            Toast.makeText(this, "Deleted: " + username, Toast.LENGTH_SHORT).show();
        });

        accountListLayout.addView(row);
    }

    private void showCreateAccountDialog() {
        View v = getLayoutInflater().inflate(R.layout.dialog_account, null);
        EditText userInput = v.findViewById(R.id.dialogUsername);
        EditText pinInput = v.findViewById(R.id.dialogPin);
        EditText balanceInput = v.findViewById(R.id.dialogBalance);
        balanceInput.setText(String.valueOf(gameConfig.getStartingMoney()));

        new AlertDialog.Builder(this)
            .setTitle("Add Account")
            .setView(v)
            .setPositiveButton("Create", (d, w) -> {
                String result = accountManager.createAccount(
                    userInput.getText().toString(),
                    pinInput.getText().toString(),
                    Long.parseLong(balanceInput.getText().toString().replaceAll("[^0-9]", ""))
                );
                if (result.contains("\"success\":true")) {
                    refreshAccountList();
                    Toast.makeText(this, "Account created!", Toast.LENGTH_SHORT).show();
                } else {
                    Toast.makeText(this, "Error: account exists", Toast.LENGTH_SHORT).show();
                }
            })
            .setNegativeButton("Cancel", null)
            .show();
    }

    private void showEditAccountDialog(String username, long currentBalance) {
        View v = getLayoutInflater().inflate(R.layout.dialog_account, null);
        EditText userInput = v.findViewById(R.id.dialogUsername);
        EditText pinInput = v.findViewById(R.id.dialogPin);
        EditText balanceInput = v.findViewById(R.id.dialogBalance);
        userInput.setText(username);
        userInput.setEnabled(false);
        balanceInput.setText(String.valueOf(currentBalance));

        new AlertDialog.Builder(this)
            .setTitle("Edit: " + username)
            .setView(v)
            .setPositiveButton("Save", (d, w) -> {
                String pin = pinInput.getText().toString().trim();
                long bal = Long.parseLong(balanceInput.getText().toString().replaceAll("[^0-9]", ""));
                if (!pin.isEmpty()) accountManager.createAccount(username, pin, bal);
                refreshAccountList();
                Toast.makeText(this, "Updated", Toast.LENGTH_SHORT).show();
            })
            .setNegativeButton("Cancel", null)
            .show();
    }

    // ===== DISPLAY =====

    private void updateDisplay() {
        try {
            if (gameConfig == null) return;
            if (currentJackpotText != null)
                currentJackpotText.setText(gameConfig.getFormattedJackpot());
            if (jackpotInput != null)
                jackpotInput.setText(String.valueOf(gameConfig.getJackpot()));
            if (startingMoneyInput != null)
                startingMoneyInput.setText(String.valueOf(gameConfig.getStartingMoney()));
            if (betAmountInput != null)
                betAmountInput.setText(String.valueOf(gameConfig.getBetAmount()));
            if (statusText != null)
                statusText.setText(
                    "Difficulty: " + gameConfig.getDifficulty().label
                    + " | Win: " + String.format("%.1f%%", gameConfig.getWinRate() * 100)
                    + " | Pay: " + String.format("%.0fx", gameConfig.getPayoutMultiplier())
                    + (server != null ? "\nServer: " + server.getServerUrl() : ""));
            if (winRateSeekBar != null) {
                int wrp = Math.round((gameConfig.getWinRate() * 100 - 0.5f) / 0.5f);
                winRateSeekBar.setProgress(Math.max(0, Math.min(149, wrp)));
            }
            if (winRateValue != null)
                winRateValue.setText(String.format("%.1f%%", gameConfig.getWinRate() * 100));
            if (payoutSeekBar != null) {
                int pp = Math.round(gameConfig.getPayoutMultiplier() - 1);
                payoutSeekBar.setProgress(Math.max(0, Math.min(49, pp)));
            }
            if (payoutValue != null)
                payoutValue.setText(String.format("%.0fx", gameConfig.getPayoutMultiplier()));
        } catch (Exception e) {
            android.util.Log.e("MainActivity", "updateDisplay error", e);
        }
    }

    private String formatMoney(long v) {
        return String.format("%,d", v).replace(",", ".");
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (accountListLayout != null) {
            refreshAccountList();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (server != null) server.stop();
    }
}
