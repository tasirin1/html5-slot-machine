package com.slotmachine;

import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.SeekBar;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private SlotServer server;
    private GameConfig gameConfig;

    // Views
    private TextView serverUrlText;
    private TextView currentJackpotText;
    private Spinner difficultySpinner;
    private TextView winRateValue;
    private SeekBar winRateSeekBar;
    private TextView payoutValue;
    private SeekBar payoutSeekBar;
    private EditText jackpotInput;
    private Button btnSaveJackpot;
    private TextView statusText;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        gameConfig = GameConfig.getInstance(this);

        // Initialize views
        serverUrlText = findViewById(R.id.serverUrlText);
        TextView serverUrlDisplay = findViewById(R.id.serverUrlDisplay);
        currentJackpotText = findViewById(R.id.currentJackpotText);
        difficultySpinner = findViewById(R.id.difficultySpinner);
        winRateValue = findViewById(R.id.winRateValue);
        winRateSeekBar = findViewById(R.id.winRateSeekBar);
        payoutValue = findViewById(R.id.payoutValue);
        payoutSeekBar = findViewById(R.id.payoutSeekBar);
        jackpotInput = findViewById(R.id.jackpotInput);
        btnSaveJackpot = findViewById(R.id.btnSaveJackpot);
        statusText = findViewById(R.id.statusText);

        // Start the embedded HTTP server
        server = new SlotServer(this);
        server.startServer();

        // Show server info
        serverUrlText.setText(server.getServerUrl());
        serverUrlDisplay.setText(server.getServerUrl());
        statusText.setText("Server is running on port " + server.getPort());

        // Setup difficulty spinner
        setupDifficultySpinner();

        // Setup seek bars
        setupSeekBars();

        // Setup jackpot
        setupJackpot();

        // Update display
        updateDisplay();
    }

    private void setupDifficultySpinner() {
        String[] difficulties = {"Very Easy", "Easy", "Medium", "Hard", "Very Hard", "Impossible", "Custom"};
        ArrayAdapter<String> adapter = new ArrayAdapter<>(this,
            android.R.layout.simple_spinner_dropdown_item, difficulties);
        difficultySpinner.setAdapter(adapter);

        int defaultPos = gameConfig.getDifficulty().id;
        if (defaultPos >= 0 && defaultPos < 6) {
            difficultySpinner.setSelection(defaultPos);
        }

        difficultySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                if (position < 6) {
                    GameConfig.Difficulty diff = GameConfig.Difficulty.fromId(position);
                    gameConfig.setDifficulty(diff);
                    updateDisplay();
                    Toast.makeText(MainActivity.this,
                        "Difficulty set to: " + diff.label, Toast.LENGTH_SHORT).show();
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {}
        });
    }

    private void setupSeekBars() {
        // Win Rate (0.5% to 75%)
        winRateSeekBar.setMax(149); // 0.5% to 75% in 0.5% steps
        winRateSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float rate = 0.5f + (progress * 0.5f);
                winRateValue.setText(String.format("%.1f%%", rate));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                float rate = 0.5f + (seekBar.getProgress() * 0.5f);
                gameConfig.setCustomConfig(rate / 100f,
                    gameConfig.getPayoutMultiplier(),
                    gameConfig.getMinSpinsBeforeWin(),
                    gameConfig.getJackpotHitRate());
                difficultySpinner.setSelection(6); // Custom
                updateDisplay();
                Toast.makeText(MainActivity.this,
                    "Win rate set to " + String.format("%.1f%%", rate), Toast.LENGTH_SHORT).show();
            }
        });

        // Payout Multiplier (1x to 50x)
        payoutSeekBar.setMax(49);
        payoutSeekBar.setOnSeekBarChangeListener(new SeekBar.OnSeekBarChangeListener() {
            @Override
            public void onProgressChanged(SeekBar seekBar, int progress, boolean fromUser) {
                float mult = 1.0f + progress;
                payoutValue.setText(String.format("%.0fx", mult));
            }

            @Override
            public void onStartTrackingTouch(SeekBar seekBar) {}

            @Override
            public void onStopTrackingTouch(SeekBar seekBar) {
                float mult = 1.0f + seekBar.getProgress();
                gameConfig.setCustomConfig(gameConfig.getWinRate(),
                    mult,
                    gameConfig.getMinSpinsBeforeWin(),
                    gameConfig.getJackpotHitRate());
                difficultySpinner.setSelection(6); // Custom
                updateDisplay();
                Toast.makeText(MainActivity.this,
                    "Payout multiplier set to " + String.format("%.0fx", mult), Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void setupJackpot() {
        jackpotInput.setText(String.valueOf(gameConfig.getJackpot()));
        btnSaveJackpot.setOnClickListener(v -> {
            String input = jackpotInput.getText().toString().trim();
            if (input.isEmpty()) {
                Toast.makeText(this, "Enter a value", Toast.LENGTH_SHORT).show();
                return;
            }
            try {
                long value = Long.parseLong(input);
                if (value < 0) {
                    Toast.makeText(this, "Value cannot be negative", Toast.LENGTH_SHORT).show();
                    return;
                }
                gameConfig.setJackpot(value);
                updateDisplay();
                Toast.makeText(this, "Jackpot: " + gameConfig.getFormattedJackpot(),
                    Toast.LENGTH_SHORT).show();
            } catch (NumberFormatException e) {
                Toast.makeText(this, "Invalid number", Toast.LENGTH_SHORT).show();
            }
        });
    }

    private void updateDisplay() {
        currentJackpotText.setText(gameConfig.getFormattedJackpot());
        jackpotInput.setText(String.valueOf(gameConfig.getJackpot()));

        String diffLabel = gameConfig.getDifficulty().label;
        statusText.setText("Difficulty: " + diffLabel
            + " | Win Rate: " + String.format("%.1f%%", gameConfig.getWinRate() * 100)
            + " | Payout: " + String.format("%.0fx", gameConfig.getPayoutMultiplier())
            + "\nServer: " + server.getServerUrl());

        // Update seekbars
        int winRateProgress = Math.round((gameConfig.getWinRate() * 100 - 0.5f) / 0.5f);
        winRateSeekBar.setProgress(Math.max(0, Math.min(149, winRateProgress)));
        winRateValue.setText(String.format("%.1f%%", gameConfig.getWinRate() * 100));

        int payoutProgress = Math.round(gameConfig.getPayoutMultiplier() - 1);
        payoutSeekBar.setProgress(Math.max(0, Math.min(49, payoutProgress)));
        payoutValue.setText(String.format("%.0fx", gameConfig.getPayoutMultiplier()));
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (server != null) {
            server.stop();
        }
    }
}
