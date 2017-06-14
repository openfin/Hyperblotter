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
  plusMinus = function(base, op){
    return parseInt(Math.random() * 10) % 2 ? add(base, op) : sub(base, op);
  };

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
    return Math.random() > .5 ? "#ff0000" : "#00DD00";
  },

  getTileStyle: function(){
    return{ "backgroundColor": this.getBackgroundColor() }
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

	showNotifications: function(data){
    var notification = new fin.desktop.Notification({
      url: 'purchaseNotification.html',
      message: data,
      timeout: -1,
      onMessage: (message) => {
        var companyNodes = document.querySelectorAll('.company');
        var priceNodes = document.querySelectorAll('.price');

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
	},

togglePinWindow: function() {
    var currentWindow = fin.desktop.Window.getCurrent();
    var parentWindow = window.opener.window;
    
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
  },

  getInitialState: function () {
  	return {
  		class: 'tile',
  		ticker: urlData[0],
  		last: Number(urlData[1]),
      animationEndCount: 0
  	}
  },

  componentDidMount: function(){
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
  },

  componentWillUnmount:function(){
    console.log("componentWillUnmount ----- trade-view.js ");
  },

  countAnimations(){
    this.state.animationEndCount++;
    // there are 3 animations we want to remove the class after they all finish
    if(this.state.animationEndCount === 3){
      document.querySelector('.purchaseFeedback').classList.remove('slide-in-out');
      this.state.animationEndCount = 0;
    }
  },

  getPinnedWindowClass:function(){
    var currentWindow = fin.desktop.Window.getCurrent();
    var parentWindow = window.opener.window;

    if(parentWindow.pinnedWindows && parentWindow.pinnedWindows[currentWindow.name]){
      return {icon:"fa fa-lock"}
    } else {
      return {icon:"fa fa-unlock"};
    }
  },

	render: function(){
    console.log("RENDERING --- ", this.state.ticker);
		return (
			<div className='tile trade-cell' style={this.getTileStyle()} onContextMenu={ (e) => e.preventDefault() }>
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
            <span className="last" >{this.state.last.toFixed(2)}</span>
            <span className="percent-change" >+%{rndRange().toFixed(2)}</span>
            <span className="purchase" onClick={() => this.showNotifications({ company: this.state.ticker, price: this.state.last.toFixed(2)})}>
              <i className='fa fa-usd' ></i>
            </span>
          </div>
          <div className="pricing">
            <div className="price open">
              <div className="label">OPEN</div>
              <span className="value">{ (this.state.last - rndRange()).toFixed(2) } </span>
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
          <h3 className="price"></h3>
          <p className="description">You've just purchased <b>100</b> units of <span className="company"></span> stock at <span className="price"></span> each.</p>
        </div>
			</div>
		);
	}
});

/*

 <i onClick={this.minApp} className="fa fa-minus"></i>
 <i onClick={this.closeWindow} className="fa fa-times"></i>

 */