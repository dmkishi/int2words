import testIsValidInput from '../modules/testIsValidInput.js';
import testInputTypeCoercion from '../modules/testInputTypeCoercion.js';
import testJapanese from '../modules/lang/testJapanese.js';
import { int2ja } from '../../dist/esm/index.js';

testIsValidInput(int2ja);
testInputTypeCoercion(int2ja);
testJapanese(int2ja);
