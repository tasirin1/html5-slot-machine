# 🎰 777 Slot - Premium Casino Game

Aplikasi Android server embedded untuk mesin slot klasik 3-reel.
Game diakses melalui browser di perangkat lain dalam jaringan lokal.
Admin panel tersedia di dalam aplikasi untuk mengontrol pengaturan game.

## Fitur

- **Slot 3 Reel Klasik** dengan simbol BAR, 7, Cherry, Lemon, Bell, dll.
- **Server Embedded** — hosting game di jaringan lokal via NanoHTTPD
- **Admin Panel** — atur jackpot, tingkat kesulitan, win rate, payout multiplier
- **Manajemen Akun** — buat/atur akun pemain langsung dari aplikasi
- **Real-time Config** — perubahan pengaturan langsung teraplikasi ke game
- **Landing Page** — tampilkan URL server dan QR code untuk akses mudah

## Cara Pakai

1. Install APK di perangkat Android
2. Buka aplikasi → server otomatis berjalan
3. Lihat URL server (contoh: `http://192.168.1.5:8080`)
4. Buka URL tersebut dari perangkat lain dalam jaringan yang sama
5. Mainkan slot dari browser perangkat lain
6. Atur jackpot, kesulitan, dan kelola akun dari admin panel di aplikasi

## Build APK

```bash
npm ci
npm run build
cp dist/* android/app/src/main/assets/www/
cd android
./gradlew assembleDebug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6) — Webpack
- **Backend**: NanoHTTPD (embedded Java HTTP server)
- **Android**: Java, SharedPreferences, CardView
- **Min SDK**: Android 6.0 (API 23)
