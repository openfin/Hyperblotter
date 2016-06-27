var React = require('react'),
    EikonLink = require('../javascript/eikon/EikonLink'),
    eikonEnums = require('../javascript/eikon/EikonEnums'),
    elink;


var AppButton = React.createClass({
    /*
     appId: "Graph"
     instanceId: "23795968"
     isLinked: false
     name: "Chart GOOG.O"
     */
    onClick:function(){

    },
    onHover:function(){
        var _this = this;
        console.log("on hover -- ", _this.props.data.instanceId)
        fin.desktop.main(function(){
            fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_APP_HOVERED, {
                instanceId: _this.props.data.instanceId, type: eikonEnums.EIKON_APP_HOVERED
            });
        });
    },
    onUnHover:function(){
        var _this = this;
        fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_APP_UNHOVERED, {
            instanceId: _this.props.data.instanceId, type: eikonEnums.EIKON_APP_UNHOVERED
        });
    },
    linkApp:function(){
        console.log("LINK APP -- ", this.props.data.instanceId)
        var _this = this;
        fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_LINK_APP, {
            instanceId: _this.props.data.instanceId, type: eikonEnums.EIKON_LINK_APP
        });
    },
    unlinkApp:function(){
        console.log("UN LINK APP -- ", this.props.data.instanceId);
        var _this = this;
        fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_UNLINK_APP, {
            instanceId: _this.props.data.instanceId, type: eikonEnums.EIKON_UNLINK_APP
        });
    },
    getDefaultProps:function(){
        return {data: {
                        appId: "Graph",
                        instanceId: "23795968",
                        isLinked: false,
                        name: "Chart GOOG.O"
                        }
        }
    },
    getLinkEikon:function(){
        return this.props.data.isLinked ? <i onClick={this.unlinkApp} className="eikon-cell fa fa-chain-broken" aria-hidden="true"></i> :
            <i onClick={this.linkApp}  className="eikon-cell fa fa-link" aria-hidden="true"></i>;
    },
    getClass:function(){
        return this.props.data.isLinked ? "eikon-button linked" : "eikon-button"
    },
    render: function(){
        return (
            <div className={this.getClass()}>

                <div onMouseOver  = {this.onHover}
                     onMouseLeave = {this.onUnHover}
                     onMouseOut   = {this.onUnHover}
                     onMouseLeave = {this.onUnHover}
                    ><i className = "eikon-cell fa fa-eye" aria-hidden="true"></i></div>
                <div>{this.getLinkEikon()}</div>
                <div className="eikon-cell-text">
                    {this.props.data.name} :
                    {this.props.data.appId}
                    {this.props.data.instanceId}
                </div>
            </div>
        )
    }
});

var EikonDashboard = React.createClass({
    getInitialState: function() {
        return {
            eikonApps: [],
            RIC: 'GOOG.O'
        };
    },
    onClick: function(){

    },
    refresh:function(){
        var _this = this
        eLink.mclGetAppList().then((lst)=>{
            this.setState({eikonApps: lst});
        });
    },

    newChart:function(){
        eLink.mcLaunchApp('Graph', this.state.RIC);
    },
    newNews:function(){
        eLink.mcLaunchApp('News', this.state.RIC);
    },
    newQuote:function(){
        eLink.mcLaunchApp('Quote Object', this.state.RIC);
    },


    componentDidMount:function(){
        eLink = new EikonLink();
        var _this = this;
        fin.desktop.main(function(){
            "++++++++++++++ FIN DESKTOP MAIN -- ";
            fin.desktop.InterApplicationBus.subscribe("*",
                eikonEnums.EIKON_CLOSED,
                function (message, uuid) {
                    console.log("CLOSE HAS BEEN CALLED -- ", message," uuid ", uuid);
                    var finWindow = fin.desktop.Window.getCurrent();
                    // finWindow.close();
                },
                function(){console.log(">>>>>>> Subscribing to CLOSE EVENT . ",eikonEnums.EIKON_CLOSED)},
                function(){console.log(">>>>>>> FAIL Subscribing to CLOSE EVENT . ",eikonEnums.EIKON_CLOSED)});
        });

        eLink.connect().then((value)=>{
            var intv = setInterval(function(){
                _this.refresh();
            }, 2000);
        }).catch((err)=>{ console.log("ERROR CAUGHT: ",err)});
    },
    sendContext(){
        _this = this
        fin.desktop.main(function(){
            fin.desktop.InterApplicationBus.publish(eikonEnums.EIKON_SEND_CONTEXT, {
                RIC: _this.state.RIC, type: eikonEnums.EIKON_SEND_CONTEXT
            });
        });
    },
    inputChange:function(e){
        this.setState({RIC: e.target.value})
    },
    onFocusCallback:function(){
        this.setState({RIC: ""})
    },
    render: function() {
        return  <div className="eikon-holder">
                    <div className={this.state.menuClass}>
                        <div className='eikon-header'>
                            <div className="eikon-tile-bar">
                                <img src="images/eikon_logo.png" alt="" />  <h2>Linked to Eikon</h2>
                            </div>


                            <input value ={this.state.RIC}
                                   onChange={this.inputChange}
                                   onFocus={this.onFocusCallback}
                                   type="search"
                                   placeholder="Enter RIC code"
                                   className="searchbox"
                                />
                            <button onClick={this.sendContext} id = "eikon-chart-btt">Send context <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> </button> Current RIC: {this.state.RIC}
                            <hr />

                            <button onClick={this.newChart} id = "btn btn-primary eikon-chart-btt"><i className="fa fa-area-chart" aria-hidden="true"></i> Chart </button>
                            <button onClick={this.newNews} id = "btn btn-primary eikon-news-btt"><i className="fa fa-newspaper-o" aria-hidden="true"></i> News </button>
                            <button onClick={this.newQuote} id = "btn btn-primary eikon-quote-btt"><i className="fa fa-money" aria-hidden="true"></i> Quote</button>
                        </div>
                        <div className="eikon-app-holder">
                        {this.state.eikonApps.map((d,i)=>{
                            return <AppButton data={d} />
                        })}
                        </div>
                    </div>
                </div>
    }
});

module.exports = EikonDashboard;

React.render(<EikonDashboard />, document.querySelector('#eikon-holder'));