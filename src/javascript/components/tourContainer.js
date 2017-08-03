import React, { Component } from 'react';
import Main from './main';

// same as in the app.json
// these are needed to get a reference to the tooltip window using
// fin.desktop.Window.wrap(uuid, windowName)
const APP_UUID = 'hyperblotter';
const TOOLTIP_WINDOW_NAME = 'tour-tooltip';

const TooltipApp = {};

const actionStyles = {
    marginTop: '200px'
}

const selectors = [
  'launch-blotters',
  'animate-blotters',
  'show-table',
  'show-chart',
  'show-excel'
];

let tourStarted = false;
let selectedIndex = 0;

const showTooltip = () => {

 new fin.desktop.Window({
				url: 'http://localhost:5001/tourInfo.html',
				name: TOOLTIP_WINDOW_NAME,
				"defaultWidth": 110,
        "maxWidth": 110,
        "minWidth": 110,
        "defaultHeight": 90,
        "maxHeight": 90,
        "minHeight": 90,
        "defaultTop": 50,
        "defaultLeft": 50,
        "alwaysOnTop": true,
        "autoShow": true,
        "frame": false,
        "resizable": false,
        "maximizable": false,
			}, () => tourStarted = true);
}

const nextStep = () => {
  window.opener.window.sendLocation(selectors[selectedIndex], ({top, left}) => {
    console.log('clicked', top, left, window.opener.window.sendLocation);
    if(top !== undefined && left !== undefined){
      const tooltipWindow = fin.desktop.Window.wrap(APP_UUID, TOOLTIP_WINDOW_NAME);
      console.log(top, left, 'about to animate', tooltipWindow);
      tooltipWindow.animate({
        position: {
          top,
          left,
          duration: 500
        },
        tween: 'linear'
      }, () => selectedIndex = (selectedIndex === selectors.length - 1) ? 0 : selectedIndex + 1, (e) => console.log(e));
    };
  });
}

class TourContainer extends Component{
  render(){
    return (
		<div id="tour-main">
            <div className="tour-container">
                <div className="tour-text">
                    Longer Explanations will go here
                </div>
                <div className="tour-actions" style={actionStyles}>
                    <button onClick={showTooltip}>Show Tooltip</button>
                    <button onClick={nextStep}>Move Tooltip</button>
                    <button>End Tour</button>
                </div>
                
            </div>
	  	</div>);
  }
};

export default TourContainer;
