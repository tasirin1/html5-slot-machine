package com.slotmachine;

import android.util.Log;
import android.content.Context;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.URLDecoder;
import java.security.MessageDigest;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import java.util.concurrent.Executors;

/**
 * WebSocketManager — Manages WebSocket connections for real-time sync.
 *
 * Implements WebSocket protocol (RFC 6455) directly using Java ServerSocket.
 * No external dependencies required.
 *
 * Runs on port 9090. Broadcasts config/jackpot/balance changes to all
 * connected browser clients instantly.
 */
public class WebSocketManager {

    private static final String TAG = "WSManager";
    private static final int WS_PORT = 9090;
    private static final String WS_GUID = "258EAFA5-E914-47DA-95CA-5AB5A05F69B8";

    private static WebSocketManager instance;

    private final List<WsClient> clients = new CopyOnWriteArrayList<>();
    private ServerSocket serverSocket;
    private Thread serverThread;
    private GameConfig gameConfig;
    private volatile boolean running = false;

    private WebSocketManager() {}

    public static synchronized WebSocketManager getInstance() {
        if (instance == null) instance = new WebSocketManager();
        return instance;
    }

    public static synchronized WebSocketManager getInstance(Context context) {
        if (instance == null) {
            instance = new WebSocketManager();
            instance.gameConfig = GameConfig.getInstance(context);
        } else if (instance.gameConfig == null && context != null) {
            instance.gameConfig = GameConfig.getInstance(context);
        }
        return instance;
    }

    // ===== Lifecycle =====

    public void start() {
        if (running) return;
        running = true;

        serverThread = new Thread(() -> {
            try {
                serverSocket = new ServerSocket(WS_PORT);
                Log.d(TAG, "WebSocket server running on port " + WS_PORT);

                while (running) {
                    try {
                        Socket client = serverSocket.accept();
                        Executors.newSingleThreadExecutor().execute(() -> handleClient(client));
                    } catch (IOException e) {
                        if (running) Log.e(TAG, "Accept error", e);
                    }
                }
            } catch (IOException e) {
                Log.e(TAG, "Failed to start WebSocket server", e);
                running = false;
            }
        }, "WS-Accept");

        serverThread.setDaemon(true);
        serverThread.start();
    }

    public void stop() {
        running = false;
        for (WsClient c : clients) {
            try { c.close(); } catch (Exception ignored) {}
        }
        clients.clear();
        try { if (serverSocket != null) serverSocket.close(); } catch (Exception ignored) {}
        Log.d(TAG, "WebSocket server stopped");
    }

    public boolean isRunning() { return running; }
    public int getPort() { return WS_PORT; }

    // ===== Client Management =====

    private void addClient(WsClient ws) {
        clients.add(ws);
        Log.d(TAG, "Client connected. Total: " + clients.size());
    }

    private void removeClient(WsClient ws) {
        clients.remove(ws);
        Log.d(TAG, "Client disconnected. Total: " + clients.size());
    }

    // ===== WebSocket Handshake =====

    private void handleClient(Socket socket) {
        try {
            InputStream in = socket.getInputStream();
            OutputStream out = socket.getOutputStream();

            // Read HTTP upgrade request
            byte[] buffer = new byte[4096];
            int read = in.read(buffer);
            if (read <= 0) { socket.close(); return; }

            String request = new String(buffer, 0, read, "UTF-8");
            if (!request.contains("Upgrade: websocket") && !request.contains("upgrade: websocket")) {
                socket.close();
                return;
            }

            // Extract WebSocket key
            String key = null;
            for (String line : request.split("\r\n")) {
                if (line.toLowerCase().startsWith("sec-websocket-key:")) {
                    key = line.substring(line.indexOf(':') + 1).trim();
                    break;
                }
            }
            if (key == null) { socket.close(); return; }

            // Compute accept key
            String accept = computeAcceptKey(key);

            // Send upgrade response
            String response = "HTTP/1.1 101 Switching Protocols\r\n" +
                "Upgrade: websocket\r\n" +
                "Connection: Upgrade\r\n" +
                "Sec-WebSocket-Accept: " + accept + "\r\n" +
                "Access-Control-Allow-Origin: *\r\n\r\n";
            out.write(response.getBytes("UTF-8"));
            out.flush();

            // Create client handler
            WsClient ws = new WsClient(socket, in, out);
            addClient(ws);

            // Send initial config
            sendToClient(ws, buildFullStateMessage());

            // Read frames
            ws.readLoop();

        } catch (Exception e) {
            Log.d(TAG, "Client connection error: " + e.getMessage());
        } finally {
            try { socket.close(); } catch (Exception ignored) {}
        }
    }

