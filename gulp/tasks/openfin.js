var gulp   = require('gulp');
var src  = require('../config').js;

var openfinLauncher = require('openfin-launcher'),
    path = require('path');
 
gulp.task('openfin', function() {
  openfinLauncher.launchOpenFin({
      configPath: 'file:/' + path.resolve('app.json')
  });
});