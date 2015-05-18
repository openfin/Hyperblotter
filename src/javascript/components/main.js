var React = require('react'),
		_ = require('underscore'),
		fin = require('../vendor/openfin.js');

var animationWindows = [],
		blotter,
		inLoop = false,
		cubeSize = 185,
		locations = [],
		numColumns = 6,
		numRows = 3,
		demoTiles = {},
		numTiles = numRows * numColumns + 1;

var floor = Math.floor;
var random = Math.random;

fin.desktop.main(()=>{

	var top = 5, left = 5, i = 1;

	for (; i < numTiles; i++){
		animationWindows.push(new fin.desktop.Window({
			name: 'tile' + random(),
			url: 'trade.html',
			autoShow: false,
			defaultHeight: cubeSize,
			minHeight: cubeSize,
			maxHeight:cubeSize,
			defaultWidth: cubeSize,
			minWidth:cubeSize,
			maxWidth:cubeSize,
			resizable:false,
			frame: false,
			maximizable: false,
			saveWindowState: false,
			defaultTop: top,
			defaultLeft: left
		}));

		locations.push({
			top: top,
			left: left,
			duration: 1000
		});

		left += cubeSize + 5;

		if (i && !(i % numColumns)) {
			left = 5;
			top += cubeSize + 5
		}
	}


	blotter = new fin.desktop.Window({
				name: 'blotter',
				url: 'hypergrid.html',
				autoShow: false,
        defaultWidth: 960,
        maxWidth: 960,
        minWidth: 960,
        maxHeight: 594,
        defaultHeight: 594,
        minHeight: 594,
				resizable:false,
				frame: false,
				maximizable: false,
				saveWindowState: false
			}, ()=>{

			})
});

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

function setTranspatentAsPromise(arr, opacity) {
	return new Promise((transparentFinished, transparentFailed)=>{
		Promise.all(arr.map((item)=>{
			return new Promise((resolve, reject)=>{
				item.updateOptions({opacity: opacity}, ()=>{
					resolve();
				}, ()=>{
					reject()
				});
			});
		}))
		.then(()=>{
			transparentFinished();
		}, ()=>{
			transparentFailed();
		});
	});
}


module.exports = React.createClass({
	closeApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Application.getCurrent().close();
		});
	},
	minApp: function(){
		fin.desktop.main(function(){
		  fin.desktop.Window.getCurrent().minimize();
		});
	},
	showWindows: ()=>{
		animationWindows.forEach((wnd)=>{
			wnd.show();
		});
	},
	minWindows: function() {
		animationWindows.forEach((wnd)=>{
			wnd.minimize();
		});

		this.setState({
			desc: 'fa fa-sort-amount-desc none',
			asc: 'fa fa-sort-amount-asc'
		})
	},
	restoreWindows: function () {
		animationWindows.forEach((wnd)=>{
			wnd.restore();
		});

		this.setState({
			desc: 'fa fa-sort-amount-desc',
			asc: 'fa fa-sort-amount-asc none'
		})
	},
	closeWindows: ()=>{
		animationWindows.forEach((wnd)=>{
			wnd.close();
		});
	},
	toggleAnimateLoop: function () {
		inLoop = !inLoop;
		if (inLoop) {
			this.animateWindows(animationWindows);
		}
	},
	animateWindows: function(animationWindows){
		setTranspatentAsPromise(animationWindows, 0.5).then(()=>{
		   Promise.all(
		       animationWindows
			       .reduce(function(m, itm, idx, a) {
			           m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
			           return m
			       }, [
			           [], animationWindows.slice()
			       ])[0]
			       .map((item, index) => {
			           return new Promise((resolve, reject) => {
			               item.animate({
			                   position: locations[index]
			               }, {}, () => {
			                   resolve()
			               })
			           });
			       })
		   ).then(() => {
		   		setTranspatentAsPromise(animationWindows, 1).then(() => {
		   		    if (inLoop) {
		   		        setTimeout(() => {
		   		            this.animateWindows(animationWindows)
		   		        }, 700);
		   		    }
		   		})
		   });
	  });
	},
	openBlotter: function(){
		blotter.show();
	},
	componentDidMount: function(){
		this.showWindows();
		console.log('called hommie');
	},
	getInitialState: function(){
		return {
			desc: 'fa fa-sort-amount-desc',
			asc: 'fa fa-sort-amount-asc none'
		}
	},
	render: function(){
		return	<div className="main-bar">
							<div className="drag-area"></div>
							<div className="content-area">
									<i onClick={this.showWindows} className="fa fa-plus-square"></i>
									<i onClick={this.toggleAnimateLoop} className="fa fa-arrows"></i>
									<i className="fa fa-area-chart"></i>
									<i onClick={this.minWindows} className={this.state.desc}></i>
									<i onClick={this.restoreWindows} className={this.state.asc}></i>
									<i className="fa fa-file-excel-o"></i>
									<i onClick={this.openBlotter} className="fa fa-tasks"></i>
							</div>
							<div className="window-control">
								<i onClick={this.minApp} className="fa fa-minus"></i>
								<i onClick={this.closeApp} className="fa fa-times"></i>
							</div>
						</div>
	}
});



// var floor = Math.floor;
// var random = Math.random;

// function genPairs(arr) {
//     return arr.reduce(function(m, itm, idx, a) {
// 	        m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
// 	        return m
// 	    }, [[], arr.slice()])[0].reduce(function(m, itm, idx, a) {

// 	        if (!(idx % 2)) {
// 	            m.push([itm, a[idx + 1]]);
// 	        }
// 	        return m
// 	    }, [])
// }
// function animateAsPromise (wnd, animations ,opts) {
// 	return new Promise((resolve, reject)=>{
// 		fin.desktop.main(()=>{
// 			wnd.animate(animations, opts, ()=>{
// 				resolve();	
// 			},
// 			(reason)=>{
// 				reject(reason);
// 			})
// 		})
// 	});
// }

// function getBoundsAsPromise(wnd){
// 	return new Promise((resolve, reject)=>{
// 		fin.desktop.main(()=>{
// 			wnd.getBounds((bounds)=>{
// 				resolve(bounds);
// 			},(reason)=>{
// 				reject(reason);
// 			});
// 		});
// 	});
// }