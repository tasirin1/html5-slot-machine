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
    private final AccountManager accountManager;
    private String localIp;

    public SlotServer(Context context) {
        super(PORT);
        this.context = context;
        this.gameConfig = GameConfig.getInstance(context);
        this.accountManager = AccountManager.getInstance(context);
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
                case "/api/login":       return jsonResponse(handleLogin(method, session));
                case "/api/account":     return jsonResponse(handleAccount(method, session));
                case "/api/accounts":    return jsonResponse(handleAccounts(method, session));
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

    private String handleStatus() {
        return "{"
            + "\"status\":\"running\","
            + "\"ip\":\"" + localIp + "\","
            + "\"port\":" + PORT + ","
            + "\"accounts\":" + accountManager.getAccountCount() + ","
            + "\"totalMoney\":" + accountManager.getTotalMoney() + ","
            + "\"config\":" + gameConfig.toJson()
            + "}";
    }

    // ========== LOGIN ==========

    private String handleLogin(Method method, IHTTPSession session) throws Exception {
        if (method != Method.POST) return "{\"error\":\"Use POST\"}";
        String body = readBody(session);
        if (body == null) return "{\"error\":\"No body\"}";

        String username = extractJsonString(body, "username");
        String pin = extractJsonString(body, "pin");
        if (username == null || pin == null) return "{\"error\":\"username and pin required\"}";

        String result = accountManager.login(username, pin);
        // Add config to response
        if (result.contains("\"success\":true")) {
            result = result.substring(0, result.length() - 1)
                + ",\"config\":" + gameConfig.toJson() + "}";
        }
        return result;
    }

    // ========== ACCOUNT (player) ==========

    private String handleAccount(Method method, IHTTPSession session) throws Exception {
        String body = readBody(session);
        if (body == null) return "{\"error\":\"No body\"}";

        String username = extractJsonString(body, "username");
        String pin = extractJsonString(body, "pin");
        if (username == null || pin == null) return "{\"error\":\"auth required\"}";

        if (method == Method.GET || method == Method.POST) {
            String result = accountManager.login(username, pin);
            if (!result.contains("\"success\":true"))
                return result;

            if (body.contains("\"balance\"")) {
                long newBal = extractJsonLong(body, "balance");
                result = accountManager.updateBalance(username, pin, newBal);
            }

            // Add config to response
            if (result.contains("\"success\":true")) {
                result = result.substring(0, result.length() - 1)
                    + ",\"config\":" + gameConfig.toJson() + "}";
            }
            return result;
        }
        return "{\"error\":\"Method not allowed\"}";
    }

    // ========== ACCOUNTS (admin) ==========

    private String handleAccounts(Method method, IHTTPSession session) throws Exception {
        String body = readBody(session);

        if (method == Method.GET) {
            return accountManager.getAllAccounts();
        }

        if (method == Method.POST && body != null) {
            if (body.contains("\"action\":\"create\"")) {
                String u = extractJsonString(body, "username");
                String p = extractJsonString(body, "pin");
                long b = extractJsonLong(body, "balance");
                return accountManager.createAccount(u, p, b);
            }
            if (body.contains("\"action\":\"delete\"")) {
                String u = extractJsonString(body, "username");
                return accountManager.deleteAccount(u);
            }
            if (body.contains("\"action\":\"reset\"")) {
                long amount = extractJsonLong(body, "balance");
                return accountManager.resetAllBalances(amount);
            }
            if (body.contains("\"action\":\"update\"")) {
                String u = extractJsonString(body, "username");
                String p = extractJsonString(body, "pin");
                long b = extractJsonLong(body, "balance");
                return accountManager.createAccount(u, p, b);
            }
        }
        return "{\"error\":\"Invalid request\"}";
    }

    // ========== STATIC FILES ==========

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
        // For JSON content types, read raw body directly from input stream
        String contentType = session.getHeader("content-type");
        if (contentType != null && contentType.toLowerCase().contains("application/json")) {
            int contentLength = 0;
            try {
                String cl = session.getHeader("content-length");
                if (cl != null) contentLength = Integer.parseInt(cl);
            } catch (Exception e) {}
            if (contentLength > 0) {
                byte[] buf = new byte[contentLength];
                int off = 0;
                while (off < contentLength) {
                    int r = session.getInputStream().read(buf, off, contentLength - off);
                    if (r < 0) break;
                    off += r;
                }
                return new String(buf, 0, off, "UTF-8");
            }
            // Fallback: read all available bytes
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            byte[] tmp = new byte[4096];
            int n;
            while ((n = session.getInputStream().read(tmp, 0, tmp.length)) != -1) {
                baos.write(tmp, 0, n);
                if (n < tmp.length) break;
            }
            String body = baos.toString("UTF-8");
            return body.isEmpty() ? null : body;
        }
        // For form data, use parseBody
        Map<String, String> files = new HashMap<>();
        try {
            session.parseBody(files);
        } catch (Exception e) {
            // If parseBody fails, try reading raw body
            java.io.ByteArrayOutputStream baos = new java.io.ByteArrayOutputStream();
            byte[] tmp = new byte[4096];
            int n;
            while ((n = session.getInputStream().read(tmp, 0, tmp.length)) != -1) {
                baos.write(tmp, 0, n);
                if (n < tmp.length) break;
            }
            String body = baos.toString("UTF-8");
            return body.isEmpty() ? null : body;
        }
        String body = session.getQueryParameterString();
        if (body == null || body.isEmpty()) body = files.get("postData");
        return body;
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
