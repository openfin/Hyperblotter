var React = require('react'),
		fin = require('../vendor/openfin.js'),
        start = null,
		add = function(a,b){
      return a + b;
    },
    sub = function(a,b){
      return a - b;
    },
    rndRange = function () {
      return Math.floor(Math.random() * 10 % 5) / 10;
    },
    randomPlusMinus = function() {
        return (Math.round(Math.random() * 10) % 2 === 0) ? '+' : '-';
    },
    plusMinus = function(base, op){
      return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
    };

window.io = require('socket.io-client');

var bloombergSession; // bloomberg session will be stored here
var lastBloombergDataUpdate; // used for throttling console log

var urlData = location.search.split('&').map((i)=>{return i.split('=')[1]});

module.exports = React.createClass({
	closeWindow: ()=>{
  	fin.desktop.main(()=>{
  		fin.desktop.Window.getCurrent().close();
  	});
  },
  closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Application.getCurrent().close();
		});
	},
	closeWindow: function(){
		var finWindow = fin.desktop.Window.getCurrent();
		finWindow.close();
	},
	//-- min app is not currently being used but remains here for possible future use.
	minApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().minimize();
		});
	},
    onEnterFrame:function(){
        console.log("EnterFrame --- ");
    },
    getBackgroundColor:function(){
        if (this.state.useBloombergData) {
            return '#000';
        } else {
            return Math.random() > .5 ? "#ff0000" : "#00DD00";
        }
    },
    getTileStyle: function(){

        return{ "backgroundColor": this.getBackgroundColor()

        }
    },
    getColorBasedOnPlusMinus: function() {
        let priceChange = this.state.bloombergData.RT_PX_CHG_PCT_1D;
        if (!this.state.useBloombergData || typeof priceChange !== 'number') {
            return {};
        }
        if (priceChange > 0) {
            return {color: '#00A500'};
        }
        if (priceChange < 0) {
            return {color: '#FF0000'};
        }
    },
    step: function(timestamp){
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
	},
	openDetailedChartWindow: function(){
		console.log("openDetailedChartWindow [" + this.state.ticker + "]");
		
		fin.desktop.InterApplicationBus.publish('tickerSelection', {
			symbolName: this.state.ticker
		});
    },

  getInitialState: function () {

  	return {
  		class: 'tile',
  		ticker: urlData[0],
  		last: Number(urlData[1]),
        useBloombergData: false,
        bloombergDataDetected: false,
        bloombergIsConnected: false,
        bloombergData: {
            LAST_PRICE: 0,
            RT_PX_CHG_PCT_1D: 0, // Real-Time Price Change 1 Day Percent
            OPEN: 0,
            HIGH: 0,
            LOW: 0
        }
  	}
  },
    componentWillMount: function() {
        var that = this;

        fin.desktop.main(()=> {

            // Know when to show fake or real Bloomberg data
            fin.desktop.InterApplicationBus.subscribe('*', 'use bloomberg data', function(m) {
                that.setState({
                    useBloombergData: m
                });
            });

            // Know if was able to connect to Bloomberg
            fin.desktop.InterApplicationBus.subscribe('*', 'bloomberg connected', function(m) {
                that.setState({
                    bloombergIsConnected: m
                });
            });

            // Receive Bloomberg data here
            fin.desktop.InterApplicationBus.subscribe('*', 'tile' + urlData[2], function(m) {
                lastBloombergDataUpdate = m;

                that.setState({
                    bloombergDataDetected: true,
                    bloombergData: {
                        LAST_PRICE: m.data.LAST_PRICE || m.data.LAST_PRICE_TDY || m.data.LAST2_TRADE || m.data.LAST_CONTINUOUS_TRADE_PRICE_RT,
                        RT_PX_CHG_PCT_1D: m.data.RT_PX_CHG_PCT_1D || m.data.RT_PX_CHG_NET_1D,
                        OPEN: m.data.OPEN || m.data.OPEN_TDY || m.data.OPEN_TRADE_PRICE_REALTIME || m.data.OPEN_TRADE_PRICE_TODAY_RT,
                        HIGH: m.data.HIGH || m.data.HIGH_TDY || m.data.HIGH_TRADE_PRICE_RT || m.data.HIGH_TRADE_PRICE_TODAY_RT,
                        LOW: m.data.LOW || m.data.LOW_TDY || m.data.LOW_TRADE_PRICE_RT || m.data.LOW_TRADE_PRICE_TODAY_RT
                    }
                });
            });
        });
    },
  componentDidMount: function(){

	  setTimeout(function(){

		  try{
			  fin.desktop.Window.getCurrent().bringToFront();
		  }catch(err){
			  //--
		  }
      },2000);


      window.requestAnimationFrame(this.step);

  	setInterval(()=>{
  		this.setState({
  			ticker: urlData[0],
  			last: Number(urlData[1]),
            plusMinus: randomPlusMinus()
  		});
  	}, 1000 + ( Math.floor(Math.random() * 1000) ) );

      setInterval(function() {
          if (lastBloombergDataUpdate) {
              console.log('Throttled BB data: ', lastBloombergDataUpdate);
              lastBloombergDataUpdate = null;
          }
      }, 5000);
  },
    componentWillUnmount:function(){
    },
    renderBloombergData: function(propName) {
        let bloombergData = this.state.bloombergData[propName];
        if (typeof bloombergData !== 'number') {
            bloombergData = 0;
        }
        return bloombergData.toFixed(2);
    },
    renderBloombergPlusMinus: function(v) {
        let result = '';
        if (typeof v === 'number') {
            if (v > 0) {
                result = '+';
            } else if (v < 0) {
                result = '-';
            }
        }
        return result;
    },
	render: function(){
		return (
			<div className={'tile trade-cell' + (this.state.useBloombergData ? ' bloomberg' : '')} style={this.getTileStyle()}>
				<div className="window-control" />
				<div className="banner">
					<div className="title">
						{this.state.ticker}
						<i className="fa fa-bar-chart" onClick={this.openDetailedChartWindow} />
					</div>
				</div>
				<div className="content">
					<div className="main">
						<span className={"last" + (this.state.useBloombergData ? ' bloomberg' : '')} >{ this.state.useBloombergData ? this.renderBloombergData('LAST_PRICE') : this.state.last.toFixed(2) }</span>
						<span className="percent-change" style={this.getColorBasedOnPlusMinus()}>{this.state.useBloombergData ? this.renderBloombergPlusMinus(this.state.bloombergData.RT_PX_CHG_PCT_1D) : this.state.plusMinus}%{ this.state.useBloombergData ? this.renderBloombergData('RT_PX_CHG_PCT_1D') : rndRange().toFixed(2) }</span>
                        <span className="bloomberg-messages" style={ (this.state.useBloombergData && this.state.bloombergIsConnected && !this.state.bloombergDataDetected) ? {} : {display: 'none'} }>Waiting for Bloomberg data...</span>
                        <span className="bloomberg-messages" style={ (this.state.useBloombergData && !this.state.bloombergIsConnected && !this.state.bloombergDataDetected) ? {} : {display: 'none'} }>No Bloomberg connection</span>
					</div>
					<div className="pricing">
						<div className="price open">
							<div className="label">OPEN</div>
							<span className="value">{ this.state.useBloombergData ? this.renderBloombergData('OPEN') : (this.state.last - rndRange()).toFixed(2) } </span>
						</div>
						<div className="price high">
							<div className="label">HIGH</div>
							<span className="value">{ this.state.useBloombergData ? this.renderBloombergData('HIGH') : (this.state.last + rndRange()).toFixed(2) }</span>
						</div>
						<div className="price low">
							<div className="label">LOW</div>
							<span className="value">{ this.state.useBloombergData ? this.renderBloombergData('LOW') : (this.state.last - rndRange() - 1).toFixed(2)  }</span>
						</div>
					</div>
				</div>
			</div>
		);
	}
});

/*

 <i onClick={this.minApp} className="fa fa-minus"></i>
 <i onClick={this.closeWindow} className="fa fa-times"></i>

 */