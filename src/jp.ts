import { validateInteger } from './util.js';

type Quad = [string, string, string, string];

const CHAR = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const SMALL_POWER = ['', '十', '百', '千'];
const LARGE_POWER = ['', '万', '億', '兆', '京', '垓', '𥝱', '穣'];

/**
 * Convert integer into Japanese numerals.
 *
 * Input       | Output   | Note
 * -----------:|----------|:----
 * `0`         | `零`     |
 * `1`         | `一`     |
 * `10`        | `十`     |
 * `20`        | `二十`   |
 * `1,0000`    | `一万`   | *
 * `1000,0000` | `一千万` | **
 *
 * *Starting at 万, numbers begin with 一 if no digit would otherwise precede.
 * **If 千 directly precedes powers of 万 or above, 一 is prefixed before 千.
 * @see https://en.wikipedia.org/wiki/Japanese_numerals#Large_numbers
 */
export default function num2Jp(integer: number): string {
  validateInteger(integer);
  return iter(String(integer));
}

/**
 * Japanese numerals are grouped into myriads so we iterate in chunks of four,
 * or quads.
 */
function iter(digits: string, cumulativeQuadWords: string = '', index: number = 0): string {
  const [quad, remainingDigits] = split(digits);
  if (isAllZeroQuad(quad) && remainingDigits.length === 0) {
    if (index === 0)
      return '零';
    else
      return cumulativeQuadWords;
  }
  const newQuadWords = getQuadWords(quad);
  const newCumulativeQuadWords = accumQuadWords(newQuadWords, cumulativeQuadWords, index);
  const newIndex = index + 1;
  return iter(remainingDigits, newCumulativeQuadWords, newIndex);
}

function isAllZeroQuad(quad: Quad): boolean {
  if (quad[0] !== '0') return false;
  if (quad[1] !== '0') return false;
  if (quad[2] !== '0') return false;
  if (quad[3] !== '0') return false;
  return true;
}

/**
 * Split integer-string into two:
 *   - The first four digits, or quads, padded with zeroes if necessary.
 *   - The remaining digits, if any.
 *
 * Examples:
 *
 * Input       | Output
 * -----------:|-------------------:
 * `987654321` | `["98765", "4321"]`
 * `1`         | `["", "0001"]`
 */
function split(digits: string): [Quad, string] {
  const firstQuad = ('0000' + digits).slice(-4).split('') as Quad;
  const remainingDigits = digits.slice(0, -4);
  return [firstQuad, remainingDigits];
}

/**
 * Convert quad-digits into words.
 *
 * Quad   | Word
 * -------|-----------------
 * `4321` | "四千三百二十一"
 * `1321` | "千三百二十一"
 * `1121` | "千百二十一"
 * `1111` | "千百十一"
 * `1000` | "千"
 * `0001` | "一"
 * `0000` | ""
 */
function getQuadWords(quad: Quad): string {
  const [digit4, digit3, digit2, digit1] = quad;
  const word4 = getWord(digit4, 4);
  const word3 = getWord(digit3, 3);
  const word2 = getWord(digit2, 2);
  const word1 = getWord(digit1, 1);
  return `${word4}${word3}${word2}${word1}`;
}

function getWord(digit: string, place: number): string {
  const numDigit = Number(digit);
  if (place === 1) return CHAR[numDigit] as string;
  if (digit === '0') return '';
  if (digit === '1') return SMALL_POWER[place - 1] as string;
  return CHAR[numDigit] + (SMALL_POWER[place - 1] as string) ;
}

function accumQuadWords(newQuadWords: string, cumulativeQuadWords: string, index: number): string {
  const scaleWord = LARGE_POWER[index];
  if (scaleWord !== '' && newQuadWords === '千') {
    return '一' + newQuadWords + scaleWord + cumulativeQuadWords;
  } else {
    return newQuadWords + scaleWord + cumulativeQuadWords;
  }
}
