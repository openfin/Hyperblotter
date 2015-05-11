var React = require('react'),
		EventEmitter = require('events').EventEmitter,
		util = require('util'),
		xIgnite = require('../streams/xignite.js'),
		_ = require('underscore'),
        watchlistStream = require('../streams/watchlist.js');



var mounted = false;


var ChartIq = React.createClass({
    getInitialState: function(){

        var that = this;
        watchlistStream.on('selected', function (equity) {

            that.setState({
                currSym : equity.key
            });
        });

        return {
            currSym : 'GOOG'
        }
    },
    componentDidMount: function() {
    },
    render: function() {

        return <div className = "chart-iq" ></div>
    }
});


module.exports = ChartIq;