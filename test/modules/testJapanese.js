import { describe, expect, test } from 'vitest'
import testInputTypeCoercion from './util/testInputTypeCoercion';
import testIsValidInput from './util/testIsValidInput';

export default function testJapanese(func) {
  testInputTypeCoercion(func);
  testIsValidInput(func);

  describe('transforms', () => {
    test('single digits', () => {
      expect(func(0)).toBe('零');
      expect(func(1)).toBe('一');
      expect(func(2)).toBe('二');
      expect(func(3)).toBe('三');
      expect(func(4)).toBe('四');
      expect(func(5)).toBe('五');
      expect(func(6)).toBe('六');
      expect(func(7)).toBe('七');
      expect(func(8)).toBe('八');
      expect(func(9)).toBe('九');
    });

    test('compounds', () => {
      expect(func(11)).toBe('十一');
      expect(func(111)).toBe('百十一');
      expect(func(1111)).toBe('千百十一');
    });

    test('smaller powers', () => {
      expect(func(10)).toBe('十');
      expect(func(20)).toBe('二十');
      expect(func(100)).toBe('百');
      expect(func(200)).toBe('二百');
      expect(func(1000)).toBe('千');
      expect(func(2000)).toBe('二千');
    });

    test('larger powers', () => {
      /**
       * Starting at a myriad (万), numbers begin with 一 if no digit would
       * otherwise precede. That is, 100 is just 百, and 1000 is just 千, but
       * 1,0000 is 一万.
       */
      expect(func(1_0000)).toBe('一万');
      expect(func(2_0000)).toBe('二万');

      /**
       * If 千 directly precedes the name of powers of myriad or above, 一 is
       * normally attached before 千, which yields 一千万. But if 千 does not
       * directly precede the name of powers of myriad (or above), attaching 一
       * is optional.
       */
      expect(func(1000_0000)).toBe('一千万');
      expect(func(1100_0000)).toBe('千百万');
    });
  });
}
