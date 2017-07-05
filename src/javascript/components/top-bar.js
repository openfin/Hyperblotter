import React, { Component } from 'react';
import childWindow from './child-window';
import _ from 'underscore';
import fin from '../vendor/openfin';


const childWindowConfigBase = () => {
  return {
    autoShow: false,
    width: 350,
    maxWidth: 350,
    frame: false,
    maximizable: false,
    height: 594 / 3,
    maxHeight: 594 / 3,
    minHeight: 594 / 3
  }
};

const processList = (list, item, animations) => {
  showAsPromise(item)
    .then(() => {
      animateAsPromise(item, animations, {}, () => {
        var nextIndex = list.indexOf(item) + 1
        hasNext = nextIndex + 1 < list.length;
        if (hasNext) {
          setTimeout(()=>{
            processList(list, list[nextIndex], animations);
          },1000);
        }
      })
    },
    (reason)=>{
      console.log('not shown because', reason);
    })
}

const showAsPromise = (wnd) =>  {
	return new Promise((resolve)=>{
		fin.desktop.main(()=>{
			wnd.show(()=>{
				resolve();
			},()=>{
				reject();
			});
		})
	})
}

const animateAsPromise = (wnd, animations ,opts) => {
	return new Promise((resolve, reject)=>{
		fin.desktop.main(()=>{
			wnd.animate(animations, opts, ()=>{
				resolve();	
			},
			(reason)=>{
				reject(reason);
			})
		})
	});
}

class TopBar extends Component {
  closeApp = () => {
    fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().hide();
		});
  }

  componentDidMount = () => {
    if (!fin.desktop) {
      return;
    }
    fin.desktop.main(function() {
      try {
        fin.desktop.Window.getCurrent();
      } catch (e) {}
    });
  }

  startWindowDemo = () => {
    const childWindows = [];
    fin.desktop.main(() => {
      fin.desktop.System.getMonitorInfo((monitorInfo) => {
        console.log("This object contains information about all monitors: ", monitorInfo);
        const width = 30; //monitorInfo.primaryMonitor.availableRect.right / 10
        const height = 30; //monitorInfo.primaryMonitor.availableRect.bottom / 10
        let i = 3;
        let top = 0;
        let left = 0;

        while (i--) {
          childWindows.push(childWindow.createChildWindow({
            defaultWidth: 1,
            //maxWidth: width,
            //minWidth: width,
            defaultHeight: 1,
            //maxHeight: height,
            //minHeight: height,
            frame: false,
            name: '' + Math.random(),
            url__: 'row-view.html?row=' + Math.floor(Math.random() * 1000),
            url: 'about:blank',
            autoShow: true,
            defaultTop: top,
            defaultLeft: left,
            saveWindowState: false,
            opacity: .1
          }))

          left += width + 5;
          //top += i < 20  ? height : 0;
        }

        Promise.all(childWindows)
          .then((wnds) => {
            wnds.forEach((item)=>{
              console.log('window item', item);
              // item.animate({
              // 	size: {
              // 		width: width,
              // 		height: height,
              // 		duration: 1000
              // 	},
              // 	opacity: {
              // 		opacity: 1,
              // 		duration:1000
              // 	}
              // })
            });
            // processList(wnds, wnds[0], {
            //     size: {
            //         width: width,
            //         height: height,
            //         duration: 5000
            //     }
            // })
          },
          (reason)=>{
            console.log('rejected', reason);
          });
        });
    });
  }

  render = () => {
    return <div className="top-bar">
			<span className="title">Blotter</span>
			<i onClick={this.closeApp} className="fa fa-times"></i>
		</div>
  }
}

//<i onClick={this.startWindowDemo} className="fa fa-arrows"></i>

export default TopBar;
