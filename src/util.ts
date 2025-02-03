class ArgumentError extends Error {
  constructor(message: string, options: object = {}) {
    super(`Invalid argument: ${message}`, options);
  }
}

export function validateInteger(integer: number): void {
  if (!Number.isInteger(integer))
    throw new ArgumentError('Expected an integer.', { cause: integer });
  if (integer < 0)
    throw new ArgumentError('Expected a positive integer.', { cause: integer });
}
