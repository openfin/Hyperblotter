import React, { Component } from 'react';
import _ from 'underscore';
import fin from '../vendor/openfin';
import RowDisplay from './row-display';
import Utils from './utils';

const {
  rndRange,
  add,
  sub,
  randTime,
  lt,
  gt,
  prepNumbers
} = Utils; 

const userBids = [];
const userAsks = [];
let rowInfo, tmpState;

const rndDecrement = (base, len) => {
  const list = [];
  len = len || 3;
  while(len--){
    base -= rndRange();
    list.push(base);
  }
  return list;
}

const plusMinus = (base, op) => {
  return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
};

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


const rowFromArr = (arr, isAsk) => {
  const components = [];
  let len = arr.length;
  let shares, time;

  while(len--){
    shares = arr[len].shares || Math.floor(Math.random() * 1000);
    time = arr[len].time || randTime();

    components.push(
      <tr className={arr[len].userAdded ? 'user-added' : '' } key={len}>
        <td>{ isAsk ? arr[len].value.toFixed(2) : shares }</td>
        <td>{ isAsk ? shares : arr[len].value.toFixed(2) }</td>
      </tr>
    );
  }

  return components;
}

const sortBy = (value, desc) => {
  if(desc) {
    return (a,b) => {
      if(gt(a[value], b[value])){
        return -1;
      }
      if(lt(a[value], b[value])){
        return 1;
      }
    }
  }
  else {
    return (a,b) => {
      if(lt(a[value], b[value])){
        return -1;
      }
      if(gt(a[value], b[value])){
        return 1;
      }
    }
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
    const jsonGrid = window.opener.document.querySelector('#stock-example');
    const jsonModel = jsonGrid.getBehavior();
    rowInfo = jsonModel.getRow(location.search.split('=')[1]);
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
    }), []);

    this.setState(tmpState);
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
              <div className="ticker">{this.state.rowInfo.TICKER}</div>
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
