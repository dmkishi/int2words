/** @type {import('stylelint').Config} */
export default {
  extends: ['stylelint-config-standard-scss'],
  overrides: [
    {
      files: ['**/*.scss'],
      customSyntax: 'postcss-scss',
    },
  ],
  rules: {
    'property-no-vendor-prefix': [
      true,
      { ignoreProperties: [ 'text-size-adjust' ] },
    ],
    'scss/double-slash-comment-empty-line-before': [
      'always',
      { except: ['inside-block'] },
    ],
    'value-keyword-case': [
      'lower',
      { camelCaseSvgKeywords: true },
    ],
  },
};
