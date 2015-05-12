var React = require('react'),
	teamStream = require('../streams/team.js'),
	turret = require('../streams/turret.js'),
	notifications = require('../streams/notifications.js');


var teamActions = React.createClass({
	getInitialState: function() {
		return {};
	},
	render: function () {
		return <div className="watchlist">
			<h3 className="left-content">bottom right</h3>
		</div>
	}
});

module.exports = teamActions;