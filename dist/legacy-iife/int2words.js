/*! int2words v2.0.0 <github:dmkishi/int2words> */
var int2words = (function (exports) {
    'use strict';

    class CoercionError extends Error {
      constructor(message) {
        super(message);
        this.name = 'CoercionError';
      }
    }
    function isValidInput(input, throwError) {
      const notValid = makeNotValid(throwError);
      if (typeof input === 'string') {
        if (input === '') return notValid('Expected a non-empty string.');
        if (isNaN(Number(input))) return notValid('Failed to extract number.');
        return isValidNumber(Number(input), notValid);
      }
      if (typeof input === 'number') {
        return isValidNumber(input, notValid);
      }
      return notValid('Expected a string or number.');
    }
    function isValidNumber(input, notValid) {
      if (!Number.isInteger(input)) return notValid('Expected an integer.');
      if (input < 0) return notValid('Expected a positive integer.');
      if (input > Number.MAX_SAFE_INTEGER) return notValid(`Integers greater than ${Number.MAX_SAFE_INTEGER} not supported.`);
      return true;
    }
    function makeNotValid(throwError) {
      return function notValid(message) {
        const error = new CoercionError(message);
        if (throwError) {
          throw error;
        } else {
          console.error(error.toString());
          return false;
        }
      };
    }

    /**
     * Chunk integer into groups of digits of given length starting from the least
     * significant digit and padded with zeroes if necessary.
     *
     * Chunk `54321` into 4 → `[[4, 3, 2, 1], [0, 0, 0, 5]]`;
     */
    function toChunks(integer, targetLength) {
      const chunks = [];
      const reversedDigits = String(integer).split('').reverse();
      for (let index = 0;; index += targetLength) {
        const reversedChunk = reversedDigits.slice(index, index + targetLength);
        const chunk = reversedChunk.reverse();
        if (chunk.length === targetLength) {
          chunks.push(toChunkDigits(chunk));
        } else {
          if (chunk.length > 0) {
            const pad = Array(targetLength - chunk.length).fill('0');
            const paddedChunk = [...pad, ...chunk];
            chunks.push(toChunkDigits(paddedChunk));
          }
          break;
        }
      }
      return chunks;
    }
    /**
     * Convert `["1", "2", "3"]` → `[1, 2, 3]`.
     */
    function toChunkDigits(chunk) {
      return chunk.map(s => Number(s));
    }

    const CHAR = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const SMALL_POWER = ['', '十', '百', '千'];
    const LARGE_POWER = ['', '万', '億', '兆', '京', '垓', '𥝱', '穣'];
    const defaultOptions$1 = {
      throwError: false
    };
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
    function int2ja(input) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions$1;
      if (!isValidInput(input, options.throwError)) return '';
      const integer = Number(input);
      const quads = toChunks(integer, 4);
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
    function toQuadPhrase(quad) {
      const [digit4, digit3, digit2, digit1] = quad;
      const word4 = toWord(digit4, 4);
      const word3 = toWord(digit3, 3);
      const word2 = toWord(digit2, 2);
      const word1 = toWord(digit1, 1);
      return `${word4}${word3}${word2}${word1}`;
    }
    function toWord(digit, place) {
      const placeIndex = place - 1;
      if (placeIndex === 0) return CHAR[digit];
      if (digit === 0) return '';
      if (digit === 1) return SMALL_POWER[placeIndex];
      return CHAR[digit] + SMALL_POWER[placeIndex];
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
    function joinQuadPhrases(phrases) {
      let joinedPhrase = '';
      phrases.forEach((phrase, index) => {
        /**
         * The valid integer range is significantly smaller than the largest power
         * word.
         */
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const powerWord = LARGE_POWER[index];
        if (powerWord !== '' && phrase === '千') {
          joinedPhrase = '一' + phrase + powerWord + joinedPhrase;
        } else {
          joinedPhrase = phrase + powerWord + joinedPhrase;
        }
      });
      return joinedPhrase || '零';
    }

    const ONES = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
    const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    const POWER = ['', 'thousand', 'million', 'billion', 'trillion', 'quadrillion', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion'];
    const defaultOptions = {
      throwError: false};
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
    function int2en(input) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultOptions;
      if (!isValidInput(input, options.throwError)) return '';
      const integer = Number(input);
      const triplets = toChunks(integer, 3);
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
    function toTripletPhrase(triplet) {
      const [digit3, digit2, digit1] = triplet;
      const phrase = [];
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
          phrase.push(ONES[10 + digit1]);
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
    function joinTripletPhrases(phrases) {
      const joinedPhrase = [];
      phrases.forEach((phrase, index) => {
        if (phrase === '') return;
        /**
         * The valid integer range is significantly smaller than the largest power
         * word.
         */
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const powerWord = POWER[index];
        const phraseWithPowerWord = powerWord === '' ? phrase : `${phrase} ${powerWord}`;
        joinedPhrase.push(phraseWithPowerWord);
      });
      return joinedPhrase.reverse().join(' ') || 'zero';
    }

    exports.CoercionError = CoercionError;
    exports.int2en = int2en;
    exports.int2ja = int2ja;
    exports.int2jp = int2ja;

    return exports;

})({});
//# sourceMappingURL=int2words.js.map
