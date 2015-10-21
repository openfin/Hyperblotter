var gulp = require('gulp');

gulp.task('default', ['sass', 'images', 'markup', 'vendor', 'watch']);
gulp.task('of', ['sass', 'images', 'markup', 'vendor', 'appjson', 'openfin']);
