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

require('./bloomberg-plugin-client.js');
var bloombergSession; // bloomberg session will be stored here

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
        if (!this.state.useBloombergData) {
            return {};
        }
        return this.state.bloombergData.RT_PX_CHG_PCT_1D >= 0 ? {color: '#00A500'} : {color: '#FF0000'};
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
        var ticker = this.state.ticker;
        var that = this;
        fin.desktop.main(()=> {
            fin.desktop.InterApplicationBus.subscribe('*', 'use bloomberg data', function(m) {
                that.setState({
                    useBloombergData: m
                });

                // Bloomberg session termination
                function terminateSession() {
                    if (bloombergSession !== undefined) {
                        bloombergSession.destroy();
                        bloombergSession = undefined;
                    }
                }

                // Create Bloomberg session and subscribe to data
                if (m === true) {
                    var serviceId = 1;
                    var requestId = 2;

                    bloombergSession = new fin.desktop.Plugins.blpapi.Session();

                    bloombergSession.on('SessionStarted', function(m) {
                        bloombergSession.openService('//blp/mktdata', serviceId);
                    });

                    bloombergSession.on('ServiceOpened', function(m) {
                        if (m.correlations[0].value === serviceId) {
                            bloombergSession.subscribe([{
                                security: ticker + ' US Equity',
                                correlation: requestId,
                                fields: ['LAST_PRICE', 'RT_PX_CHG_PCT_1D', 'OPEN', 'HIGH', 'LOW']
                            }]);
                        }
                    });

                    bloombergSession.on('MarketDataEvents', function(m) {
                        if (m.correlations[0].value === requestId) {
                            console.log(m.data);
                        }
                    });

                    bloombergSession.on('SessionTerminated', terminateSession);
                    bloombergSession.start();
                } else {
                    terminateSession();
                }
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
  },
    componentWillUnmount:function(){
        // console.log("componentWillUnmount ----- trade-view.js ");
    },
	render: function(){
        // console.log("RENDERING --- ", this.state.ticker);
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
						<span className={"last" + (this.state.useBloombergData ? ' bloomberg' : '')} >{ this.state.useBloombergData ? this.state.bloombergData.LAST_PRICE.toFixed(2) : this.state.last.toFixed(2) }</span>
						<span className="percent-change" style={this.getColorBasedOnPlusMinus()}>{this.state.useBloombergData ? (this.state.bloombergData.RT_PX_CHG_PCT_1D >= 0 ? '+' : '-') : this.state.plusMinus}%{ this.state.useBloombergData ? this.state.bloombergData.RT_PX_CHG_PCT_1D.toFixed(2) : rndRange().toFixed(2) }</span>
					</div>
					<div className="pricing">
						<div className="price open">
							<div className="label">OPEN</div>
							<span className="value">{ this.state.useBloombergData ? this.state.bloombergData.OPEN.toFixed(2) : (this.state.last - rndRange()).toFixed(2) } </span>
						</div>
						<div className="price high">
							<div className="label">HIGH</div>
							<span className="value">{ this.state.useBloombergData ? this.state.bloombergData.HIGH.toFixed(2) : (this.state.last + rndRange()).toFixed(2) }</span>
						</div>
						<div className="price low">
							<div className="label">LOW</div>
							<span className="value">{ this.state.useBloombergData ? this.state.bloombergData.LOW.toFixed(2) : (this.state.last - rndRange() - 1).toFixed(2)  }</span>
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