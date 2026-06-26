package com.slotmachine;

import android.util.Log;

import java.io.IOException;

import fi.iki.elonen.websocket.WebSocket;
import fi.iki.elonen.websocket.WebSocketFrame;
import fi.iki.elonen.websocket.WebSocketFrame.CloseCode;

/**
 * GameWebSocket — represents a single WebSocket connection to a player's browser.
 * Each connected browser gets one instance.
 */
public class GameWebSocket extends WebSocket {

    private static final String TAG = "GameWS";

    public GameWebSocket(IHTTPSession handshakeRequest) {
        super(handshakeRequest);
    }

    @Override
    protected void onOpen() {
        Log.d(TAG, "WebSocket opened: " + getRemoteIp());
        // Send current full state on connect
        try {
            send(WebSocketManager.getInstance().buildFullStateMessage());
        } catch (IOException e) {
            Log.e(TAG, "Failed to send initial state", e);
        }
    }

    @Override
    protected void onClose(CloseCode code, String reason, boolean initiatedByRemote) {
        Log.d(TAG, "WebSocket closed: " + getRemoteIp() + " reason=" + reason);
        WebSocketManager.getInstance().removeClient(this);
    }

    @Override
    protected void onMessage(WebSocketFrame frame) {
        String text = frame.getTextPayload();
        if (text == null || text.isEmpty()) return;
        Log.d(TAG, "Message from " + getRemoteIp() + ": " + text);
        // Client messages can be handled here if needed
    }

    @Override
    protected void onPong(WebSocketFrame frame) {
        // Not needed
    }

    @Override
    protected void onException(IOException e) {
        Log.e(TAG, "WebSocket error for " + getRemoteIp(), e);
        WebSocketManager.getInstance().removeClient(this);
    }

    private String getRemoteIp() {
        try {
            return getHandshakeRequest().getRemoteIpAddress();
        } catch (Exception e) {
            return "unknown";
        }
    }

    /**
     * Send a JSON text message to this client
     */
    public void sendMessage(String json) throws IOException {
        if (isOpen()) {
            send(new WebSocketFrame(WebSocketFrame.OpCode.Text, true, json));
        }
    }
}
