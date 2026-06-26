package com.slotmachine;

import android.content.Context;
import android.util.Log;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import fi.iki.elonen.NanoHTTPD;

public class SlotServer extends NanoHTTPD {

    private static final String TAG = "SlotServer";
    private static final int PORT = 8080;

    private final Context context;
    private final GameConfig gameConfig;
    private String localIp;

    public SlotServer(Context context) {
        super(PORT);
        this.context = context;
        this.gameConfig = GameConfig.getInstance(context);
        this.localIp = getLocalIpAddress();
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Method method = session.getMethod();
        Log.d(TAG, method + " " + uri);

        try {
            switch (uri) {
                case "/api/config":      return jsonResponse(handleConfig(method, session));
                case "/api/jackpot":     return jsonResponse(handleJackpot(method, session));
                case "/api/status":      return jsonResponse(handleStatus());
                case "/api/wsurl":      return jsonResponse(handleWsUrl());
                case "/api/money":       return jsonResponse(handleMoney(method, session));
                default:                 return serveStaticFile(uri);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error serving " + uri, e);
            return jsonResponse("{\"error\":\"Internal error\"}");
        }
    }

    // ========== CONFIG ==========

    private String handleConfig(Method method, IHTTPSession session) throws Exception {
        if (method == Method.GET) return gameConfig.toJson();

        if (method == Method.POST) {
            String body = readBody(session);
            if (body == null) return "{\"error\":\"No body\"}";

            if (body.contains("\"difficultyId\"")) {
                int id = (int) extractJsonLong(body, "difficultyId");
                gameConfig.setDifficulty(GameConfig.Difficulty.fromId(id));
            }
            if (body.contains("\"startingMoney\""))
                gameConfig.setStartingMoney(extractJsonLong(body, "startingMoney"));
            if (body.contains("\"betAmount\""))
                gameConfig.setBetAmount(extractJsonLong(body, "betAmount"));
            if (body.contains("\"jackpot\""))
                gameConfig.setJackpot(extractJsonLong(body, "jackpot"));
            if (body.contains("\"winRate\"") && body.contains("\"custom\"")) {
                float wr = extractJsonFloat(body, "winRate");
                float pm = extractJsonFloat(body, "payoutMultiplier");
                int ms = (int) extractJsonLong(body, "minSpinsBeforeWin");
                float jhr = extractJsonFloat(body, "jackpotHitRate");
                gameConfig.setCustomConfig(wr, pm, ms, jhr);
            }
            return "{\"success\":true,\"config\":" + gameConfig.toJson() + "}";
        }
        return "{\"error\":\"Method not allowed\"}";
    }

    // ========== JACKPOT ==========

    private String handleJackpot(Method method, IHTTPSession session) throws Exception {
        if (method == Method.GET) {
            return "{\"jackpot\":" + gameConfig.getJackpot()
                + ",\"formatted\":\"" + gameConfig.getFormattedJackpot() + "\"}";
        }
        if (method == Method.POST) {
            String body = readBody(session);
            if (body != null && body.contains("\"value\"")) {
                gameConfig.setJackpot(extractJsonLong(body, "value"));
                return "{\"success\":true,\"jackpot\":" + gameConfig.getJackpot() + "}";
            }
        }
        return "{\"error\":\"Invalid\"}";
    }

    // ========== STATUS ==========

    private String handleWsUrl() {
        String ip = localIp != null ? localIp : "127.0.0.1";
        return "{\"url\":\"ws://" + ip + ":9090\",\"port\":9090}";
    }

    private String handleStatus() {
        return "{"
            + "\"status\":\"running\","
            + "\"ip\":\"" + localIp + "\","
            + "\"port\":" + PORT + ","
            + "\"config\":" + gameConfig.toJson()
            + "}";
    }

    // ========== MONEY ==========

    private String handleMoney(Method method, IHTTPSession session) throws Exception {
        if (method == Method.POST) {
            String body = readBody(session);
            if (body != null && body.contains("\"balance\"")) {
                long bal = extractJsonLong(body, "balance");
                gameConfig.setCurrentMoney(bal);
                return "{\"success\":true,\"balance\":" + bal + ",\"startingMoney\":" + gameConfig.getStartingMoney() + "}";
            }
        }
        long current = gameConfig.getCurrentMoney();
        return "{\"success\":true,\"balance\":" + current + ",\"startingMoney\":" + gameConfig.getStartingMoney() + "}";
    }

    // ========== STATIC FILES ==========    // ========== STATIC FILES ==========

    private Response serveStaticFile(String uri) {
        if (uri == null || uri.equals("/")) uri = "/index.html";

        try {
            InputStream is = context.getAssets().open("www" + uri);
            byte[] bytes = readInputStream(is);
            is.close();
            return newChunkedResponse(Response.Status.OK, getMimeType(uri),
                new ByteArrayInputStream(bytes));
        } catch (IOException e) {
            return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain",
                "404 - Not Found");
        }
    }

    // ========== HELPERS ==========

    private Response jsonResponse(String json) {
        return newFixedLengthResponse(Response.Status.OK, "application/json", json);
    }

