export function validateInteger(integer: number): void {
  if (!Number.isInteger(integer))
    throw new Error('Invalid argument: expected an integer.');
  if (integer < 0)
    throw new Error('Invalid argument: expected a positive integer.');
}
