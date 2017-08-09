import React, {Component} from 'react';
import Main from './main';
// same as in the app.json
// these are needed to get a reference to the tooltip window using
// fin.desktop.Window.wrap(uuid, windowName)
const APP_UUID = 'hyperblotter';
const TOOLTIP_WINDOW_NAME = 'tour-tooltip';
const TooltipApp = {};

const selectors = [
  {
    id: "launch-blotters",
    action: "Welcome, click Launch",
    info: "Displays all Blotter Windows, Control and interact with child Windows from Parent"
  },
  {
    id: "pin-window",
    action: "Click here to pin a Window",
    info: "You can click here to pin a Window. Pinned windows will not be hidden when other are"
  },
  {
    id: "animate-blotters",
    action: "Fully Animate windows around screen, click Animate",
    info: "Animations let you move windows and Apps around screen"
  },
  {
    id: "show-hypergrid",
    action: "View live data on child window, click Hypergrid",
    info: "Displays Live data window as a child window of the main app"
  },
  {
    id: "show-excel",
    action: "Launch external Application from the OpenFin Api, click Excel",
    info: "Displays Live data on Excel sheet"
  },
  {
    id: "show-github",
    action: "Launch web browser with OpenFin Api, click Github",
    info: "You can view the Repository for this application as we demonstrate launch of the browser from the API"
  }
];

class TourContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tourStarted: false,
      selectedIndex: 0,
      currentlySelected: selectors[0]
    }
  }

  nextStep = () => {
    const mainWindow = window.opener.window;
    const nextIndex = this.state.selectedIndex === selectors.length - 1 ? 0 : this.state.selectedIndex + 1;
    console.log('clicked', nextIndex, this.state);
    this.setState({
      selectedIndex: nextIndex,
      currentlySelected: selectors[nextIndex]
    }, () => {
      mainWindow.postMessage({
        step: this.state.selectedIndex,
        selector: selectors[this.state.selectedIndex].id
      }, '*');
    })
  }

  componentDidMount() {
    const mainWindow = window.opener.window;
    mainWindow.postMessage({
      step: this.state.selectedIndex,
      selector: selectors[this.state.selectedIndex].id
    }, '*');
  }

  render() {
    return (
      <div id="tour-main">
        <div className="tour-container">
          <div className="tour-text">
            <h3>Guided Tour</h3>
          </div>
          <div className="tour-action"><p>{this.state.currentlySelected.action}</p></div>
          <div className="tour-info"><p>{this.state.currentlySelected.info}</p></div>
          <div className="tour-actions">
            <button onClick={this.nextStep}>Move Tooltip</button>
            <button>End Tour</button>
          </div>
        </div>
      </div>
    );
  }
};

export default TourContainer;
