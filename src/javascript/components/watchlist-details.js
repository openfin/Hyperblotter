var React = require('react'),
	watchlistStream = require('../streams/watchlist.js'),
	vestorly = require('./vestorly.js'),
	_ = require('underscore');


var WatchListDetails = React.createClass({
	getInitialState: function() {
		return {};
	},
		render: function () {
		return <div className="watchlist">
			<h3 className="left-content"> upper right </h3>
		</div>
	}
});

module.exports = WatchListDetails;