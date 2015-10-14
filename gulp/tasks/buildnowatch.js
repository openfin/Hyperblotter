/**
 * Created by grahamclapham on 14/10/15.
 */
var gulp = require('gulp');

gulp.task('buildnowatch', ['sass', 'images', 'markup', 'browserSync']);
