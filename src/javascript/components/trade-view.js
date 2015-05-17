var React = require('react'),
		fin = require('../vendor/openfin.js');

module.exports = React.createClass({
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Application.getCurrent().close();
		});
	},
	minApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().minimize();
		});
	},
  getInitialState: function () {
  	return {
  		class: 'tile'
  	}
  },
  componentDidMount: function(){
  	setTimeout(()=>{
  		this.setState({
  			class: 'tile start-color-change'
  		});
  	}, Math.floor(Math.random() * 1000) );
  },
	render: function(){
		return	<div className={this.state.class}>
							<div className="banner">
								<div className="title">
									AAPL
								</div>
								<div className="window-control">
									<i onClick={this.minApp} className="fa fa-minus"></i>
									<i onClick={this.closeApp} className="fa fa-times"></i>
								</div>
							</div>
							<div className="content">
								<div className="main">
									<span className="last" >129.07</span>
									<span className="percent-change" >+%0.01</span>

								</div>
								<div className="pricing">
									<div className="price open">
										<div className="label">OPEN</div>
										<span className="value">129.05</span>
									</div>
									<div className="price high">
										<div className="label">HIGH</div>
										<span className="value">129.05</span>
									</div>
									<div className="price low">
										<div className="label">LOW</div>
										<span className="value">129.05</span>
									</div>
								</div>
							</div>
						</div>
	}
});