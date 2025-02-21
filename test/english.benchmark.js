import { bench, describe } from 'vitest';
import { int2en } from '../src/index.js';

describe('transform smallest supported integer', () => {
  bench('zero', () => {
    int2en(0);
  });
});

describe('transform largest supported integer', () => {
  bench('constant', () => {
    int2en(Number.MAX_SAFE_INTEGER);
  });
  bench('literal', () => {
    int2en(9007199254740991);
  });
});
