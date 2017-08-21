import React, { Component } from 'react';
import fin from '../vendor/openfin';
import Utils from './utils';

const {
  add,
  sub,
  rndRange
} = Utils;

const percentChange = (initPrice, newPrice) => {
  let increase = newPrice - initPrice;
  let change = ((increase / initPrice) * 100).toFixed(2);

  if(change > 0) {
    change = "+" + change;
  }

  return change;
};

let start = null;

const urlData = location.search.split('&').map((i)=>{return i.split('=')[1]});

class TradeView extends Component {
  constructor(props){
    super(props);
    let last = Number(urlData[1]).toFixed(2);
    let price = (last - rndRange() + rndRange()).toFixed(2);

    this.state = {
      class: 'tile',
  		ticker: urlData[0],
  		last: last,
      animationEndCount: 0,
      grouped: false,
      pinned: false,
      high: ((Number(last) + rndRange()).toFixed(2)),
      low: (last - rndRange()).toFixed(2),
      price: price,
      change: percentChange(last, price)
    }
  }

  closeWindow = () => {
    fin.desktop.main(()=>{
			fin.desktop.Window.getCurrent().close();
		});
  }

  closeApp = () => {
    fin.desktop.main(function(){
		  fin.desktop.Application.getCurrent().close();
		});
  }

