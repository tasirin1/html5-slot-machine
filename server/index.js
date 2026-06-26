/**
 * Slot Casino Tasirin — Express Server
 * Serves the webpack-built game and API endpoints
 * Ready for Koyeb deployment
 */

const express = require('express');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'kasino-secret-key-2024';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'tasirin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '255280';

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Ensure data directory exists
const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// ===== JSON FILE HELPERS =====
function readJSON(filename, defaultVal = {}) {
  const filepath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filepath)) {
      return JSON.parse(fs.readFileSync(filepath, 'utf8'));
    }
  } catch (e) {
    console.error(`Error reading ${filename}:`, e.message);
  }
  return defaultVal;
}

function writeJSON(filename, data) {
  const filepath = path.join(DATA_DIR, filename);
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf8');
}

// ===== DEFAULT DATA =====
const defaultConfig = {
  winRate: 0.15,
  payoutMultiplier: 3,
  minSpinsBeforeWin: 0,
  jackpotHitRate: 0.005,
  difficultyId: 2,
  difficultyLabel: 'Medium',
  jackpot: 5555555,
  startingMoney: 10000,
  betAmount: 100,
  rtp: 0.85,
  maxBet: 10000,
  minBet: 10,
  maxWin: 500000,
  maxMultiplier: 5000,
  maintenanceMode: false,
};

const defaultJackpot = {
  value: 5555555,
  lastHit: null,
  totalPaid: 0,
};

// ===== API ROUTES =====

// GET /api/config
app.get('/api/config', (req, res) => {
  const config = readJSON('config.json', defaultConfig);
  res.json(config);
});

// POST /api/config
app.post('/api/config', (req, res) => {
  const config = readJSON('config.json', defaultConfig);
  const updates = req.body;
  for (const key of Object.keys(defaultConfig)) {
    if (updates[key] !== undefined) {
      config[key] = updates[key];
    }
  }
  writeJSON('config.json', config);
  res.json({ success: true, config });
});

// GET /api/jackpot
app.get('/api/jackpot', (req, res) => {
  const jackpot = readJSON('jackpot.json', defaultJackpot);
  res.json(jackpot);
});

// POST /api/jackpot
app.post('/api/jackpot', (req, res) => {
  const jackpot = readJSON('jackpot.json', defaultJackpot);
  if (req.body.value !== undefined) {
    jackpot.value = parseInt(req.body.value) || 0;
  }
  writeJSON('jackpot.json', jackpot);
  res.json({ success: true, jackpot });
});

// GET /api/status
app.get('/api/status', (req, res) => {
  const config = readJSON('config.json', defaultConfig);
  res.json({
    status: 'running',
    version: '1.0.0',
    game: 'Classic 777 Slot',
    config: {
      difficulty: config.difficultyLabel,
      winRate: config.winRate,
      jackpot: config.jackpot,
      rtp: config.rtp,
    },
  });
});

// POST /api/login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }

  // Admin login
  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign(
      { username, role: 'admin' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({ success: true, token, username, role: 'admin' });
  }

  // Check users file
  const users = readJSON('users.json', {});
  const user = users[username];
  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      { username, role: 'player' },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    return res.json({ success: true, token, username, role: 'player', balance: user.balance });
  }

  res.status(401).json({ error: 'Invalid username or password' });
});

// POST /api/register
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (username.length < 3) {
    return res.status(400).json({ error: 'Username must be at least 3 characters' });
  }
  if (password.length < 4) {
    return res.status(400).json({ error: 'Password must be at least 4 characters' });
  }

  const users = readJSON('users.json', {});
  if (users[username]) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  const config = readJSON('config.json', defaultConfig);
  const salt = bcrypt.genSaltSync(10);
  users[username] = {
    username,
    password: bcrypt.hashSync(password, salt),
    balance: config.startingMoney || 10000,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    totalBet: 0,
    totalWin: 0,
  };
  writeJSON('users.json', users);

  const token = jwt.sign(
    { username, role: 'player' },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
  res.json({ success: true, token, username, role: 'player', balance: users[username].balance });
});

