import { House } from "../types";

/**
 * validHouses – readonly tuple of all valid Hogwarts houses.
 * Used by the isHouse type guard to validate at runtime.
 */
export const validHouses: readonly House[] = [
  "Gryffindor",
  "Slytherin",
  "Hufflepuff",
  "Ravenclaw",
] as const;
