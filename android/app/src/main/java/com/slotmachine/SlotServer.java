package com.slotmachine;

import android.content.Context;
import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
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
    private static final String API_JACKPOT = "/api/jackpot";
    private static final String API_STATUS = "/api/status";

    private final Context context;
    private final JackpotManager jackpotManager;
    private String localIp;

    public SlotServer(Context context) {
        super(PORT);
        this.context = context;
        this.jackpotManager = JackpotManager.getInstance(context);
        this.localIp = getLocalIpAddress();
    }

    @Override
    public Response serve(IHTTPSession session) {
        String uri = session.getUri();
        Method method = session.getMethod();

        Log.d(TAG, method + " " + uri);

        // API routes
        if (uri.equals(API_JACKPOT)) {
            return handleJackpotApi(method, session);
        }
        if (uri.equals(API_STATUS)) {
            return handleStatusApi();
        }

        // Serve static files
        return serveStaticFile(uri);
    }

    private Response handleJackpotApi(Method method, IHTTPSession session) {
        if (Method.GET.equals(method)) {
            String json = "{\"jackpot\": " + jackpotManager.getJackpot()
                + ", \"formatted\": \"" + jackpotManager.getFormattedJackpot() + "\"}";
            return newFixedLengthResponse(Response.Status.OK, "application/json", json);
        }

        if (Method.POST.equals(method)) {
            try {
                Map<String, String> files = new HashMap<>();
                session.parseBody(files);

                int contentLength = Integer.parseInt(
                    session.getHeaders().getOrDefault("content-length", "0"));

                if (contentLength > 0) {
                    String body = session.getQueryParameterString();
                    if (body == null || body.isEmpty()) {
                        // Try to read from parsed body
                        body = files.get("postData");
                    }
                    if (body != null && !body.isEmpty()) {
                        // Parse JSON manually
                        if (body.contains("\"value\"")) {
                            String valStr = body.replaceAll(".*\"value\"\\s*:\\s*(\\d+).*", "$1");
                            try {
                                long value = Long.parseLong(valStr);
                                jackpotManager.setJackpot(value);
                                String json = "{\"success\": true, \"jackpot\": " + value + "}";
                                return newFixedLengthResponse(Response.Status.OK, "application/json", json);
                            } catch (NumberFormatException e) {
                                // ignore
                            }
                        }
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
            + "\"jackpot\": " + jackpotManager.getJackpot()
            + "}";
        return newFixedLengthResponse(Response.Status.OK, "application/json", json);
    }

    private Response serveStaticFile(String uri) {
        if (uri == null || uri.equals("/")) {
            uri = "/index.html";
        }

        // Remove leading slash
        String assetPath = "www" + uri;

        try {
            InputStream inputStream = context.getAssets().open(assetPath);
            String mimeType = getMimeType(uri);

            // Read the input stream into bytes
            byte[] bytes = readInputStream(inputStream);
            inputStream.close();

            return newFixedLengthResponse(Response.Status.OK, mimeType, bytes);
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
        if (uri.endsWith(".woff2")) return "font/woff2";
        if (uri.endsWith(".woff")) return "font/woff";
        return "text/plain";
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

    public String getLocalIp() {
        return localIp;
    }

    public int getPort() {
        return PORT;
    }

    public String getServerUrl() {
        return "http://" + localIp + ":" + PORT;
    }

    public void startServer() {
        try {
            start(NanoHTTPD.SOCKET_READ_TIMEOUT, false);
            Log.d(TAG, "Server started on " + getServerUrl());
        } catch (IOException e) {
            Log.e(TAG, "Could not start server", e);
        }
    }
}