// Auth middleware
function authMiddleware(req, res, next) {
  const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

function adminMiddleware(req, res, next) {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

// POST /api/logout
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// GET /api/user
app.get('/api/user', authMiddleware, (req, res) => {
  const users = readJSON('users.json', {});
  const config = readJSON('config.json', defaultConfig);

  if (req.user.role === 'admin') {
    return res.json({
      username: req.user.username,
      role: 'admin',
      isAdmin: true,
    });
  }

  const user = users[req.user.username];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    username: user.username,
    role: 'player',
    balance: user.balance,
    createdAt: user.createdAt,
    totalBet: user.totalBet || 0,
    totalWin: user.totalWin || 0,
  });
});

// POST /api/spin
app.post('/api/spin', authMiddleware, (req, res) => {
  const { bet } = req.body;
  if (!bet || bet < 10) {
    return res.status(400).json({ error: 'Invalid bet amount' });
  }

  const users = readJSON('users.json', {});
  const user = users[req.user.username];
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.balance < bet) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }

  user.balance -= bet;
  user.totalBet = (user.totalBet || 0) + bet;
  writeJSON('users.json', users);

  res.json({
    success: true,
    balance: user.balance,
    bet,
  });
});

// ===== ADMIN ROUTES =====

// GET /api/admin/users
app.get('/api/admin/users', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJSON('users.json', {});
  const userList = Object.entries(users).map(([username, data]) => ({
    username,
    balance: data.balance,
    createdAt: data.createdAt,
    lastLogin: data.lastLogin,
    totalBet: data.totalBet || 0,
    totalWin: data.totalWin || 0,
  }));
  res.json({ users: userList, total: userList.length });
});

// PUT /api/admin/user/:username
app.put('/api/admin/user/:username', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJSON('users.json', {});
  const { username } = req.params;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }
  if (req.body.balance !== undefined) {
    users[username].balance = parseInt(req.body.balance) || 0;
  }
  writeJSON('users.json', users);
  res.json({ success: true, user: users[username] });
});

// DELETE /api/admin/user/:username
app.delete('/api/admin/user/:username', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJSON('users.json', {});
  const { username } = req.params;
  if (!users[username]) {
    return res.status(404).json({ error: 'User not found' });
  }
  delete users[username];
  writeJSON('users.json', users);
  res.json({ success: true });
});

// POST /api/admin/user
app.post('/api/admin/user', authMiddleware, adminMiddleware, (req, res) => {
  const users = readJSON('users.json', {});
  const { username, password, balance } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  const salt = bcrypt.genSaltSync(10);
  users[username] = {
    username,
    password: bcrypt.hashSync(password, salt),
    balance: parseInt(balance) || 10000,
    createdAt: new Date().toISOString(),
    lastLogin: null,
    totalBet: 0,
    totalWin: 0,
  };
  writeJSON('users.json', users);
  res.json({ success: true, user: { username, balance: users[username].balance } });
});

// POST /api/admin/reset-all
app.post('/api/admin/reset-all', authMiddleware, adminMiddleware, (req, res) => {
  const config = readJSON('config.json', defaultConfig);
  const users = readJSON('users.json', {});
  for (const username of Object.keys(users)) {
    users[username].balance = config.startingMoney || 10000;
    users[username].totalBet = 0;
    users[username].totalWin = 0;
  }
  writeJSON('users.json', users);
  res.json({ success: true, message: 'All balances reset' });
});

// ===== STATIC FILES (built web app) =====
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback — any non-API route serves index.html
app.get('*', (req, res) => {
  // Don't catch API routes
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// ===== START SERVER =====
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🎰 Slot Casino Tasirin Server`);
  console.log(`📡 Running on http://0.0.0.0:${PORT}`);
  console.log(`👤 Admin: ${ADMIN_USERNAME}`);
});
