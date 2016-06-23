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
    render: function(){
        return (
            <div className="eikon-button">

                <div><i className="eikon-cell fa fa-bullseye" aria-hidden="true"></i></div>
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
            eikonApps: []
        };
    },
    onClick: function(){

    },
    refresh:function(){
        eLink.mclGetAppList().then((lst)=>{
            this.setState({eikonApps: lst});
        });
    },
    componentDidMount:function(){
        eLink = new EikonLink();
        var _this = this;
        fin.desktop.main(function(){
            "++++++++++++++ FIN DESKTOP MAIN -- ";
            fin.desktop.InterApplicationBus.subscribe("*",
                eikonEnums.EIKON_CLOSED,
                function (message, uuid) {
                    var finWindow = fin.desktop.Window.getCurrent();
                    finWindow.close();
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
    render: function() {
        return  <div>
                    <div className={this.state.menuClass}>
                        {this.state.eikonApps.map((d,i)=>{
                            return <AppButton data={d} />
                        })}
                    </div>
                </div>
    }
});

module.exports = EikonDashboard;

React.render(<EikonDashboard />, document.querySelector('#eikon-holder'));