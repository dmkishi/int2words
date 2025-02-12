import validateInteger from '../utils/validateInteger.js';
import { type Digit, toChunks } from '../utils/integer.js';

type Triplet = [Digit, Digit, Digit];
type TeenDigit =
  0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 |
  11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19;

const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'] as const;
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'] as const;
const POWER = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'] as const;

export default function num2En(integer: number): string {
  validateInteger(integer);
  const triplets = toChunks<Triplet>(integer, 3);
  const tripletWords = triplets.map(tripletDigits => toTripletWords(tripletDigits));
  return joinTripletWords(tripletWords);
}

/**
 * Convert triplet-digits to words.
 *
 * Triplet | Word
 * --------|:--------------------------
 * `001`   | "one"
 * `011`   | "eleven"
 * `021`   | "twenty-one"
 * `301`   | "three hundred one"
 * `311`   | "three hundred eleven"
 * `321`   | "three hundred twenty-one"
 */
function toTripletWords(triplet: Triplet): string {
  const [digit3, digit2, digit1] = triplet;
  const words: string[] = [];
  if (digit3 !== 0) {
    words.push(`${ONES[digit3]} hundred`);
  }
  switch (digit2) {
    case 0:
      if (digit1 !== 0) {
        words.push(ONES[digit1]);
      }
      break;
    case 1:
      words.push(ONES[10 + digit1 as TeenDigit]);
      break;
    default:
      if (digit1 === 0) {
        words.push(TENS[digit2]);
      } else {
        words.push(`${TENS[digit2]}-${ONES[digit1]}`);
      }
      break;
  }
  return words.join(' ');
}

/**
 * Add power words to triplet words and join.
 *
 *  Input           | Output
 *  :---------------|:------------------
 * `["", "one"]`    | "one thousand"
 * `["one", "one"]` | "one thousand one"
 */
function joinTripletWords(tripletWords: string[]): string {
  const words: string[] = [];
  tripletWords.forEach((tripletWords, index) => {
    if (tripletWords === '') return;
    /**
     * The valid integer range is significantly smaller than the largest power
     * word.
     */
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const powerWord = POWER[index]!;
    const phrase = (powerWord === '') ? tripletWords : `${tripletWords} ${powerWord}`;
    words.push(phrase);
  });
  return words.reverse().join(' ') || 'zero';
}
