# numToWords

Converts integers to words, with several flavors.

Supports integers from 0 to 999,999,999,999,999,999,999,999,999,999,999, or to the [short scale](https://en.wikipedia.org/wiki/Long_and_short_scales) of nonillion (10<sup>30</sup>).

Modified from <http://stackoverflow.com/questions/14766951/convert-digits-into-words-with-javascript>.

## Flavors
- **numToWords**
  - Usage:
    ```javascript
    var words = numToWords(123);
    console.log(words); // "one hundred twenty-three"
    ```
- **makeNumStrToWordsHP** (High Performance)
  - You don't need this, just use `numToWords()`.
  - Details:
    - Returns a closure function, relieving the need to redeclare functions and variables every time a function call is made.
    - Further performance tweaks rely on the argument number pre-converted to a string.
    - No error checking.
  - Usage:
    ```javascript
    var numToWordsHP = makeNumToWordsHP();
    var words = numToWordsHP('123'); // NOTE: Argument is quoted.
    console.log(words); // "one hundred twenty-three"
    ```
- **numToWordsJP** and **makeNumStrToWordsHPJP**
  - Same as above but returns in Japanese.
  - Usage:
    ```javascript
    console.log(numToWordsJP(123)); // "百二十三"
    ```
