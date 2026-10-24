import { IPerson } from "../../interfaces/IPerson";

/**
 * Person – Abstract base class for all Hogwarts beings.
 *
 * Pattern: Template Method / Polymorphism
 * WHY: Enforces immutable shared identity (id, name) across all Hogwarts entities
 *      while preventing direct instantiation of a generic "Person".
 * HOW: Implements IPerson with parameter properties (readonly id, readonly name).
 *      Provides a default introduce() method that subclasses can override.
 */
export abstract class Person implements IPerson {
  // Uses protected constructor so only derived classes can construct instances,
  // and parameter properties for concise, type-safe field assignment.
  constructor(
    public readonly id: number,
    public readonly name: string,
    protected readonly affiliation: string = "Hogwarts School of Witchcraft and Wizardry"
  ) {
    if (new.target === Person) {
      throw new Error("Cannot instantiate abstract class Person directly.");
    }
  }

  /**
   * Sensible default introduction in the base class.
   */
  introduce(): string {
    return `Greetings, I am ${this.name} (Registry ID: #${this.id}) of ${this.affiliation}.`;
  }
}
