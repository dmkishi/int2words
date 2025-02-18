import { describe, expect, test } from 'vitest'
import { testInvalidArguments } from './modules/testInvalidArguments.js';
import num2Jp from '../src/lang/japanese.js';

testInvalidArguments(num2Jp);

describe('transforms', () => {
  test('single digits', () => {
    expect(num2Jp(0)).toBe('零');
    expect(num2Jp(1)).toBe('一');
    expect(num2Jp(2)).toBe('二');
    expect(num2Jp(3)).toBe('三');
    expect(num2Jp(4)).toBe('四');
    expect(num2Jp(5)).toBe('五');
    expect(num2Jp(6)).toBe('六');
    expect(num2Jp(7)).toBe('七');
    expect(num2Jp(8)).toBe('八');
    expect(num2Jp(9)).toBe('九');
  });

  test('compounds', () => {
    expect(num2Jp(11)).toBe('十一');
    expect(num2Jp(111)).toBe('百十一');
    expect(num2Jp(1111)).toBe('千百十一');
  });

  test('smaller powers', () => {
    expect(num2Jp(10)).toBe('十');
    expect(num2Jp(20)).toBe('二十');
    expect(num2Jp(100)).toBe('百');
    expect(num2Jp(200)).toBe('二百');
    expect(num2Jp(1000)).toBe('千');
    expect(num2Jp(2000)).toBe('二千');
  });

  test('larger powers', () => {
    /**
     * Starting at a myriad (万), numbers begin with 一 if no digit would
     * otherwise precede. That is, 100 is just 百, and 1000 is just 千, but
     * 1,0000 is 一万.
     */
    expect(num2Jp(1_0000)).toBe('一万');
    expect(num2Jp(2_0000)).toBe('二万');

    /**
     * If 千 directly precedes the name of powers of myriad or above, 一 is
     * normally attached before 千, which yields 一千万. But if 千 does not
     * directly precede the name of powers of myriad (or above), attaching 一
     * is optional.
     */
    expect(num2Jp(1000_0000)).toBe('一千万');
    expect(num2Jp(1100_0000)).toBe('千百万');
  });
});
