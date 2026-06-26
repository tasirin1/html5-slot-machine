/**
 * Paylines for 3-reel classic slot
 * 3 horizontal lines + 2 diagonals = 5 paylines
 * Grid: [reel][row] → [0][top] [1][mid] [2][bot]
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
  ], // Middle row
  [
    [0, 2],
    [1, 2],
    [2, 2],
  ], // Bottom row
  [
    [0, 0],
    [1, 1],
    [2, 2],
  ], // Diagonal down
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Diagonal up
];

/**
 * Get payout multiplier for symbol + count
 */
function getPayout(symbolId, count) {
  const mults = {
    DIAMOND: [0, 0, 200, 1000, 5000],
    SEVEN: [0, 0, 100, 500, 2500],
    BAR: [0, 0, 50, 200, 1000],
    BELL: [0, 0, 25, 100, 500],
    CHERRY: [0, 5, 15, 50, 200],
    LEMON: [0, 3, 10, 40, 150],
    ORANGE: [0, 2, 8, 30, 100],
    PLUM: [0, 0, 6, 20, 75],
    WATERMELON: [0, 0, 5, 15, 50],
    GRAPES: [0, 0, 3, 10, 40],
  };
  const arr = mults[symbolId];
  if (!arr) return 0;
  const idx = Math.min(Math.max(count - 1, 0), arr.length - 1);
  return arr[idx];
}

/**
 * Minimum matching count required for a win
 */
function minCount(symbolId) {
  return symbolId === "CHERRY" || symbolId === "LEMON" || symbolId === "ORANGE"
    ? 2
    : 3;
}

/**
 * Evaluate wins on a 3-reel grid
 * Grid format: grid[reelIndex][rowIndex] = symbolId
 * reelIndex: 0=left, 1=middle, 2=right
 * rowIndex: 0=top, 1=middle, 2=bottom
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

    // Find first non-WILD symbol
    let first = null;
    for (const s of syms) {
      if (s !== "DIAMOND") {
        first = s;
        break;
      }
    }
    if (!first) first = "SEVEN"; // All wilds → treat as SEVEN

    // Count consecutive from left (DIAMOND acts as wild)
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
