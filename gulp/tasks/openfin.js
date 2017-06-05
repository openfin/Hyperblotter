var gulp = require('gulp'),
  gutil = require("gulp-util"),
  exec = require("gulp-exec"),
  q = require('q'),
  gls = require('gulp-live-server'),
  openfinLauncher = require('openfin-launcher'),
  src = require('../config').js,
  path = require('path'),
  userName = (process && process.env && process.env['USERPROFILE'] ? process.env['USERPROFILE'].split(path.sep)[2] : null),
  rootDir = (process && process.cwd() ? process.cwd() : null);

function getConfigPath() {
  var node_env = process.env.NODE_ENV || 'development';

  if(node_env !== 'development') {
    return 'http://localhost:5001/app.json'
  }

  return 'http://localhost:5001/devapp.json'
}

function openfinLaunch() {
  try {
    var _dir = 'C:\\Users\\' + userName + '\\AppData\\Local\\OpenFin'
    process.chdir(_dir);
  } catch (err) {
    console.log("Unable to access OpenFin RVM on Windows, ignore if using another OS")
  }

  openfinLauncher.launchOpenFin({
      // Launch a locally hosted Node application.
      configPath: getConfigPath()
    })
    .then(function() {
      console.log('OpenFin launched!');
    })
    .fail(function(error) {
      console.log('Error opening OpenFin!', error);
    });
}

/* Task to run server */
gulp.task('server', function() {
  var server = gls('server.js', {env: {NODE_ENV: 'development'}}, false);
  server.start();
});

/* THIS IS THE MAIN CALL TO LAUNCH THE OPENFIN APP. */
gulp.task('openfin', function() {
  return openfinLaunch();
});

gulp.task('start', ['server', 'openfin']);
