import { bench, describe } from 'vitest';
import { num2Jp } from '../src/index.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    num2Jp(0);
  });
});

describe('transform largest supported integer', () => {
  bench('constant', () => {
    num2Jp(Number.MAX_SAFE_INTEGER);
  });
  bench('literal', () => {
    num2Jp(9007199254740991);
  });
});
