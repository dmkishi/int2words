import { validateInteger } from '../util.js';

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
  const quadDigits = getQuadDigits(integer);
  const quadWords = quadDigits.map(quad => getQuadWords(quad));
  const word = combineQuadWords(quadWords);
  return word;
}

/**
 * Group integer into groups of four or quads starting from the least
 * significant digit, padded with zeroes if necessary.
 *
 * `54321` → `["4321", "0005"]`;
 */
function getQuadDigits(integer: number): Quad[] {
  const reversedDigits = String(integer).split('').reverse();
  let quads = [];
  for (let index = 0; ; index += 4) {
    const quad = reversedDigits.slice(index, index + 4).reverse();
    if (quad.length === 4) {
      quads.push(quad as Quad);
    } else {
      if (quad.length > 0) {
        const paddedQuad = `0000${quad.join('')}`.slice(-4).split('') as Quad;
        quads.push(paddedQuad);
      }
      break;
    }
  }
  return quads;
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
  return CHAR[numDigit] + (SMALL_POWER[place - 1] as string);
}

function combineQuadWords(quadWords: string[]): string {
  let word = '';
  quadWords.forEach((quadWord, index) => {
    const powerWord = LARGE_POWER[index];
    if (powerWord !== '' && quadWord === '千') {
      word = '一' + quadWord + powerWord + word;
    } else {
      word = quadWord + powerWord + word;
    }
  });
  return word || '零';
}
