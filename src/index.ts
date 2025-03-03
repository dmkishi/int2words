/**
 * Convention is to use 2-letter ISO 639 language codes. Additionally provide
 * country code top-level domains as a helpful alias when meaningful.
 *
 * E.g. Japanese → `ja` and `jp`
 *      English → `en` only.
 *
 * ISO 639 language codes: https://en.wikipedia.org/wiki/List_of_ISO_639_language_codes
 * Country code TLDs: https://en.wikipedia.org/wiki/Country_code_top_level_domain#Lists
 */

export { default as int2ja, default as int2jp } from './lang/japanese.js';
export { default as int2en } from './lang/english.js';
export { CoercionError } from './lang/util/isValidInput.js';
