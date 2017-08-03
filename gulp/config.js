var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: [dest, '.', './src/javascript/vendor']
    },
    port: 5000
  },
  sass: {
    src: src + "/sass/**/*.{sass,scss}",
    dest: dest +'/css',
    settings: {
      indentedSyntax: true, // Enable .sass syntax!
      imagePath: 'images' // Used by the image-url helper
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  assets: {
    src: "assets/**",
    dest: dest + "/assets"
  },
  vendor: {
    src: src + "/javascript/vendor/**",
    dest: dest
  },
  appjson: {
    src: "app.json",
    dest: dest
  },
  devappjson: {
    src: "devapp.json",
    dest: dest
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  iconFonts: {
    name: 'Gulp Starter Icons',
    src: src + '/icons/*.svg',
    dest: dest + '/fonts',
    sassDest: src + '/sass',
    template: './gulp/tasks/iconFont/template.sass.swig',
    sassOutputName: '_icons.sass',
    fontPath: 'fonts',
    className: 'icon',
    options: {
      fontName: 'Post-Creator-Icons',
      appendCodepoints: true,
      normalize: false
    }
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [ {
      entries: src + '/javascript/main.js',
      dest: dest,
      outputName: 'out.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    }, {
      entries: src + '/javascript/hypergrid.js',
      dest: dest,
      outputName: 'hypergrid.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    }, {
      entries: src + '/javascript/trade.js',
      dest: dest,
      outputName: 'trade.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    }, {
      entries: src + '/javascript/order.js',
      dest: dest,
      outputName: 'order.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    }, {
      entries: src + '/javascript/row-view.js',
      dest: dest,
      outputName: 'row-view.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    },{
      entries: src + '/javascript/tour.js',
      dest: dest,
      outputName: 'tour.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    },{
      entries: src + '/javascript/tourInfo.js',
      dest: dest,
      outputName: 'tourInfo.js',
      // list of externally available modules to exclude from the bundle
      //external: ['underscore'],
      browser:{
        "node-hid": "null.js"
      },
      debug: true
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  },
  js : src + '/javascript/'
};
