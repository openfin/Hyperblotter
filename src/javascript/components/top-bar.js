var React = require('react'),
		fin = require('../vendor/openfin.js'),
		createChildWindow = require('./child-window.js').createChildWindow,
		_ = require('underscore');

var childWindowConfigBase = () => {
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

var TopBar = React.createClass({
	getInitialState: function() {
		return {

		};
	},
	closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().hide();
		});
	},
	componentDidMount: function() {
	        if (!fin.desktop) {
	            return;
	        }
	        fin.desktop.main(function() {
	            console.log('defining');
	            try {
	                fin.desktop.Window.getCurrent().defineDraggableArea(document.querySelector('.top-bar'));
	            } catch (e) {

	            }

	        });
	    },
	    startWindowDemo: () => {
	        var childWindows = [];
	        fin.desktop.main(() => {
	            fin.desktop.System.getMonitorInfo(function(monitorInfo) {
	                console.log("This object contains information about all monitors: ", monitorInfo);
	                var width = 30,//monitorInfo.primaryMonitor.availableRect.right / 10,
	                    height = 30,//monitorInfo.primaryMonitor.availableRect.bottom / 10,
	                    i = 3;
	                top = 0,
	                    left = 0;

	                while (i--) {



	                    childWindows.push(createChildWindow({
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

	    },
	render: function () {
		return <div className="top-bar">
			<span className="title">Blotter</span>
			
			<i onClick={this.closeApp} className="fa fa-times"></i>

		</div>
	}
});

//<i onClick={this.startWindowDemo} className="fa fa-arrows"></i>

module.exports = TopBar;


function processList(list, item, animations) {
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

function showAsPromise (wnd) {
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

function animateAsPromise (wnd, animations ,opts) {
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


	                




