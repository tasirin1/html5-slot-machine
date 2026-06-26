package com.slotmachine;

import android.content.Context;
import android.util.Log;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

import fi.iki.elonen.NanoHTTPD;
import fi.iki.elonen.websocket.WebSocket;
import fi.iki.elonen.websocket.WebSocketServer;

/**
 * WebSocketManager — Singleton managing all WebSocket connections.
 *
 * Runs a WebSocket server on port 9090 (separate from HTTP server on 8080).
 * All connected browser clients receive real-time events when config changes.
 *
 * Events:
 *   configChanged    → full config object
 *   jackpotChanged   → new jackpot value
 *   balanceChanged   → player balance update
 *   difficultyChanged → new difficulty level
 *   resetGame        → force game reset on all clients
 */
public class WebSocketManager {

    private static final String TAG = "WSManager";
    private static final int WS_PORT = 9090;

    private static WebSocketManager instance;

    private final List<GameWebSocket> clients = new CopyOnWriteArrayList<>();
    private final WsServer wsServer;
    private GameConfig gameConfig;
    private boolean running = false;

    // ===== Singleton =====

    private WebSocketManager() {
        wsServer = new WsServer(WS_PORT);
    }

    public static synchronized WebSocketManager getInstance() {
        if (instance == null) {
            instance = new WebSocketManager();
        }
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
        try {
            wsServer.start(5000, false);
            running = true;
            Log.d(TAG, "WebSocket server running on port " + WS_PORT);
        } catch (IOException e) {
            Log.e(TAG, "Failed to start WebSocket server", e);
        }
    }

    public void stop() {
        if (!running) return;
        running = false;
        // Close all client connections
        for (GameWebSocket ws : clients) {
            try {
                ws.close(WebSocketFrame.CloseCode.Normal, "Server shutting down", false);
            } catch (Exception ignored) {}
        }
        clients.clear();
        wsServer.stop();
        Log.d(TAG, "WebSocket server stopped");
    }

    public boolean isRunning() { return running; }
    public int getPort() { return WS_PORT; }

    // ===== Client Management =====

    public void addClient(GameWebSocket ws) {
        if (!clients.contains(ws)) {
            clients.add(ws);
            Log.d(TAG, "Client connected. Total: " + clients.size());
        }
    }

    public void removeClient(GameWebSocket ws) {
        clients.remove(ws);
        Log.d(TAG, "Client disconnected. Total: " + clients.size());
    }

    // ===== Broadcasting =====

    /**
     * Build the full state message (sent to new connections)
     */
    public String buildFullStateMessage() {
        if (gameConfig == null) {
            return "{\"type\":\"configChanged\",\"config\":{}}";
        }
        try {
            return "{\"type\":\"configChanged\",\"config\":" + gameConfig.toJson() + "}";
        } catch (Exception e) {
            return "{\"type\":\"configChanged\",\"config\":{}}";
        }
    }

    /**
     * Broadcast full config change to all connected clients
     */
    public void broadcastConfig() {
        if (!running || clients.isEmpty()) return;
        String json = buildFullStateMessage();
        broadcast(json);
    }

    /**
     * Broadcast jackpot update
     */
    public void broadcastJackpot(long value) {
        if (!running || clients.isEmpty()) return;
        String msg = "{\"type\":\"jackpotChanged\",\"value\":" + value + "}";
        broadcast(msg);
    }

    /**
     * Broadcast balance update for a specific player
     */
    public void broadcastBalance(String playerName, long balance) {
        if (!running || clients.isEmpty()) return;
        String msg = "{\"type\":\"balanceChanged\",\"player\":\"" +
            escapeJson(playerName != null ? playerName : "guest") +
            "\",\"balance\":" + balance + "}";
        broadcast(msg);
    }

    /**
     * Broadcast difficulty change
     */
    public void broadcastDifficulty(String level, float winRate, float payoutMultiplier) {
        if (!running || clients.isEmpty()) return;
        String msg = "{\"type\":\"difficultyChanged\",\"level\":\"" +
            escapeJson(level) +
            "\",\"winRate\":" + winRate +
            ",\"payoutMultiplier\":" + payoutMultiplier + "}";
        broadcast(msg);
    }

    /**
     * Broadcast maintenance mode
     */
    public void broadcastMaintenance(boolean enabled) {
        if (!running || clients.isEmpty()) return;
        String msg = "{\"type\":\"maintenanceMode\",\"enabled\":" + enabled + "}";
        broadcast(msg);
    }

    /**
     * Broadcast reset game command
     */
    public void broadcastReset() {
        String msg = "{\"type\":\"resetGame\"}";
        broadcast(msg);
    }

    // ===== Internal =====

    private void broadcast(String message) {
        if (clients.isEmpty()) return;
        for (GameWebSocket ws : clients) {
            try {
                ws.sendMessage(message);
            } catch (IOException e) {
                Log.w(TAG, "Failed to send to client, removing", e);
                clients.remove(ws);
            } catch (Exception e) {
                Log.w(TAG, "Unexpected send error", e);
                clients.remove(ws);
            }
        }
    }

    private String escapeJson(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }

    // ===== WebSocket Server =====

    private class WsServer extends WebSocketServer {
        public WsServer(int port) {
            super(port);
        }

        @Override
        public WebSocket openWebSocket(IHTTPSession handshake) {
            GameWebSocket ws = new GameWebSocket(handshake);
            addClient(ws);
            return ws;
        }

        @Override
        public void serve(IHTTPSession session, Response r) {
            // Pass through to default WebSocket handling
            super.serve(session, r);
        }
    }
}
