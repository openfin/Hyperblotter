// Browserify entry point for the bundle (yay JavaScript!)

var _ = require('underscore'),
		React = require('react'),
		RowView = require('./components/row-view.js');



React.render(<RowView />, document.body);