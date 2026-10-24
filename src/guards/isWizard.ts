import { Wizard } from "../domain/types";
import { isHouse } from "./isHouse";

/**
 * isWizard – strict type guard narrowing unknown to Wizard.
 * Checks every field: id (number), name (string), house (via isHouse),
 * level (number), active (boolean).
 */
export function isWizard(value: unknown): value is Wizard {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    isHouse(obj.house) &&
    typeof obj.level === "number" &&
    typeof obj.active === "boolean"
  );
}
