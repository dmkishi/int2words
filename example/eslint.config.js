// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      'dist/',
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
    },
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
