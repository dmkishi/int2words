import testIsValidInput from '../modules/testIsValidInput.js';
import testInputTypeCoercion from '../modules/testInputTypeCoercion.js';
import testEnglish from '../modules/lang/testEnglish.js';
import { int2en } from '../../dist/esm/index.js';

testIsValidInput(int2en);
testInputTypeCoercion(int2en);
testEnglish(int2en);
