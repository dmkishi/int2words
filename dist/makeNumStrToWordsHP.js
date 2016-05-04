/* numToWords v1.2.7 (2016-05-04T18:40:06.610Z)
 * Convert integers to words, with several flavors.
 * <https://github.com/dmkishi/numToWords>
 */

function makeNumStrToWordsHP() {
  var ONES = ['','one','two','three','four','five','six','seven','eight','nine',
              'ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen',
              'seventeen','eighteen','nineteen'];
  var TENS = ['','','twenty','thirty','forty','fifty','sixty','seventy',
              'eighty','ninety'];
  var SCALE = ['','thousand','million','billion','trillion','quadrillion',
               'quintillion','sextillion','septillion','octillion','nonillion'];


  // Return string of first three digits or triplet, padded with zeros if needed.
  // Ex. "4321" → "321"
  //       "21" → "021"
  function getFirstTriplet(str) {
    return ('000' + str).substr(-3);
  }

  // Return string of digits with first three digits or triplet removed.
  // Ex. "7654321" → "7654"
  function getRemainingTriplets(str) {
    return str.substr(0, str.length - 3);
  }

  // Return a triplet as words.
  // Ex. 123 → "one hundred twenty-three"
  function getTripletWords(digit3, digit2, digit1) {
    return (digit3 == '0' ? ''           : ONES[digit3] + ' hundred ') +
           (digit1 == '0' ? TENS[digit2] : TENS[digit2] && TENS[digit2] + '-' || '') +
           (ONES[digit2 + digit1] || ONES[digit1]);
  }

  // Add triplet-as-words with scale-word to the aggregate words.
  function addToWords(words, tripletWords, scaleWord) {
    return tripletWords ?
           tripletWords + (scaleWord && ' ' + scaleWord || '') + ' ' + words :
           words;
  }

  function iter(words, i, first, remainder) {
    if (first == '000' && remainder.length === 0) return words;
    return iter(
      addToWords(words, getTripletWords(first[0], first[1], first[2]), SCALE[i]),
      ++i,
      getFirstTriplet(remainder),
      getRemainingTriplets(remainder)
    );
  }

  return function(strInt) {
    return iter('', 0, getFirstTriplet(strInt), getRemainingTriplets(strInt));
  };
}
