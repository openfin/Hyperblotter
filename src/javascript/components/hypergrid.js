var React = require('react'),
		xIgnite = require('../streams/xignite.js'),
        _ = require('underscore');

var HyperGrid = React.createClass({
	componentDidMount: function(){

        // setTimeout(function(){
        //     var qTree = document.querySelector('#q-example')
        //     var b = qTree.getBehavior()
        //     b.setAttribute('url','ws://local:12345')
        //     b.reconnect();

        //     var lnfOverrides = {
        //         backgroundColor: '#2d2d2d',
        //         topLeftBackgroundColor: '#2d2d2d',
        //         fixedColumnBackgroundColor: '#2d2d2d',
        //         fixedRowBackgroundColor: '#2d2d2d',
        //         color: 'lightgrey',
        //         topLeftColor: 'lightgrey',
        //         fixedColumnColor: 'lightgrey',
        //         fixedRowColor: 'lightgrey',
        //         lineColor: 'lightgrey',
        //     };

        //     //to apply to a specific table
        //     qTree.addProperties(lnfOverrides);


        // },2000);
            
    },
  render: function() {
    return <div onClick={this.onClick} className="hyper-grid"></div>
  }
});
// <fin-hypergrid id="q-example"></fin-hypergrid>

module.exports = HyperGrid;