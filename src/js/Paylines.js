/**
 * Paylines — 3-reel classic slot payline evaluation
 * 5 paylines: 3 horizontal + 2 diagonal
 */

export const PAYLINES = [
  [
    [0, 0],
    [1, 0],
    [2, 0],
  ], // Top row
  [
    [0, 1],
    [1, 1],
    [2, 1],
  ], // Middle row (main)
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ], // Bottom row
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ], // Diagonal down-right
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Diagonal up-right
];

/**
 * Get payout multiplier for a symbol and count
 */
function getPayout(symbolId, count) {
  const sym = window.__SYMBOLS_DATA?.[symbolId];
  if (!sym || !sym.mult) return 0;
  const arr = sym.mult;
  const idx = Math.min(Math.max(count - 1, 0), arr.length - 1);
  return arr[idx];
}

/**
 * Minimum matching count required for a win
 * Fruits (CHERRY, LEMON, ORANGE) pay on 2 matching
 * Everything else needs 3+
 */
function minCount(symbolId) {
  return symbolId === "CHERRY" || symbolId === "LEMON" || symbolId === "ORANGE"
    ? 2
    : 3;
}

/**
 * Evaluate wins on a 3-reel grid
 * Grid format: grid[reelIndex][rowIndex] = symbolId
 *   reelIndex: 0=left, 1=middle, 2=right
 *   rowIndex: 0=top, 1=middle, 2=bottom
 *
 * @param {string[][]} grid - 3x3 grid of symbol IDs
 * @param {number} bet - Current bet amount
 * @returns {Array} Array of win objects
 */
export function evaluate(grid, bet) {
  if (!grid || grid.length < 3) return [];

  const wins = [];

  for (let pi = 0; pi < PAYLINES.length; pi++) {
    const line = PAYLINES[pi];

    // Get symbols along this payline
    const syms = line.map(([r, c]) => {
      if (grid[r] && grid[r][c] !== undefined) return grid[r][c];
      return "BAR";
    });

    // Find first non-wild symbol (DIAMOND is wild)
    let first = null;
    for (const s of syms) {
      if (s !== "DIAMOND" && s !== "JACKPOT") {
        first = s;
        break;
      }
    }
    if (!first) first = "SEVEN";
    if (first === "DIAMOND" || first === "JACKPOT") first = "SEVEN";

    // Count consecutive matching from left (wild acts as any)
    let count = 0;
    for (const s of syms) {
      if (s === first || s === "DIAMOND") count++;
      else break;
    }

    if (count < minCount(first)) continue;

    const mult = getPayout(first, count);
    if (mult <= 0) continue;

    wins.push({
      payline: pi,
      symbol: first,
      count,
      multiplier: mult,
      amount: Math.floor(bet * mult),
      positions: line.slice(0, count),
    });
  }

  return wins;
}

/**
 * Get total win amount from win results
 */
export function totalWin(wins) {
  return wins.reduce((sum, w) => sum + w.amount, 0);
}
