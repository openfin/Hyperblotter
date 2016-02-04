// Copyright 2014-2015 by ChartIQ LLC

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
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.colorOrder=["#b387d7","#ff9250","#e36460","#dcdf67","#b3d987","#ffcd2b","#66cac4","#97b8f7"];
		
		/**
		 * The current location in the STX.Comparison.colorOrder array.
		 * @type {Number}
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.colorPointer=0;
		
		/**
		 * Comparisons can either be "compare", "overlay" or "absolute".
		 *  
		 * The UI defaults to "compare" which produces a y-axis with relative percentage
		 * changes.
		 * 
		 * "overlay" overlays the series so that the axis is not shared.
		 * 
		 * "absolute" renders each series on the exact y-axis values (This is **not** recommended for series that do not share a similar y-axis price range). 
		 * 
		 * @since 03/17/2015 "absolute" puts all series on the same axis (developers should ensure that series are around the same price range)
		 * @type {string}
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.type="compare";
		
		/**
		 * ID of the study panel to create for the correlation coefficient
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.correlationPanel="correl";
		/**
		 * Initial value of UI input for toggling correlation coefficient
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.requestCorrelation=false;
		
		/**
		 * Attaches a color picker to the comparison UI
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
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
		 * Backwards compatibility
		 * Iterates through the charts masterData and adds a data member for the comparison. The data member will be the string
		 * defined by "symbol". Dates must be exact matches (minutes, hours, seconds, milliseconds) in order to show up in the comparison.
		 * @param  {object} stx        A chart object
		 * @param  {string} symbol     The data member to add for comparison
		 * @param  {array} comparison Comparison data (which should align or closely align with the chart data by date)
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 * @deprecated use {@link STX#addMemberToMasterdata } instead
		 */
		STX.Comparison.processComparison=function(stx, symbol, comparison){
			// Match up the comparison and store the data point
			STX.addMemberToMasterdata(stx, symbol, comparison);
		};
		
		/**
		 * Adds a new comparison symbol. This method is driven from the UI but can also be called programatically if the comparison UI is at least
		 * available in the page. Otherwise, if you are not using the sample GUI, you can override this method to exclude references to the UI or use stx.addSeries and add your code to manage the data feed.
		 * By default, it uses the STX.QuoteFeed infrastructure to fetch data.
		 * @param {object} stx           The chart object
		 * @param {string/object} compareSymbol The symbol to compare. A symbol string or an object representing the symbol can be used. If using an object, you can send anything you want in it, but you must always include at least a 'symbol' element. This object will be passed on to {@link STX.Comparison.fetch} as `parameters.symbolObject`.  And if using the [fetch()]{@link STX.QuoteFeed#fetch} method for data loading, it will be present in the parameters list there as well.
		 * @param {function} cb Callback function
		 * @param {string} display The text to display on the legend.
		 * @param {object} [parameters] Optional parameters to describe the series. See {@link STXChart#addSeries} for full list
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 * @example
		 * STX.Comparison.add(stxx, 'GE',null,'General Motors');
		 * @since 
		 * <br> 07/01/2015 added parameters argument.
		 * <br> 2015-11-1 compareSymbol can now be a string or an object.
		 */
		STX.Comparison.add=function(stx, compareSymbol, cb, displaySymbol, parameters){
			
			if(!compareSymbol) compareSymbol=$$$("#compareSymbol").value.toUpperCase();
			if(!compareSymbol) {
				if(cb) cb();
				return;
			}
			
			if(!parameters) parameters={};
			
			if(typeof compareSymbol == 'object') {
				parameters.symbolObject=compareSymbol;
				compareSymbol = compareSymbol.symbol;
	      	} 

			if(compareSymbol==stx.chart.symbol && !parameters.force) {
				if(cb) cb();
				return;
			}
			if(!displaySymbol) displaySymbol=compareSymbol;
			$$$("#compareSymbol").blur();

				
			function processResponse(symbol){
				return function(err){
					if(err) {
						if(cb) cb();
						return;
					}
		            $$$("#compareSymbol").value="";
		        	$$$("#compareNone").style.display="none";
					STX.Comparison.correlate(stx, symbol);
					stx.draw();
					if(!stx.comparisons[symbol]){
						var template=$$$(".symComparisonTemplate");
						var div=template.cloneNode(true);
						$$$(".stxItem", div).innerHTML=symbol;
						$$$(".stx-ico-close", div).onclick=function(stx, symbol){return function(){
							stx.getSeriesRenderer("_generic_series").removeSeries(symbol).ready();
						};}(stx, symbol);
						div.style.display="";
						template.parentNode.appendChild(div);
						stx.comparisons[symbol]={
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
			
			if(!stx.chart.legend){
				stx.chart.legend={
						x: 260,
						y: 10
				};
			}
			
			var isComparison=(STX.Comparison.type=="compare");
			var sharedAxis=isComparison || STX.Comparison.type=="absolute";
			var requiredParams= {isComparison:isComparison, shareYAxis:sharedAxis};
			STX.extend(parameters, requiredParams);
			if (!parameters.gaps) parameters.gaps=true;
			if (!parameters.color) parameters.color= STX.Comparison.colorSelection;
			if (!parameters.display) parameters.display=displaySymbol;
			if (!parameters.chartType) parameters.chartType="line";
			STX.Comparison.fetch(stx, compareSymbol, parameters, processResponse(compareSymbol));
		};

		/**
		 * If you're not using a QuoteFeed, then override this with your version of fetch.
	 	 * As outlined by the code, **do not** set parameters.data to {useDefaultQuoteFeed:true} when overriding and not using a quotefeed!
		 * The data you fetch should be in the standard chart JSON format, or as outlined by {@link STXChart#addSeries}. Please review the [Data Format](index.html#data-format) section to properly format your OHLC quote objects. 
		 * See example for suggested code.
		 * @param {object} stx           The chart object
		 * @param {string} comparisonSymbol The symbol to compare.
		 * @param {function} cb Callback function
		 * @param {object} parameters Optional parameters to describe the series. See {@link STXChart#addSeries} for full list
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 * @example
			STX.Comparison.fetch=function(stx, comparisonSymbol, parameters, cb){
				// fetch comparison data here and set the data for the series
				STX.postAjax("jason.asp?symbol="+comparisonSymbol+"&range=", null, function (status, response) {
					if (status != 200) {
						return; // error
					}
					parameters.data = JSON.parse(response);
					stx.addSeries(comparisonSymbol, parameters, cb);	// always include the callback (cb) function!
				});
			}; 
		 */
		STX.Comparison.fetch=function(stx, comparisonSymbol, parameters, cb){
			// fetch comparison data here and set the parameters.data for the series as follows:
			// parameters.data= { your data array here };
			if(!parameters.data) parameters.data={useDefaultQuoteFeed:true};
			stx.addSeries(comparisonSymbol, parameters, cb);
		};


		/**
		 * Default implementation of STX.Comparison.fetch
		 * @memberOf STX.Comparison
		 * @private
		 * @deprecated -- now done in addSeries
		 */
		STX.Comparison.quoteFeedFetch=function(stx, comparisonSymbol, cb){
		  var driver=stx.quoteDriver;
		  var params=driver.makeParams(comparisonSymbol, stx.chart);
		  // for comparisons, you must  fetch enough data on the new Comparison to match the masterData, from  beginning to end ticks
		  params.startDate = stx.chart.masterData[0].DT;
		  params.endDate = stx.chart.masterData[stx.chart.masterData.length-1].DT;
		  driver.quoteFeed.fetch(params, function(dataCallback){
		    //if(dataCallback.error) return; // ignore any server errors
		    cb(dataCallback.error, dataCallback.quotes);
		  });
		};

		
		/**
		 * Resets comparisons, removing all existing comparisons and resetting the UI. Call this when changing symbols or to "remove all" comparisons.
		 * @param  {object} stx The chart object
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.reset=function(stx){
			for(var field in stx.comparisons){
				var comparison=stx.comparisons[field];
				var div=comparison.div;
				div.parentNode.removeChild(div);
				var gRenderer=stx.getSeriesRenderer("_generic_series");
				if(gRenderer) gRenderer.removeSeries(field);
			}
			stx.comparisons={};
			STX.Comparison.colorPointer=0;
			STX.Comparison.colorSelection=$$$("#menuWrapperCompare .stx-color").style.backgroundColor=STX.Comparison.colorOrder[STX.Comparison.colorPointer];
			stx.setComparison(false);
			for(var panel in stx.panels){
				if(stx.panels[panel].name.indexOf(STX.Comparison.correlationPanel)===0) stx.panelClose(stx.panels[panel]);
			}
			$$$("#compareNone").style.display="";
		};
		
		/**
		 * Initializes the comparison UI to handle keystrokes and color picking and to associate it with a chart object
		 * @param  {object} stx The chart object
		 * @param {boolean} [inputEventHandling] Set to false to bypass default input event handling
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.initialize=function(stx, inputEventHandling){
			STX.Comparison.attachColorPicker();
			stx.comparisons={};	// Holding object for comparison symbols
			if(inputEventHandling!==false){
				STX.inputKeyEvents($$$("#compareSymbol"), function(){
					var compareSymbol=$$$("#compareSymbol").value.toUpperCase();
					if(compareSymbol==stx.chart.symbol) return;
				    STX.MenuManager.closeThisMenu($$$("#compareSymbol"));
				    STX.Comparison.add(stx);
				});
			}
		};
		
		/**
		 * The comparison plugin adds functionality to the built in "removeSeries" function. This updates the comparison UI if a user
		 * removes a series by right clicking.
		 * @param  {STXChart} stx The chart object
		 * @param  {string} field The comparison that is being removed
		 * @private
		 * @memberOf STX.Comparison
		 * @version ChartIQ Advanced Package
		 */
		STX.Comparison.removeSeries=function(stx,field){
			if ( !stx.comparisons) return; // in case GUI not using the Comparison interface.
			var comparison=stx.comparisons[field];
			if(!comparison) return;
			var div=comparison.div;
			if(div.parentNode) div.parentNode.removeChild(div);
			delete stx.comparisons[field];
			if(STX.isEmpty(stx.comparisons)){
				STX.Comparison.reset(stx);
			}
		};

		/**
		 * Code for loading additional quote data for comparisons or studies. Use this when using {@link STX.QuoteFeed} "pull" data by
		 * calling it in the callback function. See stx-advanced.html for an example.
		 * This will be executed after every quoteFeed fetch call, and is used to keep the main symbol in sync with any other active symbols on the chart.
		 * @memberOf STX.Comparison
		 * @deprecated
		 */

		STX.Comparison.quoteFeedCallback=function(params){
			if(params.comparisonRequested) return;

			//use to determine startDate for a comparison if params.update=true
			function getStartDate(symbol){
				for(var c=params.stx.masterData.length-1;c>=0;c--){
					if(params.stx.masterData[c] && typeof params.stx.masterData[c][symbol] != "undefined"){
						return STX.strToDateTime(params.stx.masterData[c].Date);
					}
				}
				return params.startDate;
			}

			var syms={};
			var field;

			// get the symbol used in comparisons
		    for(field in params.stx.chart.series) {
				if(!params.stx.chart.series[field].parameters.isComparison && !params.stx.chart.series[field].parameters.quoteFeedCallbackRefresh) continue;
				syms[field]=true;
		    }
		    
		    // get the symbols used in the studies
			for(var p in params.stx.panels){
				if(params.stx.panels[p].studyQuotes){
					for(var sq in params.stx.panels[p].studyQuotes) syms[sq]=true;
				}
			}
			
			var arr=[];
			for(field in syms){
				var seriesParam=STX.shallowClone(params.originalState);
				seriesParam.symbol=field;
				if(seriesParam.update) {
					seriesParam.startDate=getStartDate(field);
				} else {
					// since we support comparisons between instruments that may have different trading hours, 
					// we can't depend on the params.ticks to keep them in sync. 
					// Instead , when appending data, we must explicitly send exact ranges to load. 
					// Using ticks may cause to load different ranges for instruments with different trading hours.
					if (!seriesParam.startDate) seriesParam.startDate = params.stx.masterData[0].DT;
					if (!seriesParam.endDate) seriesParam.endDate = params.stx.masterData[params.stx.masterData.length-1].DT;	
				}
				arr.push(seriesParam);
			}
			if(!arr.length) return;
			params.comparisonRequested=true;
			var driver=params.stx.quoteDriver;
			driver.quoteFeed.multiFetch(arr, function(results){
				for(var i=0;i<results.length;i++){
					var result=results[i];
					if(!result.dataCallback.error){
						STX.addMemberToMasterdata(params.stx, result.params.symbol, result.dataCallback.quotes, null, null, params.stx.chart.series[result.params.symbol].parameters.field);
					}
		 		}
				params.stx.createDataSet();
				params.stx.draw();
			}); 
		};
		
		/**
		 * Computes a ratio chart given an array of two data sets.
		 * Current hard coded to just ratio charts!
		 * @param {string} equation The equation to compute
		 * @param  {Object} map An map of symbols to data
		 * @return {Array}     A consolidated array of ratio chart data
		 * @memberOf STX
		 * @version ChartIQ Advanced Package
		 */
		STX.computeEquationChart=function(equation, map){
			var newArray=[];
			var mIterator=0,cIterator=0;
			var symbols=equation.split("/");
			var master=map[symbols[0]];
			var comparison=map[symbols[1]];
			var closeOnly=false;
			if(!comparison){ //use the quote in master for the symbol
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
						/*
						variation 1 (Stockcharts.com):
						m.Close/=c.Close;
						m.High/=c.Close;
						m.Low/=c.Close;
						m.Open/=c.Close;
						
						variation 2 (eSignal):
						m.Close/=c.Close;
						m.High/=c.High;
						m.Low/=c.Low;
						m.Open/=c.Open;
						m.High=Math.max(m.High,Math.max(m.Open,m.Close));
						m.Low=Math.min(m.Low,Math.min(m.Open,m.Close));
						*/
						
						m.Close/=c.Close;
						m.Open/=c.Open;
						m.High=Math.max(m.Open,m.Close);
						m.Low=Math.min(m.Open,m.Close);

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
		 * Calculates Heikin-Ashi values. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @since 04-2015-15
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculateHeikinAshi=function(stx, dataSet){
			if(!dataSet.length) return dataSet;

			var newDataSet=[];

			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(!q) continue;
				var q1=newDataSet[newDataSet.length-1];	// the previous data must be from an Heikin Ashi set not the unprocessed dataSet
				if(!q1) q1=q;
				var xOpen=(q1.Open+q1.Close)/2;
				var xClose=(q.Open+q.High+q.Low+q.Close)/4;
				newDataSet.push({
					DT: q.DT,
					Date: q.Date,
					Open: xOpen,
					Close: xClose,
					High: Math.max(q.High,Math.max(xOpen,xClose)),
					Low: Math.min(q.Low,Math.min(xOpen,xClose)),
					Volume: q.Volume,
					iqPrevClose: q1.Close
				});
			}
			return newDataSet;
		};
		
		/**
		 * Calculates Kagi chart values. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {number} reversal The reversal percentage for the kagi lines. This is typically user configurable. Default is 4% for daily, .4% for intraday.
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @since 04-2015-15
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculateKagi=function(stx, dataSet, reversal){
			if(!dataSet.length) return dataSet;
			if(!reversal){
				if(stx.isDailyInterval(stx.layout.interval)) reversal=0.04;
				else reversal=0.004;
				if(STX.LegacyMarket.isForexSymbol(stx.chart.symbol)) reversal/=4;
			}else{
				if(reversal>=1) reversal/=100;	// it is a percentage, so if sent as a hole number, transform to percentage multiplier
			}
			var newDataSet=[];
			var q1=null;
			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(!q) continue;
				if(!q1) {
					q1=q;
					continue;
				}
				if(q1.Open>q1.Close){
					if(q.Close>q1.Close*(1+reversal)){ //reversal up
						q.Open=q1.Close;
					}else{
						if(q1.Close>q.Close) q1.Close=q.Close;
						q1.Volume+=q.Volume;
						if(i<dataSet.length-1) continue;						
					}
				}else if(q1.Open<q1.Close){
					if(q.Close<q1.Close*(1-reversal)){ //reversal down
						q.Open=q1.Close;
					}else{
						if(q1.Close<q.Close) q1.Close=q.Close;
						q1.Volume+=q.Volume;
						if(i<dataSet.length-1) continue;						
					}
				}else{
					q1.Close=q.Close;
					q1.Volume+=q.Volume;
					if(i<dataSet.length-1) continue;
				}
				newDataSet.push({
					DT: q1.DT,
					Date: q1.Date,
					Open: q1.Open,
					Close: q1.Close,
					High: Math.max(q1.Open,q1.Close),
					Low: Math.min(q1.Open,q1.Close),
					Volume: q1.Volume,
					iqPrevClose: q1.iqPrevClose
				});
				q1=q;
			}
			return newDataSet;
		};
		
		/**
		 * Calculates Line Break chart values. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {number} pricelines The number of lines to use for the line break count. This is typically user configurable. Default is 3.
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @since 04-2015-15
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculateLineBreak=function(stx, dataSet, pricelines){
			if(!dataSet.length) return dataSet;
			if(!pricelines) pricelines=3;

			var newDataSet=[];
			var volume=0;
			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(!q) continue;
				volume+=q.Volume;
				var q1=newDataSet[newDataSet.length-1];
				if(!q1) q1={Open:q.Open,Close:q.Open};
				var newLine={
					DT: q.DT,
					Date: q.Date,
					Close: q.Close,
					High: Math.max(q.Close,Math.min(q1.Open,q1.Close)),
					Low: Math.min(q.Close,Math.max(q1.Open,q1.Close)),
					Volume: volume,
					iqPrevClose: q1.Close
				};
				for(var j=0;j<pricelines;j++){
					var qx=newDataSet[newDataSet.length-1-j];
					if(qx){
						if(qx.Open>=q.Close && q.Close>=qx.Close) {
							newLine=null;
							break;
						}
						else if(qx.Open<=q.Close && q.Close<=qx.Close) {
							newLine=null;
							break;
						}
					}
				}
				if(newLine) {
					if(newLine.Close<q1.Close) newLine.Open=Math.min(q1.Open,q1.Close);
					else newLine.Open=Math.max(q1.Open,q1.Close);
					newDataSet.push(newLine);
					volume=0;
				}
			}
			return newDataSet;
		};
		
		/**
		 * Calculates Renko bars. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {number} range The price range for the renko bars. This is typically user configurable.
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculateRenkoBars=function(stx, dataSet, range){
			if(!dataSet.length) return dataSet;
			// If range is not specified we'll come up with a reasonable default value
			// caveman algorithm, finds a range so that ~300 bars worth of time are displayed
			// i.e. about a year for a daily chart, about 5 hours on a minute chart
			var l=Math.min(300, dataSet.length);
			var minMax=stx.determineMinMax(dataSet.slice(dataSet.length-l), ["High","Low"]);
			var shadow=minMax[1]-minMax[0];
			var height=stx.panels[stx.chart.name].height;
			if(!range){
				range=shadow/(height/30); // assume ideal bar size is 30 pixels high
			}else{
				range=Math.max(range,shadow/height);
			}
			var newDataSet=[];
		
			var currentPrice=null, lowTarget=null, highTarget=null;
		
			function createBar(q, open, close){
				newDataSet.push({
					DT: q.DT,
					Date: q.Date,
					Open: open,
					Close: close,
					High: Math.max(open,close),
					Low: Math.min(open,close),
					Volume: 0,
					iqPrevClose: open
				});
			}

			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(!q) continue;
				if(currentPrice===null) {
					currentPrice=q.Open;
					lowTarget=currentPrice-range;
					highTarget=currentPrice+range;
				}
				while(true){
					if(q.Close<=lowTarget){
						currentPrice=lowTarget;
						createBar(q, lowTarget+range, currentPrice);
						highTarget=lowTarget+2*range;
						lowTarget=lowTarget-range;
					}else if(q.Close>=highTarget){
						currentPrice=highTarget;
						createBar(q, highTarget-range, currentPrice);
						lowTarget=highTarget-2*range;
						highTarget=highTarget+range;
					}else break;
				}
			}
			/* current bar - leave out for now
			if(lowTarget<dataSet[dataSet.length-1].Close && lowTarget+range>dataSet[dataSet.length-1].Close)
				createBar(dataSet[dataSet.length-1], lowTarget+range, dataSet[dataSet.length-1].Close);
			else if(highTarget<dataSet[dataSet.length-1].Close && highTarget-range<dataSet[dataSet.length-1].Close)
				createBar(dataSet[dataSet.length-1], highTarget-range, dataSet[dataSet.length-1].Close);
			 */
			return newDataSet;
		};

		/**
		 * Calculates range bars. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {number} range The price range for the range bars. This is typically user configurable.
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculateRangeBars=function(stx, dataSet, range){
			if(!dataSet.length) return dataSet;
			// If range is not specified we'll come up with a reasonable default value
			// caveman algorithm, finds a range so that ~300 bars worth of time are displayed
			// i.e. about a year for a daily chart, about 5 hours on a minute chart
			var l=Math.min(300, dataSet.length);
			var minMax=stx.determineMinMax(dataSet.slice(dataSet.length-l), ["High","Low"]);
			var shadow=minMax[1]-minMax[0];
			var height=stx.panels[stx.chart.name].height;
			if(!range){
				range=shadow/(height/30); // assume ideal bar size is 30 pixels high
			}else{
				range=Math.max(range,shadow/height);
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
					Volume: 0,
					iqPrevClose: open
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
			}
			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(currentPrice===null)  currentPrice=q.Open;
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
		 * Calculates Point and Figure (P&F) chart values. Takes a dataSet and returns a replacement dataSet.
		 * @param {STXChart} stx   The chart object
		 * @param {array} dataSet The dataSet to modify
		 * @param {object} pandf The parameters for point and figure.
		 * @param {number} [pandf.box] The box size.  Default is automatically determined based on the price.
		 * @param {number} [pandf.reversal] The reversal amount, in boxes.  Default is 3.
		 * @return {array}        The replacement dataSet
		 * @memberOf STX
		 * @since 04-2015-15
		 * @version ChartIQ Advanced Package
		 */
		
		STX.calculatePointFigure=function(stx, dataSet, pandf){
			if(!dataSet.length) return dataSet;
			if(!pandf) pandf={};
			var box=pandf.box;
			if(!box) {
				box=1;
				var lastPrice=dataSet[dataSet.length-1].Close;
				if(lastPrice){
					if(lastPrice<0.25) box=0.0625;
					else if(lastPrice<1) box=0.125;
					else if(lastPrice<5) box=0.25;
					else if(lastPrice<20) box=0.5;
					else if(lastPrice<100) box=1;
					else if(lastPrice<200) box=2;
					else if(lastPrice<500) box=4;
					else if(lastPrice<1000) box=5;
					else if(lastPrice<25000) box=50;
					else box=500;
				}
				if(!stx.isDailyInterval(stx.layout.interval)) box/=10;
				if(STX.LegacyMarket.isForexSymbol(stx.chart.symbol)) {
					if(lastPrice){
						if(lastPrice<1) box=0.001;
						else if(lastPrice<2) box=0.002;
						else if(lastPrice<50) box=0.02;
						else if(lastPrice<200) box=0.2;
					}
					if(stx.isDailyInterval(stx.layout.interval)) box*=10;

				}
			}
			var reversal=pandf.reversal;
			if(!reversal) reversal=3;
			stx.chart.pandf={"box":box,"reversal":reversal};
			reversal*=box;
			
			var newDataSet=[];
			var volume=0;
			for(var i=0;i<dataSet.length;i++){
				var q=dataSet[i];
				if(!q) continue;
				volume+=q.Volume;
				if(!newDataSet.length) {
					newDataSet.push({
						DT: q.DT,
						Date: q.Date,
						Open: Math.floor(q.High/box)*box,
						Close: Math.ceil(q.Low/box)*box,
						High: q.High,
						Low: q.Low,
						Volume: volume,
						iqPrevClose: q.High+box
					});
					volume=0;
					continue;
				}
				var lastRun=newDataSet[newDataSet.length-1];
				if(lastRun.iqPrevClose>lastRun.Close){  //O
					if(q.Low<=lastRun.Close-box){ //extend
						lastRun.Close=Math.ceil(q.Low/box)*box;
						lastRun.High=Math.max(q.High,lastRun.High);
						lastRun.Low=Math.min(q.Low,lastRun.Low);
						lastRun.Volume+=volume;
					}else if(q.High>=lastRun.Close+reversal){ //reverse
						newDataSet.push({
							DT: q.DT,
							Date: q.Date,
							Open: lastRun.Close+box,
							Close: Math.floor(q.High/box)*box,
							High: q.High,
							Low: q.Low,
							Volume: volume,
							iqPrevClose: lastRun.Close
						});
					}else{
						lastRun.High=Math.max(q.High,lastRun.High);
						lastRun.Low=Math.min(q.Low,lastRun.Low);
						lastRun.Volume+=volume;
					}
					volume=0;
				}else if(lastRun.iqPrevClose<lastRun.Close){  //X
					if(q.High>=lastRun.Close+box){ //extend
						lastRun.Close=Math.floor(q.High/box)*box;
						lastRun.High=Math.max(q.High,lastRun.High);
						lastRun.Low=Math.min(q.Low,lastRun.Low);
						lastRun.Volume+=volume;
					}else if(q.Low<=lastRun.Close-reversal){ //reverse
						newDataSet.push({
							DT: q.DT,
							Date: q.Date,
							Open: lastRun.Close-box,
							Close: Math.ceil(q.Low/box)*box,
							High: q.High,
							Low: q.Low,
							Volume: volume,
							iqPrevClose: lastRun.Close
						});
					}else{
						lastRun.High=Math.max(q.High,lastRun.High);
						lastRun.Low=Math.min(q.Low,lastRun.Low);
						lastRun.Volume+=volume;
					}
					volume=0;
				}
			}
			return newDataSet;
		};

	
/*
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
*/		

		/**
		 * Native implementation of watch lists. Uses a STX.StorageManager object for saving and loading lists
		 * @constructor
		 * @name STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch=function(){};
		
		/**
		 * The array of available lists. If you modify this directly then be sure to call STX.Watch.refreshDisplay
		 * @type {Array}
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.lists=[];
		
		/**
		 * The index into the STX.Watch.lists array of the currently selected list
		 * @type {number}
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.currentList=null;
		
		/**
		 * The index into the currently selected list of the currently selected symbol
		 * @type {Number}
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.currentSymbol=0;
		
		/**
		 * Opens the dialog to create a new list
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.openNewListDialog=function(){
			$$$("#stxWatchEditName").value="";
			$$$("#stxWatchEditTA").value="";
			STX.DialogManager.displayDialog("stxWatchEditDialog");
		};
		
		/**
		 * Opens the dialog to edit an existing list
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
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
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.saveEditList=function(){
			var ta=$$$("#stxWatchEditTA");
			var listName=$$$("#stxWatchEditName").value;
			if(!listName) return;
			var list={};
			var existing=false;
			var i;
			for(i=0;i<STX.Watch.lists.length;i++){
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
			for(i in w){
				if(!w[i]) continue;
				arr.push(w[i].toUpperCase());
			}
			list[listName]=arr;
			STX.Watch.refreshDisplay();
			STX.Watch.stxStorageManager.store("stx-watchLists", JSON.stringify(STX.Watch.lists));
		};
		
		/**
		 * Deletes the current list
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.deleteCurrentList=function(){
			STX.Watch.lists.splice(STX.Watch.currentList,1);
			if(STX.Watch.currentList>=STX.Watch.lists.length) STX.Watch.currentList=STX.Watch.lists.length-1;
			if(STX.Watch.currentList<0) STX.Watch.currentList=0;
			STX.Watch.enableList(STX.Watch.currentList);
			if(!STX.Watch.lists.length){
				STX.Watch.stxStorageManager.remove("stx-watchLists");		
			}else{
				STX.Watch.stxStorageManager.store("stx-watchLists", JSON.stringify(STX.Watch.lists));
			}
		};
		
		/**
		 * Enables the selected list
		 * @param  {number} location The index into the list array to enable
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
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
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
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
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.rightClickSymbol=function(location, dontChangeChart){
			return STX.Watch.enableSymbol(location, dontChangeChart);
		};
		
		/**
		 * Moves the symbol selector up or down by the suggested distance
		 * @param  {number} distance Distance to move. Negative number to move up the list.
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
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
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.createSymbolEntry=function(listEntry,text){
			listEntry.innerHTML=text;
		};
		
		/**
		 * Updates the display of the watch lists. This is called whenever the screen is resized or the panel is opened or closed in order
		 * that the iscroll can update itself.
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
		 */
		STX.Watch.refreshDisplay=function(){
			var listWrapper=$$$("#stxWLWrapper");
			STX.clearNode(listWrapper);
			var symbolsWrapper=$$$("#stxWatch-inner");
			STX.clearNode(symbolsWrapper);
		
			function leftSymbol(ii){
				return function(e){STX.Watch.enableSymbol(ii);};
			}
			function rightSymbol(ii){
				return function(e){STX.Watch.rightClickSymbol(ii);};
			}
			function leftList(ii){
				return function(e){STX.Watch.enableList(ii);};
			}
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
						STX.ScrollManager.attach(li2, leftSymbol(j));
						STX.ScrollManager.attachRightClick(li2, rightSymbol(j));
					}
				}
				STX.ScrollManager.attach(li, leftList(i));
			}
			// Don't allow empty list containers, Safari chokes on that
			if(!listWrapper.childNodes.length){
				STX.newChild(listWrapper, "li");
			}
			if(!symbolsWrapper.childNodes.length){
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
		 * @memberOf STX.Watch
		 * @version ChartIQ Advanced Package
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
		 * @constructor
		 * @name STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views=function(){};
		
		/**
		 * Contains the list of available views
		 * @type {Array}
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.views=[];
		
		/**
		 * Index into STX.Views.views of the current view. -1 if no current view is enabled.
		 * @type {Number}
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.currentView=-1;
		
		/**
		 * Saves the current layout as a new view. The name of the view is taken from the dialog.
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
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
			delete view[viewName].candleWidth;
			STX.Views.stxStorageManager.store("stx-views", JSON.stringify(STX.Views.views));
		};
		
		/**
		 * Opens the save view dialog
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.openNewViewDialog=function(){
			$$$("#stxViewEditName").value="";
			STX.DialogManager.displayDialog("stxViewSaveDialog");	
		};
		
		/**
		 * Enables the requested view
		 * @param  {number} i Index into STX.Views.views of the requested view
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.enableView=function(i){
			var view=STX.Views.views[i];
			var layout=view[STX.first(view)];
			STX.Views.stx.importLayout(layout, STX.Views.managePeriodicity, true);
			STX.Views.currentView=i;
			STX.Views.refreshDisplay();
			if(STX.Views.stx.changeCallback){
				STX.Views.stx.changeCallback(STX.Views.stx, "layout");
			}
		};
		
		/**
		 * Deletes the selected view
		 * @param  {number} i Index into STX.Views.views of the view to delete
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.deleteView=function(i){
			var currentViewName=STX.first(STX.Views.views[i]);
			STX.Views.views.splice(i,1);
			STX.Views.currentView=-1;
			for(var j=0;j<STX.Views.length;j++){
				if(currentViewName==STX.first(STX.Views.views[j])) STX.Views.currentView=j;
			}
			STX.Views.refreshDisplay();
			if(!STX.Views.views.length){
				STX.Views.stxStorageManager.remove("stx-views");		
			}else{
				STX.Views.stxStorageManager.store("stx-views", JSON.stringify(STX.Views.views));		
			}
		};
		
		/**
		 * Refreshes the views display. This is called whenever the screensize changes so that iscrolls can refresh themselves. Call this
		 * manually if HTML changes affect the size of the footer.
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
		 */
		STX.Views.refreshDisplay=function(){
			var wrapper=$$$("#stxViewWrapper");
			STX.clearNode(wrapper);
			function leftView(ii){
				return function(e){STX.Views.enableView(ii);};
			}
			function rightView(ii){
				return function(e){STX.Views.deleteView(ii);};
			}
			for(var i=0;i<STX.Views.views.length;i++){
				var view=STX.Views.views[i];
				var li=STX.newChild(wrapper, "li");
				li.innerHTML=STX.first(view);
				if(STX.Views.currentView==i) li.className="current";
				STX.ScrollManager.attach(li, leftView(i));
				STX.ScrollManager.attachRightClick(li, rightView(i));
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
		 * @memberOf STX.Views
		 * @version ChartIQ Advanced Package
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
		 * Base class for Quotes infrastructure. Many of the built in UI capabilities such as comparison charts expect
		 * to follow this infrastructure. You should define your own classes that follow this pattern (or derive a class from STX.Quotes)
		 * in order to adapt your quote feed to make the most use of the built in componentry.
		 * @constructor
		 * @name STX.Quotes
		 * @version ChartIQ Advanced Package
		 */
		STX.Quotes=function(){};
		
		/**
		 * If you support multiple data sources then this can be used to cascade through them if data is not available.
		 * @param  {object} params        Standard parameters
		 * @param  {string} currentSource Current source
		 * @return {string}               The next source in the cascade, or null if no more available
		 * @memberOf STX.Quotes
		 * @version ChartIQ Advanced Package
		 */
		STX.Quotes.nextDataSource=function(params, currentSource){
			return null;
		};
		
		
		/**
		 * Fetch multiple quotes asynchronously, possibly from various data sources. This method can be used to update a chart with multiple symbols
		 * such as a comparison chart.
		 * @param  {array}   arr Array of params see {@link STX.Quotes.fetch}
		 * @param  {Function} cb  Function to callback when quotes are fetched. Will be passed an array of results. Each result is an object {err, data}. err will either be null or an error message.
		 * @memberOf STX.Quotes
		 * @version ChartIQ Advanced Package
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
		 * @memberOf STX.Quotes
		 * @version ChartIQ Advanced Package
		 */
		STX.Quotes.fetch=function(params, cb){
		    if(!params.source) params.source="Demo";
			function handleResponse(error, data){
				cb(error, data);
			}
			STX.Quotes[params.source].fetch(params, handleResponse);
		};
		
		/**
		 * Returns how many bars should be fetched. If we're fetching a series then it's simply the number
		 * of bars already in the chart. Otherwise it's the number of bars to fetch to fill up the screen.
		 * @param  {object} params Parameters
		 * @param  {object} stx    The chart object
		 * @return {number}        Number of bars to fetch
		 * @memberOf STX.Quotes
		 * @version ChartIQ Advanced Package
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
		
		STX.Quotes.Demo=function(){};
		
		STX.Quotes.Demo.fetch=function(params, cb){
			function setQuotes(response){
				var varName=response.substr(0,response.indexOf("="));
				var valueToParse=response.substring(response.indexOf(varName+"=")+(varName+"=").length,response.length-1);
				try{
					return JSON.parse(valueToParse.replace(/,0+/g,",0").replace(/,[.]/g,",0.").replace(/;/g,""));
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


		/* Advanced Studies */

		/**
		 * Calculate function for correlation coefficient
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 * @memberOf STX.Studies
		 * @version ChartIQ Advanced Package
		 */
		STX.Studies.calculateCorrelationCoefficient=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			//var base=stx.chart.symbol;
			var compare=sd.inputs["Compare To"];
			for(var sym=0;sym<compare.length;sym++){
				var sB=0;
				var sC=0;
				var sB2=0;
				var sC2=0;
				var sBC=0;
				var thisCompare=compare[sym];
				for(var i=0;i<quotes.length-1;i++){  //last tick has no compare data
					if(!quotes[i]) continue;
					var comparisonQuote=quotes[i][thisCompare];
					if(!comparisonQuote) {
						if(i>0 && quotes[i-1] && quotes[i-1]._.c) comparisonQuote=quotes[i-1]._.c;
						else comparisonQuote=0;
					}
					quotes[i]._={};
					sB+=quotes[i]._.b=quotes[i].Close;
					sC+=quotes[i]._.c=comparisonQuote;
					sB2+=quotes[i]._.b2=Math.pow(quotes[i].Close,2);
					sC2+=quotes[i]._.c2=Math.pow(comparisonQuote,2);
					sBC+=quotes[i]._.bc=quotes[i].Close*comparisonQuote;
					if(i>=period){
						sB-=quotes[i-period]._.b;
						sC-=quotes[i-period]._.c;
						sB2-=quotes[i-period]._.b2;
						sC2-=quotes[i-period]._.c2;
						sBC-=quotes[i-period]._.bc;
						quotes[i-period]._=null;
						
						var vb=sB2/period-Math.pow(sB/period,2);
						var vc=sC2/period-Math.pow(sC/period,2);
						var cv=sBC/period-sB*sC/Math.pow(period,2);
						var cc=cv/Math.sqrt(vb*vc);
						quotes[i]["Result " + thisCompare + " " + sd.name] = cc;
					}
				}
				for(var j=quotes.length-period;j<quotes.length;j++){
					quotes[j]._=null;
				}
			}
		};

		STX.Studies.calculateATRBands=function(stx, sd){
			STX.Studies.calculateStudyATR(stx,sd);
			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs.Shift, sd.inputs.Field, "ATR " + sd.name);
		};

		STX.Studies.calculateSTARCBands=function(stx, sd){
			STX.Studies.calculateStudyATR(stx,sd);
			STX.Studies.MA("simple", sd.inputs["MA Period"], "Close", 0, "MA", stx, sd);
			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs.Multiplier, "MA "+sd.name, "ATR " + sd.name);
		};

		STX.Studies.calculateATRStops=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			if(!quotes) return;
			STX.Studies.calculateStudyATR(stx,sd);
			var useHighLow=sd.inputs.HighLow;
		    for(var i=1;i<quotes.length-1;i++){
				var prices=quotes[i];
				var pd=quotes[i-1];
				var prev=prices["Buy Stops " + sd.name];
				if(!prev) prev=prices["Sell Stops " + sd.name];
				if(!prev) prev=0;
				if(!prices || !pd) continue;
				var base=prices.Close;
				var result=base;
		        var offset=prices["ATR " + sd.name]*sd.inputs.Multiplier;
				if(prices.Close>prev && pd.Close>prev){
					if(useHighLow) base=prices.High;
					result=Math.max(prev,base-offset);
				}else if(prices.Close<=prev && pd.Close<=prev){
					if(useHighLow) base=prices.Low;
					result=Math.min(prev,base+offset);
				}else if(prices.Close>prev){
					if(useHighLow) base=prices.High;
					result=base-offset;
				}else if(prices.Close<=prev){
					if(useHighLow) base=prices.Low;
					result=base+offset;
				}
				if(base<=result){
					quotes[i+1]["Buy Stops " + sd.name]=result;
					delete quotes[i+1]["Sell Stops " + sd.name];
				}else if(base>result){
					quotes[i+1]["Sell Stops " + sd.name]=result;					
					delete quotes[i+1]["Buy Stops " + sd.name];					
				}
				quotes[i+1]["All Stops " + sd.name]=result;
				sd.referenceOutput="All Stops";  //so PSAR2 can draw a square wave
			}
		};

		STX.Studies.calculateAwesomeOscillator=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.mp=new STX.Studies.StudyDescriptor(sd.name, "med price", sd.panel);
			sd.mp.chart=sd.chart;
			sd.mp.outputs={"Med Price":null};
			STX.Studies.calculateMedianPrice(stx,sd.mp);

			STX.Studies.MA("simple", 5, "Med Price "+sd.name, 0, "MA5", stx, sd);
			STX.Studies.MA("simple", 34, "Med Price "+sd.name, 0, "MA34", stx, sd);

			for(var i=33;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i][sd.name + "_hist"]=quotes[i]["MA5 " + sd.name] - quotes[i]["MA34 " + sd.name];
			}
		};
		
		STX.Studies.calculateRelativeVolatility=function(stx, sd){
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			sd.days=sd.inputs["Smoothing Period"];
			var quotes=sd.chart.scrubbed;
			function computeRVI(avgGain, avgLoss){
				if(avgGain+avgLoss===0) return 100;
				return 100*avgGain/(avgGain+avgLoss);
			}
			sd.std=new STX.Studies.StudyDescriptor(sd.name, "sdev", sd.panel);
			sd.std.chart=sd.chart;
			sd.std.days=sd.inputs["STD Period"];
			sd.std.inputs={"Field":field, "Standard Deviations":1, "Type":"ma"};
			sd.std.outputs={"STD":null};
			STX.Studies.calculateStandardDeviation(stx,sd.std);

			var avgGain=0;
			var avgLoss=0;
			for(var i=sd.days;i<quotes.length;i++){
				var quote=quotes[i];
				if(quote[field]>quotes[i-1][field]){
					avgGain=((avgGain*(sd.days-1))+quote["STD "+sd.name])/sd.days;
					avgLoss=avgLoss*(sd.days-1)/sd.days;
				}else{
					avgLoss=((avgLoss*(sd.days-1))+quote["STD "+sd.name])/sd.days;
					avgGain=avgGain*(sd.days-1)/sd.days;
				}
				quote["Rel Vol " + sd.name]=computeRVI(avgGain, avgLoss);
			}
			sd.zoneOutput="Rel Vol";
		};

		STX.Studies.calculatePMO=function(stx, sd){
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			
			var quotes=sd.chart.scrubbed;
		    var i;
		    for(i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-1]) continue;
				quotes[i]["ROCx10 "+sd.name]=1000*((quotes[i][field]/quotes[i-1][field])-1);
		    }
		    STX.Studies.MA("exponential", sd.inputs["Smoothing Period"]-1, "ROCx10 "+sd.name, 0, "EMAx10", stx, sd);
		    STX.Studies.MA("exponential", sd.inputs["Double Smoothing Period"]-1, "EMAx10 "+sd.name, 0, "PMO", stx, sd);
		    STX.Studies.MA("exponential", sd.inputs["Signal Period"], "PMO "+sd.name, 0, "PMOSignal", stx, sd);
		    sd.zoneOutput="PMO";
		};

		STX.Studies.calculateElderImpulse=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var bull=sd.outputs.Bullish;
			var bear=sd.outputs.Bearish;
			var neutral=sd.outputs.Neutral;
			
			STX.Studies.MA("exponential", 13, "Close", 0, "MA", stx, sd);
			sd.macd=new STX.Studies.StudyDescriptor(sd.name, "macd", sd.panel);
			sd.macd.chart=sd.chart;
			sd.macd.days=sd.days;
			sd.macd.inputs={"Fast MA Period":12,"Slow MA Period":26,"Signal Period":9};
			sd.macd.outputs={"MACD":null, "Signal":null};
			STX.Studies.calculateMACD(stx,sd.macd);

			for(i=0;i<quotes.length;i++){
				if(i===0) color=neutral;
				else if(quotes[i]["MA "+sd.name]>quotes[i-1]["MA "+sd.name] &&
						quotes[i][sd.name+"_hist"]>quotes[i-1][sd.name+"_hist"]) color=bull;
				else if(quotes[i]["MA "+sd.name]<quotes[i-1]["MA "+sd.name] &&
						quotes[i][sd.name+"_hist"]<quotes[i-1][sd.name+"_hist"]) color=bear;
				else color=neutral;
			    quotes[i]["Result "+sd.name]=color;
		    }
		};

		STX.Studies.calculatePivotPoints=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period="day";
			if(stx.layout.interval=="day") period="month";
			else if(stx.isDailyInterval(stx.layout.interval)) period="year";
			else if(stx.layout.interval=="second" || 
					stx.layout.interval=="millisecond" || 
					stx.layout.timeUnit=="second" || 
					stx.layout.timeUnit=="millisecond") period="15min";
			else{
				var interval=stx.layout.periodicity;
				if(stx.layout.interval!="minute"){
					interval*=stx.layout.interval;
				}
				if(interval>=30) period="week";
			}

			var isForex=STX.LegacyMarket.isForexSymbol(stx.chart.symbol);
			var isMetal=STX.LegacyMarket.isForexMetal(stx.chart.symbol);
			var marketOffset=null;
			
		    var pivotPoint=0;
		    var high=0;
		    var low=0;
		    var prevHigh=0;
		    var prevLow=0;
		    var hlSpread=0;
		    function resetPivots(){
	    		pivotPoint=(high+low+quotes[i-1].Close)/3;
	    		prevHigh=high;
	    		prevLow=low;
	    		hlSpread=high-low;
	    		high=low=0;		    	
		    }
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i-1]) continue;
		    	high=Math.max(high,quotes[i-1].High);
		    	low=Math.min(low>0?low:quotes[i-1].Low,quotes[i-1].Low);
		    	if(period=="year" && quotes[i].DT.getYear()!=quotes[i-1].DT.getYear()){
		    		//new yearly period
		    		resetPivots();
		    	}else if(period=="month" && quotes[i].DT.getMonth()!=quotes[i-1].DT.getMonth()){
		    		//new monthly period
		    		resetPivots();
		    	}else if(period=="week" && quotes[i].DT.getDay()<quotes[i-1].DT.getDay()){
		    		//new weekly period
		    		resetPivots();
		    	}else if(period=="day"){
		    		if(marketOffset===null){
		    			//possible new daily period
		    			marketOffset=STX.LegacyMarket.getMarketOffset(stx,quotes[i].DT);
			    		if(isForex){
			    			//Forex beginning of day is 17:00 NY Time, so add 7 hours of msecs (6 for metals) to make it fall on a date boundary
			    			if(isMetal) marketOffset+=6*60*60*1000;
			    			else marketOffset+=7*60*60*1000;
			    		}
		    		}
		    		var newDate=new Date(new Date(quotes[i].DT).setMilliseconds(quotes[i].DT.getMilliseconds()+marketOffset));
		    		var oldDate=new Date(new Date(quotes[i-1].DT).setMilliseconds(quotes[i-1].DT.getMilliseconds()+marketOffset));
		    		if(oldDate.getDate()!=newDate.getDate() && newDate.getDay()!==0 && newDate.getDay()!=6){
			    		//new daily period
			    		marketOffset=null;
			    		resetPivots();
			    	}
		    	}else if(period=="15min" && 
		    			(quotes[i].DT.getHours()!=quotes[i-1].DT.getHours() || Math.floor(quotes[i].DT.getMinutes()/15)!=Math.floor(quotes[i-1].DT.getMinutes()/15))){
		    		//new 15 minute period
		    		resetPivots();
		    	}
	        	quotes[i]["Pivot " + sd.name]=pivotPoint;
	        	if(sd.inputs.Type.toLowerCase()=="fibonacci"){
		        	quotes[i]["Resistance 1 " + sd.name]=pivotPoint+0.382*hlSpread;
		        	quotes[i]["Resistance 2 " + sd.name]=pivotPoint+0.618*hlSpread;
		        	quotes[i]["Resistance 3 " + sd.name]=pivotPoint+hlSpread;
		        	quotes[i]["Support 1 " + sd.name]=pivotPoint-0.382*hlSpread;
		        	quotes[i]["Support 2 " + sd.name]=pivotPoint-0.618*hlSpread;
		        	quotes[i]["Support 3 " + sd.name]=pivotPoint-hlSpread;	        		
	        	}else{
		        	quotes[i]["Resistance 1 " + sd.name]=2*pivotPoint-prevLow;
		        	quotes[i]["Resistance 2 " + sd.name]=pivotPoint+hlSpread;
		        	quotes[i]["Resistance 3 " + sd.name]=pivotPoint+2*hlSpread;
		        	quotes[i]["Support 1 " + sd.name]=2*pivotPoint-prevHigh;
		        	quotes[i]["Support 2 " + sd.name]=pivotPoint-hlSpread;
		        	quotes[i]["Support 3 " + sd.name]=pivotPoint-2*hlSpread;
	        	}
		    }
		};
		
		STX.Studies.calculateMFI=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var high=0;
			var i;
			for(i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(quotes[i].Volume) {
		    		quotes[i][sd.name + "_hist"]=(quotes[i].High-quotes[i].Low)/quotes[i].Volume;
		    		high=Math.max(high,quotes[i][sd.name + "_hist"]);
		    	}
		    }
			var range=1;
			if(high>0){
				while(high*range<1) {
					range*=10;
				}
			}
			for(i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i][sd.name + "_hist"]*=range;
		    }
		};
		
		STX.Studies.calculateAlligator=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.mp=new STX.Studies.StudyDescriptor(sd.name, "med price", sd.panel);
			sd.mp.chart=sd.chart;
			sd.mp.outputs={"Med Price":null};
			STX.Studies.calculateMedianPrice(stx,sd.mp);
			
			STX.Studies.MA("welles wilder", Number(sd.inputs["Jaw Period"]), "Med Price "+sd.name, sd.inputs["Jaw Offset"], "Jaw", stx, sd);
			STX.Studies.MA("welles wilder", Number(sd.inputs["Teeth Period"]), "Med Price "+sd.name, sd.inputs["Teeth Offset"], "Teeth", stx, sd);
			STX.Studies.MA("welles wilder", Number(sd.inputs["Lips Period"]), "Med Price "+sd.name, sd.inputs["Lips Offset"], "Lips", stx, sd);

			for(var i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i][sd.name + "_hist1"]=Math.abs(quotes[i]["Jaw " + sd.name] - quotes[i]["Teeth " + sd.name]);
				quotes[i][sd.name + "_hist2"]=-Math.abs(quotes[i]["Teeth " + sd.name] - quotes[i]["Lips " + sd.name]);

				if(sd.inputs["Show Fractals"]){
					if(!quotes[i-2] || !quotes[i-1] || !quotes[i] || !quotes[i+1] || !quotes[i+2]) continue;
					if(quotes[i-2].High && quotes[i-1].High && quotes[i].High && quotes[i+1].High && quotes[i+2].High){
						if(quotes[i].High>quotes[i-1].High && quotes[i].High>quotes[i-2].High &&
							quotes[i].High>quotes[i+1].High && quotes[i].High>quotes[i+2].High){
							quotes[i]["Fractal High "+sd.name]=1;
						}
					}
					if(quotes[i-2].Low && quotes[i-1].Low && quotes[i].Low && quotes[i+1].Low && quotes[i+2].Low){
						if(quotes[i].Low<quotes[i-1].Low && quotes[i].Low<quotes[i-2].Low &&
							quotes[i].Low<quotes[i+1].Low && quotes[i].Low<quotes[i+2].Low){
							quotes[i]["Fractal Low "+sd.name]=1;
						}
					}
				}
			}

		};
		
		STX.Studies.calculateRelativeVigor=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var i;
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i]["Change " + sd.name]=quotes[i].Close-quotes[i].Open;
				quotes[i]["Range " + sd.name]=quotes[i].High-quotes[i].Low;
			}
			
			STX.Studies.MA("triangular", 4, "Change "+sd.name, 0, "Numer", stx, sd);
			STX.Studies.MA("triangular", 4, "Range "+sd.name, 0, "Denom", stx, sd);
			
			var nums=[];
			var dens=[];
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				nums.push(quotes[i]["Numer "+sd.name]);
				dens.push(quotes[i]["Denom "+sd.name]);
				if(nums.length>sd.days){
					nums.shift();
					dens.shift();
				}
				var sumNum=0;
				var sumDen=0;
				var it;
				for(it=0;it<nums.length;it++){sumNum+=nums[it];}
				for(it=0;it<dens.length;it++){sumDen+=dens[it];}
				if(sumDen===0) sumDen=0.00000001;
				quotes[i]["Rel Vig "+sd.name]=sumNum/sumDen;
			}

			STX.Studies.MA("triangular", 4, "Rel Vig "+sd.name, 0, "RelVigSignal", stx, sd);
			
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i][sd.name+"_hist"]=quotes[i]["Rel Vig "+sd.name]-quotes[i]["RelVigSignal "+sd.name];
			}
		};

		STX.Studies.calculateUlcerIndex=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

			function getHV(p,x,f){
				var h=null;
				for(var j=x-p+1;j<=x;j++){
					if(j<0) continue;
					h=(h===null?quotes[j][f]:Math.max(h,quotes[j][f]));
				}
				return h;
			}
		    var i;
		    for(i=sd.days-1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["PD2 "+sd.name]=Math.pow(100*(quotes[i][field]/getHV(sd.days,i,field)-1),2);
		    }
		    STX.Studies.MA("simple", sd.days, "PD2 "+sd.name, 0, "MA", stx, sd);
		    for(i=2*(sd.days-1);i<quotes.length;i++){
		    	quotes[i]["Result "+sd.name]=Math.sqrt(quotes[i]["MA "+sd.name]);
		    }
		};
		
		STX.Studies.calculateChoppiness=function(stx, sd){
			STX.Studies.calculateStudyATR(stx,sd);

			var quotes=sd.chart.scrubbed;

			function getLLVHHV(p,x){
				var h=null, l=null;
				for(var j=x-p+1;j<=x;j++){
					if(j<0) continue;
					h=(h===null?quotes[j].High:Math.max(h,quotes[j].High));
					l=(l===null?quotes[j].Low:Math.min(l,quotes[j].Low));
				}
				return [l,h];
			}
		    for(var i=sd.days;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var lh=getLLVHHV(sd.days,i);
		    	quotes[i]["Result "+sd.name]=100*(Math.log(quotes[i]["Sum True Range "+sd.name]/(lh[1]-lh[0])))/Math.log(sd.days);
		    }
		};

		STX.Studies.calculateDisparity=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

		    STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, field, 0, "MA", stx, sd);
		    for(var i=sd.days-1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["Result "+sd.name]=100*(quotes[i][field]/quotes[i]["MA "+sd.name]-1);
		    }
		};
		
		STX.Studies.calculateRainbow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

			function getLLVHHV(p,x){
				var h=null, l=null;
				for(var j=x-p+1;j<=x;j++){
					if(j<0) continue;
					h=(h===null?quotes[j].Close:Math.max(h,quotes[j].Close));
					l=(l===null?quotes[j].Close:Math.min(l,quotes[j].Close));
				}
				return [l,h];
			}

			var f=field;
			for(var j=1;j<=10;j++) {
				STX.Studies.MA("simple", sd.days, f, 0, "SMA"+j, stx, sd);
				f="SMA"+j+" "+sd.name;
			}
		    
		    for(var i=10;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var accum=0,max=0,min=Number.MAX_VALUE;
		    	for(j=1;j<=10;j++) {
		    		var q=quotes[i]["SMA"+j+" "+sd.name];
		    		accum+=q;
		    		max=Math.max(max,q);
		    		min=Math.min(min,q);
		    	}
		    	if(sd.name.indexOf("Osc")>-1) {
		    		var lh=getLLVHHV(sd.inputs["HHV/LLV Lookback"],i);
		    		quotes[i][sd.name+"_hist"]=100*(quotes[i][field]-accum/10)/Math.max(0.000001,lh[1]-lh[0]);
		    		quotes[i]["Over "+sd.name]=100*(max-min)/Math.max(0.000001,lh[1]-lh[0]);
		    		quotes[i]["Under "+sd.name]=-quotes[i]["Over "+sd.name];
		    		quotes[i]["Zero "+sd.name]=0;
		    	}
		    }
		};

		STX.Studies.calculateKST=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var roc={}; smp={};
			roc[1]=sd.inputs["Lightest Rate of Change Period"];
			roc[2]=sd.inputs["Light Rate of Change Period"];
			roc[3]=sd.inputs["Heavy Rate of Change Period"];
			roc[4]=sd.inputs["Heaviest Rate of Change Period"];
			smp[1]=sd.inputs["Lightest SMA Period"];
			smp[2]=sd.inputs["Light SMA Period"];
			smp[3]=sd.inputs["Heavy SMA Period"];
			smp[4]=sd.inputs["Heaviest SMA Period"];
			var sp=sd.inputs["Signal Period"];
		    var i,j;
		    for(i=0;i<quotes.length;i++){
	    		if(!quotes[i]) continue;
		    	for(j=1;j<=4;j++){
		    		if(i>=roc[j] && quotes[i-roc[j]]) quotes[i]["ROC"+j+" "+sd.name]=100*((quotes[i][field]/quotes[i-roc[j]][field])-1);
		    	}
		    }
			for(j=1;j<=4;j++) {
				STX.Studies.MA("simple", smp[j], "ROC"+j+" "+sd.name, 0, "SMA"+j, stx, sd);
			}
			for(i=0;i<quotes.length;i++){
			    quotes[i]["KST "+sd.name]=0;
				for(j=1;j<=4;j++) quotes[i]["KST "+sd.name]+=j*quotes[i]["SMA"+j+" "+sd.name];
		    }
			STX.Studies.MA("simple", sp, "KST "+sd.name, 0, "KSTSignal", stx, sd);
		};
		
		STX.Studies.calculateSpecialK=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var span=sd.inputs.Interval;
			if(!span) span="daily";
			var roc={
				daily: [10,15,20,30,50,65,75,100,195,265,390,530],
				weekly: [4,5,6,8,10,13,15,20,39,52,78,104]
			}; 
			var map={
				daily: [10,10,10,15,50,65,75,100,130,130,130,195],
				weekly: [4,5,6,8,10,13,15,20,26,26,26,39]
			};
		    var i,j;
		    for(i=0;i<quotes.length;i++){
	    		if(!quotes[i]) continue;
		    	for(j=0;j<roc[span].length;j++){
		    		if(i>=roc[span][j] && quotes[i-roc[span][j]]) quotes[i]["ROC"+j+" "+sd.name]=100*((quotes[i][field]/quotes[i-roc[span][j]][field])-1);
		    	}
		    }
			for(j=0;j<map[span].length;j++) {
				STX.Studies.MA(span=="daily"?"simple":"exponential", map[span][j], "ROC"+j+" "+sd.name, 0, "MA"+j, stx, sd);
			}
			for(i=0;i<quotes.length;i++){
			    quotes[i]["Result "+sd.name]=0;
				for(j=0;j<map[span].length;j++) {
					quotes[i]["Result "+sd.name]+=((j%4)+1)*quotes[i]["MA"+j+" "+sd.name];
				}
		    }
		};

		STX.Studies.calculateDarvas=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var state=0;
			var allTimeHigh=0;
			var allTimeHighPeriods=parseInt(sd.inputs["All-Time High Lookback Period"],10);
			if(sd.inputs["Volume Spike"]){
				STX.Studies.MA("simple", allTimeHighPeriods, "Volume", 0, "ADV", stx, sd);				
			}
			var spikePercentage=parseFloat(sd.inputs["Volume % of Avg"])/100;
			var boxState="none";
			var boxData={};
			var ghost=null;
			var buy=null, sell=null;
			var offset=parseFloat(sd.inputs["Level Offset"]);
			var debug=false;
			if(debug) console.log("*****************");
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				
				if(parseFloat(sd.inputs["Price Minimum"])<=quotes[allTimeHigh].Close){
				
					if(ghost && (!ghost.End || i==ghost.End+1)){
						if(quotes[i-1].Close>boxData.High){
							boxData={State:1,High:2*boxData.High-boxData.Low,Low:boxData.High,Start:i,End:2*boxData.End-boxData.Start+1};
						}else{
							ghost=null;
							//boxData={State:1,High:boxData.High,Low:boxData.Low,Start:i,End:2*boxData.End-boxData.Start+1};
						}
						if(ghost){
							quote["Ghost "+sd.name]=STX.clone(boxData);
							if(debug) console.log("Ghost begin:"+quote.DT);
							boxData.State=0;
							if(quotes[boxData.End]){
								quotes[boxData.End]["Ghost "+sd.name]=STX.clone(boxData);
								if(debug) console.log("Ghost end:"+quotes[boxData.End].DT);
							}
							ghost={Start:boxData.Start,End:boxData.End};
							buy=boxData.High+offset;
							if(!sell || sell < boxData.Low-offset){
								sell=boxData.Low-offset;
							}
						}
					}
					
					quote["Profit "+sd.name]=buy;
					quote["Loss "+sd.name]=sell;
					if(quote.Close>=buy) buy=null;
					else if(sd.inputs["Exit Field"]=="high/low" && quote.High>=buy) buy=null;
					
					if(boxState=="none"){
						if(i==allTimeHigh+3) {
							if(!quotes[allTimeHigh+2]["Darvas "+sd.name] &&
							   !quotes[allTimeHigh+1]["Darvas "+sd.name] && 
							   !quotes[allTimeHigh]["Darvas "+sd.name] &&
							   quotes[allTimeHigh].High>quote.High) {
								boxState="high";
								//if(sell) buy=Math.max(buy,quotes[allTimeHigh].High+offset);
							}
						}
					}

					if(boxState=="high"){
						if(quote.High>quotes[allTimeHigh].High){
							boxState="none";
						}else if(quotes[i-3].Low<quotes[i-2].Low && quotes[i-3].Low<quotes[i-1].Low && quotes[i-3].Low<quote.Low){
							boxData={State:1,High:quotes[allTimeHigh].High,Low:quotes[i-3].Low,Start:allTimeHigh};
							quotes[allTimeHigh]["Darvas "+sd.name]=STX.clone(boxData);
							boxState="darvas";
							if(debug) console.log("Darvas begin:"+quotes[allTimeHigh].DT);
							if(debug) console.log("Darvas established:"+quote.DT);
							if(ghost){
								if(ghost.End>i && quotes[ghost.Start]){
									quote["Ghost "+sd.name]=STX.clone(quotes[ghost.Start]["Ghost "+sd.name]);
									quote["Ghost "+sd.name].End=i;
									if(quotes[ghost.End]) {
										delete quotes[ghost.End]["Ghost "+sd.name];
										if(debug) console.log("Ghost End removed:"+quotes[ghost.End].DT);
									}
								}
								quote["Ghost "+sd.name].State=0;
								quotes[ghost.Start]["Ghost "+sd.name].End=i;
								if(debug) console.log("Ghost end:"+quote.DT);
								ghost=null;
							}
							buy=boxData.High+offset;
							if(!sell || sell < boxData.Low-offset){
								sell=boxData.Low-offset;
							}
						}
					}

					if(boxState=="darvas"){
						if(quote.Close>boxData.High) ghost={};
						else if(sd.inputs["Exit Field"]=="high/low" && quote.High>boxData.High) ghost={};
						else if(quote.Close<boxData.Low) boxState="none";
						else if(sd.inputs["Exit Field"]=="high/low" && quote.Low<boxData.Low) boxState="none";
						if(ghost) boxState="none";
						else if(boxState=="none"){
							buy=null;
							sell=null;
						}
						if(!sd.inputs["Ghost Boxes"]) ghost=null;
						if(boxState=="none"){
							for(var d=boxData.Start+1;d<i;d++){
								quotes[d]["Darvas "+sd.name]=STX.clone(boxData);
							}
							boxData.State=0;
							boxData.End=i;
							quote["Darvas "+sd.name]=STX.clone(boxData);
							if(debug) console.log("Darvas end:"+quote.DT);
							continue;
						}
					}

					if(sell){
						if(quote.Close<boxData.Low ||
						  (sd.inputs["Exit Field"]=="high/low" && quote.Low<boxData.Low)){
							if(boxState=="darvas") boxState="none";
							if(quote.Close<sell || (sd.inputs["Exit Field"]=="high/low" && quote.Low<sell)){
								buy=null;
								sell=null;
							}
							if(ghost){
								if(ghost.End>i && quotes[ghost.Start]){
									quote["Ghost "+sd.name]=STX.clone(quotes[ghost.Start]["Ghost "+sd.name]);
									quote["Ghost "+sd.name].End=i;
									if(quotes[ghost.End]){
										delete quotes[ghost.End]["Ghost "+sd.name];
										if(debug) console.log("Ghost End removed:"+quotes[ghost.End].DT);
									}
								}
								quote["Ghost "+sd.name].State=0;
								quotes[ghost.Start]["Ghost "+sd.name].End=i;
								if(debug) console.log("Ghost end:"+quote.DT);
								ghost=null;
							}
						}
					}
				}

				if(quote.High>=quotes[allTimeHigh].High){
					allTimeHigh=i;
				}

				if(i<3 || (quote.High>=quotes[i-1].High && quote.High>=quotes[i-2].High && quote.High>=quotes[i-3].High)){
					if(i-allTimeHigh>=allTimeHighPeriods){
						allTimeHigh=i;
						for(var j=0;j<allTimeHighPeriods;j++){
							if(i-j<0) break;
							if(quotes[i-j].High>quotes[allTimeHigh].High){
								allTimeHigh=i-j;
							}
						}
					}
				}
				
				if(sd.inputs["Volume Spike"] && i>allTimeHighPeriods && i==allTimeHigh){
					if(quote["ADV "+sd.name]*spikePercentage < quote.Volume){
						quote["Spike "+sd.name]=1;
						if(debug) console.log("Volume Spike:"+quote.DT);
					}
				}

			}
		};

		STX.Studies.calculateSupertrend=function(stx, sd){
			STX.Studies.calculateStudyATR(stx,sd);
			var quotes=sd.chart.scrubbed;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				var median=(quote.High+quote.Low)/2;
				var factoredATR=sd.inputs.Multiplier*quote["ATR "+sd.name];
				var uptrend=median-factoredATR;
				var downtrend=median+factoredATR;
				if(i){
					if(quotes[i-1] && quotes[i-1].Close && 
						quotes[i-1].Close>quotes[i-1]["Uptrend "+sd.name] && 
						quotes[i-1]["Uptrend "+sd.name]>uptrend)
						uptrend=quotes[i-1]["Uptrend "+sd.name];
					if(quotes[i-1] && quotes[i-1].Close && 
						quotes[i-1].Close<quotes[i-1]["Downtrend "+sd.name] && 
						quotes[i-1]["Downtrend "+sd.name]<downtrend)
						downtrend=quotes[i-1]["Downtrend "+sd.name];
				}
				quote["Direction "+sd.name]=1;
				if(i) {
					quote["Direction "+sd.name]=quotes[i-1]["Direction "+sd.name];
					if(quote.Close > quotes[i-1]["Downtrend "+sd.name]) quote["Direction "+sd.name]=1;
					else if(quote.Close < quotes[i-1]["Uptrend "+sd.name]) quote["Direction "+sd.name]=-1;
				}
				quote["Uptrend "+sd.name]=uptrend;
				quote["Downtrend "+sd.name]=downtrend;
				quote["Trend "+sd.name]=quote["Direction "+sd.name] > 0 ? uptrend : downtrend;
			}
		};

		STX.Studies.calculatePriceRelative=function(stx, sd){
			stx.panels[sd.panel].studyQuotes={};
			if(stx.chart.symbol.indexOf(":")>-1) {
				stx.panels[sd.panel].studyQuotes=null;
				return;
			}
			var cSym=sd.inputs["Comparison Symbol"].split(":")[0]; //do not allow : in symbol
			if(cSym==="" || cSym==stx.chart.symbol) {
				stx.panels[sd.panel].studyQuotes=null;
				return;
			}
			stx.panels[sd.panel].studyQuotes[cSym]=true;

			var quotes=sd.chart.scrubbed;
			// only needed if not using the quotefeed.
			if(sd.loadedInitialData){
				var q=0;
				for(;q<quotes.length;q++){
					if(quotes[q] && (quotes[q][cSym] || quotes[q][cSym]===0)) break;
				}
				if(q==quotes.length) sd.loadedInitialData=null;
			}

			if(!sd.loadedInitialData && sd.loadedInitialData!==false){  //check to see if we've loaded the initial data
				sd.loadedInitialData=false;
				var params={
	                stx: stx,
	                chart: stx.panels[sd.panel].chart,
				    symbol: cSym,
	                interval: stx.layout.interval,
	                period: 1,
	                extended: stx.layout.extended,
					adj: stx.layout.adj,
					startDate: quotes[0].DT,
					endDate: quotes[quotes.length-1].DT,
				    feed: "delayed",
				    nocache: true
	            };
				if(!isNaN(params.interval)){	// normalize numeric intervals into "minute" form
					params.period=params.interval;
					params.interval="minute";
				}

				stx.startAsyncAction();
				if(stx.quoteDriver){
					stx.quoteDriver.quoteFeed.multiFetch([params], function(results){
						for(var i=0;i<results.length;i++){
							var result=results[i];
							if(result.dataCallback.error){
								sd.loadedInitialData=null;//allow a retry
							}else{
								STX.addMemberToMasterdata(params.stx, params.symbol, result.dataCallback.quotes);
								params.stx.createDataSet();
								params.stx.draw();  //need this due to async nature of this function
								sd.loadedInitialData=true;
							}
						}
						params.stx.completeAsyncAction();
					});
				}else{
					//this will go away one day
					STX.Quotes.fetch(params,function(error,data){
						if(error){
							sd.loadedInitialData=null;//allow a retry
						}else{
							STX.addMemberToMasterdata(stx,params.symbol,data);
							stx.createDataSet();
							stx.draw();  //need this due to async nature of this function
							sd.loadedInitialData=true;
						}
						stx.completeAsyncAction();
					});
				}
				return;
			}
			quotes=stx.chart.dataSet; //operating on dataset is probably faster than recreating and scrubbing it

			var map={};
			map[stx.chart.symbol]=[].concat(quotes);
			map[cSym]=null;
			var results=STX.computeEquationChart(stx.chart.symbol+"/"+cSym, map);
			var rIter=0;
			for(var i=0;i<quotes.length && rIter<results.length;i++){
				while(rIter<results.length && quotes[i].DT.getTime()>results[rIter].DT.getTime()) rIter++;
				if(quotes[i].DT.getTime()<results[rIter].DT.getTime()) continue;
				quotes[i]["Result "+sd.name]=results[rIter].Close;
				rIter++;
			}
			//stx.panels[sd.panel].roundit=100000;
		};

		//Copyright 2012 by ChartIQ LLC				
		STX.Studies.calculateIchimoku=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			function getLLVHHV(p,x){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					if(j<0) continue;
					l=(l===null?quotes[j].Low:Math.min(l,quotes[j].Low));
					h=(h===null?quotes[j].High:Math.max(h,quotes[j].High));
				}
				return [l,h];
			}

			var i,hl;
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				
				hl=getLLVHHV(sd.inputs["Conversion Line Period"],i);
				quotes[i]["Conversion Line " + sd.name]=(hl[1]+hl[0])/2;

				hl=getLLVHHV(sd.inputs["Base Line Period"],i);
				quotes[i]["Base Line " + sd.name]=(hl[1]+hl[0])/2;

				if(i<sd.inputs["Lagging Span Period"]) continue;
				quotes[i-Number(sd.inputs["Lagging Span Period"])]["Lagging Span " + sd.name]=quotes[i].Close;
			}
			sd.futureA=[];
			sd.futureB=[];
			for(i=0;i<quotes.length;i++){
				hl=getLLVHHV(sd.inputs["Leading Span B Period"],i);
				var blp=Number(sd.inputs["Base Line Period"]);
				if(!quotes[i+blp]) {
					sd.futureA.push((quotes[i]["Conversion Line " + sd.name]+quotes[i]["Base Line " + sd.name])/2);		
					sd.futureB.push((hl[1]+hl[0])/2);	
				}else{
					quotes[i+blp]["Leading Span A " + sd.name]=(quotes[i]["Conversion Line " + sd.name]+quotes[i]["Base Line " + sd.name])/2;
					quotes[i+blp]["Leading Span B " + sd.name]=(hl[1]+hl[0])/2;
					
				}
			}
		};
		
		STX.Studies.displayIchimoku=function(stx, sd, quotes){
		    var offset=0;//stx.offset;
		    var intersections = [];
		    var panel=stx.panels[sd.panel];
		
		    var i,ax1,ax2,bx1,bx2,ay1,ay2,by1,by2,interX,interY;
			stx.startClip(panel.name);
			var ichiQuotes=[];
		    for(i=0;i<quotes.length;i++){ //creates array of local quote values
		    	if(!quotes[i]){
		    		ichiQuotes.push(null);
		    	}else{
			    	ichiQuotes.push(quotes[i].transform?quotes[i].transform:quotes[i]);
			    }
		    }
		    for(i=0;i<ichiQuotes.length-1;i++){ //creates array of intersection points
		    	if(!ichiQuotes[i]) continue;
		    	if(!ichiQuotes[i+1]) continue;
				if(stx.panels[sd.panel].name==sd.chart.name){
					if(ichiQuotes[i].transform) ichiQuotes[i]=ichiQuotes[i].transform;
					if(ichiQuotes[i+1].transform) ichiQuotes[i+1]=ichiQuotes[i+1].transform;
		        }
		        if(ichiQuotes[i]["Leading Span A " + sd.name]===null || isNaN(ichiQuotes[i]["Leading Span A " + sd.name])) continue;
		        else if((ichiQuotes[i]["Leading Span A " + sd.name]>=ichiQuotes[i]["Leading Span B " + sd.name] && ichiQuotes[i+1]["Leading Span A " + sd.name]<=ichiQuotes[i+1]["Leading Span B " + sd.name]) || (ichiQuotes[i]["Leading Span A " + sd.name]<=ichiQuotes[i]["Leading Span B " + sd.name] && ichiQuotes[i+1]["Leading Span A " + sd.name]>=ichiQuotes[i+1]["Leading Span B " + sd.name])){
		            ax1=stx.pixelFromBar(i)+offset;
		            ax2=stx.pixelFromBar(i+1)+offset;
		            bx1=ax1;
		            bx2=ax2;
		            ay1=stx.pixelFromPrice(ichiQuotes[i]["Leading Span A " + sd.name], panel);
		            ay2=stx.pixelFromPrice(ichiQuotes[i+1]["Leading Span A " + sd.name], panel);
		            by1=stx.pixelFromPrice(ichiQuotes[i]["Leading Span B " + sd.name], panel);
		            by2=stx.pixelFromPrice(ichiQuotes[i+1]["Leading Span B " + sd.name], panel);
		
		            interX=STX.intersectLineLineX(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            interY=STX.intersectLineLineY(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var intersection={};
		            intersection.x=interX;
		            intersection.y=interY;
		            intersection.tick=i+1;
		            intersections.push(intersection);
		        }
		    }
		
		    var futureIntersections = [];
		    for(i=0;sd.futureA && i<sd.futureA.length-1;i++){ //creates array of future intersection points so clouds project into the future
		        if(sd.futureA[i]===null || isNaN(sd.futureA[i]));
		        else if((sd.futureA[i]>sd.futureB[i] && sd.futureA[i+1]<sd.futureB[i+1]) || (sd.futureA[i]<sd.futureB[i] && sd.futureA[i+1]>sd.futureB[i+1])){
		            ax1=stx.pixelFromBar(ichiQuotes.length+i)+offset;
		            ax2=stx.pixelFromBar(ichiQuotes.length+i+1)+offset;
		            bx1=ax1;
		            bx2=ax2;
		            ay1=stx.pixelFromPrice(sd.futureA[i], panel);
		            ay2=stx.pixelFromPrice(sd.futureA[i+1], panel);
		            by1=stx.pixelFromPrice(sd.futureB[i], panel);
		            by2=stx.pixelFromPrice(sd.futureB[i+1], panel);
		
		            interX=STX.intersectLineLineX(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            interY=STX.intersectLineLineY(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var fIntersection={};
		            fIntersection.x=interX;
		            fIntersection.y=interY;
		            fIntersection.tick=ichiQuotes.length+i+1;
		            futureIntersections.push(fIntersection);
		        }
		    }
		    var k,m,n;
	        stx.chart.context.globalAlpha=0.3;
	        stx.chart.context.beginPath();
        	//first cloud, which is open on the left of the chart, possibly on the right as well
        	var start=0;
        	var end=ichiQuotes.length;
        	if(intersections.length) end=intersections[0].tick;
        	while(start<=end && !ichiQuotes[start]) start++;
        	if(start<=end){
		        if(ichiQuotes[start]["Leading Span A " + sd.name]>ichiQuotes[start]["Leading Span B " + sd.name]){
		            stx.chart.context.fillStyle="#00FF00"; //green colored clouds
		        }
		        else{
		            stx.chart.context.fillStyle="#FF0000"; //red colored clouds
		        }
			    stx.chart.context.moveTo(stx.chart.left+offset,stx.pixelFromPrice(ichiQuotes[start]["Leading Span A " + sd.name], panel));
	            for(n = start;n<end;n++){
	                stx.chart.context.lineTo(stx.pixelFromBar(n)+offset,stx.pixelFromPrice(ichiQuotes[n]["Leading Span A " + sd.name], panel));
	            }
	            if(intersections[0]){
	            	stx.chart.context.lineTo(intersections[0].x,intersections[0].y);
	            }
	            for(m = end-1;m>=start;m--){
	                stx.chart.context.lineTo(stx.pixelFromBar(m)+offset,stx.pixelFromPrice(ichiQuotes[m]["Leading Span B " + sd.name], panel));
	            }
	            stx.chart.context.lineTo(stx.chart.left+offset,stx.pixelFromPrice(ichiQuotes[start]["Leading Span B " + sd.name], panel));
	            stx.chart.context.lineTo(stx.chart.left+offset,stx.pixelFromPrice(ichiQuotes[start]["Leading Span A " + sd.name], panel));
		        stx.chart.context.fill();
            }
		    for(k = 0;k<intersections.length;k++){
		        stx.chart.context.beginPath();
		        stx.chart.context.moveTo(intersections[k].x,intersections[k].y);
		        if(ichiQuotes[intersections[k].tick]["Leading Span A " + sd.name]>ichiQuotes[intersections[k].tick]["Leading Span B " + sd.name]){
		            stx.chart.context.fillStyle="#00FF00"; //green colored clouds
		        }
		        else{
		            stx.chart.context.fillStyle="#FF0000"; //red colored clouds
		        }
		        if(k+1==intersections.length){ //last cloud in the present
		            for(n = intersections[k].tick;n<ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(n)+offset,stx.pixelFromPrice(ichiQuotes[n]["Leading Span A " + sd.name], panel));
		            }
		            for(m = ichiQuotes.length-1;m>=intersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.pixelFromBar(m)+offset,stx.pixelFromPrice(ichiQuotes[m]["Leading Span B " + sd.name], panel));
		            }
		        }
		        else{ //draw past clouds
		            for(n = intersections[k].tick;n<intersections[k+1].tick;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(n)+offset,stx.pixelFromPrice(ichiQuotes[n]["Leading Span A " + sd.name], panel));
		            }
		            stx.chart.context.lineTo(intersections[k+1].x,intersections[k+1].y);
		            for(m = intersections[k+1].tick-1;m>=intersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.pixelFromBar(m)+offset,stx.pixelFromPrice(ichiQuotes[m]["Leading Span B " + sd.name], panel));
		            }
		        }
		        stx.chart.context.fill();
		    }
		
		    stx.chart.context.beginPath();
		    if(k>=0 && ichiQuotes[ichiQuotes.length-1]){
		        stx.chart.context.moveTo(stx.pixelFromBar(ichiQuotes.length-1)+offset,stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span A " + sd.name], panel));
		        var ql;
		        if(!futureIntersections.length){ //no future intersections, just continue present cloud
		            ql=ichiQuotes.length;
		            for(n = 0;n<sd.futureA.length;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(ql)+offset,stx.pixelFromPrice(sd.futureA[n], panel));
		                ql++;
		            }
		            ql--;
		            for(n = sd.futureB.length-1;n>=0;n--){
		                stx.chart.context.lineTo(stx.pixelFromBar(ql)+offset,stx.pixelFromPrice(sd.futureB[n], panel));
		                ql--;
		            }
		            stx.chart.context.lineTo(stx.pixelFromBar(ichiQuotes.length-1)+offset,stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span B " + sd.name], panel));
		            stx.chart.context.fill();
		        }
		        else{ //finish present cloud so we can start on the future clouds
		            ql=ichiQuotes.length;
		
		            for(n = 0;n<futureIntersections[0].tick-ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(ql)+offset,stx.pixelFromPrice(sd.futureA[n], panel));
		                ql++;
		            }
		            ql--;
		            stx.chart.context.lineTo(futureIntersections[0].x,futureIntersections[0].y);
		            for(n = futureIntersections[0].tick-1-ichiQuotes.length;n>=0;n--){
		                stx.chart.context.lineTo(stx.pixelFromBar(ql)+offset,stx.pixelFromPrice(sd.futureB[n], panel));
		                ql--;
		            }
		            stx.chart.context.lineTo(stx.pixelFromBar(ichiQuotes.length-1)+offset,stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span B " + sd.name], panel));
		            stx.chart.context.fill();
		        }
		    }
		
		    for(k = 0;k<futureIntersections.length;k++){
		        stx.chart.context.lineWidth=0;
		        stx.chart.context.globalAlpha=0.3;
		        stx.chart.context.beginPath();
		        stx.chart.context.moveTo(futureIntersections[k].x,futureIntersections[k].y);
		        if(sd.futureA[futureIntersections[k].tick-ichiQuotes.length]>sd.futureB[futureIntersections[k].tick-ichiQuotes.length]){
		            stx.chart.context.fillStyle="#00FF00";
		        }
		        else{
		            stx.chart.context.fillStyle="#FF0000";
		        }
		        if(k+2>futureIntersections.length){ //last cloud
		            for(n = futureIntersections[k].tick;n<sd.futureA.length+ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(n)+offset,stx.pixelFromPrice(sd.futureA[n-ichiQuotes.length], panel));
		            }
		            for(m = sd.futureA.length-1;m>=futureIntersections[k].tick-ichiQuotes.length;m--){
		                stx.chart.context.lineTo(stx.pixelFromBar(m+ichiQuotes.length)+offset,stx.pixelFromPrice(sd.futureB[m], panel));
		            }
		        }
		        else{ //draw future clouds
		            for(n = futureIntersections[k].tick;n<futureIntersections[k+1].tick;n++){
		                stx.chart.context.lineTo(stx.pixelFromBar(n)+offset,stx.pixelFromPrice(sd.futureA[n-ichiQuotes.length], panel));
		            }
		            stx.chart.context.lineTo(futureIntersections[k+1].x,futureIntersections[k+1].y);
		            for(m = futureIntersections[k+1].tick-1;m>=futureIntersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.pixelFromBar(m)+offset,stx.pixelFromPrice(sd.futureB[m-ichiQuotes.length], panel));
		            }
		        }
		        stx.chart.context.fill();
		    }
	        stx.chart.context.globalAlpha=1;
		    STX.Studies.displaySeriesAsLine(stx, sd, quotes);
		    stx.endClip();
		};

		STX.Studies.displayDarvas=function(stx, sd, quotes){
			var levelsColor=sd.outputs.Levels;
			if(!levelsColor || levelsColor=="auto" || STX.isTransparent(levelsColor)) levelsColor=stx.defaultColor;
			var darvasColor=sd.outputs.Darvas;
			if(!darvasColor || darvasColor=="auto" || STX.isTransparent(darvasColor)) darvasColor=stx.defaultColor;
			var ghostColor=sd.outputs.Ghost;
			if(!ghostColor || ghostColor=="auto" || STX.isTransparent(ghostColor)) ghostColor=stx.defaultColor;
			
			var panel = stx.panels[sd.panel];
			var i,q;
			var slyh1, slyl1;
			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			stx.startClip(sd.panel);
			if(sd.inputs["Stop Levels"]){
				if(stx.chart.context.setLineDash){
					stx.chart.context.setLineDash([2,2]);
				}
				stx.chart.context.lineWidth=2;
				stx.chart.context.strokeStyle=levelsColor;
				/*  Don't display the take profit levels
				stx.chart.context.beginPath();
				for(i=0;i<quotes.length;i++){
					q=quotes[i];
					q1=quotes[i-1];
					if(!q) continue;
					slyh1=q["Profit "+sd.name]?Math.floor(stx.pixelFromPriceTransform(q["Profit "+sd.name], panel)):null;
					var slyh0=q1 && q1["Profit "+sd.name]?Math.floor(stx.pixelFromPriceTransform(q1["Profit "+sd.name], panel)):null;
					if(slyh1){
						if(q.candleWidth) myWidth=Math.floor(Math.max(1,q.candleWidth));
						var slxh1=Math.floor(stx.pixelFromBar(i, panel.chart)+myWidth/2);
						var slxh0=Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2);
						if(slyh0) stx.chart.context.lineTo(slxh0,slyh1);
						else if(i===0) stx.chart.context.moveTo(stx.chart.left,slyh1);
						else stx.chart.context.moveTo(slxh0,slyh1);
						stx.chart.context.lineTo(slxh1,slyh1);
					}
				}
				stx.chart.context.stroke();
				*/
				stx.chart.context.beginPath();
				for(i=0;i<quotes.length;i++){
					q=quotes[i];
					q1=quotes[i-1];
					if(!q) continue;
					slyl1=q["Loss "+sd.name]?Math.floor(stx.pixelFromPriceTransform(q["Loss "+sd.name], panel)):null;
					var slyl0=q1 && q1["Loss "+sd.name]?Math.floor(stx.pixelFromPriceTransform(q1["Loss "+sd.name], panel)):null;
					if(slyl1){
						if(q.candleWidth) myWidth=Math.floor(Math.max(1,q.candleWidth));
						var slxl1=Math.floor(stx.pixelFromBar(i, panel.chart)+myWidth/2);
						var slxl0=Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2);
						if(slyl0 && slyl0>=slyl1) stx.chart.context.lineTo(slxl0,slyl1);
						else if(i===0) stx.chart.context.moveTo(stx.chart.left,slyl1);
						else stx.chart.context.moveTo(slxl0,slyl1);
						stx.chart.context.lineTo(slxl1,slyl1);
					}
				}
				stx.chart.context.stroke();
				if(stx.chart.context.setLineDash) {
					stx.chart.context.setLineDash([]);
				}
				stx.chart.context.lineWidth=1;
			}
			var dx=-10,dy,dw=0,dh,gx=-10,gy,gw=0,gh;
			var inDarvas=false, inGhost=false;
			var signalWidth=stx.chart.context.measureText("\u25B2").width/2;
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				if(quotes[i]["Spike "+sd.name]){
					stx.chart.context.fillStyle=darvasColor;
					stx.chart.context.textBaseline="bottom";
					var y=stx.pixelFromPriceTransform(quotes[i].High, stx.chart.panel);
					stx.chart.context.fillText("\u25BC", stx.pixelFromBar(i)-signalWidth, y-5); // down arrow
				}

				if(quotes[i].candleWidth) myWidth=Math.floor(Math.max(1,quotes[i].candleWidth));
				if(quotes[i]["Darvas "+sd.name]){
					q=quotes[i]["Darvas "+sd.name];
					if(q.State==1 && !inDarvas){
						dx=Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2);
						dy=Math.floor(stx.pixelFromPriceTransform(q.High, panel));
						dh=Math.floor(stx.pixelFromPriceTransform(q.Low, panel))-dy;
						inDarvas=true;
					}else if(q.State===0){
						dw=Math.floor(stx.pixelFromBar(i, panel.chart)+myWidth/2)-dx;
						dy=Math.floor(stx.pixelFromPriceTransform(q.High, panel));
						dh=Math.floor(stx.pixelFromPriceTransform(q.Low, panel))-dy;
						stx.chart.context.strokeStyle=darvasColor;
						stx.chart.context.fillStyle=darvasColor;
						if(!sd.inputs["Stop Levels"]) {
							stx.chart.context.strokeRect(dx,dy,dw,dh);
							stx.chart.context.globalAlpha=0.2;
						}else{
							stx.chart.context.globalAlpha=0.3;							
						}
						stx.chart.context.fillRect(dx,dy,dw,dh);
						stx.chart.context.globalAlpha=1;						
						inDarvas=false;
					}
				}
				if(quotes[i]["Ghost "+sd.name] && sd.inputs["Ghost Boxes"]){
					q=quotes[i]["Ghost "+sd.name];
					if(q.State==1 && !inGhost){
						gx=Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2);
						gy=Math.floor(stx.pixelFromPriceTransform(q.High, panel));
						gw=Math.floor((q.End-q.Start+1)*stx.layout.candleWidth+myWidth/2);
						gh=Math.floor(stx.pixelFromPriceTransform(q.Low, panel))-gy;
						inGhost=true;
					}else if(q.State===0){
						if(q.Start==q.End) gx=Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2);
						gw=Math.floor(stx.pixelFromBar(i, panel.chart)+myWidth/2)-gx;
						gy=Math.floor(stx.pixelFromPriceTransform(q.High, panel));
						gh=Math.floor(stx.pixelFromPriceTransform(q.Low, panel))-gy;
						stx.chart.context.strokeStyle=ghostColor;
						stx.chart.context.fillStyle=ghostColor;
						if(!sd.inputs["Stop Levels"]){
							stx.chart.context.strokeRect(gx,gy,gw,gh);
							stx.chart.context.globalAlpha=0.2;
						}else{
							stx.chart.context.globalAlpha=0.3;
						}
						stx.chart.context.fillRect(gx,gy,gw,gh);
						stx.chart.context.globalAlpha=1;
						inGhost=false;
					}
				}
			}
			if(inDarvas){
				dw=Math.floor(stx.pixelFromBar(i, panel.chart)+myWidth/2)-dx;
				stx.chart.context.strokeStyle=darvasColor;
				stx.chart.context.fillStyle=darvasColor;
				if(!sd.inputs["Stop Levels"]){
					stx.chart.context.beginPath();
					stx.chart.context.moveTo(dx+2*dw,dy);
					stx.chart.context.lineTo(dx,dy);
					stx.chart.context.lineTo(dx,dy+dh);
					stx.chart.context.lineTo(dx+2*dw,dy+dh);
					stx.chart.context.stroke();
					stx.chart.context.globalAlpha=0.2;
				}else{
					stx.chart.context.globalAlpha=0.3;
				}
				stx.chart.context.fillRect(dx,dy,2*dw,dh);
				stx.chart.context.globalAlpha=1;
			}
			if(inGhost){
				stx.chart.context.strokeStyle=ghostColor;
				stx.chart.context.fillStyle=ghostColor;
				if(!sd.inputs["Stop Levels"]){
					stx.chart.context.strokeRect(gx,gy,gw,gh);
					stx.chart.context.globalAlpha=0.2;
				}else{
					stx.chart.context.globalAlpha=0.3;
				}
				stx.chart.context.fillRect(gx,gy,gw,gh);
				stx.chart.context.globalAlpha=1;
			}
			if(inDarvas || inGhost){					
				if(sd.inputs["Stop Levels"]){
					if(stx.chart.context.setLineDash){
						stx.chart.context.setLineDash([2,2]);
					}
					stx.chart.context.lineWidth=2;
					stx.chart.context.strokeStyle=levelsColor;
					var x=Math.floor(stx.pixelFromBar(i-1, panel.chart)+myWidth/2);
					if(slyh1){
						stx.chart.context.beginPath();
						stx.chart.context.moveTo(x,slyh1);
						stx.chart.context.lineTo(inDarvas?dx+2*dw:gx+gw,slyh1);
						stx.chart.context.stroke();
					}
					if(slyl1){
						stx.chart.context.beginPath();
						stx.chart.context.moveTo(x,slyl1);
						stx.chart.context.lineTo(inDarvas?dx+2*dw:gx+gw,slyl1);
						stx.chart.context.stroke();
					}
					if(stx.chart.context.setLineDash) {
						stx.chart.context.setLineDash([]);
					}
					stx.chart.context.lineWidth=1;
				}
				inDarvas=false;
				inGhost=false;
			}
			stx.endClip();
		};

		STX.Studies.displaySupertrend=function(stx, sd, quotes){
			var panel=stx.panels[sd.panel];
			function colorFunction(stx, quote, mode){
				if(quote["Direction "+sd.name]<0) return sd.outputs.Downtrend;
				else return sd.outputs.Uptrend;
			}
			var params={skipProjections:true, label:stx.preferences.labels};
		    var context=stx.chart.context;
		    context.strokeStyle=colorFunction(stx,quotes[quotes.length-1]);
			context.lineWidth=2;
			if(sd.highlight) context.lineWidth=3;
			stx.plotLineChart(panel, quotes, "Trend "+sd.name, params, colorFunction);
			context.lineWidth=1;
			
			stx.startClip(sd.panel);
			var signalWidth=stx.chart.context.measureText("\u25B2").width/2;
			for(i=0;i<quotes.length;i++){
				if(!quotes[i] || !quotes[i-1]) continue;
				if(quotes[i-1]["Direction "+sd.name]>quotes[i]["Direction "+sd.name]){
					stx.chart.context.fillStyle=sd.outputs.Downtrend;
					stx.chart.context.textBaseline="bottom";
					var yh=stx.pixelFromPriceTransform(quotes[i].High, stx.chart.panel);
					for(var d=5;d<=45;d+=10) stx.chart.context.fillText("\u25BC", stx.pixelFromBar(i)-signalWidth, yh-d); // down arrow
				}else if(quotes[i-1]["Direction "+sd.name]<quotes[i]["Direction "+sd.name]){
					stx.chart.context.fillStyle=sd.outputs.Uptrend;
					stx.chart.context.textBaseline="top";
					var yl=stx.pixelFromPriceTransform(quotes[i].Low, stx.chart.panel);
					for(var u=5;u<=45;u+=10) stx.chart.context.fillText("\u25B2", stx.pixelFromBar(i)-signalWidth, yl+u); // up arrow
				}
			}
			stx.endClip();
		};

		STX.Studies.displayPriceRelative=function(stx, sd, quotes){
			if(!stx.panels[sd.panel].studyQuotes) {
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Price Relative Not Available"));
				return;
			}
			for(var c=quotes.length-1;c>=0;c--){
				if(quotes[c] && quotes[c][sd.inputs["Comparison Symbol"]]){
					STX.Studies.displaySeriesAsLine(stx, sd, quotes);
					return;
				}
			}
		};

		STX.Studies.displayMFI=function(stx, sd, quotes){
			var panel = stx.panels[sd.panel];	
			panel.yAxis.min=0;
			//STX.Studies.determineMinMax(stx, sd, quotes);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=panel.yAxis.bottom;

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			var green=sd.outputs.Green;
			var fade=sd.outputs.Fade;
			var fake=sd.outputs.Fake;
			var squat=sd.outputs.Squat;
			stx.canvasColor("stx_histogram");
			stx.chart.context.globalAlpha=1;
			stx.chart.context.fillStyle="#CCCCCC";
			stx.startClip(sd.panel);
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote || !quotes[i-1]) continue;
				if(i===0);
				else if(quotes[i-1][sd.name+"_hist"]<quote[sd.name+"_hist"]){
					if(quotes[i-1].Volume<quote.Volume) stx.chart.context.fillStyle=green;
					else if(quotes[i-1].Volume>quote.Volume) stx.chart.context.fillStyle=fake;
				}
				else if(quotes[i-1][sd.name+"_hist"]>quote[sd.name+"_hist"]){
					if(quotes[i-1].Volume<quote.Volume) stx.chart.context.fillStyle=squat;
					else if(quotes[i-1].Volume>quote.Volume) stx.chart.context.fillStyle=fade;
				}
				if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
				stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2),
						Math.floor(y), 
						Math.floor(myWidth),
						Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
			stx.endClip();
		};

		STX.Studies.displayAwesomeOscillator=function(stx, sd, quotes){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.panel];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			var upColor=sd.outputs["Increasing Bar"];
			var downColor=sd.outputs["Decreasing Bar"];
			stx.canvasColor("stx_histogram");
			stx.chart.context.globalAlpha=1;
			stx.chart.context.fillStyle="#CCCCCC";
			stx.startClip(sd.panel);
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote || !quotes[i-1]) continue;
				if(i===0);
				else if(quotes[i-1][sd.name+"_hist"]<quote[sd.name+"_hist"]) stx.chart.context.fillStyle=upColor;
				else if(quotes[i-1][sd.name+"_hist"]>quote[sd.name+"_hist"]) stx.chart.context.fillStyle=downColor;
				if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
				stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2),
						Math.floor(y), 
						Math.floor(myWidth),
						Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
			stx.endClip();
		};

		STX.Studies.displayGator=function(stx, sd, quotes){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.panel];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			var upColor=sd.outputs["Increasing Bar"];
			var downColor=sd.outputs["Decreasing Bar"];
			stx.canvasColor("stx_histogram");
			stx.chart.context.globalAlpha=1;
			stx.chart.context.fillStyle="#CCCCCC";
			stx.startClip(sd.panel);
			for(var i=1;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote || !quotes[i-1]) continue;
				for(var j=1;j<=2;j++){
					if(Math.abs(quotes[i-1][sd.name+"_hist"+j])<Math.abs(quote[sd.name+"_hist"+j])) stx.chart.context.fillStyle=upColor;
					else if(Math.abs(quotes[i-1][sd.name+"_hist"+j])>Math.abs(quote[sd.name+"_hist"+j])) stx.chart.context.fillStyle=downColor;
					if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
					stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2),
							Math.floor(y), 
							Math.floor(myWidth),
							Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"+j], panel)-y));
				}
			}
			stx.endClip();
		};

		STX.Studies.displayElderImpulse=function(stx, sd, quotes){
			stx.chart.customChart={
				chartType: "colored_bar",
				colorFunction: function(stx, quote, mode){
					return quote["Result "+sd.name];
				}
			};
		};

		STX.Studies.displayPivotPoints=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
			if(sd.inputs.Shading) {
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Resistance 3 " + sd.name, bottomBand:"Resistance 2 " + sd.name,color:sd.outputs["Resistance 3"]}));
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Resistance 2 " + sd.name, bottomBand:"Resistance 1 " + sd.name,color:sd.outputs["Resistance 2"]}));
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Resistance 1 " + sd.name, bottomBand:"Pivot " + sd.name,color:sd.outputs["Resistance 1"]}));
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Support 1 " + sd.name, bottomBand:"Pivot " + sd.name,color:sd.outputs["Support 1"]}));
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Support 2 " + sd.name, bottomBand:"Support 1 " + sd.name,color:sd.outputs["Support 2"]}));
				STX.Studies.prepareChannelFill(stx,quotes,STX.extend(sd.libraryEntry.parameters,{panelName: sd.panel, topBand:"Support 3 " + sd.name, bottomBand:"Support 2 " + sd.name,color:sd.outputs["Support 3"]}));
			}
		};

		STX.Studies.displayAlligator=function(stx, sd, quotes){
			function drawFractal(highLow,index){
				//stx.canvasFont("???");
				var y;
				if(highLow=="high") {
					stx.chart.context.fillStyle=stx.defaultColor;
					stx.chart.context.textBaseline="bottom";
					y=stx.pixelFromPriceTransform(quotes[index].High, stx.chart.panel);
					stx.chart.context.fillText("\u25B2", stx.pixelFromBar(i,stx.chart)-stx.chart.context.measureText("\u25B2").width/2+1, y-5); // up arrow
				}else if (highLow=="low") {
					stx.chart.context.fillStyle=stx.defaultColor;
					stx.chart.context.textBaseline="top";
					y=stx.pixelFromPriceTransform(quotes[index].Low, stx.chart.panel);
					stx.chart.context.fillText("\u25BC",stx.pixelFromBar(i,stx.chart)-stx.chart.context.measureText("\u25BC").width/2+1, y+5); // down arrow
				}
			}
			var panel = stx.panels[sd.panel];
			stx.startClip(sd.panel);
			STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, "Jaw "+sd.name, quotes);
			STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, "Lips "+sd.name, quotes);
			STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, "Teeth "+sd.name, quotes);
			if(sd.inputs["Show Fractals"]){
				for(var i=2;i<quotes.length-2;i++){
					if(quotes[i]["Fractal High "+sd.name]) drawFractal("high",i);
					if(quotes[i]["Fractal Low "+sd.name]) drawFractal("low",i);
				}
			}
			stx.endClip();
		};

		STX.Studies.displayRainbowMA=function(stx, sd, quotes){
			var panel = stx.panels[sd.panel];
			stx.startClip(sd.panel);
			//just need to display in reverse order from outputMap
			for(var i=10;i>0;i--){
				STX.Studies.displayIndividualSeriesAsLine(stx, sd, panel, "SMA"+i+" "+sd.name, quotes);
			}
			stx.endClip();
		};

		STX.Studies.displayRainbowOsc=function(stx, sd, quotes){
			//STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.panel];
			panel.min=-100;
			panel.max=100;
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			stx.startClip(sd.panel);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);
			stx.chart.context.strokeStyle="transparent";
			stx.plotLineChart(panel, quotes, "Zero "+sd.name, {skipTransform:true, label:false});

			var upColor=sd.outputs["Positive Bar"];
			stx.chart.context.strokeStyle=upColor;
			stx.plotLineChart(panel, quotes, "Over "+sd.name, {skipTransform:true, label:false});

			var upgradient=stx.chart.context.createLinearGradient(0,y,0,panel.yAxis.top);
			upgradient.addColorStop(0, stx.containerColor);
			upgradient.addColorStop(1, upColor);
			STX.Studies.prepareChannelFill(stx,quotes,{"color":upgradient,"opacity":1,"panelName":sd.name,"topBand":"Over "+sd.name,"bottomBand":"Zero "+sd.name});

			var downColor=sd.outputs["Negative Bar"];
			stx.chart.context.strokeStyle=downColor;
		    stx.plotLineChart(panel, quotes, "Under "+sd.name, {skipTransform:true, label:false});

		    var dngradient=stx.chart.context.createLinearGradient(0,y,0,panel.yAxis.bottom);
			dngradient.addColorStop(0, stx.containerColor);
			dngradient.addColorStop(1, downColor);
			STX.Studies.prepareChannelFill(stx,quotes,{"color":dngradient,"opacity":1,"panelName":sd.name,"topBand":"Zero "+sd.name,"bottomBand":"Under "+sd.name});

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			stx.canvasColor("stx_histogram");
		    stx.chart.context.globalAlpha=1;
			stx.chart.context.fillStyle="#CCCCCC";
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				if(quote[sd.name+"_hist"]>0) stx.chart.context.fillStyle=upColor;
				else if(quote[sd.name+"_hist"]<0) stx.chart.context.fillStyle=downColor;
				if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
				stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2),
						Math.floor(y), 
						Math.floor(myWidth),
						Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
			stx.endClip();
		};

		/**
		 * Creates a volume profile underlay for the chart. The underlay is always 25% of the width of the chart.
		 * The color and opacity of the underlay can be controlled with the class stx_volume_profile
		 */

		STX.Studies.displayVolumeProfile=function(stx, sd, quotes){
			if(!stx || !stx.chart.dataSet) return;

			var chart = stx.chart;
				  							
			//decide how many bars
			if(!sd.study.parameters.numberOfBars) sd.study.parameters.numberOfBars = 30;
			var interval = (chart.highValue-chart.lowValue)/sd.study.parameters.numberOfBars;
			if(interval===0) return;
			var priceVolArry = [];	
			
			// set the boundries for the bars -- add .1 to the loop to account for possible roundig errors.
			for(var j=chart.lowValue;j<chart.highValue+0.1;j+=interval){
				priceVolArry.push([j, 0]);
			}
			
			if (priceVolArry.length <2) {	// need at least 2 price data points to draw boxes
				stx.watermark("chart","center","top",stx.translateIf("Not enough data to render the Volume Profile"));
				return;
			}
		
			var volumeMax=0; 	// this is the maximum volume after we group them by the bars we will draw
			for(var i=0;i<quotes.length;i++){
				var prices=quotes[i];
				if(!prices) continue;
				var bottomRange = priceVolArry[0][0];
				var topRange = 0;
				for(var x=1;x<priceVolArry.length;x++){
					topRange= priceVolArry[x][0];
					if( 
						(prices.Low >= bottomRange && prices.Low <= topRange) ||
						(prices.Low < bottomRange && prices.High > topRange) ||
						(prices.High >= bottomRange && prices.High <= topRange)
					){
						priceVolArry[x][1]+=prices.Volume;
						if(priceVolArry[x][1]>volumeMax) volumeMax=priceVolArry[x][1];
					}
					bottomRange = topRange;
				}
			}
			if(volumeMax===0){
				stx.watermark("chart","center","top",stx.translateIf("Not enough data to render the Volume Profile"));
				return;
			}
			
			
			stx.setStyle("stx_volume_profile","color",sd.outputs["Bars Color"]);
			var context=chart.context;
			var fontstyle="stx-float-date";
			stx.canvasFont(fontstyle, context);
			var txtHeight=stx.getCanvasFontSize(fontstyle);
			var panel = chart.panel;
			var chartBottom = panel.yAxis.bottom;
			var barBottom=Math.round(chart.width)-0.5;  //bottom x coordinate for the bar  -- remember bars are sideways so the bottom is on the x axis
			var bartop=0; // x axis location for the top of the bar
			var barMaxHeight=(chart.width)*sd.study.parameters.widthPercentage;  // pixels for highest bar
			var borderColor=stx.canvasStyle("stx_volume_profile").borderColor;
			var bordersOn=(!STX.isTransparent(stx.canvasStyle("stx_volume_profile").borderColor)) && sd.study.parameters.displayBorder; 

			var self=stx;

			function drawBars(volumeProfileClass, borders){
				if(!borders) barBottom-=2;
			    self.canvasColor(volumeProfileClass);
			    if(STX.isIE8) context.globalAlpha=0.5;
				context.beginPath();
				var bottomRange = priceVolArry[0][0];
				var prevTop=barBottom;
				for(var i=1;i<priceVolArry.length;i++){	
					if (priceVolArry[i][1]) {				
						barTop =Math.round(barBottom-(priceVolArry[i][1]*barMaxHeight/volumeMax))-0.5;
						bottomRangePixel=Math.round(self.pixelFromPrice(bottomRange, panel))+0.5;
						topRangePixel = Math.round(self.pixelFromPrice(priceVolArry[i][0], panel))+0.5;

						if(!borders){
							bottomRangePixel-=0.5;
							topRangePixel+=0.5;
							barTop+=0.5;
						}
						
						if ( bottomRangePixel > chartBottom ) bottomRangePixel=chartBottom;
						if ( topRangePixel < chartBottom ) {
							context.moveTo(barBottom, bottomRangePixel);
							context.lineTo(barBottom, topRangePixel);
							context.lineTo(barTop, topRangePixel);
							context.lineTo(barTop,bottomRangePixel);
							if(borders){
								if(prevTop>barTop || i==1) context.lineTo(prevTop, bottomRangePixel); // draw down to the top of the previous bar, so that we don't overlap strokes
							}else{
								context.lineTo(barBottom,bottomRangePixel);
								if ( sd.study.parameters.displayVolume ) {
									//write the volume on the bar **/
									var txt = STX.condenseInt(priceVolArry[i][1]);
									var barHeight= bottomRangePixel-topRangePixel;
									if( txtHeight <= barHeight-2) {
										var width;
										try{
											width=context.measureText(txt).width;
										}catch(e){ width=0;} // Firefox doesn't like this in hidden iframe
										context.textBaseline="top";
										var tmpcolor = context.fillStyle;
										context.fillStyle=borderColor;
										context.fillText(txt, barTop-width-3,topRangePixel+(barHeight/2-txtHeight/2));
										context.fillStyle=tmpcolor;
									}
								}
							}
						}
						prevTop=barTop;
					} else {
						prevTop=barBottom; // there will be a missing bar here so the border needs to once again go to the end
					}
					bottomRange = priceVolArry[i][0];
				}
				if(!borders) context.fill();
				context.strokeStyle = borderColor;
				if(borders) context.stroke();
				context.closePath();
			}
		    
		    drawBars("stx_volume_profile", false);
		    if(bordersOn){
			    drawBars("stx_volume_profile", true);
			}

			context.globalAlpha=1;
		};

		STX.Studies.studyLibrary=STX.extend(STX.Studies.studyLibrary,{
			"correl": {
				"name": "Correlation Coefficient",
				"range": "-1 to 1",
				"calculateFN":  STX.Studies.calculateCorrelationCoefficient,
				"edit": null
			},
			"PMO": {
				"name": "Price Momentum Oscillator",
				"calculateFN": STX.Studies.calculatePMO,
				"inputs": {"Field":"field","Smoothing Period":35,"Double Smoothing Period":20,"Signal Period":10},
				"outputs": {"PMO":"auto","PMOSignal":"#FF0000"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:2.5, studyOverBoughtColor:"auto", studyOverSoldValue:-2.5, studyOverSoldColor:"auto"}
				}
			},
			"Rel Vol": {
				"name": "Relative Volatility",
				"range": "0 to 100",
				"calculateFN": STX.Studies.calculateRelativeVolatility,
				"inputs": {"Field":"field", "STD Period":10, "Smoothing Period":14},
				"outputs":{"Rel Vol":"auto"},
				"centerline": 50,
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:70, studyOverBoughtColor:"auto", studyOverSoldValue:30, studyOverSoldColor:"auto"}
				}
			},
			"Awesome": {
				"name": "Awesome Oscillator",
				"seriesFN": STX.Studies.displayAwesomeOscillator,
				"calculateFN": STX.Studies.calculateAwesomeOscillator,
				"inputs": {},
				"outputs": {"Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"}
			},
			"W MFI": {
				"name": "Market Facilitation Index",
				"seriesFN": STX.Studies.displayMFI,
				"calculateFN": STX.Studies.calculateMFI,
				"yAxis": {"ground":true},
				"range": "0 to max",
				"inputs": {},
				"outputs": {"Green":"#8bc176", "Fade":"#ab611f", "Fake":"#5f7cb8", "Squat":"#ffd0cf"}
			},
			"ATR Bands": {
				"name": "ATR Bands",
				"overlay": true,
				"seriesFN": STX.Studies.displayChannel,
				"calculateFN": STX.Studies.calculateATRBands,
				"inputs": {"Period":5, "Shift": 3, "Field":"field", "Channel Fill":true},
				"outputs": {"ATR Bands Top":"auto", "ATR Bands Bottom":"auto", "ATR Bands Channel":"auto"}
			},
			"STARC Bands": {
				"name": "STARC Bands",
				"overlay": true,
				"seriesFN": STX.Studies.displayChannel,
				"calculateFN": STX.Studies.calculateSTARCBands,
				"inputs": {"Period":15, "MA Period":5, "Multiplier": 1.33, "Channel Fill":true},
				"outputs": {"STARC Bands Top":"auto", "STARC Bands Median":"auto", "STARC Bands Bottom":"auto"}
			},
			"ATR Trailing Stop": {
				"name": "ATR Trailing Stops",
				"overlay": true,
				"seriesFN": STX.Studies.displayPSAR2,
				"calculateFN": STX.Studies.calculateATRStops,
				"inputs": {"Multiplier":3, "Period":21, "Plot Type":["points","squarewave"], "HighLow":false},
				"outputs": {"Buy Stops":"#FF0000", "Sell Stops":"#00FF00"}
			},
			"Boll %b": {
				"name": "Bollinger %b",
				"calculateFN": STX.Studies.calculateBollinger,
				"inputs": {"Field":"field", "Period":20, "Standard Deviations": 2, "Moving Average Type":"ma"},
				"outputs": {"%b":"auto"}
			},
			"Boll BW": {
				"name": "Bollinger Bandwidth",
				"calculateFN": STX.Studies.calculateBollinger,
				"inputs": {"Field":"field", "Period":20, "Standard Deviations": 2, "Moving Average Type":"ma"},
				"outputs": {"Bandwidth":"auto"}
			},
			"Donchian Width": {
				"name": "",
				"calculateFN": STX.Studies.calculateMaxHighMinLow,
				"inputs": {"High Period":20, "Low Period":20},
			},
			"Rel Vig": {
				"name": "Relative Vigor Index",
				"seriesFN": STX.Studies.displayHistogramWithSeries,
				"calculateFN": STX.Studies.calculateRelativeVigor,
				"inputs": {"Period":10},
				"outputs": {"Rel Vig":"auto", "RelVigSignal":"#FF0000", "Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"}
			},
			"Elder Impulse": {
				"name": "Elder Impulse System",
				"calculateFN": STX.Studies.calculateElderImpulse,
				"seriesFN": STX.Studies.displayElderImpulse,
				"customRemoval": true,
				"underlay": true,
				"inputs": {},
				"outputs": {"Bullish":"#8BC176", "Bearish":"#DD3E39", "Neutral":"#5F7CB8"},
				"removeFN": function(stx, sd){
					stx.chart.customChart=null;
				}
			},
			"Pivot Points": {
				"name": "Pivot Points",
				"overlay": true,
				"seriesFN": STX.Studies.displayPivotPoints,
				"calculateFN": STX.Studies.calculatePivotPoints,
				"inputs": {"Type":["standard","fibonacci"],"Shading":false},
				"outputs":{"Pivot":"auto","Resistance 1":"rgb(184,44,11)","Support 1":"rgb(105,145,88)","Resistance 2":"rgb(227,100,96)","Support 2":"rgb(179,217,135)","Resistance 3":"rgb(255,208,207)","Support 3":"rgb(211,232,174)"},
				"parameters": {
					noSlopes: true,
					opacity: 0.2
				}
			},
			"Alligator": {
				"name": "Alligator",
			    "overlay": true,
				"seriesFN": STX.Studies.displayAlligator,
				"calculateFN": STX.Studies.calculateAlligator,
				"inputs":{"Jaw Period":13, "Jaw Offset":8, "Teeth Period":8, "Teeth Offset":5, "Lips Period":5, "Lips Offset":3, "Show Fractals":false},
				"outputs":{"Jaw":"#0000FF", "Teeth":"#FF0000", "Lips":"#00DD00"}

			},
			"Gator": {
				"name": "Gator Oscillator",
				"seriesFN": STX.Studies.displayGator,
				"calculateFN": STX.Studies.calculateAlligator,
				"inputs":{"Jaw Period":13, "Jaw Offset":8, "Teeth Period":8, "Teeth Offset":5, "Lips Period":5, "Lips Offset":3},
				"outputs": {"Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"},
				"centerline": 0
			},
			"Ichimoku Clouds": {
				"name": "Ichimoku Clouds",
			    "overlay": true,
			    "range": "bypass",
			    "calculateFN": STX.Studies.calculateIchimoku,
			    "seriesFN": STX.Studies.displayIchimoku,
			    "inputs": {"Conversion Line Period":9, "Base Line Period": 26, "Leading Span B Period":52, "Lagging Span Period":26},
			    "outputs": {"Conversion Line":"#0000FF", "Base Line":"#FF0000", "Leading Span A":"#00FF00", "Leading Span B":"#FF0000", "Lagging Span":"#808000"}
			},
			"P Rel": {
				"name": "Price Relative",
			    "seriesFN": STX.Studies.displayPriceRelative,
			    "calculateFN": STX.Studies.calculatePriceRelative,
			    "inputs": {"Comparison Symbol":"SPY"}
			},
			"Ulcer": {
				"name": "Ulcer Index",
			    "calculateFN": STX.Studies.calculateUlcerIndex,
			    "inputs": {"Field":"field", "Period":14}
			},
			"Choppiness": {
				"name": "Choppiness Index",
			    "calculateFN": STX.Studies.calculateChoppiness,
			    "centerline": 50,
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:61.8, studyOverBoughtColor:"auto", studyOverSoldValue:38.2, studyOverSoldColor:"auto"}
				}
			},
			"Disparity": {
				"name": "Disparity Index",
			    "calculateFN": STX.Studies.calculateDisparity,
			    "inputs": {"Field":"field", "Period":14, "Moving Average Type":"ma"}
			},
			"Rainbow MA": {
				"name": "Rainbow Moving Average",
				"overlay": true,
			    "calculateFN": STX.Studies.calculateRainbow,
			    "seriesFN": STX.Studies.displayRainbowMA,
			    "inputs": {"Field":"field", "Period":2, "Underlay": false},
				"outputs": {"SMA1":"#FF0000", "SMA2":"#FF7F00", "SMA3":"#FFFF00", "SMA4":"#7FFF00", "SMA5":"#00FF7F", "SMA6":"#00FFFF", "SMA7":"#007FFF", "SMA8":"#0000FF", "SMA9":"#7F00FF", "SMA10":"#FF00FF"}
			},
			"Rainbow Osc": {
				"name": "Rainbow Oscillator",
			    "calculateFN": STX.Studies.calculateRainbow,
			    "seriesFN": STX.Studies.displayRainbowOsc,
			    "inputs": {"Field":"field", "Period":2, "HHV/LLV Lookback":10},
				"outputs": {"Positive Bar":"#00DD00", "Negative Bar":"#FF0000"}
			},
			"Pring KST": {
				"name": "Pring's Know Sure Thing",
			    "calculateFN": STX.Studies.calculateKST,
			    "inputs": {"Field":"field", "Lightest Rate of Change Period":10, "Lightest SMA Period":10, "Light Rate of Change Period":15, "Light SMA Period":10, "Heavy Rate of Change Period":20, "Heavy SMA Period":10, "Heaviest Rate of Change Period":30, "Heaviest SMA Period":15, "Signal Period":9},
				"outputs": {"KST":"#00DD00", "KSTSignal":"#FF0000"}
			},
			"Pring Sp-K": {
				"name": "Pring's Special K",
			    "calculateFN": STX.Studies.calculateSpecialK,
			    "inputs": {"Field":"field", "Interval":["daily","weekly"]}
			},
			"Darvas": {
				"name": "Darvas Box",
				"underlay": true,
				"calculateFN": STX.Studies.calculateDarvas,
				"seriesFN": STX.Studies.displayDarvas,
				"inputs": {"All-Time High Lookback Period":100, "Exit Field":["close","high/low"], "Ghost Boxes":true, "Stop Levels": false, "Level Offset":0.01, "Price Minimum": 5, "Volume Spike":false, "Volume % of Avg":400},
				"outputs": {"Darvas":"#5F7CB8", "Ghost":"#699158", "Levels":"auto"},
				"customRemoval": true
			},
			"Supertrend": {
				"name": "Supertrend",
				"overlay": true,
				"seriesFN": STX.Studies.displaySupertrend,
				"calculateFN": STX.Studies.calculateSupertrend,
				"inputs": {"Period":7, "Multiplier": 3},
				"outputs": {"Uptrend":"#8cc176", "Downtrend":"#b82c0c"}
			},
			"vol profile": {
				"name": "Volume Profile",
				"overlay": true,
			    "seriesFN": STX.Studies.displayVolumeProfile,
			    "calculateFN": null,
			    "inputs": {},
			    "outputs": {"Bars Color":"#b64a96"},
				"customRemoval": true,
			    "parameters": {
			    	"displayBorder": true,  
			    	"displayVolume" : false, 
			    	"numberOfBars" : 30,
			    	"widthPercentage": 0.25
				}
			}
		});
		
		
		/**
		 * Channel drawing tool. Creates a channel within 2 parallel line segments.
		 * 
		 * It inherits its properties from {@link STX.Drawing.segment}.
		 * @constructor
		 * @name  STX.Drawing.channel
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.channel=function(){
			this.name="channel";
			this.dragToDraw=false;
			this.p2=null;
		};
		
		STX.Drawing.channel.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.channel.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
		};

		STX.Drawing.channel.prototype.move=function(context, tick, value){
			if(!this.penDown) return;
			
			this.copyConfig();
			if(this.p2===null) this.p1=[tick,value];
			else{
				var y=value-((this.p1[1]-this.p0[1])/(this.p1[0]-this.p0[0]))*(tick-this.p1[0]);
				this.p2=[this.p1[0], y];
			}
			this.render(context);
		};

		STX.Drawing.channel.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.setPoint(0, tick, value, panel.chart);
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) {
				this.stx.undo();//abort
				return true;
			}

			if(this.p2!==null){
				this.setPoint(2, this.p2[0], this.p2[1], panel.chart);
				return true;
			}
			this.setPoint(1, tick, value, panel.chart);
			this.p2=[this.p1[0],this.p1[1]];
			return false;
		};
		
		STX.Drawing.channel.prototype.boxIntersection=function(tick, value){
			if(!this.p0 || !this.p1 || !this.p2) return false;		
			if(tick>Math.max(this.p0[0], this.p1[0]) || tick<Math.min(this.p0[0], this.p1[0])) return false;

			// http://stackoverflow.com/questions/1560492/how-to-tell-whether-a-point-is-to-the-right-or-left-side-of-a-line
			var s1 = ( (this.p1[0]-this.p0[0])*(value-this.p0[1]) - (this.p1[1]-this.p0[1])*(tick-this.p0[0]) );
			var s2 = ( (this.p2[0]-this.p0[0])*(value-(this.p0[1]+this.p2[1]-this.p1[1])) - (this.p1[1]-this.p0[1])*(tick-this.p0[0]) );
			return (s1*s2<0);
		};

		STX.Drawing.channel.prototype.intersected=function(tick, value, box){
			this.whichPoint=null;
			if(!this.p0 || !this.p1 || !this.p2) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.pointIntersection(this.p0[0], this.p0[1], box)){
				this.whichPoint="p0";
				this.highlighted="p0";
				return {
					action: "drag",
					point: "p0"
				};
			}else if(this.pointIntersection(this.p1[0], this.p1[1], box)){
				this.highlighted="p1";
				this.whichPoint="p1";
				return {
					action: "drag",
					point: "p1"
				};
			}else if(this.pointIntersection(this.p2[0], this.p2[1], box)){
				this.highlighted="p2";
				this.whichPoint="p2";
				return {
					action: "drag",
					point: "p2"
				};
			}
			if(this.boxIntersection(tick, value)){
				this.highlighted=true;
				// This object will be used for repositioning
				return {
					action: "move",
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1),
					p2: STX.clone(this.p2),
					tick: tick, // save original tick
					value: value // save original value
				};
			}else{
				return null;
			}
		};

		STX.Drawing.channel.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
			var y=null;
			if(this.p2) {
				y=this.stx.pixelFromValueAdjusted(panel, this.p2[0], this.p2[1]);
			}
		
			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			var width=this.lineWidth;
			if(this.highlighted){
				color=this.stx.getCanvasColor("stx_highlight_vector");
			}

			var fillColor=this.fillColor;
			if(this.p2 && fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
				context.beginPath();
				context.moveTo(x0,y0);
				context.lineTo(x1,y1);
				context.lineTo(x1,y);
				context.lineTo(x0,y0+(y-y1));
				context.closePath();
				context.globalAlpha=0.2;
				context.fillStyle=fillColor;
				context.fill();
				context.globalAlpha=1;
			}

			var parameters={
					pattern: this.pattern,
					lineWidth: width
			};
			this.stx.plotLine(x0, x1, y0, y1, color, "segment", context, panel, parameters);
			if(this.p2) this.stx.plotLine(x0, x1, y0+(y-y1), y, color, "segment", context, panel, parameters);
		
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				var p2Fill=this.whichPoint=="p2"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
				this.littleCircle(context, x1, y, p2Fill);
			}		
		};

		STX.Drawing.channel.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			var tickDiff=repositioner.tick-tick;
			var valueDiff=repositioner.value-value;
			if(repositioner.action=="move"){
				this.setPoint(0, repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff, panel.chart);
				this.setPoint(1, repositioner.p1[0]-tickDiff, repositioner.p1[1]-valueDiff, panel.chart);
				this.setPoint(2, repositioner.p2[0]-tickDiff, repositioner.p2[1]-valueDiff, panel.chart);
				this.render(context);
			}else if(repositioner.action=="drag"){
				this[repositioner.point]=[tick, value];
				this.setPoint(0, this.p0[0], this.p0[1], panel.chart);
				this.setPoint(1, this.p1[0], this.p1[1], panel.chart);
				this.setPoint(2, this.p2[0], this.p2[1], panel.chart);
				this.render(context);
			}
		};

		STX.Drawing.channel.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);		
			this.setPoint(1, this.d1, this.v1, panel.chart);
			this.setPoint(2, this.d1, this.v2, panel.chart);  //not an error, should be d1 here
		};

		/**
		 * Reconstruct a channel
		 * @memberOf  STX.Drawing.channel
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.v2] Value (price) for the second point of the opposing parallel channel line
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 */
		STX.Drawing.channel.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.fillColor=obj.fc;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			this.v0=obj.v0;
			this.v1=obj.v1;
			this.v2=obj.v2;
			this.adjust();
		};
		
		STX.Drawing.channel.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				v0:this.v0,
				v1:this.v1,
				v2:this.v2
			};
		};

		/**
		 * Andrews' Pitchfork drawing tool. A Pitchfork is defined by three parallel rays.  The center ray is equidistant from the two outer rays.
		 * 
		 * It inherits its properties from {@link STX.Drawing.channel}.
		 * @constructor
		 * @name  STX.Drawing.pitchfork
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.pitchfork=function(){
			this.name="pitchfork";
			this.dragToDraw=false;
			this.p2=null;
		};
		
		STX.Drawing.pitchfork.stxInheritsFrom(STX.Drawing.channel);
		
		STX.Drawing.pitchfork.prototype.move=function(context, tick, value){
			if(!this.penDown) return;
			
			this.copyConfig();
			if(this.p2===null) this.p1=[tick,value];
			else this.p2=[tick,value];
			this.render(context);
		};

		STX.Drawing.pitchfork.prototype.lineIntersection=function(tick, value, box, type){
			if(!this.p0 || !this.p1) return false;
			if(this.stx.layout.semiLog || this.stx.layout.chartScale=="log"){
				return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), (this.p1[0]+this.p2[0])/2, STX.log10((this.p1[1]+this.p2[1])/2), type);
			}else{
				return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], (this.p1[0]+this.p2[0])/2, (this.p1[1]+this.p2[1])/2, type);
			}
		};
		
		STX.Drawing.pitchfork.prototype.intersected=function(tick, value, box){
			this.whichPoint=null;
			if(!this.p0 || !this.p1 || !this.p2) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.pointIntersection(this.p0[0], this.p0[1], box)){
				this.whichPoint="p0";
				this.highlighted="p0";
				return {
					action: "drag",
					point: "p0"
				};
			}else if(this.pointIntersection(this.p1[0], this.p1[1], box)){
				this.highlighted="p1";
				this.whichPoint="p1";
				return {
					action: "drag",
					point: "p1"
				};
			}else if(this.pointIntersection(this.p2[0], this.p2[1], box)){
				this.highlighted="p2";
				this.whichPoint="p2";
				return {
					action: "drag",
					point: "p2"
				};
			}
			var isIntersected=this.lineIntersection(tick, value, box, "ray");
			if(isIntersected){
				this.highlighted=true;
				// This object will be used for repositioning
				return {
					action: "move",
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1),
					p2: STX.clone(this.p2),
					tick: tick, // save original tick
					value: value // save original value
				};
			}else{
				return null;
			}
		};

		STX.Drawing.pitchfork.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var p2=this.p2;
			if(!p2) p2=this.p1;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var x2=this.stx.pixelFromTick(p2[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
			var y2=this.stx.pixelFromValueAdjusted(panel, p2[0], p2[1]);
		
			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			var width=this.lineWidth;
			if(this.highlighted){
				color=this.stx.getCanvasColor("stx_highlight_vector");
			}
		
			var parameters={
					pattern: this.pattern,
					lineWidth: width
			};
			var yp=x0*(2*y0-y1-y2)/(2*x0-x1-x2);
			var z=1;
			if(x1+x2>2*x0) {
				yp*=-1;
				z=-1;
			}
			this.stx.plotLine(x0, (x1+x2)/2, y0, (y1+y2)/2, color, "ray", context, panel, parameters);
			this.stx.plotLine(x1, x2, y1, y2, color, "segment", context, panel, parameters);
			if(!(x1==x2 && y1==y2)){
			this.stx.plotLine(x1, x1-z*x0, y1, y1-yp, color, "ray", context, panel, parameters);
			this.stx.plotLine(x2, x2-z*x0, y2, y2-yp, color, "ray", context, panel, parameters);
			}
		
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				var p2Fill=this.whichPoint=="p2"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
				this.littleCircle(context, x2, y2, p2Fill);
			}
		
		};

		STX.Drawing.pitchfork.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);		
			this.setPoint(1, this.d1, this.v1, panel.chart);
			this.setPoint(2, this.d2, this.v2, panel.chart);
		};
		
		/**
		 * Reconstruct a pitchfork
		 * @memberOf  STX.Drawing.pitchfork
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.v2] Value (price) for the third point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.d2] Date (string form) for the third point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @param {number} [obj.tzo2] Offset of UTC from d2 in minutes
		 */
		STX.Drawing.pitchfork.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.d2=obj.d2;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			this.tzo2=obj.tzo2;
			this.v0=obj.v0;
			this.v1=obj.v1;
			this.v2=obj.v2;
			this.adjust();
		};
		
		STX.Drawing.pitchfork.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				d2:this.d2,
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				tzo2: this.tzo2,
				v0:this.v0,
				v1:this.v1,
				v2:this.v2
			};
		};

		
		/**
		 * Gartley drawing tool. Creates a series of four connected line segments, each one completed with a user click.
		 * Will adhere to Gartley requirements vis-a-vis fibonacci levels etc..
		 * 
		 * It inherits its properties from {@link STX.Drawing.continuous}.
		 * @constructor
		 * @name  STX.Drawing.gartley
		 * @version ChartIQ Advanced Package
		 * @since 04-2015-15
		 */
		STX.Drawing.gartley=function(){
			this.name="gartley";
			this.dragToDraw=false;
			this.maxSegments=4;
			this.shape=null;
			this.points=[];
		};
		
		STX.Drawing.gartley.stxInheritsFrom(STX.Drawing.continuous);

		STX.Drawing.gartley.prototype.check=function(first, second){
			if(!second) return true;
			if(first[0]>=second[0] || first[1]==second[1]) return false;
			if(this.segment==1){
				if(first[1]<second[1]) this.shape="M"; else this.shape="W";
			}else if(this.segment==2){
				if(this.shape=="M" && first[1]<second[1]) return false;
				else if(this.shape=="W" && first[1]>second[1]) return false;
				else if((second[1]-first[1])/(this.points[0][1]-first[1])<0.618) return false;
				else if((second[1]-first[1])/(this.points[0][1]-first[1])>=0.786) return false;
			}else if(this.segment==3){
				if(this.shape=="M" && first[1]>second[1]) return false;
				else if(this.shape=="W" && first[1]<second[1]) return false;
				else if((second[1]-first[1])/(this.points[1][1]-first[1])<0.618) return false;
				else if((second[1]-first[1])/(this.points[1][1]-first[1])>=0.786) return false;
			}else if(this.segment==4){
				if(this.shape=="M" && (first[1]<second[1] || second[1]<this.points[0][1])) return false;
				else if(this.shape=="W" && (first[1]>second[1] || second[1]>this.points[0][1])) return false;
				else if((this.points[1][1]-second[1])/(this.points[1][1]-this.points[2][1])<1.27) return false;
				else if((this.points[1][1]-second[1])/(this.points[1][1]-this.points[2][1])>=1.618) return false;
			}
			return true;
		};
		
		STX.Drawing.gartley.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.setPoint(0, tick, value, panel.chart);
				this.pts=[];
				this.penDown=true;
				this.segment=1;
				return false;
			}
			if(this.accidentalClick(tick, value)) {
				this.penDown=true;
				return false;
			}
			if(this.check(this.p0,this.p1)){
				if(this.segment==1) this.points.push(this.p0);
				this.points.push(this.p1);
				this.drawDropZones=true;
				this.setPoint(1, tick, value, panel.chart);
				this.segment++;
				
				if(this.segment>this.maxSegments) {
					this.setPoint(0, this.points[0][0], this.points[0][1], panel.chart);
					return true;
				}
				this.pts.push(this.d1,this.tzo1,this.v1);
				this.setPoint(0, tick, value, panel.chart);  // reset initial point for next segment, copy by value
			}
			return false;
		};

		STX.Drawing.gartley.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);

			if(this.segment==2){
				this.drawDropZone(context, 0.618*this.points[0][1]+0.382*this.p0[1], 0.786*this.points[0][1]+0.214*this.p0[1], this.p0[0]);
			}else if(this.segment==3){
				this.drawDropZone(context, 0.618*this.points[1][1]+0.382*this.p0[1], 0.786*this.points[1][1]+0.214*this.p0[1], this.p0[0]);
			}else if(this.segment==4){
				var bound=1.618*this.points[2][1]-0.618*this.points[1][1];
				if(this.shape=="M") bound=Math.max(bound,this.points[0][1]);
				else bound=Math.min(bound,this.points[0][1]);
				this.drawDropZone(context, bound, 1.27*this.points[2][1]-0.27*this.points[1][1], this.p0[0]);
			}

			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			var width=this.lineWidth;
			if(this.highlighted){
				color=this.stx.getCanvasColor("stx_highlight_vector");
			}
		
			var parameters={
					pattern: this.pattern,
					lineWidth: width
			};
			if(this.segment<=this.maxSegments)
				this.stx.plotLine(x0, x1, y0, y1, color, this.name, context, panel, parameters);
			
			var fillColor=this.fillColor;
			var coords=[];
			if(this.points.length){
				context.beginPath();
				for(var fp=1;fp<this.points.length && fp<=4;fp++){
					var xx0=this.stx.pixelFromTick(this.points[fp-1][0], panel.chart);
					var xx1=this.stx.pixelFromTick(this.points[fp][0], panel.chart);
					var yy0=this.stx.pixelFromValueAdjusted(panel, this.points[fp-1][0], this.points[fp-1][1]);
					var yy1=this.stx.pixelFromValueAdjusted(panel, this.points[fp][0], this.points[fp][1]);
					if(fp==1) coords.push(xx0,yy0);
					coords.push(xx1,yy1);
					this.stx.plotLine(xx0, xx1, yy0, yy1, color, this.name, context, panel, parameters);
				}
				if(this.points.length==2 || this.points.length==4){
					coords.push(x1,y1);					
				}
				if(this.points[2]){
					coords.push(this.stx.pixelFromTick(this.points[2][0], panel.chart),
									this.stx.pixelFromValueAdjusted(panel, this.points[2][0], this.points[2][1]));
				}
				if(fillColor && fillColor!="auto" && !STX.isTransparent(fillColor)){
					for(var c=0;c<coords.length;c+=2){
						if(c===0) context.moveTo(coords[0],coords[1]);
						context.lineTo(coords[c],coords[c+1]);
					}
					context.fillStyle=fillColor;
					context.globalAlpha=0.2;
					context.closePath();
					context.fill();
					context.globalAlpha=1;
				}
			}

			/*if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}*/
		
		};

		STX.Drawing.gartley.prototype.lineIntersection=function(tick, value, box, type){
			if(this.points.length!=this.maxSegments+1) return false;
			for(var pt=0;pt<this.points.length-1;pt++){
				if(this.stx.layout.semiLog || this.stx.layout.chartScale=="log"){
					if(STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.points[pt][0], STX.log10(this.points[pt][1]), this.points[pt+1][0], STX.log10(this.points[pt+1][1]), "segment")) return true;
				}else{
					if(STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.points[pt][0], this.points[pt][1], this.points[pt+1][0], this.points[pt+1][1], "segment")) return true;
				}
			}
			return false;
		};

		STX.Drawing.gartley.prototype.boxIntersection=function(tick, value){
			if(!this.p0 || !this.p1) return false;			
			if(tick>Math.max(this.p0[0], this.p1[0]) || tick<Math.min(this.p0[0], this.p1[0])) return false;
			var lowPoint=Math.min(this.p0[1],this.p1[1]);
			var highPoint=Math.max(this.p0[1],this.p1[1]);
			for(var pt=0;pt<this.points.length;pt++){
				lowPoint=Math.min(lowPoint,this.points[pt][1]);
				highPoint=Math.max(highPoint,this.points[pt][1]);
			}
			if(value>highPoint || value<lowPoint) return false;
			return true;
		};

		STX.Drawing.gartley.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			var tickDiff=repositioner.tick-tick;
			repositioner.tick=tick;
			var valueDiff=repositioner.value-value;
			repositioner.value=value;
			if(repositioner.action=="move"){
				this.pts=[];
				for(var pt=0;pt<this.points.length;pt++){
					this.points[pt][0]-=tickDiff;
					this.points[pt][1]-=valueDiff;
					this.setPoint(1, this.points[pt][0], this.points[pt][1], panel.chart);
					if(pt && pt<this.points.length-1) this.pts.push(this.d1,this.tzo1,this.v1);
					this.points[pt]=this.p1;
				}
				this.setPoint(0, this.points[0][0], this.points[0][1], panel.chart);
				this.render(context);
			/*}else if(repositioner.action=="drag"){
				this[repositioner.point]=[tick, value];
				this.setPoint(0, this.p0[0], this.p0[1], panel.chart);
				this.setPoint(1, this.p1[0], this.p1[1], panel.chart);
				this.render(context);*/
			}
		};

		STX.Drawing.gartley.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
		};

		STX.Drawing.gartley.prototype.drawDropZone=function(context, hBound1, hBound2, leftBound){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var y0=this.stx.pixelFromPrice(hBound1, panel);
			var y1=this.stx.pixelFromPrice(hBound2, panel)-y0;
			var x0=this.stx.pixelFromTick(leftBound, panel.chart);
			var x1=this.stx.chart.width-x0;
			context.fillStyle="#008000";
			context.globalAlpha=0.2;
			context.fillRect(x0, y0, x1, y1);
			context.globalAlpha=1;
		};
		
		STX.Drawing.gartley.prototype.adjust=function(){
			// If the drawing's panel doesn't exist then we'll check to see
			// whether the panel has been added. If not then there's no way to adjust
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.reconstructPoints();

			this.setPoint(0, this.d0, this.v0, panel.chart);
			this.points.unshift(this.p0);

			this.setPoint(1, this.d1, this.v1, panel.chart);
			this.points.push(this.p1);
		};
		
		STX.Drawing.gartley.prototype.reconstructPoints=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.points=[];
			for(var a=0;a<this.pts.length;a+=3){
				var d=STX.strToDateTime(this.pts[a]);
				d.setMinutes(d.getMinutes()+Number(this.pts[a+1])-d.getTimezoneOffset());
				this.points.push([this.stx.tickFromDate(STX.yyyymmddhhmmssmmm(d),panel.chart),this.pts[a+2]]);
			}
		};

		/**
		 * Reconstruct a gartley
		 * @memberOf  STX.Drawing.gartley
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the last point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the last point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @param {number} [obj.pts] a serialized list of dates,offsets,values for the 3 intermediate points of the gartley (should be 9 items in list)
		 */
		STX.Drawing.gartley.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.fillColor=obj.fc;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			this.v0=obj.v0;
			this.v1=obj.v1;
			this.pts=obj.pts.split(",");
			this.adjust();
		};
		
		STX.Drawing.gartley.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				v0:this.v0,
				v1:this.v1,
				pts:this.pts.join(",")
			};
		};

		/**
		 * Freeform drawing tool. Set splineTension to a value from 0 to 1 (default .3). This is a dragToDraw function
		 * and automatically disables the crosshairs while enabled.
		 * 
		 * It inherits its properties from {@link STX.Drawing.segment}.
		 * @constructor
		 * @name  STX.Drawing.freeform
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.freeform=function(){
			this.name="freeform";
			this.splineTension=0.3;  //set to -1 to not use splines at all
			this.dragToDraw=true;
		};
		
		STX.Drawing.freeform.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.freeform.prototype.measure=function(){};

		STX.Drawing.freeform.prototype.intersected=function(tick, value, box){
			if(tick>this.hiX || tick<this.lowX) return false;
			if(value>this.hiY || value<this.lowY) return false;
			return true;
		};
		
		STX.Drawing.freeform.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			
			if(this.penDown===false){
				this.copyConfig();
				this.startX=Math.round(this.stx.resolveX(this.stx.pixelFromTick(tick, panel.chart)));
				this.startY=Math.round(this.stx.resolveY(this.stx.pixelFromValueAdjusted(panel, tick, value)));
				var d=this.stx.dateFromTick(tick, panel.chart, true);
				this.d0=STX.yyyymmddhhmmssmmm(d);
				this.tzo0=d.getTimezoneOffset();
				this.v0=value;
				this.p0=[STXChart.crosshairX-this.startX, STXChart.crosshairY-this.startY];
				this.nodes=[this.p0[0],this.p0[1]];
				this.pNodes=[this.p0];
				this.candleWidth=this.stx.layout.candleWidth;
				this.multiplier=panel.yAxis.multiplier;
				this.interval=this.stx.layout.interval;
				this.periodicity=this.stx.layout.periodicity;
				this.tempSplineTension=this.splineTension;
				this.splineTension=-1;
				document.body.style.cursor="pointer";
				this.penDown=true;
				return false;
			}else{
				this.penDown=false;
				this.splineTension=this.tempSplineTension;
				document.body.style.cursor="auto";
				//this.adjust(); //moved to drawingClick - Gus
				return true;
			}
		};
		
		STX.Drawing.freeform.prototype.move=function(context, tick, value){
			if(!this.penDown) return;
		
			var panel=this.stx.panels[this.panelName];
			var d1=this.stx.dateFromTick(tick, panel.chart, true);
			this.d1=STX.yyyymmddhhmmssmmm(d1);
			this.tzo1=d1.getTimezoneOffset();
			this.v1=value;
			this.p1=[STXChart.crosshairX-this.startX,STXChart.crosshairY-this.startY];
		
			if(this.pNodes.length>2){
				if( this.p1[0]==this.pNodes[this.pNodes.length-2][0] &&
					this.p1[0]==this.pNodes[this.pNodes.length-1][0]){
					this.pNodes.length--;		
					this.nodes.length-=2;
				}else if(this.p1[1]==this.pNodes[this.pNodes.length-2][1] &&
						 this.p1[1]==this.pNodes[this.pNodes.length-1][1]){
					this.pNodes.length--;		
					this.nodes.length-=2;
				}
			}
			
			this.nodes.push(this.p1[0],this.p1[1]);
			this.pNodes.push(this.p1);
		
			this.render(context);
			return false;
		};
		
		//TODO: make more exact, and relocate this to somewhere useful
		STX.Drawing.freeform.prototype.intervalRatio=function(oldInterval,newInterval,oldPeriodicity,newPeriodicity,startDate,symbol){
			//approximating functions
			function weeksInMonth(startDate,symbol){return 5;}
			function daysInWeek(startDate,symbol){return 5;}
			function daysInMonth(startDate,symbol){return 30;}
			function minPerDay(startDate,symbol){return 390;}
			//1,3,5,10,15,30,"day","week","month"
			//no upscaling allowed, meaning, cannot go from intraday->daily, or from day->week, or week->month
			var returnValue=0;
			if(oldInterval==newInterval) returnValue=1;
			else if(!isNaN(oldInterval) && !isNaN(newInterval)) returnValue=oldInterval/newInterval;  //two intraday intervals
			else if(isNaN(oldInterval)){
				if(oldInterval=="month" && newInterval=="week") returnValue=weeksInMonth(startDate,symbol);
				else if(oldInterval=="week" && newInterval=="day") returnValue=daysInWeek(startDate,symbol);
				else if(oldInterval=="month" && newInterval=="day") returnValue=daysInMonth(startDate,symbol);
				else if(!isNaN(newInterval)){  //switching from daily to intraday
					if(oldInterval=="month") returnValue=daysInMonth(startDate,symbol)*minPerDay(startDate,symbol)/oldInterval;
					else if(oldInterval=="week") returnValue=daysInWeek(startDate,symbol)*minPerDay(startDate,symbol)/oldInterval;
					else if(oldInterval=="day") returnValue=minPerDay(startDate,symbol)/oldInterval;
				}
			}
			returnValue*=oldPeriodicity/newPeriodicity;
			return returnValue;
		};
		
		STX.Drawing.freeform.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
		
			var intvl=this.intervalRatio(this.interval,this.stx.layout.interval,this.periodicity,this.stx.layout.periodicity,this.d0,panel.chart.symbol);
			if(intvl===0) return;
			
			var cwr=this.stx.layout.candleWidth/this.candleWidth;
			var mlt=panel.yAxis.multiplier/this.multiplier;
			this.setPoint(0, this.d0, this.v0, panel.chart);
			var spx=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var spy=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var arrPoints=[];
				
			var color=this.color;
			var width=this.lineWidth;
			if(this.highlighted){
				color=this.stx.getCanvasColor("stx_highlight_vector");
			}
		
			var parameters={
				pattern: this.pattern,
				lineWidth: width
			};
		
			for(var n=0;n<this.pNodes.length;n++){
				var x0=intvl*cwr*(this.pNodes[n][0])+spx;
				var y0=mlt*(this.pNodes[n][1])+spy;
				arrPoints.push(x0,y0);
			}
		
			if(!arrPoints.length) return;
			if(this.splineTension<0){
				this.stx.connectTheDots(arrPoints, color, this.name, context, panel, parameters);
			}else{
				this.stx.plotSpline(arrPoints,this.splineTension,color,this.name,context,true,parameters);
			}
		};
		
		STX.Drawing.freeform.prototype.adjust=function(){
			// If the drawing's panel doesn't exist then we'll check to see
			// whether the panel has been added. If not then there's no way to adjust
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
		
			var p0=[this.nodes[0], this.nodes[1]];
			this.pNodes=[p0];
			this.lowX=this.nodes[0];
			this.hiX=this.nodes[0];
			this.lowY=this.nodes[1];
			this.hiY=this.nodes[1];
			
			for(var n=2;n<this.nodes.length;n+=2){
				var p1=[this.nodes[n], this.nodes[n+1]];
				this.pNodes.push(p1);
				this.lowX=Math.min(this.lowX,p1[0]);
				this.hiX=Math.max(this.hiX,p1[0]);
				this.lowY=Math.max(this.lowY,p1[1]);  //reversed because price axis goes bottom to top
				this.hiY=Math.min(this.hiY,p1[1]);
			}
		
			var intvl=this.intervalRatio(this.interval,this.stx.layout.interval,this.periodicity,this.stx.layout.periodicity,this.d0,panel.chart.symbol);
			if(intvl===0) return;
		
			var cwr=this.stx.layout.candleWidth/this.candleWidth;
			var mlt=panel.yAxis.multiplier/this.multiplier;
			this.setPoint(0, this.d0, this.v0, panel.chart);
			var spx=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var spy=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
		
			this.lowX=this.stx.tickFromPixel(Math.floor(intvl*cwr*(this.lowX))+spx,panel.chart);
			this.hiX=this.stx.tickFromPixel(Math.ceil(intvl*cwr*(this.hiX))+spx,panel.chart);
			this.lowY=this.stx.valueFromPixel(Math.floor(mlt*(this.lowY))+spy,panel);
			this.hiY=this.stx.valueFromPixel(Math.ceil(mlt*(this.hiY))+spy,panel);
		
		};
		
		STX.Drawing.freeform.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				cw:Number(this.candleWidth.toFixed(4)),
				mlt:Number(this.multiplier.toFixed(4)),
				d0:this.d0,
				tzo0:this.tzo0,
				v0:this.v0,
				int:this.interval,
				pd:this.periodicity,
				nodes:this.nodes
			};
		};
		
		/**
		 * Reconstruct a freeform drawing. It is not recommended to do this programatically.
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.cw] Candle width from original drawing
		 * @param {number} [obj.mlt] Y-axis multiplier from original drawing
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.int] Interval from original drawing
		 * @param {number} [obj.pd] Periodicity from original drawing
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {array} [obj.nodes] An array of nodes in form [x0a,x0b,y0a,y0b, x1a, x1b, y1a, y1b, ....]
		 * @memberOf STX.Drawing.freeform
		 */
		STX.Drawing.freeform.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.candleWidth=obj.cw;
			this.multiplier=obj.mlt;
			this.d0=obj.d0;
			this.tzo0=obj.tzo0;
			this.v0=obj.v0;
			this.interval=obj.int;
			this.periodicity=obj.pd;
			this.nodes=obj.nodes;
			this.adjust();
		};

		
		/**
		 * Callout drawing tool.  This is like an annotation except it draws a stem and offers a background color and line style.
		 *
		 * @constructor
		 * @name  STX.Drawing.callout
		 * @since 2015-11-1
		 * @version ChartIQ Advanced Package
		 * @see {@link STX.Drawing.annotation}
		 */
		STX.Drawing.callout=function(){
			this.name="callout";
			this.arr=[];
			this.w=0;
			this.h=0;
			this.padding=4;
			this.text="";
			this.ta=null;
			this.fontSize=0;
			this.font={};
			this.stemEntry="";
			this.defaultWidth=50;
			//this.dragToDraw=true;
		};

		STX.Drawing.callout.stxInheritsFrom(STX.Drawing.annotation);

		STX.Drawing.callout.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.borderColor=this.stx.currentVectorParameters.currentColor;
			this.backgroundColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
			this.font=STX.clone(this.stx.currentVectorParameters.annotation.font);
		};
		
		STX.Drawing.callout.prototype.move=function(context, tick, value){
			if(!this.penDown) return;
			
			this.copyConfig();
			this.p0=[tick,value];
			this.render(context);
		};
		
		STX.Drawing.callout.prototype.onChange=function(e){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var textarea=e.target;
			this.w=textarea.clientWidth;
			this.h=textarea.clientHeight;
			textarea.style.left=(this.stx.pixelFromTick(this.p0[0])-this.w/2) + "px";
			textarea.style.top=(this.stx.pixelFromPrice(this.p0[1],panel)-this.h/2) + "px";
			STX.clearCanvas(this.context.canvas);
			this.render(this.context);
		};

		STX.Drawing.callout.prototype.render=function(context){
			this.context=context; // remember last context
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			if(isNaN(y0)) return;

			context.font=this.fontString;
			context.textBaseline="top";
			var x=x0;
			var y=y0;
			var w=this.w/2;
			var h=this.h/2;
			if(this.penDown){
				w=this.defaultWidth; h=this.defaultHeight;
				if(!h) h=this.fontSize;
			}
			var lineWidth=this.lineWidth;
			if(!lineWidth) lineWidth=1.1;
			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			var borderColor=this.borderColor;
			if(borderColor=="auto" || STX.isTransparent(borderColor)) borderColor=this.stx.defaultColor;
			var parameters={
					pattern: this.pattern,
					lineWidth: lineWidth
			};
			if(this.highlighted) borderColor=this.stx.getCanvasColor("stx_highlight_vector");
			var sx0, sx1, sy0, sy1;
			var r=Math.min(Math.min(w,h)/2,8);
			if(this.stem){
				if(this.stem.d){	// absolute positioning of stem
					sx0=this.stx.pixelFromTick(this.stem.t);	// bottom of stem
					sy0=this.stx.pixelFromValueAdjusted(panel, this.stem.t, this.stem.v);
				}else if(this.stem.x){	// stem with relative offset positioning
					sx0=x;
					sy0=y;
					x+=this.stem.x;
					y+=this.stem.y;
				}

				var state="";
				if(sx0>=x+w) {sx1=x+w;state="r";}	// right of text
				else if(sx0>x-w && sx0<x+w) {sx1=x;state="c";}	// center of text
				else if(sx0<=x-w) {sx1=x-w;state="l";}	// left of text

				if(sy0>=y+h) {sy1=y+h;state+="b";}	// bottom of text
				else if(sy0>y-h && sy0<y+h) {sy1=y;state+="m";}	// middle of text
				else if(sy0<=y-h) {sy1=y-h;state+="t";}	// top of text
		
				this.stemEntry=state;

				if(sx1!=x || sy1!=y){  // make sure stem does not originate underneath the annotation
					sx0=Math.round(sx0);
					sx1=Math.round(sx1);
					sy0=Math.round(sy0);
					sy1=Math.round(sy1);
				}
			}
			if(this.highlighted){
				this.stx.canvasColor("stx_annotation_highlight_bg", context);
			}else{
				if(this.backgroundColor){
					context.fillStyle=this.backgroundColor;
					context.globalAlpha=0.4;
				}else if(this.stem){	// If there's a stem then use the container color otherwise the stem will show through
					context.fillStyle=this.stx.containerColor;
				}
			}
			context.strokeStyle=borderColor;
			if(context.setLineDash){
				var lineDashArray=[];  //array of dash, space, dash, space, etc
				if(this.pattern=="dotted") lineDashArray=[lineWidth, lineWidth];
				else if(this.pattern=="dashed") lineDashArray=[lineWidth*5, lineWidth*5];
				context.setLineDash(lineDashArray);
				context.lineDashOffset=0;  //start point in array
			}

			if(borderColor){
				context.beginPath();
				context.lineWidth=lineWidth;
				context.moveTo(x+w-r,y-h);
				if(this.stemEntry!="rt"){
					context.quadraticCurveTo(x+w, y-h, x+w, y-h+r);//top right
				}else{
					context.lineTo(sx0,sy0);
					context.lineTo(x+w, y-h+r);
				}
				context.lineTo(x+w,y-r/2);
				if(this.stemEntry=="rm") context.lineTo(sx0,sy0);
				context.lineTo(x+w,y+r/2);
				context.lineTo(x+w,y+h-r);
				if(this.stemEntry!="rb"){
					context.quadraticCurveTo(x+w, y+h, x+w-r, y+h);//bottom right
				}else{
					context.lineTo(sx0,sy0);
					context.lineTo(x+w-r, y+h);
				}
				context.lineTo(x+r/2,y+h);
				if(this.stemEntry=="cb") context.lineTo(sx0,sy0);
				context.lineTo(x-r/2,y+h);
				context.lineTo(x-w+r,y+h);
				if(this.stemEntry!="lb"){
					context.quadraticCurveTo(x-w, y+h, x-w, y+h-r);//bottom left
				}else{
					context.lineTo(sx0,sy0);
					context.lineTo(x-w, y+h-r);
				}
				context.lineTo(x-w,y+r/2);
				if(this.stemEntry=="lm") context.lineTo(sx0,sy0);
				context.lineTo(x-w,y-r/2);
				context.lineTo(x-w,y-h+r);
				if(this.stemEntry!="lt"){
					context.quadraticCurveTo(x-w, y-h, x-w+r, y-h);//top left
				}else{
					context.lineTo(sx0,sy0);
					context.lineTo(x-w+r, y-h);
				}
				context.lineTo(x-r/2,y-h);
				if(this.stemEntry=="ct") context.lineTo(sx0,sy0);
				context.lineTo(x+r/2,y-h);
				context.lineTo(x+w-r,y-h);
				context.fill();
				context.globalAlpha=1;
				context.stroke();
			}
			if(this.highlighted){
				this.stx.canvasColor("stx_annotation_highlight", context);
			}else{
				context.fillStyle=color;
			}
			y+=this.padding;
			for(var i=0;i<this.arr.length;i++){
				context.fillText(this.arr[i], x-w+this.padding, y-h);
				y+=this.fontSize;
			}
			context.textBaseline="alphabetic";
			
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				this.littleCircle(context, sx0, sy0, p0Fill);
			}
			/*if(this.penDown){
				context.globalAlpha=0.2;
				context.fillText("[Your text here]", x-w+this.padding, y-h);
				context.globalAlpha=1;
			}*/
		};
		
		STX.Drawing.callout.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			this.copyConfig();
			this.setPoint(0, tick, value, panel.chart);
			if(!this.penDown){
				this.stem={
					"d":this.d0,
					"v":this.v0
				};
				this.penDown=true;
				this.adjust();
				return false;
			}
			this.adjust();
			this.edit(context);
			this.penDown=false;
			return false;

		};

		STX.Drawing.callout.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			var tickDiff=repositioner.tick-tick;
			var valueDiff=repositioner.value-value;
			if(repositioner.stem){
				if(repositioner.action=="drag"){
					this.stem={
						"d":this.stx.dateFromTick(tick, panel.chart, true),
						"v":value
					};
				}else if(repositioner.action=="move"){
					this.setPoint(0, repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff, panel.chart);
					this.stem={
						"d":this.stx.dateFromTick(this.stx.tickFromDate(repositioner.stem.d, panel.chart)-tickDiff),
						"v":repositioner.stem.v-valueDiff
					};
				}
				this.adjust();
			}else{
				this.setPoint(0, repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff, panel.chart);
			}
			this.render(context);
		};

		STX.Drawing.callout.prototype.lineIntersection=function(tick, value, box, type){
			var panel=this.stx.panels[this.panelName];
			if(!this.p0 || !this.stem) return false;
			var stemTick=this.stx.tickFromDate(this.stem.d, panel.chart);
			if(this.stx.layout.semiLog || this.stx.layout.chartScale=="log"){
				return STX.boxIntersects(box.x0, STX.log10(box.y0), box.x1, STX.log10(box.y1), this.p0[0], STX.log10(this.p0[1]), stemTick, STX.log10(this.stem.v), type);
			}else{
				return STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.p0[0], this.p0[1], stemTick, this.stem.v, type);
			}
		};
		
		STX.Drawing.callout.prototype.intersected=function(tick, value, box){
			var panel=this.stx.panels[this.panelName];
			if(!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.pointIntersection(this.stem.t, this.stem.v, box)){
				this.whichPoint="p0";
				this.highlighted="p0";
				return {
					action: "drag",
					stem: true
				};
			}
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart)-this.w/2;
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1])-this.h/2;
			var x1=x0+this.w;
			var y1=y0+this.h;
			if(this.stem && this.stem.x){
				x0+=this.stem.x;
				x1+=this.stem.x;
				y0+=this.stem.y;
				y1+=this.stem.y;
			}
			var x=this.stx.pixelFromTick(tick, panel.chart);
			var y=this.stx.pixelFromValueAdjusted(panel, tick, value);
			if(x>=x0 && x<=x1 && y>=y0 && y<=y1) return {
				p0: STX.clone(this.p0),
				tick: tick,
				value: value
			};
			var isIntersected=this.lineIntersection(tick, value, box, "segment");
			if(isIntersected){
				this.highlighted=true;
				// This object will be used for repositioning
				return {
					action: "move",
					stem: STX.clone(this.stem),
					p0: STX.clone(this.p0),
					tick: tick, // save original tick
					value: value // save original value
				};
			}else{
				return null;
			}
		};

		/**
		 * Fibonacci Arc drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.fibonacci}
		 * @constructor
		 * @name  STX.Drawing.fibarc
		 * @since 2015-11-1
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.fibarc=function(){
			this.name="fibarc";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.fibarc.stxInheritsFrom(STX.Drawing.fibonacci);

		STX.Drawing.fibarc.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var yAxis=panel.yAxis;
			if(!this.p1) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
			var top=Math.min(y1, y0);
			var bottom=Math.max(y1, y0);
			var height=bottom-top;
			var isUpTrend=y1<y0;
		
			var trendLineColor=this.parameters.trend.color;
			if(trendLineColor=="auto" || STX.isTransparent(trendLineColor)) trendLineColor=this.stx.defaultColor;
			if(this.highlighted){
				trendLineColor=this.stx.getCanvasColor("stx_highlight_vector");
			}
			context.textBaseline="middle";
			this.stx.canvasFont("stx_yaxis", context); // match font from y axis so it looks cohesive
			var w=context.measureText("161.8%").width;// give it extra space so it does not overlap with the price labels.
			var minX=Number.MAX_VALUE, minY=Number.MAX_VALUE, maxX=Number.MAX_VALUE*-1, maxY=Number.MAX_VALUE*-1;
			var txtColor=this.color;
			if(txtColor=="auto" || STX.isTransparent(txtColor)) txtColor=this.stx.defaultColor;
			var length=Math.sqrt(Math.pow(y1-y0,2)+Math.pow(x1-x0,2));
			for(var i=0;i<this.parameters.fibs.length;i++){
				context.fillStyle=txtColor;
				var fib=this.parameters.fibs[i];
				if(fib.level<0) continue;
				var y=length*fib.level;
				if(isUpTrend) y*=-1;
				y=Math.round(y0+y);
				var x=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, y);
				var farX=x0;
				if(this.parameters.printLevels){
					context.textAlign="center";
					var txt=Math.round(fib.level*1000)/10+"%";
					if(this.parameters.printValues) {
						context.fillStyle=txtColor; // the price labels screw up the color and font size...so  reset before rendering the text
						this.stx.canvasFont("stx_yaxis", context); // use the same context as the y axis so they match.
					}
					context.fillText(txt, farX, y-5);
				}
				context.textAlign="left";
				if(this.parameters.printValues){
					if(x<this.stx.chart.width){
						//var v0=this.p0[1];
						//var v1=this.p1[1];
						//var price=v0 + ((v1-v0)*fib.level);
						//if(panel.chart.transformFunc) price=panel.chart.transformFunc(this.stx, panel.chart, price);
						// just use the actual price that segment will render on regardless of 'isUpTrend' since the values must match the prices on the y axis, and can not be reversed.
						var price = this.stx.valueFromPixel(y,panel);
						if(yAxis.priceFormatter){
							price=yAxis.priceFormatter(this.stx, panel, price);
						}else{
							price=this.stx.formatYAxisPrice(price, panel);
						}
						if(context==this.stx.chart.context) this.stx.endClip();
						var ylabel=(y1-y0)*fib.level+y0;
						this.stx.createYAxisLabel(panel, price, ylabel, txtColor, null, context);
						if(context==this.stx.chart.context) this.stx.startClip(panel.name);	
					}				
				}
				var fibColor=fib.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.stx.defaultColor;
				context.strokeStyle=fibColor;
				var fillColor=fib.color;
				if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.fillColor;
				if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.stx.defaultColor;
				context.fillStyle=fillColor;
				context.globalAlpha=fib.parameters.opacity;
				context.lineWidth=fib.parameters.lineWidth;
				if(context.setLineDash){
					var lineDashArray=[];  //array of dash, space, dash, space, etc
					if(fib.parameters.pattern=="dotted") lineDashArray=[context.lineWidth, context.lineWidth];
					else if(fib.parameters.pattern=="dashed") lineDashArray=[context.lineWidth*5, context.lineWidth*5];
					context.setLineDash(lineDashArray);
					context.lineDashOffset=0;  //start point in array
				}
				context.beginPath();
				context.arc(x0,y0,Math.abs(fib.level)*length,0,Math.PI,isUpTrend);
				context.stroke();
				if(context.setLineDash) context.setLineDash([]);
				context.globalAlpha=0.05;
				context.fill();
				context.globalAlpha=1;
				if(y<minY){
					minX=x;
					minY=y;
				}
				if(y>maxY){
					maxX=x;
					maxY=y;
				}
			}
			context.textAlign="left";
			// ensure we at least draw trend line from zero to 100
			for(var level in {0:0, 1:1}){
				var yy=isUpTrend?bottom-height*level:top+height*level;
				yy=Math.round(yy);
				if(yy<minY){
					minX=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, yy);
					minY=yy;
				}
				if(yy>maxY){
					maxX=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, yy);
					maxY=yy;
				}
			}
			this.stx.plotLine(minX, maxX, minY, maxY, trendLineColor, "segment", context, panel, this.parameters.trend.parameters);
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}
		};

		/**
		 * Fibonacci Fan drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.fibonacci}
		 * @constructor
		 * @name  STX.Drawing.fibfan
		 * @since 2015-11-1
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.fibfan=function(){
			this.name="fibfan";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.fibfan.stxInheritsFrom(STX.Drawing.fibonacci);
		
		STX.Drawing.fibfan.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var yAxis=panel.yAxis;
			if(!this.p1) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
			var top=Math.min(y1, y0);
			var bottom=Math.max(y1, y0);
			var height=bottom-top;
			var isUpTrend=(y1-y0)/(x1-x0)>0;
		
			var trendLineColor=this.parameters.trend.color;
			if(trendLineColor=="auto" || STX.isTransparent(trendLineColor)) trendLineColor=this.stx.defaultColor;
			if(this.highlighted){
				trendLineColor=this.stx.getCanvasColor("stx_highlight_vector");
			}
			context.textBaseline="middle";
			this.stx.canvasFont("stx_yaxis", context); // match font from y axis so it looks cohesive
			var w=context.measureText("161.8%").width+10;// give it extra space so it does not overlap with the price labels.
			var minX=Number.MAX_VALUE, minY=Number.MAX_VALUE, maxX=Number.MAX_VALUE*-1, maxY=Number.MAX_VALUE*-1;
			var txtColor=this.color;
			if(txtColor=="auto" || STX.isTransparent(txtColor)) txtColor=this.stx.defaultColor;
			for(var i=0;i<this.parameters.fibs.length;i++){
				context.fillStyle=txtColor;
				var fib=this.parameters.fibs[i];
				var y=(y0-y1)*fib.level+y1;
				//y=Math.round(y);
				var x=STX.xIntersection({x0:x1,x1:x1,y0:y0,y1:y1}, y);
				var farX=this.stx.chart.left;
				if(x1>x0) farX+=this.stx.chart.width;
				var farY=(farX-x0)*(y-y0)/(x-x0)+y0;
				if(x0>farX-(this.parameters.printLevels?w+5:0) && x1>x0) continue;
				else if(x0<farX+(this.parameters.printLevels?w+5:0) && x1<x0) continue;
				if(this.parameters.printLevels){
					var txt=Math.round(fib.level*1000)/10+"%";
					if(x1>x0){
						farX-=w;
						context.textAlign="left";
					}else{
						farX+=w;
						context.textAlign="right";
					}
					if(this.parameters.printValues) {
						context.fillStyle=txtColor; // the price labels screw up the color and font size...so  reset before rendering the text
						this.stx.canvasFont("stx_yaxis", context); // use the same context as the y axis so they match.
					}
					farY=(farX-x0)*(y-y0)/(x-x0)+y0;
					context.fillText(txt, farX, farY);
					if(x1>x0) farX-=5;
					else farX+=5;
				}
				context.textAlign="left";
				if(this.parameters.printValues){
					if(x<this.stx.chart.width){
						//var v0=this.p0[1];
						//var v1=this.p1[1];
						//var price=v0 + ((v1-v0)*fib.level);
						//if(panel.chart.transformFunc) price=panel.chart.transformFunc(this.stx, panel.chart, price);
						// just use the actual price that segment will render on regardless of 'isUpTrend' since the values must match the prices on the y axis, and can not be reversed.
						var price = this.stx.valueFromPixel(y,panel);
						if(yAxis.priceFormatter){
							price=yAxis.priceFormatter(this.stx, panel, price);
						}else{
							price=this.stx.formatYAxisPrice(price, panel);
						}
						if(context==this.stx.chart.context) this.stx.endClip();
						this.stx.createYAxisLabel(panel, price, y, txtColor, null, context);
						if(context==this.stx.chart.context) this.stx.startClip(panel.name);	
					}				
				}
				var fibColor=fib.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.stx.defaultColor;
				var fillColor=fib.color;
				if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.fillColor;
				if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.stx.defaultColor;
				context.fillStyle=fillColor;
				if(this.parameters.printLevels) farY=(farX-x0)*(y-y0)/(x-x0)+y0;
				this.stx.plotLine(x0, farX, y0, farY, (fib.level||!this.highlighted?fibColor:trendLineColor), "segment", context, panel, fib.parameters);
				context.globalAlpha=0.05;
				context.beginPath();
				context.moveTo(farX,farY);
				context.lineTo(x0,y0);
				context.lineTo(farX,y0);
				context.fill();
				context.globalAlpha=1;
				if(y<minY){
					minX=x;
					minY=y;
				}
				if(y>maxY){
					maxX=x;
					maxY=y;
				}
			}
			// ensure we at least draw trend line from zero to 100
			for(var level in {0:0, 1:1}){
				var yy=isUpTrend?bottom-height*level:top+height*level;
				yy=Math.round(yy);
				if(yy<minY){
					minX=STX.xIntersection({x0:x1,x1:x1,y0:y0,y1:y1}, yy);
					minY=yy;
				}
				if(yy>maxY){
					maxX=STX.xIntersection({x0:x1,x1:x1,y0:y0,y1:y1}, yy);
					maxY=yy;
				}
			}
			//this.stx.plotLine(minX, maxX, minY, maxY, trendLineColor, "segment", context, panel, this.parameters.trend.parameters);
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}
		};

		/**
		 * Fibonacci Time Zone drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.fibonacci}
		 * @constructor
		 * @name  STX.Drawing.fibtimezone
		 * @since 2015-11-1
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.fibtimezone=function(){
			this.name="fibtimezone";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.fibtimezone.stxInheritsFrom(STX.Drawing.fibonacci);
		
		STX.Drawing.fibtimezone.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			if(!this.p1) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
			var fibs=[1,0];
		
			var trendLineColor=this.parameters.trend.color;
			if(trendLineColor=="auto" || STX.isTransparent(trendLineColor)) trendLineColor=this.stx.defaultColor;
			if(this.highlighted){
				trendLineColor=this.stx.getCanvasColor("stx_highlight_vector");
			}
			context.textBaseline="middle";
			this.stx.canvasFont("stx_yaxis", context); // match font from y axis so it looks cohesive
			var h=20;// give it extra space so it does not overlap with the date labels.
			var mult=this.p1[0]-this.p0[0];
			var txtColor=this.color;
			if(txtColor=="auto" || STX.isTransparent(txtColor)) txtColor=this.stx.defaultColor;
			context.textAlign="center";

			x=x0;
			var farY=this.stx.chart.panel.yAxis.height;
			var txt=0;
			var fibColor=this.parameters.timezone.color;
			if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.color;
			if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.stx.defaultColor;
			var fillColor=this.parameters.timezone.color;
			if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.fillColor;
			if(fillColor=="auto" || STX.isTransparent(fillColor)) fillColor=this.stx.defaultColor;

			if(this.parameters.printLevels) farY-=h-7;

			do{
				x=this.stx.pixelFromTick(this.p0[0]+txt*mult, panel.chart);
				//if(x<this.stx.chart.left || x>this.stx.chart.left+this.stx.chart.width) break;
				if(x0<x1 && x>this.stx.chart.left+this.stx.chart.width) break;
				else if(x0>x1 && x<this.stx.chart.left) break;
				if(this.parameters.printLevels){
					context.fillStyle=txtColor;
					context.fillText((x1>x0?txt:txt*-1), x, farY+7);
				}
				context.fillStyle=fillColor;
				this.stx.plotLine(x, x, 0, farY, fibColor, "segment", context, panel, this.parameters.timezone.parameters);
				context.globalAlpha=0.05;
				context.beginPath();
				context.moveTo(x0,0);
				context.lineTo(x,0);
				context.lineTo(x,farY);
				context.lineTo(x0,farY);
				context.fill();
				context.globalAlpha=1;
				txt=fibs[0]+fibs[1];
				fibs.unshift(txt);
			}while(mult);
			context.textAlign="left";
			this.stx.plotLine(x0, x1, y0, y1, trendLineColor, "segment", context, panel, this.parameters.trend.parameters);
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}
		};

		/**
		 * shape is a default implementation of a {@link STX.Drawing.BaseTwoPoint} drawing
		 * which places a "shape" on the canvas.  It can be rotated and/or stretched.
		 * It is meant to be overridden with specific shape designs, such as arrows....
		 * @constructor
		 * @name  STX.Drawing.shape
		 * @since 2015-11-1
		 * @version ChartIQ Advanced Package
		 */
		STX.Drawing.shape=function(){
			this.name="shape";
			this.radians=0;
			this.a=0;
			this.rotating=false;
			this.textMeasure=false;
			this.configurator="shape";  //forces all derived classes to default to shape drawing tools
			this.dimension=[0,0];
			this.points=[];
		};
		
		STX.Drawing.shape.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.shape.prototype.measure=function(){};

		STX.Drawing.shape.prototype.render=function(context){
			if(!this.points.length) return;
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			if(this.p1){
				var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
				var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);

				context.globalAlpha=0.5;
				context.fillStyle="#000000";
				if(this.rotating){
					this.radians=Math.atan((y1-y0)/(x1-x0));
					if(x1<x0) this.radians+=Math.PI;
					else if(y1<y0) this.radians+=2*Math.PI;
					this.a=parseInt((this.radians*36/Math.PI).toFixed(0),10)*5;
					this.a%=360;
					this.radians=this.a*Math.PI/180;
					if(this.textMeasure) context.fillText(this.a+"\u00b0",x1+10,y1+10);
				}else if(this.penDown){
					this.sx=Math.max(1,parseFloat(Math.abs(2*(x1-x0)/this.dimension[0]).toFixed(1)));
					if(x1<x0) this.sx*=-1;
					this.sy=Math.max(1,parseFloat(Math.abs(2*(y1-y0)/this.dimension[1]).toFixed(1)));
					if(y1<y0) this.sy*=-1;
					if(this.textMeasure) context.fillText(this.sx+"x,"+this.sy+"x",x1+this.sx+5,y1+this.sy+5);
				}
				context.globalAlpha=1;
			}

			var lineWidth=this.lineWidth;
			if(!lineWidth) lineWidth=1.1;

			var parameters={
					pattern: this.pattern,
					lineWidth: lineWidth
			};
			if(this.highlighted && parameters.pattern=="none"){
				parameters.pattern="solid";
				if(parameters.lineWidth==0.1) parameters.lineWidth=1;
			}
			var edgeColor=this.color;
			if(edgeColor=="auto" || STX.isTransparent(edgeColor)) edgeColor=this.stx.defaultColor;
			if(this.highlighted){
				edgeColor=this.stx.getCanvasColor("stx_highlight_vector");
				if(lineWidth==0.1) lineWidth=1.1;
			}
			var fillColor=this.fillColor;
			lineWidth/=(Math.abs((this.sx*this.sy))*2/(Math.abs(this.sx)+Math.abs(this.sy)));
			
			context.save();
			context.translate(x0,y0);
			context.rotate(this.radians);
			context.scale(this.sx,this.sy);
			
			var subshape, point;
			for(subshape=0;subshape<this.points.length;subshape++){
				context.beginPath();
				for(point=0;point<this.points[subshape].length;point++){
					var x,y,cx1,cx2,cy1,cy2;
					if(this.points[subshape][point]=="M"){ //move
						x=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						y=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						context.moveTo(x,y);
					}else if(this.points[subshape][point]=="L"){ //line
						x=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						y=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						context.lineTo(x,y);
					}else if(this.points[subshape][point]=="Q"){ //quadratic
						cx1=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						cy1=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						x=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						y=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						context.quadraticCurveTo(cx1,cy1,x,y);
					}else if(this.points[subshape][point]=="B"){ //bezier
						cx1=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						cy1=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						cx2=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						cy2=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						x=this.points[subshape][++point]-(this.dimension[0]-1)/2;
						y=this.points[subshape][++point]-(this.dimension[1]-1)/2;
						context.bezierCurveTo(cx1,cy1,cx2,cy2,x,y);
					}
				}
				context.closePath();
			
				if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
					//context.globalAlpha=0.4;
					context.fillStyle=fillColor;
					context.fill();
					//context.globalAlpha=1;
				}
				if(edgeColor && this.pattern!="none"){
					context.strokeStyle=edgeColor;
					context.lineWidth=lineWidth;
					if(context.setLineDash){
						var lineDashArray=[];  //array of dash, space, dash, space, etc
						if(this.pattern=="dotted") lineDashArray=[lineWidth, lineWidth];
						else if(this.pattern=="dashed") lineDashArray=[lineWidth*5, lineWidth*5];
						context.setLineDash(lineDashArray);
						context.lineDashOffset=0;  //start point in array
					}
					context.stroke();
				}
			}
			
			//context.strokeRect(-(this.dimension[0]-1)/2,-(this.dimension[1]-1)/2,this.dimension[0]-1,this.dimension[1]-1);
			
			context.restore();
			context.save();
			context.translate(x0,y0);
			context.rotate(this.radians);

			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				var p2Fill=this.whichPoint=="p2"?true:false;
				this.littleCircle(context, 0, 0, p0Fill);
				this.mover(context, 0, 0, p0Fill);
				this.littleCircle(context, this.sx*this.dimension[0]/2, this.sy*this.dimension[1]/2, p1Fill);
				this.resizer(context, this.sx*this.dimension[0]/2, this.sy*this.dimension[1]/2, p1Fill);
				this.littleCircle(context, this.sx*this.dimension[0]/2, 0, p2Fill);
				this.rotator(context, this.sx*this.dimension[0]/2, 0, p2Fill);
				context.globalAlpha=0.5;
				context.fillStyle="#000000";
				if(this.textMeasure){
					context.fillText(this.sx+"x,"+this.sy+"x",this.sx*this.dimension[0]/2+12,this.sy*this.dimension[1]/2+5);
					context.fillText(this.a+"\u00b0",this.sx*this.dimension[0]/2+12,5);
				}
				context.globalAlpha=1;
			}else if(this.penDown){
				if(this.rotating){
					this.rotator(context, this.sx*this.dimension[0]/2, 0, true);
				}else{
					this.resizer(context, this.sx*this.dimension[0]/2, this.sy*this.dimension[1]/2, true);
				}
			}
			context.restore();
		};
		
		STX.Drawing.shape.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(repositioner.action=="move"){
				var tickDiff=repositioner.tick-tick;
				var valueDiff=repositioner.value-value;
				this.setPoint(0, repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff, panel.chart);
				this.render(context);
			}else{
				var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
				var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
				var x1=this.stx.pixelFromTick(tick, panel.chart);
				var y1=this.stx.pixelFromValueAdjusted(panel, tick, value);
				if(repositioner.action=="scale"){
					this[repositioner.point]=[tick, value];
					this.sx=parseFloat((((x1-x0)*Math.cos(this.radians)+(y1-y0)*Math.sin(this.radians))/(this.dimension[0]/2)).toFixed(1));
					if(Math.abs(this.sx)<1) this.sx/=Math.abs(this.sy);
					this.sy=parseFloat((((y1-y0)*Math.cos(this.radians)-(x1-x0)*Math.sin(this.radians))/(this.dimension[1]/2)).toFixed(1));
					if(Math.abs(this.sy)<1) this.sy/=Math.abs(this.sy);
					this.render(context);
				}else if(repositioner.action=="rotate"){
					this[repositioner.point]=[tick, value];
					this.radians=Math.atan((y1-y0)/(x1-x0));
					if(x1<x0) this.radians+=Math.PI;
					else if(y1<y0) this.radians+=2*Math.PI;
					this.a=parseInt((this.radians*36/Math.PI).toFixed(0),10)*5;
					if(this.sx<0) this.a=this.a+180;
					this.a%=360;
					this.radians=this.a*Math.PI/180;
					this.render(context);
				}
			}
		};

		STX.Drawing.shape.prototype.intersected=function(tick, value, box){
			if(!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.stx.repositioningDrawing==this && this.stx.repositioningDrawing.repositioner) return this.stx.repositioningDrawing.repositioner;
			this.whichPoint=null;

			var panel=this.stx.panels[this.panelName];
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var x1=this.stx.pixelFromTick(tick, panel.chart);
			var y1=this.stx.pixelFromValueAdjusted(panel, tick, value);

			x1-=x0;
			y1-=y0;
			var y1t=y1, x1t=x1;
			x1=Math.cos(this.radians)*x1t + Math.sin(this.radians)*y1t;
			y1=Math.cos(this.radians)*y1t - Math.sin(this.radians)*x1t;
			x1/=this.sx;
			y1/=this.sy;
			var circleR2=Math.pow(5+this.littleCircleRadius(),2);
			var scaledCircleR2=Math.abs(circleR2/(this.sx*this.sy));
			var overShape=Math.pow(this.dimension[0]/2,2)+Math.pow(this.dimension[1]/2,2)>(Math.pow(x1,2)+Math.pow(y1,2));
			var moveProximity=(circleR2-(Math.pow(x1*this.sx,2)+Math.pow(y1*this.sy,2)))/Math.abs(this.sx*this.sy);
			var scaleProximity=scaledCircleR2-(Math.pow(x1-this.dimension[0]/2,2)+Math.pow(y1-this.dimension[1]/2,2));
			var rotateProximity=scaledCircleR2-(Math.pow(x1-this.dimension[0]/2,2)+Math.pow(y1,2));
			//console.log("s:"+scaleProximity+" r:"+rotateProximity+" m:"+moveProximity);
			if(scaleProximity>0 && scaleProximity>=rotateProximity && scaleProximity>=moveProximity){
				this.highlighted="p1";
				this.whichPoint="p1";
				return {
					action: "scale"
				};
			}else if(rotateProximity>0 && rotateProximity>=scaleProximity && rotateProximity>=moveProximity){
				this.highlighted="p2";
				this.whichPoint="p2";
				return {
					action: "rotate"
				};
			}else if(moveProximity>0 && moveProximity>=scaleProximity && moveProximity>=rotateProximity){
				this.highlighted="p0";
				this.whichPoint="p0";
				return {
					action: "move",
					p0: STX.clone(this.p0),
					tick: tick,
					value: value
				};
			}else if(overShape){
				this.highlighted="p0";
				return {};
			}
			return null;
		};
		
		STX.Drawing.shape.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
		};

		STX.Drawing.shape.prototype.littleCircleRadius=function(){
			return 3;
		};
		
		STX.Drawing.shape.prototype.click=function(context, tick, value){
			if(!this.points.length) return false;
			this.copyConfig();
			var panel=this.stx.panels[this.panelName];
			if(!this.penDown){
				this.setPoint(0, tick, value, panel.chart);
				this.penDown=true;
				return false;
			}
			//if(this.accidentalClick(tick, value)) return this.dragToDraw;

			this.setPoint(1, tick, value, panel.chart);

			if(this.rotating) {
				this.penDown=false;
				this.rotating=false;
				return true;	// kernel will call render after this
			}
			this.rotating=true;
			return false;
		};

		STX.Drawing.shape.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);
			this.radians=Math.round(this.a/5)*Math.PI/36;
		};

		/**
		 * Reconstruct a shape
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The border color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the center point
		 * @param {number} [obj.d0] Date (string form) for the center point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.a] Angle of the rotation in degrees
		 * @param {number} [obj.sx] Horizontal scale factor
		 * @param {number} [obj.sy] Vertical scale factor
		 * @memberOf STX.Drawing.shape
		 */
		STX.Drawing.shape.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.fillColor=obj.fc;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.d0=obj.d0;
			this.v0=obj.v0;
			this.tzo0=obj.tzo0;
			this.a=obj.a;
			this.sx=obj.sx;
			this.sy=obj.sy;
			this.adjust();
		};
		
		STX.Drawing.shape.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				v0:this.v0,
				tzo0: this.tzo0,
				a:this.a,
				sx:this.sx,
				sy:this.sy
			};
		};

		/* Drawing specific shapes
		*
		* this.dimension: overall dimension of shape as designed, as a pair [dx,dy] where dx is length and dy is width, in pixels
		* this.points: array of arrays.  Each array represents a closed loop subshape.
		* 	within each array is a series of values representing coordinates.
		* 	For example, ["M",0,0,"L",1,1,"L",2,1,"Q",3,3,4,1,"B",5,5,0,0,3,3]
		* 	The array will be parsed by the render function:
		* 		"M" - move to the xy coordinates represented by the next 2 array elements
		* 		"L" - draw line to xy coordinates represented by the next 2 array elements
		* 		"Q" - draw quadratic curve where next 2 elements are the control point and following 2 elements are the end coordinates
		* 		"B" - draw bezier curve where next 2 elements are first control point, next 2 elements are second control point, and next 2 elements are the end coordinates
		* See sample shapes below.
		* 
		*/
		
		STX.Drawing.xcross=function(){
			this.name="xcross";
			this.dimension=[7,7];
			this.points=[
			             ["M",1,0,"L",3,2,"L",5,0,"L",6,1,"L",4,3,"L",6,5,"L",5,6,"L",3,4,"L",1,6,"L",0,5,"L",2,3,"L",0,1,"L",1,0]
			             ];
		};
		STX.Drawing.xcross.stxInheritsFrom(STX.Drawing.shape);

		STX.Drawing.arrow=function(){
			this.name="arrow";
			this.dimension=[11,11];
			this.points=[
			             ["M",3,0,"L",7,0,"L",7,5,"L",10,5,"L",5,10,"L",0,5,"L",3,5,"L",3,0]
			             ];
		};
		STX.Drawing.arrow.stxInheritsFrom(STX.Drawing.shape);

		STX.Drawing.check=function(){
			this.name="check";
			this.dimension=[8,9];
			this.points=[
			             ["M",1,5,"L",0,6,"L",2,8,"L",7,1,"L",6,0,"L",2,6,"L",1,5]
			             ];
		};
		STX.Drawing.check.stxInheritsFrom(STX.Drawing.shape);

		STX.Drawing.star=function(){
			this.name="star";
			this.dimension=[12,12];
			this.points=[
			             ["M",0,4,"L",4,4,"L",5.5,0,"L",7,4,"L",11,4,"L",8,7,"L",9,11,"L",5.5,9,"L",2,11,"L",3,7,"L",0,4]
			             ];
		};
		STX.Drawing.star.stxInheritsFrom(STX.Drawing.shape);

		STX.Drawing.heart=function(){
			this.name="heart";
			this.dimension=[23,20];
			this.points=[
			             ["M",11,3,"B",11,2.4,10,0,6,0,"B",0,0,0,7.5,0,7.5,"B",0,11,4,15.4,11,19,"B",18,15.4,22,11,22,7.5,"B",22,7.5,22,0,16,0,"B",13,0,11,2.4,11,3]
			             ];
		};
		STX.Drawing.heart.stxInheritsFrom(STX.Drawing.shape);

		STX.Drawing.focusarrow=function(){
			this.name="focusarrow";
			this.dimension=[7,5];
			this.points=[
			              ["M",0,0,"L",2,2,"L",0,4,"L",0,0],
			              ["M",6,0,"L",4,2,"L",6,4,"L",6,0]
			             ];
		};
		STX.Drawing.focusarrow.stxInheritsFrom(STX.Drawing.shape);


		/**
		 * A marker is a DOM object that is managed by the chart. Makers are placed in "holders" which are
		 * DIV elements whose placement and size corresponds with a panel on the chart. A holder exists for
		 * each panel. Markers are placed by date, tick or bar to control their position on the x-axis. They
		 * are placed by value (price) to control their position on the y-axis. Markers will be repositioned
		 * when the user scrolls or zooms the chart.
		 * 
		 * The default placement function for any markers is {@link STXChart#defaultMarkerPlacement}, but custom placement functions can be created as needed. 
		 * See {@link STX.Marker.AboveCandle} for sample custom rendering function.
		 * 
		 * See {@tutorial Markers} tutorials for additional implementation instructions.
		 * 
		 * @name STX.Marker
		 * @param {Object} params Parameters that describe the marker
		 * @param {STXChart} stx The chart to attach the marker
		 * @param {*} params.x A valid date, date string, tick or bar
		 * @param {Number} params.y A valid value for positioning on the y-axis
		 * @param {HTMLElement} [params.node] The HTML element. This should be detached from the DOM! If none passed then a blank div will be created.
		 * @param {string} params.panelName="chart" The name of the panel to attach the holder. Defaults to the main chart panel.
		 * @param {String} [params.xPositioner="date"] Value values are "date" (a JavaScript date), "master" (masterData position), "bar" (dataSegment position), "none" (use CSS positioning)
		 * @param {String} [params.yPositioner="value"] Value values are "value", "none" (use CSS positioning)
		 * @param {boolean} [params.permanent=false] Stays on the chart even when chart is re-initialized (symbol change, newChart(), initializeChart())
		 * @param {String} [params.label="generic"] A label for the marker. Multiple markers can be assigned the same label. This allows them to be deleted in one fell swoop.
		 * @param {boolean} [params.includeAxis=false] If true then the marker can display on the x or y axis. Otherwise it will be cropped at the axis edges.
		 * @param {Boolean} [params.chartContainer] If true then the marker will be put directly in the chart container as opposed to in a holder. When placing
		 * markers directly in the chart container, the z-index setting for the marker should be set vis a vis the z-index of the holders in order to place
		 * the markers below or above those inside the holders.
		 * @constructor
		 * @since 15-07-01
		 * @version ChartIQ Advanced Package
		 * @example
		 * new STX.Marker({
	     * 	stx: stxx,
	     * 	xPositioner: "date",
	     * 	x: someDate,
		 * 	label: "events",
	     * 	node: newNode
	     * });
		 */
		STX.Marker=function(params){
			this.params={
				xPositioner: "date",
				yPositioner: "value",
				panelName: "chart",
				permanent: false,
				label: "generic",
				includeAxis: false
			};
			STX.extend(this.params, params);
			if(!this.params.node){
				this.params.node=document.createElement("DIV");
			}
			if(!this.params.stx){
				console.log("Marker created without specifying stx");
				return;
			}
			if(!this.className) this.className="STX.Marker";
			this.params.stx.addToHolder(this);
		};

		/**
		 * Removes the marker from the chart object
		 * @memberOf STX.Marker
		 * @since  15-07-01
		 */
		STX.Marker.prototype.remove=function(){
			this.params.stx.removeFromHolder(this);
		};

		/**
		 * Normally the chart will take care of positioning the marker automatically but you can
		 * force a marker to render itself by calling this method. This will cause the marker to
		 * call it's placement function. You might want to do this for instance if your marker morphs
		 * or changes position outside of the animation loop.
		 */
		STX.Marker.prototype.render=function(){
			var arr=[this];
			var params={
				stx: this.params.stx,
				arr: arr,
				panel: this.params.stx.panels[this.params.panelName]
			};
			(this.constructor.placementFunction)(params);
		};


		/**
		 * Removes all markers with the specified label from the chart object
		 * @param  {STXChart} stx   The chart object
		 * @param  {String} label The label
		 * @memberOf STX.Marker
		 * @since  15-07-01
		 */
		STX.Marker.removeByLabel=function(stx, label){
			var arr=stx.getMarkerArray("label", label);
			for(var i=0;i<arr.length;i++)
				stx.removeFromHolder(arr[i]);
		};

		/**
		 * AboveCandle is a sample Marker placement handler that positions markers above the candles on the chart. 
		 * This is equivalent to a "placementFunction" in the previous version of Markers. You can create your own marker placement objects 
		 * by following the same pattern as {@link STXChart#defaultMarkerPlacement}.
		 * 
		 * @param  {Object} params Parameters inherited from {@link STX.Marker}
		 * @name STX.Marker.AboveCandle
		 * @constructor
		 * @example
		  	new STX.Marker.AboveCandle({
			    stx: stxx,
			    xPositioner: "date",
			    x: stxx.masterData[i].DT,
			    label: "events",
			    node: newNode
			});
		 */
		STX.Marker.AboveCandle=function(params){
			if(!this.className) this.className="STX.Marker.AboveCandle";
			STX.Marker.call(this, params);
		};

		STX.Marker.AboveCandle.stxInheritsFrom(STX.Marker, false);

		/**
		 * Sample `placementFuncion` override used to draw markers above a particular candle, bar or line value. Derived from {@link STXChart#defaultMarkerPlacement}
		 * 
		 * @param  {Object} params Parameters including the list of markers and placement details
		 * @param {STXChart} params.stx The chart object
		 * @param {Array} params.arr The array of markers to place
		 * @param {Object} params.panel The panel where the markers are to be placed
		 * @param {Number} params.firstTick The first tick displayed on the chart
		 * @param {Number} params.lastTick The last tick displayed on the chart
		 * @memberOf STX.Marker.AboveCandle
		 */
		STX.Marker.AboveCandle.placementFunction=function(params){
			var panel=params.panel;
			var yAxis=params.yAxis?params.yAxis:params.panel.yAxis;
			var chart=panel.chart;
			var stx=params.stx;
			var useHighs=STXChart.chartShowsHighs(stx.layout.chartType);
			for(var i=0;i<params.arr.length;i++){
				var marker=params.arr[i];
				var node=marker.node;
				// Getting clientWidth and clientHeight is a very expensive operation
				// so we'll cache the results. Don't use this function if your markers change
				// shape or size dynamically!
				if(!marker.clientWidth) marker.clientWidth=node.clientWidth;
				if(!marker.clientHeight) marker.clientHeight=node.clientHeight;
				var quote=null;
				
				
				// X axis positioning logic
				
				if(marker.params.xPositioner=="bar"){
					if(marker.params.x<chart.xaxis.length){
						var xaxis=chart.xaxis[marker.params.x];
						if(xaxis) quote=xaxis.data;
					}
					node.style.left=Math.round(stx.pixelFromBar(marker.params.x, chart)-marker.clientWidth/2)+1+"px";
				}else{
					// This is a section of code to hide markers if they are off screen, and also to figure out
					// the position of markers "just in time"
					// the tick is conditionally pre-set by STXChart.prototype.setMarkerTick depending on marker.params.xPositioner
					if(!marker.tick && marker.tick!==0){ // if tick is not defined then hide, probably in distant past
						if(marker.params.future && chart.scroll<chart.maxTicks){ // In future
							stx.futureTickIfDisplayed(marker); // Just in time check for tick
							if(!marker.tick && marker.tick!==0){
								node.style.left="-1000px";
								continue;								
							}
						}else{
							node.style.left="-1000px";
							continue;
						}
					}
					if(marker.tick<chart.dataSet.length) quote=chart.dataSet[marker.tick];
					if(marker.tick<params.firstTick && marker.rightEdge<0) continue; // off screen, no need to reposition the marker
					marker.leftpx=Math.round(stx.pixelFromTick(marker.tick, chart)-chart.left-marker.clientWidth/2);
					marker.rightEdge=marker.leftpx+node.clientWidth;
					node.style.left=marker.leftpx+"px";
				}
				if(!quote) quote=chart.dataSet[chart.dataSet.length-1]; // Future ticks based off the value of the current quote
		
				// Y axis positioning logic
				
				var height=marker.params.chartContainer?stx.height:panel.yAxis.bottom;
				var bottom;
				if(useHighs){
					bottom=Math.round(height-stx.pixelFromPriceTransform(quote.High, panel, yAxis))+"px";
				}else{
					bottom=Math.round(height-stx.pixelFromPriceTransform(quote.Close, panel, yAxis))+"px";
				}
				if(node.style.bottom!=bottom) node.style.bottom=bottom;
			}
		};
		
		
		/**
		 * Placement functions are responsible for positioning markers in their holder. They are called directly form the draw() function in the animation loop. 
		 * Each Marker placement handler must have a corresponding `placementFunction` or this method will be used.
		 * 
		 * `firstTick` and `lastTick` can be used as a hint as to whether to display a marker or not.
		 * 
		 * See {@link STX.Marker} and {@tutorial Markers} for more details
		 * @memberOf  STXChart
		 * @param {Object} params The parameters
		 * @param {Array} params.arr The array of markers
		 * @param {Object} params.panel The panel to display
		 * @param {Number} params.firstTick The first tick displayed on the screen
		 * @param {Number} params.lastTick The last tick displayed on the screen
		 * @since 2015-09-01 On prior versions you must define your own default function. Example: STXChart.prototype.defaultMarkerPlacement = STX.Marker.AboveCandle.placementFunction;
		 */
		STXChart.prototype.defaultMarkerPlacement=function(params){
			STX.Marker.AboveCandle.placementFunction(params);
		};

		/**
		 * @name STX.Marker.NodeCreator
		 * @constructor
		 */
		STX.Marker.NodeCreator=function(){};

		STX.Marker.NodeCreator.toNode=function(){
			return this.node;
		};

		/**
		 * Constructor for basic built-in markers.
		 * @name STX.Marker.Simple
		 * @constructor
		 * @param {Object} params Parameters to describe the marker
		 * @param {String} params.type The marker type "circle", "square", "callout"
		 * @param {String} params.headline The headline text to display
		 * @param {String} [params.category] The category "news", "earningsUp", "earningsDown", "dividend", "filing", "split"
		 * @param {String} [params.story] The story to display when hovered
		 */
		STX.Marker.Simple=function(params){
			this.node=document.createElement("div");
			this.node.className="stx-marker";
			STX.appendClassName(this.node, params.type);
			if(params.category) STX.appendClassName(this.node, params.category);
			STX.newChild(this.node, "div", "stx-stem");

			var expand;
			if(params.type=="callout"){
				var content=STX.newChild(this.node, "div", "stx-marker-content");
				STX.newChild(content, "h4", null, params.headline);
				expand=STX.newChild(content, "div", "stx-marker-expand");
				STX.newChild(expand, "p", null, params.story);
			}else{
				expand=STX.newChild(this.node, "div", "stx-marker-expand");
				STX.newChild(expand, "h4", null, params.headline);
				STX.newChild(expand, "p", null, params.story);
			}
			var node=this.node;
			STX.safeClickTouch(this.node, function(e){
				STX.toggleClassName(node, "highlight");
			});
		};

		STX.Marker.Simple.stxInheritsFrom(STX.Marker.NodeCreator, false);


		return _exports;
		
	}

	{
		if ( typeof define === "function" && define.amd ) {
			define( ["stxLibrary"], function(_stxLibrary) { return _stxAdvanced_js(_stxLibrary); } );
		}else{	
			var _stxLibrary={
				"STX":window.STX,
				"STXChart":window.STXChart,
				"$$":window.$$,
				"$$$":window.$$$
			};
			var _=_stxAdvanced_js(_stxLibrary);
		}
	}

})();



