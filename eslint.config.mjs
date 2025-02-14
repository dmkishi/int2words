// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    /**
     * Global ignores. If `ignores` is used without any other keys in the
     * configuration object, then the patterns act as global ignores and it gets
     * applied to every configuration object.
     * @see https://eslint.org/docs/latest/use/configure/configuration-files#configuration-objects
     */
    ignores: [
      'benchmarks/',
      'dist/',
      'test/',
      'eslint.config.mjs',
    ],
  },
  eslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  {
    /**
     * Enable linting with type information. E.g.
     * - tseslint.configs.recommended → tseslint.configs.recommendedTypeChecked
     * - tseslint.configs.stylistic → tseslint.configs.stylisticTypeChecked
     * @see https://typescript-eslint.io/getting-started/typed-linting
     */
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: [
            'vitest.config.ts',
          ],
        },
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        {
          "allowNumber": true,
          "allowBoolean": false,
          "allowAny": false,
          "allowNullish": false,
          "allowRegExp": false
        }
      ],
    },
  },
);
