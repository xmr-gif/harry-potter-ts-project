import { Spell } from "../domain/types";
import { ISpellRepository } from "../interfaces";
import { ValidateSpellPower } from "../decorators/ValidateSpellPower";

/**
 * SpellRepository – in-memory implementation of ISpellRepository.
 * The @ValidateSpellPower decorator validates power before adding.
 */
export class SpellRepository implements ISpellRepository {
  private spells: Spell[] = [];

  @ValidateSpellPower
  add(spell: Spell): Spell {
    this.spells.push(spell);
    return spell;
  }

  findById(id: number): Spell | undefined {
    return this.spells.find((s) => s.id === id);
  }

  getAll(): Spell[] {
    return [...this.spells];
  }
}
