var React = require('react'),
		ChartIq = require('./chart-iq.js'),
		HyperGrid = require('./hypergrid.js'),
		Menu = require('./menu.js'),
		TopBar = require('./top-bar.js');


var OpenFin = React.createClass({
  render: function() {
    return <div>
	    <div className="app">
	    	<TopBar />
	      <HyperGrid />
	    </div>
	  </div>;
  }
});

module.exports = OpenFin;