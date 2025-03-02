export class CoercionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CoercionError';
  }
}

export type Input = number | string;

export default function isValidInput(input: Input, throwError: boolean): boolean {
  const notValid = makeNotValid(throwError);

  if (typeof input === 'string') {
    if (input === '') return notValid('Expected a non-empty string.');
    if (isNaN(Number(input))) return notValid('Failed to extract number.');
    return isValidNumber(Number(input), notValid);
  }
  if (typeof input === 'number') {
    return isValidNumber(input, notValid);
  }
  return notValid('Expected a string or number.');
}

function isValidNumber(input: number, notValid: (message: string) => false): boolean {
  if (!Number.isInteger(input))
    return notValid('Expected an integer.');
  if (input < 0)
    return notValid('Expected a positive integer.');
  if (input > Number.MAX_SAFE_INTEGER)
    return notValid(`Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`);
  return true;
}

function makeNotValid(throwError: boolean) {
  return function notValid(message: string): false {
    const error = new CoercionError(message);
    if (throwError) {
      throw error;
    } else {
      console.error(error.toString());
      return false;
    }
  }
}
