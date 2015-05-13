var React = require('react'),
    _ = require('underscore'),
		RowDisplay = require('./row-display.js'),
		fin = require('../vendor/openfin.js'),
		rowInfo,
    genRow = (rowClass, config)=>{
      return <tr className={rowClass}>
                <td>{config.date}</td>
                <td>{config.shares}</td>
                <td>{config.value}</td>
              </tr>
    },
    fakeBidAsk = function(){
      var i = 10,
          data = [];

      while(--i){
        data.push(<tr>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
                <td>{Math.floor(Math.random() * 100)}</td>
              </tr>)
      }
      return data;
    },
    state = ()=> {
      return {
        fakeBid: fakeBidAsk(),
        fakeAsk: fakeBidAsk(),
        rowInfo: {}
      };
    },
    tmpState,
    intervalToClear,
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
    genDataFromLast = function(last){
      var seed = plusMinus(last, rndRange()),
          ask = rndDecrement(seed).sort();
          
      return {
        ask: ask.sort().map((item)=>{
          return {
            value: item,
            userAdded: false
          }
        }),
        bid: rndDecrement(ask[0]).sort().map((item)=>{
          return {
            value: item,
            userAdded: false
          }
        })
      };
    },
    randTime = function(){
      return (
          new Date(Date.now() - (Math.floor(Math.random() * 3000)))
        ).toString().slice(16,24);
    },
    rowFromArr = function(arr){
      var components = [],
          len = arr.length;

      while(len--) {

        components.push(<tr className={arr[len].userAdded ? 'user-added' : '' }>
                <td>{randTime()}</td>
                <td>{Math.floor(Math.random() * 1000)}</td>
                <td>{arr[len].value.toFixed(2)}</td>
              </tr>);
      }

      return components;
    },
    userBids = [];





module.exports = React.createClass({
	getInitialState: function() {
		return {bid:[], ask: [], rowInfo: {Last:0}};
	},
  componentDidMount: function() {
      var jsonGrid = window.opener.document.querySelector('#stock-example'),
          jsonModel = jsonGrid.getBehavior();

      rowInfo = jsonModel.getRow(location.search.split('=')[1]);

      console.log('the fake data', genDataFromLast(rowInfo.Last));

      Object.observe(rowInfo, _.throttle(() => {
          // tmpState = state();
          tmpState = genDataFromLast(rowInfo.Last);
          tmpState.rowInfo = rowInfo;

          tmpState.bid = tmpState.bid.filter((item) => {
              return !item.userAdded;
          })
          tmpState.bid = tmpState.bid.concat(userBids);
          tmpState.bid = tmpState.bid.sort((a, b) => {
              if (a.value < b.value) {
                  return -1;
              }
              if (a.value > b.value) {
                  return 1;
              }

              return 0;
          });
          tmpState.bid = tmpState.bid.slice(0, 10);
          tmpState.bid = tmpState.bid.reverse();

          this.setState(tmpState);
      }, 2500));
  },
  closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },

  bidAmtKeyUp: function(...args){
    var fb = this.state.bid;

    if (args[0].which === 13) {
    
      userBids.push({
        value: Number(this.refs.bidTextInput.getDOMNode().value),
        userAdded: true
      });

      fb = fb.filter((item)=>{
        return !item.userAdded;
      });

      fb = fb.concat(userBids);

      fb = fb.sort((a,b)=>{
        if (a.value < b.value) {
          return -1;
        }
        if (a.value > b.value) {
          return 1;
        }

        return 0;
      });
      fb = fb.slice(0,10);
      fb = fb.reverse()
      

      this.setState({
        ask: this.state.ask,
        bid: fb,
        rowInfo: this.state.rowInfo
      });

      this.refs.bidTextInput.getDOMNode().value = '';
    }
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
            <input onKeyDown={this.bidAmtKeyUp} ref="bidTextInput" placeholder="amt"/>
            <input placeholder="qty"  />
          </div>
          <div className="ask">
            Ask
            <input placeholder="amt"/>
            <input placeholder="qty"/>
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
