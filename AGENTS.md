# 🎰 777 Slot Machine — Project Overview

> Proyek ini adalah **aplikasi Android** yang menjalankan **server web embedded** (NanoHTTPD) untuk menghosting **game slot 3 reel klasik** di jaringan lokal. Admin mengontrol pengaturan game (jackpot, win rate, payout) melalui **native Android UI**, sementara pemain mengakses game via browser dari perangkat lain dalam jaringan yang sama.

---

## 📁 Struktur Proyek

```
html5-slot-machine/
├── src/                          # Source code web app (game)
│   ├── index.html               # Entry point HTML
│   ├── css/style.css            # CSS tema casino premium
│   └── js/
│       ├── index.js             # Entry point JS
│       ├── GameManager.js       # Orchestrator: spin, RNG, balance, UI updates
│       ├── ReelEngine.js        # Real vertical reel spinning mechanism
│       ├── Symbols.js           # Symbol definitions + weighted random + reel strips
│       ├── Paylines.js          # Payline evaluation (5 lines, wild symbols)
│       ├── AnimationManager.js  # Win effects, particles, highlights
│       ├── JackpotAPI.js        # REST API client to embedded server
│       └── AudioManager.js      # (planned) Sound effects
├── android/                     # Android app (native Java)
│   ├── app/src/main/java/com/slotmachine/
│   │   ├── MainActivity.java    # Admin panel UI (difficulty, jackpot, accounts)
│   │   ├── SlotServer.java      # NanoHTTPD server: serves game + REST API
│   │   ├── SlotMachineApplication.java  # Global exception handler
│   │   ├── GameConfig.java      # Game settings persistence (SharedPreferences)
│   │   └── AccountManager.java  # Player accounts management
│   ├── app/src/main/res/        # Android layouts, themes, drawables
│   └── app/build.gradle.kts     # Android build config (minSdk 23)
├── .github/workflows/
│   ├── android-build.yml        # Build APK via GitHub Actions
│   └── deploy.yml               # Deploy web app to GitHub Pages
├── webpack.config.js            # Webpack bundler config
├── package.json
└── README.md
```

---

## 🎮 Game Engine Architecture

### File: `src/js/ReelEngine.js` — Real Mechanical Reel

Fungsi: Membuat 3 reel yang benar-benar berputar secara vertikal.

**Cara kerja:**

1. Setiap reel memiliki **virtual strip** berisi ~28 simbol (25 random + 3 hasil)
2. Strip dirender sebagai elemen DOM vertikal panjang dengan `.reel-strip`
3. Animasi menggunakan `transform: translateY` dengan `requestAnimationFrame`
4. **Dual-phase easing:**
   - Fase 1 (55% pertama): high-speed linear scroll — simbol mengalir cepat
   - Fase 2 (45% terakhir): smooth deceleration dengan `quart ease-out`
5. **3 reel start bersamaan** via `Promise.all()`; masing-masing punya durasi berbeda sehingga berhenti bergantian (staggered)

**Parameter spin:**

- Turbo mode: 800/1000/1200ms, stagger 200ms
- Normal mode: 1200/1480/1760ms, stagger 280ms
- Semua hasil ditentukan RNG **sebelum** animasi dimulai

### File: `src/js/GameManager.js` — Main Orchestrator

Fungsi: Mengatur seluruh siklus permainan.

**Flow spin:**

1. Validasi balance > bet
2. Kurangi balance, simpan state
3. **RNG phase:** panggil `generateResult()` — tentukan grid 3×3 dan kemenangan
4. **Spin phase:** semua reel start bersamaan via array of Promises
5. **Win evaluation:** setelah semua reel berhenti, evaluasi paylines
6. Update balance, highlight wins, efek partikel
7. Auto-spin jika checkbox aktif

**State management:**

- Balance, bet, win disimpan di `localStorage` dan dikirim ke server via `JackpotAPI`
- Konfigurasi game (winRate, payoutMultiplier, dll) di-fetch dari server API `/api/config`
- Jika server offline, game tetap berjalan dengan default config

