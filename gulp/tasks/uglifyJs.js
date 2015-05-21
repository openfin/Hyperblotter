var gulp    = require('gulp');
var config  = require('../config').production;
var size    = require('gulp-filesize');
var uglify = require('gulp-uglify');

gulp.task('uglifyJs', ['browserify'], function() {
  return gulp.src(config.jsSrc)
    .pipe(uglify())
    .pipe(gulp.dest(config.dest))
    .pipe(size());
});

gulp.task('postbuild', ['browserify'], function() {
  return gulp.src('./build/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./build'))
    .pipe(size());
});
