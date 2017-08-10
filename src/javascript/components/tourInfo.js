import React, { Component } from 'react';

const Tip = ({className}) => (<div className={`tip ${className}`}/>);
const Box = (props) => (<div className="box">{props.children}</div>);

const positions = [
  'top-left',
  'top-middle',
  'top-right',
  'right-top',
  'right-middle',
  'right-bottom',
  'bottom-right',
  'bottom-middle',
  'bottom-left',
  'left-bottom',
  'left-middle',
  'left-top'
];

class TourInfo extends Component {
  constructor(props){
    super(props);
    const index = props.tipPosition ?  positions.indexOf(props.tipPosition) : 0;
    
    this.state = {
      tipPosition: index >= 0 ? index : 0
    }
    this.moveTip = this.moveTip.bind(this);
    window.changeMessage = this.changeMessage;
  }
  
  moveTip = () => {
    this.setState(() =>{
      return {tipPosition: this.state.tipPosition === positions.length - 1 ? 0 : this.state.tipPosition + 1}});
  }
  
  changeMessage = (message) => this.setState({message}); 

  render() {
    return (
      <div>
        <Box>
          <Tip className={positions[this.state.tipPosition]}/>
           <div className="text">{ this.props.message || this.state.message || 'Click Here'}</div>
        </Box>
      </div>
    );
  }
}

export default TourInfo;