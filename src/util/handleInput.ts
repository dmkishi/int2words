export class ArgumentError extends Error {
  constructor(message: string, options: object = {}) {
    super(`Invalid argument: ${message}`, options);
  }
}

/**
 * @see `DOCS/process.md`
 */
export default function handleInput(input: number | string): number {
  if (typeof input === 'number') {
    return coerceNumber(input);
  }
  if (typeof input === 'string') {
    return coerceNumber(coerceString(input));
  }
  throw new ArgumentError(
    'Expected a string or number.',
    { cause: input }
  );
}

function coerceString(string: string): number {
  if (string === '') {
    throw new ArgumentError(
      'Expected a non-empty string.',
      { cause: string }
    );
  }
  const number = Number(string);
  if (isNaN(number)) {
    throw new ArgumentError(
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
    throw new ArgumentError(
      'Expected an integer.',
      { cause: number }
    );
  }
  if (number < 0) {
    throw new ArgumentError(
      'Expected a positive integer.',
      { cause: number }
    );
  }
  if (number > Number.MAX_SAFE_INTEGER) {
    throw new ArgumentError(
      `Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`,
      { cause: number }
    );
  }
  return number;
}
