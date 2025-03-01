import toInteger from '../util/toInteger.js';
import { type Digit, toChunks } from '../util/chunkDigits.js';

type Triplet = [Digit, Digit, Digit];
type TeenDigit =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

const ONES = [
    '', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
    'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'
  ] as const;
const TENS = [
    '', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'
  ] as const;
const POWER = [
    '', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion',
    'nonillion'
  ] as const;

const defaultOptions = {
  hyphenate: true,
};

/**
 * Convert integer into an English number phrase.
 *
 * Input | Output
 * ------|-------------
 * `0`   | `zero`
 * `1`   | `one`
 * `11`  | `eleven`
 * `21`  | `twenty-one`
 */
export default function int2en(input: number | string, options = defaultOptions ): string {
  const integer = toInteger(input);
  const triplets = toChunks<Triplet>(integer, 3);
  const tripletPhrases = triplets.map(triplet => toTripletPhrase(triplet));
  return joinTripletPhrases(tripletPhrases);
}

/**
 * Convert triplet-digits to a place value phrase.
 *
 * Triplet | Phrase
 * --------|:--------------------------
 * `001`   | "one"
 * `011`   | "eleven"
 * `021`   | "twenty-one"
 * `301`   | "three hundred one"
 * `311`   | "three hundred eleven"
 * `321`   | "three hundred twenty-one"
 */
function toTripletPhrase(triplet: Triplet): string {
  const [digit3, digit2, digit1] = triplet;
  const phrase: string[] = [];
  if (digit3 !== 0) {
    phrase.push(`${ONES[digit3]} hundred`);
  }
  switch (digit2) {
    case 0:
      if (digit1 !== 0) {
        phrase.push(ONES[digit1]);
      }
      break;
    case 1:
      phrase.push(ONES[10 + digit1 as TeenDigit]);
      break;
    default:
      if (digit1 === 0) {
        phrase.push(TENS[digit2]);
      } else {
        phrase.push(`${TENS[digit2]}-${ONES[digit1]}`);
      }
      break;
  }
  return phrase.join(' ');
}

/**
 * Add power words to triplet phrases and join.
 *
 *  Input           | Output
 *  :---------------|:------------------
 * `["", "one"]`    | "one thousand"
 * `["one", "one"]` | "one thousand one"
 */
function joinTripletPhrases(phrases: string[]): string {
  const joinedPhrase: string[] = [];
  phrases.forEach((phrase, index) => {
    if (phrase === '') return;
    /**
     * The valid integer range is significantly smaller than the largest power
     * word.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const powerWord = POWER[index]!;
    const phraseWithPowerWord = (powerWord === '') ? phrase : `${phrase} ${powerWord}`;
    joinedPhrase.push(phraseWithPowerWord);
  });
  return joinedPhrase.reverse().join(' ') || 'zero';
}
