/**
 * Phase 3 Demo – People of Hogwarts
 * Demonstrates: Abstract class, parameter properties, protected/private/readonly,
 * override, interface declaration merging, interface extends, and role intersections.
 */

import { Person, Student, Professor, Ghost, assignPrefectRole, assignQuidditchRole } from "../domain/entities";
import { StudentYear } from "../domain/types";
import { IPerson, IVisitorForm, IExtendedVisitorForm } from "../interfaces";

console.log("=== PHASE 3: PEOPLE OF HOGWARTS ===\n");

// --- 1. Abstract Person & Real Kinds ---
console.log("--- 1. Real Kinds of People (Abstract Person Hierarchy) ---");

const harry = new Student(
  1,
  "Harry Potter",
  "Gryffindor",
  3,
  "4 Privet Drive, Little Whinging, Surrey",
  "Forehead scar flares occasionally; excellent overall health."
);

const snape = new Professor(2, "Severus Snape", "Potions", "Slytherin");
const lupin = new Professor(3, "Remus Lupin", "Defense Against the Dark Arts");
const nick = new Ghost(4, "Nearly Headless Nick", "Gryffindor Tower");

// Verify polymorphism: all fulfill the IPerson contract
const people: IPerson[] = [harry, snape, lupin, nick];
for (const person of people) {
  console.log(`[${person.constructor.name}] ${person.introduce()}`);
}

// Client requirement: "A generic 'person' cannot be created directly, only real kinds."
// Demonstrated at compile time:
// @ts-expect-error Cannot create an instance of an abstract class 'Person'
const compileCheckAbstract = () => new Person(999, "Nameless Phantom");

// Demonstrated at runtime via try/catch:
try {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const GenericPerson = Person as unknown as new (...args: any[]) => Person;
  new GenericPerson(999, "Nameless Phantom");
} catch (error) {
  console.log(`Runtime refusal for direct Person instantiation: ${(error as Error).message}`);
}

// Client requirement: "id that can never change" & "name that can never change"
const testPupil = new Student(99, "Test Pupil", "Ravenclaw", 2, "Diagon Alley", "Good");
// @ts-expect-error Cannot assign to 'id' because it is a read-only property
testPupil.id = 100;
// @ts-expect-error Cannot assign to 'name' because it is a read-only property
testPupil.name = "Renamed Pupil";

// Client requirement: Student year 1-7
// @ts-expect-error Year 8 does not exist at Hogwarts (StudentYear is 1 | 2 | 3 | 4 | 5 | 6 | 7)
const invalidYearStudent: StudentYear = 8;

// --- 2. Information Hiding & Encapsulation ---
console.log("\n--- 2. Information Hiding (Private Fields vs Public Summary) ---");
const publicSummary = harry.toSummary();
console.log("Public student summary visible to school:", publicSummary);

// Private fields compile errors:
// @ts-expect-error Property 'homeAddress' is private and only accessible within class 'Student'
const privateAddress = harry.homeAddress;

// @ts-expect-error Property 'healthNotes' is private and only accessible within class 'Student'
const privateNotes = harry.healthNotes;

console.log("Private fields verified: homeAddress and healthNotes refused at compile time.");

// --- 3. Role Combinations & Intersections ---
console.log("\n--- 3. Role Combinations (Free Mixins / Intersections) ---");

// Harry as a Quidditch Seeker
const seekerHarry = assignQuidditchRole(harry, "Seeker");
console.log(seekerHarry.playMatch());
console.log(`Still a student -> ${seekerHarry.introduce()}`);

// Hermione as a Student and Prefect
const hermione = new Student(
  6,
  "Hermione Granger",
  "Gryffindor",
  5,
  "Granger Residence, London",
  "Prefers library to infirmary; immaculate health."
);
const prefectHermione = assignPrefectRole(hermione, [
  "Monitor train compartments",
  "Lead first-years to dormitories",
  "Patrol library corridors after hours",
]);

console.log(prefectHermione.patrolCorridors());
console.log(prefectHermione.deductPoints("Slytherin", 5));
console.log("Prefect can do everything a student can:");
console.log("  - Public summary:", prefectHermione.toSummary());
console.log(`  - Introduction:   ${prefectHermione.introduce()}`);

// Cedric Diggory: Student + Quidditch Player (Seeker) + Prefect
const cedric = new Student(
  7,
  "Cedric Diggory",
  "Hufflepuff",
  6,
  "Diggory Manor, Ottery St Catchpole",
  "Peak physical condition."
);
const quidditchCedric = assignQuidditchRole(cedric, "Seeker");
const multiRoleCedric = assignPrefectRole(quidditchCedric, ["Patrol Hufflepuff common room"]);

console.log("\nMulti-role student (Student & QuidditchPlayer & Prefect):");
console.log(`  Quidditch action: ${multiRoleCedric.playMatch()}`);
console.log(`  Prefect action:   ${multiRoleCedric.patrolCorridors()}`);
console.log(`  Student action:   ${multiRoleCedric.introduce()}`);

// --- 4. Visitor Forms: Declaration Merging & Interface Extending ---
console.log("\n--- 4. Ministry Visitor Forms (Declaration Merging & Extending) ---");

// Declaration merging: IVisitorForm requires fields from BOTH declarations
const regularVisitor: IVisitorForm = {
  visitorName: "Amos Diggory",
  purposeOfVisit: "Consultation regarding Triwizard preparations",
  ministryBadgeId: "MIN-VIS-1994-0821",
};
console.log("Standard Ministry Visitor Form (with merged fields):", regularVisitor);

// @ts-expect-error Property 'ministryBadgeId' is missing from merged interface
const incompleteVisitor: IVisitorForm = {
  visitorName: "Cornelius Fudge",
  purposeOfVisit: "Official inspection",
};

// Interface extending: IExtendedVisitorForm inherits all fields from IVisitorForm and adds new ones
const vipVisitor: IExtendedVisitorForm = {
  visitorName: "Cornelius Fudge",
  purposeOfVisit: "High security ministerial inspection",
  ministryBadgeId: "MIN-MINISTER-001",
  securityClearanceLevel: 10,
  escortName: "Kingsley Shacklebolt",
};
console.log("VIP Visitor Form (extended interface):", vipVisitor);

console.log("\n=== PHASE 3 COMPLETE ===");
