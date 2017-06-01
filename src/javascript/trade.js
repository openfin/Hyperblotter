// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		ReactDOM = require('react-dom'),
		TradeView = require('./components/trade-view.js');

ReactDOM.render(<TradeView />, document.body);