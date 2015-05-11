var React = require('react'),
		fin = require('../vendor/openfin.js');

var TopBar = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Application.getCurrent().close();
		});
	},
	componentDidMount: function() {
		if (!fin.desktop) {
			return;
		}
	    fin.desktop.main(function() {
	    	console.log('defining');
	        fin.desktop.Window.getCurrent().defineDraggableArea(document.querySelector('.top-bar'));
	    });
	},
	render: function () {
		return <div className="top-bar">
			<button onClick={this.closeApp} className="button top-button close-button">x</button>
		</div>
	}
});

module.exports = TopBar;