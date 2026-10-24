/**
 * magicalSignature – a unique Symbol used as a hidden property key.
 * Symbols don't appear in JSON.stringify output and can never collide
 * with ordinary string-keyed fields.
 */
export const magicalSignature: unique symbol = Symbol("magicalSignature");

/**
 * WithMagicalSignature – intersection adding a hidden signature field.
 */
export interface WithMagicalSignature {
  [magicalSignature]: string;
}
