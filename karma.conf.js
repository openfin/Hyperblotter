// Karma configuration
// Generated on Fri Oct 16 2015 15:19:59 GMT+0100 (BST)

module.exports = function(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'mocha' ],

    // list of files / patterns to load in the browser
    // Load them selectivly - any relying on the OpenFin runtime will break the tests.
    files: [
      // 'src/javascript/components/*.js',
      'test/**/*-test.js',
      'src/javascript/griddata/*.js',
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors:{
      // 'src/javascript/components/*.js': ['webpack'],
      'test/**/*-test.js': ['webpack'],
      'src/javascript/griddata/*.js' :  [ 'webpack']
    },

    // list of files to exclude
    exclude: [
    ],

    webpack:{
      module:{
        loaders: [
          {
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
              presets: ['es2015', 'react']
            }
          }
        ]
      }
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  })
}
