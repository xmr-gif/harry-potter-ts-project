import { Person } from "./Person";
import { House } from "../types/House";

/**
 * Professor – Concrete person representing a Hogwarts faculty member.
 */
export class Professor extends Person {
  constructor(
    id: number,
    name: string,
    public subject: string,
    public headOfHouse?: House
  ) {
    super(id, name);
  }

  /**
   * Overridden introduction displaying academic discipline and house directorship.
   */
  override introduce(): string {
    const headship = this.headOfHouse
      ? ` and proud Head of ${this.headOfHouse} House`
      : "";
    return `Good day. I am Professor ${this.name}, instructor of ${this.subject}${headship}.`;
  }
}
