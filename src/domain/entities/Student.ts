import { Person } from "./Person";
import { House } from "../types/House";
import { StudentYear } from "../types/Roles";
import { StudentSummary } from "../types/StudentSummary";

/**
 * Student – Concrete person representing a Hogwarts pupil.
 *
 * Pattern: Information Hiding / Encapsulation
 * WHY: Personal data (home address, health notes) must remain private to protect
 *      student privacy, while academic details (house, year) remain visible.
 * HOW: homeAddress and healthNotes are declared private; external callers
 *      can request an immutable StudentSummary projection via toSummary().
 */
export class Student extends Person {
  constructor(
    id: number,
    name: string,
    public house: House,
    public year: StudentYear,
    private homeAddress: string,
    private healthNotes: string
  ) {
    super(id, name);
  }

  /**
   * Overridden introduction in the student's own voice.
   */
  override introduce(): string {
    return `Hello! I'm ${this.name}, a Year ${this.year} student sorted into ${this.house}.`;
  }

  /**
   * Public summary view omitting private personal information.
   */
  toSummary(): StudentSummary {
    return {
      id: this.id,
      name: this.name,
      house: this.house,
      year: this.year,
    };
  }
}
