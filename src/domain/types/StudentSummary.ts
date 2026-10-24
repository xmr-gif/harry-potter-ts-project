import { House } from "./House";
import { StudentYear } from "./Roles";

/**
 * StudentSummary – Safe public view of a student's record.
 * Omits private personal information like home address and medical notes.
 */
export interface StudentSummary {
  readonly id: number;
  readonly name: string;
  readonly house: House;
  readonly year: StudentYear;
}
