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


var rndData = [
{ticker: "PCL", last: 21.251049070187836},
{ticker: "SWI", last: 24.835458631124418},
{ticker: "TCK", last: 6.235665990223004},
{ticker: "DBD", last: 17.01733357355432},
{ticker: "FHN", last: 6.624939800309766},
{ticker: "EXR", last: 33.96528484183794},
{ticker: "BP", last: 21.19160933461151},
{ticker: "WCN", last: 23.501467942817747},
{ticker: "PRE", last: 53.67873008625956},
{ticker: "ITT", last: 22.803668802786465},
{ticker: "BIN", last: 12.594969339431945},
{ticker: "WTM", last: 348.8851038882928},
{ticker: "FHN", last: 6.624939800309766},
{ticker: "CYH", last: 19.131071861657016},
{ticker: "SWK", last: 52.198226722926165},
{ticker: "AMG", last: 127.23849660464248},
{ticker: "BCE", last: 22.765628088640174},
{ticker: "ACC", last: 14.787034222549517},
{ticker: "AA", last: 13.787034222549517}]

var floor = Math.floor;
var random = Math.random;

fin.desktop.main(()=>{

	var top = 5, left = 5, i = 1;

	for (; i < numTiles; i++){
		animationWindows.push(new fin.desktop.Window({
			name: 'tile' + random(),
			url: 'trade.html?t=' + rndData[i].ticker + '&l=' + rndData[i].last,
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
			defaultLeft: left,
			icon: "http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/openfin.ico"
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

});
/* If the blotter has not been created yet, create it and return a promise...*/
var initBlotter = function(){
	var _blotterPromise = new Promise((resolve, reject)=>{
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
			"icon": "http://demoappdirectory.openf.in/desktop/config/apps/OpenFin/HelloOpenFin/img/openfin.ico"
		}, ()=>{
			resolve();
		})
	});
	return _blotterPromise
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
	toggleAnimateLoopStart: function () {
		inLoop = true;
		if (inLoop) {
			this.animateWindows(animationWindows);
		}
	},
	toggleAnimateLoopStop: function () {
		inLoop = false;
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
		if(!blotter){
			initBlotter().then(function(b){
				blotter.show();
			});
		}else{
			blotter.show();
		}
	},
	componentDidMount: function(){
		this.showWindows();
		console.log('called hommie');
	},
	openExcel: function() {

	    fin.desktop.main(function() {
	        launchRuntimeAsset('excel', 'hypergrid.xlsx', function() {
	                console.log('YAY IT LAUNCHED!');
	            },
	            function(err) {
	                console.error("Oh no it failed!");
	            });
	    });
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
									<i onClick={this.toggleAnimateLoopStart} className="fa fa-arrows"></i>
									<i onClick={this.toggleAnimateLoopStop} className="fa fa-ban"></i>
									<i onClick={this.minWindows} className={this.state.desc}></i>
									<i onClick={this.restoreWindows} className={this.state.asc}></i>
									<i onClick={this.openBlotter} className="fa fa-table"></i>
									<i onClick={this.openExcel} className="fa fa-file-excel-o"></i>
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

function genPairs(arr) {
    return arr.reduce(function(m, itm, idx, a) {
	        m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
	        return m
	    }, [[], arr.slice()])[0].reduce(function(m, itm, idx, a) {

	        if (!(idx % 2)) {
	            m.push([itm, a[idx + 1]]);
	        }
	        return m
	    }, [])
}


function launchRuntimeAsset(subPath, args, callback, errorCallback) {
  fin.desktop.System.getEnvironmentVariable(['LOCALAPPDATA', 'USERNAME'], function(result) {
     var localAppData = result['LOCALAPPDATA'];
     var userName = result['USERNAME'];

     // Assuming on Windows XP when LOCALAPPDATA fails to expand. Using default location. Anything with registry setting for installDir will fail.
     if(typeof localAppData !== 'string' || localAppData === 'LOCALAPPDATA') {
     // Assuming on XP
     localAppData = 'C:\\Documents and Settings\\' + userName + '\\Local Settings\\Application Data';
     }

     var runtimePath = localAppData + '\\OpenFin\\runtime\\' + fin.desktop.getVersion() + '\\OpenFin\\';

     fin.desktop.System.launchExternalProcess(subPath, runtimePath + args, callback, errorCallback);
     }, errorCallback);
 }



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