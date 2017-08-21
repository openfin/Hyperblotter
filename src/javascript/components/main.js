import React, {Component} from 'react';
import _ from 'underscore';
import fin from '../vendor/openfin';
import windowManager from "../windowsListSingleton";
import {DockingManager, DockableWindow} from '../dockingManger';
import ToolTip from '../components/tooltip-decorator';
import excel from '../vendor/ExcelAPI';
import Shepherd from 'tether-shepherd';

let excel_plugin_installed = false;
let _windowManager = windowManager.getInstance();
let animationWindows = _windowManager.getWindows();
let demoWindows = [];
let blotter;
let inLoop = false;
let locations = [];

// Have the grid windows been created yet?
let _tilesCreated = false;

const cubeSize = 185;
const numColumns = 6;
const numRows = 3;
const demoTiles = {};
const numTiles = numRows * numColumns + 1;
let inTour = false;
const APP_UUID = 'hyperblotter';
const TOOLTIP_WINDOW_NAME = 'tour-tooltip';
let currentWindowSet = animationWindows;

/* Static data for the floating 'trade' animation windows */
const dockingManager = DockingManager.getInstance();

const rndData = [
  {
    ticker: "PCL",
    last: 21.251049070187836
  }, {
    ticker: "IBM",
    last: 24.835458631124418
  }, {
    ticker: "ORI",
    last: 6.235665990223004
  }, {
    ticker: "DBD",
    last: 17.01733357355432
  }, {
    ticker: "FHN",
    last: 6.624939800309766
  }, {
    ticker: "EXR",
    last: 33.96528484183794
  }, {
    ticker: "BP",
    last: 21.19160933461151
  }, {
    ticker: "WCN",
    last: 23.501467942817747
  }, {
    ticker: "CVX",
    last: 53.67873008625956
  }, {
    ticker: "ITT",
    last: 22.803668802786465
  }, {
    ticker: "AWH",
    last: 12.594969339431945
  }, {
    ticker: "WTM",
    last: 348.8851038882928
  }, {
    ticker: "FHN",
    last: 6.624939800309766
  }, {
    ticker: "CYH",
    last: 19.131071861657016
  }, {
    ticker: "SWK",
    last: 52.198226722926165
  }, {
    ticker: "AMG",
    last: 127.23849660464248
  }, {
    ticker: "BCE",
    last: 22.765628088640174
  }, {
    ticker: "ACC",
    last: 14.787034222549517
  }, {
    ticker: "AA",
    last: 13.787034222549517
  }
];

const floor = Math.floor;
const random = Math.random;

const getWorkSheet = (workBook, workSheet) => {
  //  "Worksheet is ", workBook + " : " +  workSheet
  fin
    .desktop
    .Excel
    .getWorkbooks(function(workbooks) {
      workbooks
        .filter(function(d, i) {
          return d.name === workBook
        })
        .map(function(d, i) {
          var _worksheet = d.getWorksheets(function(ws) {
            ws
              .filter(function(dd, ii) {
                return dd.name === workSheet
              })
              .map(function(ddd, iii) {
                ddd.setCells([
                  [
                    "a", "b", "c"
                  ],
                  [1, 2, 3]
                ], "A1");
              })
          })
        });
    });
  return "TESTING "
}

let _ExcelSheetOpen = false;

