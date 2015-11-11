var React = require('react'),
    _ = require('underscore'),
    windowManager = require("../windowsListSingleton");
    fin = require('../vendor/openfin.js');

var _windowManager = windowManager.getInstance(),
    animationWindows = _windowManager.getWindows(),
    blotter,
    inLoop = false,
    cubeSize = 185,
    locations = [],
    numColumns = 6,
    numRows = 3,
    demoTiles = {},
    numTiles = numRows * numColumns + 1,
// Have the grid windows been created yet?
    _tilesCreated = false;


/* Static data for the floating 'trade' animation windows */

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
    {ticker: "AA", last: 13.787034222549517}];

var floor = Math.floor;
var random = Math.random;

fin.desktop.main(()=>{

    initAnimationWindows().then(function(val){
        fin.desktop.System.deleteCacheOnRestart(function () {
            console.log("successfully deleted cache");
        },function (err) {
            console.log("failure to delete cache: " + err);
        });

        fin.desktop.System.addEventListener('monitor-info-changed', function (evnt) {
            console.log("The monitor information has changed to: ", evnt);
            document.dispatchEvent(new CustomEvent('monitor-changed', {'detail': evnt}));
        }, function () {
            console.log("The registration of 'monitor-info-changed' was successful");
        },function (err) {
            console.log("failure: registration of 'monitor-info-changed' " + err);
        });
    });
});


/* Initialises all the floating 'trade' windows. */
var initAnimationWindows = function(){
    console.log("initAnimationWindows called _tilesCreated == ",_tilesCreated);
    return new Promise(function(resolve, reject){
        if(_tilesCreated){
            resolve()
        } else{
            var leftOffset = 105, topOffset = 50, top = topOffset, left = leftOffset, tileMargin = 8,  i = 1;
            for (; i < numTiles; i++){
                console.log("LOOP ",i, " numTiles ",numTiles);
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

                left += cubeSize + tileMargin;

                if (i && !(i % numColumns)) {
                    left = leftOffset;
                    top += cubeSize + tileMargin;
                }
                if(i === numTiles-1){
                    console.log(" _tilesCreated === true");
                    _tilesCreated = true;
                    resolve();
                }
            }
        }
    });
};

