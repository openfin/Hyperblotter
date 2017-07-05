import React, { Component } from 'react';
import fin from '../vendor/openfin';
import Utils from './utils';

const {
  add,
  sub,
  rndRange,
} = Utils;

let start = null;

const urlData = location.search.split('&').map((i)=>{return i.split('=')[1]});

class TradeView extends Component {
  constructor(props){
    super(props);
    this.state = {
      class: 'tile',
  		ticker: urlData[0],
  		last: Number(urlData[1]),
      animationEndCount: 0
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
    console.log("EnterFrame --- ");
  }

  getBackgroundColor = () => {
    return Math.random() > .5 ? "#ff0000" : "#00DD00";
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
    console.log("openDetailedChartWindow [" + this.state.ticker + "]");
		
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
      console.log('created');
    },function(){
      console.log('closed');
    });
  }

  togglePinWindow = () => {
    const currentWindow = fin.desktop.Window.getCurrent();
    const parentWindow = window.opener.window;
    
    if(!parentWindow.pinnedWindows){
      parentWindow.pinnedWindows = {};
    };

    if(parentWindow.pinnedWindows[currentWindow.name]){
      parentWindow.pinnedWindows[currentWindow.name] = !parentWindow.pinnedWindows[currentWindow.name];

      if(!parentWindow.animationWindowsShowing) {
        currentWindow.hide();
      }
    } else {
      //if this doesn't exist this must be the first time.
      parentWindow.pinnedWindows[currentWindow.name] = true;
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
  		this.setState({
  			ticker: urlData[0],
  			last: Number(urlData[1])
  		});
  	}, 1000 + ( Math.floor(Math.random() * 1000) ) );
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

    if(parentWindow.pinnedWindows && parentWindow.pinnedWindows[currentWindow.name]){
      return {icon:"fa fa-lock"}
    } else {
      return {icon:"fa fa-unlock"};
    }
  }

  render = () => {
    console.log("RENDERING --- ", this.state.ticker);
		return (
			<div className="tile trade-cell" style={this.getTileStyle()} >
        <div className="window-control"></div>
        <div className="banner">
          <div className="title">
            {this.state.ticker}
          </div>
          <span className="lock" onClick={this.togglePinWindow}>
            <i className={ this.getPinnedWindowClass().icon } ></i>
          </span>
          <span className="chart" onClick={this.openDetailedChartWindow}>
            <i className="fa fa-bar-chart" ></i>
          </span>
        </div>
        <div className="content">
          <div className="main">
            <span className="last" >{ (this.state.last - rndRange()).toFixed(2) }</span>
            <span className="percent-change" >+%{rndRange().toFixed(2)}</span>
            <span className="purchase" onClick={() => this.showNotifications({ company: this.state.ticker, price: (this.state.last - rndRange()).toFixed(2)})}>
              <i className="fa fa-usd" ></i>
            </span>
          </div>
          <div className="pricing">
            <div className="price open">
              <div className="label">OPEN</div>
              <span className="value">{this.state.last.toFixed(2)}</span>
            </div>
            <div className="price high">
              <div className="label">HIGH</div>
              <span className="value">{ (this.state.last + rndRange()).toFixed(2) }</span>
            </div>
            <div className="price low">
              <div className="label">LOW</div>
              <span className="value">{ (this.state.last - rndRange() - 1).toFixed(2)  }</span>
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