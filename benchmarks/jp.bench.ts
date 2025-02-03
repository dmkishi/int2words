import { bench, describe } from 'vitest';
import num2Jp from '../src/lang/jp.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    num2Jp(0);
  });
});

describe('transform largest supported integer', () => {
  bench('exponent', () => {
    num2Jp(2**53);
  });

  bench('literal', () => {
    num2Jp(9007199254740992);
  });
});
