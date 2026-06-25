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

        switch (uri) {
            case "/api/config":
                return handleConfigApi(method, session);
            case "/api/jackpot":
                return handleJackpotApi(method, session);
            case "/api/status":
                return handleStatusApi();
            default:
                return serveStaticFile(uri);
        }
    }

    private Response handleConfigApi(Method method, IHTTPSession session) {
        if (Method.GET.equals(method)) {
            return newFixedLengthResponse(Response.Status.OK, "application/json",
                gameConfig.toJson());
        }

        if (Method.POST.equals(method)) {
            try {
                Map<String, String> files = new HashMap<>();
                session.parseBody(files);
                String body = session.getQueryParameterString();
                if (body == null || body.isEmpty()) {
                    body = files.get("postData");
                }

                if (body != null && !body.isEmpty()) {
                    // Parse difficulty
                    if (body.contains("\"difficultyId\"")) {
                        String valStr = body.replaceAll(".*\"difficultyId\"\\s*:\\s*(\\d+).*", "$1");
                        if (!valStr.equals(body)) {
                            int diffId = Integer.parseInt(valStr);
                            gameConfig.setDifficulty(GameConfig.Difficulty.fromId(diffId));
                        }
                    }
                    // Parse custom values
                    // Parse money fields
                    if (body.contains("\"playerMoney\"")) {
                        try {
                            long val = Long.parseLong(body.replaceAll(".*\"playerMoney\"\\s*:\\s*(\\d+).*", "$1"));
                            gameConfig.setPlayerMoney(val);
                        } catch (Exception ignored) {}
                    }
                    if (body.contains("\"startingMoney\"")) {
                        try {
                            long val = Long.parseLong(body.replaceAll(".*\"startingMoney\"\\s*:\\s*(\\d+).*", "$1"));
                            gameConfig.setStartingMoney(val);
                        } catch (Exception ignored) {}
                    }
                    if (body.contains("\"betAmount\"")) {
                        try {
                            long val = Long.parseLong(body.replaceAll(".*\"betAmount\"\\s*:\\s*(\\d+).*", "$1"));
                            gameConfig.setBetAmount(val);
                        } catch (Exception ignored) {}
                    }
                    if (body.contains("\"custom\"")) {
                        float winRate = getJsonFloat(body, "winRate", 0.15f);
                        float payoutMult = getJsonFloat(body, "payoutMultiplier", 3.0f);
                        int minSpins = (int) getJsonFloat(body, "minSpinsBeforeWin", 10);
                        float jackpotHitRate = getJsonFloat(body, "jackpotHitRate", 0.005f);
                        gameConfig.setCustomConfig(winRate, payoutMult, minSpins, jackpotHitRate);
                    }
                    // Parse jackpot
                    if (body.contains("\"jackpot\"")) {
                        String valStr = body.replaceAll(".*\"jackpot\"\\s*:\\s*(\\d+).*", "$1");
                        if (!valStr.equals(body)) {
                            gameConfig.setJackpot(Long.parseLong(valStr));
                        }
                    }

                    return newFixedLengthResponse(Response.Status.OK, "application/json",
                        "{\"success\": true, \"config\": " + gameConfig.toJson() + "}");
                }
            } catch (Exception e) {
                Log.e(TAG, "Error parsing config POST", e);
            }

            return newFixedLengthResponse(Response.Status.BAD_REQUEST, "application/json",
                "{\"error\": \"Invalid request\"}");
        }

        return newFixedLengthResponse(Response.Status.METHOD_NOT_ALLOWED, "application/json",
            "{\"error\": \"Method not allowed\"}");
    }

    private Response handleJackpotApi(Method method, IHTTPSession session) {
        if (Method.GET.equals(method)) {
            String json = "{\"jackpot\": " + gameConfig.getJackpot()
                + ", \"formatted\": \"" + gameConfig.getFormattedJackpot() + "\"}";
            return newFixedLengthResponse(Response.Status.OK, "application/json", json);
        }

        if (Method.POST.equals(method)) {
            try {
                Map<String, String> files = new HashMap<>();
                session.parseBody(files);
                String body = session.getQueryParameterString();
                if (body == null || body.isEmpty()) {
                    body = files.get("postData");
                }
                if (body != null && body.contains("\"value\"")) {
                    String valStr = body.replaceAll(".*\"value\"\\s*:\\s*(\\d+).*", "$1");
                    if (!valStr.equals(body)) {
                        long value = Long.parseLong(valStr);
                        gameConfig.setJackpot(value);
                        return newFixedLengthResponse(Response.Status.OK, "application/json",
                            "{\"success\": true, \"jackpot\": " + value + "}");
                    }
                }
            } catch (Exception e) {
                Log.e(TAG, "Error parsing jackpot POST", e);
            }
            return newFixedLengthResponse(Response.Status.BAD_REQUEST, "application/json",
                "{\"error\": \"Invalid request\"}");
        }

        return newFixedLengthResponse(Response.Status.METHOD_NOT_ALLOWED, "application/json",
            "{\"error\": \"Method not allowed\"}");
    }

    private Response handleStatusApi() {
        String json = "{"
            + "\"status\": \"running\","
            + "\"ip\": \"" + localIp + "\","
            + "\"port\": " + PORT + ","
            + "\"players\": 0,"
            + "\"totalSpins\": 0,"
            + "\"config\": " + gameConfig.toJson()
            + "}";
        return newFixedLengthResponse(Response.Status.OK, "application/json", json);
    }

    private Response serveStaticFile(String uri) {
        if (uri == null || uri.equals("/")) {
            uri = "/index.html";
        }

        String assetPath = "www" + uri;

        try {
            InputStream inputStream = context.getAssets().open(assetPath);
            byte[] bytes = readInputStream(inputStream);
            inputStream.close();
            String mimeType = getMimeType(uri);
            return newChunkedResponse(Response.Status.OK, mimeType,
                new ByteArrayInputStream(bytes));
        } catch (IOException e) {
            Log.d(TAG, "File not found: " + assetPath);
            return newFixedLengthResponse(Response.Status.NOT_FOUND, "text/plain",
                "404 - File Not Found");
        }
    }

    private byte[] readInputStream(InputStream inputStream) throws IOException {
        java.io.ByteArrayOutputStream buffer = new java.io.ByteArrayOutputStream();
        byte[] data = new byte[16384];
        int nRead;
        while ((nRead = inputStream.read(data, 0, data.length)) != -1) {
            buffer.write(data, 0, nRead);
        }
        return buffer.toByteArray();
    }

    private String getMimeType(String uri) {
        if (uri.endsWith(".html")) return "text/html; charset=utf-8";
        if (uri.endsWith(".css")) return "text/css; charset=utf-8";
        if (uri.endsWith(".js")) return "application/javascript; charset=utf-8";
        if (uri.endsWith(".svg")) return "image/svg+xml";
        if (uri.endsWith(".png")) return "image/png";
        if (uri.endsWith(".jpg") || uri.endsWith(".jpeg")) return "image/jpeg";
        if (uri.endsWith(".json")) return "application/json";
        return "text/plain";
    }

    private float getJsonFloat(String json, String key, float defaultVal) {
        try {
            String pattern = ".*\"" + key + "\"\\s*:\\s*([0-9.eE+-]+).*";
            String val = json.replaceAll(pattern, "$1");
            if (!val.equals(json)) {
                return Float.parseFloat(val);
            }
        } catch (Exception ignored) {}
        return defaultVal;
    }

    private String getLocalIpAddress() {
        try {
            List<NetworkInterface> interfaces = Collections.list(
                NetworkInterface.getNetworkInterfaces());
            for (NetworkInterface intf : interfaces) {
                List<InetAddress> addrs = Collections.list(intf.getInetAddresses());
                for (InetAddress addr : addrs) {
                    if (!addr.isLoopbackAddress() && addr instanceof java.net.Inet4Address) {
                        return addr.getHostAddress();
                    }
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error getting IP", e);
        }
        return "127.0.0.1";
    }

    public String getLocalIp() { return localIp; }
    public int getPort() { return PORT; }
    public String getServerUrl() { return "http://" + localIp + ":" + PORT; }

    public void startServer() {
        try {
            start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            Log.d(TAG, "Server started on " + getServerUrl());
        } catch (IOException e) {
            Log.e(TAG, "Could not start server", e);
        }
    }
}