/* Initialises all the floating 'trade' windows. */
const initAnimationWindows = () => {
  return new Promise(function(resolve, reject) {
    if (_tilesCreated) {
      resolve()
    } else {
      _tilesCreated = true;
      var leftOffset = 105,
        topOffset = 50,
        top = topOffset,
        left = leftOffset,
        tileMargin = 8,
        i = 1;
      for (; i < numTiles; i++) {
        let newWindow = new fin
          .desktop
          .Window({
            name: 'tile' + random(),
            url: 'trade.html?t=' + rndData[i].ticker + '&l=' + rndData[i].last,
            autoShow: false,
            defaultHeight: cubeSize,
            minHeight: cubeSize,
            maxHeight: cubeSize,
            defaultWidth: cubeSize,
            minWidth: cubeSize,
            maxWidth: cubeSize,
            resizable: false,
            frame: false,
            maximizable: false,
            saveWindowState: false,
            defaultTop: top,
            defaultLeft: left,
            showTaskbarIcon: false,
            accelerator: {
              devtools: true
            },
            icon: "http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/openfin.ico"
          }, () => {
            dockingManager.register(newWindow);
          });
        currentWindowSet.push(newWindow);
        locations.push({top: top, left: left, duration: 1000});
        left += cubeSize + tileMargin;
        if (i && !(i % numColumns)) {
          left = leftOffset;
          top += cubeSize + tileMargin;
        }
        if (i === numTiles - 1) {
          _tilesCreated = true;
          resolve();
        }
      }
    }
  });
};

/* If the blotter has not been created yet, create it and return a promise...*/
const initBlotter = () => {
  var _blotterPromise = new Promise((resolve, reject) => {
    blotter = new fin
      .desktop
      .Window({
        name: 'blotter',
        url: 'hypergrid.html',
        autoShow: false,
        defaultWidth: 970,
        maxWidth: 970,
        minWidth: 970,
        maxHeight: 594,
        defaultHeight: 594,
        minHeight: 594,
        resizable: false,
        frame: false,
        maximizable: false,
        "icon": "http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/openfin.ico"
      }, () => {
        resolve();
      })
  });
  return _blotterPromise
};
const initWpfChart = () => {
  fin
    .desktop
    .Application
    .getCurrent()
    .getManifest(function(manifest) {
      var version = manifest.runtime.version;
      var appUuid = manifest.startup_app.uuid;
      var args = '--parentuuid=' + appUuid + ' --runtimeversion=' + version + ' --hidden=true';
      fin
        .desktop
        .System
        .launchExternalProcess({alias: 'hyperblotter-chart', arguments: args});
    });
}
fin
  .desktop
  .main(() => {
    fin
      .desktop
      .InterApplicationBus
      .subscribe("*", "inter_app_messaging", function(message, senderUuid) {
        console.log("This following message has been received from " + senderUuid + ": ", message);
        if (message.hyperblotterExists === 'true') {
          console.log()
        }
      });
    initBlotter().then(function(b) {
      // do nothing, if you want the blotter to show automatically blotter.show();
    });
    initAnimationWindows().then(function(val) {
      fin
        .desktop
        .System
        .addEventListener('monitor-info-changed', function(evnt) {
          console.log("The monitor information has changed to: ", evnt);
          document.dispatchEvent(new CustomEvent('monitor-changed', {'detail': evnt}));
        }, function() {
          console.log("The registration of 'monitor-info-changed' was successful");
        }, function(err) {
          console.log("failure: registration of 'monitor-info-changed' " + err);
        });
    });
    initWpfChart();
  });
const showAsPromise = (wnd) => {
  return new Promise((resolve) => {
    fin
      .desktop
      .main(() => {
        wnd.show(() => {
          resolve();
        }, () => {
          reject();
        });
      })
  })
}
const setTranspatentAsPromise = (arr, opacity) => {
  return new Promise((transparentFinished, transparentFailed) => {
    Promise.all(arr.map((item) => {
      return new Promise((resolve, reject) => {
        item.updateOptions({
          opacity: opacity
        }, () => {
          resolve();
        }, () => {
          reject()
        });
      });
    })).then(() => {
      transparentFinished();
    }, () => {
      transparentFailed();
    });
  });
}

const createTooltip = () => {
  new fin
    .desktop
    .Window({
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
      "autoShow": false,
      "frame": false,
      "resizable": false,
      "maximizable": false
    });
}

