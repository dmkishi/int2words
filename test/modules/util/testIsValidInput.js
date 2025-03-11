import { describe, expect, test, vi } from 'vitest'

const inputCategories = [
  {
    name: 'non-numbers',
    inputs: [
      1n,
      '',
      'non-empty string',
      '1,000',
      '1n',
      '1e-1',
      true,
      { a: 1 },
    ]
  },
  {
    name: 'non-integer numbers',
    inputs: [
      0.1,
      1e-1,
      Infinity,
      -Infinity,
      NaN,
    ]
  },
  {
    name: 'out-of-range integers',
    inputs: [
      -1,
      Number.MAX_SAFE_INTEGER + 1,
    ]
  },
];

export default function testIsValidInput(func) {
  tests('default', func, { throwError: false });
  tests('throw error', func, { throwError: true });
}

function tests(testVariantDescription, func, funcOptions) {
  describe(`invalid inputs: ${testVariantDescription}`, () => {
    inputCategories.forEach(category => {
      test(category.name, () => {
        category.inputs.forEach(input => {
          if (funcOptions.throwError) {
            expect(() => func(input, funcOptions)).toThrowError();
          } else {
            const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
            expect(func(input, funcOptions)).toBe('');
            expect(consoleSpy).toHaveBeenCalled();
            consoleSpy.mockRestore();
          }
        });
      });
    });
  });
};
