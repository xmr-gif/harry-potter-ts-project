/**
 * IPerson – Contract for all individuals at Hogwarts.
 * Defines the immutable identity (id, name) and the introduction behavior.
 */
export interface IPerson {
  readonly id: number;
  readonly name: string;
  introduce(): string;
}
