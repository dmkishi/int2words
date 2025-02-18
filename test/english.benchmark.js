import { bench, describe } from 'vitest';
import num2En from '../src/lang/en.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    num2En(0);
  });
});

describe('transform largest supported integer', () => {
  bench('constant', () => {
    num2En(Number.MAX_SAFE_INTEGER);
  });
  bench('literal', () => {
    num2En(9007199254740991);
  });
});
