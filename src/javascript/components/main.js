var React = require('react'),
		_ = require('underscore'),
		fin = require('../vendor/openfin.js');

var animationWindows = [],
		blotter,
		initialDisplayState = true,
		cubeSize = 185,
		locations = [];;

fin.desktop.main(()=>{

	var top = 5, left = 5, i = 1;

	for (; i < 13; i++){
		animationWindows.push(new fin.desktop.Window({
			name: 'tile' + Math.random(),
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

		if (i && !(i % 4)) {
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
				saveWindowState: false,
				defaultTop: top,
				defaultLeft: left
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

function getBoundsAsPromise(wnd){
	return new Promise((resolve, reject)=>{
		fin.desktop.main(()=>{
			wnd.getBounds((bounds)=>{
				resolve(bounds);
			},(reason)=>{
				reject(reason);
			});
		});
	});
}


// function getRandNoReplace(arr) {
//     if (!arr.length) {
//         return null;
//     }
//     return arr.splice(Math.floor((Math.random() * arr.length)), 1)[0];
// }

// var gr = [ 'a', 'b', 'c', 'd', 'e', 'f' ];

// gr.reduce(function(m, itm, idx, a){
// 	//console.log(arguments);
// 	m[0].push(m[1].splice(Math.floor((Math.random() * m[1].length)), 1)[0]);
// 	return m
// }, [[],gr.slice()]);

// [1,2,3,4,5].sort(function(a,b){
// 	return 1 - Math.floor((Math.random() * 10 ) %  3)
// })

var floor = Math.floor;
var random = Math.random;

// var locations = [];

// var cubeSize = 185;

// var top = 5, left = 5, i = 1;

// for (; i < 13; i++){

// 	locations.push({
// 		top: top,
// 		left: left
// 	});

// 	left += cubeSize + 5;

// 	if (i && !(i % 4)) {
// 		left = 5;
// 		top += cubeSize + 5
// 	}
// }



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

// function generatePairs(arr) {
//     var pairs = [],
//         base = arr.slice(),
//         item = getRandNoReplace(base);

//     while (item) {
//         pairs.push(item);
//         item = getRandNoReplace(base);
//     }

//     //memo, item, index, array
//     return pairs.reduce(function(m, itm, idx, a) {

// 	        if (!(idx % 2)) {
// 	            m.push([itm, a[idx + 1]]);
// 	        }
// 	        return m
// 	    }, [])
// }

// //memo, item, index, array
// [ 'a', 'b', 'c', 'd', 'e', 'f' ].reduce(function(m, itm, idx, a){
// 	//console.log(arguments);
// 	if (!(idx % 2)){
// 		m.push([itm, a[idx + 1]]);
// 	}
// 	return m
// }, [])

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
	animateWindows: function(){

		console.log(genPairs(animationWindows));
		var animationQ = [];

		animationWindows.reduce(function(m, itm, idx, a) {
	        m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
	        return m
	    }, [[], animationWindows.slice()])[0].forEach((item, index)=>{
	    	console.log('item %o goes to %o', item, locations[index]);
	    	animationQ.push(new Promise((resolve, reject)=>{
	    		item.animate({
	    			position: locations[index]
	    		},{},()=>{
	    			resolve()
	    		})
	    	}));
	    });

	   Promise.all(animationQ).then(()=>{
	   	console.log('it so happned')
	   });
		// var available = [0,1,2,3,4,5,6,7,8,9,10,11],
		// 		rand12 = Math.floor(Math.random() * 100) % 12;

		// setInterval(()=>{
		// 	var first = rand12 = Math.floor(Math.random() * 100) % 12,
		// 			second = rand12 = Math.floor(Math.random() * 100) % 12;
		// 	Promise.all([
		// 			getBoundsAsPromise(animationWindows[first]),
		// 			getBoundsAsPromise(animationWindows[second])
		// 		])
		// 		.then((bounds)=>{
		// 			console.log('bounds', bounds);
		// 			animationWindows[first].animate({
		// 				position: {
		// 					top: bounds[1].top,
		// 					left: bounds[1].left,
		// 					duration: 300
		// 				}
		// 			});
		// 			animationWindows[second].animate({
		// 				position: {
		// 					top: bounds[0].top,
		// 					left: bounds[0].left,
		// 					duration: 300
		// 				}
		// 			});
		// 		});
		// }, 400);

			
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
									<i onClick={this.animateWindows} className="fa fa-arrows"></i>
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