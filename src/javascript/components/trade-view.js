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
    },
    round2 = function(num) {
        return Math.round(num * 100) / 100;
    };

window.io = require('socket.io-client');

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
        let priceChange = this.state._change;
        if (!this.state.useBloombergData || priceChange === 0) {
            return {color: 'inherit'};
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

        // Bloomberg-related
        useBloombergData: false,
        bloombergDataDetected: false,
        LAST_TRADE: 0,
        _change: 0, // price change in dollars and cents
        OPEN: 0,
        HIGH: 0,
        LOW: 0
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

            // Receive Bloomberg data here
            fin.desktop.InterApplicationBus.subscribe('*', 'tile' + urlData[2], function(m) {
                lastBloombergDataUpdate = m;

                // Mark that we have received data
                if (that.state.bloombergDataDetected !== true) {
                    that.setState({bloombergDataDetected: true});
                }

                var bbOpen, bbHigh, bbLow;
                bbOpen = m.data.OPEN_TDY || m.data.OPEN;
                bbHigh = m.data.HIGH_TDY || m.data.HIGH;
                bbLow = m.data.LOW_TDY || m.data.LOW;

                if (typeof bbOpen === 'number') {
                    that.setState({OPEN: round2(bbOpen)});
                }
                if (typeof bbHigh === 'number') {
                    that.setState({HIGH: round2(bbHigh)});
                }
                if (typeof bbLow === 'number') {
                    that.setState({LOW: round2(bbLow)});
                }
                if (typeof m.data.LAST_TRADE === 'number') {
                    // Round it here to show proper change with 2 decimals
                    var lastTrade = round2(m.data.LAST_TRADE);

                    if (that.state.LAST_TRADE === 0) {
                        // Initial _change where we don't have previous price
                        if (typeof m.data.LAST2_TRADE === 'number') {
                            that.setState({_change: round2(lastTrade - m.data.LAST2_TRADE)});
                        }
                    } else {
                        // Use previous price to calculate change
                        that.setState({_change: round2(lastTrade - that.state.LAST_TRADE)});
                    }

                    // important!: keep it here to update last, need to calculate _change before this update
                    that.setState({LAST_TRADE: lastTrade});
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

      setInterval(function() {
          if (lastBloombergDataUpdate) {
              console.log('Throttled BB data: ', lastBloombergDataUpdate);
              lastBloombergDataUpdate = null;
          }
      }, 5000);
  },
    renderPlusMinus() {
        var priceChange = this.state._change;
        if (priceChange === 0) {
            return '';
        } else if (priceChange > 0) {
            return '+';
        } else {
            return '-';
        }
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
						<span className={"last" + (this.state.useBloombergData ? ' bloomberg' : '')} >{ this.state.useBloombergData ? this.state.LAST_TRADE.toFixed(2) : this.state.last.toFixed(2) }</span>
						<span className="percent-change" style={this.getColorBasedOnPlusMinus()}>
                            <span>{this.renderPlusMinus()}</span>
                            <span className="price-change-number">{ this.state.useBloombergData ? Math.abs(this.state._change).toFixed(2) : rndRange().toFixed(2) }</span>
                        </span>
                        <span className="bloomberg-messages" style={ (this.state.useBloombergData && !this.state.bloombergDataDetected) ? {} : {display: 'none'} }>Waiting for data...</span>
					</div>
					<div className="pricing">
						<div className="price open">
							<div className="label">OPEN</div>
							<span className="value">{ this.state.useBloombergData ? this.state.OPEN.toFixed(2) : (this.state.last - rndRange()).toFixed(2) } </span>
						</div>
						<div className="price high">
							<div className="label">HIGH</div>
							<span className="value">{ this.state.useBloombergData ? this.state.HIGH.toFixed(2) : (this.state.last + rndRange()).toFixed(2) }</span>
						</div>
						<div className="price low">
							<div className="label">LOW</div>
							<span className="value">{ this.state.useBloombergData ? this.state.LOW.toFixed(2) : (this.state.last - rndRange() - 1).toFixed(2)  }</span>
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