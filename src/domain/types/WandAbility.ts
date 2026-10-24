/**
 * WandAbility – wand ability flags in binary notation.
 * Each flag represents a capability the wand has.
 */
export const WandAbility = {
  /** Core spell casting */
  CAST:       0b0001,
  /** Non-verbal spells */
  NONVERBAL:  0b0010,
  /** Wandless magic */
  WANDLESS:   0b0100,
  /** Dark arts */
  DARK_ARTS:  0b1000,
} as const;

/** Type for a combination of wand ability flags (bitwise OR) */
export type WandAbilityFlags = number;

/** Check if a wand has a specific ability */
export function hasAbility(flags: WandAbilityFlags, ability: number): boolean {
  return (flags & ability) !== 0;
}
