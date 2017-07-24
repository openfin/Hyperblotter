import React, { Component } from 'react';

class TooltipDecorator extends Component{
    constructor(props){
        super(props);
        this.state = {
            showing: false
        }
    }

    onRollOver = () => {
        this.setState({
            showing: true
        });
    }

    onRollOut = () => {
        this.setState({
            showing: false
        });
    }

    getStyle = () => {
        return {
            "WebkitTransition": ".5s ease-in-out",
            "MozTransition": ".5s ease-in-out",
            "OTransition": ".5s ease-in-out",
            "transition": ".5s ease-in-out",
            opacity: this.state.showing ? .7 : 0,
            top: this.state.showing ? "-4px" : "10px"
        }
    }

    render = () => {
        return (
            <div
                className="tooltip-decorator"
                onMouseOver={this.onRollOver}
                onMouseOut={this.onRollOut}>
                <div className="tooltip" style={this.getStyle()} >{this.props.legend}</div>
                <div className="tooltip-content" >{this.props.children}</div>
            </div>
        );
    }
}

TooltipDecorator.defaultProps = {
    legend: "Hello"
};

export default TooltipDecorator;
