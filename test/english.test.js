import { describe, expect, test } from 'vitest'
import { testInvalidArguments } from './modules/testHandleInput.js';
import { num2En } from '../src/index.js';

testInvalidArguments(num2En);

describe('transforms', () => {
  test('ones through teens', () => {
    expect(num2En(0)).toBe('zero');
    expect(num2En(1)).toBe('one');
    expect(num2En(2)).toBe('two');
    expect(num2En(3)).toBe('three');
    expect(num2En(4)).toBe('four');
    expect(num2En(5)).toBe('five');
    expect(num2En(6)).toBe('six');
    expect(num2En(7)).toBe('seven');
    expect(num2En(8)).toBe('eight');
    expect(num2En(9)).toBe('nine');
    expect(num2En(10)).toBe('ten');
    expect(num2En(11)).toBe('eleven');
    expect(num2En(12)).toBe('twelve');
    expect(num2En(13)).toBe('thirteen');
    expect(num2En(14)).toBe('fourteen');
    expect(num2En(15)).toBe('fifteen');
    expect(num2En(16)).toBe('sixteen');
    expect(num2En(17)).toBe('seventeen');
    expect(num2En(18)).toBe('eighteen');
    expect(num2En(19)).toBe('nineteen');
  });

  test('tens', () => {
    expect(num2En(20)).toBe('twenty');
    expect(num2En(30)).toBe('thirty');
    expect(num2En(40)).toBe('forty');
    expect(num2En(50)).toBe('fifty');
    expect(num2En(60)).toBe('sixty');
    expect(num2En(70)).toBe('seventy');
    expect(num2En(80)).toBe('eighty');
    expect(num2En(90)).toBe('ninety');
  });

  test('intra-triplet compounds', () => {
    expect(num2En(21)).toBe('twenty-one');
    expect(num2En(100)).toBe('one hundred');
    expect(num2En(101)).toBe('one hundred one');
    expect(num2En(121)).toBe('one hundred twenty-one');
  });

  test('extra-triplet compounds', () => {
    expect(num2En(1_000)).toBe('one thousand');
    expect(num2En(1_001)).toBe('one thousand one');
    expect(num2En(1_000_000)).toBe('one million');
    expect(num2En(1_000_000_000)).toBe('one billion');
    expect(num2En(1_000_000_000_000)).toBe('one trillion');
    expect(num2En(1_000_000_000_000_000)).toBe('one quadrillion');
    expect(num2En(Number.MAX_SAFE_INTEGER)).toBe('nine quadrillion seven trillion one hundred ninety-nine billion two hundred fifty-four million seven hundred forty thousand nine hundred ninety-one');
  });
})
