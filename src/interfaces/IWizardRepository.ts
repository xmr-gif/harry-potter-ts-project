import { Wizard, NewWizard, House } from "../domain/types";

/**
 * IWizardRepository – contract for wizard persistence.
 * Depends on domain types only (Dependency Inversion Principle).
 */
export interface IWizardRepository {
  register(wizard: NewWizard): Wizard;
  findByHouse(house: Wizard["house"]): Wizard[];
  findById(id: number): Wizard | undefined;
  getAll(): Wizard[];
}
