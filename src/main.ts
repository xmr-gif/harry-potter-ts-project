/**
 * main.ts – Entry point for the Hogwarts Registry.
 * Composes domain models, entities, and services across Phases 1 to 3.
 */

import { WizardRepository, SpellRepository } from "./repositories";
import { SpellCalculator, handleSpellCast } from "./services";
import { isHouse, isWizard } from "./guards";
import { StudentStatus, DangerLevel, OfficialSpell } from "./domain/enums";
import { houseColours, printHouseColour } from "./domain/constants";
import { WandAbility, hasAbility, magicalSignature } from "./domain/types";
import { Student, Professor, Ghost, assignPrefectRole, assignQuidditchRole } from "./domain/entities";
import { IVisitorForm } from "./interfaces";

console.log("=================================================");
console.log("       HOGWARTS REGISTRY SYSTEM (Phases 1-3)      ");
console.log("=================================================\n");

// --- PHASE 1: Wizard & Spell Registry ---
console.log(">>> [PHASE 1: FOUNDATION & REGISTRY]");
const wizardRepo = new WizardRepository();
const harry = wizardRepo.register({
  name: "Harry Potter",
  house: "Gryffindor",
  level: 5,
  active: true,
});
console.log(`Registered wizard: #${harry.id} ${harry.name} (${harry.house})`);

const spellRepo = new SpellRepository();
spellRepo.add({ id: 1, name: "Expelliarmus", category: "Charm", power: 60 });
console.log(`Added official spell to repository: Expelliarmus (Power: 60)`);

const calc = new SpellCalculator();
console.log(`Spell Power Calculation:`);
calc.calculatePower(15, 2);
calc.calculatePower(15, 2); // Cached

handleSpellCast({ type: "spell-cast", wizardId: harry.id, spellName: "Expelliarmus" });

// --- PHASE 2: Ceremony & School Rules ---
console.log("\n>>> [PHASE 2: CEREMONY RULES & SYSTEM STANDARDS]");
console.log(`Sorting status: ${StudentStatus.Enrolled}`);
console.log(`Official spell test: ${OfficialSpell.Expelliarmus}`);
console.log(`House colours check: ${printHouseColour("Gryffindor")}`);
const wand = WandAbility.CAST | WandAbility.NONVERBAL;
console.log(`Wand can cast spells non-verbally: ${hasAbility(wand, WandAbility.NONVERBAL)}`);

// --- PHASE 3: People of Hogwarts ---
console.log("\n>>> [PHASE 3: PEOPLE OF HOGWARTS HIERARCHY]");
const studentHarry = new Student(
  harry.id,
  harry.name,
  harry.house,
  3,
  "4 Privet Drive, Little Whinging, Surrey",
  "Forehead scar flares occasionally."
);
const mcgonagall = new Professor(10, "Minerva McGonagall", "Transfiguration", "Gryffindor");
const baron = new Ghost(11, "Bloody Baron", "Slytherin Dungeons");

console.log(studentHarry.introduce());
console.log(mcgonagall.introduce());
console.log(baron.introduce());

// Privacy summary
console.log("Student public record:", studentHarry.toSummary());

// Role combination
const seekerStudent = assignQuidditchRole(studentHarry, "Seeker");
console.log(seekerStudent.playMatch());

// Visitor form with declaration merging
const visitor: IVisitorForm = {
  visitorName: "Arthur Weasley",
  purposeOfVisit: "Misuse of Muggle Artefacts Inquiry",
  ministryBadgeId: "MIN-HQ-1049",
};
console.log(`Ministry visitor registered: ${visitor.visitorName} [${visitor.ministryBadgeId}]`);

console.log("\n=================================================");
console.log("       ALL PHASES 1-3 RUNNING SUCCESSFULLY       ");
console.log("=================================================");
