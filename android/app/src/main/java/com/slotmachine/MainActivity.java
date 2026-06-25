package com.slotmachine;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private WebView webView;
    private ProgressBar loadingSpinner;
    private TextView serverInfo;
    private TextView qrInfo;
    private Button btnAdmin;

    private SlotServer server;
    private JackpotManager jackpotManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        webView = findViewById(R.id.webView);
        loadingSpinner = findViewById(R.id.loadingSpinner);
        serverInfo = findViewById(R.id.serverInfo);
        qrInfo = findViewById(R.id.qrInfo);
        btnAdmin = findViewById(R.id.btnAdmin);

        jackpotManager = JackpotManager.getInstance(this);

        // Start the embedded HTTP server
        server = new SlotServer(this);
        server.startServer();

        // Show server info
        String ip = server.getLocalIp();
        int port = server.getPort();
        String url = "http://" + ip + ":" + port;
        serverInfo.setText("Local: " + url);
        qrInfo.setText("Open on other devices: " + url);

        // Setup WebView
        setupWebView();

        // Admin button
        btnAdmin.setOnClickListener(v -> {
            Intent intent = new Intent(MainActivity.this, AdminActivity.class);
            startActivity(intent);
        });
    }

    private void setupWebView() {
        WebSettings settings = webView.getSettings();
        settings.setJavaScriptEnabled(true);
        settings.setDomStorageEnabled(true);
        settings.setAllowFileAccess(true);
        settings.setCacheMode(WebSettings.LOAD_NO_CACHE);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                loadingSpinner.setVisibility(View.GONE);
            }
        });

        webView.setWebChromeClient(new WebChromeClient());

        // Load from the local server
        String url = "http://127.0.0.1:" + server.getPort();
        webView.loadUrl(url);
    }

    @Override
    protected void onResume() {
        super.onResume();
        // Refresh the webview when returning from admin
        if (webView != null) {
            webView.reload();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (server != null) {
            server.stop();
        }
    }
}
