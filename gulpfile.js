// CONFIG ----------------------------------------------------------------------
var SRC_JS  = 'src/*.js';
var SRC_CSS = 'src/*.css';


// INIT ------------------------------------------------------------------------
var gulp   = require('gulp');
var insert = require('gulp-insert');
var eslint = require('gulp-eslint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var LICENSE = (function getLicense() {
  var license     = '';
  var name        = require('./bower.json').name;
  var version     = require('./VERSION.json').version;
  var iso8601     = (new Date()).toISOString();
  var description = require('./bower.json').description;
  var homepage    = require('./bower.json').homepage;

  // Use comment style dual-compatible with JS and CSS
  license += `/* ${name} v${version} (${iso8601})\n`;
  license += (description) ? ` * ${description}\n` : '';
  license += (homepage)    ? ` * <${homepage}>\n`  : '';
  license += ' */\n';
  license += '\n';

  return license;
})();


// GULP ------------------------------------------------------------------------
gulp.task('default', () => {
  gulp.start('lint', 'scripts', 'styles');
});

gulp.task('lint', () => {
  return gulp.src(SRC_JS)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Copy source contents first to "dist", prepend contents with license info,
// then create a minified version and rename.
gulp.task('scripts', () => {
  return gulp.src(SRC_JS)
    .pipe(insert.prepend(LICENSE))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});

// Prepend contents with license info and copy to "dist".
gulp.task('styles', () => {
  return gulp.src(SRC_CSS)
    .pipe(insert.prepend(LICENSE))
    .pipe(gulp.dest('dist'));
});
