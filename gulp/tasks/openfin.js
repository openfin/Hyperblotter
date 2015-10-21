var  gulp   = require('gulp')
    ,gutil = require("gulp-util")
    ,exec = require("gulp-exec")
    ,q = require('q')
    ,openfinLauncher = require('openfin-launcher')
    //,openfinConfigBuilder = require('openfin-config-builder')
    ,nodemon = require('nodemon')
    ,src  = require('../config').js
    ,path = require('path');
 
//gulp.task('openfin', function() {
//  openfinLauncher.launchOpenFin({
//      configPath: 'file:/' + path.resolve('app.json')
//  });
//});

/* Starts up theNode server - returning a promise so it may be chained in the 'openfin' task. */
function startServer(){
    var defered = q.defer();

    var _resolve = function(){
        defered.resolve()
    }

    nodemon({
        script: 'server.js'
        , ext: 'js html'
        , env: { 'NODE_ENV': 'development' }
        , events: {
            "start": _resolve()
        }
    });
    return defered.promise;
}

function openfinLaunch() {
    process.chdir('C:\\Users\\grahamclapham\\AppData\\Local\\OpenFin');
    openfinLauncher.launchOpenFin({
        // Launch a locally hosted Node application.
        configPath: 'http://localhost:5001/app.json'
    })
        .then(function () {
            console.log('success!');
        })
        .fail(function (error) {
            console.log('error!', error);
        });
}

/* THIS IS THE MAIN CALL TO LAUNCH THE OPENFIN APP. */

gulp.task('openfin', function() {
    return startServer()
            .then(openfinLaunch);
});