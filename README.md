int2words
================================================================================
Convert integers into words.

**Features and limitations**:
- **Languages**: English and Japanese.
- **Integer range**: 0 → 2<sup>53</sup>–1.
  - While 64-bit floating-point numbers technically support numbers up to approximately 1.8 × 10<sup>308</sup>, there is a significant loss of precision. 2<sup>53</sup>–1 is the largest integer with no loss of precision.

[View example](https://dmkishi.github.io/int2words/).

Install
--------------------------------------------------------------------------------
```sh
npm install int2words
```

Usage
--------------------------------------------------------------------------------
```js
import { int2en, int2ja } from 'int2words';

console.log(int2en(321)); // "three hundred twenty-one"
console.log(int2ja(321)); // "三百二十一"
console.log(int2en(-1)) // Invalid input: ""

/**
 * Optionally throw an error.
 */
try {
  int2en(-1, { throwError: true })
} catch (error) {
  if (error instanceof CoercionError) {
    console.error(error); // "CoercionError: Expected a positive integer."
  }
  throw error;
}
```

No Bundler Install and Usage
--------------------------------------------------------------------------------
To use in browsers directly and without bundlers.

1. Save [`int2words.min.js`](https://github.com/dmkishi/int2words/blob/master/dist/legacy-iife/int2words.min.js) to your project.
2. Add `<script src="int2words.min.js">` in your HTML file.
3. The library is now available globally through the `int2words` object.

```js
console.log(int2words.int2en(321)); // "three hundred twenty-one"
```

Changelog
--------------------------------------------------------------------------------
### v2.0.0 (2025-)
Change name and modernize.

### v1.2.7 (2016-5-4)

Acknowledgments
--------------------------------------------------------------------------------
- Originally a modification from <http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript>.

License
--------------------------------------------------------------------------------
This project is licensed under the [GNU General Public License (GPL)](LICENSE).
