import testIsValidInput from '../modules/testIsValidInput.js';
import testInputTypeCoercion from '../modules/testInputTypeCoercion.js';
import testEnglish from '../modules/lang/testEnglish.js';
const { int2en } = require('../../dist/cjs/index.cjs');

testIsValidInput(int2en);
testInputTypeCoercion(int2en);
testEnglish(int2en);
