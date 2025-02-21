import { bench, describe } from 'vitest';
import { int2jp } from '../src/index.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    int2jp(0);
  });
});

describe('transform largest supported integer', () => {
  bench('constant', () => {
    int2jp(Number.MAX_SAFE_INTEGER);
  });
  bench('literal', () => {
    int2jp(9007199254740991);
  });
});
