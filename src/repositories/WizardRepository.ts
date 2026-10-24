import { Wizard, NewWizard } from "../domain/types";
import { IWizardRepository } from "../interfaces";

/**
 * WizardRepository – in-memory implementation of IWizardRepository.
 * Assigns auto-incrementing ids on registration.
 */
export class WizardRepository implements IWizardRepository {
  private wizards: Wizard[] = [];
  private nextId = 1;

  register(newWizard: NewWizard): Wizard {
    const wizard: Wizard = {
      id: this.nextId++,
      ...newWizard,
    };
    this.wizards.push(wizard);
    return wizard;
  }

  findByHouse(house: Wizard["house"]): Wizard[] {
    return this.wizards.filter((w) => w.house === house);
  }

  findById(id: number): Wizard | undefined {
    return this.wizards.find((w) => w.id === id);
  }

  getAll(): Wizard[] {
    return [...this.wizards];
  }
}
