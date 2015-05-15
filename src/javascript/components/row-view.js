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

      len = len || 3;

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
        bid: rndDecrement(ask[0]).sort().reverse().map(genItemFromBidAskValue)
      };
    },
    randTime = function(){
      return (
          new Date(Date.now() - (Math.floor(Math.random() * 3000)))
        ).toString().slice(16,24);
    },
    rowFromArr = function(arr, isAsk){
      var components = [],
          len = arr.length,
          shares, time;

      while(len--) {
        shares = arr[len].shares || Math.floor(Math.random() * 1000);
        time = arr[len].time || randTime();

        if (isAsk){
          components.push(<tr className={arr[len].userAdded ? 'user-added' : '' }>
            <td>{arr[len].value.toFixed(2)}</td>
            <td>{shares}</td>
            
          </tr>);
        }
        else {
          components.push(<tr className={arr[len].userAdded ? 'user-added' : '' }>
            <td>{shares}</td>
            <td>{arr[len].value.toFixed(2)}</td>
          </tr>);
        }
          
      }

      return components;
    },
    lt = (a,b)=>{
      return a < b;
    },
    gt = (a,b)=>{
      return a > b;
    },
    /** refactor this, reverse... */
    sortBy = (value, desc) => {
        if (desc) {
            return (a, b) => {
                if (a[value] > b[value]) {
                    return -1;
                }
                if (a[value] < b[value]) {
                    return 1;
                }
                return 0;
            };
        }

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
    prepDisplayList = (transientList, perminateList, desc)=>{

      return transientList
        .filter(userAddedFilter)
        .concat(perminateList)
        .sort(sortBy('value', desc))
        .slice(0, 3)
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
          //rndDecrement
          tmpState = genDataFromLast(rowInfo.Last);
          tmpState.rowInfo = rowInfo;
          tmpState.bid = prepDisplayList([
            rowInfo.Bid - rndRange(),
            rowInfo.Bid - rndRange() - .7,
            rowInfo.Bid - rndRange() - 1.7,
            ].map((item)=>{
            return {
              value : item,
              shares: Math.floor(Math.random() * 10000)
            }
          }), [], true);
          tmpState.ask = prepDisplayList([
            rowInfo.Ask + rndRange(),
            rowInfo.Ask + rndRange() + .7,
            rowInfo.Ask + rndRange() + 1.7,
            ].map((item)=>{
            return {
              value : item,
              shares: Math.floor(Math.random() * 10000)
            }
          }), [])
          this.setState(tmpState);
      }, 2500));

  },
  closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },

	render: function(){

    //console.log('this is the fake bid', this.state);

		return <div className="child">
			<div className="top-bar">
				<span className="title">{this.state.rowInfo.NAME}</span>
				<i className="fa fa-unlock-alt unlocked"></i>
				<i onClick={this.closeWindow} className="fa fa-times-circle"></i>
			</div>
			<div className="contents">
        <div className="bid-ask">

          <div className="last"> 
            <div className="tkr">{this.state.rowInfo.TICKER}</div>
            <div className="transaction">{this.state.rowInfo.Last.toFixed(2)}</div>
             
          </div>
        </div>
        <div className="orders">
          
          <table>
            <thead>
              <tr>
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
                <th>Ask</th>
                <th>Shares</th>
              </tr>
            </thead>
            <tbody>
              { rowFromArr(this.state.ask, true)}
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
