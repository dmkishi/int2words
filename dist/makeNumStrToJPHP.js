// numToWords v1.0.0 (2016-05-02T18:52:44.531Z)
function makeNumStrToJPHP() {
  var DIGITS = ['','一','二','三','四','五','六','七','八','九'];
  var SCALE = ['','万','億','兆','京','垓','𥝱','穣'];


  // Return string of first four digits or quads, padded with zeros if needed.
  // Ex. "4321" → "321"
  //       "21" → "021"
  function getFirstQuad(str) {
    return ('0000' + str).substr(-4);
  }

  // Return string of digits with first four digits or quads removed.
  // Ex. "7654321" → "7654"
  function getRemainingQuads(str) {
    return str.substr(0, str.length - 4);
  }

  // Return a quad as words.
  // Ex. 1123     → "千百二十三"
  //     12345    → "一万二千三百四十五"
  //     1000000  → "百万"
  //     10000000 → "一千万""
  //     11000000 → "千百万"
  function getQuadWords(i, digit4, digit3, digit2, digit1) {
    if (i > 0 && digit3 == '0' && digit2 == '0' && digit1 == '0') 
      return DIGITS[digit4] + '千';
    return (digit4 == '0' ? '' : (digit4 == '1' ? '千' : DIGITS[digit4] + '千')) +
           (digit3 == '0' ? '' : (digit3 == '1' ? '百' : DIGITS[digit3] + '百')) +
           (digit2 == '0' ? '' : (digit2 == '1' ? '十' : DIGITS[digit2] + '十')) +
           (digit1 == '0' ? '' : DIGITS[digit1]);
  }

  // Add quad-as-words with scale-word to the aggregate words.
  function addToWords(words, quadWords, scaleWord) {
    return quadWords ?
           quadWords + scaleWord + words :
           words;
  }

  function iter(words, i, first, remainder) {
    if (first == '0000' && remainder.length === 0)
      return i === 0 ? '零' : words;
    return iter(
      addToWords(words, getQuadWords(i, first[0], first[1], first[2], first[3]), SCALE[i]),
      ++i,
      getFirstQuad(remainder),
      getRemainingQuads(remainder)
    );
  }

  var isInt = (Number(int) === int && int % 1 === 0);
  if (!isInt) throw new Error('Argument is not an integer.');
  var strInt = String(int);

  return function(strInt) {
    return iter('', 0, getFirstQuad(strInt), getRemainingQuads(strInt));
  };
}
