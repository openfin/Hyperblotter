import React, { Component } from 'react';
import HyperGrid from './hypergrid';
import ChartIq from './chart-iq';
import Menu from './menu';
import TopBar from './top-bar';

class OpenFin extends Component{
  render(){
    return (
			<div>
				<div className="app">
					<TopBar />
					<HyperGrid />
				</div>
	  	</div>);
  }
};

export default OpenFin;
