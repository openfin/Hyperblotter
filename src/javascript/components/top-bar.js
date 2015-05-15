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
	    	try {
	    		fin.desktop.Window.getCurrent().defineDraggableArea(document.querySelector('.top-bar'));
	    	}
	    	catch (e) {

	    	}
	        
	    });
	},
	render: function () {
		return <div className="top-bar">
			<span className="title">Blotter</span>
			<i onClick={this.closeApp} className="fa fa-times-circle"></i>
		</div>
	}
});

module.exports = TopBar;