// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	Main = require('./components/main.js');

ReactDOM.render(<Main />, document.getElementById('root'));


