var React = require('react'),
		RowDisplay = require('./row-display.js'),
		fin = require('../vendor/openfin.js'),
		displayData;

module.exports = React.createClass({
	getInitialState: function() {
		return {};
	},
	componentDidMount: function() {
      var jsonGrid = window.opener.document.querySelector('#stock-example'),
          jsonModel = jsonGrid.getBehavior();
      
      displayData = jsonModel.getRow(location.search.split('=')[1]);

      Object.observe(displayData, () => {
          
          this.setState(prepNumbers(displayData));
      });
  },
  closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  openTrade: ()=>{
  	//console.log('this is the state', displayData);
  	require('./child-window.js').createChildWindow({
                        name: 'trade-' + displayData.NAME,
                        url: 'trade.html?row=' + location.search.split('=')[1],
                        autoShow: true,
                        width: 400,
                        height: 400,
                        maxHeight: 400,
                        maxWidth: 400,
                        frame: false
                    });
  },
  openOrder: ()=>{
  	//console.log('this is the state', displayData);
  	require('./child-window.js').createChildWindow({
                        name: 'order-' + displayData.NAME,
                        url: 'order.html?row=' + location.search.split('=')[1],
                        autoShow: true,
                        width: 400,
                        height: 400,
                        maxHeight: 400,
                        maxWidth: 400,
                        frame: false
                    });
  },
	render: function(){
		return <div className="child">
			<div className="top-bar">
				<span className="title">{this.state.NAME}</span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
				<RowDisplay row={this.state}/>
			</div>
			<div className="footer">
				<div onClick={this.openTrade} className="trade">
					<span className="link">Trade</span>
				</div>
				<div className="spacer"></div>
				<div onClick={this.openOrder} className="order">
					<span className="link">Order</span>
				</div>
			</div>
		</div>;
	}
});

function prepNumbers(obj){
	var prop;
	for (prop in obj) {
		if (typeof obj[prop] === 'number') {
			obj[prop] = obj[prop].toFixed(2);
		}
	}
	return obj;
}
