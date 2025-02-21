import { describe, expect, test } from 'vitest'
import { testInvalidArguments } from './modules/testHandleInput.js';
import { int2jp } from '../src/index.js';

testInvalidArguments(int2jp);

describe('transforms', () => {
  test('single digits', () => {
    expect(int2jp(0)).toBe('零');
    expect(int2jp(1)).toBe('一');
    expect(int2jp(2)).toBe('二');
    expect(int2jp(3)).toBe('三');
    expect(int2jp(4)).toBe('四');
    expect(int2jp(5)).toBe('五');
    expect(int2jp(6)).toBe('六');
    expect(int2jp(7)).toBe('七');
    expect(int2jp(8)).toBe('八');
    expect(int2jp(9)).toBe('九');
  });

  test('compounds', () => {
    expect(int2jp(11)).toBe('十一');
    expect(int2jp(111)).toBe('百十一');
    expect(int2jp(1111)).toBe('千百十一');
  });

  test('smaller powers', () => {
    expect(int2jp(10)).toBe('十');
    expect(int2jp(20)).toBe('二十');
    expect(int2jp(100)).toBe('百');
    expect(int2jp(200)).toBe('二百');
    expect(int2jp(1000)).toBe('千');
    expect(int2jp(2000)).toBe('二千');
  });

  test('larger powers', () => {
    /**
     * Starting at a myriad (万), numbers begin with 一 if no digit would
     * otherwise precede. That is, 100 is just 百, and 1000 is just 千, but
     * 1,0000 is 一万.
     */
    expect(int2jp(1_0000)).toBe('一万');
    expect(int2jp(2_0000)).toBe('二万');

    /**
     * If 千 directly precedes the name of powers of myriad or above, 一 is
     * normally attached before 千, which yields 一千万. But if 千 does not
     * directly precede the name of powers of myriad (or above), attaching 一
     * is optional.
     */
    expect(int2jp(1000_0000)).toBe('一千万');
    expect(int2jp(1100_0000)).toBe('千百万');
  });
});
