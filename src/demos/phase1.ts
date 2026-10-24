/**
 * Phase 1 Demo – Foundation
 * Demonstrates: Omit<Wizard,"id">, findByHouse type safety, discriminated union,
 * @ValidateSpellPower, @Cache, isHouse/isWizard type guards.
 */

import { NewWizard, SpellCastEvent, Spell, AcademyEvent } from "../domain/types";
import { WizardRepository } from "../repositories/WizardRepository";
import { SpellRepository } from "../repositories/SpellRepository";
import { SpellCalculator } from "../services/SpellCalculator";
import { handleSpellCast } from "../services/handleSpellCast";
import { isHouse, isWizard } from "../guards";

console.log("=== PHASE 1: FOUNDATION ===\n");

// --- 1. Register wizards (NewWizard = Omit<Wizard, "id">) ---
console.log("--- 1. Wizard Registration (Omit<Wizard, 'id'>) ---");
const repo = new WizardRepository();

const harry: NewWizard = {
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
};
const draco: NewWizard = {
  name: "Draco Malfoy",
  house: "Slytherin",
  level: 4,
  active: true,
};
const luna: NewWizard = {
  name: "Luna Lovegood",
  house: "Ravenclaw",
  level: 3,
  active: true,
};

const registeredHarry = repo.register(harry);
const registeredDraco = repo.register(draco);
const registeredLuna = repo.register(luna);

console.log("Registered:", registeredHarry);
console.log("Registered:", registeredDraco);
console.log("Registered:", registeredLuna);

// --- 2. findByHouse – type-safe house filtering ---
console.log("\n--- 2. findByHouse (Wizard['house'] restricts to House) ---");
const gryffindors = repo.findByHouse("Gryffindor");
console.log("Gryffindors:", gryffindors);

// @ts-expect-error "Durmstrang" is not a valid House
const invalid = repo.findByHouse("Durmstrang");

// --- 3. Discriminated union + Extract ---
console.log("\n--- 3. Discriminated Union (AcademyEvent) ---");
const spellEvent: SpellCastEvent = {
  type: "spell-cast",
  wizardId: 1,
  spellName: "Expelliarmus",
};
handleSpellCast(spellEvent);

const levelUpEvent: AcademyEvent = {
  type: "level-up",
  wizardId: 1,
  newLevel: 6,
};
// @ts-expect-error LevelUpEvent is not SpellCastEvent
handleSpellCast(levelUpEvent);

// --- 4. @ValidateSpellPower decorator ---
console.log("\n--- 4. @ValidateSpellPower Decorator ---");
const spellRepo = new SpellRepository();

const validSpell: Spell = { id: 1, name: "Lumos", category: "Charm", power: 50 };
console.log("Adding valid spell (power 50):");
spellRepo.add(validSpell);
console.log("  Added successfully:", validSpell);

console.log("Adding invalid spell (power -10):");
try {
  const invalidSpell: Spell = { id: 2, name: "Dark Hex", category: "Curse", power: -10 };
  spellRepo.add(invalidSpell);
} catch (error) {
  console.log("  Runtime error caught:", (error as Error).message);
}

// --- 5. @Cache decorator ---
console.log("\n--- 5. @Cache Decorator ---");
const calc = new SpellCalculator();
console.log("First call calculatePower(10, 3):");
const r1 = calc.calculatePower(10, 3);
console.log(`  Result: ${r1}`);

console.log("Second call calculatePower(10, 3) – should be cached:");
const r2 = calc.calculatePower(10, 3);
console.log(`  Result: ${r2}`);

console.log("Different args calculatePower(5, 2):");
const r3 = calc.calculatePower(5, 2);
console.log(`  Result: ${r3}`);

// --- 6. Type guards: isHouse and isWizard ---
console.log("\n--- 6. Type Guards ---");

const harryObj = { id: 1, name: "Harry Potter", house: "Gryffindor", level: 5, active: true };
console.log(`isWizard(harryObj): ${isWizard(harryObj)}`);

const viktorObj = { id: 99, name: "Viktor Krum", house: "Durmstrang", level: 7, active: true };
console.log(`isWizard(viktorObj): ${isWizard(viktorObj)}`);

console.log(`isHouse("Gryffindor"): ${isHouse("Gryffindor")}`);
console.log(`isHouse("Durmstrang"): ${isHouse("Durmstrang")}`);

console.log("\n=== PHASE 1 COMPLETE ===");
