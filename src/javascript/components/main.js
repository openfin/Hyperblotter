var React = require('react'),
		_ = require('underscore'),
		fin = require('../vendor/openfin.js');

var animationWindows = [],
		blotter,
		initialDisplayState = true,
		cubeSize = 185;

fin.desktop.main(()=>{

	var top = 0, left = 0, i = 1;

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

		left += cubeSize + 5;

		if (i && !(i % 4)) {
			left = 0;
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

	},
	openBlotter: function(){
		blotter.show();
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