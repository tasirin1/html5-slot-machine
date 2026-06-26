/**
 * Payline system — 9 paylines for 5x3 grid
 * Each line defines 5 [reel, row] positions (left to right)
 */

export const PAYLINES = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ], // Top horizontal
  [
    [0, 1],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 1],
  ], // Middle horizontal
  [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
  ], // Bottom horizontal
  [
    [0, 0],
    [1, 1],
    [2, 2],
    [3, 1],
    [4, 0],
  ], // V-down
  [
    [0, 2],
    [1, 1],
    [2, 0],
    [3, 1],
    [4, 2],
  ], // V-up
  [
    [0, 0],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 0],
  ], // Zigzag wide top
  [
    [0, 2],
    [1, 1],
    [2, 1],
    [3, 1],
    [4, 2],
  ], // Zigzag wide bottom
  [
    [0, 1],
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 1],
  ], // Zigzag narrow top
  [
    [0, 1],
    [1, 2],
    [2, 1],
    [3, 0],
    [4, 1],
  ], // Zigzag narrow bottom
];

/**
 * Get multiplier from symbol data (handles pure data, no imports)
 */
function getMult(symbolKey, count) {
  const mults = {
    WILD: [0, 0, 100, 500, 2500],
    SEVEN: [0, 0, 50, 200, 1000],
    BAR: [0, 0, 25, 100, 500],
    BELL: [0, 0, 15, 50, 200],
    CHERRY: [0, 5, 10, 30, 150],
    LEMON: [0, 3, 8, 25, 100],
    ORANGE: [0, 2, 6, 20, 75],
    PLUM: [0, 0, 5, 15, 50],
    MELON: [0, 0, 4, 12, 40],
    GRAPES: [0, 0, 3, 10, 30],
  };
  const arr = mults[symbolKey];
  if (!arr) return 0;
  const idx = Math.min(Math.max(count - 1, 0), arr.length - 1);
  return arr[idx];
}

function minWin(symbol) {
  return symbol === "CHERRY" || symbol === "LEMON" || symbol === "ORANGE"
    ? 2
    : 3;
}

/**
 * Evaluate all paylines on a 5x3 grid
 * @param {string[][]} grid - 5 arrays of 3 symbol IDs
 * @param {number} betAmount - current bet
 * @returns {Array} win results
 */
export function evaluate(grid, betAmount) {
  const results = [];

  for (let pi = 0; pi < PAYLINES.length; pi++) {
    const line = PAYLINES[pi];
    // Get the symbol at each position [reel, row]
    const posSymbols = line.map(([r, c]) => {
      const sym = grid[r] ? grid[r][c] : null;
      return sym || "BAR";
    });

    let firstNonWild = null;
    for (const s of posSymbols) {
      if (s !== "WILD") {
        firstNonWild = s;
        break;
      }
    }
    if (!firstNonWild) firstNonWild = posSymbols[0];

    let count = 0;
    for (let i = 0; i < posSymbols.length; i++) {
      if (posSymbols[i] === firstNonWild || posSymbols[i] === "WILD") {
        count++;
      } else {
        break;
      }
    }

    if (count < minWin(firstNonWild)) continue;

    const mult = getMult(firstNonWild, count);
    if (mult <= 0) continue;

    results.push({
      payline: pi,
      symbol: firstNonWild,
      count,
      multiplier: mult,
      amount: Math.floor(betAmount * mult),
      positions: line.slice(0, count),
      symbolIds: posSymbols,
    });
  }

  return results;
}
