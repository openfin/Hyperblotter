// @file Contains functionality to support the advanced library
 
(function(){

	function _stxAdvanced_js(_exports) {
		
		var STX=_exports.STX;
		var STXChart=_exports.STXChart;
		var $$=_exports.$$;
		var $$$=_exports.$$$;
		
		/**
		 * Plugin that support chart comparison.
		 */
		STX.Comparison.startPlugin();
		
		/**
		 * Default color selection for Comparison UI. This array will be traversed as the user adds comparison charts and then loop back at the end.
		 * @type {Array}
		 */
		STX.Comparison.colorOrder=["#b387d7","#ff9250","#e36460","#dcdf67","#b3d987","#ffcd2b","#66cac4","#97b8f7"];
		
		/**
		 * The current location in the STX.Comparison.colorOrder array.
		 * @type {Number}
		 */
		STX.Comparison.colorPointer=0;
		
		/**
		 * Comparisons can either be "compare" or "series". The UI defaults to "compare" which produces a y-axis with relative percentage
		 * changes. series creates overlays that may or may not share a y-axis
		 * @type {String}
		 */
		STX.Comparison.type="compare";
		
		/**
		 * ID of the study panel to create for the correlation coefficient
		 */
		STX.Comparison.correlationPanel="correl";
		/**
		 * Initial value of UI input for toggling correlation coefficient
		 */
		STX.Comparison.requestCorrelation=false;
		
		/**
		 * Attaches a color picker to the comparison UI
		 */
		STX.Comparison.attachColorPicker=function(){
			var swatch=$$$("#menuWrapperCompare .stx-color");
			var style=getComputedStyle(swatch);
			if(style) STX.Comparison.colorSelection=style.backgroundColor;
			STX.MenuManager.attachColorPicker(swatch, $$$("#menuWrapperCompare #menuCompare"), function(color){
				STX.Comparison.colorSelection="#" + color;
			}, true);
		};
		
		/**
		 * Iterates through the charts masterData and adds a data member for the comparison. The data member will be the string
		 * defined by "symbol". Dates must be exact matches (minutes, hours, seconds, milliseconds) in order to show up in the comparison.
		 * @param  {object} stx        A chart object
		 * @param  {string} symbol     The data member to add for comparison
		 * @param  {array} comparison Comparison data (which should align or closely align with the chart data by date)
		 */
		STX.Comparison.processComparison=function(stx, symbol, comparison){
			// Match up the comparison and store the data point
			var mIterator=0,cIterator=0;
			while(mIterator<stx.masterData.length && cIterator<comparison.length){
				var c=comparison[cIterator];
				var m=stx.masterData[mIterator];
				if(!c.DT) c.DT=STX.strToDateTime(c.Date);
				if(c.DT.getTime()==m.DT.getTime()){
					m[symbol]=c.Close;
					cIterator++;
					mIterator++;
					continue;
				}
				if(c.DT<m.DT) cIterator++;
				else mIterator++;
			}
			//stx.createDataSet();
		};
		
		/**
		 * Adds a new comparison symbol. This method is driven from the UI but can also be called programatically if the comparison UI is at least
		 * available (otherwise use stx.addSeries). It uses the STX.Quotes infrastructure to fetch data.
		 * @param {object} stx           The chart object
		 * @param {string} compareSymbol The symbol to compare
		 */
		STX.Comparison.add=function(stx, compareSymbol, cb, displaySymbol){
			if(!compareSymbol) compareSymbol=$$$("#compareSymbol").value.toUpperCase();
			if(compareSymbol=="") return;
			if(compareSymbol==stx.chart.symbol) return;
			$$$("#compareSymbol").blur();
			function processResponse(symbol,displaySymbol){
				return function(err, comparisonData){
					if(err) return;
					if(!stx.chart.legend){
						stx.chart.legend={
								x: 260,
								y: 10
						};
					}
		            $$$("#compareSymbol").value="";
		        	$$$("#compareNone").style.display="none";
		            STX.Comparison.processComparison(stx, symbol, comparisonData);
					var isComparison=(STX.Comparison.type=="compare");
					var sharedAxis=isComparison || STX.Comparison.type=="absolute";
					var myseries = stx.addSeries(symbol, {display:displaySymbol, color: STX.Comparison.colorSelection, isComparison:isComparison, shareYAxis:sharedAxis, quoteFeedCallbackRefresh:true});
					stx.createDataSet();
					STX.Comparison.correlate(stx, symbol);
					if(isComparison){
						stx.setComparison(stx, stx.chart, true);
					}
					stx.draw();
					if(!STX.Comparison.comparisons[symbol]){
						var template=$$$(".symComparisonTemplate");
						var div=template.cloneNode(true);
						$$$(".stxItem", div).innerHTML=symbol;
						$$$(".stx-ico-close", div).onclick=function(stx, symbol){return function(){
							stx.removeSeries(symbol);
							stx.draw();
						};}(stx, symbol);
						div.style.display="";
						template.parentNode.appendChild(div);
						STX.Comparison.comparisons[symbol]={
								"div": div
						};
					}
					// Set up the next default color
					STX.Comparison.colorPointer++;
					if(STX.Comparison.colorPointer>=STX.Comparison.colorOrder.length) STX.Comparison.colorPointer=0;
					STX.Comparison.colorSelection=$$$("#menuWrapperCompare .stx-color").style.backgroundColor=STX.Comparison.colorOrder[STX.Comparison.colorPointer];
					if(cb) cb();
				};
			}
			STX.Comparison.fetch(stx, compareSymbol, processResponse(compareSymbol,displaySymbol));
			
		};
		
		
		
		/**
		 * Override this with your version of fetch! The data you fetch should be in the standard chart JSON format.
		 * Once your data is fetched, call cb(error, data);
		 */
		STX.Comparison.fetch=function(stx, comparisonSymbol, cb){
			// Your code to fetch data
		};
		
		/**
		 * Resets comparisons, removing all existing comparisons and resetting the UI. Call this when changing symbols or to "remove all" comparisons.
		 * @param  {object} stx The chart object
		 */
		STX.Comparison.reset=function(stx){
			for(var field in STX.Comparison.comparisons){
				var comparison=STX.Comparison.comparisons[field];
				var div=comparison.div;
				div.parentNode.removeChild(div);
				if(stx.chart.series[field]) delete stx.chart.series[field];
			}
			STX.Comparison.comparisons={};
			STX.Comparison.colorPointer=0;
			STX.Comparison.colorSelection=$$$("#menuWrapperCompare .stx-color").style.backgroundColor=STX.Comparison.colorOrder[STX.Comparison.colorPointer];
			stx.setComparison(stx, stx.chart, false);
			for(var panel in stx.panels){
				if(stx.panels[panel].name.indexOf(STX.Comparison.correlationPanel)==0) stx.panelClose(stx.panels[panel]);
			}
			$$$("#compareNone").style.display="";
		};
		
		/**
		 * Initializes the comparison UI to handle keystrokes and color picking and to associate it with a chart object
		 * @param  {object} stx The chart object
		 */
		STX.Comparison.initialize=function(stx){
			STX.Comparison.attachColorPicker();
			STX.Comparison.comparisons={};	// Holding object for comparison symbols
			STX.inputKeyEvents($$$("#compareSymbol"), function(){
				var compareSymbol=$$$("#compareSymbol").value.toUpperCase();
				if(compareSymbol==stx.chart.symbol) return;
			    STX.MenuManager.closeThisMenu($$$("#compareSymbol"));
			    STX.Comparison.add(stx);
			});
		};
		
		/**
		 * The comparison plugin adds functionality to the built in "removeSeries" function. This updates the comparison UI if a user
		 * removes a series by right clicking.
		 * @param  {string} field The comparison that is being removed
		 */
		STXChart.prototype.prepend("removeSeries", function(field){
			var comparison=STX.Comparison.comparisons[field];
			if(!comparison) return;
			var div=comparison.div;
			div.parentNode.removeChild(div);
			delete STX.Comparison.comparisons[field];
			if(STX.isEmpty(STX.Comparison.comparisons)){
				STX.Comparison.reset(this);
			}
		});
		
		
		/**
		 * Computes a ratio chart given an array of two data sets.
		 * Current hard coded to just ratio charts!
		 * @param {string} equation The equation to compute
		 * @param  {Object} map An map of symbols to data
		 * @return {Array}     A consolidated array of ratio chart data
		 */
		STX.computeEquationChart=function(equation, map){
			var newArray=[];
			var mIterator=0,cIterator=0;
			var symbols=equation.split("/");
			var master=map[symbols[0]];
			var comparison=map[symbols[1]];
			var closeOnly=false;
			if(comparison==null){ //use the quote in master for the symbol
				comparison=master;
				closeOnly=true;
			}
			while(mIterator<master.length && cIterator<comparison.length){
				var m=master[mIterator];
				var c=comparison[cIterator];
				if(!c.DT) c.DT=STX.strToDateTime(c.Date);
				if(!m.DT) m.DT=STX.strToDateTime(m.Date);
				if(c.DT.getTime()==m.DT.getTime()){
					if(closeOnly){
						var close=m.Close/c[symbols[1]];
						close=Math.round(close*10000)/10000;
						if(!isNaN(close)) newArray.push({DT:m.DT, Close:close, Adj_Close:close});
					}else{
						m.Close/=c.Close;
						m.High/=c.Close;
						m.Low/=c.Close;
						m.Open/=c.Open;
						m.Volume/=c.Volume;
						if(!isNaN(m.Close)) newArray.push(m);
			
						m.High=Math.round(m.High*10000)/10000;
						m.Low=Math.round(m.Low*10000)/10000;
						m.Open=Math.round(m.Open*10000)/10000;
						m.Close=Math.round(m.Close*10000)/10000;
						m.Adj_Close=m.Close;
					}
					cIterator++;
					mIterator++;
					continue;
				}
				if(c.DT<m.DT) cIterator++;
				else mIterator++;
			}
			return newArray;
		};
		
		/**
		 * Calculates range bars. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {number} range The price range for the range bars. This is typically user configurable.
		 * @return {array}        The replacement dataSet
		 */
		
		STX.calculateRangeBars=function(stx, dataSet, range){
			if(dataSet.length==0) return dataSet;
			// If range is not specified we'll come up with a reasonable default value
			// caveman algorithm, finds a range so that ~300 bars worth of time are displayed
			// i.e. about a year for a daily chart, about 5 hours on a minute chart
			if(range==null){
				var l=Math.min(300, dataSet.length);
				var minMax=stx.determineMinMax(dataSet.slice(dataSet.length-l), ["High","Low"]);
				var shadow=minMax[1]-minMax[0];
				range=shadow/(stx.chart.panel.height/30); // assume ideal bar size is 30 pixels high
			}
			var newDataSet=[];
		
			var currentPrice=null, targetPrice;
		
			function createBar(q, open, close){
				newDataSet.push({
					DT: q.DT,
					Date: q.Date,
					Open: open,
					Close: close,
					High: Math.max(open,close),
					Low: Math.min(open, close),
					Volume: 0
				});
			}
			// We translate directional movements O -> H -> L -> C -> O ...
			function processMove(q, b, isFinal){
				while(1){
					if(currentPrice<b){ // direction is upward
						targetPrice=currentPrice+range;
						if(b<targetPrice){
							if(isFinal) createBar(q, currentPrice, b); // print partial bar for current price
							return;
						}
					}else{ // direction is downward
						targetPrice=currentPrice-range;
						if(b>targetPrice){
							if(isFinal) createBar(q, currentPrice, b); // print partial bar for current price
							return;
						}
					}
					createBar(q, currentPrice, targetPrice);
					currentPrice=targetPrice;
				}
			};
			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(currentPrice==null)  currentPrice=q.Open;
				else processMove(dataSet[i-1], q.Open);
		
				// shortest distance between open and either high or low determines initial direction
				if(q.High-q.Open<q.Open-q.Low){
					processMove(q, q.High);
					processMove(q, q.Low);
					processMove(q, q.Close, i==dataSet.length-1);
				}else{
					processMove(q, q.Low);
					processMove(q, q.High);
					processMove(q, q.Close, i==dataSet.length-1);
				}
			}
			return newDataSet;
		};
		
		
		/**
		 * Markers provides the ability to superimpose HTML elements on the chart. Those markers will move with the chart and automatically hide when they
		 * scroll off the edge. Use stxInheritsFrom to derive a class from the base class to create your own markers.
		 * Then override functions as necessary.
		 * Construct is called when a STX.Markers object is initialized. The members defined here are required for all markers implementations.
		 * You may add additional members in your derived class. You may also override these values in your initialize() function
		 */
		STX.Markers.prototype.Construct=function(){
			this.display=true;	// Use this to control whether to display the plugin or not, such as from a menu selection
			this.markers=[];
			this.panelName="chart";	// This can be a different panel
			this.panel=null;		// This will get set automatically given the panel name
			this.placementFunction=null;	// Set this to the placement function of your choice
			this.attached=false;	// Set to true once the panel container is created
			this.hover=true;		// If true then markers will z-index increment when touched or moused over
			this.focus=true;		// If true then markers will take focus away from the chart when touched or moused over
			this.drawStems=true;	// If true then stems will be created that link the markers to the chart bar
			this.stemClass="stx-stem";	// Defines the color and width of the stem
			this.transitionMS=25;		// Milliseconds delay to prevent too many redraws.
		};
		
		
		/**
		 * Marker placement method places a marker directly above the chart candle.
		 */
		STX.Markers.AboveCandle=function(self, stx, panel, markerSet){
			var chart=panel.chart;
			for(var i=0;i<markerSet.length;i++){
				var marker=markerSet[i];
				var node=marker.node;
				var stem=marker.stem;
				// Getting clientWidth and clientHeight is a very expensive operation
				// so we'll cache the results. Don't use this function if your markers change
				// shape or size dynamically!
				if(!marker.clientWidth) marker.clientWidth=node.clientWidth;
				if(!marker.clientHeight) marker.clientHeight=node.clientHeight;
				var quotes=marker.tick<chart.dataSet.length?chart.dataSet[marker.tick]:chart.dataSet[chart.dataSet.length-1];
		
				var bottom;
				if(stx.layout.chartType=="line" || stx.layout.chartType=="mountain"){
					bottom=Math.round(panel.bottom-stx.pixelFromPriceTransform(quotes.Close, panel))+"px";
				}else{
					bottom=Math.round(panel.bottom-stx.pixelFromPriceTransform(quotes.High, panel))+"px";
				}
				
				node.style.left=Math.round(stx.pixelFromTick(marker.tick)-marker.clientWidth/2)+"px";
				if(node.style.bottom!=bottom) node.style.bottom=bottom;
			}
		};
		
		/**
		 * Marker placement method intelligently places markers above the chart so that they can all be seen. It is more computationally expensive
		 * than AboveCandle.
		 */
		STX.Markers.BubblePlacement=function(self, stx, panel, markerSet){
			function overlap(aL, bR, aB, bB, aT, bT){
				if(aL>bR) return false;
				if(aT==bT) return true;
				if(aT<=bB && aT>=bT) return true;
				if(aB>=bT && aB<=bB) return true;
				return false;
			}
			var prevMarker=null;
			var prevLeft=null;
			var prevBottom=null;
			var chart=panel.chart;
			for(var i=0;i<markerSet.length;i++){
				var marker=markerSet[i];
				var node=marker.node;
				var stem=marker.stem;
		
				// Getting clientWidth and clientHeight is a very expensive operation
				// so we'll cache the results. Don't use this function if your markers change
				// shape or size dynamically!
				if(!marker.clientWidth) marker.clientWidth=node.clientWidth;
				if(!marker.clientHeight) marker.clientHeight=node.clientHeight;
				var quotes=marker.tick<chart.dataSet.length?chart.dataSet[marker.tick]:chart.dataSet[chart.dataSet.length-1];
		
		
				var middle=stx.pixelFromTick(marker.tick);
				var nodeLeft=Math.round(middle-marker.clientWidth/2);
				var bottom;
				if(stx.layout.chartType=="line" || stx.layout.chartType=="mountain"){
					bottom=panel.bottom-stx.pixelFromPriceTransform(quotes.Close, panel);
				}else{
					bottom=panel.bottom-stx.pixelFromPriceTransform(quotes.High, panel);
				}
				var absoluteBottom=bottom;
				
				if(stem){
					stem.style.left=Math.round(middle)+"px";
					var stemBottom=absoluteBottom+"px";
					if(stem.style.bottom!=stemBottom) stem.style.bottom=stemBottom;
					bottom+=60;
				}
				if(prevMarker){
					var prevTop=prevBottom-prevMarker.clientHeight;
					var top=bottom-marker.clientHeight;
					if(nodeLeft==prevLeft || overlap(nodeLeft, prevRight, prevBottom, bottom, prevTop, top)){
						bottom=STX.stripPX(prevMarker.node.style.bottom)+prevMarker.clientHeight+3;
					}
				}
				if(stem){
					var stemHeight=Math.round(bottom-absoluteBottom)+"px";
					if(stem.style.height!=stemHeight) stem.style.height=stemHeight;
				}
				node.style.left=nodeLeft+"px";
				var nodeBottom=bottom+"px";
				if(node.style.bottom!=nodeBottom) node.style.bottom=nodeBottom;
				prevMarker=marker;
				prevRight=nodeLeft + marker.clientWidth;
				prevLeft=nodeLeft;
				prevBottom=bottom;
			}
		};
		
		
		/**
		 * Instantiates a stxMarkers plugin with an stx and a name to associate the plugin.
		 * Call this when you create your marker object.
		 * Multiple stxMarkers plugins can be run by choosing different names for each
		 * @param {object} stx Chart object
		 * @param {string} name Unique name for this Marker class
		 */
		STX.Markers.prototype.main=function(stx, name){
			stx.plugins[name]=this;
		};
		
		/**
		 * Override this with your initialization function. This would typically be where you would fetch data from an external ajax server.
		 * This method is called whenever the charting engine requires updated markers, for instance when changing symbols or periodicity.
		 * @param  {object} stx Chart object
		 */
		STX.Markers.prototype.initialize=function(stx){};
		
		
		
		
		/**
		 * Native implementation of watch lists. Uses a STX.StorageManager object for saving and loading lists
		 */
		STX.Watch=function(){};
		
		/**
		 * The array of available lists. If you modify this directly then be sure to call STX.Watch.refreshDisplay
		 * @type {Array}
		 */
		STX.Watch.lists=[];
		
		/**
		 * The index into the STX.Watch.lists array of the currently selected list
		 * @type {number}
		 */
		STX.Watch.currentList=null;
		
		/**
		 * The index into the currently selected list of the currently selected symbol
		 * @type {Number}
		 */
		STX.Watch.currentSymbol=0;
		
		/**
		 * Opens the dialog to create a new list
		 */
		STX.Watch.openNewListDialog=function(){
			$$$("#stxWatchEditName").value="";
			$$$("#stxWatchEditTA").value="";
			STX.DialogManager.displayDialog("stxWatchEditDialog");
		};
		
		/**
		 * Opens the dialog to edit an existing list
		 */
		STX.Watch.openEditListDialog=function(){
			var list=STX.Watch.lists[STX.Watch.currentList];
			var listName=STX.first(list);
			$$$("#stxWatchEditName").value=listName;
			var str="";
			var first=true;
			for(var i=0;i<list[listName].length;i++){
				if(first){
					first=false;
				}else{
					str+=" ";
				}
				str+=list[listName][i];
			}
			$$$("#stxWatchEditTA").value=str;
			STX.DialogManager.displayDialog("stxWatchEditDialog");
		};
		
		/**
		 * Called from the new and edit list dialogs to save the updated list when the user hits the "save" button
		 */
		STX.Watch.saveEditList=function(){
			var ta=$$$("#stxWatchEditTA");
			var listName=$$$("#stxWatchEditName").value;
			if(listName=="") return;
			var list={};
			var existing=false;
			for(var i=0;i<STX.Watch.lists.length;i++){
				if(STX.first(STX.Watch.lists[i])==listName){
					existing=true;
					list=STX.Watch.lists[i];
				}
			}
			if(!existing){
				STX.Watch.lists.push(list);
				STX.Watch.currentList=STX.Watch.lists.length-1;
				STX.Watch.currentSymbol=-1;
				STX.unappendClassName($$$("#stxWatchDown"),"false");
			}
			STX.DialogManager.dismissDialog();
			var w=ta.value.split(/\s/);
			var arr=[];
			for(var i in w){
				if(w[i]=="") continue;
				arr.push(w[i].toUpperCase());
			}
			list[listName]=arr;
			STX.Watch.refreshDisplay();
			STX.Watch.stxStorageManager.store("stx-watchLists", JSON.stringify(STX.Watch.lists));
		};
		
		/**
		 * Deletes the current list
		 */
		STX.Watch.deleteCurrentList=function(){
			STX.Watch.lists.splice(STX.Watch.currentList,1);
			if(STX.Watch.currentList>=STX.Watch.lists.length) STX.Watch.currentList=STX.Watch.lists.length-1;
			if(STX.Watch.currentList<0) STX.Watch.currentList=0;
			STX.Watch.enableList(STX.Watch.currentList);
			if(STX.Watch.lists.length==0){
				STX.Watch.stxStorageManager.remove("stx-watchLists");		
			}else{
				STX.Watch.stxStorageManager.store("stx-watchLists", JSON.stringify(STX.Watch.lists));
			}
		};
		
		/**
		 * Enables the selected list
		 * @param  {number} location The index into the list array to enable
		 */
		STX.Watch.enableList=function(location){
			STX.Watch.currentList=location;
			STX.Watch.currentSymbol=-1;
			STX.Watch.refreshDisplay();
			if(STX.Watch.lists.length>0){
				STX.Watch.enableSymbol(-1);
			}
		};
		
		/**
		 * Enables a symbol in the list
		 * @param  {number} location        The index in the current list of the symbol to enable
		 * @param  {boolean} dontChangeChart If true then the chart will not update, otherwise the chart is updated via the lookup widget
		 */
		STX.Watch.enableSymbol=function(location, dontChangeChart){
			var list=STX.Watch.lists[STX.Watch.currentList];
			var symbols=list[STX.first(list)];
			var symbol;
			
			var symbolNodes=document.querySelectorAll("#stxWatch-inner li");
			for(var i=0;i<symbolNodes.length;i++){
				var li=symbolNodes[i];
				li.className=null;
				if(i==location){
					STX.Watch.currentSymbol=location;
					symbol=symbols[location];
					li.className="current";
				}
			}
			if(STX.Watch.currentSymbol<=0){
				STX.appendClassName($$$("#stxWatchPrev"),"false");
				STX.appendClassName($$$("#stxWatchUp"),"false");
			}else{
				STX.unappendClassName($$$("#stxWatchPrev"),"false");
				STX.unappendClassName($$$("#stxWatchUp"),"false");
			}
				
			if(STX.Watch.currentSymbol==symbols.length-1){
				STX.appendClassName($$$("#stxWatchNext"),"false");
				STX.appendClassName($$$("#stxWatchDown"),"false");
			}else{
				STX.unappendClassName($$$("#stxWatchNext"),"false");
				STX.unappendClassName($$$("#stxWatchDown"),"false");		
			}
			if(symbol){
				$$$("#stxWatchSymbol").innerHTML=symbol;
				STX.Watch.stxLookupWidget.config.selectCallback(null, symbol);	// Load symbol in chart
			}else{
				$$$("#stxWatchSymbol").innerHTML="&nbsp;";
			}
		};
		
		/**
		 * Right clicks or left clicks can enable the symbol
		 * @private
		 */
		STX.Watch.rightClickSymbol=function(location, dontChangeChart){
			return STX.Watch.enableSymbol(location, dontChangeChart);
		};
		
		/**
		 * Moves the symbol selector up or down by the suggested distance
		 * @param  {number} distance Distance to move. Negative number to move up the list.
		 */
		STX.Watch.move=function(distance){
			if(STX.Watch.lists.length<=0) return;
			STX.Watch.currentSymbol+=distance;
			if(STX.Watch.currentSymbol<0) STX.Watch.currentSymbol=0;
			var list=STX.Watch.lists[STX.Watch.currentList];
			var symbols=list[STX.first(list)];
			if(STX.Watch.currentSymbol>=symbols.length) STX.Watch.currentSymbol=symbols.length-1;
			STX.Watch.enableSymbol(STX.Watch.currentSymbol);
			STX.Watch.symbolScroll.scrollToElement('#stxWatch-inner li:nth-child(' + (STX.Watch.currentSymbol) + ')', 250);
			STX.Watch.symbolScroll.refresh();
		};
		
		/**
		 * Updates the HTML with the symbol or list name
		 * @param  {object} listEntry DOM element to update
		 * @param  {string} text      The symbol or list name
		 */
		STX.Watch.createSymbolEntry=function(listEntry,text){
			listEntry.innerHTML=text;
		};
		
		/**
		 * Updates the display of the watch lists. This is called whenever the screen is resized or the panel is opened or closed in order
		 * that the iscroll can update itself.
		 */
		STX.Watch.refreshDisplay=function(){
			var listWrapper=$$$("#stxWLWrapper");
			STX.clearNode(listWrapper);
			var symbolsWrapper=$$$("#stxWatch-inner");
			STX.clearNode(symbolsWrapper);
		
			
			for(var i=0;i<STX.Watch.lists.length;i++){
				var list=STX.Watch.lists[i];
				var li=STX.newChild(listWrapper, "li");
				STX.newChild(li, "div", "save");
				var edit=STX.newChild(li, "div", "edit");
				edit.onclick=STX.Watch.openEditListDialog;
				
				var del=STX.newChild(li, "div", "delete");
				del.onclick=STX.Watch.deleteCurrentList;
				
				var div=STX.newChild(li, "div", "list");
				var listName=STX.first(list);
				div.innerHTML=listName;
				if(STX.Watch.currentList==i){
					li.className="current";
					var symbols=list[listName];
					for(var j=0;j<symbols.length;j++){
						var li2=STX.newChild(symbolsWrapper, "li");
						STX.Watch.createSymbolEntry(li2,symbols[j]);
						if(STX.Watch.currentSymbol==j) li2.className="current";
						STX.ScrollManager.attach(li2, function(j){
							return function(e){
								STX.Watch.enableSymbol(j);
							};
						}(j));
						STX.ScrollManager.attachRightClick(li2, function(j){
							return function(e){
								STX.Watch.rightClickSymbol(j);
							};
						}(j));
					}
				}
				STX.ScrollManager.attach(li, function(i){return function(e){
						STX.Watch.enableList(i);
				};}(i));
			}
			// Don't allow empty list containers, Safari chokes on that
			if(listWrapper.childNodes.length==0){
				STX.newChild(listWrapper, "li");
			}
			if(symbolsWrapper.childNodes.length==0){
				STX.newChild(symbolsWrapper, "li");
			}
			if(STX.Watch.lists.length>0){
				STX.swapClassName($$$("#stxWatch"),"true","false");
			}else{
				STX.swapClassName($$$("#stxWatch"),"false","true");
				STX.appendClassName($$$("#stxWatchUp"),"false");
				STX.appendClassName($$$("#stxWatchDown"),"false");
			}
			var symbolScroller=$$$("#stxWatch-symbols").parentNode;
			var panelHeight=$$$(".stx-panel-side").clientHeight;
			symbolScroller.style.height=(panelHeight-symbolScroller.offsetTop) +"px";
			STX.Watch.symbolScroll.refresh();
			STX.Watch.listScroll.refresh();
			//todo scroll list scroll if current list is off screen (such as when adding new list)
		};
		
		/**
		 * Initializes the watch list functionality. This requires an STX.StorageManager object to store changes and an STX.LookupWidget to enable
		 * symbol changes when users select symbols from their watch list. Call this method when you initialize the UI. You may need to call refreshDisplay()
		 * if HTML changes are made after STX.Watch is initialized.
		 * @param  {object} stxStorageManager STX.StorageManager for getting and saving watch lists
		 * @param  {object} stxLookupWidget   STX.LookupWidget for changing the chart
		 */
		STX.Watch.initialize=function(stxStorageManager, stxLookupWidget){
			STX.Watch.stxLookupWidget=stxLookupWidget;
			STX.Watch.stxStorageManager=stxStorageManager;
			var str=stxStorageManager.get("stx-watchLists");
			if(str){
				STX.Watch.lists=JSON.parse(str);
			}
			$$$("#stxNewWatchList").onclick=STX.Watch.openNewListDialog;
			$$$("#stxWatchCancelEdit").onclick=STX.DialogManager.dismissDialog;
			$$$("#stxWatchSaveEdit").onclick=STX.Watch.saveEditList;
			$$$("#stxWatchUp").onclick=function(i){return function(){STX.Watch.move(i);};}(-1);
			$$$("#stxWatchDown").onclick=function(i){return function(){STX.Watch.move(i);};}(1);
			$$$("#stxWatchPrev").onclick=function(i){return function(){STX.Watch.move(i);};}(-1);
			$$$("#stxWatchNext").onclick=function(i){return function(){STX.Watch.move(i);};}(1);
			if(STX.Watch.lists.length>0){
				STX.Watch.currentList=0;
			}
			STX.Watch.symbolScroll = STX.iscroll.newScroller($$$("#stxWatch-symbols").parentNode, {vScrollbar: false, hScroll:false, hideScrollbar: false});
			STX.Watch.listScroll = STX.iscroll.newScroller($$$("#stxWatchLists").parentNode, {vScrollbar: false, hScroll:false, hideScrollbar: false});
			STX.Watch.enableList(0);
			window.addEventListener("resize", STX.Watch.refreshDisplay);
		};
		
		
		/**
		 * Native implementation of multiple views. Views are accessible in the footer. Requires an STX.StorageManager for serializing views.
		 */
		STX.Views=function(){};
		
		/**
		 * Contains the list of available views
		 * @type {Array}
		 */
		STX.Views.views=[];
		
		/**
		 * Index into STX.Views.views of the current view. -1 if no current view is enabled.
		 * @type {Number}
		 */
		STX.Views.currentView=-1;
		
		/**
		 * Saves the current layout as a new view. The name of the view is taken from the dialog.
		 */
		STX.Views.saveView=function(){
			var viewName=$$$("#stxViewEditName").value;
			var view;
			for(var i=0;i<STX.Views.views.length;i++){
				view=STX.Views.views[i];
				if(viewName==STX.first(view)){
					STX.Views.currentView=i;
					STX.Views.refreshDisplay();
					break;
				}
			}
			if(i==STX.Views.views.length){
				view={};
				view[viewName]={};
				STX.Views.views.push(view);
				STX.Views.currentView=STX.Views.views.length-1;
				STX.Views.refreshDisplay();
			}
			STX.DialogManager.dismissDialog();
			view[viewName]=STX.Views.stx.exportLayout();
			STX.Views.stxStorageManager.store("stx-views", JSON.stringify(STX.Views.views));
		};
		
		/**
		 * Opens the save view dialog
		 */
		STX.Views.openNewViewDialog=function(){
			$$$("#stxViewEditName").value="";
			STX.DialogManager.displayDialog("stxViewSaveDialog");	
		};
		
		/**
		 * Enables the requested view
		 * @param  {number} i Index into STX.Views.views of the requested view
		 */
		STX.Views.enableView=function(i){
			var view=STX.Views.views[i];
			var layout=view[STX.first(view)];
			STX.Views.stx.importLayout(layout, STX.Views.managePeriodicity);
			STX.Views.currentView=i;
			STX.Views.refreshDisplay();
			if(STX.Views.stx.changeCallback){
				STX.Views.stx.changeCallback(STX.Views.stx, "layout");
			}
		};
		
		/**
		 * Deletes the selected view
		 * @param  {number} i Index into STX.Views.views of the view to delete
		 */
		STX.Views.deleteView=function(i){
			var currentViewName=STX.first(STX.Views.views[i]);
			STX.Views.views.splice(i,1);
			STX.Views.currentView=-1;
			for(var j=0;j<STX.Views.length;j++){
				if(currentViewName==STX.first(STX.Views.views[j])) STX.Views.currentView=j;
			}
			STX.Views.refreshDisplay();
			if(STX.Views.views.length==0){
				STX.Views.stxStorageManager.remove("stx-views");		
			}else{
				STX.Views.stxStorageManager.store("stx-views", JSON.stringify(STX.Views.views));		
			}
		};
		
		/**
		 * Refreshes the views display. This is called whenever the screensize changes so that iscrolls can refresh themselves. Call this
		 * manually if HTML changes affect the size of the footer.
		 */
		STX.Views.refreshDisplay=function(){
			var wrapper=$$$("#stxViewWrapper");
			STX.clearNode(wrapper);
		
			for(var i=0;i<STX.Views.views.length;i++){
				var view=STX.Views.views[i];
				var li=STX.newChild(wrapper, "li");
				li.innerHTML=STX.first(view);
				if(STX.Views.currentView==i) li.className="current";
				STX.ScrollManager.attach(li, function(i){
					return function(e){
						STX.Views.enableView(i);
					};
				}(i));
				STX.ScrollManager.attachRightClick(li, function(i){
					return function(e){
						STX.Views.deleteView(i);
					};
				}(i));
			}
			var panel=$$$("#stxViews");
			var scroller=$$$("#stxSavedViews").parentNode;
			scroller.rightClickable=true;
			var rightMargin=panel.clientWidth-$$$("#stxNewView").offsetLeft;
			scroller.style.width=(panel.clientWidth-scroller.offsetLeft-rightMargin)+"px";
			STX.Views.scroll.refresh();
		};
		
		/**
		 * Initializes the STX.Views object. Requires an STX.StorageManager for serializing views.
		 * @param  {object} stx               The chart object
		 * @param  {object} stxStorageManager STX.StorageManager
		 * @param  {boolean} [managePeriodicity=false] If true then periodicity will be controlled by views. The default behavior is that views are independent of periodicity.
		 */
		STX.Views.initialize=function(stx, stxStorageManager, managePeriodicity){
			STX.Views.managePeriodicity=managePeriodicity;
			STX.Views.stx=stx;
			STX.Views.stxStorageManager=stxStorageManager;
			var str=stxStorageManager.get("stx-views");
			if(str){
				STX.Views.views=JSON.parse(str);
			}
			$$$("#stxNewView").onclick=STX.Views.openNewViewDialog;
			$$$("#stxViewCancelEdit").onclick=STX.DialogManager.dismissDialog;
			$$$("#stxViewSaveEdit").onclick=STX.Views.saveView;
			STX.Views.scroll = STX.iscroll.newScroller($$$("#stxSavedViews").parentNode, {vScrollbar: false, vScroll:false, hScroll:true, hScrollbar:false});
			STX.Views.refreshDisplay();
			window.addEventListener("resize", STX.Views.refreshDisplay);
		};
		
		
		/**
		 * Manages chart sharing and uploading.
		 */
		function STXSocial(){
		}
		
		_exports.STXSocial=STXSocial;
		
		/**
		 * Base class for a decorator. A decorator adds custom branding to a chart image before it is rendered.
		 */
		STXSocial.Decoration=function(){
			this.initialize=function(stx, canvas, widthPX, heightPX){};	// Override this with a function to calculate and store header and footer pixels
			this.headerPX=0;
			this.footerPX=0;
			this.decorate=function(stx, context){};	// Override this with a function to actually decorate the canvas
		};
		
		
		/**
		 * Create a png image based on the current chart. If widthPX and heightPX are passed in
		 * then the image will be scaled to the requested dimensions.
		 * This function is asynchronous and requires a callback function. The callback will be passed
		 * a data object which can be sent to a server or converted to an image.
		 * decorationObj can be used to "decorate" the canvas. For instance, you can add a header
		 * or footer to the canvas.
		 * @param  {object}   stx           Chart object
		 * @param  {number}   [widthPX]       Width of image to create. If passed then height will adjust to maintain ratio.
		 * @param  {number}   [heightPX]      Height of image to create. If passed then width will adjust to maintain ratio.
		 * @param  {object}   [decorationObj=defaultDecorator] A decorator to add custom branding. Pass {} to not use the defaultDecorator.
		 * @param  {Function} cb            Callback when image is available fc(data) where data is the serialized image object
		 */
		STXSocial.createImage=function(stx, widthPX, heightPX, decorationObj, cb){
			if(!decorationObj) decorationObj=STXSocial.defaultDecorator;
			if(!decorationObj.initialize) decorationObj=null;
			
			// Compute and/or determine sizes of headers and footers for decorator
			if(decorationObj!=null){
				decorationObj.initialize(stx, stx.chart.canvas, widthPX, heightPX);
			}
			
			// Set background for any part of canvas that is currently transparent
			STX.fillTransparentCanvas(stx.chart.context, stx.containerColor, stx.chart.canvas.width, stx.chart.canvas.height);
			
			// Render panel labels
			STXSocial.watermarkPanels(stx);
			
			// We use style height/width instead of the canvas width/height when the backing store is 2x on retina screens
			var renderedHeight=stx.chart.canvas.height;
			var renderedWidth=stx.chart.canvas.width;
			if(stx.chart.canvas.style.height && stx.chart.canvas.style.height!=""){
				renderedHeight=STX.stripPX(stx.chart.canvas.style.height);
				renderedWidth=STX.stripPX(stx.chart.canvas.style.width);
			}
			if(widthPX && heightPX){
				renderedHeight=heightPX;
				renderedWidth=widthPX;
				if(decorationObj!=null){
					renderedHeight=renderedHeight-decorationObj.headerPX-decorationObj.footerPX;
				}
			}else if(heightPX){
				if(decorationObj){
					renderedHeight=heightPX-decorationObj.headerPX-decorationObj.footerPX;
				}
				renderedWidth=stx.chart.canvas.width*(renderedHeight/stx.chart.canvas.height);
			}else if(widthPX){
				renderedWidth=widthPX;
				renderedHeight=stx.chart.canvas.height*(widthPX/stx.chart.canvas.width);
				if(decorationObj){
					renderedHeight=renderedHeight+decorationObj.headerPX + decorationObj.footerPX;
				}
			}
			var totalHeight=renderedHeight;
			var y=0;
			if(decorationObj){
				totalHeight=totalHeight+decorationObj.headerPX + decorationObj.footerPX;
				y=decorationObj.headerPX;
			}
		
			// Render the canvas as an image
			var shareImage=document.createElement("img");
			shareImage.onload = function(){
				// Print the image on a new canvas of appropriate size
				var canvas=document.createElement("canvas");
				canvas.width=renderedWidth;
				canvas.height=totalHeight;
				var context=canvas.getContext("2d");
				stx.adjustBackingStore(canvas, context);
				STX.fillTransparentCanvas(context, "#FFFFFF", canvas.width, canvas.height);
				context.drawImage(this, 0, 0, stx.chart.canvas.width, stx.chart.canvas.height, 0, y, renderedWidth, renderedHeight);
		
				// Add any decorations
				if(decorationObj!=null){
					decorationObj.decorate(stx, context);
				}
				stx.draw();	// redraw the canvas to get rid of the watermark panels
		
				cb(canvas.toDataURL("image/png"));	// return the data
			};
			shareImage.src=stx.chart.canvas.toDataURL("image/png");
		};
		
		
		// BEGIN Copy and paste this to your own decorator to customize the image headers and footers
		STXSocial.defaultDecorator=new STXSocial.Decoration();
		STXSocial.defaultDecorator.initialize=function(stx, canvas, widthPX, heightPX){
			this.headerPX=50;
			this.footerPX=0;
		};
		STXSocial.defaultDecorator.decorate=function(stx, context){
			var cursor=10;
			var centerLine=24;
			context.textBaseline="middle";
			stx.canvasColor("stx_share", context);
			stx.canvasFont("stx_share_symbol", context);
			var w=context.measureText(stx.chart.symbol).width;
			context.fillText(stx.chart.symbol, cursor, centerLine);
			
			cursor+=w+5;	
			stx.plotLine(cursor, cursor, centerLine-8, centerLine+8, stx.canvasStyle("stx_share"), "segment", context);
			
			cursor+=5;
			
			stx.canvasFont("stx_share", context);
			var txt=STX.mmddyyyy(stx.chart.dataSegment[stx.getStartDateOffset()].Date) + "-" + STX.mmddyyyy(stx.chart.dataSegment[stx.chart.dataSegment.length-1].Date);
			w=context.measureText(txt).width;
			context.fillText(txt, cursor, centerLine);
		
			cursor+=w+5;
			stx.plotLine(cursor, cursor, centerLine-8, centerLine+8, stx.canvasStyle("stx_share"), "segment", context);
		
			cursor+=5;
			txt=STX.readablePeriodicity(stx);
			context.fillText(txt, cursor, centerLine);
			context.textBaseline="alphabetic";
		};
		// END copy and paste
		
		
		
		/**
		 * Uploads an image to a server. See {@tutorial Python chart-sharing server example} for a comple server code.
		 * on the server side. The callback will take two parameters. The first parameter is an error
		 * condition (server status), or null if there is no error. The second parameter (if no error) will contain
		 * the response from the server.
		 * 'payload' is an optional object that contains meta-data for the server. If payload exists then the image will be added as a member of the payload object, otherwise an object will be created
		 * 'dataImage' should be a data representation of an image created by the call canvas.toDataURL such as is returned by STXSocial.createImage
		 * If you are getting a status of zero back then you are probably encountering a cross-domain ajax issue. Check your access-control-allow-origin header on the server side
		
		 * @param  {string}   dataImage Serialized data for image
		 * @param  {string}   url       URL to send the image
		 * @param  {object}   [payload]   Any additional data to send to the server should be sent as an object.
		 * @param  {Function} cb        Callback when image is uploaded
		 */
		STXSocial.uploadImage=function(dataImage, url, payload, cb){
			if(!payload) payload={};
			payload.image=dataImage;
			var valid=STX.postAjax(url, JSON.stringify(payload), function(status, response){
				if(status!=200){
					cb(status, null);
					return;
				}
				cb(null, response);
			});
			if(!valid) cb(0, null);
		};

		/**
		 * The panel names in charts are div tags which will not render as images.
		 * This method will draw the panel names on the canvas itself. It is called
		 * temporarily when creating an image.
		 * @param  {object} stx The chart
		 */
		STXSocial.watermarkPanels=function(stx){
			//stx.chart.context.font="12px Helvetica";
			//stx.chart.context.strokeStyle="#7c878b";
			stx.canvasFont("stx_panels");
			stx.chart.context.globalAlpha=1;
			stx.chart.context.textBaseline="alphabetic";
			stx.chart.context.textAlign="left";
			var first=false;
			for(var p in stx.panels){
				var panel=stx.panels[p];
				if(panel.hidden==true) continue;
				if(panel.name=="chart") continue;
				stx.canvasColor("stx_panel_background");
				stx.chart.context.font=getComputedStyle(panel.title).font;
				var t=panel.icons.offsetTop;
				STX.semiRoundRect(stx.chart.context, 0, t+4, 100, 20, 5, true);
		
				stx.canvasColor("stx_panels");
				stx.chart.context.fillText(panel.title.innerHTML.toUpperCase(), panel.icons.offsetLeft+4, t+18);
			}	
		};
		
		/*
		 * Here's an example of how you can display the image on the screen. Create a real dialog using HTML if you want to use this.
		 */
		STXSocial.displayImageExample=function(imgData){
			var div=document.createElement("div");
			div.style.margin="0 auto";
			div.style.width="1000px";
			div.style.border="solid black 3px";
			div.style.zIndex=100;
			div.style.position="relative";
			div.style.top="-500px";
		
			var img=document.createElement("img");
			img.onload=function(){
				div.appendChild(img);
				document.body.appendChild(div);			
			};
			img.src=imgData;
		};
		
		/**
		 * Places a watermark image on the chart for branding. This method should only be called once after you create your STXChart (stx) object.
		 * @param  {object} stx         The chart
		 * @param  {string} imageURL    The URL of the image
		 * @param  {array} positioning A tuple. The first item of the tuple is the X offset from the edge of the chart. The second item is the Y offset from the top of the chart. Use negative numbers to offset from right of chart or bottom of chart.
		 */
		STXSocial.brandMyChart=function(stx, imageURL, positioning){
			function prependDisplayChart(stx, image, positioning){
				return function(){
					var x=stx.chart.canvasWidth/2-image.width/2;
					var y=stx.panels["chart"].height/2-image.height/2;
					if(positioning){
						if(positioning[0]>0){
							x=positioning[0];
						}else{
							x=stx.chart.width-image.width+positioning[0];
						}
						if(positioning[1]>0){
							y=positioning[1];
						}else{
							y=stx.panels["chart"].height-image.height+positioning[1];
						}
					}
					stx.chart.context.drawImage(image, x, stx.panels["chart"].top+y);
				};
			}
		
			var image=document.createElement("img");
			image.onload=function(stx, prependDisplayChart, positioning){
				return function(){
					STXChart.prototype.prepend("displayChart", prependDisplayChart(stx, this, positioning));
					stx.draw();
				};
			}(stx, prependDisplayChart, positioning);
			image.src=imageURL;
		};
		
		/**
		 * Base class for Quotes infrastructure. Many of the built in UI capabilities such as comparison charts expect
		 * to follow this infrastructure. You should define your own classes that follow this pattern (or derive a class from STX.Quotes)
		 * in order to adapt your quote feed to make the most use of the built in componentry.
		 */
		STX.Quotes=function(){};
		
		/**
		 * Demo version of quotes which uses EOD data
		 */
		STX.Quotes.Demo=function(){};
		
		/**
		 * If you support multiple data sources then this can be used to cascade through them if data is not available.
		 * @param  {object} params        Standard parameters
		 * @param  {string} currentSource Current source
		 * @return {string}               The next source in the cascade, or null if no more available
		 */
		STX.Quotes.nextDataSource=function(params, currentSource){
			return null;
		};
		
		
		/**
		 * Fetch multiple quotes asynchronously, possibly from various data sources. This method can be used to update a chart with multiple symbols
		 * such as a comparison chart.
		 * @param  {array}   arr Array of params see {@link STX.Quotes.fetch}
		 * @param  {Function} cb  Function to callback when quotes are fetched. Will be passed an array of results. Each result is an object {err, data}. err will either be null or an error message.
		 */
		STX.Quotes.multiFetch=function(arr, cb){
			var tracker={
				counter:0,
				finished: arr.length,
				results: []
			};
		
			function handleResponse(params, tracker, cb){
				return function(err, data){
					tracker.results.push({err:err, params: params, data:data});
					tracker.counter++;
					if(tracker.counter>=tracker.finished){
						var results=tracker.results;
						tracker.results=[];
						cb(results);
					}
				};
			}
			for(var i=0;i<arr.length;i++){
				var params=arr[i];
				STX.Quotes.fetch(params, handleResponse(params, tracker, cb));
			}
		};
		
		
		/**
		 * Fetch data. This will automatically fetch data from your data source, if you pass the approprite params.source string.
		 * 
		 * @param  {object}   params Parameters required by your quote feed (such as start date, end date, number of bars, etc)
		 * @param {object} params.stx The Chart object
		 * @param {string} [source=Demo] The name of the requested data source
		 * @param  {Function} cb     Callback function will return fc(error, data) where error will be null if no error and data should be in format required by kernel
		 */
		STX.Quotes.fetch=function(params, cb){
		    if(!params.source) params.source="Demo";
			function handleResponse(error, data){
				cb(error, data);
			};
			STX.Quotes[params.source].fetch(params, handleResponse);
		};
		
		/**
		 * Returns how many bars should be fetched. If we're fetching a series then it's simply the number
		 * of bars already in the chart. Otherwise it's the number of bars to fetch to fill up the screen.
		 * @param  {object} params Parameters
		 * @param  {object} stx    The chart object
		 * @return {number}        Number of bars to fetch
		 */
		STX.Quotes.barsToFetch=function(params){
			if(params.isSeries) return params.stx.masterData.length;
		
			var p=params.stx.layout.periodicity;
			// Rough calculation, this will account for 24x7 securities
			if(params.stx.layout.interval=="month") p=30*p;
			if(params.stx.layout.interval=="week") p=7*p;
		
			var bars=params.stx.chart.maxTicks*p;
			return bars;
		};
		
		/*
		 * This is a demo version of fetch. You will need to create one for your own quote feed that behaves similarly.
		 * At the very least it should support params.symbol and params.interval. You may optionally use barsToFetch if your server supports
		 * specification of a maximum number of ticks. Depending on your implementation, you may also need to support
		 * start and end dates (for instance to support loading more when the user scrolls back or refresh updates)
		 */
		STX.Quotes.Demo.fetch=function(params, cb){
			function setQuotes(response){
				var varName=response.substr(0,response.indexOf("="));
				var valueToParse=response.substring(response.indexOf(varName+"=")+(varName+"=").length,response.length-1);
				try{
					return JSON.parse(valueToParse.replace(/,0+/g,",0").replace(/,[.]/g,",0."));
				}catch(e){
					return [];
				}
			}
			
			url="http://demoquotes.whitelabelstockcharts.com/" + params.symbol.toUpperCase();
			// Theoretically append interval to url as well (although Demo has limited EOD)
			var bars=STX.Quotes.barsToFetch(params);
			STX.postAjax(url, null, function(status, response){
				if(status!=200){
					cb(status);
					return;
				}
				var quotes=setQuotes(response);
				var newQuotes=[];
				for(var i=0;i<quotes.length;i++){
					newQuotes[i]={};
					newQuotes[i].Date=quotes[i][0];
					newQuotes[i].Open=quotes[i][1];
					newQuotes[i].High=quotes[i][2];
					newQuotes[i].Low=quotes[i][3];
					newQuotes[i].Close=quotes[i][4];
					newQuotes[i].Volume=quotes[i][5];
					newQuotes[i].Adj_Close=quotes[i][6];
				}
				cb(null, newQuotes);
			});
		};

		return _exports;
		
	}

	{
		if ( typeof define === "function" && define.amd ) {
			define( ["stxKernelOs"], function(_stxKernel) { return _stxAdvanced_js(_stxKernel); } );
		}else{	
			var _stxKernel={
				"STX":window.STX,
				"STXChart":window.STXChart,
				"$$":window.$$,
				"$$$":window.$$$
			};
			var _=_stxAdvanced_js(_stxKernel);
			window.STXSocial=_.STXSocial;
		}
	}

})();



