/**
 * Paylines — 3-reel classic slot payline evaluation
 * 5 paylines: 3 horizontal + 2 diagonal
 *
 * Grid format: grid[reelIdx][rowIdx]
 *   reelIdx: 0=left, 1=middle, 2=right
 *   rowIdx:  0=top, 1=middle, 2=bottom
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
  ], // Diagonal down-right
  [
    [0, 2],
    [1, 1],
    [2, 0],
  ], // Diagonal up-right
];

function getPayout(symbolId, count) {
  const sym = window.__SYMBOLS_DATA?.[symbolId];
  if (!sym?.mult) return 0;
  const idx = Math.min(Math.max(count - 1, 0), sym.mult.length - 1);
  return sym.mult[idx];
}

function minCount(symbolId) {
  return symbolId === "CHERRY" || symbolId === "LEMON" || symbolId === "ORANGE"
    ? 2
    : 3;
}

export function evaluate(grid, bet) {
  if (!grid || grid.length < 3) return [];
  const wins = [];

  for (let pi = 0; pi < PAYLINES.length; pi++) {
    const line = PAYLINES[pi];
    const syms = line.map(([r, c]) =>
      grid[r] && grid[r][c] !== undefined ? grid[r][c] : "BAR",
    );

    // Find first non-wild symbol
    let first = null;
    for (const s of syms) {
      if (s !== "DIAMOND" && s !== "JACKPOT") {
        first = s;
        break;
      }
    }
    if (!first) first = "SEVEN";
    if (first === "DIAMOND" || first === "JACKPOT") first = "SEVEN";

    // Count consecutive from left (wild acts as any)
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

export function totalWin(wins) {
  return wins.reduce((sum, w) => sum + w.amount, 0);
}
