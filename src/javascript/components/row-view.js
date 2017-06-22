import React, { Component } from 'react';
import _ from 'underscore';
import fin from '../vendor/openfin';
import RowDisplay from './row-display';

const userBids = [];
const userAsks = [];
let rowInfo, tmpState;


const rndRange = () => {
  return Math.floor(Math.random() * 10 % 5) / 10;
};

const rndDecrement = (base, len) => {
  const list = [];
  len = len || 3;
  while(len--){
    base -= rndRange();
    list.push(base);
  }
  return list;
}

const add = (a,b) => {
  return a+b;
}

const sub = (a,b) => {
  return a-b;
}

const plusMinus = (base, op) => {
  return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
}

const genItemFromBidAskValue = (item) => {
  return {
    value: item,
    userAdded: false
  }
}

const genDataFromLast = (last) => {
  const seed = plusMinus(last, rndRange());
  const ask = rndDecrement(seed).sort();

  return {
    //sort is called twice, is this necessary?
    ask: ask.sort().map(genItemFromBidAskValue),
    bid: rndDecrement(ask[0]).sort().reverse().map(genItemFromBidAskValue)
  };
}

const randTime = () => {
  return (
    new Date(Date.now() - (Math.floor(Math.random() * 3000)))
  ).toString().slice(16,24);
}

const rowFromArr = (arr, isAsk) => {
  const components = [];
  const len = arr.length;
  let shares, time;

  while(len--){
    shares = arr[len].shares || Math.floor(Math.random() * 1000);
    time = arr[len].time || randTime();

    components.push(
      <tr className={arr[len].userAdded ? 'user-added' : '' }>
          <td>{ isAsk ? arr[len].value.toFixed(2) : shares }</td>
          <td>{ isAsk ? shares : arr[len].value.toFixed(2) }</td>
        </tr>
    );
  }

  return components;
}

const lt = (a,b) => {
  return a < b;
}

const gt = (a,b) => {
  return a > b;
}

const sortBy = (value, desc) => {
  if(gt(a[value], b[value])){
    return desc ? -1 : 1;
  }
  if(lt(a[value], b[value])){
    return desc ? 1 : -1;
  }
  else{
    return 0;
  }
}

const userAddedFilter = (item) => {
  return !item.userAdded;
}

const prepDisplayList = (transientList, perminateList, desc) => {
  return transientList
        .filter(userAddedFilter)
        .concat(perminateList)
        .sort(sortBy('value', desc))
        .slice(0, 3)
        .reverse()
}

const prepNumbers = (obj) => {
	for (let prop in obj) {
		if (typeof obj[prop] === 'number') {
			obj[prop] = obj[prop].toFixed(2);
		}
	}
	return obj;
}

class RowView extends Component {
  constructor(props){
    super(props);
    this.state = {
      bid:[],
      ask: [],
      rowInfo: {
        Last: 0
      }
    }
  }

  componentDidMount = () => {
    const jsonGrid = window.opener.document.querySelector('#stock-example'),
    const jsonModel = jsonGrid.getBehavior();
    rowInfo = jsonModel.getRow(location.search.split('=')[1]);

    // Object.observe has been deprecated. this needs refactoring
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
  }

  closeWindow = () => {
    fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  }

  min = () => {
    fin.desktop.main(()=>{
      fin.desktop.Window.getCurrent().minimize();
    });
  }

  render = () => {
    return (
      <div className="child">
        <div className="top-bar">
          <span className="title">{this.state.rowInfo.NAME}</span>
          <i className="fa fa-unlock-alt unlocked"></i>
          <i onClick={this.min} className="fa fa-minus"></i>
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
		  </div>
    );
  }
}

export default RowView;
