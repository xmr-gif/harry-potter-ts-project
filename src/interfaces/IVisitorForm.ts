/**
 * IVisitorForm – Ministry visitor registration form.
 *
 * Demonstrates:
 * 1. Interface Merging: Second declaration of `IVisitorForm` extends the base
 *    definition with new mandatory fields without modifying existing source.
 * 2. Interface Extending: `IExtendedVisitorForm` inherits from `IVisitorForm`
 *    using the `extends` keyword for specialized visitor tiers.
 */

// Initial Ministry visitor form definition (Year 1)
export interface IVisitorForm {
  visitorName: string;
  purposeOfVisit: string;
}

// Ministry mandate (Year 2): Declaration merging adds required badgeId without rewriting
export interface IVisitorForm {
  ministryBadgeId: string;
}

// Specialized VIP visitor form using interface inheritance (extends)
export interface IExtendedVisitorForm extends IVisitorForm {
  securityClearanceLevel: number;
  escortName: string;
}