    private String computeAcceptKey(String key) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-1");
            md.update((key + WS_GUID).getBytes("UTF-8"));
            return java.util.Base64.getEncoder().encodeToString(md.digest());
        } catch (Exception e) {
            return key;
        }
    }

    // ===== WebSocket Frame I/O =====

    private void sendToClient(WsClient client, String message) {
        try {
            byte[] payload = message.getBytes("UTF-8");
            OutputStream out = client.output;

            // Frame: FIN=1, Opcode=Text(1), Mask=0
            out.write(0x81); // FIN + Text
            if (payload.length < 126) {
                out.write(payload.length);
            } else if (payload.length < 65536) {
                out.write(126);
                out.write((payload.length >> 8) & 0xFF);
                out.write(payload.length & 0xFF);
            } else {
                out.write(127);
                for (int i = 7; i >= 0; i--)
                    out.write((int)(payload.length >> (i * 8)) & 0xFF);
            }
            out.write(payload);
            out.flush();
        } catch (IOException e) {
            removeClient(client);
            try { client.close(); } catch (Exception ignored) {}
        }
    }

    private String readFrame(InputStream in) {
        try {
            int b1 = in.read();
            if (b1 == -1) return null;
            int b2 = in.read();
            if (b2 == -1) return null;

            boolean masked = (b2 & 0x80) != 0;
            int length = b2 & 0x7F;
            if (length == 126) {
                length = (in.read() << 8) | in.read();
            } else if (length == 127) {
                length = 0;
                for (int i = 0; i < 8; i++) length = (length << 8) | in.read();
            }

            byte[] maskKey = new byte[4];
            if (masked) in.read(maskKey);

            byte[] payload = new byte[length];
            in.read(payload);

            if (masked) {
                for (int i = 0; i < length; i++) payload[i] ^= maskKey[i % 4];
            }

            int opcode = b1 & 0x0F;
            if (opcode == 0x8) return null; // Close
            if (opcode == 0x9) return null; // Ping (we don't respond)
            return new String(payload, "UTF-8");
        } catch (Exception e) {
            return null;
        }
    }

    // ===== Broadcasting =====

    public String buildFullStateMessage() {
        if (gameConfig == null)
            return "{\"type\":\"configChanged\",\"config\":{}}";
        try {
            return "{\"type\":\"configChanged\",\"config\":" + gameConfig.toJson() + "}";
        } catch (Exception e) {
            return "{\"type\":\"configChanged\",\"config\":{}}";
        }
    }

    private void broadcast(String message) {
        for (WsClient c : clients) {
            sendToClient(c, message);
        }
    }

    public void broadcastConfig() {
        if (!running || clients.isEmpty()) return;
        broadcast(buildFullStateMessage());
    }

    public void broadcastJackpot(long value) {
        if (!running || clients.isEmpty()) return;
        broadcast("{\"type\":\"jackpotChanged\",\"value\":" + value + "}");
    }

    public void broadcastBalance(String playerName, long balance) {
        if (!running || clients.isEmpty()) return;
        broadcast("{\"type\":\"balanceChanged\",\"player\":\"" +
            escapeJson(playerName != null ? playerName : "guest") +
            "\",\"balance\":" + balance + "}");
    }

    public void broadcastDifficulty(String level, float winRate, float payoutMultiplier) {
        if (!running || clients.isEmpty()) return;
        broadcast("{\"type\":\"difficultyChanged\",\"level\":\"" + escapeJson(level) +
            "\",\"winRate\":" + winRate + ",\"payoutMultiplier\":" + payoutMultiplier + "}");
    }

    public void broadcastReset() {
        broadcast("{\"type\":\"resetGame\"}");
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\").replace("\"", "\\\"")
                .replace("\n", "\\n").replace("\r", "\\r");
    }

    // ===== Client Wrapper =====

    private class WsClient {
        final Socket socket;
        final InputStream input;
        final OutputStream output;

        WsClient(Socket s, InputStream in, OutputStream out) {
            this.socket = s; this.input = in; this.output = out;
        }

        void readLoop() {
            while (running) {
                String msg = readFrame(input);
                if (msg == null) break;
            }
            removeClient(this);
            try { socket.close(); } catch (Exception ignored) {}
        }

        void close() throws IOException { socket.close(); }
    }
}
