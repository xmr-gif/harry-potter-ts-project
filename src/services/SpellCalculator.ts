import { Cache } from "../decorators";

/**
 * SpellCalculator – pure computation service for spell power calculations.
 * Uses @Cache to memoize results per instance.
 */
export class SpellCalculator {
  @Cache
  calculatePower(base: number, multiplier: number): number {
    console.log(`  [Computing] ${base} * ${multiplier} = ${base * multiplier}`);
    return base * multiplier;
  }
}
