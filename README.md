# 🎰 777 Slot — Premium Casino Game

> Mesin slot klasik 3-reel dengan server embedded Android & web server.

## 📱 Android APK

Aplikasi Android yang menjalankan server web embedded (NanoHTTPD) untuk menghosting game slot di jaringan lokal. Admin mengontrol pengaturan game (jackpot, win rate, payout) melalui native Android UI.

**Min SDK:** Android 6.0 (API 23)

### Build APK

```bash
npm ci && npm run build        # Build web app
cp dist/* android/app/src/main/assets/www/  # Copy ke Android assets
cd android && ./gradlew assembleDebug       # Build APK
```

## 🌐 Web Version (Koyeb / Standalone)

Jalankan sebagai web server standalone tanpa Android:

```bash
npm ci && npm run build   # Build frontend
npm start                 # Start Express server di port 3000
```

## 🎮 Game Features

- **3 Reel Klasik** — simbol BAR, 7, Cherry, Lemon, Bell, Orange, Plum, Grapes, Watermelon, Diamond
- **Reel Berputar Nyata** — animasi scroll kontinu dengan requestAnimationFrame
- **5 Paylines** — 3 horizontal + 2 diagonal, wild (DIAMOND)
- **RNG Berdasarkan Konfigurasi** — win rate, difficulty, payout multiplier dari admin
- **Auto Spin & Turbo Mode**
- **Balance & Bet Management**

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript ES6 + Webpack
- **Backend (Android):** NanoHTTPD (embedded Java HTTP server)
- **Backend (Web):** Node.js + Express
- **Android:** Java, SharedPreferences, Material Design
- **Storage:** SharedPreferences (Android) / JSON files (web)

## 🚀 API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/config` | Game configuration |
| POST | `/api/config` | Update configuration |
| GET | `/api/jackpot` | Jackpot value |
| POST | `/api/jackpot` | Update jackpot |
| POST | `/api/login` | Login (admin/player) |
| POST | `/api/register` | Register new player |
| GET | `/api/user` | Current user info |
| POST | `/api/spin` | Perform a spin |
| GET | `/api/admin/users` | List users (admin) |

## 🔧 GitHub Actions

Push ke `main` → otomatis build APK dan upload sebagai artifact.

## 📄 Lisensi

MIT
