/**
 * Created by grahamclapham on 27/07/15.
 */
'use strict'
var React = require('react');

var TooltipDecorator =  React.createClass({
    getInitialState:function(){
        return {showing:false, width: '56px'};
    },
    getDefaultProps: function(){
        return {legend: "Hello"}
    },
    componentWillMount:function(){
        //--
    },
    componentWillUnmount: function() {
        //--
    },
    componentDidMount:function(){
        //--

    },
    componentWillReceiveProps:function(newVal){
        //--
    },
    componentWillUpdate:function( nextProps,  nextState){
        //--
    },
    componentDidUpdate:function( prevProps,  prevState){
        //--
    },
    onRollOver:function(){
        this.setState({showing: true});
    },
    onRollOut:function(){
        this.setState({showing: false});
    },
    getStyle:function(){
        var _opacity = this.state.showing ? .7 : 0;
        var _top = this.state.showing ? "-4px" : "10px";
        var _width = this.state.width+"px";

        return {
            "WebkitTransition": ".5s ease-in-out",
            "MozTransition": ".5s ease-in-out",
            "OTransition": ".5s ease-in-out",
            "transition": ".5s ease-in-out",
            opacity:_opacity,
            top: _top,
            width: _width
        }
    },
    /*
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.id !== this.props.id;
    },
    */
    statics: {
        /*
        customMethod: function(foo) {
            return foo === 'bar';
        }
        */
    },
    render:function(){
        return (<div
            className="tooltip-decorator"
            onMouseOver={this.onRollOver}
            onMouseOut={this.onRollOut}
            >
            <div className="tooltip" style={this.getStyle()} >{this.props.legend}</div>
            <div className="tooltip-content" >{this.props.children}</div>
        </div>);
    }
})

module.exports =  TooltipDecorator;