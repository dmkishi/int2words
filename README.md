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

For legacy browsers:

Usage
--------------------------------------------------------------------------------
```js
import { int2en, int2jp } from 'int2words';
console.log(int2en(321)); // "three hundred twenty-one"
console.log(int2jp(321)); // "三百二十一"
```

For legacy browsers:

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
