var React = require('react'),
    eikonEnums = require('../eikon/EikonEnums'),
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

fin.desktop.main(()=>{

    fin.desktop.InterApplicationBus.subscribe("*",
        eikonEnums.EIKON_OPEN,
        function (message, uuid) {
            console.log("THE TRADE VIEW -- EIKON AVAILABLE : ", message," uuid ", uuid);
            hasEikon = true;
        },
        function(){console.log("Eikon TRADE VIEW interapp success. ")},
        function(){console.log("Eikon TRADE VIEW interapp Fail. ")});
    ///-----

    fin.desktop.InterApplicationBus.subscribe("*",
        eikonEnums.EIKON_UNAVAILABLE,
        function (message, uuid) {
            console.log("THE TRADE VIEW -- EIKON AVAILABLE : ", message," uuid ", uuid);
            hasEikon = false;
        },
        function(){console.log("Eikon TRADE VIEW interapp success. ")},
        function(){console.log("Eikon TRADE VIEW interapp Fail. ")});
    ///-----

});
//----------------

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
    sendEikonMessage(){
        fin.desktop.main(function(){
            fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_SEND_CONTEXT, {
                RIC: "IBM", instrument: "News"
            });
        });
    },
    sendEikonContext(){
        console.log("sendEikonContext ");
        var _ticker = this.state.ticker;
        fin.desktop.main(function(){
            fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_SEND_CONTEXT, {
                RIC: _ticker, type: eikonEnums.EIKON_SEND_CONTEXT
            });
        });
    },
    onEnterFrame:function(){
        console.log("EnterFrame --- ");
    },
    getBackgroundColor:function(){
        return Math.random() > .5 ? "#ff0000" : "#00DD00";
    },
    getTileStyle: function(){
        return{ "backgroundColor": this.getBackgroundColor()
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
            eikon: true
        }
    },
    componentDidMount: function(){
        var _this = this
        fin.desktop.main(()=>{
            console.log("This is the Trade view -- and Fin is available... ");
            var finWindow = fin.desktop.Window.getCurrent();
            finWindow.getOptions(function (options) {
                console.log(">>>>> THE WINDOW OPTIONS ARE : ",options.name.split("_")[0]);
                options.name.split("_")[0] === 'eikon' ?  _this.setState({eikon: true}) : _this.setState({eikon: false});
            });
        });

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
                last: Number(urlData[1])
            });
        }, 1000 + ( Math.floor(Math.random() * 1000) ) );
    },
    componentWillUnmount:function(){
        console.log("componentWillUnmount ----- trade-view.js ");
    },
    render: function(){
        return (
            <div className='tile trade-cell' style={this.getTileStyle()}>
                <div className="window-control" />
                <div className="banner">
                    <div className="title">
                        {this.state.ticker}
                        <i className="fa fa-bar-chart" onClick={this.openDetailedChartWindow} />
                    </div>

                </div>
                <div className="content">
                    <div className="main">
                        <span className="last" >{this.state.last.toFixed(2)}</span>
                        <span className="percent-change" >+%{rndRange().toFixed(2)}</span>
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
                        <div className="eikon-tile-button nodrag" >
                            <img src="images/eikon_logo.png" alt="eikon" onClick={this.sendEikonContext} />
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