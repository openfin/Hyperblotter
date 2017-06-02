var gulp = require('gulp');

gulp.task('default', ['sass', 'images', 'markup', 'vendor', 'watch']);
gulp.task('fin', ['sass', 'images', 'markup', 'vendor', 'appjson', 'devappjson', 'openfin']);
gulp.task('build', ['sass', 'images', 'markup', 'vendor', 'browserify', 'appjson', 'devappjson', 'assets']);
