import { House } from "../types";

/**
 * houseColours – maps every house to a hex colour code.
 * Record<House, string> ensures all four houses are mandatory.
 */
export const houseColours: Record<House, string> = {
  Gryffindor: "#740001",
  Slytherin: "#1A472A",
  Hufflepuff: "#FFD800",
  Ravenclaw: "#0E1A40",
};

/**
 * Print a house's colour as a formatted hex string.
 */
export function printHouseColour(house: House): string {
  const hex = houseColours[house];
  return `${house}: ${hex}`;
}
