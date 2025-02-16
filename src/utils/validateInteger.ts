/**
 * Largest integer in a 64-bit (double-precision) floating-point number without
 * a loss of precision, i.e. largest whole number.
 *
 * Input         | Output
 * --------------|-------------------
 * `2 ** 53 - 1` | `9007199254740991`
 * `2 ** 53`     | `9007199254740992`
 * `2 ** 53 + 1` | `9007199254740992`
 *
 * @see https://stackoverflow.com/questions/1848700/biggest-integer-that-can-be-stored-in-a-double
 */
class ArgumentError extends Error {
  constructor(message: string, options: object = {}) {
    super(`Invalid argument: ${message}`, options);
  }
}

export default function validateInteger(integer: number): void {
  if (!Number.isInteger(integer))
    throw new ArgumentError('Expected an integer.', { cause: integer });
  if (integer < 0)
    throw new ArgumentError('Expected a positive integer.', { cause: integer });
  if (integer > Number.MAX_SAFE_INTEGER)
    throw new ArgumentError(
      `Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`,
      { cause: integer }
    );
}
