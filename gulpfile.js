var gulp   = require('gulp');
var bump   = require('gulp-bump');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

var SRC = 'src/*.js';

gulp.task('default', () => {
  gulp.start('jshint', 'build');
});

gulp.task('jshint', () => {
  return gulp.src(SRC)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// Copy source contents first to "dist" then uglify and rename.
gulp.task('build', () => {
  return gulp.src(SRC)
    .pipe(gulp.dest('dist'))
    .pipe(bump())
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});
