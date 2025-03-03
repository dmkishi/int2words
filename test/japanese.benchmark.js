import { bench, describe } from 'vitest';
import { int2ja } from '../src/index.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    int2ja(0);
  });
});

describe('transform largest supported integer', () => {
  bench('constant', () => {
    int2ja(Number.MAX_SAFE_INTEGER);
  });
  bench('literal', () => {
    int2ja(9007199254740991);
  });
});
