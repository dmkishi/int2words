import { describe, expect, test } from 'vitest'

export function testInvalidArguments(func) {
  describe('coercion of inputs', () => {
    test('other numbers', () => {
      expect(() => func(1.0)).not.toThrowError();
      expect(() => func(1e2)).not.toThrowError();
      expect(() => func(0b10)).not.toThrowError();
      expect(() => func(0o10)).not.toThrowError();
      expect(() => func(0x10)).not.toThrowError();
    });

    test('strings', () => {
      expect(() => func('0')).not.toThrowError();
      expect(() => func('1')).not.toThrowError();
      expect(() => func('1.0')).not.toThrowError();
      expect(() => func('1e2')).not.toThrowError();
      expect(() => func('0b10')).not.toThrowError();
      expect(() => func('0o10')).not.toThrowError();
      expect(() => func('0x10')).not.toThrowError();
    });
  });

  describe('invalid inputs', () => {
    test('non-numbers', () => {
      expect(() => func(1n)).toThrowError();
      expect(() => func('')).toThrowError();
      expect(() => func('non-empty string')).toThrowError();
      expect(() => func('1,000')).toThrowError();
      expect(() => func('1n')).toThrowError();
      expect(() => func('1e-1')).toThrowError();
      expect(() => func(true)).toThrowError();
      expect(() => func({a: 1})).toThrowError();
    });

    test('non-integers', () => {
      expect(() => func(0.1)).toThrowError();
      expect(() => func(1e-1)).toThrowError();
      expect(() => func(Infinity)).toThrowError();
      expect(() => func(-Infinity)).toThrowError();
      expect(() => func(NaN)).toThrowError();
    });

    test('out-of-range integers', () => {
      expect(() => func(-1)).toThrowError();
      expect(() => func(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
    });
  });
}
