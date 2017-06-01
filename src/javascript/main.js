// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		ReactDOM = require('react-dom'),
		Main = require('./components/main.js');

//require('./components/orders.js');

ReactDOM.render(<Main />, document.body);


