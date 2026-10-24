import { Person } from "./Person";

/**
 * Ghost – Concrete person representing an apparition inhabiting Hogwarts.
 */
export class Ghost extends Person {
  constructor(
    id: number,
    name: string,
    public haunt: string
  ) {
    super(id, name);
  }

  /**
   * Overridden introduction expressing their spectral residence.
   */
  override introduce(): string {
    return `Oooooh! I am ${this.name}, phantom wanderer haunting ${this.haunt}.`;
  }
}
