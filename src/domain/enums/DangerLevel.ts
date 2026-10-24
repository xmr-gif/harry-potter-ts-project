/**
 * DangerLevel – numeric enum for spell danger ranking.
 * Numeric values enable comparison: "is A more dangerous than B?"
 */
export enum DangerLevel {
  Harmless = 0,
  Risky = 1,
  Dangerous = 2,
  Forbidden = 3,
}

/**
 * Compare two danger levels.
 * Returns true if `a` is more dangerous than `b`.
 */
export function isMoreDangerous(a: DangerLevel, b: DangerLevel): boolean {
  return a > b;
}
