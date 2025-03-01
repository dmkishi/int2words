export class CoercionError extends Error {
  constructor(message: string, options: object = {}) {
    super(message, options);
    this.name = 'CoercionError';
  }
}

/**
 * Conservatively coerce number or string to integer.
 *
 * @see `PROCESS.md` regarding logic of coercion.
 */
export default function toInteger(input: number | string): number {
  if (typeof input === 'number') {
    return coerceNumber(input);
  }
  if (typeof input === 'string') {
    return coerceNumber(coerceString(input));
  }
  throw new CoercionError(
    'Expected a string or number.',
    { cause: input }
  );
}

function coerceString(string: string): number {
  if (string === '') {
    throw new CoercionError(
      'Expected a non-empty string.',
      { cause: string }
    );
  }
  const number = Number(string);
  if (isNaN(number)) {
    throw new CoercionError(
      'Failed to extract number.',
      { cause: number }
    );
  }
  return number;
}

function coerceNumber(number: number): number {
  /**
   * Reject:
   * - floats (unless representable as an integer, e.g. `1.0`)
   * - `NaN`, `Infinity` and `-Infinity`
   */
  if (!Number.isInteger(number)) {
    throw new CoercionError(
      'Expected an integer.',
      { cause: number }
    );
  }
  if (number < 0) {
    throw new CoercionError(
      'Expected a positive integer.',
      { cause: number }
    );
  }
  if (number > Number.MAX_SAFE_INTEGER) {
    throw new CoercionError(
      `Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`,
      { cause: number }
    );
  }
  return number;
}