### File: `src/js/Symbols.js` — Symbol Definitions

12 simbol klasik dengan bobot kelangkaan:

| Simbol            | Bobot | Multiplier (3x)      |
| ----------------- | ----- | -------------------- |
| 💰 JACKPOT        | 2     | 500×                 |
| 💎 DIAMOND (wild) | 3     | 200×                 |
| 7️⃣ SEVEN          | 5     | 100×                 |
| Ⅲ TRIPLE BAR      | 6     | 60×                  |
| Ⅱ DOUBLE BAR      | 7     | 40×                  |
| Ⅰ BAR             | 8     | 25×                  |
| 🔔 BELL           | 8     | 15×                  |
| 🍒 CHERRY         | 10    | 10× (2 sudah menang) |
| 🍋 LEMON          | 10    | 8× (2 sudah menang)  |
| 🍊 ORANGE         | 11    | 6× (2 sudah menang)  |
| 🍑 PLUM           | 10    | 5×                   |
| 🍇 GRAPES         | 10    | 4×                   |
| 🍉 WATERMELON     | 10    | 3×                   |

### File: `src/js/Paylines.js` — Win Evaluation

5 paylines:

- Horizontal: top, middle, bottom
- Diagonal: down-right, up-right

**Aturan:**

- DIAMOND adalah **wild** — bisa menggantikan simbol lain
- JACKPOT, DIAMOND jika semua wild → dianggap SEVEN
- CHERRY, LEMON, ORANGE menang dengan **2 simbol matching**
- Simbol lain butuh **3 simbol matching** berturut-turut dari kiri

---

## 📱 Android App Architecture

### File: `android/.../SlotServer.java` — Embedded HTTP Server

Server NanoHTTPD di port **8080**:

- Melayani file statis dari `assets/www/`
- REST API endpoints:
  - `GET /api/config` — ambil config game
  - `POST /api/config` — update config (difficulty, winRate, payout, jackpot)
  - `GET/POST /api/money` — baca/simpan balance
  - `GET /api/status` — status server + config
  - `POST /api/jackpot` — update jackpot value

### File: `android/.../MainActivity.java` — Admin Panel

Native Android UI untuk admin:

- **Server info** — tampilkan IP:port dan status
- **Account management** — create/edit/delete akun pemain, reset all balances
- **Difficulty control** — Very Easy s/d Impossible, atau Custom
- **Win Rate slider** — 0.5% s/d 75%
- **Payout multiplier slider** — 1× s/d 50×
- **Jackpot setting** — atur nilai jackpot
- **Starting money & bet amount** — atur ekonomi game

### File: `android/.../GameConfig.java` — Configuration

Persistensi via `SharedPreferences`:

- Difficulty enum (6 level + custom)
- winRate, payoutMultiplier, minSpinsBeforeWin, jackpotHitRate
- startingMoney, betAmount, playerMoney
- Jackpot value

### File: `android/.../AccountManager.java` — Player Accounts

Manajemen akun via JSON + SharedPreferences:

- Create account (username + PIN + balance)
- Login authentication
- Update balance
- List all accounts (admin)
- Delete account
- Reset all balances

---

## 🚀 Build & Deploy

### Local build:

```bash
npm ci && npm run build           # Build web app
cp dist/* android/app/src/main/assets/www/  # Copy ke Android assets
cd android && ./gradlew assembleDebug  # Build APK
```

### GitHub Actions:

Push ke `main` → workflow `android-build.yml`:

1. Setup JDK 17 + Android SDK
2. Build web app via webpack
3. Copy ke assets
4. Build APK via Gradle
5. Upload `app-debug.apk` sebagai artifact

### Minimum requirements:

- Android 6.0 (API 23) — `minSdk = 23`
- WebView (Chrome/System WebView)
- Jaringan WiFi (untuk akses pemain)

---

## 🔄 Data Flow

