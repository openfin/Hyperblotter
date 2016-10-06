var React = require('react'),
    _ = require('underscore'),
    windowManager = require("../windowsListSingleton"),
    fin = require('../vendor/openfin.js'),
    TooTip = require("../components/tooltip-decorator"),
    excel = require("../vendor/ExcelAPI.js"),
    excel_plugin_installed = false;

window.io = require('socket.io-client');

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
    {ticker: "GOOG", last: 799.70},
    {ticker: "PCLN", last: 698.54},
    {ticker: "ISRG", last: 575.04},
    {ticker: "MA", last: 513.20},
    {ticker: "AAPL", last: 448.45},
    {ticker: "GHC", last: 483.00}, // changed from WPO
    {ticker: "AZO", last: 375.55},
    {ticker: "CMG", last: 313.29},
    {ticker: "AMZN", last: 263.11},
    {ticker: "BLK", last: 239.92},
    {ticker: "GWW", last: 226.82},
    {ticker: "IBM", last: 200.47},
    {ticker: "CF", last: 199.16},
    {ticker: "CHTR", last: 272.25}, // changed from PCP
    {ticker: "NFLX", last: 182.26},
    {ticker: "RL", last: 172.83},
    {ticker: "CRM", last: 166.21},
    {ticker: "BIIB", last: 165.12},
    {ticker: "VFC", last: 160.36}];

var floor = Math.floor;
var random = Math.random;

function getWorkSheet(workBook, workSheet){
   //  "Worksheet is ", workBook + " : " +  workSheet
   fin.desktop.Excel.getWorkbooks(function(workbooks){
        workbooks.filter(function(d, i){
            return d.name === workBook
        }).map(function(d,i){
            var _worksheet = d.getWorksheets(function(ws){
                ws.filter(function(dd,ii){
                    return dd.name === workSheet
                }).map(function(ddd,iii){
                    console.log("THE WORKSHEET IS ", ddd)
                    ddd.setCells([["a", "b", "c"], [1, 2, 3]], "A1");
                })
            })
        });
    });
    return "TESTING "
}

var _ExcelSheetOpen = false;

fin.desktop.main(()=>{

    fin.desktop.InterApplicationBus.subscribe("*",
        "inter_app_messaging",
        function (message, senderUuid) {
            console.log("This following message has been received from "
                + senderUuid + ": ", message);
            if(message.hyperblotterExists === 'true'){
                console.log()
            }
        });

    initBlotter().then(function(b){
        // do nothing, if you want the blotter to show automatically blotter.show();
    });

    initAnimationWindows().then(function(val){

        fin.desktop.System.addEventListener('monitor-info-changed', function (evnt) {
            console.log("The monitor information has changed to: ", evnt);
            document.dispatchEvent(new CustomEvent('monitor-changed', {'detail': evnt}));
        }, function () {
            console.log("The registration of 'monitor-info-changed' was successful");
        },function (err) {
            console.log("failure: registration of 'monitor-info-changed' " + err);
        });
    });

	initWpfChart();
});


