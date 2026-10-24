/**
 * AcademyEvent – discriminated union of all events that can occur at Hogwarts.
 * The `type` field is the discriminant.
 *
 * Pattern: Discriminated Union
 * WHY: Models mutually exclusive event shapes with a shared discriminant field.
 * HOW: TypeScript narrows the union via `type` in switch/if, giving exhaustive checking.
 */

export type SpellCastEvent = {
  type: "spell-cast";
  wizardId: number;
  spellName: string;
};

export type LevelUpEvent = {
  type: "level-up";
  wizardId: number;
  newLevel: number;
};

export type WizardExpelledEvent = {
  type: "wizard-expelled";
  wizardId: number;
};

export type AcademyEvent = SpellCastEvent | LevelUpEvent | WizardExpelledEvent;

/**
 * Derived type using Extract – pulls only SpellCastEvent from the union.
 * This is equivalent to SpellCastEvent but derived from the union type.
 */
export type ExtractedSpellCastEvent = Extract<AcademyEvent, { type: "spell-cast" }>;
