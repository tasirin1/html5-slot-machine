package com.slotmachine;

import android.app.Application;
import android.util.Log;
import android.widget.Toast;

public class SlotMachineApplication extends Application {
    private static final String TAG = "SlotMachineApp";

    @Override
    public void onCreate() {
        super.onCreate();

        // Global uncaught exception handler
        final Thread.UncaughtExceptionHandler defaultHandler = 
            Thread.getDefaultUncaughtExceptionHandler();

        Thread.setDefaultUncaughtExceptionHandler(new Thread.UncaughtExceptionHandler() {
            @Override
            public void uncaughtException(Thread thread, Throwable e) {
                Log.e(TAG, "UNCAUGHT EXCEPTION on thread: " + thread.getName(), e);
                // Show toast with error info
                String msg = "Error: " + (e.getMessage() != null ? e.getMessage() : e.getClass().getSimpleName());
                Log.e(TAG, msg);
                // Fall back to default handler which will crash with proper message
                if (defaultHandler != null) {
                    defaultHandler.uncaughtException(thread, e);
                }
            }
        });
    }
}
