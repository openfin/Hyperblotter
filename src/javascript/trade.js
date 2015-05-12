// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		React = require('react'),
		TradeView = require('./components/trade-view.js');

React.render(<TradeView />, document.body);