  minApp = () => {
    fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().minimize();
		});
  }

  onEnterFrame = () => {
    // console.log("EnterFrame --- ");
  }

  getBackgroundColor = () => {
    let negChange = this.state.price < this.state.last;
    return negChange ? "#ff0000" : "#00DD00";
  }

  getTileStyle = () => {
    return{ "backgroundColor": this.getBackgroundColor() }
  }

  step = (timestamp) => {
    if (!start) start = timestamp;
    //
    //var progress = timestamp - start;
    //console.log("STEP CALLED .... ", timestamp)
    //
    //element.style.left = Math.min(progress/10, 200) + "px";
    //if (progress < 2000) {
    //    console.log("TOW SECNDS");
    //}
    //window.requestAnimationFrame(this.step);
  }

  openDetailedChartWindow = () => {
		fin.desktop.InterApplicationBus.publish('tickerSelection', {
			symbolName: this.state.ticker
		});
  }

  showNotifications = (data) => {
    const notification = new fin.desktop.Notification({
      url: 'purchaseNotification.html',
      message: data,
      timeout: -1,
      onMessage: (message) => {
        var companyNodes = document.querySelectorAll('.company');
        var priceNodes = document.querySelectorAll('.purchasePrice');

        Array.prototype.forEach.call(companyNodes, (node)=>{
          node.innerHTML = message.company;
        });

        Array.prototype.forEach.call(priceNodes, (node)=>{
          node.innerHTML = '$'+message.price;
        });

        document.querySelector('.purchaseFeedback').classList.add('slide-in-out');
      }
    },function(){
      // console.log('created');
    },function(){
      // console.log('closed');
    });
  }

  undock = () => {
    const windowName = fin.desktop.Window.getCurrent().name;

    fin.desktop.InterApplicationBus.publish('undock-window', {windowName}, () => {
      console.log('undocked');
    });

  }

  togglePinWindow = () => {
    const currentWindow = fin.desktop.Window.getCurrent();
    const parentWindow = window.opener.window;

    if(this.state.pinned){
      parentWindow.unPinwindow(currentWindow);
      this.setState({pinned: false});
    }else{
      parentWindow.pinWindow(currentWindow)
      console.log(this.state.pinned, parentWindow.pinnedWindows);
      this.setState({pinned: true});
    }
  }

  componentDidMount = () => {
    setTimeout(function(){
		  try{
			  fin.desktop.Window.getCurrent().bringToFront();
		  }catch(err){
			  //--
		  }
      }, 2000);

    window.requestAnimationFrame(this.step);

  	setInterval(()=>{
      let last = Number(urlData[1]).toFixed(2);
      let price = (last - rndRange() + rndRange()).toFixed(2);

  		this.setState({
  			ticker: urlData[0],
  			last: last,
        high: (Number(last) + rndRange()).toFixed(2),
        low: (last - rndRange()).toFixed(2),
        price: price,
        change: percentChange(last, price)
  		});

  	}, 1000 + ( Math.floor(Math.random() * 1000) ) );

    fin.desktop.InterApplicationBus.subscribe('*', 'window-docked', this.onDock);
    fin.desktop.InterApplicationBus.subscribe('*', 'window-undocked', this.onUnDock);

  }

  onDock = () => {
    fin.desktop.Window.getCurrent().getGroup((windowGroup) => {
      /* right now this call to .getGroup() returns undefined
       * if a window is in a group we want to handle that as well
       */
      if(!windowGroup || windowGroup.length > 0){
        this.setState({
          grouped: true
        })
      }
    })
  }

  onUnDock = () => {
    fin.desktop.Window.getCurrent().getGroup((windowGroup) => {
      if(windowGroup && windowGroup.length === 0){
        this.setState({
          grouped: false
        })
      }
    })
  }

  countAnimations = () => {
    this.state.animationEndCount++;
    // there are 3 animations we want to remove the class after they all finish
    if(this.state.animationEndCount === 3){
      document.querySelector('.purchaseFeedback').classList.remove('slide-in-out');
      this.state.animationEndCount = 0;
    }
  }

  getPinnedWindowClass = () => {
    const currentWindow = fin.desktop.Window.getCurrent();
    const parentWindow = window.opener.window;
    console.log(parentWindow.pinnedWindows, parentWindow.pinWindow, parentWindow.unPinwindow, 'windows state');

    if(parentWindow.pinnedWindows && parentWindow.pinnedWindows[currentWindow.name]){
      return {icon:"fa fa-thumb-tack"}
    } else {
      return {icon:"fa fa-thumb-tack grey"};
    }
  }

  getGroupClass = () => {
    return this.state.grouped ? 'group' : 'group disabled';
  }

  render = () => {
		return (
			<div className="tile trade-cell" style={this.getTileStyle()} >
        <div className="window-control"></div>
        <div className="banner">
          <div className="title">
            {this.state.ticker}
          </div>
          <span className="pinner" id="pin-window" onClick={this.togglePinWindow}>
            <i className={ this.getPinnedWindowClass().icon } ></i>
          </span>
          <span className="chart" id="chart-window" onClick={this.openDetailedChartWindow}>
            <i className="fa fa-bar-chart" ></i>
          </span>
        </div>
        <div className="content">
          <div className="main">
            <span className="present-price" >{ this.state.price }</span>
            <span className="percent-change" >{ this.state.change }%</span>
            <div className="icon-set-group">
              <span className="purchase" id="buy-button" onClick={() => this.showNotifications({ company: this.state.ticker, price: (this.state.price)})}>
                <p>BUY</p>
              </span>
              <span className={this.getGroupClass()} onClick={() => this.undock() }>
                <i className="fa fa-link" ></i>
              </span>
            </div>
          </div>
          <div className="pricing">
            <div className="price open">
              <div className="label">OPEN</div>
              <span className="value">{ this.state.last }</span>
            </div>
            <div className="price high">
              <div className="label">HIGH</div>
              <span className="value">{ this.state.high }</span>
            </div>
            <div className="price low">
              <div className="label">LOW</div>
              <span className="value">{ this.state.low }</span>
            </div>
          </div>
        </div>
        <div className="purchaseFeedback" onAnimationEnd={ this.countAnimations } onContextMenu={ (e) => e.preventDefault() }>
          <h3 className="header">Purchase Notification</h3>
          <h2 className="company"></h2>
          <h3 className="purchasePrice"></h3>
          <p className="description">You've just purchased <b>100</b> units of <span className="company"></span> stock at <span className="purchasePrice"></span> each.</p>
        </div>
			</div>
		);
  }
}

export default TradeView;
