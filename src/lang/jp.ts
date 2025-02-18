import handleInput from '../util/handleInput.js';
import { type Digit, toChunks } from '../util/chunkDigits.js';

type Quad = [Digit, Digit, Digit, Digit];
type Place = 1 | 2 | 3 | 4;
type PlaceIndex = 0 | 1 | 2 | 3;

const CHAR = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'] as const;
const SMALL_POWER = ['', '十', '百', '千'] as const;
const LARGE_POWER = ['', '万', '億', '兆', '京', '垓', '𥝱', '穣'] as const;

/**
 * Convert integer into a Japanese number phrase.
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
export default function num2Jp(input: number | string): string {
  const integer = handleInput(input);
  const quads = toChunks<Quad>(integer, 4);
  const quadPhrases = quads.map(quad => toQuadPhrase(quad));
  return joinQuadPhrases(quadPhrases);
}

/**
 * Convert quad-digits to a place value phrase.
 *
 * Quad   | Phrase
 * -------|-----------------
 * `0000` | ""
 * `0001` | "一"
 * `1000` | "千"
 * `1111` | "千百十一"
 * `1121` | "千百二十一"
 * `1321` | "千三百二十一"
 * `4321` | "四千三百二十一"
 */
function toQuadPhrase(quad: Quad): string {
  const [digit4, digit3, digit2, digit1] = quad;
  const word4 = toWord(digit4, 4);
  const word3 = toWord(digit3, 3);
  const word2 = toWord(digit2, 2);
  const word1 = toWord(digit1, 1);
  return `${word4}${word3}${word2}${word1}`;
}

function toWord(digit: Digit, place: Place): string {
  const placeIndex = place - 1 as PlaceIndex;
  if (placeIndex === 0) return CHAR[digit];
  if (digit === 0) return '';
  if (digit === 1) return SMALL_POWER[placeIndex];
  return CHAR[digit] + (SMALL_POWER[placeIndex]);
}

/**
 * Add power words to triplet phrases and join.
 *
 *  Input       | Output
 *  :-----------|:--------
 * `["一"]`     | "一"
 * `["", "一"]` | "一万"
 * `["", "千"]` | "一千万"
 */
function joinQuadPhrases(phrases: string[]): string {
  let joinedPhrase = '';
  phrases.forEach((phrase, index) => {
    /**
     * The valid integer range is significantly smaller than the largest power
     * word.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const powerWord = LARGE_POWER[index]!;
    if (powerWord !== '' && phrase === '千') {
      joinedPhrase = '一' + phrase + powerWord + joinedPhrase;
    } else {
      joinedPhrase = phrase + powerWord + joinedPhrase;
    }
  });
  return joinedPhrase || '零';
}