/* If the blotter has not been created yet, create it and return a promise...*/
var initBlotter = function(){
    var _blotterPromise = new Promise((resolve, reject)=>{
        blotter = new fin.desktop.Window({
            name: 'blotter',
            url: 'hypergrid.html',
            autoShow: false,
            defaultWidth: 840,
            maxWidth: 840,
            minWidth: 840,
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
        console.log("MINIFYING APP.")
        fin.desktop.main(function(){
            fin.desktop.Window.getCurrent().minimize();
        });
    },
    showWindows: function(){
        console.log("showWindows called");
        animationWindows.forEach((wnd)=>{
            try{
                wnd.show();
            }catch(err){
                //--
            }
        });
        this.animateWindows(animationWindows, false);
        this.setState({
            animationWindowsShowing: true,
            tilesMaximised: true
        });
    },
    toggleMinimised:function(){
        this.state.tilesMaximised ? this.minWindows() : this.restoreWindows();
    },
    minWindows: function() {
        this.toggleAnimateLoopStop();


        animationWindows.forEach((wnd)=>{
            wnd.minimize();
        });
        this.setState({
            tilesMaximised: false
        })
    },
    restoreWindows: function () {
        //
        animationWindows.forEach((wnd)=>{
            wnd.restore();
        });
        this.openAnimationWindows();
        this.setState({
            animationWindowsShowing: true,
            tilesMaximised: true
        })
    },
    toggleShowAnimationWindows:function(){
        console.log("toggleShowAnimationWindows called this. openAnimationWindows = ", this.openAnimationWindows);
        if(this.state.animationWindowsShowing){
            this.openAnimationWindows()
        }else{
            this.closeAnimationWindows();
        }
    },
    openAnimationWindows:function(){
        console.log(" openAnimationWindows called ");
        initAnimationWindows().then(()=>{
            console.log(" initAnimationWindows resolved ");
            this.showWindows();
        });
    },
    closeAnimationWindows: function(){
        this.toggleAnimateLoopStop();
        animationWindows.forEach((wnd)=>{
            wnd.close();
        });

        this.setState({
            animationWindowsShowing: false,
            tilesMaximised: false
        })
    },
    toggleAnimateLoop:function(){
        inLoop ? this.toggleAnimateLoopStop() : this.toggleAnimateLoopStart();
    },
    toggleAnimateLoopStart: function () {
        inLoop = true;
        this.setState({"inLoop":true});
        if (inLoop) {
            this.animateWindows(animationWindows);
        }
    },
    toggleAnimateLoopStop: function () {
        inLoop = false;
        this.setState({"inLoop":false});
    },
    // Abstracted out the function for randomising
    randomiseAnimationWindows: function(){
        return animationWindows
            .reduce(function(m, itm, idx, a) {
                m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
                return m
            }, [
                [], animationWindows.slice()
            ])[0]
    },

    animateWindows: function(animationWindows, randomise){
        //Unless explicitly asked not to, randomise
        var _randomise = randomise !== false ? true : false;
        var _arr = _randomise ?  this.randomiseAnimationWindows() : animationWindows;
        setTranspatentAsPromise(animationWindows, 0.5).then(()=>{
            Promise.all(
                _arr
                    .map((item, index) => {
                        return new Promise((resolve, reject) => {
                            try{
                                item.animate({
                                    position: locations[index]
                                }, {}, () => {
                                    resolve()
                                })
                            }catch(err){
                                //-----
                            }
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
        console.log('Component did mount...', this);
        var _repositionWindows = function(){
            if(!this.state.inLoop &&  this.state.animationWindowsShowing){
                this.animateWindows.call(this, animationWindows, false);
            }
        }.bind(this);

        document.addEventListener('monitor-changed', function(e){
            _repositionWindows();
        })
    },
    openExcel: function() {

        fin.desktop.main(function() {

          fin.desktop.System.launchExternalProcess({
            alias: 'hypergrid',
            arguments: '',
            listener: function(event){
               // react to close event
              if(event.topic === "exited" && event.exitCode === MY_KNOWN_BAD_STATE) {
                // your desired logic here
              }
            }
          });
        });

    },
    getInitialState: function(){
        return {
            animationWindowsShowing: false,
            tilesMaximised: false,
            inLoop : false
        }
    },
    getAnimationWindowsStyle:function(){
        return this.state.animationWindowsShowing ? "none" : "menuitem";
    },
    getAnimateClass:function(){
        if(this.state.animationWindowsShowing && this.state.tilesMaximised){
            var _class = this.state.inLoop ?  "fa fa-pause" : "fa fa-play";
            return {class: _class , style: {"display": "block"}};
        } else {
            var _class = this.state.inLoop ? "fa fa-pause" : "fa fa-play";
            var _style = {
                "opacity": "0.2",
                "webkitTouchCallout": "none",
                "webkitUserSelect": "none",
                "khtmlUserSelect": "none",
                "mozUserSelect": "none",
                "msUserSelect": "none",
                "userSelect": "none",
                "pointerEvents": "none"

        };
            return {class: _class, style: _style}
        }
    },

    getAnimateParentClass:function(){
        if(this.state.animationWindowsShowing ){
            return {"display" : "none"};
        } else{
            return {"display":"block"};
        }
    },


    getAnimateText:function(){
        if(this.state.animationWindowsShowing ){
            return this.state.inLoop ?   "Pause animation" :  "Play animation" ;
        }else{
            return "";
        }
    },
    getMinifyText:function(){
        if(this.state.animationWindowsShowing ){
            return this.state.tilesMaximised ?  {text: " Minimise", style: {"display" :"block"}, css: "none", icon:"fa fa-sort-amount-desc"} : {text: " Maximise", css: "", style: {"display" :"block"}, icon:"fa fa-sort-amount-asc"};
        } else{
            return {text: "Minimise", style: {"display" :"none"}, css: "none", icon:"fa fa-sort-amount-desc"};
        }
    },
    openGithub: function(){
        fin.desktop.System.openUrlWithBrowser("https://github.com/openfin/Hyperblotter/tree/master", function () {
        },function (err) {
            console.log("Failed to open GitHub: " + err);
        });
    },
    render: function(){
        return	<div className="main-bar">
            <div className="window-control">
                <i onClick={this.closeApp} className="fa fa-times"><div></div> </i>
                <i onClick={this.minApp}  className="fa "><div></div></i>
            </div>
            <div className="drag-area"></div>
            <div className="drag-area-display"></div>

            <div className="content-area">
                <div>
                    <i onClick={this.openAnimationWindows} style={ this.getAnimateParentClass() }><span className='fa fa-th'></span></i>
                    <i onClick={this.toggleAnimateLoop} style={this.getAnimateClass().style} ><span className={ this.getAnimateClass().class }></span></i>
                    <i onClick={this.toggleMinimised} style={this.getMinifyText().style} ><span className={this.getMinifyText().icon}></span></i>
                </div>
                <hr />
                <div>
                    <i onClick={this.openBlotter}><span className="fa fa-table"></span></i>
                </div>
                <hr />
                <div>
                    <i onClick={this.openExcel} ><span className="fa fa-file-excel-o"></span></i>
                </div>
                <hr />

                <image className="" type="image/svg+xml" src="images/hyperblotter_sidetext.svg" />

                <div className="copyright">
                    <a onClick={this.openGithub}><i className="fa fa-github-alt"></i></a>
                </div>
            </div>
        </div>
    }
});

//function genPairs(arr) {
//    return arr.reduce(function(m, itm, idx, a) {
//        m[0].push(m[1].splice(floor((random() * m[1].length)), 1)[0]);
//        return m
//    }, [[], arr.slice()])[0].reduce(function(m, itm, idx, a) {
//
//            if (!(idx % 2)) {
//                m.push([itm, a[idx + 1]]);
//            }
//            return m
//        }, [])
//}


/*
 <image className="openfinLogo" type="image/svg+xml" src="images/openfin_logo.svg" />

 */