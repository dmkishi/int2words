// @ts-check
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import pkg from './package.json' with { type: 'json' };

const name = pkg.name;
const format = 'iife';
const sourcemap = true;
const banner = `/*! ${pkg.name} v${pkg.version} <${pkg.homepage}> */`;

export default {
  input: 'dist/esm/index.js',
  output: [
    {
      file: `dist/legacy-iife/${name}.min.js`,
      plugins: [terser()],
      name,
      format,
      sourcemap,
      banner,
    },
    {
      file: `dist/legacy-iife/${name}.js`,
      name,
      format,
      sourcemap,
      banner,
    },
  ],
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          targets: 'defaults',
          useBuiltIns: 'usage',
          corejs: 3,
        }],
      ],
      exclude: 'node_modules/**',
    }),
  ],
};
