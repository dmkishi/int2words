var gulp   = require('gulp');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', () => {
  gulp.start('jshint', 'build');
});

gulp.task('jshint', () => {
  return gulp.src('source/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'));
});

// Copy source contents first to "dist" then uglify and rename.
gulp.task('build', () => {
  return gulp.src('source/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist'));
});
