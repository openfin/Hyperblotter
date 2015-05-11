var React = require('react'),
	watchlistStream = require('../streams/watchlist.js');

var WatchList = React.createClass({
	getInitialState: function() {
		return {};
	},

	render: function () {
		return <div className="watchlist">
			<h3 className="left-content">upper left</h3>
		</div>
	}
});

module.exports = WatchList;