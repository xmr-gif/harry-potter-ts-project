import { SpellCastEvent } from "../domain/types";

/**
 * handleSpellCast – processes only SpellCastEvent from the discriminated union.
 * Passing a LevelUpEvent or WizardExpelledEvent will not compile.
 */
export function handleSpellCast(event: SpellCastEvent): void {
  console.log(
    `  Wizard #${event.wizardId} cast "${event.spellName}"!`
  );
}
