var React = require('react'),
    EventEmitter = require('events').EventEmitter,
    util = require('util'),
    _ = require('underscore');

var mounted = false;

var ChartIq = React.createClass({
  getInitialState: function(){
    return {}
  },

  componentDidMount: function() {
  },

  render: function() {
    return <div className = "chart-iq" ></div>
  }
});

module.exports = ChartIq;