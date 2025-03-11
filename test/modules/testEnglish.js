import { describe, expect, test } from 'vitest';
import testInputTypeCoercion from './util/testInputTypeCoercion';
import testIsValidInput from './util/testIsValidInput';

export default function testEnglish(func) {
  testInputTypeCoercion(func);
  testIsValidInput(func);

  describe('transforms', () => {
    test('ones through teens', () => {
      expect(func(0)).toBe('zero');
      expect(func(1)).toBe('one');
      expect(func(2)).toBe('two');
      expect(func(3)).toBe('three');
      expect(func(4)).toBe('four');
      expect(func(5)).toBe('five');
      expect(func(6)).toBe('six');
      expect(func(7)).toBe('seven');
      expect(func(8)).toBe('eight');
      expect(func(9)).toBe('nine');
      expect(func(10)).toBe('ten');
      expect(func(11)).toBe('eleven');
      expect(func(12)).toBe('twelve');
      expect(func(13)).toBe('thirteen');
      expect(func(14)).toBe('fourteen');
      expect(func(15)).toBe('fifteen');
      expect(func(16)).toBe('sixteen');
      expect(func(17)).toBe('seventeen');
      expect(func(18)).toBe('eighteen');
      expect(func(19)).toBe('nineteen');
    });

    test('tens', () => {
      expect(func(20)).toBe('twenty');
      expect(func(30)).toBe('thirty');
      expect(func(40)).toBe('forty');
      expect(func(50)).toBe('fifty');
      expect(func(60)).toBe('sixty');
      expect(func(70)).toBe('seventy');
      expect(func(80)).toBe('eighty');
      expect(func(90)).toBe('ninety');
    });

    test('intra-triplet compounds', () => {
      expect(func(21)).toBe('twenty-one');
      expect(func(100)).toBe('one hundred');
      expect(func(101)).toBe('one hundred one');
      expect(func(121)).toBe('one hundred twenty-one');
    });

    test('extra-triplet compounds', () => {
      expect(func(1_000)).toBe('one thousand');
      expect(func(1_001)).toBe('one thousand one');
      expect(func(1_000_000)).toBe('one million');
      expect(func(1_000_000_000)).toBe('one billion');
      expect(func(1_000_000_000_000)).toBe('one trillion');
      expect(func(1_000_000_000_000_000)).toBe('one quadrillion');
      expect(func(Number.MAX_SAFE_INTEGER)).toBe('nine quadrillion seven trillion one hundred ninety-nine billion two hundred fifty-four million seven hundred forty thousand nine hundred ninety-one');
    });
  });
}
