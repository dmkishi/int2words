import testIsValidInput from '../modules/testIsValidInput.js';
import testInputTypeCoercion from '../modules/testInputTypeCoercion.js';
import testJapanese from '../modules/lang/testJapanese.js';
const { int2ja } = require('../../dist/cjs/index.cjs');

testIsValidInput(int2ja);
testInputTypeCoercion(int2ja);
testJapanese(int2ja);
