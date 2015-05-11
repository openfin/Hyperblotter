var jshint = require('gulp-jshint');
var gulp   = require('gulp');
var src  = require('../config').js;
 
gulp.task('lint', function() {
  return gulp.src('./src/javascript/*')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});