/* Initialises all the floating 'trade' windows. */
var initAnimationWindows = function(){
    console.log("initAnimationWindows called _tilesCreated == ",_tilesCreated);

    return new Promise(function(resolve, reject){
        if(_tilesCreated){
            resolve()
        } else{

            _tilesCreated = true;

            fin.desktop.main(()=> {
                var leftOffset = 105, topOffset = 50, top = topOffset, left = leftOffset, tileMargin = 8, i = 1;
                for (; i < numTiles; i++) {
                    animationWindows.push(new fin.desktop.Window({
                        name: 'tile' + i,
                        url: 'trade.html?t=' + rndData[i - 1].ticker + '&l=' + rndData[i - 1].last + '&tile=' + i,
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
                    if (i === numTiles - 1) {
                        console.log(" _tilesCreated === true");
                        _tilesCreated = true;
                        resolve();
                    }
                }
            });
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
            defaultWidth: 970,
            maxWidth: 970,
            minWidth: 970,
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

var initWpfChart = function(){
	fin.desktop.Application.getCurrent().getManifest(function (manifest) {
		var version = manifest.runtime.version;
		var appUuid = manifest.startup_app.uuid;

		var args = '--parentuuid=' + appUuid + ' --runtimeversion=' + version + ' --hidden=true';

		fin.desktop.System.launchExternalProcess({
			alias: 'hyperblotter-chart',
			arguments: args
		});
	});
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
                wnd.bringToFront();
            }catch(err){
                //--
            }
            this.setState({
                animationWindowsShowing: true,
                tilesMaximised: true
            })
        });
        this.animateWindows(animationWindows, false);

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
    toggleShowAnimationWindows:function(){
        console.log("toggleShowAnimationWindows called this. this.state.animationWindowsShowing = ",this.state.animationWindowsShowing);
        if(this.state.animationWindowsShowing){
            this.closeAnimationWindows();
        }else{
            this.openAnimationWindows();

        }
    },
    openAnimationWindows:function(){
        console.log(" openAnimationWindows called ");
        initAnimationWindows().then(()=>{
            console.log(" initAnimationWindows resolved ");
            this.showWindows();
        });

        this.setState({
            animationWindowsShowing: true,
            tilesMaximised: true
        });
    },
    closeAnimationWindows: function(){
        console.log("closeAnimationWindows -- called")
        this.toggleAnimateLoopStop();
        animationWindows.forEach((wnd)=>{
            wnd.hide();
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
            blotter.bringToFront();
        }
    },
    componentDidMount: function(){
        console.log('Component did mount...', this);
        var that = this;
        var lastBloombergDataUpdate;
        var _repositionWindows = function(){
            if(!this.state.inLoop &&  this.state.animationWindowsShowing){
                this.animateWindows.call(this, animationWindows, false);
            }
        }.bind(this);

        document.addEventListener('monitor-changed', function(e){
            _repositionWindows();
        })

        initAnimationWindows().then(function(val) {
            var bloombergPluginServerUuid;

            // Launch bloomberg plugin on the server
            fin.desktop.main(function() {
                fin.desktop.System.launchExternalProcess(
                    {
                        alias: 'bloomberg',
                        listener: function(m) {
                            console.log('Listener on Bloomberg plugin server received: ', m);
                        }
                    },
                    function(m) {
                        console.log('Bloomberg plugin server launched successfully: ', m);
                        bloombergPluginServerUuid = m.uuid;
                        startBloombergSession();
                    },
                    function() {
                        console.log('An error from Bloomberg plugin server: ', arguments);
                    }
                );

                fin.desktop.Window.getCurrent().addEventListener('close-requested', function() {
                    if (bloombergPluginServerUuid) {
                        fin.desktop.System.terminateExternalProcess(bloombergPluginServerUuid, 2000, true, function() {
                            console.log('Terminated bloomberg plugin server');
                            fin.desktop.Application.getCurrent().close(true);
                        }, function(err) {
                            console.log('Failed to terminated bloomberg plugin server', err);
                            fin.desktop.Application.getCurrent().close(true);
                        });
                    }
                });
            });

            // Start this session to monitor connection with Bloomberg.
            // It will help determine whether Bloomberg is available on the system
            function startBloombergSession() {
                var bloombergSession = new fin.desktop.Plugins['openfin-bloomberg'].Session();
                var bloombergDataSubList = [];

                bloombergSession.on('SessionStartupFailure', function(e) {
                    that.setState({bloombergIsConnected: false});
                });

                bloombergSession.on('SessionConnectionDown', function(e) {
                    that.setState({bloombergIsConnected: false});
                });

                bloombergSession.on('SessionConnectionUp', function(e) {
                    that.setState({bloombergIsConnected: true});
                });

                bloombergSession.on('SessionStarted', function(m) {
                    that.setState({bloombergIsConnected: true});
                    bloombergSession.openService('//blp/mktdata', 100);
                });

                // Create subscriptions list
                rndData.forEach(function(e, i) {
                    bloombergDataSubList.push({
                        security: e.ticker + ' US Equity',
                        correlation: i + 1,
                        fields: ['LAST_TRADE', 'LAST2_TRADE', 'OPEN', 'HIGH', 'LOW', 'OPEN_TDY', 'HIGH_TDY', 'LOW_TDY']
                    });
                });

                bloombergSession.on('ServiceOpened', function(m) {
                    if (m.correlations[0].value === 100) {
                        bloombergSession.subscribe(bloombergDataSubList);
                    } else {
                        console.error('Service opened had wrong correlation value! (Needed 100)', m);
                    }
                });

                bloombergSession.on('MarketDataEvents', function(m) {
                    // Prevent sending garbage
                    if (typeof m.data['LAST_TRADE'] === 'number' ||
                        typeof m.data['OPEN'] === 'number' ||
                        typeof m.data['HIGH'] === 'number' ||
                        typeof m.data['LOW'] === 'number' ||
                        typeof m.data['OPEN_TDY'] === 'number' ||
                        typeof m.data['HIGH_TDY'] === 'number' ||
                        typeof m.data['LOW_TDY'] === 'number') {

                        lastBloombergDataUpdate = m;
                        fin.desktop.InterApplicationBus.publish('tile' + m.correlations[0].value, m);
                    }
                });

                bloombergSession.start();
            }


            setInterval(function() {
                if (lastBloombergDataUpdate) {
                    console.log('Throttled BB data: ', lastBloombergDataUpdate);
                    lastBloombergDataUpdate = null;
                }
            }, 5000);
        });
    },


    openExcel: function() {
        console.log("Open Excel called in main excel_plugin_installed = ", excel_plugin_installed)
        if(!excel_plugin_installed){

            fin.desktop.main(function() {
                fin.desktop.System.launchExternalProcess({
                    alias: 'excel-dist',
                    arguments: "-i -l hyperblotter.xlsx",
                    listener: function(event){
                        // react to close event
                        if(event.topic === "exited" && event.exitCode === MY_KNOWN_BAD_STATE) {
                            // your desired logic here
                            console.log("Excited Excel")
                        }else{
                            console.log("This is where I would like to open the new Excel...")
                            // this.openNewExcel()
                        }
                    }
                });
            });
            // excel_plugin_installed = true;
           // this.openNewExcel();
            var workbook = fin.desktop.Excel.addWorkbook(function(evt){
                console.log(">>>> A NEW WORKBOOK ADDED -- THIS IS THE CALLBACK: ", evt)
            });
            // if(currentWorkbook == workbook) return;
        }else{
            this.openNewExcel();
        }
    },

    openNewExcel: function() {

        fin.desktop.main(function(){

            var Excel = fin.desktop.Excel;
            Excel.init();
            Excel.getConnectionStatus(function(evt){
                console.log("ON CONNECTION STATUS -- ", evt)
            });
            Excel.addEventListener("workbookAdded", this.onWorkbookAdded);
            Excel.addEventListener("workbookClosed", this.onWorkbookRemoved);
            Excel.addEventListener("connected", this.onExcelConnected);
            console.log("Called Excel ", Excel)
        });
    },
    workBookAddedCallback: function(evt){
        console.log("Wokbook added callback called... ", evt);
    },

    onExcelConnected:function(){
        console.log("EXCEL FUNCTION CALLED ")
    },
    onWorkbookAdded:function(){
        console.log("EXCEL FUNCTION CALLED -- onWorkbookAdded ")
    },
    onWorkbookRemoved:function(){
        console.log("EXCEL FUNCTION CALLED ")
    },
    onWorkbookActivateed:function(){
        console.log("EXCEL ON WORKBOOK ACTIVATED CALLED ")
    },


    getInitialState: function(){
        return {
            animationWindowsShowing: false,
            tilesMaximised: false,
            inLoop : false,
            useBloombergData: false
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
    onBloombergButtonClick: function() {
        var useBloombergData = !this.state.useBloombergData;
        this.setState({
            useBloombergData: useBloombergData
        });

        // let all the tiles know whether they should use bloomberg data or display fake one
        fin.desktop.InterApplicationBus.publish('use bloomberg data', useBloombergData);
    },
    render: function(){
        return	<div className="main-bar">
            <image className="openfinLogo" type="image/svg+xml" src="images/hyperblotter_text.svg" />

            <div className="window-control">
                <i onClick={this.closeApp} className="fa fa-times"><div></div> </i>
                <i onClick={this.minApp}  className="fa "><div></div></i>
            </div>
            <div className="drag-area"></div>
            <div className="drag-area-display">
            </div>

            <div className="content-area">
                <div>
                        <i onClick={this.openAnimationWindows} style={ this.getAnimateParentClass() }>
                            <TooTip legend="Launch">
                                <span className='fa fa-th'></span>
                            </TooTip>
                        </i>
                        <i onClick={this.toggleShowAnimationWindows} style={this.getMinifyText().style} >
                            <TooTip legend="Close">
                                <span className={this.getMinifyText().icon}></span>
                            </TooTip>
                        </i>

                    <i onClick={this.toggleAnimateLoop} style={this.getAnimateClass().style} >
                        <TooTip legend="Animate">
                            <span className={ this.getAnimateClass().class }></span>
                        </TooTip>
                    </i>

                </div>
                <div>
                    <i onClick={this.openBlotter}>
                        <TooTip legend="Grid">
                            <span className="fa fa-table"></span>
                        </TooTip>
                    </i>
                </div>
                <div>
                    <i onClick={this.openExcel} >
                        <TooTip legend="Excel">
                            <span className="fa fa-file-excel-o"></span>
                        </TooTip>
                    </i>
                </div>
                <div>
                    <i onClick={this.onBloombergButtonClick}>
                        <TooTip legend="Bloomberg">
                            <img src="images/bloomberg-logo.png" className={'bloomberg-button' + (!this.state.bloombergIsConnected ? ' disabled' : (this.state.useBloombergData ? ' active' : ''))}/>
                        </TooTip>
                    </i>
                </div>
                <div>
                    <i onClick={this.openGithub}>
                        <TooTip legend="GitHub">
                            <span className="fa fa-github-alt"></span>
                        </TooTip>
                    </i>
                </div>
            </div>
        </div>
    }
});