const moveToolTip = ({top, left}) => {
  const tooltipWindow = fin
    .desktop
    .Window
    .wrap(APP_UUID, TOOLTIP_WINDOW_NAME);
  tooltipWindow.isShowing(showing => {
    if(showing){
      tooltipWindow.animate({
        position: {
          top,
          left,
          duration: 500
        },
        tween: 'linear'
      });
    }else{
      tooltipWindow.showAt(left, top);
    }
  });
}

const hideTooltip = () => {
   fin
    .desktop
    .Window
    .wrap(APP_UUID, TOOLTIP_WINDOW_NAME)
    .hide();
}

const changeTooltipMessage = (message) => {
   fin
    .desktop
    .Window
    .wrap(APP_UUID, TOOLTIP_WINDOW_NAME)
    .getNativeWindow()
    .changeMessage(message);
}

const getElementLocation = (finWindowObject, nativeWindowObject, elementId, padding, callback) => {
  const element = nativeWindowObject.document.getElementById(elementId);
  if(element){
    finWindowObject.getBounds(({top, left}) => {
      const nextLocation = {
        top: element.offsetTop + top + padding.top,
        left: element.offsetLeft + left + padding.left
      };
      callback(nextLocation);
    })
  }
}

const moveToolTipToSelector = (finWindowObject, nativeWindowObject, selector, padding) => {
  getElementLocation(finWindowObject, nativeWindowObject, selector, padding, moveToolTip);
}


const createDemoBlotterWindow = (top, left, index) => {
  return new Promise((resolve) => {
    let newWindow = new fin
      .desktop
      .Window({
        name: 'tile' + random(),
        url: 'trade.html?t=' + rndData[index].ticker + '&l=' + rndData[index].last,
        autoShow: false,
        defaultHeight: cubeSize,
        minHeight: cubeSize,
        maxHeight: cubeSize,
        defaultWidth: cubeSize,
        minWidth: cubeSize,
        maxWidth: cubeSize,
        resizable: false,
        frame: false,
        maximizable: false,
        saveWindowState: false,
        defaultTop: top,
        defaultLeft: left,
        showTaskbarIcon: false,
        accelerator: {
          devtools: true
        },
        icon: "http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/openfin.ico"
      }, () => {
        dockingManager.register(newWindow);
        resolve(newWindow);
      });
      locations.push({top: top, left: left, duration: 1000});
  })
}

