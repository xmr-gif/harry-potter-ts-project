/**
 * Phase 2 Demo – Sorting Ceremony and School Rules
 * Demonstrates: string enums, numeric enums with comparison, const enums,
 * Record type, bigint, unique symbol, binary notation.
 */

import { StudentStatus } from "../domain/enums/StudentStatus";
import { DangerLevel, isMoreDangerous } from "../domain/enums/DangerLevel";
import { OfficialSpell } from "../domain/enums/OfficialSpell";
import { houseColours, printHouseColour } from "../domain/constants/houseColours";
import { MinistryCaseNumber } from "../domain/types/MinistryCaseNumber";
import { magicalSignature, WithMagicalSignature } from "../domain/types/MagicalSignature";
import { WandAbility, hasAbility } from "../domain/types/WandAbility";
import { Wizard } from "../domain/types";

console.log("=== PHASE 2: SORTING CEREMONY AND SCHOOL RULES ===\n");

// --- 1. Student status enum ---
console.log("--- 1. Student Status (string enum) ---");
const status: StudentStatus = StudentStatus.Enrolled;
console.log(`Current status: ${status}`);
console.log(`All statuses: ${Object.values(StudentStatus).join(", ")}`);
// @ts-expect-error "transferred" is not a valid StudentStatus
const invalidStatus: StudentStatus = "transferred";

// --- 2. Danger levels with comparison ---
console.log("\n--- 2. Danger Level (numeric enum + comparison) ---");
const lumosDanger = DangerLevel.Harmless;
const avadaDanger = DangerLevel.Forbidden;
console.log(`Lumos danger: ${DangerLevel[lumosDanger]} (${lumosDanger})`);
console.log(`Avada Kedavra danger: ${DangerLevel[avadaDanger]} (${avadaDanger})`);
console.log(`Is Avada Kedavra more dangerous than Lumos? ${isMoreDangerous(avadaDanger, lumosDanger)}`);
console.log(`Is Lumos more dangerous than Avada Kedavra? ${isMoreDangerous(lumosDanger, avadaDanger)}`);

// --- 3. Official spell names ---
console.log("\n--- 3. Official Spell Names (string enum) ---");
const spell: OfficialSpell = OfficialSpell.ExpectoPatronum;
console.log(`Official spell: ${spell}`);
console.log(`All official spells: ${Object.values(OfficialSpell).join(", ")}`);
// @ts-expect-error "Sectumsempra" is not an official Ministry spell
const invalidSpell: OfficialSpell = "Sectumsempra";

// --- 4. House colours (Record) ---
console.log("\n--- 4. House Colours (Record<House, string>) ---");
console.log(printHouseColour("Gryffindor"));
console.log(printHouseColour("Slytherin"));
console.log(printHouseColour("Hufflepuff"));
console.log(printHouseColour("Ravenclaw"));
// @ts-expect-error "Durmstrang" is not one of the four mandatory houses
printHouseColour("Durmstrang");

// --- 5. Ministry case numbers (bigint) – precision demo ---
console.log("\n--- 5. Ministry Case Numbers (bigint vs Number) ---");
const caseNumber: MinistryCaseNumber = 9007199254740993n; // Number.MAX_SAFE_INTEGER + 2
const asNumber = Number(caseNumber);
console.log(`bigint value:  ${caseNumber}`);
console.log(`Number() value: ${asNumber}`);
console.log(`Precision lost: ${caseNumber.toString() !== asNumber.toString()}`);
console.log(`MAX_SAFE_INTEGER: ${Number.MAX_SAFE_INTEGER}`);

// --- 6. Hidden magical signature (unique symbol) ---
console.log("\n--- 6. Magical Signature (unique symbol) ---");
type StudentWithSignature = Wizard & WithMagicalSignature;

const harryWithSig: StudentWithSignature = {
  id: 1,
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
  [magicalSignature]: "HP-LIGHTNING-BOLT-001",
};
console.log(`JSON output (symbol hidden): ${JSON.stringify(harryWithSig)}`);
console.log(`Symbol value directly: ${harryWithSig[magicalSignature]}`);
console.log(`"magicalSignature" in harryWithSig (string key): ${"magicalSignature" in harryWithSig}`);

// --- 7. Wand ability flags (binary notation) ---
console.log("\n--- 7. Wand Ability Flags (binary notation) ---");
const elderWand = WandAbility.CAST | WandAbility.NONVERBAL | WandAbility.DARK_ARTS;
console.log(`Elder Wand flags: ${elderWand.toString(2).padStart(4, "0")} (${elderWand})`);
console.log(`  Can cast:      ${hasAbility(elderWand, WandAbility.CAST)}`);
console.log(`  Non-verbal:    ${hasAbility(elderWand, WandAbility.NONVERBAL)}`);
console.log(`  Wandless:      ${hasAbility(elderWand, WandAbility.WANDLESS)}`);
console.log(`  Dark arts:     ${hasAbility(elderWand, WandAbility.DARK_ARTS)}`);

console.log("\n=== PHASE 2 COMPLETE ===");
