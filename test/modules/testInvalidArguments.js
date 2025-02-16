import { describe, expect, test } from 'vitest'

export function testInvalidArguments(func) {
  describe('invalid arguments', () => {
    test('non-integers', () => {
      expect(() => func(0.1)).toThrowError();
      expect(() => func('string')).toThrowError();
      expect(() => func(true)).toThrowError();
      expect(() => func({a: 1})).toThrowError();
    });

    test('out-of-range integers', () => {
      expect(() => func(-1)).toThrowError();
      expect(() => func(Number.MAX_SAFE_INTEGER + 1)).toThrowError();
    });
  });
}
