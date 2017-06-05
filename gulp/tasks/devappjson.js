var gulp = require('gulp');
var config = require('../config').devappjson;

gulp.task('devappjson', function() {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest))
});
