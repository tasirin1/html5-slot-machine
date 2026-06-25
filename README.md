# 🎰 Slot 777 Admin

A complete slot machine game system with:

- **Web-based slot machine** playable from any browser
- **Android APK** with embedded HTTP server and admin panel
- **Local network hosting** — play on multiple devices via WiFi
- **Admin dashboard** to control difficulty, jackpot, and money settings

## Features

### 🎮 Game (Browser)

- 5-reel slot 777 classic (7, BAR, Bell, Cherry, Lemon, etc.)
- Smooth animations using Web Animations API
- Fully responsive for mobile, tablet, and desktop
- Money system: bet coins, win payouts
- Autoplay mode
- Landscape optimized

### 📱 Admin Panel (Android APK)

- Start/stop local HTTP server on port 8080
- **Difficulty Level**: Very Easy → Impossible (6 presets)
- **Win Rate**: 0.5% — 75%
- **Payout Multiplier**: 1× — 50×
- **Jackpot**: Set any amount
- **Starting Money & Bet Amount**: Configure player economy
- Works on Android 6+ and Android TV

## Installation

### Web App

```bash
npm install
npm run build    # production build → /dist
npm start        # development server → http://localhost:8080
```

### Android APK

Download from [GitHub Actions](GitHub Actions):

1. Open the **Build Android APK** workflow
2. Click the latest successful run (✅)
3. Scroll to **Artifacts** → download **slot-machine-apk**
4. Extract ZIP and install `app-debug.apk` on Android

## How to Play

1. Install the APK on an Android device and open it
2. The admin dashboard shows the **server URL** (e.g., `http://192.168.1.5:8080`)
3. Adjust **Difficulty**, **Jackpot**, and **Money** settings
4. Open a browser on any device on the same WiFi network
5. Navigate to the server URL
6. Start spinning! (The game follows the rules set from the admin panel)

## Architecture

```
┌─────────────────┐     WiFi      ┌──────────────────┐
│  Android APK    │──────────────▶│  Player Browser  │
│  (Admin Panel)  │  HTTP :8080   │  (Slot Machine)  │
│                 │               │                  │
│  ┌───────────┐  │  GET /api/    │  ┌────────────┐  │
│  │  GameConfig│◀├───────────────┤  │  Slot.js   │  │
│  │  (SharedPref)│  config       │  │  (Web)     │  │
│  └───────────┘  │               │  └────────────┘  │
│       │         │               │                  │
│  ┌───────────┐  │  POST /api/   │                  │
│  │ SlotServer │◀├───────────────┤                  │
│  │ (NanoHTTPd)│  │ config       │                  │
│  └───────────┘  │               │                  │
└─────────────────┘               └──────────────────┘
```

## API Endpoints

| Method | Endpoint       | Description                |
| ------ | -------------- | -------------------------- |
| GET    | `/api/config`  | Get all game configuration |
| POST   | `/api/config`  | Update game configuration  |
| GET    | `/api/jackpot` | Get current jackpot        |
| POST   | `/api/jackpot` | Set jackpot value          |
| GET    | `/api/status`  | Server status info         |
