var React = require('react'),
    EikonLink = require('../javascript/eikon/EikonLink'),
    elink;


var EikonDashboard = React.createClass({
    getInitialState: function() {
        return {
            menuShowing: false
        };
    },
    onClick: function(){

    },
    componentDidMount:function(){
        eLink = new EikonLink();

        eLink.connect().then((value)=>{
            eLink.mclGetAppList().then((lst)=>{
                console.log( "The list in dashboard ------ ", lst );
                // _appList.setData(lst);
            });
        }).catch((err)=>{ console.log("ERROR CAUGHT: ",err)});

    },
    render: function() {
        return <div className="eikon-dashboard" >
            <div className={this.state.menuClass}>
                <div className="drag-area" >
                This is the drag area</div>
                <div>
                    <h1>THIS IS THE EIKON PAGE</h1>
                </div>
            </div>
        </div>
    }
});

module.exports = EikonDashboard;

React.render(<EikonDashboard />, document.body);