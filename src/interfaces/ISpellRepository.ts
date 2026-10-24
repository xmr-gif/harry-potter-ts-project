import { Spell } from "../domain/types";

/**
 * ISpellRepository – contract for spell persistence.
 */
export interface ISpellRepository {
  add(spell: Spell): Spell;
  findById(id: number): Spell | undefined;
  getAll(): Spell[];
}
