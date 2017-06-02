// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
	React = require('react'),
	ReactDOM = require('react-dom'),
	TradeView = require('./components/trade-view.js');

ReactDOM.render(<TradeView />, document.getElementById('root'));