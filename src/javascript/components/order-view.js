var React = require('react'),
    fin = require('../vendor/openfin.js'),
    configureDisplayState = function() {
        var book = window.opener.orderBook,
            len = book.length,
            row, 
            state = [];

        while (len--) {
            row = jsonModel.getRow(book[len].rowNum);
            console.log(row);
            state.push({
                rowInfo: row,
                bidAsk: book[len]
            });
        }

        return state;
    };

var jsonGrid = window.opener.document.querySelector('#stock-example'),
    jsonModel = jsonGrid.getBehavior();



module.exports = React.createClass({
	getInitialState: function () {
		return {
			orderBook: window.opener.orderBook
		};
	},
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  removeBidOffer: function(item){
  	//confirm('really dude?');
  	console.log(item, opener.orderBook.indexOf(item));
  	var book = window.opener.orderBook,
		  	index = book.indexOf(item);
  	if (index !== -1){
  		book.splice(index, 1);
  	}

  },
  randBool: ()=>{
  	return parseInt(Math.random() * 10) % 2 ? true : false;
  },
  rowFromArr: function(arr){
  	var components = [],
		  	len = arr.length;

		var curr, side;

		while(len--){
			curr = arr[len];

			side = curr.bidAsk.type === 'bid' ? 'Bid' : 'Ask'
			components.push(<tr>
			<td><i key={curr.bidAsk.rowNum} onClick={this.removeBidOffer.bind(this,curr.bidAsk)} className="fa fa-times-circle"></i></td>
			<td>{side}</td>
			<td>{curr.bidAsk.qty}</td>
			<td>{curr.rowInfo.TICKER}</td>
			<td>{curr.bidAsk.amt}</td>
			<td>OpenFin</td>
			<td>ABC</td>
			<td className="order-status">open</td>
			<td>PTFO2015</td>
		</tr>)
		}

		return components;
  },
  componentDidMount: function() {
      Object.observe(window.opener.orderBook, (...args) => {
          this.setState(window.opener.orderBook);
      });
  },
	render: function(){
		return <div className="child">
			<div className="top-bar">
				<span className="title">Orders </span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
				<div className="order-book"><table className="order-table">
		
	<thead>
	<tr>
			<th>Action</th>
			<th>Side</th>
			<th>Quantity</th>
			<th>Symbol</th>
			<th>Price</th>
			<th>Account</th>
			<th>Options</th>
			<th>Status</th>
			<th>Portfolio</th>
		</tr>
	</thead>
	<tbody>

	{this.rowFromArr(configureDisplayState(this.state))}
		

	</tbody>
</table></div>
			</div>
<div className="footer"></div>
		</div>;

	}
});