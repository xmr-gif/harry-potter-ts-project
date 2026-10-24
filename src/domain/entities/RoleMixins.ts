import { Student } from "./Student";
import { Prefect, QuidditchPlayer, QuidditchPosition } from "../types/Roles";
import { House } from "../types/House";

/**
 * Role Mixins / Intersections
 *
 * Pattern: Decorator / Composition via Intersection Types
 * WHY: In Hogwarts, roles combine freely without creating brittle, deep class hierarchies
 *      (e.g., PrefectQuidditchStudent vs QuidditchStudent vs Student).
 * HOW: Attaches behavioral role capabilities directly onto an existing Student instance,
 *      yielding type-safe intersections (Student & Prefect, Student & QuidditchPlayer).
 */

export function assignPrefectRole(
  student: Student & QuidditchPlayer,
  duties: readonly string[]
): Student & QuidditchPlayer & Prefect;
export function assignPrefectRole(
  student: Student,
  duties: readonly string[]
): Student & Prefect;
export function assignPrefectRole(
  student: Student,
  duties: readonly string[]
): Student & Prefect {
  const prefectMethods: Prefect = {
    duties,
    patrolCorridors(): string {
      return `Prefect ${student.name} is patrolling Hogwarts corridors until curfew.`;
    },
    deductPoints(house: House, points: number): string {
      return `Prefect ${student.name} deducted ${points} points from ${house}!`;
    },
  };

  return Object.assign(student, prefectMethods);
}

export function assignQuidditchRole(
  student: Student & Prefect,
  quidditchPosition: QuidditchPosition
): Student & Prefect & QuidditchPlayer;
export function assignQuidditchRole(
  student: Student,
  quidditchPosition: QuidditchPosition
): Student & QuidditchPlayer;
export function assignQuidditchRole(
  student: Student,
  quidditchPosition: QuidditchPosition
): Student & QuidditchPlayer {
  const quidditchMethods: QuidditchPlayer = {
    quidditchPosition,
    playMatch(): string {
      return `${student.name} takes flight as ${quidditchPosition} for ${student.house}!`;
    },
  };

  return Object.assign(student, quidditchMethods);
}
