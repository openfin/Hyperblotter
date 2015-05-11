var React = require('react'),
	teamStream = require('../streams/team.js');

var teamView = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function () {
		var that = this;
		return <div className="watchlist">
			<h3 className="left-content">bottom left</h3>
		</div>
	}
});

module.exports = teamView;