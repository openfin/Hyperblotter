var React = require('react'),
		fin = require('../vendor/openfin.js');

module.exports = React.createClass({
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
	render: function(){
		return	<div className="tile">
							<div className="banner">
								<div className="title"></div>
								<div className="window-control"></div>
							</div>
							<div className="content">
								<div className="main"></div>
								<div className="pricing">
									<div className="open"></div>
									<div className="high"></div>
									<div className="low"></div>
								</div>
							</div>
						</div>
	}
});