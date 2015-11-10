var gulp = require('gulp');
var config = require('../config').appjson;

gulp.task('appjson', function() {
    return gulp.src(config.src)
        .pipe(gulp.dest(config.dest))
});
