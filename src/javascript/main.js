// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		React = require('react'),
		Main = require('./components/main.js');

//require('./components/orders.js');

React.render(<Main />, document.body);
