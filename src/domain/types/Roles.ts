import { House } from "./House";

/**
 * StudentYear – Hogwarts students attend years 1 through 7.
 */
export type StudentYear = 1 | 2 | 3 | 4 | 5 | 6 | 7;

/**
 * QuidditchPosition – valid team positions on a Quidditch pitch.
 */
export type QuidditchPosition = "Seeker" | "Chaser" | "Beater" | "Keeper";

/**
 * QuidditchPlayer role – combines with Student via intersection.
 */
export interface QuidditchPlayer {
  readonly quidditchPosition: QuidditchPosition;
  playMatch(): string;
}

/**
 * Prefect role – students who maintain discipline and guide younger peers.
 */
export interface Prefect {
  readonly duties: readonly string[];
  patrolCorridors(): string;
  deductPoints(house: House, points: number): string;
}
