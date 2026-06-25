package com.slotmachine;

import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class AdminActivity extends AppCompatActivity {

    private TextView currentJackpotText;
    private EditText jackpotInput;
    private Button btnSave;
    private TextView statusText;

    private JackpotManager jackpotManager;
    private SlotServer server;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_admin);

        currentJackpotText = findViewById(R.id.currentJackpotText);
        jackpotInput = findViewById(R.id.jackpotInput);
        btnSave = findViewById(R.id.btnSave);
        statusText = findViewById(R.id.statusText);

        jackpotManager = JackpotManager.getInstance(this);

        // Try to get server instance - check if it's running
        try {
            server = new SlotServer(this);
        } catch (Exception e) {
            server = null;
        }

        updateDisplay();

        btnSave.setOnClickListener(v -> saveJackpot());
    }

    private void updateDisplay() {
        currentJackpotText.setText(jackpotManager.getFormattedJackpot());
        jackpotInput.setText(String.valueOf(jackpotManager.getJackpot()));

        String status = "Server: http://" + getLocalIp() + ":8080\n"
            + "Jackpot: " + jackpotManager.getFormattedJackpot();
        statusText.setText(status);
    }

    private void saveJackpot() {
        String input = jackpotInput.getText().toString().trim();
        if (input.isEmpty()) {
            Toast.makeText(this, "Please enter a value", Toast.LENGTH_SHORT).show();
            return;
        }

        try {
            long value = Long.parseLong(input);
            if (value < 0) {
                Toast.makeText(this, "Value cannot be negative", Toast.LENGTH_SHORT).show();
                return;
            }

            jackpotManager.setJackpot(value);
            updateDisplay();
            Toast.makeText(this, "Jackpot updated to " + jackpotManager.getFormattedJackpot(),
                Toast.LENGTH_SHORT).show();
        } catch (NumberFormatException e) {
            Toast.makeText(this, "Invalid number format", Toast.LENGTH_SHORT).show();
        }
    }

    private String getLocalIp() {
        try {
            java.net.InetAddress ip = java.net.InetAddress.getLocalHost();
            // Try to get non-loopback IP
            java.util.Enumeration<java.net.NetworkInterface> interfaces =
                java.net.NetworkInterface.getNetworkInterfaces();
            while (interfaces.hasMoreElements()) {
                java.net.NetworkInterface intf = interfaces.nextElement();
                java.util.Enumeration<java.net.InetAddress> addrs = intf.getInetAddresses();
                while (addrs.hasMoreElements()) {
                    java.net.InetAddress addr = addrs.nextElement();
                    if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address) {
                        return addr.getHostAddress();
                    }
                }
            }
            return ip.getHostAddress();
        } catch (Exception e) {
            return "127.0.0.1";
        }
    }
}
