var React = require('react'),
		ChartIq = require('./chart-iq.js'),
		HyperGrid = require('./hypergrid.js'),
		Menu = require('./menu.js'),
		Login = require('./login.js'),
		TopBar = require('./top-bar.js');


var OpenFin = React.createClass({
  render: function() {
    return <div>
	    <div className="app">
	      <TopBar />
	      <Menu />

	      <HyperGrid />
	    </div>
	    <Login />
	  </div>;
  }
});

module.exports = OpenFin;

// <div className="settings"></div>
//React.render(<HelloMessage name="John" />, document.body);