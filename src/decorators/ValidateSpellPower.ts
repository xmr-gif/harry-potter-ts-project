import { Spell } from "../domain/types";

/**
 * @ValidateSpellPower – method decorator that validates spell power >= 0.
 *
 * Pattern: Decorator (structural)
 * WHY: Cross-cutting validation concern separated from business logic.
 * HOW: Wraps the original method, inspects args[0] as unknown, type-guards
 *      for a Spell-shaped object, and throws before the original runs if invalid.
 */
export function ValidateSpellPower(
  target: object,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor
): void {
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (...args: unknown[]) {
    const spell: unknown = args[0];

    // Type guard: verify spell is an object with a numeric `power` field
    if (
      typeof spell === "object" &&
      spell !== null &&
      "power" in spell &&
      typeof (spell as Record<string, unknown>).power === "number"
    ) {
      const power = (spell as Record<string, unknown>).power as number;
      if (power < 0) {
        throw new Error(
          `Invalid spell power: ${power}. Power must be >= 0.`
        );
      }
    }

    return originalMethod.apply(this, args);
  };
}
