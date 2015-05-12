// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		React = require('react'),
		OfApp = require('./components/openfin.js');
		// child = require('./components/child-window.js').createChildWindow({
		// 	name: 'kiddo',
		// 	url: 'row-view.html',
		// 	autoShow: true,
		// 	width: 400,
		// 	height: 400,
		// 	maxHeight: 400,
		// 	maxWidth: 400,
		// 	frame: false
		// });



React.render(<OfApp />, document.body);
// I removed the jQuery....
// 
// global.js already contains jQuery, so in our config.js file, we
// are exposing it to other files like this one in the `require` array.
// Also in config.js, jquery is listed in `external` array for this bundle.
// This combination lets this file use the jquery module bundled with
// global.js, instead of including it twice!


