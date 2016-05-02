var gulp   = require('gulp');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var SRC     = 'src/*.js';
var NAME    = require('./bower.json').name;
var VERSION = require('./src/VERSION.json').version;


gulp.task('default', () => {
  gulp.start('jshint', 'build');
});

gulp.task('jshint', () => {
  return gulp.src(SRC)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// Copy source contents first to "dist", prepend contents with package name,
// version, and date, then make an minified version and rename.
gulp.task('build', () => {
  var iso8601 = (new Date()).toISOString();
  var license = `// ${NAME} v${VERSION} (${iso8601})\n`;

  return gulp.src(SRC)
    .pipe(insert.prepend(license))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({ preserveComments: 'license' }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});
