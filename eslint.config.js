// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/',
      'docs/',
      'example/',
    ],
  },
  {
    rules: {
      ...eslint.configs.recommended.rules,
    },
    linterOptions: {
      reportUnusedInlineConfigs: 'warn',
    },
  },
  {
    files: ['**/*.ts'],
    extends: [
      tseslint.configs.strictTypeChecked,
      tseslint.configs.stylisticTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        projectService: {
          allowDefaultProject: [
            'vitest.config.ts',
          ],
        },
      },
    },
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
      "@typescript-eslint/no-base-to-string": [
        'error',
        { ignoredTypeNames: [
          // Default values:
          'Error', 'RegExp', 'URL', 'URLSearchParams',
          // Custom values:
          'CoercionError',
        ] },
      ],
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
