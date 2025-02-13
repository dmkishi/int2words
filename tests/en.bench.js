import { bench, describe } from 'vitest';
import num2En from '../src/lang/en.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    num2En(0);
  });
});

describe('transform largest supported integer', () => {
  bench('exponent', () => {
    num2En(2**53);
  });
  bench('literal', () => {
    num2En(9007199254740992);
  });
});
