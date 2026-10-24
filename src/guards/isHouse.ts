import { House } from "../domain/types";
import { validHouses } from "../domain/constants";

/**
 * isHouse – strict type guard narrowing unknown to House.
 */
export function isHouse(value: unknown): value is House {
  return (
    typeof value === "string" &&
    (validHouses as readonly string[]).includes(value)
  );
}
