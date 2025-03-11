import { describe, expect, test } from 'vitest'

export default function testInputTypeCoercion(func) {
  describe('type coercion of inputs', () => {
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
}
