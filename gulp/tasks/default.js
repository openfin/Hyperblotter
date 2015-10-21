var gulp = require('gulp');

gulp.task('default', ['sass', 'images', 'markup', 'vendor', 'watch']);
gulp.task('fin', ['sass', 'images', 'markup', 'vendor', 'appjson', 'openfin']);
gulp.task('finbuild', ['sass', 'images', 'markup', 'vendor', 'appjson']);