const closeOpenDemoWindows = () => {
  if(currentWindowSet && currentWindowSet.length > 0){
    currentWindowSet.forEach(wnd => wnd.close());
    currentWindowSet.length;
  }
}


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animationWindowsShowing: false,
      tilesMaximised: false,
      inLoop: false
    }
  }
  closeApp() {
    fin
      .desktop
      .main(function() {
        fin
          .desktop
          .Application
          .getCurrent()
          .close();
      });
  }
  minApp() {
    fin
      .desktop
      .main(function() {
        fin
          .desktop
          .Window
          .getCurrent()
          .minimize();
      });
  }
  showWindows = () => {
    currentWindowSet.forEach((wnd) => {
      try {
        wnd.show();
        wnd.bringToFront();
        // if window has been pinned it may be in a group
        // attempt to unpin it
        if (window.pinnedWindows && window.pinnedWindows[wnd.name]) {
          window.pinnedWindows[wnd.name] = false;
          dockingManager.removeFromGroup(wnd);
        }
      } catch (err) {
        //
      }
      this.setState({
        animationWindowsShowing: true,
        tilesMaximised: true
      }, () => {
        window.animationWindowsShowing = true;
        this.animateWindows(currentWindowSet, false);
      });
    });
  }
  toggleMinimised = () => {
    this.state.tilesMaximised
      ? this.minWindows()
      : this.restoreWindows();
  }
  minWindows = () => {
    this.toggleAnimateLoopStop();
    currentWindowSet.forEach((wnd) => {
      wnd.minimize();
    });
    this.setState({tilesMaximised: false})
  }
  pinwindow = (win) => {
    currentWindowSet.map(animWindow => {
      if (animWindow.name === win.name) {
        window.pinnedWindows[win.name] = true;
      }
    });
  }
  unPinwindow = (win) => {
    currentWindowSet.map(animWindow => {
      if (animWindow.name === win.name) { // && window.pinnedWindows[win.name]){
        window.pinnedWindows[win.name] = false;
        dockingManager.removeFromGroup(win);
        if (!window.animationWindowsShowing) {
          win.hide();
        }
        return;
      }
    })
  }
  toggleShowAnimationWindows = () => {
    if (this.state.animationWindowsShowing) {
      this.closeAnimationWindows();
    } else {
      this.openAnimationWindows();
    }
  }

  openAnimationWindows = () => {
    initAnimationWindows().then(() => {
      this.showWindows();
    });
  }

  closeAnimationWindows = () => {
    this.toggleAnimateLoopStop();
    currentWindowSet.forEach((wnd) => {
      window.pinnedWindows = window.pinnedWindows || [];
      if (!window.pinnedWindows[wnd.name]) {
        wnd.hide();
      }
    });
    this.setState({
      animationWindowsShowing: false,
      tilesMaximised: false
    }, () => {
      window.animationWindowsShowing = false;
    });
  }
  toggleAnimateLoop = () => {
    inLoop
      ? this.toggleAnimateLoopStop()
      : this.toggleAnimateLoopStart();
  }
  toggleAnimateLoopStart = () => {
    inLoop = true;
    this.setState({"inLoop": true});
    if (inLoop) {
      this.animateWindows(currentWindowSet);
    }
  }
  toggleAnimateLoopStop = () => {
    inLoop = false;
    this.setState({"inLoop": false});
  }
  // Abstracted out the function for randomising
  randomiseAnimationWindows() {
    return currentWindowSet.reduce(function(m, itm, idx, a) {
      m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
      return m
    }, [
      [], currentWindowSet.slice()
    ])[0]
  }
  animateWindows = (animationWindows, randomise) => {
    //Unless explicitly asked not to, randomise
    var _randomise = randomise !== false
      ? true
      : false;
    var _arr = _randomise
      ? this.randomiseAnimationWindows()
      : animationWindows;
    setTranspatentAsPromise(animationWindows, 0.5).then(() => {
      Promise.all(_arr.map((item, index) => {
        return new Promise((resolve, reject) => {
          try {
            item.animate({
              position: locations[index]
            }, {}, () => {
              resolve()
            })
          } catch (err) {
            //-----
          }
        });
      })).then(() => {
        setTranspatentAsPromise(animationWindows, 1).then(() => {
          if (inLoop) {
            setTimeout(() => {
              this.animateWindows(animationWindows)
            }, 700);
          }
        })
      });
    });
  }

  startTour = () => {
    inTour = true;
    currentWindowSet = demoWindows;
    createTooltip();
    window.addEventListener('message', (message) => {
      if(message.data.step !== undefined){
        switch(message.data.step){
          case 0: this.step0(message.data.selector)
            break;
          case 1: this.step1(message.data.selector)
            break;
          case 2: this.step2(message.data.selector)
            break;
          case 3: this.step3(message.data.selector)
            break;
          case 4: this.step4(message.data.selector)
            break;
          case 5: this.step5(message.data.selector)
            break;
          case 6: this.step6(message.data.selector)
            break;
          case 7: this.step7(message.data.selector)
            break;
          case 'end': this.endTour();
        }
      }
    }, false);
    const app = new fin
      .desktop
      .Window({
        url: 'http://localhost:5001/tour.html',
        name: 'tour-application',
        defaultWidth: 500,
        defaultHeight: 500,
        defaultTop: 50,
        defaultLeft: 600,
        autoShow: true,
        frame: false,
        cornerRounding: {
          "width": 10,
          "height": 10
        }
      });
  }

  step0 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const currentWindow = fin.desktop.Window.getCurrent();
    moveToolTipToSelector(currentWindow, window, selector, { top: 50, left: 0});
    //do other stuff
  }

  step1 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const windowPromises = [];
    const cubeSize = 185;
    const numWindows = 9;
    const tileMargin = 8;
    const topOffset = 200;
    const leftOffset = 105;
    const numColumns = 3;
    const blotterWidth = cubeSize + tileMargin;
    let top = topOffset;
    let left = leftOffset;

    //clear stored locations
    locations = [];

    for (let i = 1; i <= numWindows; i++) {
      windowPromises.push(createDemoBlotterWindow(top, left, i));
      left += blotterWidth;
      if(i % numColumns === 0){
        left = leftOffset;
        top += blotterWidth;
      }
    }
    Promise.all(windowPromises).then(blotterWindows => {
      currentWindowSet = demoWindows = blotterWindows;
      let nativeWindowObject = demoWindows[5].getNativeWindow();
      this.showWindows();

      moveToolTipToSelector(demoWindows[5], nativeWindowObject, selector, { top: 30, left: -10 });
      let pinElement = nativeWindowObject.document.getElementById(selector);

      const moveToNext = () => {
        nativeWindowObject = demoWindows[8].getNativeWindow();
        moveToolTipToSelector(demoWindows[8], nativeWindowObject, selector, { top: 30, left: -10 });
        pinElement = nativeWindowObject.document.getElementById(selector);
        let clickCount = 0;
        pinElement.addEventListener('click', () => {
            const currentWindow = fin.desktop.Window.getCurrent();
            moveToolTipToSelector(currentWindow, window, 'launch-blotters', { top: 80, left: 10});
            changeTooltipMessage(clickCount++ === 0 ? 'click here' : 'click again');
        });
      }

      pinElement.addEventListener('click', moveToNext);
    })
  }

  step2 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const windowPromises = [];
    const cubeSize = 185;
    const numWindows = 2;
    const tileMargin = 8;
    const topOffset = 300;
    const leftOffset = 105;
    const numColumns = 3;
    const blotterWidth = cubeSize + tileMargin;
    let top = topOffset;
    let left = leftOffset;

    //clear stored locations
    locations = [];

    for (let i = 1; i <= numWindows; i++) {
      windowPromises.push(createDemoBlotterWindow(top, left, i));
      left += (blotterWidth * 2);
    }

    Promise.all(windowPromises).then(blotterWindows => {
      currentWindowSet = demoWindows = blotterWindows;
      let nativeWindowObject = demoWindows[0].getNativeWindow();
      this.showWindows();

      moveToolTipToSelector(demoWindows[0], nativeWindowObject, selector, { top: 30, left: -10 });
      let pinElement = nativeWindowObject.document.getElementById(selector);

      const moveToNext = () => {
        nativeWindowObject = demoWindows[1].getNativeWindow();
        moveToolTipToSelector(demoWindows[1], nativeWindowObject, selector, { top: 30, left: -10 });
        pinElement = nativeWindowObject.document.getElementById(selector);
        pinElement.addEventListener('click', () => {
            const currentWindow = fin.desktop.Window.getCurrent();
            let toolTipHidden = false;
            moveToolTip({top: topOffset + (cubeSize / 4 ), left: leftOffset + cubeSize + (cubeSize / 4) });
            changeTooltipMessage('drag together');
            demoWindows.map(wnd => {
              wnd.addEventListener('bounds-changing', () => {
                if (!toolTipHidden) { 
                  hideTooltip();
                  toolTipHidden = true;
                }
              })
              wnd.addEventListener('group-changed', () => {
                changeTooltipMessage('drag group');
                moveToolTip({top: topOffset - (cubeSize / 2) - 20, left: leftOffset + cubeSize + (cubeSize / 4) });
              });
            })
        });
      }

      pinElement.addEventListener('click', moveToNext);
    })
  }

  step3 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const cubeSize = 185;
    const numWindows = 2;
    const tileMargin = 8;
    const topOffset = 300;
    const leftOffset = 105;
    const numColumns = 3;
    const blotterWidth = cubeSize + tileMargin;
    let top = topOffset;
    let left = leftOffset;

    //clear stored locations
    locations = [];

    createDemoBlotterWindow(top, left, 1)
    .then(finwindowObject => {
      currentWindowSet = demoWindows = [finwindowObject];
      this.showWindows();

      const nativeWindowObject = demoWindows[0].getNativeWindow();
      changeTooltipMessage('click here');
      moveToolTipToSelector(demoWindows[0], nativeWindowObject, selector, { top: 30, left: -10 });
      let pinElement = nativeWindowObject.document.getElementById(selector);

      const moveToNext = () => {
        //wait for notification to show
        setTimeout(() => {
          fin
          .desktop
          .Application
          .getCurrent()
          .getChildWindows((windows) => {
            const notifications = windows.filter(wnd => wnd.name.indexOf('Notification') > 0);
            notifications[0].getBounds(({top,left}) => {
              changeTooltipMessage('click confirm');
              moveToolTip({top: top - 100, left: left + 150});
              const handlePostMessage = (message) => {
                console.log('called', message);
                if(message.data && message.data.type === 'notification'){
                  if(message.data.status === 'confirmed'){
                    window.removeEventListener('message', handlePostMessage);
                    demoWindows[0].getBounds(({top, left}) => {
                      changeTooltipMessage('purchase made');
                      moveToolTip({top: top + 50, left: left + 200 });
                    });
                  }
                }
              }
              window.addEventListener('message', handlePostMessage);
            })
          })
        }, 1000);
      }

      pinElement.addEventListener('click', moveToNext);
    })
  }

  step4 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const windowPromises = [];
    const cubeSize = 185;
    const numWindows = 9;
    const tileMargin = 8;
    const topOffset = 300;
    const leftOffset = 105;
    const numColumns = 3;
    const blotterWidth = cubeSize + tileMargin;
    let top = topOffset;
    let left = leftOffset;

    //clear stored locations
    locations = [];

    for (let i = 1; i <= numWindows; i++) {
      windowPromises.push(createDemoBlotterWindow(top, left, i));
      left += blotterWidth;
      if(i % numColumns === 0){
        left = leftOffset;
        top += blotterWidth;
      }
    }

    Promise.all(windowPromises).then(blotterWindows => {
      currentWindowSet = demoWindows = blotterWindows;
      this.showWindows();
      const currentWindow = fin.desktop.Window.getCurrent();
      moveToolTipToSelector(currentWindow, window, selector, { top: 50, left: 0});
    });
  }
  
  step5 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();

    const windowPromises = [];
    const cubeSize = 185;
    const numWindows = 2;
    const tileMargin = 8;
    const topOffset = 300;
    const leftOffset = 105;
    const numColumns = 3;
    const blotterWidth = cubeSize + tileMargin;
    let top = topOffset;
    let left = leftOffset;

    //clear stored locations
    locations = [];

    for (let i = 1; i <= numWindows; i++) {
      windowPromises.push(createDemoBlotterWindow(top, left, i));
      left += blotterWidth;
    }

    Promise.all(windowPromises).then(blotterWindows => {
      currentWindowSet = demoWindows = blotterWindows;
      this.showWindows();
      let nativeWindowObject = demoWindows[0].getNativeWindow();
      moveToolTipToSelector(demoWindows[0], nativeWindowObject, selector, { top: 30, left: 0});
      let pinElement = nativeWindowObject.document.getElementById(selector);

      const moveToNext = () => {
        nativeWindowObject = demoWindows[1].getNativeWindow();
        moveToolTipToSelector(demoWindows[1], nativeWindowObject, selector, { top: 30, left: 0 });
        pinElement2 = nativeWindowObject.document.getElementById(selector);
        pinElement2.addEventListener('click', () => {
            nativeWindowObject = demoWindows[0].getNativeWindow();
            moveToolTipToSelector(demoWindows[0], nativeWindowObject, selector, { top: 30, left: 0 });
        });
      }

      pinElement.addEventListener('click', moveToNext);
    });
}

  step6 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();
    const currentWindow = fin.desktop.Window.getCurrent();
    moveToolTipToSelector(currentWindow, window, selector, { top: 50, left: 0});
  }

  step7 = (selector) => {
    closeOpenDemoWindows();
    hideTooltip();
    const currentWindow = fin.desktop.Window.getCurrent();
    moveToolTipToSelector(currentWindow, window, selector, { top: 50, left: 0});
  }

  endTour = () => {
    console.log('end clicked');
    closeOpenDemoWindows();
    hideTooltip();
  }

  openBlotter = () => {
    if (!blotter) {
      initBlotter()
        .then(function(b) {
          blotter.show();
        });
    } else {
      blotter.show();
      blotter.bringToFront();
    }
  }
  componentDidMount = () => {
    var _repositionWindows = function() {
      if (!this.state.inLoop && this.state.animationWindowsShowing) {
        this
          .animateWindows
          .call(this, currentWindowSet, false);
      }
    }.bind(this);
    document.addEventListener('monitor-changed', function(e) {
      _repositionWindows();
    })
    window.pinWindow = this.pinwindow;
    window.unPinwindow = this.unPinwindow;
    window.pinnedWindows = {};
  }
  openExcel = () => {
    if (!excel_plugin_installed) {
      fin
        .desktop
        .main(function() {
          fin
            .desktop
            .System
            .launchExternalProcess({
              alias: 'excel-dist',
              arguments: "-i -l hyperblotter.xlsx",
              listener: function(event) {
                // react to close event
                if (event.topic === "exited" && event.exitCode === MY_KNOWN_BAD_STATE) {
                  // your desired logic here
                  console.log("Exited Excel")
                } else {
                  // this.openNewExcel()
                }
              }
            });
        });
      // excel_plugin_installed = true;
      // this.openNewExcel();
      var workbook = fin
        .desktop
        .Excel
        .addWorkbook(function(evt) {
          // console.log(">>>> A NEW WORKBOOK ADDED -- THIS IS THE CALLBACK: ", evt)
        });
      // if(currentWorkbook == workbook) return;
    } else {
      this.openNewExcel();
    }
  }
  openNewExcel = () => {
    fin
      .desktop
      .main(function() {
        var Excel = fin.desktop.Excel;
        Excel.init();
        Excel.getConnectionStatus(function(evt) {
          // console.log("ON CONNECTION STATUS -- ", evt)
        });
        Excel.addEventListener("workbookAdded", this.onWorkbookAdded);
        Excel.addEventListener("workbookClosed", this.onWorkbookRemoved);
        Excel.addEventListener("connected", this.onExcelConnected);
        // console.log("Called Excel ", Excel)
      });
  }
  workBookAddedCallback = (evt) => {
    // console.log("Wokbook added callback called... ", evt);
  }
  onExcelConnected = () => {
    // console.log("EXCEL FUNCTION CALLED ")
  }
  onWorkbookAdded = () => {
    // console.log("EXCEL FUNCTION CALLED -- onWorkbookAdded ")
  }
  onWorkbookRemoved = () => {
    // console.log("EXCEL FUNCTION CALLED ")
  }
  onWorkbookActivateed = () => {
    // console.log("EXCEL ON WORKBOOK ACTIVATED CALLED ")
  }
  getAnimationWindowsStyle = () => {
    return this.state.animationWindowsShowing
      ? "none"
      : "menuitem";
  }
  openDetailedChartWindow = () => {
    fin
      .desktop
      .InterApplicationBus
      .publish('tickerSelection', {symbolName: "IBM"});
  }
  getAnimateClass = () => {
    if (this.state.animationWindowsShowing && this.state.tilesMaximised) {
      var _class = this.state.inLoop
        ? "fa fa-pause"
        : "fa fa-play";
      return {
        class: _class,
        style: {
          "display" : "block"
        }
      };
    } else {
      var _class = this.state.inLoop
        ? "fa fa-pause"
        : "fa fa-play";
      var _style = {
        "opacity": "0.2",
        "WebkitTouchCallout": "none",
        "WebkitUserSelect": "none",
        "khtmlUserSelect": "none",
        "MozUserSelect": "none",
        "msUserSelect": "none",
        "userSelect": "none",
        "pointerEvents": "none"
      };
      return {class: _class, style: _style}
    }
  }
  getAnimateParentClass = () => {
    if (this.state.animationWindowsShowing) {
      return {"display": "none"};
    } else {
      return {"display": "block"};
    }
  }
  getAnimateText = () => {
    if (this.state.animationWindowsShowing) {
      return this.state.inLoop
        ? "Pause animation"
        : "Play animation";
    } else {
      return "";
    }
  }
  getMinifyText = () => {
    if (this.state.animationWindowsShowing) {
      return this.state.tilesMaximised
        ? {
          text: " Minimise",
          style: {
            "display": "block"
          },
          css: "none",
          icon: "fa fa-sort-amount-desc"
        }
        : {
          text: " Maximise",
          css: "",
          style: {
            "display": "block"
          },
          icon: "fa fa-sort-amount-asc"
        };
    } else {
      return {
        text: "Minimise",
        style: {
          "display": "none"
        },
        css: "none",
        icon: "fa fa-sort-amount-desc"
      };
    }
  }
  openGithub = () => {
    fin
      .desktop
      .System
      .openUrlWithBrowser("https://github.com/openfin/Hyperblotter/tree/master", function() {}, function(err) {
        // console.log("Failed to open GitHub: " + err);
      });
  }
  render = () => {
    return <div className="main-bar">
      <img className="openfin-logo" type="image/svg+xml" src="images/hyperblotter_text.svg"/>
      <div className="window-control">
        <i onClick={this.closeApp} className="fa fa-times">
          <div></div>
        </i>
        <i onClick={this.minApp} className="fa fa-minus">
          <div></div>
        </i>
      </div>
      <div className="drag-area"></div>
      <div className="drag-area-display"></div>
      <div className="content-area">
        <div>
          <span id="launch-blotters" style={this.getAnimateParentClass()} onClick={this.openAnimationWindows}>
            <ToolTip legend="Launch">
              <i className='fa fa-th'></i>
            </ToolTip>
          </span>
          <span id="close-blotters" style={this
            .getMinifyText()
            .style} onClick={this.toggleShowAnimationWindows}>
            <ToolTip legend="Close">
              <i className={this
                .getMinifyText()
                .icon}></i>
            </ToolTip>
          </span>
          <span id="animate-blotters" onClick={this.toggleAnimateLoop} style={this
            .getAnimateClass()
            .style}>
            <ToolTip legend="Animate">
              <i className={this
                .getAnimateClass()
                .class}></i>
            </ToolTip>
          </span>
        </div>
        <div>
          <span id="show-hypergrid" onClick={this.openBlotter}>
            <ToolTip legend="Grid">
              <i className="fa fa-table"></i>
            </ToolTip>
          </span>
        </div>
        <div>
          <span id="show-excel" onClick={this.openExcel}>
            <ToolTip legend="Excel">
              <i className="fa fa-file-excel-o"></i>
            </ToolTip>
          </span>
        </div>
        <div>
          <span id="show-github" onClick={this.openGithub}>
            <ToolTip legend="GitHub">
              <i className="fa fa-github-alt"></i>
            </ToolTip>
          </span>
        </div>
        <div>
          <span onClick={this.startTour}>
            <ToolTip legend="Tour">
              <i className="fa fa-road"></i>
            </ToolTip>
          </span>
        </div>
      </div>
    </div>
  }
};

export default Main;
