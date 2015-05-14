var React = require('react'),
    _ = require('underscore'),
		RowDisplay = require('./row-display.js'),
		fin = require('../vendor/openfin.js'),
		rowInfo,
    tmpState,
    rndRange = function () {
      return Math.floor(Math.random() * 10 % 5) / 10;
    },
    rndDecrement = function (base, len) {
      var lst = [];

      len = len || 10;

      while(len--) {
        base -= rndRange();
        lst.push(base)
      }

      return lst;
    },
    add = function(a,b){
      return a + b;
    },
    sub = function(a,b){
      return a - b;
    },
    plusMinus = function(base, op){
      return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
    },
    genItemFromBidAskValue = (item)=>{
      return {
        value: item,
        userAdded: false
      }
    },
    genDataFromLast = function(last){
      var seed = plusMinus(last, rndRange()),
          ask = rndDecrement(seed).sort();
          
      return {
        ask: ask.sort().map(genItemFromBidAskValue),
        bid: rndDecrement(_.last(ask) - 0.1).sort().map(genItemFromBidAskValue)
      };
    },
    randTime = function(){
      return (
          new Date(Date.now() - (Math.floor(Math.random() * 3000)))
        ).toString().slice(16,24);
    },
    rowFromArr = function(arr){
      var components = [],
          len = arr.length,
          shares, time;

      while(len--) {
        shares = arr[len].shares || Math.floor(Math.random() * 1000);
        time = arr[len].time || randTime();

        components.push(<tr className={arr[len].userAdded ? 'user-added' : '' }>
          <td>{time}</td>
          <td>{shares}</td>
          <td>{arr[len].value.toFixed(2)}</td>
        </tr>);
      }

      return components;
    },
    sortBy = (value) => {
        return (a, b) => {
            if (a[value] < b[value]) {
                return -1;
            }
            if (a[value] > b[value]) {
                return 1;
            }
            return 0;
        };
    },
    userAddedFilter = (item) => {
        return !item.userAdded;
    },
    prepDisplayList = (transientList, perminateList)=>{
      return transientList
        .filter(userAddedFilter)
        .concat(perminateList)
        .sort(sortBy('value'))
        .slice(0, 10)
        .reverse()
    },
    // add filter by row
    userBids = [],
    userAsks = [];



module.exports = React.createClass({
	getInitialState: function() {
		return {bid:[], ask: [], rowInfo: {Last:0}};
	},
  componentDidMount: function() {
      var jsonGrid = window.opener.document.querySelector('#stock-example'),
          jsonModel = jsonGrid.getBehavior();

      rowInfo = jsonModel.getRow(location.search.split('=')[1]);

      Object.observe(rowInfo, _.throttle(() => {
          /**
           * @todo refactor this out
           */
          tmpState = genDataFromLast(rowInfo.Last);
          tmpState.rowInfo = rowInfo;
          tmpState.bid = prepDisplayList(tmpState.bid, userBids);
          tmpState.ask = prepDisplayList(tmpState.ask, userAsks)
          this.setState(tmpState);
      }, 2500));

      Object.observe(window.opener.orderBook, ()=>{
        
        // wtf... 
        var bidList = window.opener.orderBook.filter((item) => {
            return item.rowNum === Number(location.search.split('=')[1]) && item.type === 'bid';
        }).map((item)=>{
          return item.timeKey
        });

        userBids = userBids.filter((item)=>{
          return bidList.indexOf(item.timeKey) !== -1;
        });


        var askList = window.opener.orderBook.filter((item) => {
            return item.rowNum === Number(location.search.split('=')[1]) && item.type === 'ask';
        }).map((item)=>{
          return item.timeKey
        });

        userAsks = userAsks.filter((item)=>{
          return askList.indexOf(item.timeKey) !== -1;
        });

        tmpState = genDataFromLast(rowInfo.Last);
          tmpState.rowInfo = rowInfo;
          tmpState.bid = prepDisplayList(tmpState.bid, userBids);
          tmpState.ask = prepDisplayList(tmpState.ask, userAsks)
          this.setState(tmpState);

      });
  },
  closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  bidAmtKeyDown: function(...args) {

      if (args[0].which === 13) {
          var timeKey = Date.now();
          window.opener.orderBook.push({
              type: 'bid',
              amt: Number(this.refs.bidTextInput.getDOMNode().value),
              qty: Number(this.refs.bidQtyTextInput.getDOMNode().value),
              rowNum: Number(location.search.split('=')[1]),
              timeKey: timeKey

          });

          this.enterBidAsk(userBids,
              this.refs.bidTextInput.getDOMNode(),
              this.refs.bidQtyTextInput.getDOMNode(),
              timeKey)

      }
  },
  askAmtKeyDown: function(...args) {


      if (args[0].which === 13) {
        var timeKey = Date.now();
        /** @todo refactor this out  */

          window.opener.orderBook.push({
              type: 'ask',
              amt: Number(this.refs.askTextInput.getDOMNode().value),
              qty: Number(this.refs.askQtyTextInput.getDOMNode().value),
              rowNum: Number(location.search.split('=')[1]),
              timeKey:timeKey
              //timeKey: new Date().toString().slice(16, 24)
          });


          this.enterBidAsk(userAsks,
              this.refs.askTextInput.getDOMNode(),
              this.refs.askQtyTextInput.getDOMNode(),
              timeKey)
      }
  },
  enterBidAsk: function(userEntries, amt, qty, timeKey) {

      userEntries.push({
          value: Number(amt.value),
          userAdded: true,
          shares: Number(qty.value) || 100,
          timeKey: timeKey,
          time: new Date().toString().slice(16, 24) 
      });

      this.setState({
          bid: prepDisplayList(this.state.bid, userBids),
          ask: prepDisplayList(this.state.ask, userAsks),
          rowInfo: this.state.rowInfo
      });

      amt.value = '';
      qty.value = '';
  },
	render: function(){

    //console.log('this is the fake bid', this.state);

		return <div className="child">
			<div className="top-bar">
				<span className="title">{this.state.rowInfo.TICKER} {this.state.rowInfo.Last.toFixed(2)}</span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
        <div className="bid-ask">
          <div className="bid">
            Bid
            <input onKeyDown={this.bidAmtKeyDown} ref="bidTextInput" placeholder="amt" />
            <input onKeyDown={this.bidAmtKeyDown} ref="bidQtyTextInput" placeholder="qty" />
          </div>
          <div className="ask">
            Ask
            <input onKeyDown={this.askAmtKeyDown} ref="askTextInput" placeholder="amt" />
            <input onKeyDown={this.askAmtKeyDown} ref="askQtyTextInput" placeholder="qty" />
          </div>
        </div>
        <div className="orders">
          
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Shares</th>
                <th>Bid</th>
              </tr>
            </thead>
            <tbody>
            { rowFromArr(this.state.bid)}
            </tbody>
          </table>

          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Shares</th>
                <th>Ask</th>
              </tr>
            </thead>
            <tbody>
              { rowFromArr(this.state.ask)}
            </tbody>
          </table>
            
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
