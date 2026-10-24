/**
 * Spell entity – represents a magical spell in the registry.
 */
export interface Spell {
  readonly id: number;
  name: string;
  category: string;
  power: number;
}
