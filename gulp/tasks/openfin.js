var  gulp   = require('gulp')
    ,gutil = require("gulp-util")
    ,exec = require("gulp-exec")
    ,q = require('q')
    ,openfinLauncher = require('openfin-launcher')
    //,openfinConfigBuilder = require('openfin-config-builder')
    ,nodemon = require('nodemon')
    ,src  = require('../config').js
    ,path = require('path')
    ,userName =   (process && process.env && process.env['USERPROFILE'] ? process.env['USERPROFILE'].split(path.sep)[2] : null)
    ,rootDir =    (process && process.cwd()  ? process.cwd() : null);
 
//gulp.task('openfin', function() {
//  openfinLauncher.launchOpenFin({
//      configPath: 'file:/' + path.resolve('app.json')
//  });
//});

/* Starts up theNode server - returning a promise so it may be chained in the 'openfin' task. */
function startServerPromise(){
    process.chdir(rootDir);
    var defered = q.defer();
    var _resolve = function(){
            defered.resolve()
    };
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
    try {
        var _dir = 'C:\\Users\\' + userName + '\\AppData\\Local\\OpenFin'
        process.chdir(_dir);
    }catch(err){
        //--
    }

    openfinLauncher.launchOpenFin({
        // Launch a locally hosted Node application.
        configPath: 'http://localhost:5001/app.json'
    })
        .then(function () {
            console.log('OpenFin launched!');
        })
        .fail(function (error) {
            console.log('Error opening OpenFin!', error);
        });
}

/* THIS IS THE MAIN CALL TO LAUNCH THE OPENFIN APP. */

gulp.task('server', function() {
    return startServerPromise()
            .then(function(){console.log("Server now running - call 'gulp openfin'")});
});


gulp.task('openfin', function() {
            return openfinLaunch();
});


