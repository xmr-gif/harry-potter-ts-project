import { House } from "./House";

/**
 * Wizard entity – the core domain object for the registry.
 */
export interface Wizard {
  readonly id: number;
  name: string;
  house: House;
  level: number;
  active: boolean;
}

/**
 * NewWizard – Omit<Wizard, "id"> so the caller never provides an id.
 * The repository assigns it upon registration.
 */
export type NewWizard = Omit<Wizard, "id">;