```
┌──────────────────────┐       HTTP       ┌──────────────────┐
│   Android App        │ ◄──────────────► │   Web Browser    │
│   (Admin Panel)      │   port 8080      │   (Player)       │
│                      │                  │                  │
│  ┌────────────────┐  │  /api/config     │  ┌────────────┐  │
│  │  NanoHTTPD      │──┤◄──────────────►│  │  Slot Game  │  │
│  │  Server         │  │  /api/money     │  │  (HTML/JS)  │  │
│  └────────────────┘  │                  │  └────────────┘  │
│         │            │                  └──────────────────┘
│         ▼            │
│  ┌────────────────┐  │
│  │  SharedPrefs   │  │
│  └────────────────┘  │
└──────────────────────┘
```

Admin mengubah setting → server update SharedPreferences → game membaca via API real-time.

---

## 🧩 Key Implementation Details

### Real Reel Animation

- `ReelEngine.spin(finalSymbols, duration)` mengembalikan Promise
- Strip dibangun ulang setiap spin dengan hasil RNG di akhir
- `translateY` dianimasi dengan `requestAnimationFrame`
- Easing function: `88% strip di 55% waktu (linear) → 12% strip di 45% waktu (ease-out quart)`
- Tidak ada blur, fade, flip card, atau pergantian simbol instan
- Simbol benar-benar mengalir vertikal (scroll) dari atas ke bawah

### Simultaneous Start, Staggered Stop

```javascript
const durations = [1200, 1480, 1760]; // left, middle, right
const promises = reels.map((reel, i) => reel.spin(result, durations[i]));
await Promise.all(promises);
```

Semua reel mulai bersama, masing-masing punya total durasi berbeda sehingga berhenti bergantian.

### Win Calculation

```
RNG → generate grid 3×3 → evaluate paylines → total win → update balance
```

Diamond (💎) = wild. Jackpot (💰) = high-value. Paylines dievaluasi setelah SEMUA reel berhenti.

---

## 🐛 Common Issues & Solutions

| Issue                        | Cause                                   | Solution                                                                     |
| ---------------------------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| Reel kosong/tidak ada simbol | `.sym` elements tidak dibuat            | `ReelEngine._build()` membuat strip container, `loadStrip()` populate simbol |
| Force close / NPE            | Reel count mismatch (HTML 5 tapi JS 3)  | Konsisten: HTML 3 `.reel`, JS loop 3 reels                                   |
| Login/register tidak bekerja | Tidak ada halaman login (sudah dihapus) | Game langsung main tanpa login                                               |
| API config tidak respons     | Server offline                          | JackpotAPI fallback ke default config                                        |
| Build gagal di GitHub        | bootstrap-reboot.min.css reference      | Workflow di-sederhanakan, tidak perlu bootstrap                              |

---

## 🎯 Untuk AI Lain yang Meneruskan Proyek Ini

**Prinsip utama:**

1. **Reel harus benar-benar berputar** — gunakan `translateY` + `requestAnimationFrame`, jangan ganti simbol instan
2. **Hasil ditentukan RNG sebelum animasi** — animasi hanya menampilkan hasil yang sudah fix
3. **Start bersamaan, stop bergantian** — kiri → tengah → kanan, dengan easing halus
4. **Admin panel = Android native** — bukan web; gunakan SharedPreferences untuk persistensi
5. **Game bisa jalan tanpa server** — JackpotAPI fallback ke localStorage/defaults
6. **Kompatibel Android 6+** — minSdk 23, gunakan AppCompat, hindari API modern
7. **Jangan hapus fitur** — semua fitur yang ada (auto spin, turbo, max bet, balance reset) harus tetap berfungsi

**Yang TIDAK boleh dilakukan:**

- ❌ Jangan ganti mekanisme reel dengan flip card atau grid statis
- ❌ Jangan tambah halaman login/register di game web
- ❌ Jangan ubah simbol klasik ke jenis lain
- ❌ Jangan hapus admin panel Android