        private String readBody(IHTTPSession session) throws Exception {
        // Method 1: Read raw body directly from InputStream (most reliable)
        try {
            java.io.InputStream is = session.getInputStream();
            if (is != null) {
                java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
                byte[] buf = new byte[4096];
                int n;
                while ((n = is.read(buf, 0, buf.length)) != -1) {
                    baos.write(buf, 0, n);
                    if (n < buf.length) break;
                }
                String raw = baos.toString("UTF-8").trim();
                if (raw != null && !raw.isEmpty()) {
                    return buildJsonFromMap(parseUrlEncoded(raw));
                }
            }
        } catch (Exception e) {
            Log.d(TAG, "getInputStream failed: " + e.getMessage());
        }
        
        // Method 2: Try parseBody + getParms (fallback)
        try {
            Map<String, String> files = new HashMap<>();
            session.parseBody(files);
            Map<String, String> params = session.getParms();
            if (params != null && !params.isEmpty()) {
                boolean hasContent = false;
                for (Map.Entry<String, String> e : params.entrySet()) {
                    if (e.getValue() != null && !e.getValue().isEmpty()) {
                        hasContent = true;
                        break;
                    }
                }
                if (hasContent) return buildJsonFromMap(params);
            }
            // Fallback: raw body key
            String rawBody = files.get("postData");
            if (rawBody != null && !rawBody.isEmpty()) {
                return buildJsonFromMap(parseUrlEncoded(rawBody));
            }
        } catch (Exception e) {
            Log.d(TAG, "parseBody failed: " + e.getMessage());
        }
        
        // Method 3: Query string as last resort
        String qs = session.getQueryParameterString();
        if (qs != null && !qs.isEmpty()) {
            return buildJsonFromMap(parseUrlEncoded(qs));
        }
        
        return null;
    }
    
    private Map<String, String> parseUrlEncoded(String body) {
        Map<String, String> result = new HashMap<>();
        if (body == null || body.isEmpty()) return result;
        try {
            String[] pairs = body.split("&");
            for (String pair : pairs) {
                int eq = pair.indexOf('=');
                if (eq > 0) {
                    String key = java.net.URLDecoder.decode(pair.substring(0, eq), "UTF-8");
                    String val = java.net.URLDecoder.decode(pair.substring(eq + 1), "UTF-8");
                    result.put(key, val);
                }
            }
        } catch (Exception e) {
            Log.w(TAG, "parseUrlEncoded error", e);
        }
        return result;
    }
    
    private String buildJsonFromMap(Map<String, String> map) {
        StringBuilder json = new StringBuilder();
        json.append("{");
        boolean first = true;
        for (Map.Entry<String, String> e : map.entrySet()) {
            if (!first) json.append(",");
            first = false;
            String val = e.getValue();
            boolean isNumber = val.matches("-?\\d+(\\.\\d+)?");
            json.append("\"").append(e.getKey()).append("\":");
            if (isNumber) {
                json.append(val);
            } else {
                json.append("\"").append(val).append("\"");
            }
        }
        json.append("}");
        return json.toString();
    }

    private long extractJsonLong(String json, String key) {
        try {
            String v = json.replaceAll(".*\"" + key + "\"\\s*:\\s*(\\d+).*", "$1");
            return Long.parseLong(v);
        } catch (Exception e) { return 0; }
    }

    private float extractJsonFloat(String json, String key) {
        try {
            String v = json.replaceAll(".*\"" + key + "\"\\s*:\\s*(\\d+\\.?\\d*).*", "$1");
            return Float.parseFloat(v);
        } catch (Exception e) { return 0; }
    }

    private String extractJsonString(String json, String key) {
        try {
            String v = json.replaceAll(".*\"" + key + "\"\\s*:\\s*\"([^\"]+)\".*", "$1");
            return v.equals(json) ? null : v;
        } catch (Exception e) { return null; }
    }

    private byte[] readInputStream(InputStream inputStream) throws IOException {
        java.io.ByteArrayOutputStream buffer = new java.io.ByteArrayOutputStream();
        byte[] data = new byte[16384];
        int n;
        while ((n = inputStream.read(data, 0, data.length)) != -1) buffer.write(data, 0, n);
        return buffer.toByteArray();
    }

    private String getMimeType(String uri) {
        if (uri.endsWith(".html")) return "text/html; charset=utf-8";
        if (uri.endsWith(".css"))  return "text/css; charset=utf-8";
        if (uri.endsWith(".js"))   return "application/javascript; charset=utf-8";
        if (uri.endsWith(".svg"))  return "image/svg+xml";
        if (uri.endsWith(".png"))  return "image/png";
        if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) return "image/jpeg";
        return "text/plain";
    }

    private String getLocalIpAddress() {
        try {
            List<NetworkInterface> list = Collections.list(NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface nif : list) {
                for (InetAddress addr : Collections.list(nif.getInetAddresses())) {
                    if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address)
                        return addr.getHostAddress();
                }
            }
        } catch (Exception e) { Log.e(TAG, "IP error", e); }
        return "127.0.0.1";
    }

    public String getLocalIp() { return localIp; }
    public int getPort() { return PORT; }
    public String getServerUrl() { return "http://" + localIp + ":" + PORT; }

    public void startServer() {
        try {
            start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            Log.d(TAG, "Server running on " + getServerUrl());
        } catch (Exception e) {
            Log.e(TAG, "Server start failed", e);
            localIp = getLocalIpAddress(); // fallback
        }
    }
}
