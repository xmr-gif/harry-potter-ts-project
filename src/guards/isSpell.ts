import { Spell } from "../domain/types";

/**
 * isSpell – type guard narrowing unknown to Spell.
 */
export function isSpell(value: unknown): value is Spell {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const obj = value as Record<string, unknown>;
  return (
    typeof obj.id === "number" &&
    typeof obj.name === "string" &&
    typeof obj.category === "string" &&
    typeof obj.power === "number"
  );
}
