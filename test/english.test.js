import { describe, expect, test } from 'vitest'
import testIsValidInput from './modules/testIsValidInput.js';
import testInputTypeCoercion from './modules/testInputTypeCoercion.js';
import { int2en } from '../src/index.js';

testIsValidInput(int2en);
testInputTypeCoercion(int2en);

describe('transforms', () => {
  test('ones through teens', () => {
    expect(int2en(0)).toBe('zero');
    expect(int2en(1)).toBe('one');
    expect(int2en(2)).toBe('two');
    expect(int2en(3)).toBe('three');
    expect(int2en(4)).toBe('four');
    expect(int2en(5)).toBe('five');
    expect(int2en(6)).toBe('six');
    expect(int2en(7)).toBe('seven');
    expect(int2en(8)).toBe('eight');
    expect(int2en(9)).toBe('nine');
    expect(int2en(10)).toBe('ten');
    expect(int2en(11)).toBe('eleven');
    expect(int2en(12)).toBe('twelve');
    expect(int2en(13)).toBe('thirteen');
    expect(int2en(14)).toBe('fourteen');
    expect(int2en(15)).toBe('fifteen');
    expect(int2en(16)).toBe('sixteen');
    expect(int2en(17)).toBe('seventeen');
    expect(int2en(18)).toBe('eighteen');
    expect(int2en(19)).toBe('nineteen');
  });

  test('tens', () => {
    expect(int2en(20)).toBe('twenty');
    expect(int2en(30)).toBe('thirty');
    expect(int2en(40)).toBe('forty');
    expect(int2en(50)).toBe('fifty');
    expect(int2en(60)).toBe('sixty');
    expect(int2en(70)).toBe('seventy');
    expect(int2en(80)).toBe('eighty');
    expect(int2en(90)).toBe('ninety');
  });

  test('intra-triplet compounds', () => {
    expect(int2en(21)).toBe('twenty-one');
    expect(int2en(100)).toBe('one hundred');
    expect(int2en(101)).toBe('one hundred one');
    expect(int2en(121)).toBe('one hundred twenty-one');
  });

  test('extra-triplet compounds', () => {
    expect(int2en(1_000)).toBe('one thousand');
    expect(int2en(1_001)).toBe('one thousand one');
    expect(int2en(1_000_000)).toBe('one million');
    expect(int2en(1_000_000_000)).toBe('one billion');
    expect(int2en(1_000_000_000_000)).toBe('one trillion');
    expect(int2en(1_000_000_000_000_000)).toBe('one quadrillion');
    expect(int2en(Number.MAX_SAFE_INTEGER)).toBe('nine quadrillion seven trillion one hundred ninety-nine billion two hundred fifty-four million seven hundred forty thousand nine hundred ninety-one');
  });
})
