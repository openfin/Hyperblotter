

//-------------------------------------------------------------------------------------------
// Copyright 2012 by ChartIQ LLC
// All rights reserved
//-------------------------------------------------------------------------------------------

(function(){

	function _stxKernel_js(_stxThirdParty,_exports) {
		
		var plotSpline=_stxThirdParty.plotSpline;
		var timezoneJS=_stxThirdParty.timezoneJS;
		var STX=_exports.STX;
		var STXChart=_exports.STXChart;
		var $$=_exports.$$;
		var $$$=_exports.$$$;
	
		STXChart.prototype.plugins={};	// Placeholder for plugin data sets
		
		if(STX.isSurface){
			STX.gesture=new MSGesture;
			STX.gesture.target=document.body;
			STX.gesturePointerId=null;
		}
		
		/*
		 * remove the items from chart and into stx
		 */
		
		/**
		 * Defines raw html for the chart controls. These can be overridden by manually placing HTML elements in the chart container
		 * with the same ID. To completely disable a chart control, programatically set chart[controlID]=null where controlID is the control to disable.
		 * Note that only some controls can be disabled.
		 * @type {Object}
		 * @memberOf STXChart
		 */
		STXChart.htmlControls={
				"annotationSave":'<span class="stx-btn stx_annotation_save">save</span>',
				"annotationCancel":'<span class="stx-btn stx_annotation_cancel" style="margin-left:10px;">cancel</span>',
				"mSticky":'<div id="mSticky"> <span id="mStickyInterior"></span> <span id="overlayTrashCan" class="stx-btn" style="display:none"><span class="stx-ico-trash">&nbsp;</span></span> <span id="mouseDeleteInstructions"><span>(</span>right-click to delete<span>)</span></span></div>',
				"floatHR":'<div class="stx-float-price" style="display: none;"><canvas width="100" height="20" class="stx-float-price-canvas"></canvas><div class="stx-float-price-inner"></div></div>',
				"crossX":'<div class="stx_crosshair stx_crosshair_x" style="display: none;"></div>',
				"crossY":'<div class="stx_crosshair stx_crosshair_y" style="display: none;"></div>',
				"chartControls":'<div class="stx_chart_controls" style="display: none; bottom: 22px;"><div id="chartSize"><span id="zoomOut" class="stx-zoom-out">-</span><span id="zoomIn" class="stx-zoom-in">-</span></div></div>',
				"home":'<div id="home" class="stx_jump_today home stx-btn" style="display:none"><span></span></div>',
				"floatDate":'<div class="stx-float-date" style="display: none;"></div>',
				"handleTemplate":'<div class="stx-ico-handle" style="display: none;"><span></span></div> ',
				"iconsTemplate":'<div class="stx-panel-control" style="display: none;"><div class="stx-panel-title"></div><div class="stx-btn stx-ico"><span class="stx-ico-up">&nbsp;</span></div><div class="stx-btn stx-ico"><span class="stx-ico-focus">&nbsp;</span></div><div class="stx-btn stx-ico"><span class="stx-ico-down">&nbsp;</span></div><div class="stx-btn stx-ico"><span class="stx-ico-edit">&nbsp;</span></div><div class="stx-btn stx-ico"><span class="stx-ico-close">&nbsp;</span></div></div>'
		};
		
		/**
		 * Registers the Chart controls and attaches event handlers to the zoom and home controls.
		 * @private
		 * @memberOf STXChart
		 */
		STXChart.prototype.registerHTMLElements=function(){
			var c=this.chart.container;
			for(var control in STXChart.htmlControls){
				if(typeof this.chart[control]=="undefined"){
					var el=$$$("#" + control, c);
					if(el){
						this.chart[control]=el;
						this.controls[control]=el;
					}else{
						var rawHTML=STXChart.htmlControls[control];
						var div=document.createElement("DIV");
						div.innerHTML=rawHTML;
						el=div.firstChild;
						c.appendChild(el);
						this.chart[control]=el;
						this.controls[control]=el;
						el.id=control;
					}
				}
			};
			if(this.controls.chartControls){
				var zoomIn=$$$("#zoomIn", this.controls.chartControls);
				var zoomOut=$$$("#zoomOut", this.controls.chartControls);
		
				zoomIn.onmouseover=(function(self){return function(e){ self.modalBegin();};})(this);
				zoomIn.onmouseout=(function(self){return function(e){ self.modalEnd();};})(this);
				zoomOut.onmouseover=(function(self){return function(e){ self.modalBegin();};})(this);
				zoomOut.onmouseout=(function(self){return function(e){ self.modalEnd();};})(this);
			}
			if(this.controls.home) this.controls.home.onclick=(function(self){return function(e){ self.home();};})(this);
		};
		/*
		STXChart.prototype.resolveCSSName=function(style, name){
			if(name.indexOf('-')!=-1){
				if(style[name]) return style[name];
				name=name.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });
				return style[name];
			}else{
				if(style[name]) return style[name];
				name=name.replace(/([a-z][A-Z])/g, function (g) { return g[0] + '-' + g[1].toLowerCase(); });
				return style[name];
			}
		};
		*/
		
		STX.camelCaseRegExp=/-([a-z])/g;
		/**
		 * Converts from hyphenated to camel case. Used primarily for converting css style names (which are hyphenated) to property values (which are camel case)
		 * @param  {string} name Hyphenated style name
		 * @return {string}      Camel case style name
		 * @memberOf STX
		 */
		STX.makeCamelCase=function(name){
			return name.replace(STX.camelCaseRegExp, function (g) { return g[1].toUpperCase(); });
		};
		
		/**
		 * Clones a style from a style object (obtained from getComputedStyle). Any styles are converted to camel case. This method automatically
		 * converts from browsers that store styles as numeric arrays rather than as property objects.
		 * @param  {object} div A style object derived from getComputedStyle
		 * @return {object}     A style object that will match properties
		 * @memberOf STXChart
		 */
		STXChart.prototype.cloneStyle=function(styleObject){
			var rc={};
			for(var i in styleObject){
				var v=styleObject[i];
				if(!isNaN(i)){
					var x=styleObject.getPropertyValue(v);
					if(x){
						//var vcc=v.replace(STX.camelCaseRegExp, function (g) { return g[1].toUpperCase(); })
						// much more efficient camel case conversion algorithm
						var vcc="";
						v=v.split("-");
						var ii=0; jj=v.length;
						while(++ii<jj){
							vcc += v[ii].charAt(0).toUpperCase() + v[ii].slice(1);
						}
						rc[vcc]=x;
					}
				}else{
					var icc=i.replace(STX.camelCaseRegExp, function (g) { return g[1].toUpperCase(); })
					rc[icc]=v;
				}
			}
			return rc;
		};
		
		/**
		 * Returns an object containing the class style given a css class name (used by plotLine() for instance). A caching mechanism is used
		 * for performance. If styles are changed dynamically then use STXChart.prototype.clearStyles to reset.
		 * @param  {string} className The CSS class name to get the styles
		 * @return {object}           An object containing each style, in camel case.
		 * @memberOf STXChart
		 */
		STXChart.prototype.canvasStyle=function(className){
			var s=this.styles[className];
			if(!s){
				var div=document.createElement("div");	// Create a dummy div
				div.className=className;
				document.body.appendChild(div);
				var styles=getComputedStyle(div);
				s=this.styles[className]=this.cloneStyle(styles);
				document.body.removeChild(div);
				if(!styles){	// css not initialized, possibly hidden iframe in firefox
					this.styles[className]=null;
				}
			}
			return s;
		};
		
		/**
			Call this to remove all of the loaded canvas styles, for instance after loading a new css file
			@memberOf STXChart
		*/
		STXChart.prototype.clearStyles=function(){
			this.styles={};
		};
		
		/**
		* Convenience method to set a style on the chart
		 * @param  {string} obj The object whose style you wish to change (stx_grid, stx_xaxis, etc)
		 * @param  {string} attribute The style name of the object you wish to change
		 * @param  {string} value The value to assign to the attribute
		 * @memberOf STXChart
		*/
		STXChart.prototype.setStyle=function(obj, attribute, value){
			if(!this.styles[obj]){
				this.canvasStyle(obj);
			}
			if(!this.styles[obj])
				this.styles[obj]={};
			this.styles[obj][STX.makeCamelCase(attribute)]=value;
		};
	
		/**
		 * Sets canvas font context given a css class name. Supports fontStyle, fontWeight, fontSize and fontFamily.
		 * @param  {string} className The name of the CSS class to pull font from
		 * @param  {external:CanvasRenderingContext2D} ctx       An HTML Context
		 * @memberOf STXChart
		 */
		STXChart.prototype.canvasFont=function(className,ctx){
			if(!ctx) ctx=this.chart.context;
			var style=this.canvasStyle(className);
			if(!style) return;
		
			var result=style["fontStyle"]
				+" "+style["fontWeight"]+" "+style["fontSize"]
				+" "+style["fontFamily"];
			if(result.indexOf("undefined")==-1){
				ctx.font=result;
			}else{
				this.styles[className]=null;
				console.log("bad css style for class " + className);
			}
		};
		
		/**
		 * Sets color and globalAlpha (opacity) for the canvas given a css class name. Call this before drawing on the canvas.
		 * @param  {string} className A CSS style. Supports "color" and "opacity"
		 * @param  {external:CanvasRenderingContext2D} [ctx]       An HTML Context
		 * @example
		 * stxx.canvasColor("myStyle");
		 * // draw a line using canvas primitives, will be color defined in .myStyle
		 * @memberOf STXChart
		 */
		STXChart.prototype.canvasColor=function(className,ctx){
			if(!ctx) ctx=this.chart.context;
			var style=this.canvasStyle(className);
			if(!style) return;
			var color=style["color"];
			if(STX.isTransparent(color)) color=this.defaultColor;
			ctx.globalAlpha=1;
			ctx.fillStyle=color;
			ctx.strokeStyle=color;
			var opacity=style["opacity"];
			if(typeof opacity!="undefined") ctx.globalAlpha=opacity;
		};
		
		/**
		 * Returns the font size defined by the requested class name. Defaults to 12 if undefined. Use this to determine vertical heights so that lettering isn't clipped.
		 * @param  {string} className Class name
		 * @return {number}           The font size (px is stripped)
		 * @memberOf STXChart
		 */
		STXChart.prototype.getCanvasFontSize=function(className){
			var s=this.canvasStyle(className);
			var fs=s["fontSize"];
			if(!fs) fs="12";
			return parseInt(STX.stripPX(fs));
		};
		
		/**
		 * Returns the canvas color specified in the class name
		 * @param  {string} className The class name
		 * @return {string}           The color specified (May be undefined if none specified)
		 * @memberOf STXChart
		 */
		STXChart.prototype.getCanvasColor=function(className){
			var s=this.canvasStyle(className);
			return s.color;
		};
		
		STXChart.hideDates=function(){
			return false;
		};
		
		
		/**
		 * Runs the prepend injections. A prepend function that returns true will short circuit any proceeding prepend functions, and the core functionality.
		 * @private
		 * @param  {string} o    The function name
		 * @param  {arguments} args The arguments to the function
		 * @param  {object} self The this object
		 * @return {boolean}      Returns true if any prepend function returns true.
		 * @memberOf STXChart
		 */
		STXChart.prototype.runPrepend=function(o, args, self){
			var prepends=this["prepend"+o];
			if(!prepends) return false;
			if(!self) self=this;
			for(var i=0;i<prepends.length;i++){
				var rv=prepends[i].apply(self,args);
				if(rv) return rv;
			}
			return false;
		};
		
		/**
		 * Runs the append injections. An append function that returns true will short circuit any proceeding append functions (but not the core functionality since that has already ocurred).
		 * @private
		 * @param  {string} o    The function name
		 * @param  {arguments} args The arguments to the function
		 * @param  {object} self The this object
		 * @return {boolean}      Returns true if any append function returns true.
		 * @memberOf STXChart
		 */
		STXChart.prototype.runAppend=function(o, args, self){
			var appends=this["append"+o];
			if(!appends) return false;
			if(!self) self=this;
			for(var i=0;i<appends.length;i++){
				var rv=appends[i].apply(self,args);
				if(rv) return rv;
			}
			return false;
		};
		
		/**
		 * Registers a drawing tool. This is typically done using lazy eval.
		 * @private
		 * @param  {string} name Name of drawing tool
		 * @param  {function} func Constructor for drawing tool
		 * @memberOf STXChart
		 */
		STXChart.registerDrawingTool=function(name, func){
			STXChart.drawingTools[name]=func;
		};
		
		STXChart.prototype.createBlock=function(left, width, top, height, className, context){
		    if(context==null) context=this.chart.context;
		    if(typeof(height)=="undefined"){
		    	return;
		    }
		    this.canvasColor(className,context);
		    context.fillRect(left, top, width, height);
		    context.globalAlpha=1;
		};
		
		/**
		 * This is called whenever a change to layout or drawings occurs. If this.changeCallback has a function registered then
		 * that function will be called with the change. The change itself is not passed in. The layout or drawings can be inspected to find the change but
		 * typically the entire set of drawings or entire layout is desired and it is mostly just necessary to know that they have changed so that they
		 * can be saved.
		 * @param  {string} change Type of change that occurred. Either "layout" or "vector" (drawing change)
		 * @memberOf STXChart
		 */
		STXChart.prototype.changeOccurred=function(change){
			if(this.currentlyImporting) return;	// changes actually occurring because of an import, not user activity
			if(this.changeCallback) this.changeCallback(this, change);
		};
		
		/**
		 * Sets the base chart type to "line", "candle", "bar", "wave", “colored_bar”, "colored line", “hollow_candle”,”scatterplot”, "baseline_delta"
		 * @param {string} chartType The chart type
		 * @memberOf STXChart
		 */
		STXChart.prototype.setChartType=function(chartType){
			this.layout.chartType=chartType;
			if(this.chart.canvas!=null) this.draw();
			this.changeOccurred("layout");
		};

		/**
		 * Sets the base aggregation type to "range” or "ohlc"
		 * @param {string} chartType The chart type
		 * @memberOf STXChart
		 */
		STXChart.prototype.setAggregationType=function(aggregationType){
			this.layout.aggregationType=aggregationType;
			if(this.chart.canvas!=null){
				this.createDataSet();
				this.draw();
			}
			this.changeOccurred("layout");
		};

		/**
		 * Sets the charts to adjusted values rather than standard values. Adjusted values are calculated outside of the chart engine (and may be splits, dividends or both).
		 * When charts are using adjusted values, a computed ratio for each tick is used for price to pixel calculations which keeps drawings accurate
		 * @param {boolean} data True to use adjusted values (Adj_Close), false to use Close values
		 * @memberOf STXChart
		 */
		STXChart.prototype.setAdjusted=function(data){
			this.layout.adj=data;
			if(this.chart.canvas!=null){
				this.createDataSet();
				this.draw();
			}
			this.changeOccurred("layout");
		};
		
		/**
		 * Turns on or off the volume underlay indicator
		 * @param {boolean} data True to turn on the underlay
		 * @memberOf STXChart
		 * @deprecated
		 */
		STXChart.prototype.setVolumeUnderlay=function(data){
			this.layout.volumeUnderlay=data;
			if(this.chart.canvas!=null) this.draw();
			this.changeOccurred("layout");
		};
		
		/**
		 * Serializes all of the drawings on the chart(s) so that they can be saved to an external database and later reconstructed
		 * with {@link STXChart#reconstructDrawings}.
		 * @return {array} An array of all of the drawing serializations
		 * @memberOf STXChart
		 */
		STXChart.prototype.serializeDrawings=function(){
			var arr=[];
			for(var i=0;i<this.drawingObjects.length;i++){
				arr.push(this.drawingObjects[i].serialize());
			}
			return arr;
		};
		
		/**
		 * Causes all drawings to delete themselves. External access should be made through @see STXChart.prototype.clearDrawings
		 * @private
		 * @memberOf STXChart
		 */
		STXChart.prototype.abortDrawings=function(){
			for(var i=0;i<this.drawingObjects.length;i++){
				this.drawingObjects[i].abort(true);
			}
			this.drawingObjects=[];
		};
		
		/**
		 * Reconstructs drawings from an array originally created by {@link STXChart#serializeDrawings}
		 * @param  {array} arr An array of serialized drawings
		 * @memberOf STXChart
		 */
		STXChart.prototype.reconstructDrawings=function(arr){
			for(var i=0;i<arr.length;i++){
				var rep=arr[i];
				var Factory=STXChart.drawingTools[rep.name];
				if(!Factory){
					if(STX.Drawing[rep.name]){
						Factory=STX.Drawing[rep.name];
						STXChart.registerDrawingTool(rep.name, Factory);
					}
				}
				if(Factory){
					var drawing=new Factory;
					drawing.reconstruct(this, rep);
					this.drawingObjects.push(drawing);
				}
			}
		};
		
		/**
		 * Clears all the drawings on the chart. (Do not call abortDrawings directly).
		 * @memberOf STXChart
		 */
		STXChart.prototype.clearDrawings=function(){
			this.undoStamp();
			this.abortDrawings();
			this.changeOccurred("vector");
			this.createDataSet();
			this.draw();
		};
		
		/**
		 * Creates a new drawing of the specified type with the specified parameters.
		 * @param  {string} type       Drawing name
		 * @param  {object} parameters Paramters that describe the drawing
		 * @return {STX.Drawing}            A drawing object
		 * @memberOf STXChart
		 */
		STXChart.prototype.createDrawing=function(type, parameters){
			var drawing=new STX.Drawing[type];
			drawing.reconstruct(this, parameters);
			this.drawingObjects.push(drawing);
			this.draw();
			return drawing;
		};
		
		/**
		 * Removes the drawing. Drawing object should be one returned from {@link STXChart#createDrawing}
		 * @param  {Object} drawing Drawing object
		 * @memberOf STXChart
		 */
		STXChart.prototype.removeDrawing=function(drawing){
			for(var i=0;i<this.drawingObjects.length;i++){
				if(this.drawingObjects[i]==drawing){
					this.drawingObjects.splice(i,1);
					this.changeOccurred("vector");
					this.draw();
					return;
				}
			}
		};
		
		//TODO, use a smarter algorithm to home in on the tick rather than simply incrementing when outside of dataSet
		//
		/**
		 * Returns a date (in yyyymmddhhmm form) give a tick (location in the dataSet). If the tick lies outside of the dataSet then the date will
		 * be arrived at algorithmically by calculating into the past or future
		 * @param  {number} tick  Location in the dataSet (use {@link STXChart#dateFromBar} for dataSegment)
		 * @param  {STX.Chart} [chart] An optional chart object
		 * @return {string}       The date in yyyymmddhhmm form
		 * @todo  Return native date rather than string date
		 * @memberOf STXChart
		 */
		STXChart.prototype.dateFromTick=function(tick, chart){
			if(!chart) chart=this.chart;
			var interval=this.layout.interval;
			var periodicity=this.layout.periodicity;
			var l=chart.dataSet.length;
			if(tick<l && tick>=0) return chart.dataSet[tick].Date;
			if(tick<0){
				var dt=chart.dataSet[0].DT;
				for(var i=0;i<3000;i++){
					if(-i==tick) return STX.yyyymmddhhmm(dt);
					if(!this.isDailyInterval(interval)) dt=STX.LegacyMarket.prevPeriod(dt, interval, periodicity, this);
					else if(interval=="day") dt=STX.LegacyMarket.prevDay(dt, periodicity, this);
					else if(interval=="week") dt=STX.LegacyMarket.prevWeek(dt, periodicity, this);
					else if(interval=="month") dt=STX.LegacyMarket.prevMonth(dt, periodicity, this);
				}
			}else{
				var dt=chart.dataSet[l-1].DT;
				for(var i=0;i<3000;i++){
					if(l-1+i==tick){
						return STX.yyyymmddhhmm(dt);
					}
					if(!this.isDailyInterval(interval)) dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this);
					else if(interval=="day") dt=STX.LegacyMarket.nextDay(dt, periodicity, this);
					else if(interval=="week") dt=STX.LegacyMarket.nextWeek(dt, periodicity, this);
					else if(interval=="month") dt=STX.LegacyMarket.nextMonth(dt, periodicity, this);
				}
			}
			return STX.yyyymmddhhmm(dt);
		};
		
		
		
		//TODO, use a smarter algorithm to home in on the tick rather than simply incrementing
		/**
		 * Calculates the future tick for the given date
		 * @private
		 * @param  {string} mydt  Date in string format
		 * @param  {STX.Chart} chart Chart object
		 * @return {number}       The tick relative to the dataSet
		 * @todo  Do not use string form of Dates
		 * @memberOf STXChart
		 */
		STXChart.prototype.futureTick=function(mydt, chart){
			var mym=STX.strToDateTime(mydt).getTime();
			var interval=this.layout.interval;
			var periodicity=this.layout.periodicity;
			var dt=chart.dataSet[chart.dataSet.length-1].DT;
			var m=dt.getTime();
			var ticks=0;
		
			var computedPeriodicity=periodicity;
			if(!this.isDailyInterval(interval)){
				if(interval!="minute")
					computedPeriodicity=periodicity*interval;
			}
			for(var i=0;i<1500;i++){	// In the future?
				if(!this.isDailyInterval(interval)){
					if(dt.getHours()==chart.beginHour && dt.getMinutes()==chart.beginMinute){
						if((mym-m)/60000>chart.minutesInSession){
							dt=STX.LegacyMarket.nextDay(dt, 1, this);
							if(chart.beginHour==0 && dt.getDay()==0){
								dt.setHours(15);
								dt.setMinutes(0);
							}
							if(chart.beginHour==0 && dt.getDay()==1){
								ticks+=Math.round(9*60/computedPeriodicity);	// Only 9 hours elapse between Sunday open session and midnight
							}else{
								ticks+=Math.round(chart.minutesInSession/computedPeriodicity);
							}
						}else{
							dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this);
							ticks+=1;
						}
					}else{
						dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this);
						ticks+=1;
					}
				}else{
					ticks+=1;
					if(interval=="day") dt=STX.LegacyMarket.nextDay(dt, periodicity, this);
					else if(interval=="week") dt=STX.LegacyMarket.nextWeek(dt, periodicity, this);
					else if(interval=="month") dt=STX.LegacyMarket.nextMonth(dt, periodicity, this);
				}
				m=dt.getTime();
				if(m==mym){
					return (chart.dataSet.length-1)+ticks;
				}
				if(mym<m){
					return (chart.dataSet.length-1)+ticks-1;
				}
			}
			return (chart.dataSet.length-1)+ticks;
		};
		
		//TODO, use a smarter algorithm to home in on the tick rather than simply decrementing
		////TODO, use a smarter algorithm to home in on the tick rather than simply incrementing
		/**
		 * Calculates the past tick for the given date
		 * @private
		 * @param  {string} mydt  Date in string format
		 * @param  {STX.Chart} chart Chart object
		 * @return {number}       The tick relative to the dataSet
		 * @todo  Do not use string form of Dates
		 * @memberOf STXChart
		 */
		STXChart.prototype.pastTick=function(mydt, chart){
			var mym=STX.strToDateTime(mydt).getTime();
			var interval=this.layout.interval;
			var periodicity=this.layout.periodicity;
			var dt=chart.dataSet[0].DT;
			var m=dt.getTime();
			var ticks=0;
		
			var computedPeriodicity=periodicity;
			if(!this.isDailyInterval(interval)){
				if(interval!="minute")
					computedPeriodicity=periodicity*interval;
			}
			for(var i=0;i<1500;i++){	// In the past?
				if(!this.isDailyInterval(interval)){
					if(dt.getHours()==chart.beginHour && dt.getMinutes()==chart.beginMinute){
						var dt2=STX.LegacyMarket.prevDay(dt, 1, this);
						if((dt2.getTime()-mym)/60000>chart.minutesInSession){
							dt=dt2;
							if(chart.beginHour==0){
								if(dt.getDay()==0){
									ticks+=Math.round(9*60/computedPeriodicity);	// Forex, 9 hours of trading on Sunday
								}else{
									ticks+=Math.round(chart.minutesInSession/computedPeriodicity);
								}
							}else if(chart.beginHour==9 && STX.LegacyMarket.isHalfDay(dt, chart.symbol)){
								ticks+=Math.round(210/computedPeriodicity);
							}else{
								ticks+=Math.round(chart.minutesInSession/computedPeriodicity);
							}
						}else{
							dt=STX.LegacyMarket.prevPeriod(dt, interval, periodicity, this);
							ticks+=1;
						}
					}else{
						dt=STX.LegacyMarket.prevPeriod(dt, interval, periodicity, this);
						ticks+=1;
					}
				}else{
					ticks+=1;
				}
				if(interval=="day") dt=STX.LegacyMarket.prevDay(dt, periodicity, this);
				else if(interval=="week") dt=STX.LegacyMarket.prevWeek(dt, periodicity, this);
				else if(interval=="month") dt=STX.LegacyMarket.prevMonth(dt, periodicity, this);
				m=dt.getTime();
				if(m==mym){
					return -ticks;
				}
				if(mym>m){
					return -(ticks+1);
				}
			}
			return -ticks;
		};
		

		/**
		 * Calculates and sets the value of zoom and scroll for y-axis. For convenience, you can set yAxis.initialMarginTop or yAxis.initialMarginBottom.
		 * This method will automatically translate those into starting scroll and zoom factors
		 * @param {STXChart.YAxis} yAxis The yAxis to reset
		 * @memberOf STXChart
		 */
		STXChart.prototype.calculateYAxisMargins=function(yAxis){
			yAxis.zoom=yAxis.initialMarginTop+yAxis.initialMarginBottom;
			yAxis.scroll=(yAxis.initialMarginTop-yAxis.initialMarginBottom)/2;
		};

		/**
		 * <span class="injection">INJECTABLE</span> 
		 * 
		 * Returns the chart to the home position, where the most recent tick is on the right side of the screen. Note that
		 * this does not adjust for STXChart.preferences.whitespace
		 * @memberOf STXChart
		 */
		STXChart.prototype.home=function(){
			if(this.runPrepend("home", arguments)) return;
			this.cancelTouchSingleClick=true;
			if(!this.chart.dataSet || this.chart.dataSet.length==0) return;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				chart.scroll=Math.min(chart.maxTicks,chart.dataSet.length);
				if(this.yaxisLabelStyle=="roundRectArrow"){
					// Special case when we have a pointy arrow we want the current tick to be right
					// at the arrow point, not buried underneath it
					var margin=3; // should be the same from createYAxisLabel
					var height=this.getCanvasFontSize("stx_yaxis")+margin*2;
					var leftMargin=height / 2;
					var wsInTicks=Math.round(leftMargin/this.layout.candleWidth);
					chart.scroll-=wsInTicks;

				}
				this.calculateYAxisMargins(chart.panel.yAxis);
				//chart.verticalScroll=0;
				//chart.zoom=0;
			}
			this.draw();
			this.runAppend("home", arguments);
		};
		
		/**
		 * Returns the tick (position in dataSet) given the requested date. The date does not need to match exactly. If the date lies between ticks
		 * then the later will be returned. If the date lies before or after the chart then {@link STXChart#futureTick} or {@link STXChart#pastTick} will
		 * be used to calculate the tick location.
		 * @param  {string} dt    Date in string foramt
		 * @param  {STX.Chart} [chart] Optional chart object
		 * @return {number}       The tick location
		 * @todo  Use native dates instead of string form dates.
		 * @memberOf STXChart
		 */
		STXChart.prototype.tickFromDate=function(dt, chart){
			if (!chart.dataSet.length) return 0;
			if(!chart) chart=this.chart;
			var DT=STX.strToDateTime(dt);
			// A date that was set on a daily chart, for instance from a drawing, will have midnight as the hour (00:00)
			// But for non 24 hour trading markets, this will arrive at an innaccurate tick on intraday charts
			// so we force the hour to the market open in this circumstance
			if(chart.beginHour!=0 && !STXChart.isDailyInterval(this.layout.interval)){
				if(DT.getHours()==0){
					DT.setHours(chart.beginHour);
					DT.setMinutes(chart.beginMinute);
				}
			}
			var mym=DT.getTime();
			var m=chart.dataSet[chart.dataSet.length-1].DT.getTime();
			if(m<mym) return this.futureTick(dt, chart);
			var first=chart.dataSet[0].DT.getTime();
			if(mym<first) return this.pastTick(dt, chart);
			//TODO, binary search would be faster
			for(var i=chart.dataSet.length-1;i>=0;i--){
				m=chart.dataSet[i].DT.getTime();
				if(m<=mym) return i;
			}
		};
		
		/**
		 * Shifts a date based on the currently set timezone
		 * @private
		 * @param  {Date} dt JavaScript Date object
		 * @return {Date}    A Date object shifted so that it represents the currently selected time zone
		 * @memberOf STXChart
		 */
		STXChart.prototype.timeShiftDate=function(dt){
			var ms=dt.getTime();
			ms+=this.timeZoneOffset*60000;
			return new Date(ms);
		};

		/**
		 * This is the object stored in STXChart.chart.xaxis which contains information regarding an x-axis tick.
		 * See {@link STXChart#createXAxis} for more detail.
		 * @property {number} hz Horizontal position of center of label in pixels
		 * @property {string} text The text to display in the label
		 * @property {string} grid Either "line" or "boundary" depending on whether the label should be a date/time boundary or just a grid line
		 * @class
		 * @memberof STXChart
		 */
		STXChart.XAxisLabel=function(hz, grid, text){
			this.hz=hz;
			this.grid=grid;
			this.text=text;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Call this method to create the X axis (date axis).
		 * The default implementation will calculate future dates based on STX.LegacyMarket.nextPeriod(), STX.LegacyMarket.nextDay(), and STX.LegacyMarket.nextWeek()
		 * Those functions subsequently utilize the STX.LegacyMarket.isHoliday() function. You can override the STXChart.hideDates() method to hide the dates but keep the grid lines. Use css styles stx_xaxis and stx_xaxis_dark to control colors and fonts for the dates. Use css styles stx_grid and stx_grid_dark to control the grid line colors. The dark styles are used when the grid changes to a major point such as the start of a new day on an intraday chart, or a new month on a daily chart.
		 * This method is algorithmically designed to create an x-axis that is responsive to various degrees of user panning, zooming, and periodicity selection.
		 * It will print different versions of dates or times depending on those factors, attempting to prevent overlaps and evenly spacing labels.
		 * If a locale is set, then internationalized dates will be used.
		 *
		 * The stx-axis class can be used to override the font.
		 * 
		 * This method sets the STXChart.chart.xaxis array which is a representation of the complete x-axis including future dates.
		 * Each array entry contains an object:<br>
		 * DT – The date/time displayed on the x-axis<br>
		 * date – yyyymmddhhmm string representation of the date<br>
		 * data – If the xaxis coordinate is in the past, then a reference to the chart data element for that date<br>
		 *
		 * @example
		 *
		 * //The optional global STXChart.chart.prettyXaxis can be used to further control the x-axis label placement for intraday charts:
		 *
		 * stxx.chart.prettyXaxis={
		 *    "1":30, // specify that on one minute charts, x-axis labels should land on 30 minute marks
		 *    "5":60, // specify that on five minute charts, x-axis labels should land on hourly marks
		 *    "10":60,
		 *    "15":60,
		 *    "30":240, // specify that on thirty minute charts, x-axis labels should land on 4 hour marks
		 *    "60":10000, // On hourly charts, for instance, we only want to show dates (no times) so set the minute value greater than one day
		 *    "240":10000
		 * };
		 * @param  {STXChart.Chart} chart	The chart to create an x-axis for
		 * @return {STXChart.XAxisLabel[]} 			axisRepresentation that can be passed in to {@link STXChart#drawXAxis}
		 * @memberOf STXChart
		 */
		STXChart.prototype.createXAxis=function(chart){
			if(chart.dataSegment.length<=0) return null;
			var arguments$=[chart];
			var axisRepresentation=this.runPrepend("createXAxis", arguments$);
			if(axisRepresentation) return axisRepresentation;
			var interval=this.layout.interval;
			if(interval=="tick" || chart.xAxis.axisType=="ntb" || this.layout.aggregationType=="rangebars"){
				return this.createTickXAxisWithDates(chart);
			}
			if(chart.xAxis.axisType=="numeric"){
				return this.createNumericXAxis(chart);
			}

			var displayLetters=false;
			var periodicity=this.layout.periodicity;
			var candleWidth=this.layout.candleWidth;
			var p=periodicity;
			var isIntraday=false;
			var isDaily=false;
			var isWeekly=false;
			var isMonthly=false;
		
			if(interval=="week"){
				isWeekly=true;
				p=5*p;
			}
			if(interval=="month"){
				isMonthly=true;
				p=20*p;
			}
			if(candleWidth*(20/p)<50)
				displayLetters=true;
			var i=0;
			chart.xaxis=[];
			for(;i<chart.maxTicks;i++){
				if(chart.dataSegment[i]!=null) break;
				chart.xaxis.push(null);
			}
			var dt;
			if(chart.dataSegment[i]){
				dt=chart.dataSegment[i].DT;
			}else{
				dt=new Date();
			}
			var currentDate=dt.getDate();
			var is24=(chart.minutesInSession==1440);
			if(is24){
				if(chart.dataSegment[i] && chart.dataSegment[i].displayDate){
					currentDate=chart.dataSegment[i].displayDate.getDate();
				}else{
					currentDate=this.timeShiftDate(dt).getDate();
				}
			}
			var prevMonth=dt.getMonth();
			var prevYear=dt.getFullYear();
			var ticksPerDay=1;
			if(!this.isDailyInterval(interval)){
				isIntraday=true;
				if(interval=="minute") interval=1;
				ticksPerDay=Math.ceil(chart.minutesInSession/periodicity/interval);
			}else{
				isDaily=true;
			}
			var ticksPerClick=Math.round(ticksPerDay/Math.ceil(ticksPerDay/Math.floor(100/candleWidth)));
			if(ticksPerClick<1) ticksPerClick=1;
		
			var minuteBoundary=ticksPerClick*periodicity*interval;
		
			if(chart.prettyXaxis){
				var mod=chart.prettyXaxis[periodicity*interval];
				if(!mod) mod=1;
				if(minuteBoundary!=mod){
					minuteBoundary=Math.floor((minuteBoundary+mod)/mod)*mod;
				}
			}
			var offset=Math.round(Math.round(candleWidth*this.candleWidthPercent)/2-1);

			axisRepresentation=[];
		
			var standardBeginDay=chart.beginHour*60 + chart.beginMinute;

			for(i;i<=chart.maxTicks;i++){
				if(!isMonthly && chart.maxTicks/ticksPerDay<(this.chart.width/this.chart.xaxisFactor)){
					var prices;
					if(i<chart.dataSegment.length){
						prices=chart.dataSegment[i];
						if(!prices) continue;
						dt=prices.DT;
						if(chart.xAxis.useDataDate){
							dtShifted=dt;
						}else if(prices.displayDate){
							dtShifted=prices.displayDate;
						}else if(isIntraday){
							dtShifted=this.timeShiftDate(dt);
						}else{
							dtShifted=dt;
						}
					}else{
						if(!chart.xAxis.futureTicks) break;
						if(isIntraday) dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this);
						else if(isWeekly) dt=STX.LegacyMarket.nextWeek(dt, periodicity, this);
						else if(isMonthly) dt=STX.LegacyMarket.nextMonth(dt, periodicity, this);
						else if(isDaily) dt=STX.LegacyMarket.nextDay(dt, periodicity, this);
						if(chart.xAxis.useDataDate) dtShifted=dt;
						else if(isIntraday) dtShifted=this.timeShiftDate(dt);
						else dtShifted=dt;
					}
					var isNextDate=dt.getDate()!=currentDate;
					if(is24) isNextDate=dtShifted.getDate()!=currentDate;
		
					var nonBoundary=dt.getHours()!=chart.beginHour || dt.getMinutes()!=chart.beginMinute;
					if(is24) nonBoundary=dtShifted.getHours()!=0 || dtShifted.getMinutes()!=0;
		
					if(isNextDate){	// Next date, midnight or market close
						var gridType="boundary";
						if(!isIntraday) gridType="line";
						currentDate=dt.getDate();
						if(is24) currentDate=dtShifted.getDate();
						var hz=(i*candleWidth) + offset;
						if(gridType=="boundary") hz=((i)*candleWidth)-3;
						var text="";
						if(!STXChart.hideDates()){
							var y=dt.getFullYear();
							if(y!=prevYear){
								prevYear=y;
								text=y;
								gridType="boundary";
							}else{
								if(chart.xAxis.formatter){
									text=chart.xAxis.formatter(dtShifted, gridType);
								}else if(this.internationalizer){
									text=this.internationalizer.monthDay.format(dtShifted);
								}else{
									text=(dtShifted.getMonth()+1) + "/" + dtShifted.getDate();
								}
							}
						}
						if(hz<chart.width){
							axisRepresentation.push(new STXChart.XAxisLabel(hz,gridType,text));
						}
					}else if(nonBoundary){
						var minutes=dt.getHours()*60 + dt.getMinutes();
						// Inlined version of STX.LegacyMarket.beginDay
						if(this.chart.beginHour!=0 || dt.getDay()!=0)
							minutes=minutes-standardBeginDay;
						else
							minutes=minutes-(15*60);
						if(is24) minutes=dtShifted.getHours()*60 + dtShifted.getMinutes();
						if(minutes%minuteBoundary==0){
							var hz=(i*candleWidth) + offset;
							var text="";
							if(!STXChart.hideDates()){
								if(chart.xAxis.formatter){
									text=chart.xAxis.formatter(dtShifted, "line");
								}else{
									text=STX.timeAsDisplay(dtShifted, this);
								}
							}
							if(hz<chart.width){
								axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));
							}
						}
					}
				}else{
					var prices;
					if(i<chart.dataSegment.length){
						prices=chart.dataSegment[i];
						dt=prices.DT;
					}else{
						if(!chart.xAxis.futureTicks) break;
						if(isIntraday) dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this);
						else if(isWeekly) dt=STX.LegacyMarket.nextWeek(dt, periodicity, this);
						else if(isMonthly) dt=STX.LegacyMarket.nextMonth(dt, periodicity, this);
						else if(isDaily) dt=STX.LegacyMarket.nextDay(dt, periodicity, this);
					}
					dtShifted=dt;
					var m=dt.getMonth();
					var y=dt.getFullYear();
					if(y!=prevYear){
						prevYear=y;
						prevMonth=m;
						var hz=(i*candleWidth)-2;
						var text="";
						if(!STXChart.hideDates()) text=y;
						axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));
					}else if(m!=prevMonth){
						var doIt="monthly";
						if(isWeekly && chart.maxTicks * periodicity>(52*1)) doIt="quarterly";
						else if(isMonthly && chart.maxTicks * periodicity>(12*1)) doIt="quarterly";
						else if(isDaily && chart.maxTicks * periodicity>(365*1)) doIt="quarterly";
		
						if(isWeekly && chart.maxTicks * periodicity>(52*2)) doIt="none";
						else if(isMonthly && chart.maxTicks * periodicity>(12*2)) doIt="none";
						else if(isDaily && chart.maxTicks * periodicity>(365*2)) doIt="none";
						if(doIt=="monthly" || (doIt=="quarterly" && (m==0||m==3||m==6||m==9))){
							prevMonth=m;
							var hz=(i*candleWidth)-2;
							var text="";
							if(!STXChart.hideDates()) text=STX.monthAsDisplay(m,displayLetters,this);
							axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));
						}
					}
				}
				var obj={
						DT: dtShifted,
						Date: STX.yyyymmddhhmm(dtShifted) // todo, this is inefficient
					};
				if(i<chart.dataSegment.length) obj.data=chart.dataSegment[i];	// xaxis should have reference to data to generate a head's up
				else obj.data=null;
		
				chart.xaxis.push(obj);
			}
		
			this.runAppend("createXAxis", arguments$);
			return axisRepresentation;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Draws the x-axis. This assumes that the axisRepresentation has previously been calculated by
		 * {@link STXChart#createXAxis}
		 * @param  {STXChart.Chart} chart              Chart object
		 * @param  {STXChart.XAxisLabel[]} axisRepresentation Axis representation object created by createXAxis. This should be an array of axis labels.
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawXAxis=function(chart, axisRepresentation){
			var arguments$=[chart, axisRepresentation];
			if(this.runPrepend("drawXAxis", arguments$)) return;
			if(!axisRepresentation) return;
			var priorBoundary=null;
			var context=this.chart.context;
			this.canvasFont("stx_xaxis");
			context.textAlign="center";
			context.textBaseline="middle";
		
			for(var i=0;i<axisRepresentation.length;i++){
				var obj=axisRepresentation[i];
				var w=context.measureText(obj.text).width;
				var w2=Math.max(w, chart.xAxis.minimumLabelWidth);
				obj.hz=Math.floor(obj.hz)+.5;
				obj.left=obj.hz-(w2/2);
				obj.right=obj.hz+(w2/2);
				obj.unpaddedRight=obj.hz+(w/2);
			}

			var plotter=new STX.Plotter();
			plotter.newSeries("line","stroke", this.canvasStyle("stx_grid"));
			plotter.newSeries("boundary","stroke", this.canvasStyle("stx_grid_dark"));
			plotter.newSeries("border","stroke", this.canvasStyle("stx_grid_border"));
			var bottom=chart.panel.bottom;
			var yAxis=chart.panel.yAxis;
			var context=this.chart.context;
			var prevRight=-1;
			var nextBoundaryLeft=Math.MAX_VALUE;
			var drawBorders=chart.xAxis.displayBorder || this.axisBorders;
			var b=drawBorders?yAxis.bottom-.5:yAxis.bottom;
			var middle=bottom-this.xaxisHeight/2;
			if(drawBorders) middle+=3;

			for(var nb=0;nb<axisRepresentation.length;nb++){
				if(axisRepresentation[nb].grid=="boundary"){
					nextBoundaryLeft=axisRepresentation[nb].left;
					break;
				}
			}
			var gridDistance=0, boundaryDistance=0;
			var prevHz=0;
			for(var i=0;i<axisRepresentation.length;i++){
				var obj=axisRepresentation[i];
				// Check for overlap
				if(i==nb){
					for(nb++;nb<axisRepresentation.length;nb++){
						if(axisRepresentation[nb].grid=="boundary"){
							nextBoundaryLeft=axisRepresentation[nb].left;
							break;
						}	
					}
					if(nb>=axisRepresentation.length){ // no more boundaries
						nb=-1;
						nextBoundaryLeft=Math.MAX_VALUE;
					}
					if(prevRight>-1){
						if(obj.left<prevRight) continue;
					}
				}else{
					if(prevRight>-1){
						if(obj.left<prevRight) continue;
					}
					if(obj.right>nextBoundaryLeft) continue;
				}
				prevRight=obj.right;
				if(obj.hz>=0 && Math.floor(obj.unpaddedRight)<=this.chart.width){
					if(chart.xAxis.displayGridLines){
						plotter.moveTo(obj.grid, obj.hz, yAxis.top);
						plotter.lineTo(obj.grid, obj.hz, b);
					}
					if(drawBorders){
						plotter.moveTo("border", obj.hz, b+.5);
						plotter.lineTo("border", obj.hz, b+6);
					}
					if(obj.grid=="boundary"){
						boundaryDistance=obj.hz-prevHz;
					}else{
						gridDistance=obj.hz-prevHz;
					}
					prevHz=obj.hz;
					this.canvasColor(obj.grid=="boundary"?"stx_xaxis_dark":"stx_xaxis");
					context.fillText(obj.text, obj.hz, middle);
				}
			}
			if(gridDistance) this.pixelsBetweenXAxis=gridDistance;
			else this.pixelsBetweenXAxis=boundaryDistance;
			if(axisRepresentation.length<=1) this.pixelsBetweenXAxis=0;

			if(drawBorders){
				var b=Math.round(yAxis.bottom)+.5;
				var w=Math.round(chart.width)+.5;
				plotter.moveTo("border", 0, b);
				plotter.lineTo("border", w, b);
			}

			plotter.draw(context);

			context.textAlign="left";
			this.runAppend("drawXAxis", arguments$);
		};

		/**
		 * Draws a numeric x-axis, attempting to automatically create "nice" labels for readability.
		 * Uses "index" field instead of "Date" field to determine the label.
		 * @param  {STXChart.Chart} chart              Chart object
		 */
		STXChart.prototype.createNumericXAxis=function(chart){
			axisRepresentation=[];
			chart.xaxis=[];
			for(var i=0;i<chart.maxTicks;i++){
				if(chart.dataSegment[i]!=null) break;
				chart.xaxis.push(null);
			}
			for(var j=i;j<chart.maxTicks;j++){
				if(chart.dataSegment[i]==null) break;				
			}
			var filledScreenRatio=(j-i)/chart.maxTicks;
			var idealTicks=Math.round((this.chart.width*filledScreenRatio)/chart.xAxis.idealTickSizePixels);
			var minMax=this.determineMinMax(chart.dataSegment, ["index"]);
			var maxPoint=minMax[1], minPoint=minMax[0];
			var range=maxPoint-minPoint;

			function niceNum(range, round) {
			    var exponent; /** exponent of range */
			    var fraction; /** fractional part of range */
			    var niceFraction; /** nice, rounded fraction */

			    exponent = Math.floor(Math.log10(range));
			    fraction = range / Math.pow(10, exponent);

			    if (round) {
			      if (fraction < 1.5)
			        niceFraction = 1;
			      else if (fraction < 3)
			        niceFraction = 2;
			      else if (fraction < 7)
			        niceFraction = 5;
			      else
			        niceFraction = 10;
			    } else {
			      if (fraction <= 1)
			        niceFraction = 1;
			      else if (fraction <= 2)
			        niceFraction = 2;
			      else if (fraction <= 5)
			        niceFraction = 5;
			      else
			        niceFraction = 10;
			    }

			    return niceFraction * Math.pow(10, exponent);
			}

		    var niceRange = niceNum(maxPoint - minPoint, false);
		    var tickSpacing = niceNum(range / (idealTicks - 1), true);
		    var niceMin = Math.floor(minPoint / tickSpacing) * tickSpacing;
		    var niceMax = Math.ceil(maxPoint / tickSpacing) * tickSpacing;

		    var nextLabel=niceMin;
		    if(niceMin<minPoint) nextLabel=niceMin+tickSpacing;

		    var hz;
			for(i;i<=chart.maxTicks;i++){
				var prices=chart.dataSegment[i];
				if(prices){
					var obj={
						index: prices.index,
						data: prices
					};
					chart.xaxis.push(obj);
					if(prices.index<nextLabel) continue;
					if(prices.index==nextLabel){
						hz=(i*this.layout.candleWidth) + this.offset;
					}else if(prices.index>nextLabel){
						hz=(i*this.layout.candleWidth)-3;
					}
					axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",nextLabel));
					nextLabel+=tickSpacing;
				}else{
					//TODO, calculate forward using tickSpacing
					chart.xaxis.push(null);
				}
			}
			return axisRepresentation;
		}

		/**
		 * Draws the x-axis for a "tick" chart, where multiple bars may reside on the same DateTime. It uses an algorithm to determine the
		 * best possible labeling, from milliseconds up to years, and uses "pretty" multipliers (such as 5 minutes, 15 minutes, 1 hour, etc)
		 *
		 * chart.xAxis.timeUnit and chart.xAxis.timeUnitMultiplier can be hard set to override the algorithm.
		 * @memberOf STXChart
		 * @param  {object} [chart] The chart to print the xaxis
		 */
		STXChart.prototype.createTickXAxisWithDates=function(chart){
			if(!chart) chart=this.chart;
			//console.log("");
			// These are all the possible time intervals. Not so easy to come up with a formula since time based switches
			// from 10 to 60 to 24 to 365
			if(!this.timeIntervalMap){
				this.timePossibilities=[STX.MILLISECOND,STX.SECOND,STX.MINUTE,STX.HOUR,STX.DAY,STX.MONTH,STX.YEAR,STX.DECADE];
				this.timeIntervalMap={};
				this.timeIntervalMap[STX.MILLISECOND]={
					arr: [1,2,5,10,20,50,100,250,500],
					minTimeUnit:0,
					maxTimeUnit:1000
				};
				this.timeIntervalMap[STX.SECOND]={
					arr: [1, 2, 5, 10,15,30],
					minTimeUnit: 0,
					maxTimeUnit: 60
				};
				this.timeIntervalMap[STX.MINUTE]={
					arr: [1,2,3,5,10,15,20,30],
					minTimeUnit: 0,
					maxTimeUnit: 60
				};
				this.timeIntervalMap[STX.HOUR]={
					arr: [1, 2, 3, 4,6,12],
					minTimeUnit: 0,
					maxTimeUnit: 24
				};
				this.timeIntervalMap[STX.DAY]={
					arr: [1,2,3],
					minTimeUnit: 1,
					maxTimeUnit: 32
				};
				this.timeIntervalMap[STX.MONTH]={
					arr: [1,2,3,6],
					minTimeUnit:1,
					maxTimeUnit:13
				};
				this.timeIntervalMap[STX.YEAR]={
					arr: [1,2,3,5],
					minTimeUnit:1,
					maxTimeUnit:20000000
				};
				this.timeIntervalMap[STX.DECADE]={
					arr: [10],
					minTimeUnit: 0,
					maxTimeUnit: 2000000
				};
			}
			var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];


			/* This section computes at which time interval we set the labels.*/
			var idealTicks=this.chart.width/chart.xAxis.idealTickSizePixels;
			for(var x=0;x<chart.dataSegment.length;x++) if(chart.dataSegment[x]) break; // find first valid bar in dataSegment
			// timeRange is the span of time in milliseconds across the dataSegment

			if(STXChart.isDailyInterval(this.layout.interval)){
				var timeRange=chart.dataSegment[chart.dataSegment.length-1].DT.getTime()-chart.dataSegment[x].DT.getTime(); // simple calc
			}else{
				// algorithm for computing how many milliseconds of market time are represented on the chart
				// Count the number of milliseconds of market time for each tick
				// Usually this is just the time difference between ticks
				// Except if the next tick is greater than a market close, in which case only count the time up to the market close
				// This should magically take care of weekends and holidays although not early closings
				var timeRange=0, nextClose=null, nextCloseEpoch=0, prevEpoch=0;
				for(var i=0;i<chart.dataSegment.length;i++){
					var q=chart.dataSegment[i];
					if(!q) continue;
					var epoch=q.DT.getTime();
					if(epoch>nextCloseEpoch){
						timeRange+=nextCloseEpoch-prevEpoch; // Add as much time was left in previous market day
						nextClose=new Date(q.DT);
						nextClose.setHours(chart.endHour);
						nextClose.setMinutes(chart.endMinute);
						nextCloseEpoch=nextClose.getTime();
						if(nextCloseEpoch<epoch){
							//console.log("Assertion error: A bar has a time greater than the specified endHour & endMinute for " + this.chart.symbol);
							nextCloseEpoch=epoch;
						}
					}else{
						timeRange+=epoch-prevEpoch;			// Add as much time as passed from previous bar
					}
					prevEpoch=epoch;
				}
				// If we're spanning more than one market day, then adjust back up for actual time
				if(timeRange>chart.minutesInSession) timeRange*=(1440/chart.minutesInSession);
			}

			timeRange=(timeRange/chart.dataSegment.length)*chart.maxTicks; // adjust timeRange in case dataSegment doesn't span entire chart (blank bars left or right of chart)
			var msPerTick=timeRange/idealTicks;
			//console.log("msPerTick=" + msPerTick)
			//console.log("month=" + STX.MONTH);
			//TODO, if timeRange hasn't changed then we could use a cached length and skip this algorithm

			// Find 1) the timePossibility which gives us the base time unit to iterate (for instance, SECONDS)
			// 2) Which timeIntervalMap. For instance the SECOND map allows 1,2,5,10,15,30 second increments
			for(var i=0;i<this.timePossibilities.length;i++){
				if(this.timePossibilities[i]>msPerTick) break;
			}
			var timeUnit=this.timePossibilities[i-1]; // One less than i because the algorithm overshoots
			if(chart.xAxis.timeUnit!=null) timeUnit=chart.xAxis.timeUnit;

			var timeInterval=STX.clone(this.timeIntervalMap[timeUnit]);

			// Now, find the right time unit multiplier
			for(var i=0;i<timeInterval.arr.length;i++){
				if(timeInterval.arr[i]*timeUnit>msPerTick) break;
			}
			var timeUnitMultiplier=timeInterval.arr[i-1];
			if(chart.xAxis.timeUnitMultiplier) timeUnitMultiplier=chart.xAxis.timeUnitMultiplier;

			//end TODO

			axisRepresentation=[];
			var i=0;
			chart.xaxis=[];
			for(;i<chart.maxTicks;i++){
				if(chart.dataSegment[i]!=null) break;
				chart.xaxis.push(null);
			}
/*
			var tustr={};
			tustr[STX.SECOND]="SECOND";
			tustr[STX.MINUTE]="MINUTE";
			tustr[STX.HOUR]="HOUR";
			tustr[STX.DAY]="DAY";
			tustr[STX.MONTH]="MONTH";
			tustr[STX.YEAR]="YEAR";
			console.log("timeUnit=" + tustr[timeUnit] + " timeUnitMultiplier=" + timeUnitMultiplier);
*/
			var dtShifted=0;
			var nextTimeUnit=timeInterval.minTimeUnit;
			var previousTimeUnitLarge=0;	// this will be used to keep track of when the next time unit up loops over
			for(i;i<=chart.maxTicks;i++){
				if(i<chart.dataSegment.length){
					prices=chart.dataSegment[i];
					if(prices.displayDate && chart.xAxis.adjustTimeZone && timeUnit<STX.DAY){
						dtShifted=prices.displayDate;
					}else{
						dtShifted=prices.DT;
					}
				}else{
					if(!chart.xAxis.futureTicks) break;
					
					var periodicity=this.layout.periodicity;
					var interval=this.layout.interval;
					if (dtShifted){
						var dt=dtShifted;
					} else {
					 // if no axis have been added at all, use the current browser time and adjust to the dataZone
						dt=new Date(); 
						if(this.dataZone){
							// convert the current time to the dataZone
							var tzNow = STX.convertTimeZone(now, null, this.dataZone);
							// remember the the masterData is in local time but really representing the dataZone time.
							// now build a browser timezone time using the dataZone time so it will match the offset of the existing data in masterData.
							dt = new Date(tzNow.getFullYear(), tzNow.getMonth(), tzNow.getDate(), tzNow.getHours(), tzNow.getMinutes(), tzNow.getSeconds(), tzNow.getMilliseconds());
						}
					}
					if(interval=="day"){
						dt=STX.LegacyMarket.nextDay(dt, periodicity, this);
					} else if(interval=="week"){
						dt=STX.LegacyMarket.nextWeek(dt, periodicity, this);
					} else if(interval=="month"){
						dt=STX.LegacyMarket.nextMonth(dt, periodicity, this);
					}else{
						dt=STX.LegacyMarket.nextPeriod(dt, interval, periodicity, this, null, this.dataZone);
					}
					if(chart.xAxis.useDataDate) dtShifted=dt;
					else if(!this.isDailyInterval(interval)) dtShifted=this.timeShiftDate(dt);
					else dtShifted=dt;
				}
				var obj={
						DT: dtShifted,
						Date: STX.yyyymmddhhmm(dtShifted) // todo, this is inefficient
					};
				if(i<chart.dataSegment.length) obj.data=chart.dataSegment[i];	// xaxis should have reference to data to generate a head's up
				else obj.data=null;
				chart.xaxis.push(obj);
				
				var currentTimeUnit, currentTimeUnitLarge;
				if(timeUnit==STX.MILLISECOND){
					currentTimeUnit=dtShifted.getTime();
					currentTimeUnitLarge=dtShifted.getSeconds();
				}else if(timeUnit==STX.SECOND){
					currentTimeUnit=dtShifted.getSeconds();
					currentTimeUnitLarge=dtShifted.getMinutes();
				}else if(timeUnit==STX.MINUTE){
					currentTimeUnit=dtShifted.getMinutes();
					currentTimeUnitLarge=dtShifted.getHours();
				}else if(timeUnit==STX.HOUR){
					currentTimeUnit=dtShifted.getHours();
					currentTimeUnitLarge=dtShifted.getDate();
				}else if(timeUnit==STX.DAY){
					currentTimeUnit=dtShifted.getDate(); // TODO, get day of year
					currentTimeUnitLarge=dtShifted.getMonth()+1;
				}else if(timeUnit==STX.MONTH){
					currentTimeUnit=dtShifted.getMonth()+1;
					currentTimeUnitLarge=dtShifted.getFullYear();
				}else if(timeUnit==STX.YEAR){
					currentTimeUnit=dtShifted.getFullYear();
					currentTimeUnitLarge=dtShifted.getFullYear();
				}else{
					currentTimeUnit=dtShifted.getFullYear()*10;
					currentTimeUnitLarge=dtShifted.getFullYear()*10;
				}

				var text;
				if(previousTimeUnitLarge!=currentTimeUnitLarge){
					if(currentTimeUnit<=nextTimeUnit){ // case where we skipped ahead to the next large time unit
						nextTimeUnit=timeInterval.minTimeUnit;
					}
					// print a boundary
					hz=(i*this.layout.candleWidth)-3;
					text=null;
					if(timeUnit==STX.HOUR || (timeUnit==STX.MINUTE && previousTimeUnitLarge>currentTimeUnitLarge)){
						if(chart.xAxis.formatter){
							text=chart.xAxis.formatter(dtShifted, "boundary", STX.DAY, 1);
						}else{
							if(this.internationalizer){
								text=this.internationalizer.monthDay.format(dtShifted);
							}else{
								text=(dtShifted.getMonth()+1) + "/" + dtShifted.getDate();
							}
						}
					}else if(timeUnit==STX.DAY){
						if(previousTimeUnitLarge>currentTimeUnitLarge){ // year shift
							text=dtShifted.getFullYear();
						}else{
							text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);
						}
					}else if(timeUnit==STX.MONTH){
						text=dtShifted.getFullYear();
					}
					if(text){
						axisRepresentation.push(new STXChart.XAxisLabel(hz,"boundary",text));
					}
				}
				//console.log("currentTimeUnit=" + currentTimeUnit + " nextTimeUnit=" + nextTimeUnit + " minTimeUnit=" + timeInterval.minTimeUnit + " currentTimeUnitLarge=" + currentTimeUnitLarge + " previousTimeUnitLarge=" + previousTimeUnitLarge);
				if(currentTimeUnit>=nextTimeUnit){ //passed the next expected axis label so let's print the label
					if(nextTimeUnit==timeInterval.minTimeUnit){
						if(currentTimeUnitLarge==previousTimeUnitLarge) continue; // we haven't looped back to zero yet
					}

					var labelDate=new Date(dtShifted);
					var hz=(i*this.layout.candleWidth) + this.offset;
					var boundaryTimeUnit=Math.floor(currentTimeUnit/timeUnitMultiplier)*timeUnitMultiplier;
					if(boundaryTimeUnit<currentTimeUnit){
						hz=(i*this.layout.candleWidth)-3; // if we don't land on a label then position the label to the left of the bar
					}
					// And print the boundary label rather than the actual date
					if(timeUnit==STX.MILLISECOND){
						labelDate.setMilliseconds(boundaryTimeUnit);
					}else if(timeUnit==STX.SECOND){
						labelDate.setMilliseconds(0);
						labelDate.setSeconds(boundaryTimeUnit);
					}else if(timeUnit==STX.MINUTE){
						labelDate.setMilliseconds(0);
						labelDate.setSeconds(0);
						labelDate.setMinutes(boundaryTimeUnit);
					}else if(timeUnit==STX.HOUR){
						labelDate.setMilliseconds(0);
						labelDate.setSeconds(0);
						labelDate.setMinutes(0);
						labelDate.setHours(boundaryTimeUnit);
					}else if(timeUnit==STX.DAY){
						labelDate.setDate(boundaryTimeUnit); //TODO, day of year
					}else if(timeUnit==STX.MONTH){
						labelDate.setDate(1);
						labelDate.setMonth(boundaryTimeUnit-1);
					}else if(timeUnit==STX.YEAR){
						labelDate.setDate(1);
						labelDate.setMonth(0);
						labelDate.setFullYear(boundaryTimeUnit);
					}else{
						labelDate.setDate(1);
						labelDate.setMonth(0);
						labelDate.setFullYear(boundaryTimeUnit*10);
					}
					//console.log(labelDate + " boundary=" + boundaryTimeUnit);

					// figure the next expected axis label position
					nextTimeUnit=boundaryTimeUnit+timeUnitMultiplier;
					if(timeUnit==STX.DAY) timeInterval.maxTimeUnit=daysInMonth[labelDate.getMonth()]+1; // DAY is the only unit with a variable max
					if(nextTimeUnit>=timeInterval.maxTimeUnit) nextTimeUnit=timeInterval.minTimeUnit;
					previousTimeUnitLarge=currentTimeUnitLarge;

					// format the label
					if(chart.xAxis.formatter){
						text=chart.xAxis.formatter(labelDate, "line", timeUnit, timeUnitMultiplier);
					}else{
						if(timeUnit==STX.DAY){
							text=labelDate.getDate();
							/*if(this.internationalizer){
								text=this.internationalizer.monthDay.format(labelDate);
							}else{
								text=(labelDate.getMonth()+1) + "/" + labelDate.getDate();
							}*/
						}else if(timeUnit==STX.MONTH){
							text=STX.monthAsDisplay(dtShifted.getMonth(),false,this);
						}else if(timeUnit==STX.YEAR || timeUnit==STX.DECADE){
							text=labelDate.getFullYear();
						}else{
							text=STX.timeAsDisplay(labelDate, this, timeUnit);
						}
					}
					axisRepresentation.push(new STXChart.XAxisLabel(hz,"line",text));
				}					
			}
			return axisRepresentation;
		};
		
		
		var cached=0;	// Performance analytics for caching subsystem
		var notcached=0;
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Call this method to create the Y axis (price axis).
		 * Significant logic is incorporated into this function to ensure a usable grid regardless of price granularity or magnitude.
		 * Use css style stx_grid to manage colors of grid lines.
		 * Use stx_yaxis to control font and color of the yaxis text (prices).
		 * 
		 * Managing Decimal Places
		 * 
		 * The Y-Axis automatically manages decimal place precision. The default behavior is to set the number of decimal places to the maximum number that is contained in the masterData.
		 * If a single entry in masterData contains 5 decimal places then the Y-Axis will always show 5 decimal places.
		 * You may override this by setting stxx.chart.panel.yAxis.decimalPlaces equal to a hard set number of decimal places.
		 * 
		 * @param  {STXChart.Panel} panel      The panel to create the y-axis
		 * @param  {object} [parameters] Parameters to drive the y-axis
		 * @param {boolean} [parameters.noDraw] If true the make all the calculations but don't draw the y-axis. Typically used when a study is going to draw its own y-axis.
		 * @param {boolean} [parameters.semiLog] Calculate the y-axis as a semi-log scale.
		 * @memberOf STXChart
		 */
		STXChart.prototype.createYAxis=function(panel, parameters){
			if(this.runPrepend("createYAxis", arguments)) return;
			var chart=panel.chart;
			var isAChart=(panel.name==chart.name);
			var yAxis=panel.yAxis;
			if(!parameters) parameters={};
			parameters.noChange=false;
		
			if(STXChart.enableCaching && yAxis.high==panel.cacheHigh && yAxis.low==panel.cacheLow){
				var leftTick=chart.dataSet.length - chart.scroll;
				var rightTick=leftTick+chart.maxTicks;
				panel.cacheLeft=Math.min(panel.cacheLeft, leftTick);
				panel.cacheRight=Math.max(panel.cacheRight, rightTick);
				panel.cacheLeft=leftTick;
				panel.cacheRight=rightTick;
				parameters.noChange=true;
				cached++;
			}else{
				panel.cacheLeft=1000000;
				panel.cacheRight=-1;
				panel.cacheHigh=yAxis.high;
				panel.cacheLow=yAxis.low;
				notcached++;
			}
			//console.log((cached/(cached+notcached)*100).toFixed(0));
			//debugHU(cached + ":" + notcached);
			if(this.goldenRatioYAxis){
				// This will happen if the x-axis widths have changed
				if(yAxis.idealTickSizePixels!=this.pixelsBetweenXAxis/1.618)
					parameters.noChange=false;
			}
			if(!parameters.noChange){
				// Adjust for zoom and scroll
				var height=yAxis.height=yAxis.bottom-yAxis.top;
				var pricePerPix=(yAxis.high-yAxis.low)/(height-yAxis.zoom);
				yAxis.high=yAxis.high+(yAxis.zoom/2)*pricePerPix + yAxis.scroll*pricePerPix;
				yAxis.low=yAxis.low-(yAxis.zoom/2)*pricePerPix + yAxis.scroll*pricePerPix;
				yAxis.shadow=yAxis.high-yAxis.low;
				if(yAxis.semiLog && (!this.activeDrawing || this.activeDrawing.name!="projection")){
					yAxis.logHigh=Math.log(yAxis.high)/Math.LN10;
					yAxis.logLow=Math.log(yAxis.low)/Math.LN10;
					if(yAxis.low<=0) yAxis.logLow=0;
					yAxis.logShadow=yAxis.logHigh - yAxis.logLow;
				}
				if(this.goldenRatioYAxis && isAChart){
					yAxis.idealTickSizePixels=this.pixelsBetweenXAxis/1.618;
					if(yAxis.idealTickSizePixels==0){
						var fontHeight=this.getCanvasFontSize("stx_yaxis");
						yAxis.idealTickSizePixels=fontHeight*5;
					}
				}else{
					if(!yAxis.idealTickSizePixels){
						var fontHeight=this.getCanvasFontSize("stx_yaxis");
						if(isAChart){
							yAxis.idealTickSizePixels=fontHeight*5;
						}else{
							yAxis.idealTickSizePixels=fontHeight*2;
						}
					}
				}
				var idealTicks=Math.round(height/yAxis.idealTickSizePixels);
				var shadow=parameters.range?parameters.range[1]-parameters.range[0]:yAxis.shadow;
				yAxis.priceTick=Math.floor(shadow/idealTicks);

				// calculate the ideal price tick. First find the ideal decimal location using a loop
				var n=1;		
				for(var zz=0;zz<10;zz++){
					if(yAxis.priceTick>0) break;
					n*=10;
					yAxis.priceTick=Math.floor(shadow/idealTicks*n)/n;
				}
				if(zz==10) yAxis.priceTick=.00000001;
				// Then find the closest approximation
				yAxis.priceTick=Math.round(shadow/idealTicks*n)/n;

				var verticalTicks=Math.round(shadow/yAxis.priceTick);
				if(parameters.range && verticalTicks<shadow && !yAxis.noEvenDivisorTicks){ // if there's a set range, then by default display ticks that evenly divide into the range
					while(verticalTicks>=1){
						if(shadow%verticalTicks==0) break;
						verticalTicks--;
					}
					yAxis.priceTick=shadow/verticalTicks;
				}

				if(yAxis.minimumPriceTick){
					yAxis.priceTick=yAxis.minimumPriceTick;
					for(var i=0;i<10;i++){
						var numberOfTicks=shadow/yAxis.priceTick;
						if(height/numberOfTicks<this.getCanvasFontSize("stx_yaxis")*2) yAxis.priceTick*=2;
						else break;
					}
				}
		
				yAxis.multiplier=yAxis.height/yAxis.shadow;
			}
			if(!this.activeDrawing || this.activeDrawing.name!="projection"){
				yAxis.high=this.valueFromPixel(panel.top, panel);	// Set the actual high for the panel rather than the values in the panel
				if(yAxis.semiLog){
					yAxis.logHigh=Math.log(yAxis.high)/Math.LN10;
					yAxis.logLow=Math.log(yAxis.low)/Math.LN10;
					if(yAxis.low<=0) yAxis.logLow=0;
					yAxis.logShadow=yAxis.logHigh - yAxis.logLow;
				}
				yAxis.shadow=yAxis.high-yAxis.low;
			}
			yAxis.multiplier=yAxis.height/yAxis.shadow;
			// If the programmer has set yAxis.decimalPlaces then we will print that number of decimal places
			// otherwise we will use the number of decimalPlaces determined when masterData was set
			if(yAxis.decimalPlaces==null){
				if(isAChart){
					var labelDecimalPlaces=0;
					if(panel.yAxis.shadow<1000) labelDecimalPlaces=2;
					if(panel.yAxis.shadow<1) labelDecimalPlaces=4;
					yAxis.printDecimalPlaces=labelDecimalPlaces;
					//yAxis.printDecimalPlaces=chart.decimalPlaces;
				}
				else yAxis.printDecimalPlaces=null; // let the draw function figure out how many decimal places
			}else{
				yAxis.printDecimalPlaces=yAxis.decimalPlaces;
			}
			if(this.runAppend("createYAxis", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 *
		 * This method draws the y-axis. It is typically called after {@link STXChart#createYAxis}. 
		 * @param  {STXChart.Panel} panel      The panel to draw the y-axis
		 * @param  {object} parameters Parameters for the y-axis (only used internally. Send {} when calling this method directly).
		 * @param {array} [parameters.range] Optionally set the range of values to display on the y-axis. For instance [0,100] would only print from zero to one hundred, regardless of the actual height of the y-axis.
		 *                                   This is useful if you want to add some buffer space to the panel but don't want the y-axis to actually reveal nonsensical values.
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawYAxis=function(panel, parameters){
			if(this.runPrepend("drawYAxis", arguments)) return;
			if(!parameters) parameters={};
			if(!parameters.noDraw && !panel.yAxis.noDraw){
				if(!panel.yAxisPlotter || !parameters.noChange){
					var chart=panel.chart;
					var isAChart=(panel.name==chart.name);
					var yAxis=panel.yAxis;
					if(!yAxis.priceTick) return;
					var shadow=yAxis.shadow;
					if(parameters.range){
						shadow=parameters.range[1]-parameters.range[0];
					}
					var verticalTicks=shadow/yAxis.priceTick;
					//if(isAChart)
					//	verticalTicks=Math.round(verticalTicks +.499);	// This will create one more tick's worth of vertical space at the top of charts
																		// very useful for trending stocks which will otherwise touch the top of the chart
					verticalTicks=Math.round(verticalTicks);
					if(yAxis.semiLog){
						var logStart=Math.log(this.valueFromPixel(yAxis.bottom, panel))/Math.LN10;
						var logPriceTick=(yAxis.logHigh-yAxis.logLow)/verticalTicks;
					}
					panel.yAxisPlotter=new STX.Plotter();	// This plotted is saved as a member. We can re-use it to draw the exact same y-axis when noChange=true
					panel.yAxisPlotter.newSeries("grid", "stroke", this.canvasStyle("stx_grid"));
					panel.yAxisPlotter.newSeries("text", "fill", this.canvasStyle("stx_yaxis"));
					panel.yAxisPlotter.newSeries("border", "stroke", this.canvasStyle("stx_grid_border"));
		
					var priceOffset=0;
					var high=parameters.range?parameters.range[1]:yAxis.high;
					var low=parameters.range?parameters.range[0]:yAxis.low;
					var drawBorders=chart.panel.yAxis.displayBorder || this.axisBorders;
					var borderEdge=Math.round(chart.width)+.5;
					var w=drawBorders?borderEdge-.5:this.chart.width;
					var tickWidth=drawBorders?3:0; // pixel width of tick off edge of border

					if(isAChart)	// This forces the y-axis on to even values
						priceOffset=yAxis.priceTick-Math.round((low%yAxis.priceTick)*panel.chart.roundit)/panel.chart.roundit;
					else
						priceOffset=high%yAxis.priceTick;
					var fontHeight=this.getCanvasFontSize("stx_yaxis");
					for(var i=0;i<verticalTicks;i++){
						var price;
						if(yAxis.semiLog){
							var logPrice=logStart+(i*logPriceTick);
							price=Math.pow(10, logPrice);
						}else{
							// Charts need a little extra space at the top while studies
							// want to show the high value right at the panel division line
							// so we reverse the order of our priceTicks depending on the situation
							if(isAChart)
								price=low + i*yAxis.priceTick + priceOffset;
							else
								price=high - (i*yAxis.priceTick) - priceOffset;
						}
						var y=this.pixelFromPrice(price, panel);
		
						var y2=Math.round(y)+.5;
						if((y2 + fontHeight/2) > panel.bottom) continue; // Make sure we don't stray past the bottom of the panel
						if((y2-fontHeight/2)<panel.top) continue;	// Make sure we don't stray past the top of the panel
						if(yAxis.displayGridLines){
							panel.yAxisPlotter.moveTo("grid", 0, y2);
							panel.yAxisPlotter.lineTo("grid", w, y2);
						}
						if(drawBorders){
							panel.yAxisPlotter.moveTo("border", borderEdge-.5, y2);
							panel.yAxisPlotter.lineTo("border", borderEdge+tickWidth, y2);
						}
						if(yAxis.priceFormatter){
							price=yAxis.priceFormatter(this, panel, price);
						}else{
							price=this.formatYAxisPrice(price, panel);
						}
						// add 2 pixels for the y-axis stroke
						panel.yAxisPlotter.addText("text", price, this.chart.canvasWidth-this.yaxisLeft + tickWidth + 3, y2);
					}
					if(drawBorders){
						var b=Math.round(yAxis.bottom)+.5;
						panel.yAxisPlotter.moveTo("border", borderEdge, yAxis.top);
						panel.yAxisPlotter.lineTo("border", borderEdge, b);
						panel.yAxisPlotter.draw(this.chart.context, "border");
					}
				}
				this.plotYAxisGrid(panel);
				this.plotYAxisText(panel);
			}
			if(this.runAppend("drawYAxis", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 *
		 * Draws the grid for the y-axis.
		 * @param  {STXChart.Panel} panel The panel for the y-axis
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotYAxisGrid=function(panel){
			if(this.runPrepend("plotYAxisGrid", arguments)) return;
			var context=this.chart.context;
			panel.yAxisPlotter.draw(context, "grid");
			if(this.runAppend("plotYAxisGrid", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 *
		 * Plots the text on the y-axis.
		 * @param  {STXChart.Panel} panel The panel for the y-axis
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotYAxisText=function(panel){
			if(this.runPrepend("plotYAxisText", arguments)) return;
			this.canvasFont("stx_yaxis");
			this.canvasColor("stx_yaxis");
			var context=this.chart.context;
			context.textBaseline="middle";
			panel.yAxisPlotter.draw(context, "text");
			context.textBaseline="alphabetic";
			if(this.runAppend("plotYAxisText", arguments)) return;
		};
		
		/*
		 * Formats prices for the Y-axis. Intelligently computes the decimal places based on the size of the y-axis ticks.
		 * This can be overriden by manually setting decimalPlaces in the yAxis. You can call this method to ensure that any
		 * prices that you are using outside of the chart are formatted the same as the prices on the y-axis.
		 */
		/**
		 * [formatYAxisPrice description]
		 * @param  {number} price The price to be formatted
		 * @param  {STXChart.Panel} panel The panel for the y-axis. If the panel is a study panel, then prices will be condensed by {@link condenseInt}.
		 * @param {number} [requestedDecimalPlaces] Optionally specify the number of decimal places, otherwise it will be determined by the yaxis setting, or if not set, determined automatically
		 * @return {number}       The formatted price
		 * @memberOf STXChart
		 */
		STXChart.prototype.formatYAxisPrice=function(price, panel, requestedDecimalPlaces){
			if(price==null || typeof price=="undefined") return "";
			var yAxis=panel.yAxis;
			var decimalPlaces=requestedDecimalPlaces;
			if(!decimalPlaces && decimalPlaces!=0) decimalPlaces=yAxis.printDecimalPlaces;
			if(!decimalPlaces && decimalPlaces!=0){
				if(yAxis.priceTick<.01) decimalPlaces=4;
				else if(yAxis.priceTick<.1) decimalPlaces=2;
				else if(yAxis.priceTick<1) decimalPlaces=1;
				else decimalPlaces=0;
		
			}
			if(panel.name!=panel.chart.name){	// Don't condense chart prices, but do condense study prices
				if(price>1000 || price<-1000){	// k or m for thousands or millions
					return STX.condenseInt(price);
				}
			}
		
			if(this.internationalizer){
				if(decimalPlaces>=this.internationalizer.priceFormatters.length)
					decimalPlaces=this.internationalizer.priceFormatters.length-1;
				price=this.internationalizer.priceFormatters[decimalPlaces].format(price);
			}else{
				price=price.toFixed(decimalPlaces);
			}
			return price;
		};
		
		/*
		 * Formats a price according to the decimalPlaces specified in either the panel or chart.
		 * It will then format to international standards if the internationalizer is set.
		 * This method *does not* condense prices.
		 */
		/**
		 * [formatPrice description]
		 * @param  {number} price The price to be formatted
		 * @param  {STXChart.Panel} panel The panel to use to determine the number of decimal places.
		 * @return {number}       The formatted price
		 * @memberOf STXChart
		 */
		STXChart.prototype.formatPrice=function(price, panel){
			if(!price || typeof price=="undefined") return "";
			if(!panel) panel=this.currentPanel;
			if(!panel) panel=this.chart.panel;
			if(!panel) return price;
			var decimalPlaces=panel.decimalPlaces;
			if(!decimalPlaces && decimalPlaces!=0){
				decimalPlaces=panel.chart.decimalPlaces;
			}
			if(!decimalPlaces && decimalPlaces!=0){
				return price;
			}
		//	if(price>1000 || price<-1000){	// k or m for thousands or millions
		//		return STX.condenseInt(price);
		//	}
			if(this.internationalizer){
				if(decimalPlaces>=this.internationalizer.priceFormatters.length)
					decimalPlaces=this.internationalizer.priceFormatters.length-1;
				price=this.internationalizer.priceFormatters[decimalPlaces].format(price);
			}else{
				price=price.toFixed(decimalPlaces);
			}
			return price;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Registers mouse events for the crosshair elements (to prevent them from picking up events)
		 * @memberOf STXChart
		 */
		STXChart.prototype.createCrosshairs=function(){
			if(this.runPrepend("createCrosshairs", arguments)) return;
			if(this.controls.crossX.onmousedown) return;
		
			this.controls.crossY.onmousedown=function(e){
				if(!e) e=event;
				if(e.preventDefault) e.preventDefault();
				return false;
			};
			this.controls.crossX.onmousedown=function(e){
				if(!e) e=event;
				if(e.preventDefault) e.preventDefault();
				return false;
			};
			this.runAppend("createCrosshairs", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 *
		 * Creates a volume chart. This is the one study that requires a specific panel name called "vchart".
		 * If no volume is available on the screen then the panel will be watermarked "Volume Not Available" (translated if a translate function is attached to the kernel object).
		 * 
		 * @param  {STXChart.Chart} chart Which chart is driving the volume
		 * @memberOf STXChart
		 */
		STXChart.prototype.createVolumeChart=function(chart){
			var arguments$=[chart];
			if(this.runPrepend("createVolumeChart", arguments$)) return;
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			chart.volumeMax=0;
			for(var i=0;i<chart.maxTicks;i++){
				var prices=quotes[i];
				if(prices==null) continue;
				if(prices.Volume>chart.volumeMax) chart.volumeMax=prices.Volume;
			}
		
			var vchart=this.panels["vchart"];
			if(vchart==null || vchart.hidden==true) return;
			if(chart.volumeMax==0){
				this.watermark("vchart","center","bottom",this.translateIf("Volume Not Available"));
			}
			var stx_volume_up=this.canvasStyle("stx_volume_up").color;
			var stx_volume_down=this.canvasStyle("stx_volume_down").color;
			
			var colorMap={};
			colorMap[stx_volume_up]=[];
			colorMap[stx_volume_down]=[];
			for(var i=0;i<quotes.length;i++){
					var quote=quotes[i];
					if(quote==null){
						colorMap[stx_volume_up].push(null);
						colorMap[stx_volume_down].push(null);
						continue;
					}
					if(quote.Close<quote.iqPrevClose){
						colorMap[stx_volume_up].push(null);
						colorMap[stx_volume_down].push(quote.Volume);
					}else{
						colorMap[stx_volume_up].push(quote.Volume);
						colorMap[stx_volume_down].push(null);						
					}

			}
			var borderMap={};
			borderMap[colorMap[stx_volume_up]]="#000000";
			borderMap[colorMap[stx_volume_down]]="#000000"; // TODO, only set this if border colors are enabled by user

			vchart.min=0;
			vchart.max=chart.volumeMax;
			var sd={
				name:"vchart",
				panel:"vchart",
				libraryEntry: STX.Studies.studyLibrary["vchart"],
				outputMap: {"Volume":""}
			};
			STX.Studies.volumeChart(this, sd, colorMap, borderMap);
			STX.Studies.createYAxis(this, sd, this.chart.dataSegment, vchart);

			if(this.runAppend("createVolumeChart", arguments$)) return;
		};
		
		/**
		 * This method determines the high and low values for the data set. It requires an array of fields to check. For instance
		 * the array might contain ["Close","Series1","Series2"] which would return the max and min of all of those values for each
		 * quote.
		 * 
		 * @param  {Array} quotes The array of quotes to evaluate for min and max (typically STXChart.chart.dataSegment)
		 * @param  {Array} fields A list of fields to compare
		 * @return {Array}        A tuple, min and max values
		 * @memberOf STXChart
		 */
		STXChart.prototype.determineMinMax=function(quotes, fields){
			var highValue=Number.MAX_VALUE*-1;
			var lowValue=Number.MAX_VALUE;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				if(quote.transform) quote=quote.transform;
				for(var j=0;j<fields.length;j++){
					var val=quote[fields[j]];
					if(val || val==0){
						if(val>highValue) highValue=val;
						if(val<lowValue) lowValue=val;
					}
				}
			}
			return [lowValue, highValue];
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 *
		 * This method initializes display variables for the chart.
		 * It is part of the animation loop and called with every draw() operation.
		 * The high and low values for the displayed chart are calculated.
		 * Those values are subsequently used by {@link STXChart#createYAxis} which is called from within this method.
		 * This method also calls {@link STXChart#createCrosshairs}.
		 * stx.displayInitialized will be set to true after this method is called.
		 *
		 * chart.highValue - The highest value on the chart
		 * chart.lowValue - The lowest value on the chart
		 * yAxis.high - The highest value on the y-axis
		 * yAxis.low - The lowest value on the y-axis
		 *
		 * @param  {STXChart.Chart} chart The chart to initialize
		 * @memberOf STXChart
		 */
		STXChart.prototype.initializeDisplay=function(chart){
			if(this.runPrepend("initializeDisplay", arguments)) return;
			var fields=[];
			for(var field in chart.series){	// Find any series that share the Y axis
				if(chart.series[field].parameters.shareYAxis) fields.push(field);
			}
			var panel=chart.panel=this.panels[chart.name];
			var yAxis=panel.yAxis;
			var cheight=panel.height, high=low=null;
			if(!yAxis.bottomOffset) yAxis.bottomOffset=this.xaxisHeight;
			yAxis.bottom=panel.bottom-yAxis.bottomOffset;	// deduct height of x-axis to determine the bottom of the y-axis
			yAxis.top=panel.top;
			yAxis.height=yAxis.bottom-yAxis.top;
			var minMax;
			//TODO, need more generic way of doing this as we add more chart types
			if(this.layout.chartType=="line" || this.layout.chartType=="colored_line" || this.layout.chartType=="mountain" || this.layout.chartType=="baseline_delta"){	// line charts shouldn't take into account high and low values, just close
				fields.push("Close");
				minMax=this.determineMinMax(chart.dataSegment, fields);
				if(this.layout.chartType=="baseline_delta"){
					var base=chart.baseline;
					if(chart.transformFunc) base=chart.transformFunc(this,chart,base);
					var diff=Math.max(base-minMax[0],minMax[1]-base);
					minMax[0]=base-diff;
					minMax[1]=base+diff;
				}
			}else{
				fields.push("Close", "High", "Low");
				minMax=this.determineMinMax(chart.dataSegment, fields);
			}
			// Ensure the user hasn't scrolled off the top or the bottom of the chart
			var verticalPad=Math.round(Math.abs(cheight/5));
			if(cheight-Math.abs(yAxis.scroll)<verticalPad){
				yAxis.scroll=(cheight-verticalPad)*(yAxis.scroll<0?-1:1);
			}
			chart.lowValue=minMax[0]; chart.highValue=minMax[1];
			var pricePerPix=(chart.highValue-chart.lowValue)/yAxis.height;
			if(chart.highValue-chart.lowValue==0){	// A stock that has no movement, so we create some padding so that a straight line will appear
				high=chart.highValue*2;
				low=0;
			}else{
				if(this.layout.semiLog && high){
					// When in log scale, the yAxis high and low will be the log10 of the prices. The actual values are just for display, not for calculation.
					var logLow=Math.log(chart.lowValue)/Math.LN10;
					var logHigh=Math.log(chart.highValue)/Math.LN10;
					high=Math.pow(10, logHigh);
					low=Math.pow(10, logLow);
				}else{
					high=chart.highValue;
					low=chart.lowValue;
				}
			}
			yAxis.high=high;
			yAxis.low=low;
			yAxis.shadow=yAxis.high-yAxis.low;
			if(yAxis.semiLog!=this.layout.semiLog){
				this.clearPixelCache();
				yAxis.semiLog=this.layout.semiLog;
			}
			var parameters={};
			this.createYAxis(panel, parameters);
			this.drawYAxis(panel, parameters);
		
			this.runAppend("initializeDisplay", arguments);
		};
		
		// @deprecated Use pixelFromBar
		STXChart.prototype.computePosition=function(x, offset){
			if(typeof offset == "undefined") offset=0;
			var position = x*this.layout.candleWidth + offset;
			return position;
		};
		
		// @deprecated
		STXChart.prototype.computeColor=function(open, close){
			if(open<close) return "stx_candle_up";
			if(open>close) return "stx_candle_down";
			return "stx_candle_shadow";
		};
		
		// @deprecated
		STXChart.prototype.computeLength=function(high, low){
			var h=this.pixelFromPrice(high);
			var l=this.pixelFromPrice(low);
			return l-h;
		
		};
		
		/**
		 * Creates a volume underlay for the chart. The underlay is always 25% of the height of the chart.
		 * The color and opacity of the underlay can be controlled with the classes stx_volume_underlay_up and
		 * stx_volume_underlay_down.
		 * @param  {STXChart.Chart} chart The chart to put the volume underlay on
		 * @memberOf STXChart
		 */
		STXChart.prototype.volUnderlay=function(chart){
			var quotes=chart.dataSegment;
			chart.volumeMax=0;
			for(var i=0;i<chart.maxTicks;i++){
				var prices=quotes[i];
				if(prices==null) continue;
				if(prices.Volume>chart.volumeMax) chart.volumeMax=prices.Volume;
			}
			if(chart.volumeMax==0){
				this.watermark("chart","center","bottom",this.translateIf("Volume Not Available"));
				return;
			}
			var context=this.chart.context;
			var c=chart.panel;
			var b=Math.floor(c.yAxis.bottom)+.5;
			var t=Math.floor(c.yAxis.top)+.5;
			var h=(b-t)*this.underlayPercentage;
			var negativeOffset=(this.tmpWidth-this.layout.candleWidth)/2;
			var quotes=chart.dataSegment;
			var bordersOn=(!STX.isTransparent(this.canvasStyle("stx_volume_underlay_up")["borderLeftColor"])
				&& !STX.isTransparent(this.canvasStyle("stx_volume_underlay_down")["borderLeftColor"]));
			var self=this;

			function drawBars(directionClass, borders){
				var borderColor=self.canvasStyle(directionClass)["borderLeftColor"];

			    self.canvasColor(directionClass);
			    if(STX.isIE8) context.globalAlpha=.5;
				context.beginPath();
				var prevTop=b+.5;
				var farLeft=(bordersOn?.5:0);
				var prevRight=farLeft;
				for(var i=0;i<quotes.length;i++){
					var quote=quotes[i];
					if(quote==null){
						prevTop=b;
						prevRight+=self.layout.candleWidth;
						continue;
					}
					var y=quote.Volume*(h/chart.volumeMax);
					var top=Math.min(Math.floor((b - h) + (h - y))+.5,b);
					if (directionClass=="stx_volume_underlay_up"){
						if(quote.Close < quote.iqPrevClose) {
							prevTop=top;
							prevRight+=self.layout.candleWidth;
							continue;
						}
					}else{
						if(quote.Close >= quote.iqPrevClose){
							prevTop=top;
							prevRight+=self.layout.candleWidth;
							continue;
						}
					}
					if(bordersOn){
						var x0=Math.floor(prevRight+Math.floor(negativeOffset))+.5;
						//var x1=Math.floor(x0 + self.layout.candleWidth)+.5;
						var x1=Math.floor(prevRight+self.layout.candleWidth+Math.floor(negativeOffset))+.5;
						x0=Math.max(x0, farLeft);
					}else{
						var x0=Math.floor(i*self.layout.candleWidth);
						var x1=x0+self.tmpWidth;
					}

					context.moveTo(x0+.5, b);
					context.lineTo(x1, b);
					context.lineTo(x1, top);
					context.lineTo(x0, top);
					if(borders){
						if(prevTop>top || i==0) context.lineTo(x0, prevTop); // draw down to the top of the previous bar, so that we don't overlap strokes
					}else{
						context.lineTo(x0, b);
					}
					prevTop=top;
					prevRight+=self.layout.candleWidth;
				}
				if(!borders) context.fill();
				context.strokeStyle = borderColor;
				if(borders) context.stroke();
				context.closePath();	
			}
		    
		    drawBars("stx_volume_underlay_up", false);
		    drawBars("stx_volume_underlay_down", false);
		    if(this.layout.candleWidth>=3 && bordersOn){
			    drawBars("stx_volume_underlay_up", true);
			    drawBars("stx_volume_underlay_down", true);
			}

			context.globalAlpha=1;
		};
		
		
		STX.Studies.removeVolumeProfile=function(stx, sd){
			if(!stx || !stx.chart.dataSet) return;
			var remove=sd.parameters["removeStudy"];
			stx.changeOccurred("layout");
			if(remove){
				STX.Studies.removeStudy(stx, sd);
			}
		};

		
		/**
		 * Creates a volume profile underlay for the chart. The underlay is always 25% of the width of the chart.
		 * The color and opacity of the underlay can be controlled with the class stx_volume_profile
		 * @param  {STXChart.Chart} chart The chart to put the volume profile underlay on
		 * @memberOf STXChart
		 */
		
		STX.Studies.displayVolumeProfile=function(stx, sd){
			if(!stx || !stx.chart.dataSet) return;

			var chart = stx.chart;
				  							
			//decide how many bars
			if(!sd.study.parameters.numberOfBars) sd.study.parameters.numberOfBars = 30;
			var interval = (chart.highValue-chart.lowValue)/sd.study.parameters.numberOfBars;
			if(interval==0) return;
			var priceVolArry = [];	
			
			// set the boundries for the bars -- add .1 to the loop to account for possible roundig errors.
			for(var j=chart.lowValue;j<chart.highValue+.1;j+=interval){
				priceVolArry.push([j, 0]);
			}
			
			if (priceVolArry.length <2) {	// need at least 2 price data points to draw boxes
				stx.watermark("chart","center","top",stx.translateIf("Not enough data to render the Volume Profile"));
				return;
			}
		
			var quotes=chart.dataSegment;
			var volumeMax=0; 	// this is the maximum volume after we group them by the bars we will draw
			for(var i=0;i<quotes.length;i++){
				var prices=quotes[i];
				if(prices==null) continue;
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
			if(volumeMax==0){
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
			var barBottom=Math.round(chart.width)-.5;  //bottom x coordinate for the bar  -- remember bars are sideways so the bottom is on the x axis
			var bartop=0; // x axis location for the top of the bar
			var barMaxHeight=(chart.width)*stx.underlayPercentage;  // fixels for highest bar
			var borderColor=stx.canvasStyle("stx_volume_profile")["borderColor"];
			var bordersOn=(!STX.isTransparent(stx.canvasStyle("stx_volume_profile")["borderColor"])) && sd.study.parameters.displayBorder; 

			var self=stx;

			function drawBars(volumeProfileClass, borders){
				if(!borders) barBottom-=2;
			    self.canvasColor(volumeProfileClass);
			    if(STX.isIE8) context.globalAlpha=.5;
				context.beginPath();
				var bottomRange = priceVolArry[0][0];
				var prevTop=barBottom;
				for(var i=1;i<priceVolArry.length;i++){	
					if (priceVolArry[i][1]) {				
						barTop =Math.round(barBottom-(priceVolArry[i][1]*barMaxHeight/volumeMax))-.5;
						bottomRangePixel=Math.round(self.pixelFromPrice(bottomRange, panel))+.5;
						topRangePixel = Math.round(self.pixelFromPrice(priceVolArry[i][0], panel))+.5;

						if(!borders){
							bottomRangePixel-=.5;
							topRangePixel+=.5;
							barTop+.5;
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
									var barHeight= bottomRangePixel-topRangePixel
									if( txtHeight <= barHeight-2) {
										try{
											var width=context.measureText(txt).width;
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

		
		/**
		 * Initializes boundary clipping on the requested panel. Use this when you are drawing on the canvas and wish for the
		 * drawing to be contained within the panel. You must call {@link STXChart.endClip} when your drawing functions are complete.
		 * @param  {string} [panel] The name of the panel. Defaults to the chart itself.
		 * @memberOf STXChart
		 */
		STXChart.prototype.startClip=function(panel){
			if(!panel) panel="chart";
			var c=this.panels[panel];
			this.chart.context.save();
			this.chart.context.beginPath();
			this.chart.context.rect(0, c.top, this.chart.width, c.bottom-c.top);
		    this.chart.context.clip();
		};
		
		/**
		 * Completes a bounded clipping operation. See {@link STXChart.startClip}.
		 * @memberOf STXChart
		 */
		STXChart.prototype.endClip=function(){
			this.chart.context.restore();
		};

		STXChart.prototype.drawCandlesHighPerformance=function(chart, fillColor, borderColor, condition){
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			var panel=chart.panel;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, length;
		
			var borderOffset=0;
			if(!STX.isTransparent(borderColor)) borderOffset=.5;
		
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			context.beginPath();
			context.fillStyle=fillColor;
			var yAxis=panel.yAxis;
			for(var x=0;x<=quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) continue;
		    	if(quote.Open==quote.Close) continue;	// Doji always drawn by shadow
				if(condition & STXChart.CANDLEUP && quote.Open>=quote.Close) continue;
				if(condition & STXChart.CANDLEDOWN && quote.Open<=quote.Close) continue;
				if(condition & STXChart.CLOSEUP && quote.Close<=quote.iqPrevClose) continue;
				if(condition & STXChart.CLOSEDOWN && quote.Close>=quote.iqPrevClose) continue;
				if(condition & STXChart.CLOSEEVEN && quote.Close!=quote.iqPrevClose) continue;
			    if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.open){
		    		var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):((yAxis.high-quote.Open)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		var c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):((yAxis.high-quote.Close)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
					top=Math.floor(Math.min(o,c))+borderOffset;
					bottom=Math.max(o, c);
					length=Math.floor(bottom-top);
					if(top<t){
						if(top+length<t){
							cache.open=top;
							cache.close=top;
							continue;
						}
						length-=t-top;
						top=t;
					}
					if(top+length>b){
						length-=(top+length-b);
					}
					length=Math.max(length,2);
					cache.open=top;
					cache.close=cache.open+length;
		    	}
				if(cache.open>=b) continue;
				if(cache.close<=t) continue;
				// To avoid fuzziness, without candle borders we want to land on an even number
				// With candle borders we want to land on .5 so we add the borderOffset
				// But with candle borders the borderOffset makes it slightly wider so we make the width 1 pixel less
				var x0=Math.floor(x*this.layout.candleWidth)+borderOffset;
				var x1=x0+this.tmpWidth-(borderOffset*2);
				if(quote.Open==quote.Close){
					top=Math.round(cache.open)-borderOffset;
					context.moveTo(x0, top);
					context.lineTo(x1, top);
				}else{
					context.moveTo(x0, cache.open);
					context.lineTo(x1, cache.open);
					context.lineTo(x1, cache.close);
					context.lineTo(x0, cache.close);
					context.lineTo(x0, cache.open);
				}
			}
			context.fill();
			if(borderOffset){
				context.lineWidth=1;
				context.strokeStyle=borderColor;
				context.stroke();
			}
			context.closePath();
		};
		
		/**
		 * This method draws either hollow or solid candles on the chart.  It is usually called in 2 passes, one for the inner part and again for the outline (border).
		 * It is highly tuned for performance.
		 * This method should rarely if ever be called directly.
		 * @private
		 * @param  {STXChart.Chart} chart       Chart object on which to draw the candles
		 * @param  {function} colorFunction   A function which accepts an STXChart,quote, and mode as its arguments and returns the appropriate color for drawing that mode.  Returning a null will skip that bar
		 * @param  {boolean} isOutline   True will draw the borders, False to draw the inside of the candle
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawCandles=function(chart, colorFunction, isOutline){
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			var panel=chart.panel;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, length;
		
			var borderColor="transparent";
			var fillColor="transparent";
			var borderOffset=0;
		
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			var yAxis=panel.yAxis;
			for(var x=0;x<=quotes.length;x++){
				context.beginPath();
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) continue;
				if(!quote.Open && quote.Open!=0) continue; //null or undefined open can't draw candle
		    	if(quote.Open==quote.Close) continue;	// Doji always drawn by shadow		    	
				var myColor=colorFunction(this,quote,isOutline?"outline":"solid");
				if(!myColor) continue;
				if(isOutline) borderColor=myColor;
				else fillColor=myColor;
				context.fillStyle=fillColor;
				if(!STX.isTransparent(borderColor)) borderOffset=.5;
				if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.open){
		    		var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):((yAxis.high-quote.Open)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		var c=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):((yAxis.high-quote.Close)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
					top=Math.floor(Math.min(o,c))+borderOffset;
					bottom=Math.max(o, c);
					length=Math.floor(bottom-top);
					if(top<t){
						if(top+length<t){
							cache.open=top;
							cache.close=top;
							continue;
						}
						length-=t-top;
						top=t;
					}
					if(top+length>b){
						length-=(top+length-b);
					}
					length=Math.max(length,2);
					cache.open=top;
					cache.close=cache.open+length;
		    	}
				if(cache.open>=b) continue;
				if(cache.close<=t) continue;
				// To avoid fuzziness, without candle borders we want to land on an even number
				// With candle borders we want to land on .5 so we add the borderOffset
				// But with candle borders the borderOffset makes it slightly wider so we make the width 1 pixel less
				var x0=Math.floor(x*this.layout.candleWidth)+borderOffset;
				var x1=x0+this.tmpWidth-(borderOffset*2);
				if(quote.Open==quote.Close){
					top=Math.round(cache.open)-borderOffset;
					context.moveTo(x0, top);
					context.lineTo(x1, top);
				}else{
					context.moveTo(x0, cache.open);
					context.lineTo(x1, cache.open);
					context.lineTo(x1, cache.close);
					context.lineTo(x0, cache.close);
					context.lineTo(x0, cache.open);
				}
				if(fillColor!="transparent") context.fill();
				if(borderOffset){
					context.lineWidth=1;
					context.strokeStyle=borderColor;
					context.stroke();
				}
			}
		};

		STXChart.prototype.drawShadowsHighPerformance=function(chart, style, condition){
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			var panel=chart.panel;
			context.lineWidth=1;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, left;
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			context.beginPath();
			var yAxis=panel.yAxis;
			for(var x=0;x<=quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) continue;
		    	if(condition){
					if(condition & STXChart.CANDLEUP && quote.Open>=quote.Close) continue;
					else if(condition & STXChart.CANDLEDOWN && quote.Open<=quote.Close) continue;
		    		else if(condition & STXChart.CLOSEUP && quote.Close<=quote.iqPrevClose) continue;
		    		else if(condition & STXChart.CLOSEDOWN && quote.Close>=quote.iqPrevClose) continue;
		    		else if(condition & STXChart.CLOSEEVEN && quote.Close!=quote.iqPrevClose) continue;
		    	}
		    	if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.top){
		    		top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):((yAxis.high-quote.High)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):((yAxis.high-quote.Low)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		        	var length=bottom-top;
		        	if(top<t){
		        		if(top+length<t){
		        			cache.top=top;
		        			cache.bottom=top;
		        			continue;
		        		}
		        		length-=t-top;
		        		top=t;
		        	}
		        	if(top+length>b){
		        		length-=(top+length-b);
		        	}
		        	cache.top=top;
		        	cache.bottom=cache.top+length;
		        }
		
		    	if(cache.top>=b) continue;
		    	if(cache.bottom<=t) continue;
				//var xx=Math.floor(Math.floor(x*this.layout.candleWidth) + this.offset)+.5;
				var xx=Math.floor(Math.floor(x*this.layout.candleWidth)+(this.tmpWidth/2))+.5;
				context.moveTo(xx, cache.top);
				context.lineTo(xx, cache.bottom);
				if(quote.Open==quote.Close){
					// Single dash for even
					var x0=xx-this.offset;
					var x1=xx+this.offset;
		    		var o=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):((yAxis.high-quote.Open)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
					if(o<=b && o>=t){
						context.moveTo(x0, o);
						context.lineTo(x1, o);
					}
				}
			}
			this.canvasColor(style);
			context.stroke();
			context.closePath();
		};

		
		/**
		 * This method draws the shadows (wicks) for candles on the chart.
		 * It is highly tuned for performance.
		 * This method should rarely if ever be called directly.
		 * @private
		 * @param  {STXChart.Chart} chart       Chart object on which to draw the wicks
		 * @param  {function} colorFunction   A function which accepts an STXChart,quote, and mode as its arguments and returns the appropriate color for drawing that mode.  Returning a null will skip that bar
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawShadows=function(chart, colorFunction){
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			var panel=chart.panel;
			context.lineWidth=1;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, left;
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			var yAxis=panel.yAxis;
			for(var x=0;x<=quotes.length;x++){
				context.beginPath();
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) continue;
				var color=colorFunction(this,quote,"shadow");
				if(!color) continue;
		    	if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.top){
		    		top=(yAxis.semiLog?this.pixelFromPrice(quote.High,panel):((yAxis.high-quote.High)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low,panel):((yAxis.high-quote.Low)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		        	var length=bottom-top;
		        	if(top<t){
		        		if(top+length<t){
		        			cache.top=top;
		        			cache.bottom=top;
		        			continue;
		        		}
		        		length-=t-top;
		        		top=t;
		        	}
		        	if(top+length>b){
		        		length-=(top+length-b);
		        	}
		        	cache.top=top;
		        	cache.bottom=cache.top+length;
		        }
		
		    	if(cache.top>=b) continue;
		    	if(cache.bottom<=t) continue;
				//var xx=Math.floor(Math.floor(x*this.layout.candleWidth) + this.offset)+.5;
				var xx=Math.floor(Math.floor(x*this.layout.candleWidth)+(this.tmpWidth/2))+.5;
				context.moveTo(xx, cache.top);
				context.lineTo(xx, cache.bottom);
				if(quote.Open==quote.Close || (!quote.Open && quote.Open!=0)){ // doji, or null value for open
					// Single dash for even
					var x0=xx-this.offset;
					var x1=xx+this.offset;
		    		var o=Math.floor((yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):((yAxis.high-quote.Close)*yAxis.multiplier)+yAxis.top))+.5; // inline version of pixelFromPrice() for efficiency
					if(o<=b && o>=t){
						context.moveTo(x0, o);
						context.lineTo(x1, o);
					}
				}
				context.strokeStyle=color;
				context.stroke();
			}
		};
		
		/**
		 * Draws a scatter plot on the chart
		 * The color of the scatter can be set with CSS style stx_scatter_chart
		 * @private
		 * @param  {STXChart.Chart} chart The chart on which to draw
		 * @memberOf STXChart
		 */
		STXChart.prototype.scatter=function(chart){
			var quotes=chart.dataSegment;
			var context=this.chart.context;
			context.beginPath();
			context.lineWidth=4;
			var t=chart.panel.yAxis.top;
			var b=chart.panel.yAxis.bottom;
			for(var x=0;x<=quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				if(!quote.projection){
			    	if(quote.transform) quote=quote.transform;
			    	var scatter=[quote.Close];
			    	if("Scatter" in quote) scatter=quote.Scatter;
			    	for(var i=0;i<scatter.length;i++){
			    		var top=this.pixelFromPrice(scatter[i], chart.panel);
			    		if(top<t) continue;
			    		if(top>b) continue;
			    		var xx=x*this.layout.candleWidth;
			    		var xxo=xx+this.offset;
			    		context.moveTo(xxo-2, top);
			    		context.lineTo(xxo+2, top);
			    	}
				}
			}
			this.canvasColor("stx_scatter_chart");
			context.stroke();
			context.closePath();
		
		};

		STXChart.prototype.drawBarChartHighPerformance=function(chart, style, condition){
			var quotes=chart.dataSegment;
			var panel=chart.panel;
			var context=chart.context;
			context.beginPath();
			context.lineWidth=1;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, length;
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			var yAxis=panel.yAxis;
			for(var x=0;x<=quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) break;
		    	if(condition){
		    		if(condition & STXChart.CLOSEUP && quote.Close<=quote.iqPrevClose) continue;
		    		else if(condition & STXChart.CLOSEDOWN && quote.Close>=quote.iqPrevClose) continue;
		    		else if(condition & STXChart.CLOSEEVEN && quote.Close!=quote.iqPrevClose) continue;
		    	}
		    	if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.top){
			    	top=(yAxis.semiLog?this.pixelFromPrice(quote.High, panel):((yAxis.high-quote.High)*yAxis.multiplier)+yAxis.top);
			    	bottom=(yAxis.semiLog?this.pixelFromPrice(quote.Low, panel):((yAxis.high-quote.Low)*yAxis.multiplier)+yAxis.top);
			    	var length=bottom-top;
		    		cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):((yAxis.high-quote.Open)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):((yAxis.high-quote.Close)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
			    	//cache.open=this.pixelFromPrice(quote.Open, panel);
			    	//cache.close=this.pixelFromPrice(quote.Close, panel);
			    	if(top<t){
			    		if(top+length<t){
			    			cache.top=top;
			    			cache.bottom=top;
			    			continue;
			    		}
			    		length-=t-top;
			    		top=t;
			    	}
			    	if(top+length>b){
			    		length-=(top+length-b);
			    	}
			    	//length=Math.max(length,2);
			    	cache.top=top;
			    	cache.bottom=top+length;
		    	}
		    	var xx=x*this.layout.candleWidth;
		    	var xxo=xx+this.offset;
		    	if(cache.top<b && cache.bottom>t){
		    		var xx2=Math.round(xxo)+.5;
		    		context.moveTo(xx2, cache.top);
		    		context.lineTo(xx2, cache.bottom);
		    	}
		
		    	if(cache.open>t && cache.open<b){
		    		context.moveTo(xx, cache.open);
		    		context.lineTo(xxo, cache.open);
		    	}
		    	if(cache.close>t && cache.close<b){
		    		context.moveTo(xxo, cache.close);
		    		context.lineTo(xxo+this.offset, cache.close);
		    	}
			}
			this.canvasColor(style);
			context.stroke();
			context.closePath();
		};
		
		/**
		 * This method draws bars on the chart.
		 * It is highly tuned for performance.
		 * This method should rarely if ever be called directly.
		 * @private
		 * @param  {STXChart.Chart} chart       Chart object on which to draw the bars
		 * @param  {function} colorFunction   A function which accepts an STXChart and quote as its arguments and returns the appropriate color for drawing that mode.  Returning a null will skip that bar
		 * @return {object} Colors used in the plot (as the keys of the object)
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawBarChart=function(chart, colorFunction){
			var quotes=chart.dataSegment;
			var panel=chart.panel;
			var context=chart.context;
			context.lineWidth=1;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var top, bottom, length;
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			var yAxis=panel.yAxis;
			var colors={};
			for(var x=0;x<=quotes.length;x++){
				var quote=quotes[x];
				if(quote==null) continue;
				if(quote.projection) break;
		    	var color=colorFunction(this,quote);
		    	if(color==null) continue;
		    	colors[color]=1;
		    	context.strokeStyle=color;
				context.beginPath();
		    	if(quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+x;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache.top){
			    	top=this.pixelFromPrice(quote.High, panel);
			    	bottom=this.pixelFromPrice(quote.Low, panel);
			    	var length=bottom-top;
		    		cache.open=(yAxis.semiLog?this.pixelFromPrice(quote.Open,panel):((yAxis.high-quote.Open)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		cache.close=(yAxis.semiLog?this.pixelFromPrice(quote.Close,panel):((yAxis.high-quote.Close)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
			    	//cache.open=this.pixelFromPrice(quote.Open, panel);
			    	//cache.close=this.pixelFromPrice(quote.Close, panel);
			    	if(top<t){
			    		if(top+length<t){
			    			cache.top=top;
			    			cache.bottom=top;
			    			continue;
			    		}
			    		length-=t-top;
			    		top=t;
			    	}
			    	if(top+length>b){
			    		length-=(top+length-b);
			    	}
			    	//length=Math.max(length,2);
			    	cache.top=top;
			    	cache.bottom=top+length;
		    	}
		    	var xx=x*this.layout.candleWidth;
		    	var xxo=xx+this.offset;
		    	if(cache.top<b && cache.bottom>t){
		    		var xx2=Math.round(xxo)+.5;
		    		context.moveTo(xx2, cache.top);
		    		context.lineTo(xx2, cache.bottom);
		    	}
		
		    	if(cache.open>t && cache.open<b){
		    		context.moveTo(xx, cache.open);
		    		context.lineTo(xxo, cache.open);
		    	}
		    	if(cache.close>t && cache.close<b){
		    		context.moveTo(xxo, cache.close);
		    		context.lineTo(xxo+this.offset, cache.close);
		    	}
				context.stroke();
			}
			return colors;
		};
		
		/**
		 * Plots a line chart. This should not be called directly. It is used by {@link STXChart.drawLineChart} and {@link STXChart.drawMountainChart} (to draw the "edge" of the mountain)
		 * @private
		 * @param  {STXChart.Panel} panel      The panel to draw the line chart
		 * @param  {Array} quotes     The quotes to draw from (typically dataSegment)
		 * @param  {string} field      The field to pull from quotes (typically "Close")
		 * @param  {object} [parameters] Parameters for the drawing operation
		 * @param {boolean} [parameters.skipTransform] If true then any transformations (such as comparison charting) will not be applied
		 * @param {boolean} [parameters.label] If true then the y-axis will be marked with the value of the right-hand intercept of the line
		 * @param {boolean} [parameters.noSlopes] If true then chart will resenble a step line chart with no vertical lines.
		 * @param {boolean} [parameters.labelDecimalPlaces] Optionally specify the number of decimal places to print on the label. If not set then it will match the y-axis.
		 * @param  {function} colorFunction   (optional) A function which accepts an STXChart and quote as its arguments and returns the appropriate color for drawing that mode.
												Returning a null will skip that line segment.  If not passed as an argument, will use the color set in the calling function.
		 * @return {object} Colors used in the plot (as the keys of the object)
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotLineChart=function(panel, quotes, field, parameters, colorFunction){
			var skipProjections=false;
			var skipTransform=false;
			var noSlopes=false;
			if(parameters){
				skipProjections=parameters.skipProjections; // Internal only, stop drawing if we reach a projection
				skipTransform=parameters.skipTransform;
				noSlopes=parameters.noSlopes;
			}
			var chart=panel.chart;
			var context=this.chart.context;
			var first=true;
			var yAxis=panel.yAxis;
			var t=yAxis.top;
			var b=yAxis.bottom;
			var leftTick=chart.dataSet.length - chart.scroll;
			var rightTick=leftTick+chart.maxTicks;
			var lastVal=null;
			var colors={};
			var lastXY=[0,0];
			var clipping=false;
			context.beginPath();
			for(var i=0;i<=quotes.length;i++){
				var quote=quotes[i];
				if(quote==null) continue;
				if(skipProjections && quote.projection) break;
		    	if(!skipTransform && quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+i;
		    	if(!quote[field] && quote[field]!=0) continue;
		    	lastVal=quote[field];
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache[field]){
		    		cache[field]=(yAxis.semiLog?this.pixelFromPrice(lastVal,panel):((yAxis.high-lastVal)*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    		//cache[field]=this.pixelFromPrice(lastVal, panel);
		    	}
				var x=i*this.layout.candleWidth + this.offset;
				if(this.extendLastTick && i==quotes.length-1){
					x+=this.offset;	// last tick
				}
				var y=cache[field];
				if(colorFunction){
					var color=colorFunction(this,quote);
					if(!color) continue;
					if(context.strokeStyle!=color){
						if(!first){
							context.stroke();
							context.beginPath();
							context.moveTo(lastXY[0], lastXY[1]);  //reset back to last point
						}
						context.strokeStyle=color;
						colors[color]=1;
					}
				}
				// If we detect that we're going over the edge then initiate a clip
				if(!clipping && (y<t || y>b)){
					clipping=true;
					if(!first){
						context.stroke();
					}
					context.save();
					context.beginPath();
					context.rect(this.chart.left, t, this.chart.width, b-t);
					context.clip();
					context.beginPath();
					if(!first) context.moveTo(lastXY[0], lastXY[1]);  //reset back to last point
				}
				if(first){
					first=false;
					if(noSlopes || leftTick<=0){
						context.moveTo(x, y);
					}else if(leftTick>0){
						var baseline=chart.dataSet[leftTick-1];
						if(!skipTransform && baseline.transform) baseline=baseline.transform;
						var y0=baseline[field];
						y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):((yAxis.high-y0)*yAxis.multiplier)+yAxis.top);
						y0=Math.min(Math.max(y0,t),b);
						context.moveTo((i-1)*this.layout.candleWidth + this.offset, y0);
						context.lineTo(x, y);					
					}
				}else{
					if(noSlopes){
						var quote1=quotes[i-1];
						if(quote1==null) continue;
				    	if(!skipTransform && quote1.transform) quote1=quote1.transform;
				    	if(i && y!=quote1.cache[field]){
							context.lineTo(x, lastXY[1]);
							context.moveTo(x, y);
						}else{
							context.lineTo(x, y);
						}
					}else{
						context.lineTo(x, y);
					}
				}
				lastXY=[x,y];
			}
			context.stroke();
			if(clipping) context.restore();
			if(parameters.label && lastVal!=null){
				var txt;
				if(yAxis.priceFormatter){
					txt=yAxis.priceFormatter(this, panel, lastVal, parameters.labelDecimalPlaces);
				}else{
					txt=this.formatYAxisPrice(lastVal, panel, parameters.labelDecimalPlaces);
				}
		    	this.createYAxisLabel(panel, txt, y, context.strokeStyle, "#FFFFFF");
			}
			return colors;
		};
		
		/**
		 * Plots a mountain chart. This method does not set styles. Styles are set by {@link STXChart.drawMountainChart} which calls this method.
		 * @private
		 * @param  {STXChart.Panel} panel      The panel on which to print the mountain
		 * @param  {Array} quotes     The array of quotes (typically dataSegment)
		 * @param  {string} field      The field to drive the mountain (typically "Close")
		 * @param  {object} [parameters] Optional parameters to drive the drawing
		 * @param {boolean} [parameters.skipTransform] If true then any transformations (such as comparison charting) will not be applied 
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotMountainChart=function(panel, quotes, field, parameters){
			var skipProjections=false;
			var skipTransform=false;
			if(parameters){
				skipProjections=parameters.skipProjections;
				skipTransform=parameters.skipTransform;
			}
			var chart=panel.chart;
			var context=this.chart.context;
			var first=true;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			context.save();
			context.beginPath();
			context.rect(0, t, this.chart.width, b-t);
			context.clip();
			context.beginPath();
			var leftTick=chart.dataSet.length - chart.scroll;
			//var rightTick=leftTick+chart.maxTicks;
			var firstX=null, firstY=null;
			var yAxis=panel.yAxis;
			var x=0;
			for(var i=0;i<=quotes.length;i++){
				var quote=quotes[i];
				if(quote==null) continue;
				if(skipProjections && quote.projection) break;
		    	if(!skipTransform && quote.transform) quote=quote.transform;
		    	var cache=quote.cache;
		    	var tick=leftTick+i;
		    	if(tick<panel.cacheLeft || tick>panel.cacheRight || !cache[field]){
		        	if(!quote[field] && quote[field]!=0) continue;
		     		cache[field]=(yAxis.semiLog?this.pixelFromPrice(quote[field],panel):((yAxis.high-quote[field])*yAxis.multiplier)+yAxis.top); // inline version of pixelFromPrice() for efficiency
		    	}
				x=i*this.layout.candleWidth + this.offset;
				if(this.extendLastTick && i==quotes.length-1){
					x+=this.offset;	// last tick
				}
				if(firstX==null) firstX=x;
				var y=cache[field];
				if(firstY==null) firstY=y;
				if(first){
					first=false;
					if(leftTick<=0){
						context.moveTo(x, y);
					}else{
						var baseline=chart.dataSet[leftTick-1];
						if(baseline.transform) baseline=baseline.transform;
						var y0=baseline[field];
						y0=(yAxis.semiLog?this.pixelFromPrice(y0,panel):((yAxis.high-y0)*yAxis.multiplier)+yAxis.top);
						y0=Math.min(Math.max(y0,t),b);
						firstX=this.offset-this.layout.candleWidth;
						context.moveTo(firstX, y0);
						context.lineTo(x, y);
					}
				}else{
					context.lineTo(x, y);
				}
			}
			context.lineTo(x,b);
			context.lineTo(firstX, b);
			if(firstY>b) firstY=b;
			context.lineTo(firstX, firstY);
			context.fill();
			context.closePath();
			context.restore();
		};
		
		/**
		 * Draws a line chart. Calls {@link STXChart.plotLineChart} after setting styles.
		 * Use CSS style stx_line_chart to control width and color of line charts
		 * @param  {STXChart.Chart} chart The chart on which to draw the line chart
		 * @param  {string} style   The style selector which contains the styling for the bar (width and color)
		 * @param  {function} colorFunction   (optional) A function which accepts an STXChart and quote as its arguments and returns the appropriate color for drawing that mode.
												Returning a null will skip that bar.  If not passed as an argument, will use a default color.
		 * @return {object} Colors used in the plot (as the keys of the object)
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawLineChart=function(chart, style, colorFunction){
			var context=this.chart.context;
			var c=this.canvasStyle(style);
			if(c.width && parseInt(c.width,10)<=25){
				context.lineWidth=Math.max(1,STX.stripPX(c.width));
			}else{
				context.lineWidth=1;
			}
			this.canvasColor(style);
			return this.plotLineChart(chart.panel, chart.dataSegment, "Close", {skipProjections:true}, colorFunction);
		};
		
		/**
		 * Draws a mountain chart. Calls {@link STXChart.plotMountainChart} after setting styles.
		 * Use the CSS style stx_mountain_chart to control the mountain chart display
		 *
		 * backgroundColor - color of chart
		 * color - If set then this will be the gradient
		 * border - If set then the color of the "edge" of the chart (the line chart)
		 * width - If set then controls the width of the "edge" of the chart (the line chart)
		 * @param  {STXChart.Chart} chart The chart on which to draw the mountain chart
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawMountainChart=function(chart){
			var context=this.chart.context;
			var c=this.canvasStyle("stx_mountain_chart");
			if(c.width && parseInt(c.width,10)<=25){
				context.lineWidth=Math.max(1,STX.stripPX(c.width));
			}else{
				context.lineWidth=1;
			}
			var panel=this.chart.panel;
			var top=this.pixelFromPrice(this.chart.highValue, panel);
			if(isNaN(top)) top=0;	// 32 bit IE doesn't like large numbers
			var backgroundColor=c["backgroundColor"];
			var color=c["color"];
			if(color && color!="transparent"){
				var gradient=context.createLinearGradient(0,top,0,panel.yAxis.bottom);
				gradient.addColorStop(0, backgroundColor);
				gradient.addColorStop(1, color);
				context.fillStyle=gradient;
			}else{
				context.fillStyle=backgroundColor;
			}
		
			this.plotMountainChart(panel, chart.dataSegment, "Close", {skipProjections:true});
			var strokeStyle=c["borderTopColor"];
			if(strokeStyle && strokeStyle!="transparent"){
				context.strokeStyle=strokeStyle;
				this.plotLineChart(panel, chart.dataSegment, "Close", {skipProjections:true});
			}
		};
		
		/**
		 * Draws a "wave" chart. A wave chart extrapolates intraday movement from OHLC and creates 4 data points from a single
		 * candle, for instance to create a pseudo-intraday chart from daily data.
		 * @param  {STXChart.Chart} chart The chart on which to draw the wave chart
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawWaveChart=function(chart){
			var quotes=chart.dataSegment;
			var panel=chart.panel;
			var context=this.chart.context;
			context.beginPath();
			var first=false;
			var reset=false;
			var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			for(var i=0;i<=quotes.length;i++){
				var quote=quotes[i];
				if(quote==null) continue;
				if(quote.projection) break;
		    	if(quote.transform) quote=quote.transform;
				var x=i*this.layout.candleWidth + this.offset;
				var y=this.pixelFromPrice(quote.Open, panel);
				if(y<t){
					y=t;
					if(reset){
						context.moveTo(x,y);
						continue;
					}
					reset=true;
				}else if(y>b){
					y=b;
					if(reset){
						context.moveTo(x,y);
						continue;
					}
					reset=true;
				}else{
					reset=false;
				}
				if(!first){
					first=true;
					var leftTick=chart.dataSet.length-chart.scroll;
					if(leftTick<=0){
						context.moveTo(x, y);
					}else if(leftTick>0){
						var baseline=chart.dataSet[leftTick-1];
						if(baseline.transform) baseline=baseline.transform;
						var y0=baseline.Close;
						y0=(panel.yAxis.semiLog?this.pixelFromPrice(y0,panel):((panel.yAxis.high-y0)*panel.yAxis.multiplier)+t);
						y0=Math.min(Math.max(y0,t),b);
						context.moveTo((i-1)*this.layout.candleWidth + this.offset, y0);
						context.lineTo(x, y);					
					}
					context.moveTo(x, y);
				}else{
					context.lineTo(x, y);
				}
		
				x+=this.layout.candleWidth/4;
				if(quote.Open<quote.Close){
					y=this.pixelFromPrice(quote.Low, panel);
					if(y<t) y=t;
					if(y>b) y=b;
					context.lineTo(x, y);
					x+=this.layout.candleWidth/4;
					y=this.pixelFromPrice(quote.High, panel);
					if(y<t) y=t;
					if(y>b) y=b;
					context.lineTo(x, y);
				}else{
					y=this.pixelFromPrice(quote.High, panel);
					if(y<t) y=t;
					if(y>b) y=b;
					context.lineTo(x, y);
					x+=this.layout.candleWidth/4;
					y=this.pixelFromPrice(quote.Low, panel);
					if(y<t) y=t;
					if(y>b) y=b;
					context.lineTo(x, y);
				}
		
				x+=this.layout.candleWidth/4;
				y=this.pixelFromPrice(quote.Close, panel);
				if(y<t) y=t;
				if(y>b) y=b;
				context.lineTo(x, y);
			}
			var c=this.canvasStyle("stx_line_chart");
			if(c.width && parseInt(c.width,10)<=25){
				context.lineWidth=Math.max(1,STX.stripPX(c.width));
			}else{
				context.lineWidth=1;
			}
			this.canvasColor("stx_line_chart");
			context.stroke();
			context.closePath();
		};

		/**
		 * Redraws the floating price arrow on the crosshairs tools.
		 * @param  {STXChart.Panel} panel   The panel on which to print the label
		 * @param  {string} txt             The text for the label
		 * @param  {number} y               The Y position on the canvas for the label. This method will ensure that it remains on the requested panel.
		 * @memberOf STXChart
		 */
		
		STXChart.prototype.updateFloatHRLabel = function (panel, y, txt) {
			var canvas = this.controls.floatHR.childNodes[0];
			var context=canvas.context=canvas.getContext('2d');
			var margin = 3;
			var height = this.getCanvasFontSize("stx_yaxis") + margin * 2;
			this.canvasFont("stx_yaxis", context);
			if(!canvas.rendered) STX.clearCanvas(canvas,this);
			var drawBorders=panel.yAxis.displayBorder || this.axisBorders;
			var tickWidth=drawBorders?3:0; // pixel width of tick off edge of border
			try{
				var width = context.measureText(txt).width + tickWidth + margin * 2;
			} catch (e){
				width = this.chart.canvasWidth - this.yaxisLeft;
			} // Firefox doesn't like this in hidden iframe

			if(!canvas.rendered || canvas.renderedWidth!=width){
				STX.clearCanvas(canvas,this);
				canvas.renderedWidth=width;
				this.canvasColor("stx-float-price-arrow", context);
				STX[this.yaxisLabelStyle](context, 8, 0, width, height, 3, true, false, "left");
				canvas.rendered=true;
				context.textBaseline = "middle";
			}

			// offset by 1 for true vertical centering since these only contain numbers
			if(STX.isIE8){
				var span=this.controls.floatHR.getElementsByTagName("SPAN")[0];
				//span.style.color=this.containerColor;
				//if(STX.isTransparent(span.style.color)) span.style.color="#FFFFFF";
				if(span){
					span.style.top="3px";
					span.style.left="10px";
					span.style.zIndex=1;
					span.innerHTML=txt;
				}
			}else{
				this.controls.floatHR.childNodes[1].style.width = width+"px";
				this.controls.floatHR.childNodes[1].innerHTML = txt;
			}
		}

		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * This method computes and fills in the value of the "hr" div, which is the div that floats along the Y axis with the
		 * current price for the crosshair. It also fills in the "floatDate" div which floats along the X axis.
		 * This is an appropriate place to inject an append method for drawing a head's up display if desired.
		 * @memberOf STXChart
		 */
		STXChart.prototype.headsUpHR=function(){
			if(this.runPrepend("headsUpHR", arguments)) return;
			var panel=this.currentPanel;
			if(!panel) return;
			var chart=panel.chart;
			var cy=this.cy;
			if(panel.name=="vchart"){
				var y=panel.bottom-cy;
				var px=panel.shadow/panel.height;
				var amount=panel.min + y*px;
				this.updateFloatHRLabel(panel, y, STX.condenseInt(amount));
			}else{
				var price=this.valueFromPixel(cy, panel);
				var labelDecimalPlaces=null;
				if(panel.chart.name!=panel.name){ // If a study panel, this logic allows the cursor to print more decimal places than the yaxis default for panels
					labelDecimalPlaces=0;
					if(panel.yAxis.shadow<1000) labelDecimalPlaces=2;
					if(panel.yAxis.shadow<5) labelDecimalPlaces=4;
				}
				price=this.formatYAxisPrice(price, panel, labelDecimalPlaces);
				this.updateFloatHRLabel(panel, cy, price);
			}
			if(this.controls.floatDate){
				var bar=this.barFromPixel(this.cx);
				var prices=chart.xaxis[bar];
				if(prices && prices.DT){
					if(chart.xAxis.formatter){
						this.controls.floatDate.innerHTML=chart.xAxis.formatter(prices.DT);
					}else if(this.internationalizer){
						var str=this.internationalizer.monthDay.format(prices.DT);
						if(prices.DT.getHours()!=0 || prices.DT.getMinutes()!=0 || !STXChart.isDailyInterval(this.layout.interval))
							str+=" " + this.internationalizer.hourMinute.format(prices.DT);
						this.controls.floatDate.innerHTML=str;
					}else{
						var m=prices.DT.getMonth()+1;
						if(m<10) m="0" + m;
						var d=prices.DT.getDate();
						if(d<10) d="0" + d;
						var h=prices.DT.getHours();
						if(h<10) h="0" + h;
						var mn=prices.DT.getMinutes();
						if(mn<10) mn="0" + mn;
						if((h=="00" && mn=="00") || STXChart.isDailyInterval(this.layout.interval)) this.controls.floatDate.innerHTML=m + "-" + d + "-" + prices.DT.getFullYear();
						else this.controls.floatDate.innerHTML=m + "-" + d + " " + h + ":" + mn;
					}
				}else if(prices && prices.index){
					this.controls.floatDate.innerHTML=prices.index;
				}
			}
		
			if(this.runAppend("headsUpHR", arguments)) return;
		};
		
		// TODO, deprecated
		STXChart.prototype.setCrosshairColors=function(){
			return;
			if(this.runPrepend("setCrosshairColors", arguments)) return;
			var newClassName="stx_crosshair";
			var oldClassName="stx_crosshair_drawing";
		
			if((STXChart.drawingLine ||
				this.currentVectorParameters.vectorType=="horizontal" ||
				this.currentVectorParameters.vectorType=="vertical" ||
				this.currentVectorParameters.vectorType=="projection" ||
				this.currentVectorParameters.vectorType=="annotation")){
				newClassName="stx_crosshair_drawing";
				oldClassName="stx_crosshair";
			}
			if(this.controls.crossX.className.indexOf(newClassName)==-1){
				STX.swapClassName(this.controls.crossX, newClassName, oldClassName);
				STX.swapClassName(this.controls.crossY, newClassName, oldClassName);
			}
			this.runAppend("setCrosshairColors", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Calculates the magnet point for the current mouse cursor location. This is the nearest OHLC point. A small white
		 * circle is drawn on the temporary canvas to indicate this location for the end user. If the user initiates a drawing then 
		 * the end point of the drawing will be tied to the magnet point. This function is only entered if preferences.magnet is true and
		 * a drawing type (STXChart#currentVectorParameters.vectorType) has been enabled.
		 * @memberOf STXChart
		 */
		STXChart.prototype.magnetize=function(){
			this.magnetizedPrice=null;
			if(this.runPrepend("magnetize", arguments)) return;
			if(this.currentVectorParameters.vectorType=="annotation" && STXChart.drawingLine) return;	// Don't magnetize the end of an annotation
			if(this.currentVectorParameters.vectorType=="projection") return;
			if(this.currentVectorParameters.vectorType=="freeform") return;
			var panel=this.currentPanel;
			if(panel.name==panel.chart.name){	// panel is chart type
				var chart=panel.chart;
				var tick=this.tickFromPixel(STXChart.crosshairX-this.chart.left, chart);
				if(this.layout.interval!="minute") tick/=this.layout.periodicity;
				if(tick>chart.dataSet.length) return;	// Don't magnetize in the future
				var prices=chart.dataSet[tick];
				if(prices==null) return;
				var price=this.valueFromPixel(this.cy, panel);
				this.magnetizedPrice=prices.Close;
				if(this.layout.chartType=="bar" || this.layout.chartType=="candle" || this.layout.chartType=="colored_bar" || this.layout.chartType=="hollow_candle"){
					var fields=["Open","High","Low","Close"];
					var closest=1000000000;
					for(var i=0;i<fields.length;i++){
						var fp=prices[fields[i]];
						if(Math.abs(price-fp)<closest){
							closest=Math.abs(price-fp);
							this.magnetizedPrice=fp;
						}
					}
				}
				var x=this.pixelFromTick(tick, chart);
				var y=this.pixelFromPrice(this.magnetizedPrice, this.currentPanel);
				var ctx=this.chart.tempCanvas.context;
				ctx.beginPath();
				ctx.lineWidth=1;
				var radius=Math.max(this.layout.candleWidth, 8)/2;
				ctx.arc(x, y, radius, 0, 2*Math.PI, false);
				ctx.fillStyle="#FFFFFF";
				ctx.strokeStyle="#000000";
				ctx.fill();
				ctx.stroke();
				ctx.closePath();
			}
			this.runAppend("magnetize", arguments);
		};
		
		/**
		 * Positions the crosshairs at the last known mouse/finger pointer position. This ensures
		 * on touch devices that the crosshairs are at a known position. It is called by the DrawingToolbar.
		 */
		STXChart.prototype.positionCrosshairsAtPointer=function(){
			if(!this.currentPanel) return;
			var chart=this.currentPanel.chart;
			var tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX), chart);
			tick/=this.layout.periodicity;
			this.cy=this.backOutY(STXChart.crosshairY);
			this.cx=this.backOutX(STXChart.crosshairX);
			this.controls.crossX.style.left=(this.pixelFromTick(tick, chart)-.5) + "px";
			this.controls.crossY.style.top=this.backOutY(STXChart.crosshairY) + "px";
			this.updateChartAccessories();
		};
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * This method is called to display crosshairs *if* the user has crosshairs enabled or is in the process of drawing (a non dragToDraw) drawing tool.
		 * This is the counter method to {@link STXChart.undisplayCrosshairs} which is called, for instance, when the user mouses out of the chart or mouses
		 * over a chart element.
		 * @memberOf STXChart
		 */
		STXChart.prototype.doDisplayCrosshairs=function(){
			if(this.runPrepend("doDisplayCrosshairs", arguments)) return;
			if(this.displayInitialized){
				if(!this.layout.crosshair && (this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType)){
					this.undisplayCrosshairs();
				}else if(STX.Drawing[this.currentVectorParameters.vectorType] && (new STX.Drawing[this.currentVectorParameters.vectorType]).dragToDraw){
					this.undisplayCrosshairs();
				}else{
					if(this.controls.crossX.style.display!=""){
						this.controls.crossX.style.display="";
						this.controls.crossY.style.display="";
						this.controls.floatHR.style.display="";
						if(this.preferences.magnet && this.currentVectorParameters.vectorType!=""){
							document.body.style.cursor="none";
						}else{
							document.body.style.cursor="crosshair";
						}
					}
					if(this.controls.floatDate){
						this.controls.floatDate.style.display="block";
					}
				}
			}
			if(this.runAppend("doDisplayCrosshairs", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * 
		 * Hides the crosshairs. This is called for instance when the user mouses out of the chart or over a chart control. The crosshairs
		 * are turned back on by a call to {@link STXChart.doDisplayCrosshairs}
		 * @memberOf STXChart
		 */
		STXChart.prototype.undisplayCrosshairs=function(){
			if(this.runPrepend("undisplayCrosshairs", arguments)) return;
			if(this.controls.crossX!=null){
				if(this.controls.crossX.style.display!="none"){
					this.controls.crossX.style.display="none";
					this.controls.crossY.style.display="none";
					this.controls.floatHR.style.display="none";
				}
			}
			if(this.displayInitialized && this.controls.floatDate){
				this.controls.floatDate.style.display="none";
			}
			document.body.style.cursor="auto";
			if(this.runAppend("undisplayCrosshairs", arguments)) return;
		};
		
		/**
		 * Sets the chart into a modal mode. Crosshairs are hidden and the chart will not respond to click or mouse events. Call this
		 * for instance if you are enabling a dialog box and don't want errant mouse activity to affect the chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.modalBegin=function(){
			this.openDialog="modal";
			this.undisplayCrosshairs();
		};
		
		/**
		 * Ends modal mode.
		 * @memberOf STXChart
		 */
		STXChart.prototype.modalEnd=function(){
			this.cancelTouchSingleClick=true;
			this.openDialog="";
			this.doDisplayCrosshairs();
		};
		
		/**
		 * Updates the floatDate and floatHR elements and calls {@link STXChart.headsUpHR}. A timer is used to prevent this operation
		 * from being called more frequently than once every 100 milliseconds in order to improve performance during scrolling.
		 * @memberOf STXChart
		 */
		STXChart.prototype.updateChartAccessories=function(){
			this.accessoryTimer=null;
			this.lastAccessoryUpdate=new Date().getTime();
			var xy=STX.getPos(this.controls.floatHR.parentNode);
			this.controls.floatHR.style.top=(STXChart.crosshairY-xy.y-this.controls.floatHR.offsetHeight/2)+ "px";
			var floatDate=this.controls.floatDate;
			if(floatDate){
				var panel=this.currentPanel;
				if(!panel) panel=this.chart.panel;
				if(panel){
					var chart=panel.chart;
					floatDate.style.left=(this.backOutX(STXChart.crosshairX)-(floatDate.offsetWidth/2)) + "px";
					floatDate.style.bottom=(this.chart.canvasHeight-chart.panel.bottom) + "px";
				}
			}
			this.headsUpHR();
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Handles mouse movement events. This method calls {@link STXChart#mousemoveinner} which has the core logic
		 * for dealing with panning and zooming. See also {@link STXChart#touchmove} which is the equivalent method for touch events.
		 * @param  {Event} e A mouse move event
		 * @memberOf STXChart
		 */
		STXChart.prototype.mousemove=function(e$){
			var e=e$?e$:event;
			if(!e.pageX){
				e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			STXChart.crosshairX=e.pageX;	// These are used by the UI so make sure they are set even if no chart is set
			STXChart.crosshairY=e.pageY;
			if(this.runPrepend("mousemove", arguments)) return;
			if(!this.displayInitialized) return;	// No chart displayed yet
			if(this.openDialog!="") return;	// Don't show crosshairs when dialog is open
			this.mousemoveinner(e.pageX, e.pageY);
			if(this.runAppend("mousemove", arguments)) return;
		};
		
		/**
		 * Set a timer to check for chart resizing. Normally the chart is resized whenever the screen is resized
		 * by capturing a screen resize event. However if charts are embedded in a windowing GUI then they may not
		 * receive such events when windows are resized. Ideally, stxx.resizeChart() should be called whenever a window
		 * is resized however if this is inconvenient then the resize timer can be enabled to cover all bases without too much effort.
		 *
		 * On initialization, STXChart.resizeDetectMS is checked for the default resize checking interval. The default is 1,000 milliseconds.
		 * To turn off resize checking simply set STXChart.resizeDetectMS=0; when you declare your STXChart object.
		 * @param {number} ms Number of milliseconds to poll. Zero to stop checking.
		 * @memberOf STXChart
		 */
		
		STXChart.prototype.setResizeTimer=function(ms){
			this.resizeDetectMS=ms;
			function closure(self){
				return function(){
					if(!self.chart.canvas) return;
					if(!STX.isAndroid){
						if(self.chart.canvas.height!=Math.floor(self.devicePixelRatio*self.chart.container.clientHeight) || self.chart.canvas.width!=Math.floor(self.devicePixelRatio*self.chart.container.clientWidth)){
							self.resizeChart();
							return;
						}
					}
				};
			};
			if(ms){
				if(this.resizeTimeout) window.clearInterval(this.resizeTimeout);
				this.resizeTimeout=window.setInterval(closure(this), ms);
			}else{
				if(this.resizeTimeout) window.clearInterval(this.resizeTimeout);
				this.resizeTimeout=null;
			}
		};
		
		/**
		 * Core logic for handling mouse or touch movements on the chart. If this.grabbingScreen is true then drag operations are performed.
		 * If this.ctrl (representing a ctrl key held) is also set then zooming operations will be performed (pinch zoom is handled in {@link STXChart#touchmove}.
		 * Otherwise the mouse cursor is moved.
		 *
		 * This method sets several variables which can be accessed for convenience:
		 *
		 * STXChart.crosshairX and STXChart.crosshairY - The screen location of the crosshair
		 * STXChart.insideChart - True if the cursor is inside the canvas
		 * this.cx and this.cy - The location on the canvas of the crosshair
		 * this.crosshairTick - The current location in the dataSet of the crosshair
		 * this.currentPanel - The current panel in which the crosshair is located (this.currentPanel.chart is the chart)
		 * this.grabStartX and this.grabStartY - If grabbing the chart, then the starting points of that grab
		 * this.grabStartScrollX and this.grabStartScrollY - If grabbing the chart, then the starting scroll positions of the grab
		 * this.zoom - The vertical zoom percentage
		 * this.scroll - The scroll position of the chart
		 * 
		 * @param  {number} epX The X location of the cursor on the screen
		 * @param  {number} epY The Y location of the cursor on the screen
		 * @memberOf STXChart
		 */
		STXChart.prototype.mousemoveinner=function(epX,epY){
			if(!this.chart.canvas) return;
			if(!STX.isAndroid){
				if(this.chart.canvas.height!=Math.floor(this.devicePixelRatio*this.chart.container.clientHeight) || this.chart.canvas.width!=Math.floor(this.devicePixelRatio*this.chart.container.clientWidth)){
					this.resizeChart();
					return;
				}
			}
			if(this.runPrepend("mousemoveinner", arguments)) return;
			STXChart.crosshairX=epX;
			STXChart.crosshairY=epY;
			var cy=this.cy=this.backOutY(STXChart.crosshairY);
			var cx=this.cx=this.backOutX(STXChart.crosshairX);
			this.currentPanel=this.whichPanel(cy);
			if(!this.currentPanel) this.currentPanel=this.chart.panel;
			if(!this.currentPanel) return;
			var chart=this.currentPanel.chart;
			if(chart.dataSet){
				this.crosshairTick=this.tickFromPixel(cx, chart)/this.layout.periodicity;
				//todo, this is a little misleading because it is the unadjusted value. Push that adjustIfNecessary down the stack
				this.crosshairValue=this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(cy, this.currentPanel));
			}
			if(STXChart.crosshairX>=this.chart.left && STXChart.crosshairX<=this.chart.canvasRight && STXChart.crosshairY>=this.chart.top && STXChart.crosshairY<=this.chart.bottom){
				STXChart.insideChart=true;
			}else{
				STXChart.insideChart=false;
			}
			this.overXAxis=STXChart.crosshairY>=this.chart.top+this.chart.panel.yAxis.bottom &&
							STXChart.crosshairY<=this.chart.top+this.chart.panel.bottom &&
							STXChart.insideChart;
			this.overYAxis=STXChart.crosshairX>=this.chart.right && STXChart.insideChart;
			// Don't display crosshairs if we're outside of the chart area, or over the x-axis or y-axis
			if(this.overXAxis || this.overYAxis || (!STXChart.insideChart && !this.grabbingScreen)){
				this.undisplayCrosshairs();
				if(!this.overXAxis && !this.overYAxis) return;	// If over y-axis, close crosshairs but move forward
			}
			if(!this.displayCrosshairs && STXChart.resizingPanel==null){
				this.undisplayCrosshairs();
				return;
			}
			if(this.grabbingScreen && !STXChart.resizingPanel){
				if(this.anyHighlighted){
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.anyHighlighted=false;
					for(var n in this.overlays){
						this.overlays[n].highlight=false;
					}
		            for(var n in chart.series){
		                chart.series[n].highlight=false;
		            }
					this.displaySticky();
				}
				if(this.preferences.magnet && this.currentVectorParameters.vectorType!=""){
					STX.clearCanvas(this.chart.tempCanvas, this);
				}
		
		        if(this.grabStartX==-1){
		        	this.grabStartX=STXChart.crosshairX;
		        	this.grabStartScrollX=chart.scroll;
		        }
		        if(this.grabStartY==-1){
		        	this.grabStartY=STXChart.crosshairY;
		        	this.grabStartScrollY=chart.panel.yAxis.scroll;
		        }
				var dx=STXChart.crosshairX-this.grabStartX;
				var dy=STXChart.crosshairY-this.grabStartY;
				// We only allow the chart to scroll vertically if the user has moved in the Y direction by the tolerance amount
				// this reduces the amount of accidental vertical scrolling when panning left/right, since there is always some residual
				// mouse/touch movement in the Y direction while panning. Reducing the vertical scrolling not only keeps the chart aligned
				// for the user, but it also increases the cache hit frequency.
				if(Math.abs(dy)<this.yTolerance){
					if(!this.yToleranceBroken) dy=0;
				}else{
					this.yToleranceBroken=true;
				}
				if(dx==0 && dy==0) return;
				if(Math.abs(dx) + Math.abs(dy)>5) this.grabOverrideClick=true;
				if(this.grabMode!="pan" && (this.grabMode.indexOf("zoom")==0 || this.ctrl || this.overXAxis || this.overYAxis)){
					// zooming 
					if(this.grabMode==""){
						if(this.overXAxis) this.grabMode="zoom-x";
						else if(this.overYAxis) this.grabMode="zoom-y";
					}
					if(this.grabMode=="zoom-x") dy=0; // Don't apply any vertical if over the x-axis
					else if(this.grabMode=="zoom-y") dx=0; // Don't apply any horizontal if over the y-axis
		            var push=dx/25;
		        	var centerMe=true;
		        	if(chart.scroll<chart.maxTicks)
		        		centerMe=false;
		            var newCandleWidth=this.grabStartCandleWidth+push;
		            if(newCandleWidth<this.minimumCandleWidth) newCandleWidth=this.minimumCandleWidth;
		            var pct=(this.layout.candleWidth-newCandleWidth)/this.layout.candleWidth;
		            if(pct>.1){
		                newCandleWidth=this.layout.candleWidth*.9;
		            }else if(pct<-.1){
		                newCandleWidth=this.layout.candleWidth*1.1;
		            }
		            if(STX.ipad){
		            	// Allow pinching to resize up, but not down below the minimum size
		            	if(Math.round((this.chart.width/this.layout.candleWidth)-.499)-1<STXChart.ipadMaxTicks &&
		            	Math.round((this.chart.width/newCandleWidth)-.499)-1>STXChart.ipadMaxTicks) return;
		            }
					if(this.pinchingCenter){	// deprecated, pinching is now handled directly in touchmousemove
						var x=this.backOutX(this.pinchingCenter);
						var tick=this.tickFromPixel(x, chart);
						this.setCandleWidth(newCandleWidth, chart);
						//this.layout.candleWidth=newCandleWidth;
						//if(this.layout.candleWidth<=0) this.layout.candleWidth=1;
						//this.currentPanel.chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
						var newTick=this.tickFromPixel(x, chart);
						chart.scroll+=Math.floor((newTick-tick)/this.layout.periodicity);
					}else if(centerMe){			// If mouse, and entire screen filled then we maintain the center
						var newMaxTicks=Math.round((this.chart.width/newCandleWidth)-.499);
						if(newMaxTicks!=chart.maxTicks){
							this.setCandleWidth(newCandleWidth, chart);
							//this.layout.candleWidth=newCandleWidth;
							//if(this.layout.candleWidth<=0) this.layout.candleWidth=1;
							//chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
							var center=chart.scroll - chart.maxTicks/2;
							var newCenter=(chart.scroll - chart.maxTicks/2);
							chart.scroll+=Math.round(center-newCenter);
						}
					}else{	// If whitespace on right hand side then we maintain same pixels of whitespace
						var newMaxTicks=Math.round((this.chart.width/newCandleWidth)-.499);
						if(newMaxTicks!=chart.maxTicks){
							this.setCandleWidth(newCandleWidth, chart);
							//this.layout.candleWidth=newCandleWidth;
							//if(this.layout.candleWidth<=0) this.layout.candleWidth=1;
							//chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
							var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
							chart.scroll=chart.maxTicks-wsInTicks;
						}
					}
					this.layout.span=null;
					
					var yAxis=this.grabbingPanel.yAxis;
					yAxis.zoom=Math.round(this.grabStartZoom+dy);
					// Prevent zooming past the "flip" boundary
					if(this.grabStartZoom<yAxis.height){
						if(yAxis.zoom>=yAxis.height) yAxis.zoom=yAxis.height-1;
					}else{
						if(yAxis.zoom<=yAxis.height) yAxis.zoom=yAxis.height+1;
					}
				}else{
					this.grabMode="pan";
					var push=Math.round(dx/this.layout.candleWidth);
					if(this.shift) push*=5;
					chart.scroll=this.grabStartScrollX+push;
		
					if(chart.scroll<1)
						chart.scroll=1;
					if(chart.scroll>=chart.maxTicks){
						this.preferences.whitespace=30;
					}else{
						this.preferences.whitespace=(chart.maxTicks-chart.scroll)*this.layout.candleWidth;
					}
		
					if(this.currentPanel.name==chart.name){	// if chart type
						this.chart.panel.yAxis.scroll=this.grabStartScrollY+dy;
					}
				}
				var clsrFunc=function(stx){
					return function(){
						stx.draw();
					};
				};
				if((STXChart.useAnimation ||STX.isAndroid) && window.requestAnimationFrame)
					window.requestAnimationFrame(clsrFunc(this));
				else
					this.draw();
				if(this.activeDrawing){
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.activeDrawing.render(this.chart.tempCanvas.context);
					this.activeDrawing.measure();
				}
				this.undisplayCrosshairs();
				return;
			}else{
				this.grabMode="";
			}
			this.grabbingPanel=this.currentPanel;
			if(this.overXAxis || this.overYAxis) return;	// Nothing after this is applicable when over the x-axis or y-axis
			var tick=this.tickFromPixel(this.backOutX(STXChart.crosshairX), chart);
			tick/=this.layout.periodicity;
			this.controls.crossX.style.left=(this.pixelFromTick(tick, chart)-.5) + "px";
			this.controls.crossY.style.top=this.backOutY(STXChart.crosshairY) + "px";
			this.setCrosshairColors();
			if(STXChart.insideChart && STXChart.resizingPanel==null){
				if(!STX.Drawing[this.currentVectorParameters.vectorType] || !(new STX.Drawing[this.currentVectorParameters.vectorType]).dragToDraw){
					this.doDisplayCrosshairs();
				}
				if(this.accessoryTimer!=null) clearTimeout(this.accessoryTimer);
				if(STXChart.drawingLine || !STX.touchDevice){
					this.updateChartAccessories();
				}else{
					if(new Date().getTime()-this.lastAccessoryUpdate>100) this.updateChartAccessories();
					this.accessoryTimer=setTimeout((function(stx){ return function(){stx.updateChartAccessories();};})(this),10);
				}
		
			}else{
				this.undisplayCrosshairs();
			}
			
			if(this.repositioningDrawing){
				var panel=this.panels[this.repositioningDrawing.panelName];
				var value=this.adjustIfNecessary(panel, this.crosshairTick, this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY), panel));
				if(this.preferences.magnet && this.magnetizedPrice && panel.name==panel.chart.name){
					value=this.adjustIfNecessary(panel, this.crosshairTick, this.magnetizedPrice);
				}
				STX.clearCanvas(this.chart.tempCanvas, this);
				this.repositioningDrawing.reposition(this.chart.tempCanvas.context, this.repositioningDrawing.repositioner, this.crosshairTick, value);
				if(this.repositioningDrawing.measure) this.repositioningDrawing.measure();
			}else if(STXChart.drawingLine){
				if(this.activeDrawing){
					var panel=this.panels[this.activeDrawing.panelName];
					var value=this.adjustIfNecessary(panel, this.crosshairTick, this.valueFromPixelUntransform(this.backOutY(STXChart.crosshairY), panel));
					if(this.preferences.magnet && this.magnetizedPrice && panel.name==panel.chart.name){
						value=this.adjustIfNecessary(panel, this.crosshairTick, this.magnetizedPrice);
					}
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.activeDrawing.move(this.chart.tempCanvas.context, this.crosshairTick, value);
					if(this.activeDrawing.measure) this.activeDrawing.measure();
				}
			}else if(STXChart.resizingPanel!=null){
				this.resizePanels();
				this.drawTemporaryPanel();
			}else if(STXChart.insideChart){
				this.findHighlights();
			}
			if(this.preferences.magnet && this.currentVectorParameters.vectorType!=""){
				if(!STXChart.drawingLine && !this.anyHighlighted) STX.clearCanvas(this.chart.tempCanvas);
				this.magnetize();
			}
			if(this.runAppend("mousemoveinner", arguments)) return;
		};
		
		/**
		 * Finds any objects that should be highlighted by the current crosshair position. All drawing objects have their highlight() method
		 * called in order that they may draw themselves appropriately.
		 * @param  {Boolean} isTap If true then it indicates that the user tapped the screen on a touch device, and thus a wider radius is used to determine which objects might have been highlighted.
		 * @param {Boolean} clearOnly Set to true to clear highlights
		 * @memberOf STXChart
		 */
		STXChart.prototype.findHighlights=function(isTap, clearOnly){
			var radius=10;
			if(isTap) radius=30;
			var cy=this.cy;
			var cx=this.cx;
			if(!this.currentPanel) return;
			var chart=this.currentPanel.chart;
			this.anyHighlighted=false;
			if(this.preferences.magnet && this.currentVectorParameters.vectorType!=""){
				STX.clearCanvas(this.chart.tempCanvas, this);
			}
			var somethingChanged=false;
			var drawingToMeasure=null;
			var box={
					x0:this.tickFromPixel(cx - radius, chart)/this.layout.periodicity,
					x1:this.tickFromPixel(cx + radius, chart)/this.layout.periodicity,
					y0:this.valueFromPixelUntransform(cy - radius, this.currentPanel),
					y1:this.valueFromPixelUntransform(cy + radius, this.currentPanel)
			};
		
			for(var i=0;i<this.drawingObjects.length;i++){
				var drawing=this.drawingObjects[i];
				if(drawing.permanent) continue;
		
				var prevHighlight=drawing.highlighted;
				var highlightMe=(drawing.panelName==this.currentPanel.name);
				drawing.repositioner=drawing.intersected(this.crosshairTick, this.crosshairValue, box);
				highlightMe=highlightMe && drawing.repositioner;
		
				if(!clearOnly && highlightMe){
					if(prevHighlight!=drawing.highlight(true)){
						drawingToMeasure=drawing;
						somethingChanged=true;
					}
					this.anyHighlighted=true;
				}else{
					if(prevHighlight!=drawing.highlight(false)){
						somethingChanged=true;
					}
				}
			}
			if(somethingChanged){
				this.draw();
				this.displaySticky("","",true);
				if(drawingToMeasure) drawingToMeasure.measure();
			}
		
			var first=false;
			for(var n in this.overlays){
				var o=this.overlays[n];
				o.prev=o.highlight;
				o.highlight=false;
			}
		    for(var n in chart.series){
		        var series=chart.series[n];
		        series.prev=series.highlight;
		        series.highlight=false;
		    }
		
			if(!clearOnly){
			    var bar=this.barFromPixel(cx);
			    if(bar<chart.dataSegment.length){
					for(var n in this.overlays){
						var o=this.overlays[n];
						if(o.panel!=this.currentPanel.name) continue;

						//custom highlight detection
						if(o.libraryEntry.isHighlighted && o.libraryEntry.isHighlighted(this,cx,cy)){
							o.highlight=true;
							this.anyHighlighted=true;
							continue;					
						}

						var quote=chart.dataSegment[bar];
						if(!quote) continue;
			
						for(var out in this.overlays[n].outputMap){
				            var val=quote[out];
							var y=0;
							if(this.currentPanel.name==chart.name){	// chart type panel
								y=this.pixelFromPriceTransform(val, this.currentPanel);
							}else{
								y=this.pixelFromPrice(val, this.currentPanel);
							}
							if(cy-radius<y && cy+radius>y){
								o.highlight=true;
								this.anyHighlighted=true;
								break;
							}
						}
					}
			        for(var n in chart.series){
			            var series=chart.series[n];
			            var y=series.yValueCache[bar];
			            if(cy-radius<y && cy+radius>y){
			                series.highlight=true;
			                this.anyHighlighted=true;
			            }else if(series.isStep && bar>0){
			                // In a step series we also need to check for intersection with
			                // the vertical bar (the step) that connects two points
			                var py=series.yValueCache[bar-1];
			                if((cy>y && cy<py) || (cy<y && cy>py)){
			                    series.highlight=true;
			                    this.anyHighlighted=true;
			                }
			            }
			        }
			    }
			}
			for(var n in this.overlays){
				var o=this.overlays[n];
				if(o.prev!=o.highlight){
					this.draw();
					if(o.highlight){
						this.anyHighlighted=true;
						this.displaySticky(o.name);
					}
					break;
				}
			}
			for(var n in chart.series){
				var series=chart.series[n];
				if(series.prev!=series.highlight){
					this.draw();
					if(series.highlight){
						this.anyHighlighted=true;
						this.displaySticky(series.display, series.parameters.color);
					}
					break;
				}
			}
		
		
			if(!this.anyHighlighted){
				this.setMeasure();
			}
		};
		
		/**
		 * Positions a "sticky" (a tooltip element). It is positioned relative to the cursor but so that it is always available and never
		 * accidentally tappable on a touch device.
		 * @param  {HTMLElement} m The sticky
		 * @memberOf STXChart
		 */
		STXChart.prototype.positionSticky=function(m){
			var top=Math.max(this.backOutY(STXChart.crosshairY)-m.offsetHeight-60,0);
			var right=Math.min(this.chart.canvasWidth-(this.backOutX(STXChart.crosshairX)-50),this.chart.canvasWidth-m.offsetWidth);
			m.style.top=top+"px";
			m.style.right=right+"px";
		};
		
		/**
		 * Displays the "sticky" (tooltip element). The sticky should be in this.controls.mSticky. To disable stickies, set that element to null.
		 * @param  {string} message         The message to display in the sticky
		 * @param  {string} backgroundColor The background color to set the sticky (the foreground color will be picked automatically)
		 * @memberOf STXChart
		 */
		STXChart.prototype.displaySticky=function(message, backgroundColor, forceShow){
			var m=this.controls.mSticky;
			if(!m) return;
			var mi=m.children[0];
			if(!mi) return;
			var overlayTrashCan=m.children[1];
			var mouseDeleteInstructions=m.children[2];
			if(!forceShow && (message==null || message=="")){
				mi.innerHTML="";
				m.style.display="none";
				if(STX.touchDevice && overlayTrashCan){
					overlayTrashCan.style.display="none";
				}else if(!STX.touchDevice && mouseDeleteInstructions){
					mouseDeleteInstructions.style.display="none";
				}
			}else{
				if(message==null) message="";
				if(forceShow && message==""){
					mi.style.backgroundColor="";
					mi.style.color="";
					mi.style.display="none";
				}else if(backgroundColor){
					mi.style.backgroundColor=backgroundColor;
					mi.style.color=STX.chooseForegroundColor(backgroundColor);
					mi.style.display="inline-block";
				}else{
					mi.style.backgroundColor="";
					mi.style.color="";
					mi.style.display="inline-block";
				}
				mi.innerHTML=message;
				m.style.display="inline-block";
				this.positionSticky(m);
				if(STX.touchDevice && overlayTrashCan){
					overlayTrashCan.style.display="inline-block";
					mouseDeleteInstructions.style.display="none";			
				}else if(!STX.touchDevice && mouseDeleteInstructions){
					mouseDeleteInstructions.style.display="block";			
				}
			}
		};
		
		/**
		 * Sets the sticky to contain a measurement, usually when a user hovers over a drawing.
		 * @param {number} price1 Beginning price of the drawing
		 * @param {number} price2 Ending price of the drawing
		 * @param {number} tick1  Beginning tick of the drawing
		 * @param {number} tick2  Ending tick of the drawing
		 * @param {boolean} hover  True to turn on the measurement, false to turn it off
		 * @memberOf STXChart
		 */
		STXChart.prototype.setMeasure=function(price1, price2, tick1, tick2, hover){
			if(this.runPrepend("setMeasure", arguments)) return;
			var m=$$("mMeasure");
			if(!price1){
				if(m && m.className!="measureUnlit") m.className="measureUnlit";
			}else{
				var distance=Math.round(Math.abs(price1-price2)*this.chart.roundit)/this.chart.roundit;
				var message="";
				if(this.internationalizer){
					message+=this.internationalizer.numbers.format(distance);
				}else{
					message+=distance;
				}
				var pct=(price2-price1)/price1;
				if(Math.abs(pct)>.1){
					pct=Math.round(pct*100);
				}else if(Math.abs(pct)>.01){
					pct=Math.round(pct*1000)/10;
				}else{
					pct=Math.round(pct*10000)/100;
				}
				if(this.internationalizer){
					pct=this.internationalizer.percent.format(pct/100);
				}else{
					pct=pct+"%";
				}
				message+=" (" +  pct + ")";
				var ticks=Math.abs(tick2-tick1);
				if(this.layout.interval!="minute") ticks/=this.layout.periodicity;
				ticks=Math.round(ticks)+1;
				var barsStr="Bars";
				if(this.translationCallback) barsStr=this.translationCallback(barsStr);
				message+=" " + ticks + " " + barsStr;
		
				if(m){
					if(m.className!="measureLit") m.className="measureLit";
					m.innerHTML=message;
				}
			}

		    if(this.activeDrawing) return;      // Don't measure when in the process of drawing
			m=this.controls.mSticky;
			if(hover){
				m.style.display="inline-block";
				m.children[0].style.display="inline-block";
				if(price1){
					m.children[0].innerHTML=message;
					if(STX.touchDevice){
						m.children[1].style.display="inline-block";
						if(m.children[2]) m.children[2].style.display="none";
					}else{
						m.children[1].style.display="none";
						if(m.children[2]) m.children[2].style.display="block";
					}
				}
				this.positionSticky(m);
			}else{
				m.style.display="none";
				m.children[0].innerHTML="";
			}
			if(this.runAppend("setMeasure", arguments)) return;
		};
		
		/**
		 * Draws a temporary panel on the tempCanvas. This is done to speed up rendering when a user is resizing a panel.
		 * @private
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawTemporaryPanel=function(){
			var borderEdge=Math.round(this.chart.width-3)+.5;
			STX.clearCanvas(this.chart.tempCanvas, this);
			var y=STXChart.crosshairY-this.chart.top;
			this.plotLine(0, borderEdge, y, y, this.canvasStyle("stx_panel_drag"), "segment", this.chart.tempCanvas.context, false, {});
			STXChart.resizingPanel.handle.style.top=(y-STXChart.resizingPanel.handle.offsetHeight/2) + "px";
		};
		
		/**
		 * Enables the trashcan icon on touch devices when a drawing, overlay or series is highlighted
		 * @private
		 * @memberOf STXChart
		 * @deprecated
		 */
		STXChart.prototype.setTrashCan=function(){
			if(STX.touchDevice){
				var m=this.controls.mSticky;
				if(m){
					m.style.display="inline-block";
					m.children[0].style.display="none";
					m.children[1].style.display="inline-block";
					if(m.children[2]) m.children[2].style.display="none";
					m.style.top=(this.backOutY(STXChart.crosshairY)-60)+"px";
					m.style.right=this.chart.canvasWidth-(this.backOutX(STXChart.crosshairX)-50)+"px";
				}
			}
		};
		
		/**
		 * Returns the X pixel give the location of a bar (dataSegment) on the chart.
		 * @param  {number} bar The bar (position on the chart which is also the position in the dataSegment)
		 * @return {number}     The X pixel on the chart
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromBar=function(bar){
			var x=Math.round((bar*this.layout.candleWidth)+this.layout.candleWidth/3); //TODO, should this use this.offset instead of /3?
			return x;
		};
		
		/**
		 * Returns which bar the pixel lies on. Do not reference this into dataSegment without checking bounds because the return value may be negative or greater than the dataSegment array length.
		 * @param  {number} x An X pixel location on the chart
		 * @return {number}   The bar that lies on the X pixel (may be negative/before or after the chart)
		 * @memberOf STXChart
		 */
		STXChart.prototype.barFromPixel=function(x){
		    return Math.floor(x/this.layout.candleWidth);
		};
		
		/**
		 * Returns the tick (dataSet) position given the X pixel
		 * @param  {number} x     X pixel location
		 * @param  {STXChart.Chart} [chart] A chart object
		 * @return {number}       The tick (position in the dataSet)
		 * @memberOf STXChart
		 */
		STXChart.prototype.tickFromPixel=function(x, chart){
			if(!chart) chart=this.chart;
			var left=chart.dataSet.length-chart.scroll;
		
			var tick=Math.round(((x+(left*this.layout.candleWidth))/this.layout.candleWidth)-.499);
		    tick*=this.layout.periodicity;
			return tick;
		};
		
		/**
		 * Returns an X pixel for the given tick. The X pixel will be the center of the tick location. Note that the pixel may be off of
		 * the visual canvas and that it might overlap the Y axis. Compare bounds against this.chart.width or this.chart.canvasWidth.
		 * @param  {number} tick  The tick (position in dataSet)
		 * @param  {STXChart.Chart} [chart] A chart object
		 * @return {number}       The X position in pixels (may be negative or may be greated than dataSet.length)
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromTick=function(tick, chart){
			if(!chart) chart=this.chart;
			return (tick-chart.dataSet.length+chart.scroll)*this.layout.candleWidth+this.offset;
		};
		
		/**
		 * Returns the X pixel position for a given date. Warning: this can be an expensive operation if the date is not in the dataSet.
		 * @param  {string} date  String form date
		 * @param  {STXChart.Chart} chart The chart to look in
		 * @return {number}       The pixel location for the date
		 * @todo  Use Date object instead of string form date
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromDate=function(date, chart){
			return this.pixelFromTick(this.tickFromDate(date, chart), chart);
		};
		
		/**
		 * Returns the price (or value) give a Y pixel location. 
		 * @param  {number} y     The Y pixel location
		 * @param  {STXChart.Panel} [panel] The panel to look. Defaults to the chart itself.
		 * @return {number}       The Y location. This may be off of the visible canvas.
		 * @memberOf STXChart
		 */
		STXChart.prototype.priceFromPixel=function(y, panel){
			if(!panel) panel=this.chart.panel;
			var chart=panel.chart;
			var yAxis=panel.yAxis;
			y=yAxis.bottom-y;
			var price=yAxis.low+(y/yAxis.multiplier);
			/*var roundit=chart.roundit;
			if(panel.roundit) roundit=panel.roundit;
			price=Math.round(price*roundit)/roundit;*/
			if(yAxis.semiLog){
				var logPrice=yAxis.logLow+(y*yAxis.logShadow/yAxis.height);
				price=Math.pow(10,logPrice);
			}
			return price;
		};
		
		/**
		 * Returns the value given a Y-axis pixel. The value is relative to the the panel or the canvas.
		 * @param  {number} y     The y pixel position
		 * @param  {STXChart.Panel} [panel] A panel object. If passed then the value will be relative to that panel. If not passed then the value will be relative to the panel that is in the actual Y location.
		 * @return {number}       The value relative to the panel
		 * @memberOf STXChart
		 */
		STXChart.prototype.valueFromPixel=function(y, panel){
			if(!panel) panel=this.whichPanel(y);
			var p=this.priceFromPixel(y, panel);
			return p;
		};
		
		/**
		 * A version of {@link STXChart#valueFromPixel} that will untransform a transformation such as a comparison chart.
		 * @param  {number} y     The y pixel location
		 * @param  {STXChart.Panel} panel A panel object. It is strongly recommended to pass the panel! (see {@link STXChart#valueFromPixel})
		 * @return {number}       The price or value
		 * @memberOf STXChart
		 */
		STXChart.prototype.valueFromPixelUntransform=function(y, panel){
			if(!panel) panel=this.whichPanel(y);
			if(!panel){
				// If we're not in a current panel then we're off the screen, so choose the top or bottom panel
				// Ideally we never get in here because panel is passed in by the developer!
				if(y<=0){
					panel=this.panels[STX.first(this.panels)];
				}else{
					panel=this.panels[STX.last(this.panels)];
				}
			}
			var p=this.priceFromPixel(y, panel);
			if(panel.chart.untransformFunc && panel.name==panel.chart.name){
				p=panel.chart.untransformFunc(this, panel.chart, p);
			}
			return p;
		};
		
		/**
		 * A version of {@link STXChart#pixelFromPrice} that will apply a transformation such as a comparison chart.
		 * @param  {number} price     The price or value
		 * @param  {STXChart.Panel} panel A panel object (see {@link STXChart#pixelFromPrice})
		 * @return {number}       The y axis pixel location
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromPriceTransform=function(price, panel){
			if(panel.chart.transformFunc) price=panel.chart.transformFunc(this, panel.chart, price);	// transform should move to panel
			return this.pixelFromPrice(price, panel);
		};
		
		/**
		 * Returns the Y pixel from a given price (or value)
		 * @param  {number} price The price
		 * @param  {STXChart.Panel} [panel] The panel (defaults to the chart)
		 * @return {number}       The Y pixel value
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromPrice=function(price, panel){
			if(!panel) panel=this.chart.panel;
			var yAxis=panel.yAxis;
			var y=(yAxis.high-price)*yAxis.multiplier;
			if(yAxis.semiLog){
				var logPrice=Math.log(price)/Math.LN10;
				if(price<=0) logPrice=0;
				var height=yAxis.height;
				y=height-height*(logPrice-yAxis.logLow)/yAxis.logShadow;
			}
		
			y+=yAxis.top;
			return y;
		};
		
		
		/**
		 * Returns the Y pixel location for the (split) unadjusted price rather than the displayed price.
		 * This is important for drawing tools or any other device that requires the actual underlying price.
		 * 
		 * @param  {STXChart.Panel} panel The panel to get the value from
		 * @param  {number} tick  The tick location (in the dataSet) to check for an adjusted value
		 * @param  {number} value The value
		 * @return {number}       The pixel location
		 * @memberOf STXChart
		 */
		STXChart.prototype.pixelFromValueAdjusted=function(panel, tick, value){
			// If we're not showing unadjusted quotes, or if the panel isn't a chart then bypass
			if(this.layout.adj || !this.charts[panel.name]) return this.pixelFromPriceTransform(value, panel);
			var a=Math.round(tick); // Not sure why we're rounding this. Possible legacy code.
			// Adjust if there's a ratio attached to the tick
			if(a>0 && a<panel.chart.dataSet.length && (ratio=panel.chart.dataSet[a].ratio)){
				return this.pixelFromPriceTransform(value*ratio, panel);
			}
			// Otherwise pass through
			return this.pixelFromPriceTransform(value, panel);
		};
		
		/**
		 * Returns the unadjusted value for a given value, if an adjustment (split) had been applied. This can return a value
		 * relative to the original closing price.
		 * @param  {STXChart.Panel} panel The panel to check
		 * @param  {number} tick  The location in the dataset
		 * @param  {number} value The value to adjust
		 * @return {number}       The adjusted value
		 * @memberOf STXChart
		 */
		STXChart.prototype.adjustIfNecessary=function(panel, tick, value){
			if(this.layout.adj) return value;	// Already adjusted prices
			if(!panel || !this.charts[panel.name]) return value;
			var a=Math.round(tick);
			if(a>0 && a<panel.chart.dataSet.length && (ratio=panel.chart.dataSet[a].ratio)){
				return value/ratio;
			}
			return value;
		};
		
		/**
		 * Sets a transformation and untransformation function. Transforms can be used to transform the Y-Axis from absolute
		 * to relative values. For instance, comparison charts use a transform that adjusts from price to percentage.
		 * After this is called, chart.transformFunc and chart.untransformFunc will be set to those functions.
		 * @param {STXChart.Chart} chart               The chart to transform
		 * @param {function} transformFunction   A transformation callback function which takes a number and returns the transformation of that number
		 * @param {function} untransformFunction An untransformation callback function
		 * @memberOf STXChart
		 */
		STXChart.prototype.setTransform=function(chart, transformFunction, untransformFunction){
			chart.transformFunc=transformFunction;
			chart.untransformFunc=untransformFunction;
		};
		
		/**
		 * Removes a transformation/untransformation pair
		 * @param  {STXChart.Chart} The chart to remove transformations from
		 * @memberOf STXChart
		 */
		STXChart.prototype.unsetTransform=function(chart){
			delete chart.transformFunc;
			delete chart.untransformFunc;
			for(var i=0;i<chart.dataSet.length;i++){
				chart.dataSet[i].transform=null;
			}
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Stops (aborts) the current drawing. See {@link STXChart#undoLast} for an actual "undo" operation.
		 * @memberOf STXChart
		 */
		STXChart.prototype.undo=function(){
			if(this.runPrepend("undo", arguments)) return;
			if(this.activeDrawing){
				this.activeDrawing.abort();
				this.activeDrawing=null;
				STX.clearCanvas(this.chart.tempCanvas, this);
				this.draw();
				STX.swapClassName(this.controls.crossX, "stx_crosshair", "stx_crosshair_drawing");
				STX.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing");
				STXChart.drawingLine=false;
			}
			if(this.runAppend("undo", arguments)) return;
		};
		
		/**
		 * Creates an undo stamp for the chart's current drawing state
		 * @memberOf STXChart
		 */
		STXChart.prototype.undoStamp=function(){
			this.undoStamps.push(STX.shallowClone(this.drawingObjects));
		};
		
		/**
		 * Undoes the previous drawing state change
		 * @memberOf STXChart
		 */
		STXChart.prototype.undoLast=function(){
			if(this.activeDrawing){
				this.undo();
			}else{
				if(this.undoStamps.length){
					this.drawingObjects=this.undoStamps.pop();
					this.draw();
				}
			}
		};
		
		/**
		 * Programatically add a drawing
		 * @param {object} drawing The drawing definition
		 * @todo  Document drawing JSON format
		 * @memberOf STXChart
		 * @private
		 */
		STXChart.prototype.addDrawing=function(drawing){
			this.undoStamp();
			this.drawingObjects.push(drawing);
		};
		
		/*
		 * confineToPanel should be the panel to confine the drawing to, unnecessary if clipping
		 */
		/**
		 * Convenience function for plotting a line on the chart.
		 * @param  {number} x0             X starting pixel
		 * @param  {number} x1             X ending pixel
		 * @param  {number} y0             Y starting pixel
		 * @param  {number} y1             Y ending pixel
		 * @param  {string} color          Either a color or a Styles object as returned from {@link STXChart#canvasStyle}
		 * @param  {string} type           The type of line to draw ("segment","ray" or "line")
		 * @param  {external:CanvasRenderingContext2D} [context]        The canvas context. Defaults to the standard context.
		 * @param  {string} [confineToPanel] Define the panel that the line should be drawn in, and not cross through
		 * @param  {object} [parameters]     Additional parameters to describe the line
		 * @param {string} [parameters.pattern] The pattern for the line ("solid","dashed","dotted")
		 * @param {number} [parameters.lineWidth] The width in pixels for the line
		 * @param {number} [parameters.opacity] Optional opacity for the line
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotLine=function(x0, x1, y0, y1, color, type, context, confineToPanel, parameters){
			if(!parameters) parameters={};
			if(parameters.pattern=="none") return;
			if(confineToPanel==true) confineToPanel=this.chart.panel;
			if(context==null || typeof(context)=="undefined") context=this.chart.context;
			if(isNaN(x0) || isNaN(x1) || isNaN(y0) || isNaN(y1)){
				return;
			}
		
			var edgeTop=0;
			var edgeBottom=this.chart.canvasHeight;
			var edgeLeft=0;
			var edgeRight=this.chart.width;
		
		
			if(confineToPanel){
				edgeBottom=confineToPanel.yAxis.bottom;
				edgeTop=confineToPanel.yAxis.top;
			}
		
			if(type=="ray"){
				var bigX=10000000;
				if(x1<x0) bigX=-10000000;
				var v={
					"x0": x0,
					"x1": x1,
					"y0": y0,
					"y1": y1
				};
				var bigY=STX.yIntersection(v, bigX);
				x1=bigX;
				y1=bigY;
			}
			if(type=="line" || type=="horizontal" || type=="vertical"){
				var bigX=10000000;
				var littleX=-10000000;
				var v={
					"x0": x0,
					"x1": x1,
					"y0": y0,
					"y1": y1
				};
				var bigY=STX.yIntersection(v, bigX);
				var littleY=STX.yIntersection(v, littleX);
				x0=littleX;
				x1=bigX;
				y0=littleY;
				y1=bigY;
			}
		
			var t0 = 0.0, t1 = 1.0;
		    	var xdelta = x1-x0;
		    	var ydelta = y1-y0;
		    	var p,q,r;
		
			for(var edge=0; edge<4; edge++) {
				if (edge==0) {  p = -xdelta;    q = -(edgeLeft-x0);  }
				if (edge==1) {  p = xdelta;     q =  (edgeRight-x0); }
				if (edge==2) {  p = -ydelta;    q = -(edgeTop-y0);}
				if (edge==3) {  p = ydelta;     q =  (edgeBottom-y0);   }
				r = q/p;
		
				if(y1!=null && p==0 && q<0){
					return false;   // Don't draw line at all. (parallel horizontal line outside)
				}
		
				if(p<0) {
					if(r>t1) return false;         // Don't draw line at all.
		 			else if(r>t0) t0=r;            // Line is clipped!
				} else if(p>0) {
		  			if(r<t0) return false;      // Don't draw line at all.
					else if(r<t1) t1=r;         // Line is clipped!
		 		}
			}
		
			var x0clip = x0 + t0*xdelta;
			var y0clip = y0 + t0*ydelta;
			var x1clip = x0 + t1*xdelta;
			var y1clip = y0 + t1*ydelta;
		
			if(y1==null && y0==null){	// vertical line
				y0clip=edgeTop;
				y1clip=edgeBottom;
				x0clip=v.x0;
				x1clip=v.x0;
				if(v.x0>edgeRight) return false;
				if(v.x0<edgeLeft) return false;
			}else if(y1==null){	// vertical ray
				if(v.y0<v.y1) y1clip=edgeBottom;
				else y1clip=edgeTop;
				x0clip=v.x0;
				x1clip=v.x0;
				if(v.x0>edgeRight) return false;
				if(v.x0<edgeLeft) return false;
			}
		
			context.lineWidth=1.1;	// Use 1.1 instead of 1 to get good anti-aliasing on Android Chrome
			if(typeof(color)=="object"){
				context.strokeStyle=color.color;
				if(color.opacity) context.globalAlpha=color.opacity;
				else context.globalAlpha=1;
				context.lineWidth=parseInt(STX.stripPX(color.width));
			}else{
				if(color==null || color=="auto" || STX.isTransparent(color)){
					context.strokeStyle=this.defaultColor;
				}else{
					context.strokeStyle=color;
				}
			}
			if(parameters.opacity) context.globalAlpha=parameters.opacity;
			if(parameters.lineWidth) context.lineWidth=parameters.lineWidth;
			if(type=="zig zag") context.lineWidth=5;
			//context.beginPath();  //removed, stxLine does this
			var pattern = null;
		    if(parameters.pattern){
		        pattern=parameters.pattern;
		        if(pattern=="solid"){
		        	pattern=null;
		        }else if(pattern=="dotted"){
		        	pattern=[context.lineWidth, context.lineWidth];
		        }else if(pattern=="dashed"){
		        	pattern=[context.lineWidth*5, context.lineWidth*5];
		        }
		    }
		    context.stxLine(x0clip, y0clip, x1clip, y1clip, context.strokeStyle, context.globalAlpha, context.lineWidth, pattern);
			context.globalAlpha=1;
		};
		
		/**
		 * Draws a series of connected lines on the canvas. The points are in a straight array for compactness. This is used
		 * for instance in the freeform (doodle) drawing tool
		 * @param  {array} points         A series of points in the pattern x0,y0,x1,y1
		 * @param  {string} color          Either a color or a Styles object as returned from {@link STXChart#canvasStyle}
		 * @param  {string} type           The type of line to draw ("segment","ray" or "line")
		 * @param  {external:CanvasRenderingContext2D} [context]        The canvas context. Defaults to the standard context.
		 * @param  {string} [confineToPanel] Define the panel that the line should be drawn in, and not cross through
		 * @param  {object} [parameters]     Additional parameters to describe the line
		 * @param {string} [parameters.pattern] The pattern for the line ("solid","dashed","dotted")
		 * @param {number} [parameters.width] The width in pixels for the line
		 * @param {number} [parameters.opacity] Optional opacity for the line
		 * @memberOf STXChart
		 */
		STXChart.prototype.connectTheDots=function(points, color, type, context, confineToPanel, parameters){
			if(!parameters) parameters={};
			if(parameters.pattern=="none") return;
			if(confineToPanel==true) confineToPanel=this.chart.panel;
			if(context==null || typeof(context)=="undefined") context=this.chart.context;
			if(points.length<4) return;
		
			var edgeTop=0;
			var edgeBottom=this.chart.canvasHeight;
			var edgeLeft=0;
			var edgeRight=this.chart.width;
			
			if(confineToPanel){
				edgeBottom=confineToPanel.yAxis.bottom;
				edgeTop=confineToPanel.yAxis.top;
			}
		
			context.lineWidth=1.1;	// Use 1.1 instead of 1 to get good anti-aliasing on Android Chrome
			if(typeof(color)=="object"){
				context.strokeStyle=color.color;
				if(color.opacity) context.globalAlpha=color.opacity;
				else context.globalAlpha=1;
				context.lineWidth=parseInt(STX.stripPX(color.width));
			}else{
				if(color==null || color=="auto" || STX.isTransparent(color)){
					context.strokeStyle=this.defaultColor;
				}else{
					context.strokeStyle=color;
				}
			}
			if(parameters.opacity) context.globalAlpha=parameters.opacity;
			if(parameters.lineWidth) context.lineWidth=parameters.lineWidth;
			var pattern = null;
		    if(parameters.pattern){
		        pattern=parameters.pattern;
		        if(pattern=="solid"){
		        	pattern=null;
		        }else if(pattern=="dotted"){
		        	pattern=[context.lineWidth, context.lineWidth];
		        }else if(pattern=="dashed"){
		        	pattern=[context.lineWidth*5, context.lineWidth*5];
		        }
		    }
			context.beginPath();
		
		    for(var i=0;i<points.length-2;i+=2){
		
		    	var x0=points[i];
		    	var y0=points[i+1];
		    	var x1=points[i+2];
		    	var y1=points[i+3];
		    	if(isNaN(x0) || isNaN(x1) || isNaN(y0) || isNaN(y1)) return;
		    	
				var t0 = 0.0, t1 = 1.0;
			    	var xdelta = x1-x0;
			    	var ydelta = y1-y0;
			    	var p,q,r;
			
				for(var edge=0; edge<4; edge++) {
					if (edge==0) {  p = -xdelta;    q = -(edgeLeft-x0);  }
					if (edge==1) {  p = xdelta;     q =  (edgeRight-x0); }
					if (edge==2) {  p = -ydelta;    q = -(edgeTop-y0);}
					if (edge==3) {  p = ydelta;     q =  (edgeBottom-y0);   }
					r = q/p;
			
					if(y1!=null && p==0 && q<0){
						return false;   // Don't draw line at all. (parallel horizontal line outside)
					}
			
					if(p<0) {
						if(r>t1) return false;         // Don't draw line at all.
			 			else if(r>t0) t0=r;            // Line is clipped!
					} else if(p>0) {
			  			if(r<t0) return false;      // Don't draw line at all.
						else if(r<t1) t1=r;         // Line is clipped!
			 		}
				}
			
				var x0clip = x0 + t0*xdelta;
				var y0clip = y0 + t0*ydelta;
				var x1clip = x0 + t1*xdelta;
				var y1clip = y0 + t1*ydelta;
				
				try{
					if(pattern){
						context.dashedLineTo(x0clip, y0clip, x1clip, y1clip, pattern);
					}else{
						context.moveTo(x0clip, y0clip);
						context.lineTo(x1clip, y1clip);
					}
				}catch(e){
					//alert(x0clip + ":" + y0clip + " " + x1clip + ":" + y1clip);
				}
			}
			context.stroke();
		    context.closePath();
			context.globalAlpha=1;
		};
		
		// confineToPanel is not used because currently we are splining after the drawing is complete.
		// should that change we will need to implement it
		
		/**
		 * Draws a series of points and splines (smooths the curve) those points
		 * @param  {array} points         A series of points in the pattern x0,y0,x1,y1
		 * @param {number} tension Spline tension (0-1). Set to negative to not spline.
		 * @param  {string} color          Either a color or a Styles object as returned from {@link STXChart#canvasStyle}
		 * @param  {string} type           The type of line to draw ("segment","ray" or "line")
		 * @param  {external:CanvasRenderingContext2D} [context]        The canvas context. Defaults to the standard context.
		 * @param  {string} [confineToPanel] Not currently implemented
		 * @param  {object} [parameters]     Additional parameters to describe the line
		 * @param {string} [parameters.pattern] The pattern for the line ("solid","dashed","dotted")
		 * @param {number} [parameters.width] The width in pixels for the line
		 * @param {number} [parameters.opacity] Optional opacity for the line
		 * @memberOf STXChart
		 */
		STXChart.prototype.plotSpline=function(points,tension,color,type,context,confineToPanel,parameters){
			if(!parameters) parameters={};
			if(parameters.pattern=="none") return;
			if(confineToPanel==true) confineToPanel=this.chart.panel;
			if(context==null || typeof(context)=="undefined") context=this.chart.context;
		
			context.save();
			
			context.lineWidth=1.1;	// Use 1.1 instead of 1 to get good anti-aliasing on Android Chrome
			if(typeof(color)=="object"){
				context.strokeStyle=color.color;
				if(color.opacity) context.globalAlpha=color.opacity;
				else context.globalAlpha=1;
				context.lineWidth=parseInt(STX.stripPX(color.width));
			}else{
				if(color==null || color=="auto" || STX.isTransparent(color)){
					context.strokeStyle=this.defaultColor;
				}else{
					context.strokeStyle=color;
				}
			}
			if(parameters.opacity) context.globalAlpha=parameters.opacity;
			if(parameters.lineWidth) context.lineWidth=parameters.lineWidth;
			var pattern = null;
		    if(parameters.pattern){
		        pattern=parameters.pattern;
		        if(pattern=="solid"){
		        	pattern=null;
		        }else if(pattern=="dotted"){
		        	pattern=[context.lineWidth, context.lineWidth];
		        }else if(pattern=="dashed"){
		        	pattern=[context.lineWidth*5, context.lineWidth*5];
		        }
		    }
			if(pattern && context.setLineDash){
				context.setLineDash(pattern);
				context.lineDashOffset=0;  //start point in array
			}
		
			//stxThirdParty
			plotSpline(points,tension,context);
			
			context.restore();
		};
		
		/**
		 * This is called to send a potential click event to an active drawing, if one is active.
		 * @param  {STXChart.Panel} panel The panel in which the click occurred
		 * @param  {number} x     The X pixel location of the click
		 * @param  {number} y     The y pixel location of the click
		 * @return {boolean}      Returns true if a drawing is active and received the click
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawingClick=function(panel, x, y){
			if(!this.activeDrawing){
				if(!panel) return;
				var Factory=STXChart.drawingTools[this.currentVectorParameters.vectorType];
				if(!Factory){
					if(STX.Drawing[this.currentVectorParameters.vectorType]){
						Factory=STX.Drawing[this.currentVectorParameters.vectorType];
						STXChart.registerDrawingTool(this.currentVectorParameters.vectorType, Factory);
					}
				}
				if(Factory){
					this.activeDrawing=new Factory;
					this.activeDrawing.construct(this, panel);
					if(!this.charts[panel.name]){
						if(this.activeDrawing.chartsOnly){
							this.activeDrawing=null;
							return;
						}
					}
				}
			}
			if(this.activeDrawing){
				if(this.userPointerDown && !this.activeDrawing.dragToDraw){
					if(!STXChart.drawingLine) this.activeDrawing=null;
					return;
				}
		
				var tick=this.tickFromPixel(x, panel.chart)/this.layout.periodicity;
				var panel=this.panels[this.activeDrawing.panelName];
				var value=this.adjustIfNecessary(panel, tick, this.valueFromPixelUntransform(y,panel));
				if(this.preferences.magnet && this.magnetizedPrice){
					value=this.adjustIfNecessary(panel, tick, this.magnetizedPrice);
				}
				if(this.activeDrawing.click(this.chart.tempCanvas.context, tick, value)){
					if(this.activeDrawing){	// Just in case the drawing aborted itself, such as measure
						STXChart.drawingLine=false;
						STX.clearCanvas(this.chart.tempCanvas, this);
						this.addDrawing(this.activeDrawing);	// Save drawing
						this.activeDrawing=null;
						this.adjustDrawings(); //moved from individual drawing.click function to here --gus
						this.draw();
						this.changeOccurred("vector");
						STX.swapClassName(this.controls.crossX, "stx_crosshair", "stx_crosshair_drawing");
						STX.swapClassName(this.controls.crossY, "stx_crosshair", "stx_crosshair_drawing");
					}
				}else{
					this.changeOccurred("drawing");
					STXChart.drawingLine=true;
					STX.swapClassName(this.controls.crossX, "stx_crosshair_drawing", "stx_crosshair");
					STX.swapClassName(this.controls.crossY, "stx_crosshair_drawing", "stx_crosshair");
				}
				return true;
			}
			return false;
		};
		
		/**
		 * Returns the panel for the given Y pixel. Used for instance to determine which panel the crosshairs are in.
		 * @param  {number} y Y pixel location
		 * @return {STXChart.Panel}   The panel containing the Y location. Null if the Y location is outside of all panels.
		 * @memberOf STXChart
		 */
		STXChart.prototype.whichPanel=function(y){
			for(var p in this.panels){
				var panel=this.panels[p];
				if(panel.hidden) continue;
				if(y>panel.top && y<panel.bottom) return panel;
			}
			return null;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Called whenever the user lifts the mousebutton up. This may send a click to a drawing, or cease a drag operation.
		 * @param  {Event} e A mouse event
		 * @memberOf STXChart
		 */
		STXChart.prototype.mouseup=function(e){
			if(this.repositioningDrawing){
				// if we single click with a drawing tool enabled, then start another drawing instead of moving current one
				if(this.currentVectorParameters.vectorType=="" || this.currentVectorParameters.vectorType==null || (Date.now()-this.mouseTimer>250)){
					this.changeOccurred("vector");
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.repositioningDrawing=null;
					this.adjustDrawings(); // added missing adjusts when repositioning a Drawing  --gus
					this.draw();
					return;
				}else{
					this.repositioningDrawing=false;
				}
			}
			var wasMouseDown=this.userPointerDown;
			this.userPointerDown=false;
			if(!this.displayInitialized) return;	// No chart displayed yet
			this.grabbingScreen=false;
			if(this.openDialog!="") return;
			if(this.grabOverrideClick){
				STX.unappendClassName(document.body, "stx-drag-chart");
				this.grabOverrideClick=false;
				return;
			}
			//if(!this.displayCrosshairs) return;
			if(STXChart.insideChart) STX.unappendClassName(document.body, "stx-drag-chart");
			if(STXChart.resizingPanel!=null){
				STX.clearCanvas(this.chart.tempCanvas, this);
				this.resizePanels();
				STXChart.resizingPanel=null;
				return;
			}
			if(!e) e=event;	//IE8
			if((e.which && e.which>=2) || (e.button && e.button>=2)){
				if(this.anyHighlighted){
					this.rightClickHighlighted();
					if(e.preventDefault) e.preventDefault();
					return false;
				}else{
					return true;
				}
			}
			if(!e.pageX){
				e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			if(e.pageX<this.chart.left || e.pageX>this.chart.right) return;
			if(e.pageY<this.chart.top || e.pageY>this.chart.bottom) return;
			if(this.runPrepend("mouseup", arguments)) return;
			if(wasMouseDown){  //only completes drawing if you if not leave chart and let go of mouse button
				var cy=this.backOutY(e.pageY);
				var cx=this.backOutX(e.pageX);
				this.drawingClick(this.currentPanel, cx, cy);
			}
			if(this.runAppend("mouseup", arguments)) return;
		};
		
		/**
		 * Turns on the grabbing hand cursor. It does this by appending the class "grab" to the document body.
		 * If this is a problem then just eliminate this function from the prototype.
		 * @memberOf STXChart
		 */
		STXChart.prototype.grabbingHand=function(){
			if(!this.grabbingScreen) return;
			if(STX.touchDevice) return;
			STX.appendClassName(document.body,"stx-drag-chart");
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Called when the user presses the mouse button down. This will activate dragging operations once the user moves a few pixels
		 * within {@link STXChart#mousemoveinner}.
		 * @param  {Event} e The mouse event
		 * @memberOf STXChart
		 */
		STXChart.prototype.mousedown=function(e){
			if(this.runPrepend("mousedown", arguments)) return;
			this.grabOverrideClick=false;
			if(this.openDialog!="") return;
			if(!this.displayInitialized) return;	// No chart displayed yet
			if(!this.displayCrosshairs) return;
			if(!STXChart.insideChart) return;
			if(this.manageTouchAndMouse && e && e.preventDefault) e.preventDefault();	// Added 9/19/13 to prevent IE from going into highlight mode when you mouseout of the container
			this.mouseTimer=Date.now();
			this.userPointerDown=true;
			if(!e) e=event;	//IE8
			if((e.which && e.which>=2) || (e.button && e.button>=2)){	// Added 9/19/13 to prevent mFinance bug where right click wouldn't eliminate drawing
				return;
			}
			for(var p in this.panels){
				var panel=this.panels[p];
				if(panel.highlighted){
					STXChart.resizingPanel=panel;
					return;
				}
			}
			
			if(!e.pageX){
				e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			if(e.pageX>=this.chart.left && e.pageX<this.chart.right && e.pageY>=this.chart.top && e.pageY<=this.chart.bottom){
				if(this.repositioningDrawing) return; // if mouse went off screen this might happen
				for(var i=0;i<this.drawingObjects.length;i++){
					var drawing=this.drawingObjects[i];
					if(drawing.highlighted){
						if(this.ctrl){ // clone a drawing
							var Factory=STXChart.drawingTools[drawing.name];
							var clonedDrawing=new Factory;
							clonedDrawing.reconstruct(this, drawing.serialize());
							this.drawingObjects.push(clonedDrawing);
							this.repositioningDrawing=clonedDrawing;
							clonedDrawing.repositioner=drawing.repositioner;
							return;	
						}
						this.repositioningDrawing=drawing;
						return;
					}
				}
				this.drawingClick(this.currentPanel, this.cx, this.cy);
				if(this.activeDrawing && this.activeDrawing.dragToDraw) return;
			}
			
			this.grabbingScreen=true;
			this.yToleranceBroken=false;
			if(!e) e=event;	//IE8
			if(!e.pageX){
				e.pageX=e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
				e.pageY=e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
			}
			var chart=this.currentPanel.chart;
			this.grabStartX=e.pageX;
			this.grabStartY=e.pageY;
			this.grabStartScrollX=chart.scroll;
			this.grabStartScrollY=chart.panel.yAxis.scroll;
			this.grabStartCandleWidth=this.layout.candleWidth;
			this.grabStartZoom=this.currentPanel.yAxis.zoom;
			setTimeout((function(self){ return function(){self.grabbingHand();};})(this),100);
			if(this.runAppend("mousedown", arguments)) return;
		};
		
		/**
		 * Sets the current drawing tool.
		 * @param  {string} value The name of the drawing tool to enable
		 * @memberOf STXChart
		 */
		STXChart.prototype.changeVectorType=function(value){
			this.currentVectorParameters.vectorType=value;
			//if(value==""){  //need to always undo here to allow release of last drawing tool
				if(STXChart.drawingLine) this.undo();
			//}
			this.setCrosshairColors();
			if(STXChart.insideChart)
				this.doDisplayCrosshairs();
		};
		
		STXChart.prototype.rightClickOverlay=function(name){
			if(this.runPrepend("rightClickOverlay", arguments)) return;
			var sd=this.overlays[name];
			if(sd.editFunction){
				//TODO, pop up dialog
				sd.editFunction();
			}else{
				this.removeOverlay(name);
			}
			this.runAppend("rightClickOverlay", arguments);
		};
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Removes an overlay (and the associated study)
		 * @param  {string} name The name (id) of the overlay
		 * @memberOf STXChart
		 */
		STXChart.prototype.removeOverlay=function(name){
			if(this.runPrepend("removeOverlay", arguments)) return;
			for(var o in this.overlays){
				var sd=this.overlays[o];
				if(sd.inputs.Field && sd.inputs.Field.indexOf(name)!=-1){ // Yucky, we should move to explicit parent nodes
					this.removeOverlay(sd.name);
				}
			}
			var study=this.layout.studies[name];
			delete this.layout.studies[name];
			delete this.overlays[name];
			STX.deleteRHS(STX.Studies.studyPanelMap, study);

			this.displaySticky();
			this.createDataSet();
			this.changeOccurred("layout");
			this.runAppend("removeOverlay", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Adds a series to the chart. Series will be plotted as additional lines on the chart.
		 * <p>Note: set chart.legend={x:number, y:number} to draw a legend at the top of the chart.</p>
		 * @param {string} field      The name of the series. This must match a field in the dataSet items.
		 * @param {object} [parameters] Optional parameters to describe the series
		 * @param {string} [parameters.display] Set to the text to display on the legend. If not set, the name of the series will be used (usually symbol)
		 * @param {boolean} [parameters.isComparison] true if comparison chart of type "compare"  (only available in Advanced package).
		 * @param {boolean} [parameters.quoteFeedCallbackRefresh] true if comparison chart will use the quote feed to stay in sync (only available in Advanced package). See {@link STX.Comparison#type}
		 * @param {string} [parameters.type] Set to "step" to create a stairstep series rather than smooth lines
		 * @param {boolean} [parameters.shareYAxis] Set to true so that the series shares the Y-axis. Otherwise it is superimposed on the chart.
		 * @param {number} [parameters.marginTop] Percentage (if less than 1) or pixels (if greater than 1) from top of panel to set the top margin for the series (not applicable is shareYAxis is set)
		 * @param {number} [parameters.marginBottom] Percentage (if less than 1) or pixels (if greater than 1)  bottom of panel to set the top margin for the series (not applicable is shareYAxis is set)
		 * @param {number} [parameters.width] Width of line
		 * @param {number} [parameters.minimum] Optional minimum value for the series. Overrides STX.minMax result.
		 * @param {number} [parameters.maximum] Optional maximum value for the series. Overrides STX.minMax result.
		 * @param {string} [parameters.color] Color to draw line
		 * @param {string} [parameters.chartType] Optional chart type "mountain" to plot mountain chart
		 * @param {string} [parameters.fillStyle] Optional fill style for mountain. For semi-opaque use rgba(R,G,B,.1)
		 * @param {object} [parameters.data] Data for the series
		 * @param {Date}   [parameters.data.DT] Java date object representing data point (overrides Date parameter)
		 * @param {string} [parameters.data.Date] string date representing data point
		 * @param {number} [parameters.data.Value] value of the data point
		 * 
		 * @return {object} The series object
		 * @memberOf STXChart
		 * 
		 * @example  stx.addSeries(symbol, {color: 'red', isComparison:true, shareYAxis:true});
		 */
		STXChart.prototype.addSeries=function(field, parameters){
			if(this.runPrepend("addSeries", arguments)) return;
			if(!parameters) parameters={};
			if(!parameters.chartName) parameters.chartName=this.chart.name;
		    var obj={
		        parameters: STX.clone(parameters),
		        yValueCache: new Array(),
		        display: field,
		        isStep: (parameters.type && parameters.type=="step")
		    };
		    if("display" in obj.parameters) obj.display=obj.parameters.display;
		    var chart=this.charts[parameters.chartName];
		    function addSeriesData(stx){
		    	var mIterator=0,cIterator=0;
		    	while(parameters.data && mIterator<stx.masterData.length && cIterator<parameters.data.length){
		    		var c=parameters.data[cIterator];
		    		var m=stx.masterData[mIterator];
		    		if(!c.DT || typeof c.DT=="undefined") 
		    			c.DT=STX.strToDateTime(c.Date);
		    		if(c.DT.getTime()==m.DT.getTime()){
		    			m[field]=c.Value;
		    			cIterator++;
		    			mIterator++;
		    			continue;
		    		}
		    		if(c.DT<m.DT) cIterator++;
		    		else mIterator++;
		    	}
		    }
		    if(parameters.data && this.masterData){
		    	addSeriesData(this);
		    }else{
		    	obj.addSeriesData=addSeriesData;
		    }
		    if(chart) chart.series[field]=obj;
			this.runAppend("addSeries", arguments);
		    return obj;
		};
		
		/**
		 * Removes a series from the chart
		 * <span class="injection">INJECTABLE</span> 
		 * @param  {string} field The name of the series to remove
		 * @param  {STXChart.Chart} [chart] The chart object from which to remove the series
		 * @memberOf STXChart
		 */
		STXChart.prototype.removeSeries=function(field, chart){
			if(this.runPrepend("removeSeries", arguments)) return;
			if(!chart) chart=this.chart;
		    delete chart.series[field];
		    var compare=false;
		    for(var s in chart.series){
		    	if(chart.series[s].parameters.isComparison){
		    		compare=true;
		    		break;
		    	}
		    }
		    this.setComparison(this,chart,compare);
			for(var panel in this.panels){
				if(this.panels[panel].name.indexOf(STX.Comparison.correlationPanel)==0) {
					var compareArray=this.layout.studies[this.panels[panel].name].inputs["Compare To"];
					for(var i=0;i<compareArray.length;i++){
						if(compareArray[i]==field) compareArray.splice(i,1);
					}
					delete this.layout.studies[this.panels[panel].name].outputs["Result "+field];
					delete this.layout.studies[this.panels[panel].name].outputMap["Result "+field+" "+this.panels[panel].name];
					if(compareArray.length==0) this.panelClose(this.panels[panel]);
				}
			}
			this.runAppend("removeSeries", arguments);
		};
		
		/**
		 * Draws an item in the legend and returns the position for the next item
		 * @private
		 * @param  {array} xy    An X,Y tuple (from chart.legend)
		 * @param  {string} label The text to print in the item
		 * @param  {string} color The color for the background of the item
		 * @return {array}       A tuple containing the X,Y position for the next the item
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawLegendItem=function(xy, label, color){
			var x=xy[0], y=xy[1], w=10, h=10;
			var context=this.chart.context;
			context.fillStyle=color;
			context.fillRect(x, y, w, h);
			x+=w+2;	// 2 px spacing between box and text
			context.fillStyle=this.defaultColor;
			context.fillText(label, x, y);
			x+=context.measureText(label).width + 6; // 6 px spacing between labels
			return [x, y];
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Draws a legend for the series that are displayed on the chart
		 * @param  {STXChart.Chart} chart          The chart object
		 * @param  {object} legendColorMap A map of series names to colors
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawLegend=function(chart, legendColorMap){
			if(this.runPrepend("drawLegend", arguments)) return;
			var context=this.chart.context;
			context.textBaseline="top";
		
			var xy=[chart.legend.x, chart.legend.y];
			var lineColor=this.defaultColor;

			if(this.chart.baseLegendColors instanceof Array){
				var colors=this.chart.baseLegendColors;
				if(colors.length>1){
					var grd=context.createLinearGradient(xy[0],xy[1],xy[0]+10,xy[1]);
					for(var c=0;c<colors.length;c++){
						grd.addColorStop(c/(colors.length-1),colors[c]);
					}
					lineColor=grd;
				}else if(colors.length>0) lineColor=colors[0];
			}else if(this.layout.chartType=="mountain"){
				var c=this.canvasStyle("stx_mountain_chart");
				var strokeStyle=c["borderTopColor"];
				if(strokeStyle && strokeStyle!="transparent")
					lineColor=strokeStyle;
			}else{
				lineColor=this.canvasColor("stx_line_chart");
			}
			xy=this.drawLegendItem(xy, chart.symbol, lineColor);
			for(var field in legendColorMap){
				var display = field;
				if (legendColorMap[field]["display"]) display = legendColorMap[field]["display"];
				xy=this.drawLegendItem(xy, display, legendColorMap[field]["color"]);
			}
		
			this.runAppend("drawLegend", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Draws the series on the chart. The series are located in chart.series. Each item in chart.series should
		 * be represented by the same name in the dataSet. See {@link STXChart#addSeries}
		 * @param  {STXChart.Chart} chart The chart object to draw the series
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawSeries=function(chart){
			if(this.runPrepend("drawSeries", arguments)) return;
			var quotes=chart.dataSegment;
			var legendColorMap={};
		    for(var field in chart.series){
		        var series=chart.series[field];
		        var parameters=series.parameters;
		        var panel=chart.panel;
		        if(parameters.panel) panel=this.panels[parameters.panel];
		        if(!panel) continue;
		        var yAxis=panel.yAxis;
		
		        var bottom=panel.bottom;
		        var minMax=[parameters.minimum, parameters.maximum];
		        if((!parameters.minimum && parameters.minimum!=0) || (!parameters.maximum && parameters.maximum!=0)){
		        	var minMaxCalc=STX.minMax(quotes, field);
		        	if(!parameters.minimum && parameters.minimum!=0) minMax[0]=minMaxCalc[0];
		        	if(!parameters.maximum && parameters.maximum!=0) minMax[1]=minMaxCalc[1];
				}
		        var min=minMax[0];
		        var top=yAxis.top, bottom=yAxis.bottom, height=bottom-top, t=parameters.marginTop, b=parameters.marginBottom;
		        if(t) top=t>1?(top+t):(top+(height*t));
		        if(b) bottom=b>1?(bottom-b):(bottom-(height*b));
		        var multiplier=(bottom-top)/(minMax[1]-min);
		
		        var started=false, lastPoint=null, val=x=y=px=py=null, cw=this.layout.candleWidth,
		            offset=this.offset, context=this.chart.context, isStep=series.isStep;
		        context.beginPath();
		        if(series.yValueCache.length!=quotes.length)
		            series.yValueCache=new Array(quotes.length);
		        var yValueCache=series.yValueCache;
		        var reset=false;
		        var lastVal=null;	// Save this for printing the y-axis label
				var firstX=null, firstY=null;
		        for(var i=0;i<quotes.length;i++){
		        	var quote=quotes[i];
		        	if(!quote) continue;
		        	if(quote.transform && series.parameters.shareYAxis) quote=quote.transform;
		            val=quote[field];
		            if(!val && val!=0){
		                if(isStep){
		                    yValueCache[i]=y; // continue the y value horizontally for step charts
		                }
		                continue;
		            }
		            lastVal=val;
		
		            // For non contiguous points we need to look back
		            // calculate the slope and then fill in the yValue intercepts
		            if(!isStep && lastPoint && lastPoint!=i-1){
		                px=x, py=y;
		            }else{
		                px=null;
		            }
		            x=Math.floor(i*cw)+offset;
		            if(this.extendLastTick && i==quotes.length-1){
		            	x+=this.offset; // last tick
		            }
					if(firstX==null) firstX=x;
		            if(isStep && started){
		                context.lineTo(x, y);
		            }
		            if(series.parameters.shareYAxis){
		            	y=this.pixelFromPrice(val, panel);
		            }else{	// overlay
		            	y=bottom - ((val-min)*multiplier);
		            }
					if(firstY==null) firstY=y;
		            if(px!=null){
		                // Calculate and store the intercept points for the lookback
		                var vector={x0:px,x1:x,y0:py,y1:y};
		                for(;lastPoint!=i;lastPoint++){
		                    var xInt=Math.floor(lastPoint*cw)+offset;
		                    var yInt=STX.yIntersection(vector, xInt);
		                    yValueCache[lastPoint]=yInt;
		                }
		            }
		            yValueCache[i]=y;
		            if(y<top){
		            	y=top;
		            	if(reset){
		            		context.moveTo(x, y);
		            		continue;
		            	}
		            	reset=true;
		            }else if(y>bottom){
		            	y=bottom;
		            	if(reset){
		            		context.moveTo(x, y);
		            		continue;
		            	}
		            	reset=true;
		            }else{
		            	reset=false;
		            }
		            if(!started){
		                started=true;
		                var leftTick=chart.dataSet.length-chart.scroll;
						if(leftTick<=0){
							context.moveTo(x, y);
						}else{
							var baseline=chart.dataSet[leftTick-1];
				        	if(baseline.transform && series.parameters.shareYAxis) baseline=baseline.transform;
							var y0=baseline[field];
				            if(series.parameters.shareYAxis){
				            	y0=this.pixelFromPrice(y0, panel);
				            }else{	// overlay
				            	y0=bottom - ((y0-min)*multiplier);
				            }
							y0=Math.min(Math.max(y0,top),bottom);
							context.moveTo(0, y0);
							context.lineTo(x, y);
						}
		            }else{
		                context.lineTo(x, y);
		            }
		            lastPoint=i;
		        }
		        context.lineWidth=1;
		        if(parameters.width) context.lineWidth=parameters.width;
		        if(series.highlight) context.lineWidth=context.lineWidth*2;
		        context.strokeStyle=this.defaultColor;
		        if(parameters.color) context.strokeStyle=parameters.color;
		        context.stroke();
		        if(series.parameters.chartType=="mountain"){
		        	context.lineTo(x, bottom);
		        	context.lineTo(firstX, bottom);
					if(firstY>bottom) firstY=bottom;
					context.lineTo(firstX, firstY);
		        	if(series.parameters.fillStyle) context.fillStyle=series.parameters.fillStyle;
					context.fill();
		        }
		        context.closePath();
		        if(series.parameters.shareYAxis){
					if(yAxis.priceFormatter){
						txt=yAxis.priceFormatter(this, panel, lastVal);
					}else{
						txt=this.formatYAxisPrice(lastVal, panel);
					}
					var y=this.pixelFromPrice(lastVal, panel);
		        	this.createYAxisLabel(panel, txt, y, context.strokeStyle, "#FFFFFF");
		        }
		        legendColorMap[field]={color:context.strokeStyle, display:series.display}; // add in the optional display text to send into the drawLegend fuction
		    }
		    if(chart.legend && series){
		    	this.drawLegend(chart, legendColorMap);
		    }
			this.runAppend("drawSeries", arguments);
		};
		
		/**
		 * Returns true if the interval is based off of a daily interval ("day","week" or "month")
		 * @param  {string}  interval The interval
		 * @return {Boolean}          True if it's a daily interval
		 * @memberOf STXChart
		 */
		STXChart.isDailyInterval=function(interval){
			if(interval=="day") return true;
			if(interval=="week") return true;
			if(interval=="month") return true;
			return false;
		};
		
		//@deprecated, use static version
		STXChart.prototype.isDailyInterval=function(interval){
			if(interval=="day") return true;
			if(interval=="week") return true;
			if(interval=="month") return true;
			return false;
		};
		
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Sets the periodicity and interval for the chart. Interval describes the raw data interval (1, 5, 30, "day") while
		 * period describes the multiple of that interval (7 minutes, 3 days, 7 X 5 minutes). This method sets the new periodicity
		 * and creates a new dataSet. If the interval has changed then the underlying data is no longer valid and this.dataCallback will
		 * be called in an effort to fetch new data.
		 *
		 * Note that the kernel is capable of deriving weekly and monthly charts from daily data. Set dontRoll to true to bypass this
		 * functionality if you have raw week and month data in the masterData.
		 * 
		 * @param {number} period The number of periods   
		 * @param {string} interval The interval. This can be any number (which represents minutes) or "day","week" or "month". Set to "tick" for variable time x-axis.
		 * @param {Function} [cb] Optional callback after periodicity is changed. First parameter of callback will be null unless there was an error.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setPeriodicityV2=function(period, interval, cb){
			if(this.runPrepend("setPeriodicityV2", arguments)) return;
			var switchInterval=false;
		
			if(interval){
				// support year
				if(interval=="year"){
					interval = "month";
					if (!period) period = 1;
					period = period*12;
				}
				var getDifferentData=false;
				if(this.isDailyInterval(interval)!=this.isDailyInterval(this.layout.interval) || this.dontRoll) getDifferentData=true;
				if(!this.isDailyInterval(this.layout.interval)){
					if(this.layout.interval!=interval) getDifferentData=true;
				}
				if(getDifferentData){
					this.layout.interval=interval;
					this.layout.periodicity=period;
					this.changeOccurred("layout");
					if(this.dataCallback){
						this.dataCallback();
					}else if(this.quoteDriver){
						for(var chartName in this.charts){
							var chart=this.charts[chartName];
							if(chart.symbol)
								this.quoteDriver.newChart(chart.symbol, chart, cb);
						}
						return;
					}
					if(cb) cb(null);
					return;
				}
				this.layout.interval=interval;
			}
		
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				var dt;
				var pos=Math.round(chart.maxTicks/2);
				var rightAligned=null;
				chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
				var centerMe=true, rightAligned=false;
				if(chart.scroll<chart.maxTicks)	// don't attempt to center the chart if we're scrolled into the future
					centerMe=false;
				else if(chart.dataSegment && !chart.dataSegment[pos]){	// don't attempt to center the chart if we're scrolled into the past
					centerMe=false;
					rightAligned=chart.scroll-chart.dataSet.length;	// We'll use this to keep the same amount of right alignment
				}
		
		
				if(centerMe && chart.dataSegment && chart.dataSegment.length>0){
					if(chart.maxTicks<((Math.round((this.chart.width/this.layout.candleWidth)-.499)-1)/2)){
						pos=chart.dataSegment.length-1;
					}
					if(pos>=chart.dataSegment.length){
						dt=chart.dataSegment[chart.dataSegment.length-1].DT;
						pos=chart.dataSegment.length-1;
					}else{
						dt=chart.dataSegment[pos].DT;
					}
				}
				this.layout.periodicity=period;
		
				this.createDataSet();
		
				if(centerMe){	// If we're scrolled somewhere into the middle of the chart then we will keep the chart centered as we increase or decrease periodicity
					if(chart.dataSegment && chart.dataSegment.length>0){
						for(var i=chart.dataSet.length-1;i>=0;i--){
							var nd=chart.dataSet[i].DT;
							if(nd.getTime()<dt.getTime()){
								chart.scroll=(chart.dataSet.length-i)+pos;
								break;
							}
						}
					}
				}else if(!rightAligned){
					var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
					chart.scroll=chart.maxTicks-wsInTicks;			// Maintain the same amount of left alignment
				}else{
					chart.scroll=chart.dataSet.length+rightAligned;	// Maintain the same amount of right alignment
				}
			}
		
		
			if(this.displayInitialized) this.draw();
			this.changeOccurred("layout");

			if(this.quoteDriver){
				for(var chartName in this.charts){
					var chart=this.charts[chartName];
					if(chart.symbol && chart.moreAvailable){
						this.quoteDriver.checkLoadMore(chart);
					}
				}
			}
			if(cb) cb(null);
			if(this.runAppend("setPeriodicityV2", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Draws the drawings (vectors). Each drawing is iterated and asked to draw itself. Drawings are automatically
		 * clipped by their containing panel.
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawVectors=function(){
			if(this.vectorsShowing) return;
			if(this.runPrepend("drawVectors", arguments)) return;
			this.vectorsShowing=true;
			if(!this.chart.hideDrawings){
				var tmpPanels={};
				// First find all the existing panels in the given set of drawings (exluded those that aren't displayed)
				for(var i=0;i<this.drawingObjects.length;i++){
					var drawing=this.drawingObjects[i];
					var panelName=drawing.panelName;
					if(!this.panels[drawing.panelName]) continue;	// drawing from a panel that is not enabled
					if(!tmpPanels[panelName]){
						tmpPanels[panelName]=[];
					}
					tmpPanels[panelName].push(drawing);
				}
				// Now render all the drawings in those panels, clipping each panel
				for(var panelName in tmpPanels){
					this.startClip(panelName);
					var arr=tmpPanels[panelName];
					for(var i=0;i<arr.length;i++){
						var drawing=arr[i];
						drawing.render(this.chart.context);
					}
					this.endClip();
				}
			}
			if(this.runAppend("drawVectors", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Consolidates a series of quotes into a single quote. This is called by {@link STXChart#createDataSet} to roll
		 * up intervals (including week and month from daily data).
		 * @param  {array} quotes      The quotes (dataSet)
		 * @param  {number} position    The starting position in quotes
		 * @param  {number} periodicity The periodicity
		 * @param  {number} interval    The interval
		 * @param  {boolean} dontRoll    True if weekly and monthly should not be rolled from daily
		 * @param {boolean} alignToHour  If true then align intraday bars to the hour
		 * @return {object}             Returns an object containing the "quote" and the new "position"
		 * @memberOf STXChart
		 */
		STXChart.prototype.consolidatedQuote=function(quotes, position, periodicity, interval, dontRoll, alignToHour){
			if(position<0) return null;
			var arguments$=[quotes, position, periodicity, interval, dontRoll, alignToHour]; // V8 Optimization
			if(this.runPrepend("consolidatedQuote", arguments$)) return null;
			if(!dontRoll && this.dontRoll) dontRoll=true;
			var ratio=1;
			if(this.layout.adj && quotes[position].Split_Close!=null){
				ratio=quotes[position].Split_Close/quotes[position].Close;
			}else if(this.layout.adj && quotes[position].Adj_Close!=null){
				ratio=quotes[position].Adj_Close/quotes[position].Close;
			}
			var q=quotes[position];
		
			var quote={};
			for(var field in q){
				quote[field]=q[field];
			}
			if("Open" in quote) quote.Open = q.Open*ratio;
			if("Close" in quote && quote.Close!=null) quote.Close = q.Close*ratio;
			if("High" in quote) quote.High = q.High*ratio;
			if("Low" in quote) quote.Low = q.Low*ratio;
		
			function consolidate(self, p){
				if(self.layout.adj && quotes[p].Split_Close!=null){
					ratio=quotes[p].Split_Close/quotes[p].Close;
				}else if(self.layout.adj && quotes[p].Adj_Close!=null){
					ratio=quotes[p].Adj_Close/quotes[p].Close;
				}
				if("High" in quotes[p]) if(quotes[p].High*ratio>quote.High) quote.High=quotes[p].High*ratio;
				if("Low" in quotes[p]) if(quotes[p].Low*ratio<quote.Low) quote.Low=quotes[p].Low*ratio;
				quote.Volume+=quotes[p].Volume;
				if("Close" in quotes[p] && quotes[p].Close!=null) quote.Close=quotes[p].Close*ratio;
				quote.ratio=ratio;
			}
		
		
			function newInterval(p, interval){
				var d1=quotes[p-1].DT;
				var d2=quotes[p].DT;
				if(interval=="week"){
					if(d2.getDay()<d1.getDay()) return true;
				}else if(interval=="month"){
					if(d2.getMonth()!=d1.getMonth()) return true;
				}else{
					if(d2.getDay()!=d1.getDay()) return true;
				}
				return false;
			}
			// Look ahead into the future based on the number of minutes we're rolling to. That time is the beginning of the next bar.
			// If our next tick is equal to or past that bar then we've gone too far. This can happen either if we're missing ticks
			// or it can happen simply at the end of the day when we roll to the next day.
			function newIntradayInterval(position, p, periodicity, interval){
				var nextBar=interval*periodicity;
				var d1=new Date(quotes[position].DT);
				d1.setMinutes(d1.getMinutes()+nextBar);
				var d2=quotes[p].DT;
				if(alignToHour){
					if(quotes[position].DT.getMinutes()%nextBar){
						if(!(d2.getMinutes()%nextBar)){
							return true;
						}
					}
				}
				if(d2.getTime()>=d1.getTime()) return true;
				return false;
			}
			var p=position;
			if((interval=="week" || interval=="month") && !dontRoll){
				for(var i=1;i<=periodicity;i++){
					while(p+1<quotes.length && !newInterval(p+1, interval)){
						p++;
						consolidate(this, p);
					}
					if(i!=periodicity){
						p++;
						if(p<quotes.length) consolidate(this, p);
					}
				}
			}else if(!this.isDailyInterval(interval) && interval!="tick" && periodicity>1){
				for(var i=1;i<periodicity;i++){
					p=position+i;
					if(p<quotes.length && newIntradayInterval(position, p, periodicity, interval)){
						p--;
						break;
					}
					if(p>=0 && p<quotes.length){
						consolidate(this, p);
					}
				}
			}else{
				for(var i=1;i<periodicity;i++){
					p=position+i;
					if(p>=0 && p<quotes.length){
						consolidate(this, p);
					}
				}
			}
			for(var i in this.plugins){
				var plugin=this.plugins[i];
				if(plugin.consolidate) plugin.consolidate(quotes, position, p, quote);
			}
			this.runAppend("consolidatedQuote", arguments$);
			return {
					"quote": quote,
					"position": p+1
			};
		};

		// Constant bitmask for bar evaluation
		STXChart.NONE=0;		// no evaluation (black bars)
		STXChart.CLOSEUP=1;		// today's close greater than yesterday's close
		STXChart.CLOSEDOWN=2;	// today's close less than yesterday's close
		STXChart.CLOSEEVEN=4;	// today's close the same as yesterday's close
		STXChart.CANDLEUP=8;	// today's close greater than today's open
		STXChart.CANDLEDOWN=16;	// today's close less than today's open
		STXChart.CANDLEEVEN=32;	// today's close equal to today's open

		
		/**
		 * <span class="animation">Animation Loop</span> 
		 * Displays the chart by calling the appropriate rendering functions based on the chart type.
		 * @private
		 * @param  {STXChart.Chart} chart The chart to render
		 * @memberOf STXChart
		 */
		STXChart.prototype.displayChart=function(chart){
			this.tmpWidth=Math.round(this.layout.candleWidth*this.candleWidthPercent);	// So we don't need to compute it a thousand times for every candle
			if(!(this.tmpWidth%2)){	// assure that candles are always odd number of pixels wide
				this.tmpWidth+=1;
			}
			if(this.runPrepend("displayChart", arguments)) return;
			
			this.chart.baseLegendColors=[];
			var chartType=this.layout.chartType;
			var colorFunction=null;
			if(chart.customChart){
				if(chart.customChart.chartType!=null) chartType=chart.customChart.chartType;
				if(chart.customChart.colorFunction!=null) colorFunction=chart.customChart.colorFunction;
			}

			// draw volume underlay first, so it appears underneath other charts
			if(this.layout.volumeUnderlay){
				this.volUnderlay(chart);
			}
		
			if(chartType=="line"){
				this.drawLineChart(chart, "stx_line_chart");
			}else if(chartType=="mountain"){
				this.chart.baseLegendColors=null;
				this.drawMountainChart(chart);
			}else if(chartType=="wave"){
				this.drawWaveChart(chart);
			}else if(chartType=="bar"){
				this.drawBarChartHighPerformance(chart, "stx_line_chart");
			}else if(chartType=="colored_line"){
				var stxLineUpColor=this.getCanvasColor("stx_line_up");
				var stxLineDownColor=this.getCanvasColor("stx_line_down");
				var stxLineColor=this.getCanvasColor("stx_line_chart");
				if(!colorFunction) colorFunction=function(stx, quote, mode){
					if(quote.Close>quote.iqPrevClose) return stxLineUpColor;
					else if(quote.Close<quote.iqPrevClose) return stxLineDownColor;
					else return stxLineColor;
					return null;
				};
				var colors=this.drawLineChart(chart, "stx_line_chart", colorFunction);
				for(var c in colors) this.chart.baseLegendColors.push(c);
			}else if(chartType=="colored_bar"){
				if(colorFunction){
					var colors=this.drawBarChart(chart, colorFunction);
					for(var c in colors) this.chart.baseLegendColors.push(c);
				}else{
					this.drawBarChartHighPerformance(chart, "stx_bar_up", STXChart.CLOSEUP);
					this.drawBarChartHighPerformance(chart, "stx_bar_down", STXChart.CLOSEDOWN);
					this.drawBarChartHighPerformance(chart, "stx_candle_shadow", STXChart.CLOSEEVEN);
					this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_up"));
					this.chart.baseLegendColors.push(this.getCanvasColor("stx_bar_down"));
				}
			}else if(chartType=="hollow_candle"){
				if(colorFunction){
					this.drawShadows(chart, colorFunction);
					this.drawCandles(chart, colorFunction, false);  //all bars
					this.drawCandles(chart, colorFunction, true);   //hollow bars only get border
				}else{
					this.drawShadowsHighPerformance(chart, "stx_hollow_candle_up", STXChart.CLOSEUP);
					this.drawShadowsHighPerformance(chart, "stx_hollow_candle_down", STXChart.CLOSEDOWN);
					this.drawShadowsHighPerformance(chart, "stx_hollow_candle_even", STXChart.CLOSEEVEN);
			
					var colorUp=this.getCanvasColor("stx_hollow_candle_up");
					var colorDown=this.getCanvasColor("stx_hollow_candle_down");
					var colorEven=this.getCanvasColor("stx_hollow_candle_even");
					this.drawCandlesHighPerformance(chart, colorUp, "transparent", STXChart.CLOSEUP|STXChart.CANDLEDOWN);
					this.drawCandlesHighPerformance(chart, colorDown, "transparent", STXChart.CLOSEDOWN|STXChart.CANDLEDOWN);
					this.drawCandlesHighPerformance(chart, colorEven, "transparent", STXChart.CLOSEEVEN|STXChart.CANDLEDOWN);
					this.drawCandlesHighPerformance(chart, this.containerColor, colorUp, STXChart.CLOSEUP|STXChart.CANDLEUP);
					this.drawCandlesHighPerformance(chart, this.containerColor, colorDown, STXChart.CLOSEDOWN|STXChart.CANDLEUP);
					this.drawCandlesHighPerformance(chart, this.containerColor, colorEven, STXChart.CLOSEEVEN|STXChart.CANDLEUP);
					this.chart.baseLegendColors.push(colorUp);
					this.chart.baseLegendColors.push(colorDown);
				}
			}else if(chartType=="candle"){
				// If up and down shadow colors are different then we're using colored shadows
				// otherwise we just use stx_candle_shadow. Note that using the colored shadows
				// puts us into the colorFunction code which is a lot slower than the high performance
				// functions
				var coloredShadowUp=this.getCanvasColor("stx_candle_shadow_up");
				var coloredShadowDown=this.getCanvasColor("stx_candle_shadow_down");
				var coloredShadow=(coloredShadowUp!=coloredShadowDown);

				if(!colorFunction && coloredShadow){
					var stxCandleShadow=this.getCanvasColor("stx_candle_shadow");
					var stxCandleUpColor=this.getCanvasColor("stx_candle_up");
					var stxCandleDownColor=this.getCanvasColor("stx_candle_down");
					var stxCandleUp=this.canvasStyle("stx_candle_up");
					var stxCandleDown=this.canvasStyle("stx_candle_down");
					colorFunction=function(stx, quote, mode){
						if(mode=="shadow"){
							if(coloredShadow){
								if(quote.Close>quote.Open) return coloredShadowUp;
								else if(quote.Close<quote.Open) return coloredShadowDown;
							}
							return stxCandleShadow;
						}else if(mode=="solid"){
							if(quote.Close>quote.Open) return stxCandleUpColor;
							else if(quote.Close<quote.Open) return stxCandleDownColor;
							else if(quote.Close==quote.Open) return stxCandleShadow;
						}else if(mode=="outline"){
							var styleArray;
							if(quote.Close>quote.Open) styleArray=stxCandleUp;
							else if(quote.Close<quote.Open) styleArray=stxCandleDown;
							else return null;
							var borderColor=styleArray["border-left-color"];
							if(!borderColor) borderColor=styleArray["borderLeftColor"];	//IE
							return borderColor;
						}
						return null;
					};
				}
				if(colorFunction){
					this.drawShadows(chart, colorFunction);
					this.drawCandles(chart, colorFunction, false);   //all candles
					if(this.tmpWidth>=3) this.drawCandles(chart, colorFunction, true);  //all candle borders, if candlewidth is too small then don't draw the borders
				}else{
					this.drawShadowsHighPerformance(chart, "stx_candle_shadow");
			
					var styleArray=this.canvasStyle("stx_candle_up");
					var borderColor=styleArray["border-left-color"];
					if(!borderColor) borderColor=styleArray["borderLeftColor"];	//IE
					if(this.tmpWidth<3) borderColor=null;
					this.drawCandlesHighPerformance(chart, this.getCanvasColor("stx_candle_up"), borderColor, STXChart.CANDLEUP);
					this.chart.baseLegendColors.push(styleArray.color);
			
					var styleArray=this.canvasStyle("stx_candle_down");
					var borderColor=styleArray["border-left-color"];
					if(!borderColor) borderColor=styleArray["borderLeftColor"];	//IE
					if(this.tmpWidth<3) borderColor=null;
					this.drawCandlesHighPerformance(chart, this.getCanvasColor("stx_candle_down"), borderColor, STXChart.CANDLEDOWN);
					this.chart.baseLegendColors.push(styleArray.color);
				}
			}else if(chartType=="baseline_delta"){	
				this.setStyle("stx_baseline_trace", "opacity", 0);
				this.drawLineChart(chart, "stx_baseline_trace");
				var baseline=chart.baseline;
				if(baseline){
					baseline=this.pixelFromPriceTransform(chart.baseline,chart.panel);
					var styles={"over":"stx_baseline_up","under":"stx_baseline_down"};
					for(var s in styles){
						var parameters={
							panelName: "chart",
							band: "Close",
							threshold: chart.baseline,
							color: this.getCanvasColor(styles[s]),
							direction: (s=="over"?1:-1),
							edgeHighlight: this.getCanvasColor(styles[s]),
							edgeParameters: {pattern:"solid",lineWidth:parseInt(this.canvasStyle(styles[s]).width,10)+0.1,opacity:1}
						};
						var color=parameters.color;
						if(color && color!="transparent"){
							var gradient=chart.context.createLinearGradient(0,(s=="over"?0:2*baseline),0,baseline);
							gradient.addColorStop(0, STX.hexToRgba(color,60));
							gradient.addColorStop(1, STX.hexToRgba(color,10));
							parameters.color=gradient;
							parameters.opacity=1;
						}
						STX.Studies.preparePeakValleyFill(this,chart.dataSegment,parameters);
						this.chart.baseLegendColors.push(color);
					}
	    			this.plotLine(0, 1, baseline, baseline, this.containerColor, "line", chart.context, true, {pattern:"solid",lineWidth:"1.1",opacity:1});
	    			this.plotLine(0, 1, baseline, baseline, this.getCanvasColor("stx_baseline"), "line", chart.context, true, {pattern:"dotted",lineWidth:"2.1",opacity:.5});
				}
			}else if(chartType=="scatterplot"){
				this.scatter(chart);
			}
		
			this.createVolumeChart(chart);
			if(this.runAppend("displayChart", arguments)) return;
		};
		
		/**
		 * Calculates the ATR (Average True Range) for the dataSet
		 * @private
		 * @param  {STXChart.Chart} chart The chart to calculate
		 * @param  {number} period The number of periods
		 * @memberOf STXChart
		 */
		STXChart.prototype.calculateATR=function(chart,period){
			if(!period) period=20;
			var total=0;
			for(var i=1;i<chart.dataSet.length;i++){
				var prices=chart.dataSet[i];
				var pd=chart.dataSet[i-1];
				var trueRange=Math.max(Math.max(prices.High-prices.Low, prices.High-pd.Close), pd.Close-prices.Low);
				total+=trueRange;
				if(i>period) total-=chart.dataSet[i-period].trueRange;
				prices.trueRange=trueRange;
				prices.atr=total/period;
			}
		};
		
		/**
		 * Returns the current quote (the final element in the dataSet).
		 * @return {object} The most recent quote
		 * @memberOf STXChart
		 */
		STXChart.prototype.currentQuote=function(){
			var quote=null;
			for(var i=this.chart.dataSet.length-1;i>=0;i--)
				if(this.chart.dataSet[i]!=null)
					return this.chart.dataSet[i];
			return null;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * This method ensures that the chart is not scrolled off of either of the horizontal edges. By default it ensures
		 * that at least 1/3 of the screen has chart elements on it.
		 * @param  {STXChart.Chart} theChart The chart to check
		 * @memberOf STXChart
		 */
		STXChart.prototype.correctIfOffEdge=function(theChart){
			if(this.runPrepend("correctIfOffEdge", arguments)) return;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
		
				// detect if the chart is off the edge of the screen. If so then pull it back by resetting chart.scroll
				var leftPad=Math.round(chart.maxTicks/3);
				if(leftPad>chart.dataSet.length) leftPad=chart.dataSet.length;
				if(chart.allowScrollPast){	// allow scrolling from left to right, creating white space on either side
					var rightPad=chart.maxTicks-leftPad;
					if(chart.maxTicks-rightPad>chart.dataSet.length){
						rightPad=chart.maxTicks-chart.dataSet.length;
					}
					if(chart.scroll-rightPad>chart.dataSet.length){
						chart.scroll=chart.dataSet.length+rightPad;
					}
					if(chart.scroll<leftPad){
						chart.scroll=leftPad;
					}
				}else{	// earliest point in time is always anchored on left side of chart
					if(chart.scroll<leftPad){
						chart.scroll=leftPad;
					}
					if(chart.scroll>chart.dataSet.length){
						chart.scroll=chart.dataSet.length;
					}
				}
			}
			this.runAppend("correctIfOffEdge", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Creates the dataSegment. The dataSegment is a copy of the portion of the dataSet that is observable in the
		 * current chart. That is, the dataSegment is a "view" into the dataSet. chart.scroll and chart.maxTicks are the
		 * primary drivers for this method.
		 * @param  {STXChart.Chart} [theChart] If passed then a data segment will be created just for that chart, otherwise all charts
		 * @memberOf STXChart
		 */
		STXChart.prototype.createDataSegment=function(theChart){
			if(this.runPrepend("createDataSegment", arguments)) return;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(theChart) chart=theChart;
		
				/*
				// detect if the chart is off the edge of the screen. If so then pull it back by resetting chart.scroll
				var leftPad=Math.round(chart.maxTicks/3);
				if(leftPad>chart.dataSet.length) leftPad=chart.dataSet.length;
				if(chart.allowScrollPast){	// allow scrolling from left to right, creating white space on either side
					var rightPad=chart.maxTicks-leftPad;
					if(chart.maxTicks-rightPad>chart.dataSet.length){
						rightPad=chart.maxTicks-chart.dataSet.length;
					}
					if(chart.scroll-rightPad>chart.dataSet.length){
						chart.scroll=chart.dataSet.length+rightPad;
					}
					if(chart.scroll<leftPad){
						chart.scroll=leftPad;
					}
				}else{	// earliest point in time is always anchored on left side of chart
					if(chart.scroll<leftPad){
						chart.scroll=leftPad;
					}
					if(chart.scroll>chart.dataSet.length){
						chart.scroll=chart.dataSet.length;
					}
				}*/
		
		
		
				chart.dataSegment=[];
				chart.baseline=null;
				for(var i=0;i<chart.maxTicks;i++){
					position=chart.dataSet.length - chart.scroll + i;
					if(position<chart.dataSet.length && position>=0){
						chart.dataSegment.push(chart.dataSet[position]);
						if(!chart.baseline) chart.baseline=chart.dataSet[position].iqPrevClose;
					}else if(position<0){
						chart.dataSegment.push(null);
					}
				}
				if(theChart) break;
			}
			this.runAppend("createDataSegment", arguments);
		};
		
		/**
		 * Returns the tick position of the leftmost position on the chart.
		 * @return {number} The tick for the leftmost position
		 * @memberOf STXChart
		 */
		STXChart.prototype.leftTick=function(){
			return this.chart.dataSet.length-this.chart.scroll;
		};
		
		/**
		 * Returns the offset from the left side of the screen for the first element
		 * on the chart screen. Most times this will be zero except when a user has scrolled
		 * past the end of the chart in which case it will be a positive number. This can be used
		 * to recreate a saved chart.
		 * @return {number} The offset from the left of the chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.getStartDateOffset=function(){
			for(var ds=0;ds<this.chart.dataSegment.length;ds++){
				if(this.chart.dataSegment[ds]!=null){
					return ds;
				}
			}
			return 0;
		};
		
		/**
		 * Scrolls the chart so that the leftmost tick is the requested date. The date must be an exact match.
		 * There is no effect if the date is not found.
		 * @param {Date} dt The requested date
		 * @memberOf STXChart
		 */
		STXChart.prototype.setStartDate=function(dt){
			for(var i=0;i<this.chart.dataSet.length;i++){
				var bar=this.chart.dataSet[i];
				if(bar.DT.getTime()==dt.getTime()){
					this.chart.scroll=this.chart.dataSet.length-i;
					this.draw();
					return;
				}
			}
		};
		
		//@private
		STXChart.prototype.clearPixelCache=function(){
			for(var x in this.panels){
				var panel=this.panels[x];
				panel.cacheHigh=null;
				panel.cacheLow=null;
				panel.cacheLeft=1000000;
				panel.cacheRight=-1;
			}
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(!chart.dataSet) continue;
				for(var i=0;i<chart.dataSet.length;i++){
					chart.dataSet[i].cache={};
				}
			}
		};
		
		/**
		 * Creates a label on the y-axis. There is always a label for the current price, and optionally
		 * labels for studies.
		 * @param  {STXChart.Panel} panel           The panel on which to print the label
		 * @param  {string} txt             The text for the label
		 * @param  {number} y               The Y position on the canvas for the label. This method will ensure that it remains on the requested panel.
		 * @param  {string} backgroundColor The background color for the label.
		 * @param  {string} color           The foreground color for the label. If none provided then white is used, unless the background is white in which case black is used.
		 * @param  {external:CanvasRenderingContext2D} [ctx]         The canvas context to use, defaults to the chart
		 * @memberOf STXChart
		 */
		STXChart.prototype.createYAxisLabel=function(panel, txt, y, backgroundColor, color, ctx){
			var context=ctx?ctx:this.chart.context;
			var margin=3;
			var height=this.getCanvasFontSize("stx_yaxis")+margin*2;
			this.canvasFont("stx_yaxis", context);
			var drawBorders=panel.yAxis.displayBorder || this.axisBorders;
			var tickWidth=drawBorders?3:0; // pixel width of tick off edge of border
			try{
				var width=context.measureText(txt).width+tickWidth+margin*2;
			}catch(e){ width=this.chart.canvasWidth-this.yaxisLeft;} // Firefox doesn't like this in hidden iframe

			var x=(this.chart.canvasWidth-this.yaxisLeft)-margin + 3;
			if(y+(height/2)>panel.bottom) y=panel.bottom-(height/2);
			if(y-(height/2)<panel.top) y=panel.top+(height/2);
			context.fillStyle=backgroundColor;
			if(typeof(STX[this.yaxisLabelStyle]) == 'undefined') {
				this.yaxisLabelStyle="roundRectArrow";  // in case of user error, set a default.
			}
			STX[this.yaxisLabelStyle](context, x, y-(height/2), width, height, 3, true, false, "left");

			context.textBaseline="middle";
			context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);
			if(context.fillStyle==backgroundColor){	// Best effort to pick a foreground color that isn't the same as the background!
				if(backgroundColor.toUpperCase()=="#FFFFFF")
					context.fillStyle="#000000";
				else
					context.fillStyle="#FFFFFF";
			}
			// offset by 1 for true vertical centering since these only contain numbers
			context.fillText(txt, x+margin+tickWidth, y + 1);
		};

		/**
		 * Creates a label on the x-axis.
		 * @param  {STXChart.Panel} panel           The panel on which to print the label
		 * @param  {string} txt             The text for the label
		 * @param  {number} x               The X position on the canvas for the label. This method will ensure that it remains on the requested panel.
		 * @param  {string} backgroundColor The background color for the label.
		 * @param  {string} color           The foreground color for the label. If none provided then white is used, unless the background is white in which case black is used.
		 * @memberOf STXChart
		 */
		STXChart.prototype.createXAxisLabel=function(panel, txt, x, backgroundColor, color){
			var context=this.chart.context;
			var margin=2;
			var fontstyle="stx-float-date";  //or stx_xaxis
			var height=this.getCanvasFontSize(fontstyle)+margin*2;
			this.canvasFont(fontstyle, context);
			try{
				var width=context.measureText(txt).width+margin*2;
			}catch(e){ width=0;} // Firefox doesn't like this in hidden iframe
			var y=panel.top+panel.height-height;//-margin;
			if(x+(width/2)>panel.right) x=panel.right-(width/2);
			if(x-(width/2)<panel.left) x=panel.left+(width/2);
			context.fillStyle=backgroundColor;
			STX.roundRect(context, x-(width/2), y, width, height, 3, true, false);
			context.textBaseline="top";
			context.fillStyle=color?color:STX.chooseForegroundColor(backgroundColor);
			if(context.fillStyle==backgroundColor){	// Best effort to pick a foreground color that isn't the same as the background!
				if(backgroundColor.toUpperCase()=="#FFFFFF")
					context.fillStyle="#000000";
				else
					context.fillStyle="#FFFFFF";
			}
			context.fillText(txt, x-width/2+margin, y+margin);
		};

		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Draws a y-axis label for the current price. stx_current_hr_down and stx_current_hr_up classes can be modified
		 * to control the foreground and background colors for the label.
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawCurrentHR=function(){
			if(this.runPrepend("drawCurrentHR", arguments)) return;
			var backgroundColor, color, currentClose;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				var panel=chart.panel;
				var yAxis=panel.yAxis;
				var whichSet=yAxis.whichSet;
				if(!whichSet) whichSet="dataSet";
				var l=chart[whichSet].length;
				if(l){
					var quote=chart[whichSet][l-1];
					var prevClose=currentClose=quote.Close;
					if(chart.dataSet.length>=2){
						var quote2=chart[whichSet][l-2];
						prevClose=quote2.Close;
					}
					if(currentClose<prevClose){
						backgroundColor=this.canvasStyle("stx_current_hr_down")["backgroundColor"];
						color=this.canvasStyle("stx_current_hr_down")["color"];
					}else{
						backgroundColor=this.canvasStyle("stx_current_hr_up")["backgroundColor"];
						color=this.canvasStyle("stx_current_hr_up")["color"];
					}
					if(quote.transform) quote=quote.transform;
					var txt;
					// If a chart panel, then always display at least the number of decimal places as calculated by masterData (panel.chart.decimalPlaces)
					// but if we are zoomed to high granularity then expand all the way out to the y-axis significant digits (panel.yAxis.printDecimalPlaces)
					var labelDecimalPlaces=Math.max(panel.yAxis.printDecimalPlaces, panel.chart.decimalPlaces);
					//  ... and never display more decimal places than the symbol is supposed to be quoting at
					if(yAxis.maxDecimalPlaces!=null) labelDecimalPlaces=Math.min(labelDecimalPlaces, yAxis.maxDecimalPlaces);
					if(yAxis.priceFormatter){
						txt=yAxis.priceFormatter(this, panel, quote.Close, labelDecimalPlaces);
					}else{
						txt=this.formatYAxisPrice(quote.Close, panel, labelDecimalPlaces);
					}

					var y=this.pixelFromPrice(quote.Close, panel);
					this.createYAxisLabel(panel, txt, y, backgroundColor, color);
				}
			}
			this.runAppend("drawCurrentHR", arguments);
		};
		
		/**
		 * <span class="animation">Animation Loop</span> 
		 * Determines the default color for lines and studies drawn on the screen. This is black unless
		 * the background color fo the chart has a "value" greater than 65%.
		 * The result is that this.defaultColor contains the default color.
		 * @memberOf STXChart
		 */
		STXChart.prototype.getDefaultColor=function(){
			this.defaultColor="#000000";
			var bgColor=null;
			var div=this.chart.container;
			while(!bgColor || STX.isTransparent(bgColor)){
				var cStyle=getComputedStyle(div);
				if(!cStyle) return;
				bgColor=cStyle["backgroundColor"];
				if(STX.isTransparent(bgColor)) bgColor="transparent";
				div=div.parentNode;
				if(!div || !div.tagName) break;
			}
			if(bgColor){
				this.containerColor=bgColor;
				if(!STX.isTransparent(bgColor)){
					var hsv=STX.hsv(bgColor);
					var v=hsv[2];
					if(v>.65) this.defaultColor="#000000";
					else this.defaultColor="#FFFFFF";
				}else{
					this.defaultColor="#000000";
				}
			}
		};
		
		/**
		 * Charts may require asynchronous data to render. This creates a dilemma for any external
		 * process that depends on a fully rendered chart (for instance a process to turn a chart into an image).
		 * To solve this problem, external processes can register for a callback which will tell them when the chart
		 * has been drawn. See {@link STXChart.registerChartDrawnCallback}.
		 *
		 * To accomodate this requirement, studies, plugins or injections that render asynchronously should use startAsyncAction
		 * and {@link STXChart#completeAsyncAction} to inform the chart of their asynchronous activity.
		 * @memberOf STXChart
		 */
		STXChart.prototype.startAsyncAction=function(){
			if(this.pendingAsyncs==null) this.pendingAsyncs=[];
			this.pendingAsyncs.push(true);
		};

		/**
		 * Register a callback for when the chart has been drawn
		 * @param  {function} fc The function to call
		 * @return {object} An object that can be passed in to {@link STXChart#unregisterChartDrawnCallback}
		 * @memberOf  STXChart
		 */
		STXChart.prototype.registerChartDrawnCallback=function(fc){
			if(this.asyncCallbacks==null) this.asyncCallbacks=[];
			this.asyncCallbacks.push(fc);
			return {
				fc: fc
			};
		};

		/**
		 * @memberOf STXChart
		 * @param  {obj} fc An object from {@link STXChart#registerDrawnCallback}
		 */
		STXChart.prototype.unregisterChartDrawnCallback=function(obj){
			for(var i=0;i<this.asyncCallbacks.length;i++){
				if(this.asyncCallbacks[i]==obj.fc){
					this.asyncCallbacks.splice(i, 1);
					return;
				}
			}
		}

		/**
		 * Makes the async callbacks only if no pending async activity
		 * @memberOf STXChart
		 */
		STXChart.prototype.makeAsyncCallbacks=function(){
			if(!this.asyncCallbacks) return; // no callbacks to make
			if(!this.pendingAsyncs || this.pendingAsyncs.length==0){ // If no pending asyncs, or the array is empty (all have been fulfilled)
				for(var i=0;i<this.asyncCallbacks.length;i++){
					(this.asyncCallbacks[i])();
				}
			}
		};
		/**
		 * Studies or plugins that use asynchronous data should call this when their async activities are complete.
		 * See {@link STXChart#startAsyncAction}
		 * @memberOf  STXChart
		 */
		STXChart.prototype.completeAsyncAction=function(){
			this.pendingAsyncs.pop();
			this.makeAsyncCallbacks();
		};
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * This is the main rendering function in the animation loop. It draws the chart including panels, axis, and drawings.
		 * This method is called continually as a user pans or zooms the chart.
		 * This would be a typical place to put an injection to add behavior to the chart after a drawing operation is complete.
		 * @memberOf STXChart
		 */
		STXChart.prototype.draw=function(){
			if(!this.chart.canvas) return;
			if(!this.chart.dataSet) return;
			if(this.chart.canvasHeight==0) return;
			this.offset=this.layout.candleWidth*this.candleWidthPercent/2;
			STX.clearCanvas(this.chart.canvas, this);
			if(this.runPrepend("draw", arguments)) return;
			if(!this.xaxisHeight){
				this.xaxisHeight=this.getCanvasFontSize("stx_xaxis")+4;
				if(this.chart.xAxis.displayBorder || this.axisBorders) this.xaxisHeight+=3;
			}
			this.getDefaultColor();	//TODO, don't call this in draw() but instead manually when background color is changed?
			this.vectorsShowing=false;
		
			this.drawPanels();
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				this.correctIfOffEdge();
				this.createDataSegment();
				var axisRepresentation=this.createXAxis(chart);
				this.initializeDisplay(chart);
				this.drawXAxis(chart, axisRepresentation);
		
				for(var i in this.plugins){
					var plugin=this.plugins[i];
					if(plugin.display){
						if(plugin.drawUnder) plugin.drawUnder(this, chart);
					}
				}
				this.displayChart(chart);
			    this.drawSeries(chart);
				for(var i in this.plugins){
					var plugin=this.plugins[i];
					if(plugin.display){
						if(plugin.drawOver) plugin.drawOver(this, chart);
					}
				}
			}
			STX.Studies.displayStudies(this);
			this.createCrosshairs();	//todo, move out of animation loop
			this.drawVectors();
			this.drawCurrentHR();
			this.displayInitialized=true;
			if(this.controls.home){
				if(this.chart.scroll-1>this.chart.maxTicks){
					this.controls.home.style.display="block";
				}else{
					this.controls.home.style.display="none";
				}
			}
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(this.quoteDriver) this.quoteDriver.checkLoadMore(chart);
			}
			this.runAppend("draw", arguments);
			this.makeAsyncCallbacks();
		};
		
		/**
		 * This method adjusts the canvas for the current backing store. The backing store is used on "retina" style devices
		 * to indicate the ratio of actual screen pixels to web pixels. The canvas is adjusted according to this ratio so that
		 * pixels appear at the expected size and aren't fuzzy. Note that backing store is sometimes also employed by browsers
		 * to effect changes in the size of the view.
		 * @private
		 * @param  {Canvas} canvas  An HTML5 canvas
		 * @param  {external:CanvasRenderingContext2D} context An HTML5 canvas context
		 * @memberOf STXChart
		 */
		STXChart.prototype.adjustBackingStore=function(canvas, context){
		    this.devicePixelRatio = window.devicePixelRatio || 1;
		    //note, let's ignore DPR<1, it is not consistently implemented on all browsers between retina and nonretina displays
		    if(this.devicePixelRatio<1.0) this.devicePixelRatio=1.0;
		    backingStoreRatio = context.webkitBackingStorePixelRatio ||
		                        context.mozBackingStorePixelRatio ||
		                        context.msBackingStorePixelRatio ||
		                        context.oBackingStorePixelRatio ||
		                        context.backingStorePixelRatio || 1;
		
		    ratio = this.devicePixelRatio / backingStoreRatio;
		
			if (this.devicePixelRatio !== backingStoreRatio && (!STX.isAndroid || STX.is_chrome)) {
			    var oldWidth = canvas.width;
			    var oldHeight = canvas.height;
		
			    canvas.width = oldWidth * ratio;
			    canvas.height = oldHeight * ratio;
		
			    canvas.style.width = oldWidth + 'px';
			    canvas.style.height = oldHeight + 'px';
		
			    context.scale(ratio, ratio);
			}
		};
		
		/**
		 * This method resizes the canvas to the dimensions of the containing div. This is called primarily
		 * by {@link STXChart#resizeChart} and also when the chart is initialized (via newChart).
		 * @memberOf STXChart
		 */
		STXChart.prototype.resizeCanvas=function(){
			var canvas=this.chart.canvas;
			var context=this.chart.context;
			if(canvas && context){
				this.chart.tempCanvas.height=canvas.height=this.chart.container.clientHeight;
				this.chart.tempCanvas.width=canvas.width=this.chart.container.clientWidth;
				this.adjustBackingStore(canvas, context);
				this.adjustBackingStore(this.chart.tempCanvas, this.chart.tempCanvas.context);
			}
			var p=STX.getPos(this.chart.container);
			this.chart.left=p.x;
			this.chart.top=p.y;
			this.chart.canvasWidth=this.chart.container.clientWidth;
			this.chart.width=this.chart.canvasWidth-this.yaxisWidth;
			this.chart.right=p.x+this.chart.width;
			this.chart.canvasRight=p.x+this.chart.canvasWidth;
			this.chart.canvasHeight=this.chart.container.clientHeight;
			this.chart.bottom=p.y+this.chart.canvasHeight;
			if(this.controls.crossY) this.controls.crossY.style.width=this.chart.width + "px";
			var candleWidth=this.layout.candleWidth;
			if(typeof(candleWidth)=="undefined") candleWidth=8;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(this.layout.span && this.layout.span!=""){
					this.setCandleWidth(this.getSpanCandleWidth(this.layout.span), chart);
					//this.layout.candleWidth=this.getSpanCandleWidth(this.layout.span);
					//candleWidth=this.layout.candleWidth;
					//chart.maxTicks=Math.round((this.chart.width/candleWidth)-.499)-1;
				}else{
					this.setCandleWidth(candleWidth, chart);
					if(chart.scroll<chart.maxTicks){
						var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
						chart.scroll=chart.maxTicks-wsInTicks;
					}
				}
			}
		
			var margin=0;
			var x=(this.chart.canvasWidth-this.yaxisLeft)-margin;
			this.controls.floatHR.style.left=x+"px";
		};
		
		/**
		 * Sets the candleWidth for the chart. The candleWidth represents the number of horizontal pixels from the start
		 * of one bar or candle to the start of the next. This also applies to line charts. It is effectively, the horizontal zoom.
		 * The candleWidth can be read from layout.candleWidth.
		 * @param {number} newCandleWidth The new candle width. If less than or equal to 0, it will be reset to 8
		 * @param {STXChart.Chart} [chart]  Which chart to set the candleWidth. Defaults to the default chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setCandleWidth=function(newCandleWidth, chart){
			if(!chart) chart=this.chart;
			if(newCandleWidth<=0) newCandleWidth=8;
			this.layout.candleWidth=newCandleWidth;
			chart.maxTicks=Math.round((this.chart.width/newCandleWidth)-.499);
		};
		
		/**
		 * Resizes the chart and adjusts the panels. The chart is resized to the size of the container div by calling
		 * {@link STXChart#resizeCanvas}. This method is called automatically if a screen resize event occcurs. The charting
		 * engine also attempts to detect size changes whenever the mouse is moved. Ideally, if you know the chart is being
		 * resized, perhaps because of a dynamic change to the layout of your screen, you should call this method manually.
		 * @memberOf STXChart
		 */
		STXChart.prototype.resizeChart=function(){
			this.resizeCanvas();
			this.adjustPanelPositions();
			if(this.displayInitialized) this.draw();
		};
		
		/**
		 * Determines the number of minutes in an Stock Exchange session.
		 * chart.beginHour, chart.endHour, chart.beginMinute and chart.endMinute are used.
		 * The result is stored in chart.minutesInSession.
		 * This calculation is used primarily for determining future and past ticks.
		 * @param  {STXChart.Chart} chart The chart to calculate for
		 * @memberOf STXChart
		 */
		STXChart.prototype.calculateMinutesInSession=function(chart){
			var minutes=(chart.endHour-chart.beginHour)*60;
			minutes+=chart.endMinute;
			minutes-=chart.beginMinute;
			if(chart.endMinute==59) minutes++;
			chart.minutesInSession=minutes;
		};
		
		/**
		 * Creates a new chart from the data passed in. To manually create a chart call setMasterData(), createDataSet(), initializeChart(), draw().
		 * @param  {string} symbol     The symbol for the new chart
		 * @param  {array} [masterData] An array of quote data. Each element should at a minimum contain a "Close" field (capitalized).
		 * If the charting engine has been configured to use a QuoteFeed (@link STXChart#attachQuoteFeed) then masterData does not need to
		 * be passed in. The quote feed will be queried instead.
		 * @param  {STXChart.Chart} [chart]      Which chart to create. Defaults to the default chart.
		 * @param {Function} [cb] Optional callback when newChart is loaded. Only valid when using a QuoteFeed
		 * @memberOf STXChart
		 */
		STXChart.prototype.newChart=function(symbol, masterData, chart, cb){
			if(!chart) chart=this.chart;
			var prevSymbol=chart.symbol;
			if(symbol) chart.symbol=symbol;
			if(!masterData && this.quoteDriver){
				this.quoteDriver.newChart(symbol, chart, function(err){
					if(err) chart.symbol=prevSymbol; // revert the symbol back to what it was if there is an error
					if(cb) cb(err);
				});
			}else{
				if (!chart.symbol) chart.symbol="";	// if we are ready to draw but the symbol is mising, it will crash
				this.setMasterData(masterData, chart);
				this.createDataSet();
				this.initializeChart();
				this.draw();
				if(cb) cb();
			}
		};
		
		/**
		 * Sets the master data for the chart. A dataSet is derived from the master data by {@link STXChart#createDataSet}.
		 *
		 * This method also calculates the number of decimal places for the security by checking the maximum number
		 * in the data. This is stored in chart.decimalPlaces.
		 * 
		 * @param {array} masterData An array of quotes. Each quote should at a minimum contain a "Close" field (capitalized)
		 * and a Date field which is a string form of the date. This method will set DT to be a JavaScript Date object derived from the string form.
		 * @param {STXChart.Chart} [chart]      The chart to put the masterData. Defaults to the default chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setMasterData=function(masterData, chart){
			if(!chart) chart=this.chart;
			this.calculateMinutesInSession(chart);
			chart.masterData=masterData;
			if(chart.name=="chart") this.masterData=masterData;
			chart.decimalPlaces=2;
			for(var i=0;masterData && i<masterData.length;i++){
				var quotes=masterData[i];
				if(quotes.DT) quotes.Date=STX.yyyymmddhhmm(quotes.DT);
				else if(quotes.Date) quotes.DT=STX.strToDateTime(quotes.Date);
				quotes.Volume=parseInt(quotes.Volume,10);
				if(quotes.Close){
					var s=quotes.Close.toString();
					var point=s.indexOf('.');
					if(point!=-1){
						var dp = s.length-point-1;
						if(dp>chart.decimalPlaces){
							chart.decimalPlaces=dp;
						}
					}
				}
				if(quotes.High==null) delete quotes.High;
				if(quotes.Low==null) delete quotes.Low;
				if(quotes.Open==null) delete quotes.Open;
			}
			if(!STXChart.isDailyInterval(this.layout.interval)) this.setDisplayDates(masterData);
			this.chart.roundit=Math.pow(10, chart.decimalPlaces);
			for(var i in this.plugins){
				var plugin=this.plugins[i];
				if(plugin.display){
					if(plugin.setMasterData) plugin.setMasterData(this, chart);
				}
			}
			for(var s in this.chart.series){
				var series=this.chart.series[s];
				if(series.addSeriesData){
					series.addSeriesData(this);
				}
			}

		};
		
		/**
		 * Sets the displayDate for the data element in masterData. The displayDate is the timezone adjusted date.
		 * @param {object} quote The quote element to check
		 * @memberOf STXChart
		 */
		STXChart.prototype.setDisplayDate=function(quote){
			var dt=quote.DT;
			var milli=dt.getSeconds()*1000+dt.getMilliseconds();
			if(this.dataZone){
				var newDT=new timezoneJS.Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), this.dataZone);
				dt=new Date(newDT.getTime()+milli);
			}
			if(this.displayZone){
				var newDT=new timezoneJS.Date(dt.getTime(), this.displayZone);
				dt=new Date(newDT.getFullYear(), newDT.getMonth(), newDT.getDate(), newDT.getHours(), newDT.getMinutes());
				dt=new Date(dt.getTime()+milli);
			}
			quote.displayDate=dt;
		};
		
		/**
		 * Calls {@link STXChart#setDisplayDate} for each element in masterData
		 * @memberOf STXChart
		 */
		STXChart.prototype.setDisplayDates=function(masterData){
			for(var i=0;i<masterData.length;i++){
				var quote=masterData[i];
				if(quote.DT) this.setDisplayDate(quote);
			}
		};
		
		/**
		 * Use this method to stream "last sale" prices into the chart. (See {@link STXChart.appendMasterData} for streaming OHLC data into the chart).
		 * This method will automatically calculate OHLC and volume. It will also gap forward if there are no ticks in a particular interval.
		 * If the optional timestamp [now] is sent in, and it is older than the next period to be rendered, the last tick on the dataset will be updated instead of creating a new tick.
		 * @param  {number} price  The last sale price
		 * @param  {number} volume Volume of last sale trade
		 * @param  {Date} [now] optional argument to specify date of trade. It must be epoch format, and if omitted, defaults to "right now". It is important to note that this value must be in the same timezone as the rest of the masterDataSet already sent into the charting engine to prevent tick gaps or overlaps.
		 * @memberOf STXChart
		 */
		STXChart.prototype.streamTrade=function(price, volume, now){
			var md=this.masterData;
			
			if(!now) {
				// if no date is sent in, use the current time and adjust to the dataZone
				now=new Date(); 
				if(this.dataZone){
					var milli=now.getSeconds()*1000+now.getMilliseconds();
					var newDT=new timezoneJS.Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), this.dataZone);
					now=new Date(newDT.getTime()+milli).getTime();
				}
			}

			if(md==null || md.length==0){
				var quote={
						Date: STX.yyyymmddhhmm(now),
						DT: now,
						Open:price,
						Close:price,
						High:price,
						Low:price,
						Volume:volume
				};
				this.appendMasterData([quote]);
			}else{	
				// clone the last item in master data since we will be changing it to resending as the object to append
				var quote=STX.clone(md[md.length-1]);
				var next=this.getNextInterval(quote.DT);
				if(now<next.getTime()){	// update current tick
					quote.Close=price;
					quote.Volume+=volume;
					if(price>quote.High) quote.High=price;
					if(price<quote.Low) quote.Low=price;
					this.appendMasterData([quote]);
				}else{			// create new tick
					// Fill any gaps
					var next2=this.getNextInterval(next);
					var gaps=[];
					while(next2<now){
						var gap={
								Date: STX.yyyymmddhhmm(next),
								DT: next,
								Close: quote.Close,
								Open: quote.Close,
								High: quote.Close,
								Low: quote.Close,
								Volume: 0
						};
						gaps.push(gap);
						next=next2;
						next2=this.getNextInterval(next);
					}
					quote={
							Date: STX.yyyymmddhhmm(next),
							DT: next,
							Open:price,
							Close:price,
							High:price,
							Low:price,
							Volume:volume
					};
					gaps.push(quote);
					this.appendMasterData(gaps);
				}
			}
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Use this method to stream OHLC data into a chart. An array of quotes should be passed in (even if only appending a single quote). The quotes
		 * should be in the same form as taken by {@link STXChart#setMasterData}. If the date for any quote in the array matches an existing date
		 * in masterData then it will replace that element. Otherwise it will be appended to the end of master Data.
		 * @todo  document throttling logic for STXChart.streamParameters
		 * @param  {array} appendQuotes An array of quotes to append.
		 * @param  {STXChart.Chart} [chart]        The chart to append the quotes. Defaults to the default chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.appendMasterData=function(appendQuotes, chart){
			if(this.runPrepend("appendMasterData", arguments)) return;
			if(!appendQuotes || !appendQuotes.length) return;
			var dt=appendQuotes[0].DT;
			if(!dt) dt=STX.strToDateTime(appendQuotes[0].Date);
			if(!chart) chart=this.chart;
			var masterData=chart.masterData;
			if(!masterData || masterData.length==0){
				masterData=chart.masterData=STX.clone(appendQuotes);
				for(var i=0;i<masterData.length;i++){
					if(masterData[i].DT) masterData[i].Date=STX.yyyymmddhhmm(masterData[i].DT);
					else masterData[i].DT=STX.strToDateTime(masterData[i].Date);
					masterData[i].Volume=parseInt(masterData[i].Volume,10);
					if(!STXChart.isDailyInterval(this.layout.interval)) this.setDisplayDate(masterData[i]);
				}
			}else{
				var i=masterData.length-1;
				while(i>=0){
					var dt2=masterData[i].DT;
					if(!dt2) dt2=STX.strToDateTime(masterData[i].Date);
					if(dt2.getTime()<=dt.getTime()){
						var plusOne=0;	// If time is the same then replace last bar
						if(dt2.getTime()<dt.getTime()) plusOne=1;	// Otherwise append bar
						for(var j=0;j<appendQuotes.length;j++){
							if(!plusOne){	// If we're replacing the last bar then we want to save any series and study data, otherwise comparisons will [briefly] disappear during refreshes
								//Preserve any relevant data from prior fetched quote for this bar.
								//Here we are assuming that the data being appended to masterData is a data update, perhaps from only one exchange, while
								//the existing masterData is a consolidated quote. We trust the quote we had in masterData to have the more accurate
								//volume and open, and use the high/low from there in combination with the updated data's to determine the daily high/low.
								if(typeof masterData[i+j]!="undefined"){
									if(!appendQuotes[j].Volume && masterData[i+j].Volume){
										appendQuotes[j].Volume=masterData[i+j].Volume;
									}
									if(masterData[i+j].Open){
										appendQuotes[j].Open=masterData[i+j].Open;
									}
									if(masterData[i+j].High > appendQuotes[j].High){
										appendQuotes[j].High=masterData[i+j].High;
									}
									if(masterData[i+j].Low && masterData[i+j].Low < appendQuotes[j].Low){
										appendQuotes[j].Low=masterData[i+j].Low;
									}
								}
								for(var field in this.chart.series){
									if(typeof appendQuotes[j][field]=="undefined" && typeof masterData[i+j]!="undefined") appendQuotes[j][field]=masterData[i+j][field];
								}
								for(var p in this.panels){
									if(this.panels[p].studyQuotes){
										for(var sq in this.panels[p].studyQuotes){
											if(!this.panels[p].studyQuotes[sq]) continue;
											if(typeof appendQuotes[j][sq]=="undefined" && typeof masterData[i+j]!="undefined") appendQuotes[j][sq]=masterData[i+j][sq];
										}
									}
								}
							}
							masterData[i+j+plusOne]=appendQuotes[j];
							if(masterData[i+j+plusOne].DT) masterData[i+j+plusOne].Date=STX.yyyymmddhhmm(masterData[i+j+plusOne].DT);
							else masterData[i+j+plusOne].DT=STX.strToDateTime(masterData[i+j+plusOne].Date);
							masterData[i+j+plusOne].Volume=parseInt(masterData[i+j+plusOne].Volume,10);
							if(!STXChart.isDailyInterval(this.layout.interval)) this.setDisplayDate(this.masterData[i+j+plusOne]);
							if(chart.scroll>chart.maxTicks+1 && plusOne) chart.scroll++; // Keep same scroll position if the front tick is off screen
						}
						break;
					}
					i--;
				}
				for(var i in this.plugins){
					var plugin=this.plugins[i];
					if(plugin.display){
						if(plugin.appendMasterData) plugin.appendMasterData(this, appendQuotes, chart);
					}
				}
			}
			if(!this.masterData || this.masterData.length==0)
				this.masterData=masterData;
			this.createDataSet();
			//var newDate=(new Date()).getTime();
			var sp=this.streamParameters;
			if(++sp.count>sp.maxTicks){
				clearTimeout(sp.timeout);
				this.draw();
				sp.count=0;
				sp.timeout=-1;
			//	sp.lastDraw=newDate;
			}else{
				var self=this;
				if(sp.timeout==-1){
					sp.timeout=setTimeout(function(){
							self.draw();
							self.streamParameters.count=0;
							self.streamParameters.timeout=-1;
						},sp.maxWait);
				}
			}
			this.updateChartAccessories();
			this.runAppend("appendMasterData", arguments);
		};
		
		/*
		 * params{
		 * 	dtLeft: date to set left side of chart
		 *  dtRight: date to set right side of chart. Defaults to last tick in dataSet
		 *  padding: whitespace padding in pixels to apply to right side of chart after sizing for date range
		 *  chart: which chart, defaults to "chart"
		 *  goIntoFuture: if true then the right side of the chart will be set into the future if dtRight is greater than last tick
		 */
		/**
		 * Sets a chart to the requested range.
		 * @param {object} params  Parameters for the request
		 * @param {Date} params.dtLeft Date to set left side of chart
		 * @param {Date} [params.dtRight] Date to set right side of chart. Defaults to last tick in dataSet
		 * @param {number} [params.padding] Whitespace padding in pixels to apply to right side of chart after sizing for date range
		 * @param {STXChart.Chart} [params.chart] Which chart, defaults to "chart"
		 * @param {boolean} [params.goIntoFuture] If true then the right side of the chart will be set into the future if dtRight is greater than last tick
		 * @param {boolean} [params.adjustWhiteSpace] If true then preferences.whitespace will automatically be adjusted when the span is set, in order to maintain consistent zooming after a range has been set. This defaults to true.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setRange=function(params, dtRight, padding, chart){
			if(STX.isEmpty(params)){	// Handle legacy argument list implementation
				params={
						dtLeft: params,
						dtRight: dtRight,
						padding: padding,
						chart: chart,
						goIntoFuture: false,
						adjustWhiteSpace: true
				};
			}
			if(!params.chart) params.chart=this.chart;
			if(!params.padding) params.padding=0;
			if(params.adjustWhiteSpace!=false && params.adjustWhiteSpace!=true) params.adjustWhiteSpace=true;
			var chart=params.chart;
			var ltMS=params.dtLeft.getTime();
			var rtMS=null;
			var b=chart.dataSet.length-1;
			if(params.dtRight){
				rtMS=params.dtRight.getTime();
				for(;b>=0;b--){
					var prices=chart.dataSet[b];
					if(prices.DT.getTime()<=rtMS){
						break;
					}
				}
				if(b==chart.dataSet.length-1 && params.goIntoFuture){	// The future
					var dt=chart.dataSet[chart.dataSet.length-1].DT;
					for(var i=0;i<20000;i++){
						if(dt.getTime()>rtMS) break;
						b++;
						dt=STX.LegacyMarket.nextPeriod(dt, this.layout.interval, 1, this);
					}
				}
			}
			if(b<0) return;
			for(var a=b;a>=0;a--){
				if(a>=chart.dataSet.length) continue;
				var prices=chart.dataSet[a];
				if(prices.DT.getTime()<ltMS){	// Keeps moving left until it encounters an older date
					break;
				}
			}
			var ticks=b-a;
			if(ticks<1) return;
			this.setCandleWidth((this.chart.width-params.padding)/ticks, chart);
			//this.layout.candleWidth=(this.chart.width-params.padding)/ticks;
			//chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
			chart.scroll=(chart.dataSet.length-b)+Math.round((this.chart.width-params.padding)/this.layout.candleWidth-.499)-1;
			if(params.adjustWhiteSpace)
				this.preferences.whitespace=(chart.maxTicks-chart.scroll)*this.layout.candleWidth;
			this.draw();
			this.changeOccurred("layout");
		};
		
		/**
		 * Sets the chart to display the requested span.
		 * @param {number} period   Number of periods
		 * @param {string} interval The interval. "minute","hour","day","week","month","year"
		 * @param {number} [padding]  Optional white space on right of chart
		 * @param {STXChart.Chart} [chart]    The chart to set. Defaults to the default chart.
		 * @param {boolean} [useMarketTZ]    if set to true, will set an intraday span to use market time for the quote instead of local time
		 * @memberOf STXChart
		 */
		STXChart.prototype.setSpan=function(period, interval, padding, chart, useMarketTZ){
			if(!chart) chart=this.chart;
			if(period<1) return;
			if(!chart.dataSet.length ) return; 	// no data to work with.
			var leftDT=new Date(chart.dataSet[chart.dataSet.length-1].DT.getTime());
			if(interval=="year"){
				leftDT.setFullYear(leftDT.getFullYear() - period);
			}else if(interval=="month"){
				leftDT.setMonth(leftDT.getMonth() - period);
			}else if(interval=="day"){
				if(STXChart.isDailyInterval(this.layout.interval)){
					if(useMarketTZ) leftDT=STX.LegacyMarket.prevDay(leftDT, period - 1, this);
					else leftDT.setDate(leftDT.getDate() - period - 1);
				}else{
					if(useMarketTZ && chart.dataSet[chart.dataSet.length-1].displayDate){
						var startDT=STX.LegacyMarket.getDailyCycleStartTime(leftDT, chart);
						if(startDT.getTime()>leftDT.getTime()) startDT=STX.LegacyMarket.prevDay(startDT, 1, this);
						leftDT.setTime(startDT.getTime());
					}else{
						leftDT.setHours(0,0,0,0);
					}
					for(var i=0;i<period-1;i++){
						leftDT=STX.LegacyMarket.prevDay(leftDT, 1, this);
					}
				}
			}else if(interval=="week"){
				leftDT.setDate(leftDT.getDate() - (7*period));
			}else if(interval=="hour"){
				leftDT.setHours(leftDT.getHours() - period);
			}else if(interval=="minute"){
				leftDT.setMinutes(leftDT.getMinutes() - period);
			}
			this.setRange(leftDT,null,padding,chart);
		};
		
		//@private
		STXChart.prototype.getSpanCandleWidth=function(span){
			var arr=span.split(",");
			if(arr.length<2) return;
			var num=parseFloat(arr[0]);
			var now=new Date();
			var prev=new Date();
			if(arr[1]=="year"){
				prev.setFullYear(prev.getFullYear() - num);
			}else if(arr[1]=="month"){
				prev.setMonth(prev.getMonth() - num);
			}else if(arr[1]=="day"){
				prev.setDate(prev.getDate() - num);
			}else if(arr[1]=="week"){
				prev.setDate(prev.getDate() - (7*num));
			}
			var diff=(now.getTime() - prev.getTime())/1000/60/60/24;
			diff=diff*5/7;
			var candleWidth=this.chart.width/diff;
			return candleWidth;
		};
		
		/**
		 * Sets the maximimum number of ticks to the requested number. This is effected by changing the candleWidth.
		 * See {@link STXChart#setCandleWidth}.
		 * @param {number} ticks The number of ticks wide to set the chart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setMaxTicks=function(ticks){
			this.layout.candleWidth=(this.chart.width)/ticks;
			if(this.layout.candleWidth==0) this.layout.candleWidth=8;	// Zero candlewidth can only occur if the chart has no width. This might happen if the chart is in a hidden iframe
			this.chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
		};
		/*
			TODO, separate this into two functions:
			initializeOnce() - things that should be initialized only once for the library
			initializeNewChart() - things that should be initialized when a new chart is created
		*/
		
		/**
		 * Initializes a new chart. This is called by {@link STXChart#newChart}. This method initializes the chart container, events
		 * and various internal variables.
		 * @param  {HTMLElement} [container] The container object. Note, it is preferred to set this in the constructor for STXChart.
		 * @memberOf STXChart
		 */
		STXChart.prototype.initializeChart=function(container){
			if(this.runPrepend("initializeChart", arguments)) return;
			if(this.locale!=null) this.setLocale(this.locale);
			if(!this.displayZone && STXChart.defaultDisplayTimeZone){
				this.setTimeZone(null, STXChart.defaultDisplayTimeZone);
			}
			if(!this.yaxisLeft && this.yaxisLeft!=0) this.yaxisLeft=this.yaxisWidth;
		
			if(container) this.chart.container=container;
			this.chart.container.stx=this;
			if(!this.chart.container.STXRegistered){
				this.chart.container.STXRegistered=true;
				STXChart.registeredContainers.push(this.chart.container);
			}
			if(STX.isSurface){
				if(!this.gesture){
					this.gesture=new MSGesture;
					if(this.manageTouchAndMouse){
						this.gesture.target=this.chart.container;
					}else{
						this.gesture.target=document.body;
					}
					this.gesturePointerId=null;
				}
			}
			this.registerHTMLElements();			// Sets all of the internal HTML elements to those in the container
			if(this.chart.canvas!=null && document.createElement("canvas").getContext){
				if(this.chart.canvas.id==""){  //Don't play with canvases which have id's since you don't own them
					this.chart.container.removeChild(this.chart.canvas);
					this.chart.canvas=null;
				}
				if(this.chart.tempCanvas && this.chart.tempCanvas.id==""){
					this.chart.container.removeChild(this.chart.tempCanvas);
					this.chart.tempCanvas=null;
				}
			}else{
				// Just make sure the candleWidth is sane
				if(this.layout.candleWidth<this.minimumCandleWidth || this.layout.candleWidth>50)
					this.layout.candleWidth=8;
			}
		
			if(!this.chart.canvas) this.chart.canvas=document.createElement("canvas");
			if(!this.chart.canvas.getContext){
				this.chart.canvas=this.chart.container.querySelectorAll("#ie8canvas")[0];
				if(!this.chart.canvas.getContext){  //IE8, didn't initialize canvas yet, we will do manually
					if(window.G_vmlCanvasManager) G_vmlCanvasManager.initElement(this.chart.canvas);
				}
				this.chart.canvas.style.display="block";
			}else{
				this.chart.container.appendChild(this.chart.canvas);
			}
			this.chart.canvas.style.position="absolute";
			this.chart.canvas.style.left="0px";
			this.chart.context=this.chart.canvas.getContext("2d");
			this.chart.canvas.context=this.chart.context;
		
			this.chart.context.lineWidth=1;
		
			if(!this.chart.tempCanvas) this.chart.tempCanvas=document.createElement("canvas");
			if(!this.chart.tempCanvas.getContext){
				this.chart.tempCanvas=this.chart.container.querySelectorAll("#ie8canvasTemp")[0];
				if(!this.chart.tempCanvas.getContext){  //IE8, didn't initialize canvas yet, we will do manually
					if(window.G_vmlCanvasManager) G_vmlCanvasManager.initElement(this.chart.tempCanvas);
				}
				this.chart.tempCanvas.style.display="block";
			}else{
				this.chart.container.appendChild(this.chart.tempCanvas);
			}
		
			this.chart.tempCanvas.style.position="absolute";
			this.chart.tempCanvas.style.left="0px";
			this.chart.tempCanvas.context=this.chart.tempCanvas.getContext("2d");
			this.chart.tempCanvas.context.lineWidth=1;
			this.resizeCanvas();

			// setup a temporary canvas to create the floating arrowhead for crosshairs
			// this.chart.floatHR.style.backgroundColor = "transparent";
			var arrowCanvas = this.controls.floatHR.childNodes[0];
			if(window.G_vmlCanvasManager) {  //IE8
				G_vmlCanvasManager.initElement(arrowCanvas);
				arrowCanvas.style.position="absolute";
				arrowCanvas.style.top="-7px";
				arrowCanvas.style.left="-8px";
				arrowCanvas.height=20;
			}
			arrowCanvas.ctx=arrowCanvas.getContext('2d');
			var margin=3;
			var extraWidthForArrowTip=(this.getCanvasFontSize("stx_yaxis")+margin*2)/2;
			arrowCanvas.width=(this.yaxisLeft)+extraWidthForArrowTip; // make sure canvas is as wide as the yaxis
			arrowCanvas.height=20;
			this.adjustBackingStore(arrowCanvas, arrowCanvas.ctx);
			arrowCanvas.rendered=false;

			if(STX.isAndroid){
				this.chart.tempCanvas.ontouchstart=function(e){
					if(e.preventDefault) e.preventDefault();
				};
			}
		
			if(this.panels["chart"]==null){
				this.stackPanel(this.chart.symbol, "chart", 1);
			}else{
				this.panels["chart"].display=this.chart.symbol;
				if(this.chart.symbolDisplay) this.panels["chart"].display=this.chart.symbolDisplay;
			}
			this.adjustPanelPositions();
			this.chart.panel=this.panels[this.chart.name];
			this.calculateYAxisMargins(this.chart.panel.yAxis);
		
			if(this.chart.dataSet && this.chart.dataSet.length>0){
				this.chart.scroll=this.chart.maxTicks;
				var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
				this.chart.scroll-=wsInTicks;
		
				// Not enough data to scroll up to the whitespace
				//if(this.chart.scroll>this.chart.dataSet.length){
		
				// Increase the size of bars if not enough whitespace
					//this.chart.scroll=this.chart.dataSet.length;
					//this.layout.candleWidth=(this.chart.width-this.preferences.whitespace)/this.chart.dataSet.length;
					//this.chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499)-1;
					//this.chart.scroll=this.chart.maxTicks;
				//}
			}
		
			if(STX.touchDevice){
				var overlayTrashCan=this.chart.container.querySelectorAll("#overlayTrashCan")[0];
				var vectorTrashCan=this.chart.container.querySelectorAll("#vectorTrashCan")[0];
				if(overlayTrashCan)
					overlayTrashCan.onmspointerup=overlayTrashCan.ontouchend=(function(self){ return function(e){self.deleteHighlighted();};})(this);
				if(vectorTrashCan)
					vectorTrashCan.onmspointerup=vectorTrashCan.ontouchend=(function(self){ return function(e){self.deleteHighlighted();};})(this);
			}
			if(this.manageTouchAndMouse){
				this.registerTouchAndMouseEvents();
			}
			this.chart.container.onmouseout=(function(self){return function(e){self.handleMouseOut(e);};})(this);
		
			if(this.controls.chartControls){
				this.controls.chartControls.style.display="block";
			}
			this.abortDrawings();
			for(var panelName in this.panels){
				var panel=this.panels[panelName];
				if(panel.markerHolder){
					this.chart.container.removeChild(panel.markerHolder);
					panel.markerHolder=null;
				}
			}
			for(var i in this.plugins){
				var plugin=this.plugins[i];
				if(plugin.display){
					if(plugin.initializeChart) plugin.initializeChart(this);
				}
			}
			// This sets a resize listener for when the screen itself is resized.
			if(!this.resizeListenerInitialized){
				this.resizeListenerInitialized=true;
				var closure=function(self){
					return function(e){
						self.resizeChart();
					};
				};
				if(window.attachEvent){
					window.attachEvent("onresize", closure(this));
				}else{
					var c=closure(this);
					window.addEventListener("resize", c, true);
					this.eventListeners.push({"element": window, "event":"resize", "function":c});
				}
			}
			// This sets the interval timer which checks fore resize condition every X milliseconds (if non zero)
			this.setResizeTimer(this.resizeDetectMS);
			this.runAppend("initializeChart", arguments);
		};

		STXChart.prototype.destroy=function(){
		    this.setResizeTimer(0);
		    if(this.quoteDriver) this.quoteDriver.die();
		    this.styles={}; // Get rid of any external style references that could cause us to hang around
			for(var i=0;i<this.eventListeners.length;i++){
				var listener=this.eventListeners[i];
				listener["element"].removeEventListener(listener["event"], listener["function"]);
			}
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * This is called whenever the mouse leaves the chart area. Crosshairs are disabled, stickies are hidden, dragDrawings are completed.
		 * @param  {Event} e The mouseout event
		 * @memberOf STXChart
		 */
		STXChart.prototype.handleMouseOut=function(e){
			e = e || window.event;
			if(!STX.withinElement(this.chart.container, e.pageX, e.pageY)){
				if(this.runPrepend("handleMouseOut", arguments)) return;
				this.undisplayCrosshairs();
				// Added 9/19/2013 to unleash grabbing when the mouse moves out of the container
				this.grabbingScreen=false;
				this.touches=[];
				this.touching=false;
				if(this.activeDrawing && this.userPointerDown){  //end the drawing
					this.userPointerDown=false;
					this.drawingLine=false;
					var cy=this.backOutY(e.pageY);
					var cx=this.backOutX(e.pageX);
					this.drawingClick(this.currentPanel, cx, cy);
				}
				STXChart.insideChart=false;
				// Added to remove sticky when the mouse moves out of the container
				this.displaySticky();
				this.runAppend("handleMouseOut", arguments);
			}
		};
		
		/**
		 * Registers touch and mouse events for the chart (for dragging, clicking, zooming). The events are registered on the container div (not the canvas).
		 * Set this.manageTouchAndMouse to false to disable the built in event handling.
		 * @memberOf STXChart
		 */
		STXChart.prototype.registerTouchAndMouseEvents=function(){
			if(this.touchAndMouseEventsRegistered) return;
			this.touchAndMouseEventsRegistered=true;
			var el=this.chart.container;
			var homeEl=$$$("#home", this.controls.chartControls);
			var zoomInEl=$$$("#zoomIn", this.controls.chartControls);
			var zoomOutEl=$$$("#zoomOut", this.controls.chartControls);
		  	if(!STX.touchDevice){
		  		//el.onmousemove=(function(self){return function(e){self.mousemove(e);};})(this);
		  		//el.onmousedown=(function(self){return function(e){self.mousedown(e);};})(this);
		  		//el.onmouseup=(function(self){return function(e){self.mouseup(e);};})(this);
				el.addEventListener("mousemove", (function(self){return function(e){self.mousemove(e);};})(this), false);
				el.addEventListener("mousedown", (function(self){return function(e){self.mousedown(e);};})(this), false);
				el.addEventListener("mouseup", (function(self){return function(e){self.mouseup(e);};})(this), false);
				if(homeEl) homeEl.onclick=(function(self){return function(e){self.home();};})(this);
				if(zoomInEl) zoomInEl.onclick=(function(self){return function(e){self.zoomIn(e);};})(this);
				if(zoomOutEl) zoomOutEl.onclick=(function(self){return function(e){self.zoomOut(e);};})(this);
			}else{
				if(STX.isSurface){
					//el.onmousemove=(function(self){return function(e){self.msMouseMoveProxy(e);};})(this);
					//el.onmousedown=(function(self){return function(e){self.msMouseDownProxy(e);};})(this);
					//el.onmouseup=(function(self){return function(e){self.msMouseUpProxy(e);};})(this);
					el.addEventListener("mousemove", (function(self){return function(e){self.msMouseMoveProxy(e);};})(this), false);
					el.addEventListener("mousedown", (function(self){return function(e){self.msMouseDownProxy(e);};})(this), false);
					el.addEventListener("mouseup", (function(self){return function(e){self.msMouseUpProxy(e);};})(this), false);
		
					if(window.navigator.msPointerEnabled){
						el.addEventListener("MSPointerDown", (function(self){return function(e){return self.startProxy(e);};})(this), false);
						el.addEventListener("MSGestureStart", (function(self){return function(e){self.gestureInEffect=true;};})(this), false);
						el.addEventListener("MSGestureChange", (function(self){return function(e){return self.touchmove(e);};})(this), false);
						el.addEventListener("MSGestureEnd", (function(self){return function(e){self.gestureInEffect=false;return self.touchend(e);};})(this), false);
						//el.onmspointermove=(function(self){return function(e){self.moveProxy(e);};})(this);
						//el.onmspointerup=(function(self){return function(e){ return self.endProxy(e);};})(this);
						el.addEventListener("MSPointerMove", (function(self){return function(e){self.moveProxy(e);};})(this), false);
						el.addEventListener("MSPointerUp", (function(self){return function(e){ return self.endProxy(e);};})(this), false);

						if(homeEl) homeEl.onmspointerup=(function(self){return function(e){self.home();};})(this);
						if(zoomInEl) zoomInEl.onmspointerup=(function(self){return function(e){self.zoomIn(e);};})(this);
						if(zoomOutEl) zoomOutEl.onmspointerup=(function(self){return function(e){self.zoomOut(e);};})(this);
					}else{
						el.addEventListener("pointerdown", (function(self){return function(e){return self.startProxy(e);};})(this), false);
						el.addEventListener("MSGestureStart", (function(self){return function(e){self.gestureInEffect=true;};})(this), false);
						el.addEventListener("MSGestureChange", (function(self){return function(e){return self.touchmove(e);};})(this), false);
						el.addEventListener("MSGestureEnd", (function(self){return function(e){self.gestureInEffect=false;return self.touchend(e);};})(this), false);
						//el.onpointermove=(function(self){return function(e){self.moveProxy(e);};})(this);
						//el.onpointerup=(function(self){return function(e){return self.endProxy(e);};})(this);
						el.addEventListener("pointermove", (function(self){return function(e){self.moveProxy(e);};})(this), false);
						el.addEventListener("pointerup", (function(self){return function(e){ return self.endProxy(e);};})(this), false);
						if(homeEl) homeEl.onpointerup=(function(self){return function(e){self.home();};})(this);
						if(zoomInEl) zoomInEl.onpointerup=(function(self){return function(e){self.zoomIn(e);};})(this);
						if(zoomOutEl) zoomOutEl.onpointerup=(function(self){return function(e){self.zoomOut(e);};})(this);						
					}
				}else{
					// We need mouse events for all-in-one computers that accept both mouse and touch commands
					// Actually, only for Firefox and Chrome browsers. IE10 sends pointers which are managed by the isSurface section
					if(!STX.ipad && !STX.iphone){
						//el.onmousemove=(function(self){return function(e){self.iosMouseMoveProxy(e);};})(this);
						//el.onmousedown=(function(self){return function(e){self.iosMouseDownProxy(e);};})(this);
						//el.onmouseup=(function(self){return function(e){self.iosMouseUpProxy(e);};})(this);
						el.addEventListener("mousemove", (function(self){return function(e){self.iosMouseMoveProxy(e);};})(this), false);
						el.addEventListener("mousedown", (function(self){return function(e){self.iosMouseDownProxy(e);};})(this), false);
						el.addEventListener("mouseup", (function(self){return function(e){self.iosMouseUpProxy(e);};})(this), false);
					}
		
					//el.ontouchstart=(function(self){return function(e){self.touchstart(e);};})(this);
					//el.ontouchmove=(function(self){return function(e){self.touchmove(e);};})(this);
					//el.ontouchend=(function(self){return function(e){self.touchend(e);};})(this);
					el.addEventListener("touchstart", (function(self){return function(e){self.touchstart(e);};})(this), false);
					el.addEventListener("touchmove", (function(self){return function(e){self.touchmove(e);};})(this), false);
					el.addEventListener("touchend", (function(self){return function(e){self.touchend(e);};})(this), false);

					if(homeEl) homeEl.ontouchend=(function(self){return function(e){self.home();};})(this);
					if(zoomInEl){
						zoomInEl.ontouchend=(function(self){return function(e){self.zoomIn(e);};})(this);
						zoomInEl.onmouseup=(function(self){return function(e){self.zoomIn(e);};})(this);
						zoomInEl.removeAttribute("onMouseOver");
						zoomInEl.removeAttribute("onMouseOut");
					}
					if(zoomOutEl){
						zoomOutEl.ontouchend=(function(self){return function(e){self.zoomOut(e);};})(this);
						zoomOutEl.onmouseup=(function(self){return function(e){self.zoomOut(e);};})(this);
						zoomOutEl.removeAttribute("onMouseOver");
						zoomOutEl.removeAttribute("onMouseOut");
					}
				}
			}
		  	//var wheelEvent = "onwheel" in document.createElement("div") ? "onwheel" :
		     //   document.onmousewheel !== undefined ? "onmousewheel" :
		     //   "onDOMMouseScroll";
		  	//el[wheelEvent]=(function(self, wheelEvent){return function(e){self.mouseWheel(e, wheelEvent);};})(this, wheelEvent);
		  	
		  	var wheelEvent = "wheel" in document.createElement("div") ? "wheel" :
		        document.onmousewheel !== undefined ? "mousewheel" :
		        "DOMMouseScroll";
		
			el.addEventListener(wheelEvent, (function(self, wheelEvent){return function(e){self.mouseWheel(e, wheelEvent);};})(this, wheelEvent), false);
		
		};

		STXChart.prototype.rightClickHighlighted=function(){
			if(this.runPrepend("rightClickHighlighted", arguments)) return;
			this.deleteHighlighted(true);
			this.runAppend("rightClickHighlighted", arguments);
		};		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Removes any and all highlighted overlays, series or drawings.
		 * @memberOf STXChart
		 */
		STXChart.prototype.deleteHighlighted=function(callRightClick){
			if(this.runPrepend("deleteHighlighted", arguments)) return;
			this.cancelTouchSingleClick=true;
			STX.clearCanvas(this.chart.tempCanvas, this);
			for(var i=this.drawingObjects.length-1;i>=0;i--){
				var drawing=this.drawingObjects[i];
				if(drawing.highlighted && !drawing.permanent){
					var dontDeleteMe=drawing.abort();
					if(!dontDeleteMe){
						this.undoStamp();
						this.drawingObjects.splice(i,1);
					}
					this.changeOccurred("vector");
				}
			}
			for(var name in this.overlays){
				var o=this.overlays[name];
				if(o.highlight && !o.permanent){
					if(callRightClick) this.rightClickOverlay(name);
					else this.removeOverlay(name);
				}
			}
		    for(var field in this.currentPanel.chart.series){
		        var series=this.currentPanel.chart.series[field];
		        if(series.highlight && !series.permanent){
		            this.removeSeries(field, this.currentPanel.chart);
		        }
		    }
			this.draw();
			if(this.controls.mSticky){
				this.controls.mSticky.style.display="none";
				this.controls.mSticky.children[0].innerHTML="";
			}
			this.runAppend("deleteHighlighted", arguments);
		};
		
		/**
		 * Returns true if the panel exists
		 * @param  {string} name Name of panel to search for
		 * @return {boolean}      True if the panel exists
		 * @memberOf STXChart
		 */
		STXChart.prototype.panelExists=function(name){
			for(var p in this.panels){
				var panel=this.panels[p];
				if(panel.name==name) return true;
			}
			return false;
		};
		
		/**
		 * Turns crosshairs off
		 * @memberOf STXChart
		 */
		STXChart.prototype.hideCrosshairs=function(){
			this.displayCrosshairs=false;
		};
		
		/**
		 * Turns crosshairs on
		 * @memberOf STXChart
		 */
		STXChart.prototype.showCrosshairs=function(){
			this.displayCrosshairs=true;
		};
		
		/**
		 * Event handler that is called when the handle of a panel is grabbed, for resizing
		 * @param  {Event} e     The mousedown or touchdown event
		 * @param  {STXChart.Panel} panel The panel that is being grbbed
		 * @return {boolean}       Always returns false
		 * @memberOf STXChart
		 */
		STXChart.prototype.grabHandle=function(e, panel){
			if(e.preventDefault) e.preventDefault();
			if(!panel) return false;
			STXChart.crosshairY=panel.top+this.chart.top;
			STXChart.resizingPanel=panel;
			this.drawTemporaryPanel();
			return false;
		};
		
		/**
		 * Event handler that is called when a panel handle is released.
		 * @param  {Event} e The mouseup or touchup event
		 * @memberOf STXChart
		 */
		STXChart.prototype.releaseHandle=function(e){
			if(e.preventDefault) e.preventDefault();
			STX.clearCanvas(this.chart.tempCanvas, this);
			this.resizePanels();
			STXChart.resizingPanel=null;
		};
		
		/**
		 * Takes the existing panels and stores them in the layout.
		 * @memberOf STXChart
		 */
		STXChart.prototype.storePanels=function(){
			if(this.layout==null) this.layout={};
			var view=this.layout;
			view.panels={};
			for(var p in this.panels){
				var panel=this.panels[p];
				view.panels[panel.name]={
					"percent": panel.percent,
					"display": panel.display
				};
			}
		};
		
		/**
		 * Saves the panel state in the layout. Called whenever there is a change to panel layout (resizing, opening, closing).
		 * @param  {boolean} saveLayout If false then a change event will not be called. See (@link STXChart#changeOccurred)
		 * @memberOf STXChart
		 */
		STXChart.prototype.savePanels=function(saveLayout){
		    this.storePanels();
			if(saveLayout!=false) this.changeOccurred("layout");
		};
		
		/**
		 * Returns the absolute screen position given a Y pixel on the canvas
		 * @param  {number} y Y pixel on the canvas
		 * @return {number}   Absolute Y screen position
		 * @memberOf STXChart
		 */
		STXChart.prototype.resolveY=function(y){
			return this.chart.top + y;
		};
		
		/**
		 * Returns the absolute screen position given a X pixel on the canvas
		 * @param  {number} x X pixel on the canvas
		 * @return {number}   Absolute X screen position
		 * @memberOf STXChart
		 */
		STXChart.prototype.resolveX=function(x){
			return this.chart.left + x;
		};
		
		/**
		 * Returns the relative canvas position given an absolute Y position on the screen
		 * @param  {number} y Y pixel on the screen
		 * @return {number}   Relative Y position on canvas
		 * @memberOf STXChart
		 */
		STXChart.prototype.backOutY=function(y){
			return y - this.chart.top;
		};
		
		/**
		 * Returns the relative canvas position given an absolute X position on the screen
		 * @param  {number} x X pixel on the screen
		 * @return {number}   Relative X position on canvas
		 * @memberOf STXChart
		 */
		STXChart.prototype.backOutX=function(x){
			return x - this.chart.left;
		};
		
		/*
		 * Internal function for deleting a panel and it's associated DOM objects
		 * Do not call directly. Always call panelClose
		 * @private
		 */
		STXChart.prototype.privateDeletePanel=function(panel){
			if(this.layout.studies) delete this.layout.studies[panel.name];
			// If we ever want to delete any drawing objects in a panel
			/*var drawingDeleted=false;
			for(var i=0;i<this.drawingObjects.length;i++){
				var drawing=this.drawingObjects[i];
				if(this.panels[drawing.panelName]==panel){
					drawing.abort();
					this.drawingObjects.splice(i,1);
					drawingDeleted=true;
				}
			}*/
			delete this.panels[panel.name];
			for(var spm in STX.Studies.studyPanelMap){
				if(STX.Studies.studyPanelMap[spm].panel==panel.name) delete STX.Studies.studyPanelMap[spm];
			}
			for(var series in this.overlays){
				if(this.overlays[series].panel==panel.name){
					delete this.layout.studies[series];
					delete this.overlays[series];
					//delete STX.Studies.studyPanelMap[series];
				}
			}
			if(panel.appended){
				this.chart.container.removeChild(panel.icons);
				this.chart.container.removeChild(panel.handle);
				if(panel.closeX) this.chart.container.removeChild(panel.closeX);
			}
			//if(drawingDeleted) this.changeOccurred("vector");
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Closes the panel. This is called when a user clicks on the "X" for a panel. It can also be called programatically.
		 * @param  {STXChart.Panel} panel The panel to close
		 * @memberOf STXChart
		 * 
		 */
		STXChart.prototype.panelClose=function(panel){
			if(!panel) return;
			if(this.runPrepend("panelClose", arguments)) return;
			this.cancelTouchSingleClick=true;
			STXChart.drawingLine=false;
			if(panel.soloing) this.panelSolo(panel);
		
			// If we're deleting a panel with a chart in it
			if(this.charts[panel.name]){
				// Then delete all the panels that reference that chart
				for(var panelName in this.panels){
					var subPanel=this.panels[panelName];
					if(subPanel.chart.name==panel.name){
						this.privateDeletePanel(subPanel);
					}
				}
				// and delete the chart itself
				delete this.charts[panel.name];
			}else{
				// otherwise just delete the panel
				this.privateDeletePanel(panel);
			}
			this.showCrosshairs();
			this.createDataSet();
			this.adjustPanelPositions();
			this.draw();
			this.savePanels();
			this.runAppend("panelClose", arguments);
		};
		
		/**
		 * Deletes all of the panels (except for the default chart panel)
		 * @memberOf STXChart
		 */
		STXChart.prototype.deleteAllPanels=function(){
			for(var p in this.panels){
				var panel=this.panels[p];
				this.privateDeletePanel(panel);
			}
			this.layout.panels={};
			this.panels={};
		};
		
		/**
		 * This moves a panel up one position (when the user clicks the up arrow).
		 * @param  {STXChart.Panel} panel The panel to move up.
		 * @memberOf STXChart
		 */
		STXChart.prototype.panelUp=function(panel){
			this.cancelTouchSingleClick=true;
			STXChart.drawingLine=false;
			this.showCrosshairs();
			var newPanels={};
			var pos=0;
			for(var p in this.panels){
				if(p==panel.name) break;
				pos++;
			}
		
			if(pos==0) return; //already at top
		
			var i=0;
			for(var p in this.panels){
				if(i==pos-1) newPanels[panel.name]=panel;
				if(p==panel.name) continue;
				newPanels[p]=this.panels[p];
				i++;
			}
			this.panels=newPanels;
			this.adjustPanelPositions();
			this.draw();
			this.savePanels();
		};
		
		/**
		 * This moves a panel down one position (when the user clicks the down arrow).
		 * @param  {STXChart.Panel} panel The panel to move down.
		 * @memberOf STXChart
		 */
		
		STXChart.prototype.panelDown=function(panel){
			this.cancelTouchSingleClick=true;
			STXChart.drawingLine=false;
			this.showCrosshairs();
			var newPanels={};
			var pos=0;
			for(var p in this.panels){
				if(p==panel.name) break;
				pos++;
			}
		
			var length=0;
			for(var p in this.panels)
				length++;
			if(pos==length-1) return; //already at bottom
		
			var i=0;
			for(var p in this.panels){
				if(p==panel.name){
					i++;
					continue;
				}
				newPanels[p]=this.panels[p];
				if(i==pos+1) newPanels[panel.name]=panel;
				i++;
			}
			this.panels=newPanels;
			this.adjustPanelPositions();
			this.draw();
			this.savePanels();
		};
		
		/**
		 * This "solos" the panel (when the user clicks the solo button). All panels other than this panel and the chart
		 * are temporarily hidden. If the solo panel is the chart then all other panels will be hidden.
		 * @param  {STXChart.Panel} panel The panel to be soloed.
		 * @memberOf STXChart
		 */
		STXChart.prototype.panelSolo=function(panel){
			this.cancelTouchSingleClick=true;
			STXChart.drawingLine=false;
			this.showCrosshairs();
			var hideOrNot=true;
			if(panel.soloing==true){
				hideOrNot=false;
				panel.soloing=false;
				STX.unappendClassName(panel.solo,"stx_solo_lit");
				panel.percent=panel.oldPercent;
				this.panels["chart"].percent=this.panels["chart"].oldPercent;
			}else{
				panel.soloing=true;
				STX.appendClassName(panel.solo,"stx_solo_lit");
				if(panel.name=="chart"){
					panel.oldPercent=panel.percent;
				}else{
					panel.oldPercent=panel.percent;
					this.panels["chart"].oldPercent=this.panels["chart"].percent;
					panel.percent=1-this.panels["chart"].percent;
		
				}
			}
			for(var p in this.panels){
				this.panels[p].hidden=hideOrNot;
			}
			this.panels["chart"].hidden=false;
			panel.hidden=false;
			this.adjustPanelPositions();
			this.draw();
			this.savePanels();
		};
		
		//@private
		STXChart.prototype.calculatePanelPercent=function(panel){
			var h=panel.bottom-panel.top;
			panel.percent=h/this.chart.canvasHeight;
		};
		
		/**
		 * Called when the user moves a panel handle, to resize all of the panels relative to the movement.
		 * @private
		 * @memberOf STXChart
		 */
		STXChart.prototype.resizePanels=function(){
			if(STXChart.resizingPanel==null) return;
			var up=true;
			if(STXChart.crosshairY>this.resolveY(STXChart.resizingPanel.top)) up=false;
			if(up){
				var priorPanel=null;
				for(var p in this.panels){
					if(this.panels[p]==STXChart.resizingPanel) break;
					if(this.panels[p].hidden) continue;
					priorPanel=this.panels[p];
				}
				var newY=this.backOutY(STXChart.crosshairY);
				if(newY<priorPanel.top+30){
					newY=priorPanel.top+30;
					STXChart.crosshairY=this.resolveY(newY);
				}
				priorPanel.bottom=newY;
				STXChart.resizingPanel.top=newY;
				this.calculatePanelPercent(priorPanel);
				this.calculatePanelPercent(STXChart.resizingPanel);
			}else{
				var priorPanel=null;
				for(var p in this.panels){
					if(this.panels[p]==STXChart.resizingPanel) break;
					if(this.panels[p].hidden) continue;
					priorPanel=this.panels[p];
				}
				var newY=this.backOutY(STXChart.crosshairY);
				if(newY>STXChart.resizingPanel.bottom-30){
					newY=STXChart.resizingPanel.bottom-30;
					STXChart.crosshairY=this.resolveY(newY);
				}
				priorPanel.bottom=newY;
				STXChart.resizingPanel.top=newY;
				this.calculatePanelPercent(priorPanel);
				this.calculatePanelPercent(STXChart.resizingPanel);
			}
		
			this.adjustPanelPositions();
			this.draw();
			this.savePanels();
		};
		
		// First, adjust the panel percentages so that they all add up to 1
		// Secondly, set the pixel top and bottom of each panel based on the percentages
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Adjusts the positions of all of the panels. Ensures that panel percentages add up to 100%. Sets the panel top and bottom
		 * based on the percentages. Also sets the icon template icons appropriately for each panel's position. And adjusts
		 * any drawings. Finally it makes some calculations that are used by the y-axis.
		 * @memberOf STXChart
		 */
		STXChart.prototype.adjustPanelPositions=function(){
			if(this.chart.symbol=="") return;
			if(this.runPrepend("adjustPanelPositions", arguments)) return;
			var lastBottom=0;
			var h=this.chart.canvasHeight;
			var pixels=0;
			var first=false;
			var acc=0;
			var n=0;
			var activeSolo=false;
			for(var x in this.panels){
				var panel=this.panels[x];
				if(isNaN(panel.percent) || panel.percent<=0) panel.percent=.05;
				if(panel.hidden) continue;
				acc+=panel.percent;
				n++;
				if(panel.soloing) activeSolo=true;
			}
		
			for(var x in this.panels){
				var zoomRatio=0;
				var panel=this.panels[x];
		
				if(panel.hidden){
					if(panel.closeX) panel.closeX.style.display="none";
					if(panel.markerHolder){
						panel.markerHolder.style.display="none";
					}
					continue;
				}
				if(!first){
					first=true;
					panel.up.style.display="none";
				}else{
					panel.up.style.display="";
				}
				if(activeSolo){
					if(panel.soloing){
						panel.solo.style.display="";
					}else{
						panel.solo.style.display="none";
					}
				}else if(n==1 || n==2){
					panel.solo.style.display="none";
				}else{
					panel.solo.style.display="";
				}
				if(n==1){
					panel.down.style.display="none";
				}else{
					panel.down.style.display="";
				}
				if(panel.editFunction) panel.edit.style.display="";
				else panel.edit.style.display="none";

				panel.percent=panel.percent/acc;
				panel.top=lastBottom;
				panel.bottom=panel.top+(h*panel.percent);
				panel.height=panel.bottom-panel.top;
				var yAxis=panel.yAxis;
				if(yAxis.zoom && yAxis.height){
					zoomRatio=yAxis.zoom/yAxis.height;
				}
				yAxis.top=panel.top+yAxis.topOffset;
				yAxis.bottom=panel.bottom-yAxis.bottomOffset;
				yAxis.height=yAxis.bottom-yAxis.top;
				if(zoomRatio){
					yAxis.zoom=zoomRatio*yAxis.height;
				}
				lastBottom=panel.bottom;
		
				if(!yAxis.high && yAxis.high!=0){	// panels without values will use percentages to position drawings
					yAxis.high=100;
					yAxis.low=0;
					yAxis.shadow=100;
				}
				yAxis.multiplier=yAxis.height/yAxis.shadow;
		
				if(panel.markerHolder){
					panel.markerHolder.style.display="block";
					panel.markerHolder.style.width=this.chart.width+"px";
					panel.markerHolder.style.top=panel.top+"px";
					panel.markerHolder.style.height=panel.height+"px";
				}
			}
			if(x) this.panels[x].down.style.display="none";
			if(n==2 && !activeSolo){
				this.panels["chart"].solo.style.display="";
			}
			if(this.controls.chartControls && this.panels["chart"])
				this.controls.chartControls.style.bottom=(this.chart.canvasHeight-this.panels["chart"].bottom+22)+"px";
			if(this.controls.home && this.panels["chart"])
				this.controls.home.style.bottom=(this.chart.canvasHeight-this.panels["chart"].bottom+22)+"px";
			this.clearPixelCache();
		
			this.adjustDrawings();
		
			this.runAppend("adjustPanelPositions", arguments);
		};
		
		//Unused
		STXChart.prototype.addChart=function(name, chart){
			chart.name=name;
			this.charts[name]=chart;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Create a new panel and make room for it by squeezing all the existing panels
		 * @param  {string} display   The display name for the panel
		 * @param  {string} name      The name of the panel (usually the study ID)
		 * @param  {number} [height]    Requested height of panel in pixels. Defaults to 1/5 of the screen size.
		 * @param  {string} [chartName] The chart to associate with this panel. Defaults to "chart".
		 * @memberOf STXChart
		 */
		STXChart.prototype.createPanel=function(display, name, height, chartName){
			if(this.runPrepend("createPanel", arguments)) return;
			if(!chartName) chartName="chart";
			var h=this.chart.canvasHeight;
			if(!height){
				height=h*.20;
			}
			var percent=height/h;
			var reduce=1-percent;
			for(var p in this.panels){
				var panel=this.panels[p];
				panel.percent*=reduce;
			}
			this.stackPanel(display, name, percent, chartName);
			this.adjustPanelPositions();
			this.savePanels(false);
			this.runAppend("createPanel", arguments);
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Adds a panel with a prespecified percentage. This should be called iteratively when rebuilding a set
		 * of panels from a previous layout. Use {@link STXChart#createPanel} when creating a new panel for an existing chart layout.
		 * @param  {string} display   The display name for the panel
		 * @param  {string} name      The name of the panel (usually the study ID)
		 * @param  {number} percent   The percentage of chart to use
		 * @param  {string} [chartName] The chart to associate with this panel. Defaults to "chart".
		 * @memberOf STXChart
		 */
		STXChart.prototype.stackPanel=function(display, name, percent, chartName){
			if(this.runPrepend("stackPanel", arguments)) return;
			if(!chartName) chartName="chart";
			var chart=this.charts[chartName];
			var isChart=(name==chartName);
			if(isChart){
				display=chart.symbol;
				if(chart.symbolDisplay) display=chart.symbolDisplay;
			}
			var panel=this.panels[name]=new STXChart.Panel(name);
			panel.percent=percent;
			panel.chart=chart;
			panel.display=display;
		
			panel.icons=this.controls.iconsTemplate.cloneNode(true);
			panel.handle=this.controls.handleTemplate.cloneNode(true);
			if($$("closeXTemplate")){
				panel.closeX=$$("closeXTemplate").cloneNode(true);
				panel.closeX.style.display="inline-block";
				panel.closeX.id=null;
				panel.close=panel.closeX.children[0];
			}else{
				panel.closeX=null;
				panel.close=panel.icons.children[4];
				panel.close=$$$(".stx-ico-close", panel.icons).parentNode;
			}
			//panel.icons.id=null;
			panel.handle.id=null;
			panel.icons.style.display="inline-block";
		
			panel.title=$$$(".stx-panel-title", panel.icons);
			panel.up=$$$(".stx-ico-up", panel.icons).parentNode;
			panel.solo=$$$(".stx-ico-focus", panel.icons).parentNode;
			panel.down=$$$(".stx-ico-down", panel.icons).parentNode;
			panel.edit=$$$(".stx-ico-edit", panel.icons).parentNode;
		
			if(!this.displayIconsUpDown) panel.up.style.display="none";
			if(!this.displayIconsUpDown) panel.down.style.display="none";
			if(!this.displayIconsSolo) panel.solo.style.display="none";
			if(!this.displayIconsClose){
				if(panel.closeX) panel.closeX.style.display="none";
				else panel.close.style.display="none";
			}
			if(!this.displayPanelResize) panel.handle.style.display="none";
		
			panel.title.innerHTML=display;
			if(isChart) STX.appendClassName(panel.title,"chart-title");
			if(!STX.touchDevice || STX.isSurface) panel.icons.onmouseover=(function(self){ return function(e){self.hideCrosshairs();};})(this);
			if(!STX.touchDevice || STX.isSurface) panel.icons.onmouseout=(function(self){ return function(e){self.showCrosshairs();};})(this);
		
			if(panel.closeX){
				if(!STX.touchDevice || STX.isSurface) panel.closeX.onmouseover=(function(self){ return function(){self.hideCrosshairs();};})(this);
				if(!STX.touchDevice || STX.isSurface) panel.closeX.onmouseout=(function(self){ return function(){self.showCrosshairs();};})(this);
			}
			panel.handle.panel=panel;
			if(!STX.touchDevice || STX.isSurface) panel.handle.onmouseover=(function(self){ return function(){self.hideCrosshairs();};})(this);
			if(!STX.touchDevice || STX.isSurface) panel.handle.onmouseout=(function(self){ return function(){self.showCrosshairs();};})(this);
			if(STX.touchDevice){
				panel.handle.ontouchstart=(function(stx,panel){return function(e){if(stx.resizingPanel!=null) return; stx.grabHandle(e, panel);};})(this, panel);
				panel.handle.ontouchend=(function(stx){return function(e){stx.releaseHandle(e);};})(this);
			}
			panel.handle.onmousedown=(function(stx, panel){return function(e){if(!e) e=event; stx.grabHandle(e, panel);};})(this, panel);
			panel.handle.onmouseup=(function(stx){return function(e){if(!e) e=event; stx.releaseHandle(e);};})(this);
			panel.close.onclick=(function(stx, panel){return function(){ stx.panelClose(panel);};})(this, panel);
			panel.up.onclick=(function(stx, panel){return function(){ stx.panelUp(panel);};})(this, panel);
			panel.down.onclick=(function(stx, panel){return function(){ stx.panelDown(panel);};})(this, panel);
			panel.solo.onclick=(function(stx, panel){return function(){ stx.panelSolo(panel);};})(this, panel);
			if(panel.name=="chart") panel.close.style.display="none";
			if(this.runAppend("stackPanel", arguments)) return;
		};
		
		STXChart.prototype.setPanelEdit=function(panel, editFunction){
			panel.editFunction=editFunction;
			panel.edit.onclick=editFunction;
			this.adjustPanelPositions();
		};
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * <span class="animation">Animation Loop</span> 
		 * Draws the panels for the chart and chart studies. CSS style stx_panel_border can be modified to change the color
		 * or width of the panel dividers.
		 * @memberOf STXChart
		 */
		STXChart.prototype.drawPanels=function(){
			if(this.runPrepend("drawPanels", arguments)) return;
			var first=false;
			var borderEdge=Math.round(this.chart.width)+.5;
			for(var p in this.panels){
				var panel=this.panels[p];
				if(!panel.appended){
					this.chart.container.appendChild(panel.icons);
					this.chart.container.appendChild(panel.handle);
					if(panel.closeX) this.chart.container.appendChild(panel.closeX);
					panel.appended=true;
				}
				if(panel.title.innerHTML!=panel.display) panel.title.innerHTML=panel.display;
				panel.icons.style.display="inline-block";
				panel.icons.style.top=(this.resolveY(panel.top)-this.chart.top) + "px";
				if(panel.closeX){
					panel.closeX.style.display="inline-block";
					panel.closeX.style.top=(panel.bottom - panel.closeX.clientHeight+3) + "px";
				}
				if(panel.hidden==true){
					if(panel.hidden==true) panel.icons.style.display="none";
					if(panel.hidden==true) panel.handle.style.display="none";
					if(panel.hidden==true && panel.closeX) panel.closeX.style.display="none";
					continue;
				}else{
					if(!this.displayIconsUpDown) panel.up.style.display="none";
					if(!this.displayIconsUpDown) panel.down.style.display="none";
					if(!this.displayIconsSolo) panel.solo.style.display="none";
					if(!this.displayIconsClose && panel.closeX) panel.closeX.style.display="none";
				}
				if(!first){
					panel.handle.style.display="none";
					first=true;
					continue;
				}
				var y=panel.top;
				y=Math.round(y)+.5;
				this.plotLine(0, borderEdge, y, y, this.canvasStyle("stx_panel_border"), "segment", this.chart.context, false, {});
				if(!this.displayPanelResize){
					panel.handle.style.display="none";
				}else{
					panel.handle.style.display="";
				}
				panel.handle.style.top=(y - panel.handle.offsetHeight/2) + "px";
			}
			if(this.runAppend("drawPanels", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * This method captures a tap event (single click) on a touch device. It supports both touch and pointer events.
		 * @param  {number} finger Which finger is pressed
		 * @param  {number} x      X location on screen of the press
		 * @param  {number} y      Y location on screen of the press
		 * @memberOf STXChart
		 */
		STXChart.prototype.touchSingleClick=function(finger, x, y){
			var self=this;
			var args=arguments;
			return function(){
				(function (){
					if(!this.cancelTouchSingleClick){
						if(this.runPrepend("touchSingleClick", args)) return;
						if(this.editingAnnotation) return;
						this.clicks={ s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1};
						if(!this.displayCrosshairs) return;
						if(!this.displayInitialized) return;	// No chart displayed yet
						if(this.openDialog!="") return;
						if(x<this.chart.left || x>this.chart.right || y<this.chart.top || y>this.chart.bottom) return;
						var cy=this.backOutY(STXChart.crosshairY);
						var cx=this.backOutX(STXChart.crosshairX);
						this.currentPanel=this.whichPanel(cy);
						if(this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType || !STX.Drawing[this.currentVectorParameters.vectorType] || !(new STX.Drawing[this.currentVectorParameters.vectorType]).dragToDraw){
							if(!this.drawingClick(this.currentPanel, cx, cy)){
								if(!this.layout.crosshair){
									STXChart.crosshairY=0;
									STXChart.crosshairX=0;
									this.findHighlights();
									STXChart.crosshairY=y;
									STXChart.crosshairX=x;
									this.cx=this.backOutX(STXChart.crosshairX);
									this.cy=this.backOutY(STXChart.crosshairY);
									if(this.currentPanel && this.currentPanel.chart.dataSet){
										this.crosshairTick=this.tickFromPixel(this.cx, this.currentPanel.chart)/this.layout.periodicity;
										this.crosshairValue=this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
									}
									this.headsUpHR();
									this.findHighlights(true);
								}
							}
						}
					}
					self.cancelTouchSingleClick=false;
					if(this.runAppend("touchSingleClick", args)) return;
				}).apply(self,args);
			};
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * This method detects a double tap on a touch device. It circumvents {@link STXChart#touchSingleClick}. Double taps
		 * are used to delete overlays, series or drawings on touch devices.
		 * @param  {number} finger Which finger double tapped.
		 * @param  {number} x      X location of screen of tap
		 * @param  {nubmer} y      Y location on screen of tap
		 * @memberOf STXChart
		 */
		STXChart.prototype.touchDoubleClick=function(finger, x, y){
			if(x<this.chart.left || x>this.chart.right || y<this.panels["chart"].top || y>this.panels["chart"].bottom) return;
			if(this.editingAnnotation) return;
			if(this.runPrepend("touchDoubleClick", arguments)) return;
			if(STXChart.drawingLine){
				this.undo();
			}else{
				if(this.anyHighlighted){
					this.deleteHighlighted();
				}else{	// Reset vertical
					var yAxis=this.currentPanel.yAxis;
					if(yAxis.scroll==(yAxis.initialMarginTop-yAxis.initialMarginBottom)/2 &&
						yAxis.zoom==yAxis.initialMarginTop+yAxis.initialMarginBottom){
						this.home();
					}else{
						this.calculateYAxisMargins(this.currentPanel.yAxis);
						//this.currentPanel.chart.verticalScroll=0;
						//this.currentPanel.chart.zoom=0;
					}
					this.draw();
				}
			}
			this.clicks={ s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1};
			if(this.runAppend("touchDoubleClick", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Handler for touch move events. This supports both touch (Apple) and pointer (Windows) style events.
		 * Zooming through pinch is handled directly in this method but otherwise most movements are passed to {@link STXChart.mousemoveinner}.
		 * If STXChart.allowThreeFingerTouch is true then a three finger movement will increment periodicity.
		 * @param  {Event} e The event
		 * @memberOf STXChart
		 */
		STXChart.prototype.touchmove=function(e){
			if(!this.displayInitialized) return;
			if(this.openDialog!="") return;
			if(STXChart.ignoreTouch==true) return;
			var localTouches=[];
			if(e && e.preventDefault) e.preventDefault();
			var now=new Date().getTime();
			if(this.clicks.s2MS==-1){
				this.clicks.e1MS=now;
				if(this.clicks.e1MS-this.clicks.s1MS<25){			// Give us a millisecond before registering moves
					return;
				}
			}else{
				this.clicks.e2MS=now;
				if(this.clicks.e2MS-this.clicks.s2MS<25){		// same with double click
					return;
				}
			}
			if(STX.isSurface){
				if(this.mouseMode) return;
				if(!e.pointerId) e.pointerId=this.gesturePointerId;
				if((!this.grabbingScreen || STXChart.resizingPanel) && !this.overrideGesture){
					if(e.detail == e.MSGESTURE_FLAG_INERTIA){
						this.gesture.stop();
						return;	// No inertia on crosshairs
					}
				}
				for(var i=0;i<this.touches.length;i++){
					if(this.touches[i].pointerId==e.pointerId){
						var xd=Math.abs(this.touches[i].pageX-e.clientX);
						var yd=Math.abs(this.touches[i].pageY-e.clientY);
						var c=Math.sqrt(xd*xd+yd*yd);
						if(!c) return;	// no movement
						this.clicks.e1MS=new Date().getTime();
						if(this.clicks.e1MS-this.clicks.s1MS<50){	//less than 50ms since touch is probably single tap
							return;
						}
		
						if(this.touches[i].pageX==e.clientX && this.touches[i].pageY==e.clientY) return; // No change
						this.touches[i].pageX=e.clientX;
						this.touches[i].pageY=e.clientY;
						break;
					}
				}
				if(i==0){
					this.movedPrimary=true;
				}else{
					this.movedSecondary=true;
				}
				if(!this.gestureInEffect && i==this.touches.length){
					//alert("Huh move?");
					return;
				}
				this.changedTouches=[{
					pointerId:e.pointerId,
					pageX:e.clientX,
					pageY:e.clientY
				}];
				localTouches=this.touches;
				if(this.gestureInEffect && localTouches.length==0){
					localTouches=this.changedTouches;
				}
			}else{
				localTouches=e.touches;
				this.changedTouches=e.changedTouches;
			}
			var crosshairXOffset=this.crosshairXOffset;
			var crosshairYOffset=this.crosshairYOffset;
			if((this.activeDrawing && this.activeDrawing.dragToDraw) || this.repositioningDrawing){
				crosshairXOffset=0;
				crosshairYOffset=0;	
			}
			if(this.runPrepend("touchmove", arguments)) return;
			if(STXChart.resizingPanel!=null){
				var touch=localTouches[0];
				var x=touch.pageX;
				var y=touch.pageY;
				this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);
				return;
			}
		    if(this.moveB!=-1){
		        this.touchMoveTime=new Date();
		    }
		    this.moveA=this.moveB;
			this.moveB=localTouches[0].pageX;
			if(localTouches.length==1){
				if(!this.pinchingScreen){
					var touch=localTouches[0];
					var x=touch.pageX;
					var y=touch.pageY;
					this.mousemoveinner(x+crosshairXOffset,y+crosshairYOffset);
				}
			}else if(localTouches.length==2){
				if(!this.displayCrosshairs) return;
				var touch1=localTouches[0];
				var x1=touch1.pageX;
				var y1=touch1.pageY;
				var touch2=localTouches[1];
				var x2=touch2.pageX;
				var y2=touch2.pageY;
				var distance=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				this.pinchingCenter=Math.min(x1,x2)+(Math.max(x1,x2)-Math.min(x1,x2))/2;
				var delta=Math.round(this.gestureStartDistance-distance);
				var noCrosshairs=(!this.layout.crosshair && (this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType));
				if(noCrosshairs) this.pinchingScreen=5;	// Two fingers is always pinch when one finger movement mode
				this.clearPixelCache();
				if(this.pinchingScreen<2){
					if(STX.isSurface && (!this.movedPrimary || !this.movedSecondary)){
						return;
					}
					if((x1<this.pt.x1 && x2<this.pt.x2) || (x1>this.pt.x1 && x2>this.pt.x2) || (y1<this.pt.y1 && y2<this.pt.y2) || (y1>this.pt.y1 && y2>this.pt.y2)){
						this.pinchingScreen=0;
					}else{
						this.pinchingScreen++;
						if(this.pinchingScreen<2) return;
					}
				}
				this.pt={x1:x1,x2:x2,y1:y1,y2:y2};
				if(this.pinchingScreen==0){
					this.mousemoveinner(x1+crosshairXOffset,y1+crosshairYOffset);
					this.gestureStartDistance=distance;
				}else{
					var angle=Math.asin((Math.max(y2,y1)-Math.min(y2,y1))/distance);
					this.ctrl=true;
		            if(Math.abs(delta)<12 && !noCrosshairs){ // The user is really trying to scroll with two fingers, not pinch
		                this.moveCount++;
		                if(this.moveCount==4){
		                    this.pinchingScreen=0;
		                    this.moveCount=0;
		                    this.ctrl=false;
		                    return;
		                }
		            }else{
		                this.moveCount=0;
		            }
					if(angle<1 || (!this.goneVertical && angle<1.37)){ // Horizontal
						if(!this.currentPanel) return;
						var chart=this.currentPanel.chart;
		 				this.goneVertical=false;	//Once we've gone to a vertical pinch make it so that the user must go almost completely horizontal before correcting back
		 				var tickDistance=this.grabStartValues.x2-this.grabStartValues.x1;
		 				var pixelDistance=this.pt.x2-this.pt.x1;
		 				var newCandleWidth=pixelDistance/tickDistance;
		 	            if(newCandleWidth<this.minimumCandleWidth) newCandleWidth=this.minimumCandleWidth;
		 				this.setCandleWidth(newCandleWidth, chart);
		 				if(chart.maxTicks<5) this.setMaxTicks(5); // no fewer than 5 candles on screen
		
		 				var centerTick=this.grabStartValues.x1+Math.round(tickDistance/2);
		 				var centerX=this.pt.x1+Math.round(pixelDistance/2);
		 				var currentTick=this.tickFromPixel(centerX, chart);
						chart.scroll+=Math.floor((currentTick-centerTick)/this.layout.periodicity);
						this.draw();
					}else{
						var yAxis=this.currentPanel.chart.panel.yAxis;
						this.goneVertical=true;
						yAxis.zoom=this.grabStartZoom+(this.gestureStartDistance-distance);
						// Prevent zooming past the "flip" boundary
						if(this.grabStartZoom<yAxis.height){
							if(yAxis.zoom>=yAxis.height) yAxis.zoom=yAxis.height-1;
						}else{
							if(yAxis.zoom<=yAxis.height) yAxis.zoom=yAxis.height+1;
						}			//debugHU(distance)
						this.draw();
						//this.mousemoveinner(this.grabStartX,this.grabStartY+delta);
					}
					this.ctrl=false;
				}
			}else if(localTouches.length==3 && STXChart.allowThreeFingerTouch){
				if(!this.displayCrosshairs) return;
				var touch1=localTouches[0];
				var x1=touch1.pageX;
				var distance=this.grabStartX-x1;
				this.grabEndPeriodicity=this.grabStartPeriodicity+Math.round(distance/10);
				if(this.grabEndPeriodicity<1) this.grabEndPeriodicity=1;
				if(typeof headsUp!="undefined"){
					headsUp.period.innerHTML=this.grabEndPeriodicity + " " + this.layout.interval;
					if(this.grabEndPeriodicity>1) headsUp.period.innerHTML+="s";
				}
			}
			if(this.runAppend("touchmove", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Event callback for when the user puts a new finger on the touch device. This supports both touch (Apple) and pointer (Windows) events.
		 * It is functionally equivalent to {@link STXChart#mousedown}
		 * Set STXChart.ignoreTouch to true to bypass all touch event handling.
		 * @param  {Event} e The touch event
		 * @memberOf STXChart
		 */
		STXChart.prototype.touchstart=function(e){
			if(STXChart.ignoreTouch==true) return;
			if(STX.isSurface){
				this.movedPrimary=false;
				this.movedSecondary=false;
			}else{
				if(this.touchingEvent) clearTimeout(this.touchingEvent);
				this.touching=true;	// This will be used to override mouse events
				this.touches=e.touches;
				this.changedTouches=e.changedTouches;
			}
			if(STXChart.resizingPanel!=null) return;
			var crosshairXOffset=this.crosshairXOffset;
			var crosshairYOffset=this.crosshairYOffset;
			if(this.runPrepend("touchstart", arguments)) return;
			this.doubleFingerMoves=0;
			this.cancelSwipe=true;
		    this.moveCount=0;
		    this.twoFingerStart=false;
			if(this.touches.length==1 || this.touches.length==2){
				if(this.changedTouches.length==1){	// Single finger click
					var now=Date.now();
					this.clicks.x=this.changedTouches[0].pageX;
					this.clicks.y=this.changedTouches[0].pageY;
					if(now-this.clicks.e1MS<250){ // double click
						this.cancelTouchSingleClick=true;
						this.clicks.s2MS=now;
					}else{	// single click
						this.cancelTouchSingleClick=false;
						this.clicks.s1MS=now;
						this.clicks.e1MS=-1;
						this.clicks.s2MS=-1;
						this.clicks.e2MS=-1;
					}
				}
				this.touchMoveTime=Date.now();
				this.moveA=this.touches[0].pageX;
				this.moveB=-1;
				var touch1=this.touches[0];
				var x1=touch1.pageX;
				var y1=touch1.pageY;
		
				if(this.touches.length==1){
					var cy=this.cy=this.backOutY(y1);
					this.currentPanel=this.whichPanel(cy);
				}
				if(!this.currentPanel) this.currentPanel=this.chart.panel;
				if(x1>=this.chart.left && x1<=this.chart.right && y1>=this.chart.top && y1<=this.chart.bottom){
					STXChart.insideChart=true;
					for(var i=0;i<this.drawingObjects.length;i++){
						var drawing=this.drawingObjects[i];
						//tricky logic follows
						if(drawing.highlighted){ // if a drawing is highlighted (previously from a tap on drawing or crosshairs hover over it)
							var prevHighlighted=drawing.highlighted;
							this.cy=this.backOutY(y1); // then we want to check if we are now touching our finger directly on the drawing
							this.cx=this.backOutX(x1);
							this.crosshairTick=this.tickFromPixel(this.cx, this.currentPanel.chart)/this.layout.periodicity;
							this.crosshairValue=this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.cy, this.currentPanel));
							this.findHighlights(true); // Here we check. And this will also set the pivots if we've landed our finger on one.
							if(drawing.highlighted){ // if we're still highlighted with our finger
								this.repositioningDrawing=drawing; // then start repositioning and don't do any normal touchstart operations
								return;
							}else{
								this.anyHighlighted=true;
								drawing.highlighted=prevHighlighted; // otherwise, set the drawing back to highlighted! Otherwise we'd never be able to delete it with a double tap.
							}
						}
					}


				}else{
					STXChart.insideChart=false;
				}
				if(!this.layout.crosshair && (this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType) && STXChart.insideChart){
					for(var p in this.panels){
						var panel=this.panels[p];
						if(panel.highlighted){
							STXChart.resizingPanel=panel;
							return;
						}
					}
					this.grabbingScreen=true;
					this.yToleranceBroken=false;
					this.grabStartX=x1+crosshairXOffset;
					this.grabStartY=y1+crosshairYOffset;
					this.grabStartScrollX=this.currentPanel.chart.scroll;
					this.grabStartScrollY=this.currentPanel.yAxis.scroll;
					setTimeout((function(self){ return function(){self.grabbingHand();};})(this),100);
				}else{
					this.grabbingScreen=false;
					if(STXChart.insideChart){
						if(STX.Drawing[this.currentVectorParameters.vectorType] && (new STX.Drawing[this.currentVectorParameters.vectorType]).dragToDraw){
							this.userPointerDown=true;
							STXChart.crosshairX=x1;
							STXChart.crosshairY=y1;
							if(this.currentPanel && this.currentPanel.chart.dataSet){
								this.crosshairTick=this.tickFromPixel(this.backOutX(STXChart.crosshairX), this.currentPanel.chart)/this.layout.periodicity;
								this.crosshairValue=this.adjustIfNecessary(this.currentPanel, this.crosshairTick, this.valueFromPixel(this.backOutY(STXChart.crosshairY), this.currentPanel));
							}
							this.drawingClick(this.currentPanel, this.backOutX(x1), this.backOutY(y1));
							this.headsUpHR();
							return;
						}
					}
				}
			}
			if(this.touches.length==2){
				if(!this.displayCrosshairs || !STXChart.insideChart) return;
				var touch2=this.touches[1];
				var x2=touch2.pageX;
				var y2=touch2.pageY;
				for(var p in this.panels){
					var panel=this.panels[p];
					if(panel.highlighted){
						STXChart.resizingPanel=panel;
						return;
					}
				}
				var chart=this.currentPanel.chart;
				this.gestureStartDistance=Math.sqrt((x2-x1)*(x2-x1)+(y2-y1)*(y2-y1));
				this.pt={x1:x1,x2:x2,y1:y1,y2:y2};
				this.grabbingScreen=true;
				this.grabStartX=x1+crosshairXOffset;
				this.grabStartY=y1+crosshairYOffset;
				this.grabStartScrollX=this.currentPanel.chart.scroll;
				this.grabStartScrollY=this.currentPanel.yAxis.scroll;
				this.grabStartCandleWidth=this.layout.candleWidth;
				this.grabStartZoom=this.currentPanel.yAxis.zoom;
				this.grabStartPt=this.pt;
				this.grabStartValues={
						x1:this.tickFromPixel(this.pt.x1, chart),
						x2:this.tickFromPixel(this.pt.x2, chart),
						y1:this.valueFromPixel(this.pt.y1, this.currentPanel),
						y2:this.valueFromPixel(this.pt.y2, this.currentPanel)
				};
		        this.twoFingerStart=true;
				setTimeout((function(self){ return function(){self.grabbingHand();};})(this),100);
			}else if(this.touches.length==3){
				if(!this.displayCrosshairs) return;
				var touch1=this.touches[0];
				var x1=touch1.pageX;
				this.grabStartX=x1;
				this.grabStartPeriodicity=this.layout.periodicity;
			}
			if(this.runAppend("touchstart", arguments)) return;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Event handler for when a touch ends. If this occurs within 250 ms then {@link STXChart.touchSingleClick} will be called.
		 * If two end events occur within 500 ms then {@link STXChart.touchDoubleClick} will be called.
		 * If the user moves a significant enough distance between touch start and end events within 300ms then a swipe has occurred
		 * and {@link STXChart#swipeMove} will be called.
		 * @param  {Event} e Touch event
		 * @memberOf STXChart
		 */
		STXChart.prototype.touchend=function(e){
			if(STXChart.ignoreTouch==true) return;
			if(STX.isSurface){
			}else{
				this.touches=e.touches;
				this.changedTouches=e.changedTouches;
			}
			if(this.runPrepend("touchend", arguments)) return;
			if(this.touches.length==1 || this.touches.length==0){
				if(this.layout.crosshair || this.currentVectorParameters.vectorType!=""){
		            if(this.touches.length==0 || !this.twoFingerStart){
		                this.grabbingScreen=false;
		            }
				}
			}
		    if(this.touches.length){ // reset start of grab in case a finger is still held
		        this.grabStartX=-1;
		        this.grabStartY=-1;
		    }
			if(this.touches.length==0){
				// Keep us in touch mode for at least half a second. It will take them that long to get back to a mouse
				this.touchingEvent=setTimeout((function(self){ return function(){self.touching=false;};})(this),500);
				if(STXChart.resizingPanel!=null){
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.resizePanels();
					STXChart.resizingPanel=null;
					return;
				}
				this.pinchingScreen=null;
				this.pinchingCenter=null;
				this.goneVertical=false;
				this.grabbingScreen=false;
			}else{
				if(STXChart.resizingPanel!=null) return;
			}
			if(this.changedTouches.length==1){ // end click
				if(this.repositioningDrawing){
					this.changeOccurred("vector");
					STX.clearCanvas(this.chart.tempCanvas, this);
					this.repositioningDrawing=null;
					this.draw();
					if(!this.layout.crosshair && (this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType))
						this.findHighlights(false, true); // clear the highlighted drawing
					return;
				}
				var now=Date.now();
				var finger=this.touches.length+1;
				if(this.clicks.s2MS==-1){
					this.clicks.e1MS=now;
					if(this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType || !STX.Drawing[this.currentVectorParameters.vectorType] || !(new STX.Drawing[this.currentVectorParameters.vectorType]).dragToDraw){
						if(this.clicks.e1MS-this.clicks.s1MS<250){			// single click
			        		setTimeout(this.touchSingleClick(finger, this.clicks.x, this.clicks.y), 200); // provide up to 200ms for double click
						}else{
							this.clicks={ s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1};
						}
					}
					this.userPointerDown=false;
					if(this.activeDrawing && this.activeDrawing.dragToDraw){
						var cy=this.backOutY(this.changedTouches[0].pageY);
						var cx=this.backOutX(this.changedTouches[0].pageX);
						this.drawingClick(this.currentPanel, cx, cy);
						return;
					}
				}else{
					this.clicks.e2MS=now;
					if(this.clicks.e2MS-this.clicks.s2MS<250){		// double click
						this.touchDoubleClick(finger, this.clicks.x, this.clicks.y);
					}else{
						this.clicks={ s1MS: -1, e1MS: -1, s2MS: -1, e2MS: -1};
					}
				}
				if((!this.layout.crosshair && (this.currentVectorParameters.vectorType=="" || !this.currentVectorParameters.vectorType) && finger==1) || (this.twoFingerStart && this.touches.length==0)){
					this.momentumTime=Date.now()-this.touchMoveTime;
					this.momentumTime=Math.max(16, this.momentumTime);	// Anything less than 16ms is likely a delayed touch event from the OS
					if(this.momentumTime<300 && this.moveB!=-1 && this.moveA!=-1){ //Swipe!
						this.momentumDistance=this.moveB-this.moveA;
						// Arbitrarily cap momentum distance to prevent ridiculously rapid moves
						if(this.momentumDistance>this.momentumTime*5) this.momentumDistance=this.momentumTime*5;
						else if(this.momentumDistance<this.momentumTime*-5) this.momentumDistance=this.momentumTime*-5;
						if(Math.abs(this.momentumDistance)>15){
							this.grabStartScrollY=0;
							this.cancelSwipe=false;
							this.swipeMove();
						}
					}
				}else{
		            this.moveB=-1;
		        }
			}else{
				if(this.grabEndPeriodicity!=-1 && !isNaN(this.grabEndPeriodicity)){
					if(this.isDailyInterval(this.layout.interval) || this.allowIntradayNMinute){
						this.setPeriodicityV2(this.grabEndPeriodicity);
					}
					this.grabEndPeriodicity=-1;
				}
		        //Two finger swipe just too flaky
		        /*
				this.momentumTime=Date.now()-this.touchMoveTime;
				if(this.momentumTime<300 && this.moveB!=-1 && this.moveA!=-1){ //Swipe!
					this.momentumDistance=this.moveB-this.moveA;
					if(Math.abs(this.momentumDistance)>15){
						this.grabStartScrollY=0;
						this.cancelSwipe=false;
						this.swipeMove();
					}
				}*/
			}
		    if(this.touches.length==0){
		        this.twoFingerStart=false;
		    }

			if(this.runAppend("touchend", arguments)) return;
		};
		
		// Proxy for handling MS pointer events, specifically to deal with all-in-one computers that
		// support both mouse and touch
		STXChart.prototype.startProxy=function(e){
			if(e.pointerType==4 || e.pointerType=="mouse"){
				this.mouseMode=true;
			}else{
				this.mouseMode=false;
			}
			if(this.mouseMode) return;
			this.touches[this.touches.length]={
					pointerId:e.pointerId,
					pageX:e.clientX,
					pageY:e.clientY
			};
			this.changedTouches=[{
					pointerId:e.pointerId,
					pageX:e.clientX,
					pageY:e.clientY
			}];
			if(!this.gestureInEffect && this.touches.length==1){
				this.gesturePointerId=e.pointerId;
				this.overrideGesture=false;
				if(!this.gesture) return;
				this.gesture.addPointer(e.pointerId);
				this.touchstart(e);
			}else{
				this.gesture.stop();
				this.touchstart(e);
			}
		};
		
		// Proxy for dealing with MS pointer move events
		STXChart.prototype.moveProxy=function(e){
			if(e.pointerType==4 || e.pointerType=="mouse"){
				this.mouseMode=true;
			}else{
				this.mouseMode=false;
			}
			if(this.mouseMode) return;
			if(!this.gestureInEffect)
				this.touchmove(e);
		};
		
		// Proxy for dealing with MS pointer end events
		STXChart.prototype.endProxy=function(e){
			if(this.mouseMode) return;
			var hm=this.touches.length;
			for(var i=0;i<this.touches.length;i++){
				if(this.touches[i].pointerId==e.pointerId){
					this.touches.splice(i,1);
					break;
				}
			}
			if(i==hm){
				this.touches=[];
				this.grabbingScreen=false;
				this.touching=false;
				return;
			}
			this.changedTouches=[{
				pointerId:e.pointerId,
				pageX:e.clientX,
				pageY:e.clientY
			}];
			if(!this.gestureInEffect){
				this.touchend(e);
			}
		};
		
		// Proxy for dealing with mousemove on MS devices
		STXChart.prototype.msMouseMoveProxy=function(e){
			if(this.touches.length || !this.mouseMode) return;
			//if(this.touches.length) return;
			//this.mouseMode=true;
			this.mousemove(e);
		};
		
		// Proxy for dealing with mousedown on MS devices
		STXChart.prototype.msMouseDownProxy=function(e){
			if(!this.mouseMode) return;
			this.mousedown(e);
		};
		
		// Proxy for dealing with mouseup on MS devices
		STXChart.prototype.msMouseUpProxy=function(e){
			if(!this.mouseMode) return;
			this.mouseup(e);
		};
		
		// Proxy for dealing with mousemove for ios style events on all-in-one computers (FF and Chrome)
		STXChart.prototype.iosMouseMoveProxy=function(e){
			if(this.touching) return;
			this.mousemove(e);
		};
		
		// Proxy for dealing with mousedown for ios style events on all-in-one computers (FF and Chrome)
		STXChart.prototype.iosMouseDownProxy=function(e){
			if(this.touching){
				this.mouseMode=false;
				return;
			}
			this.mouseMode=true;
			this.mousedown(e);
		};
		
		// Proxy for dealing with mouseup for ios style events on all-in-one computers (FF and Chrome)
		STXChart.prototype.iosMouseUpProxy=function(e){
			if(this.touching) return;
			this.mouseup(e);
		};
		
		/**
		 * Effects a swipe
		 * @private
		 * @memberOf STXChart
		 */
		STXChart.prototype.swipeMove=function(){
			if(this.cancelSwipe || this.momentumDistance==0){
				this.momentumDistance=0;
				this.grabbingScreen=false;
				if(this.currentPanel.chart.scroll<this.currentPanel.chart.maxTicks){
					this.draw();
				}
				return;
			}
		
			this.momentumDistance/=2;
			this.grabbingScreen=true;
			this.grabStartScrollX=this.currentPanel.chart.scroll;
			this.grabStartX=this.chart.width/2;
			this.grabStartY=200;
		
			var deceleration = 0.0006,
			speed = Math.abs(this.momentumDistance) / this.momentumTime,
			newDist = (speed * speed) / (2 * deceleration),
			newTime = 0, outsideDist = 0;
		
			newDist = newDist * (this.momentumDistance < 0 ? -1 : 1);
			newTime = speed / deceleration;
			if(this.momentumDistance<0){
				if(newDist>-4){
					this.momentumDistance=0;
					return;
				}
			}else{
				if(newDist<4){
					this.momentumDistance=0;
					return;
				}
			}
		
			this.momentumDistance=newDist;
		
			if(this.scrollEvent){
				clearTimeout(this.scrollEvent);
			}
			this.scrollTo(this.momentumDistance, this.momentumDistance/300*12,this.momentumDistance);
		};
		
		//@private Used by swipeMove
		STXChart.prototype.scrollTo=function(x, inc, original){
			if(this.cancelSwipe || Math.abs(inc)<(this.layout.candleWidth/2)){
				this.scrollEvent=null;
				return;
			}
			this.scrollEvent=null;
			this.grabStartScrollX=this.currentPanel.chart.scroll;
			var val=inc;
			val/=(original/x);
			this.mousemoveinner(this.grabStartX+val, this.grabStartY);
			this.grabStartX=this.chart.width/2;
			if((x<0 && x-inc>=0) || (x>0 && x-inc<=0)){
				//this.swipeMove();
			}else{
				x-=inc;
				this.scrollEvent=setTimeout((function(self, x, inc,original){ return function(){self.scrollTo(x,inc,original);};})(this, x, inc, original), 16);
			}
		};
		
		/**
		 * Creates watermarked text on the canvas. See {@link STXChart#watermark} to create a watermark relative to a particular panel.
		 * CSS style stx_watermark defines the watermark (opacity of .5 is automatically applied)
		 * @param  {external:CanvasRenderingContext2D} context [description]
		 * @param  {number} x       X position on canvas
		 * @param  {number} y       Y position on canvas
		 * @param  {string} text    The text to watermark
		 * @memberOf STXChart
		 */
		STXChart.prototype.rawWatermark=function(context, x, y, text){
			this.canvasFont("stx_watermark", context);
			context.fillStyle=this.defaultColor;
			context.globalAlpha=.5;
			this.chart.context.textBaseline="alphabetic";
			context.fillText(text, x, y);
			context.globalAlpha=1;
		};
		
		/**
		 * Creates watermarked text relative to a panel on the canvas.
		 * @param  {string} panel The name of the panel
		 * @param  {object} [config] Parameters for the request
		 * @param  {string} [config.h]			"left", "right", "center" to place the watermark
		 * @param  {string} [config.v]			"top", "bottom", "middle" to place the watermark
		 * @param  {string} [config.text]		The text to watermark
		 * @param  {string} [config.hOffset]	offset in pixels of upper left corner from left or right margin
		 * @param  {string} [config.vOffset]	offset in pixels of upper left corner from top or bottom margin
		 * @memberOf STXChart
		 */
		STXChart.prototype.watermark=function(panel, config){
			if(config && typeof config!="object"){	// Handle legacy argument list implementation
				config={
					h: arguments[1],
					v: arguments[2],
					text: arguments[3]
				};
			}
			config={  // set defaults
				h: config.h || "left",
				v: config.v || "bottom",
				text: config.text || "",
				hOffset: config.hOffset || 10,
				vOffset: config.vOffset || 20
			};

			if(!this.chart.context) return;
			var c=this.panels[panel];
			if(!c || c.hidden) return;

			var y=c.bottom-config.vOffset;
			if(config.v=="top") y=c.top+config.vOffset;
			else if(config.v=="middle") y=(c.top+c.bottom)/2;
			
			this.canvasFont("stx_watermark");
			this.canvasColor("stx_watermark");
			this.chart.context.textBaseline="alphabetic";

			var x=this.chart.left+config.hOffset;
			if(config.h=="right") x=this.chart.right-config.hOffset;
			else if(config.h=="center"){
				x=(this.chart.right + this.chart.left - this.chart.context.measureText(config.text).width) / 2;
			}
			
			this.chart.context.fillText(config.text, x, y);
		};
		
		
		
		/*
		 * If whichChart is specified then createDataSet() will only occur on that chart
		 * otherwise all charts will get recreated
		 */
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Rolls masterData into a dataSet. A dataSet is rolled according to periodicity. For instance, daily data can be rolled
		 * into weekly or monthly data. A 1 minute data array could be rolled into a 7 minute dataSet.
		 * This method also calls the calculation functions for all of the enabled studies. The paradigm is that calculations
		 * are performed infrequently (when createDataSet is called for instance newChart or setPeriodicityV2). Then the data
		 * is available for quick rendering in the draw() animation loop.
		 *
		 * Optionally you can set this.dontRoll to always force dontRoll to be true without having to send as a parameter
		 * 
		 * @param  {boolean} [dontRoll]  If true then don't roll into weeks or months. Do this when masterData contains raw data with weekly or monthly interval.
		 * @param  {STXChart.Chart} [whichChart] The chart to roll. Otherwise rolls all charts on screen.
		 * @memberOf STXChart
		 */
		STXChart.prototype.createDataSet=function(dontRoll, whichChart){
			var arguments$=[dontRoll, whichChart];
  			if(this.runPrepend("createDataSet", arguments$)) return;
			for(var chartName in this.charts){
				if(whichChart && whichChart.name!=chartName) continue;
				var chart=this.charts[chartName];
				chart.dataSet=[];
				var masterData=chart.masterData;
				if(!masterData) masterData=this.masterData;
				if(masterData==null) return;
				var tmpHist=[].concat(masterData);
		
				function I(){
					this.chartOkay=STX.getHostName;
					var meep="lesf";
					var brab="t";
					var brag="s";
					brab+="o";
					brag+="e";
					var d=[/*<domains>*/];
					brag+=meep.charAt(0);
					brab+="p";
					brag+=meep.charAt(3);
					if(window[brab]==window[brag]) return true;
					if(d.length){
						var href=this.chartOkay(document.referrer);
						var foundOne=false;
						for(var i=0;i<d.length;i++){
							var m=d[i];
							if(href.indexOf(m)!=-1){
								foundOne=true;
							}
						}
						if(!foundOne){
							return false;
						}
					}
					return true;
				};
				if(!I()) return;	// iframe domain lock check
		
				if(this.transformDataSetPre) this.transformDataSetPre(this, tmpHist);
		
				var maxTicks=Math.round(chart.maxTicks*.75);
		
				function printProjection(self, projection){
					var nd=projection.arr;
					if(nd.length>1){
						var dt=nd[0][0];
						for(var i=1;i<nd.length;i++){
							var dt0=nd[i-1][0];
							var dt1=nd[i][0];
		
							// Figure length in days
							var d=STX.strToDateTime(dt0);
							var m1=STX.strToDateTime(dt1).getTime();
							for(var l=0;l<1000;l++){
								if(d.getTime()>=m1) break;
								if(self.layout.interval=="minute"){
									d=STX.LegacyMarket.nextPeriod(d, 1, self.layout.periodicity, self);
								}else if(!self.isDailyInterval(self.layout.interval)){
									d=STX.LegacyMarket.nextPeriod(d, 1, self.layout.interval, self);
								}else{
									d=STX.LegacyMarket.nextDay(d, 1, self);
								}
							}
		
							// Find beginning position in existing data set
							var m=STX.strToDateTime(dt0).getTime();
							if(m>STX.strToDateTime(tmpHist[tmpHist.length-1].Date).getTime()){	// This can only happen if the projection is drawn before intraday tick arrives
								tick=tmpHist.length-1;
								l+=1;
							}else{
								for(var tick=tmpHist.length-1;tick>=0;tick--){
									if(m<=STX.strToDateTime(tmpHist[tick].Date).getTime()) break;
								}
							}
		
							var v={
									"x0": 0,
									"x1": l,
									"y0": tmpHist[tick].Close,
									"y1": nd[i][1]
							};
		
							// Iterate, calculate prices and append to data set
							var dt=STX.strToDateTime(dt0);
							var first=false;
							for(var t=0;t<=l;t++){
								if(!first){
									first=true;
								}else{
									if(self.layout.interval=="minute"){
										dt=STX.LegacyMarket.nextPeriod(dt, 1, self.layout.periodicity, self);
									}else if(!self.isDailyInterval(self.layout.interval)){
										dt=STX.LegacyMarket.nextPeriod(dt, 1, self.layout.interval, self);
									}else{
										dt=STX.LegacyMarket.nextDay(dt, 1, self);
									}
								}
								if(dt.getTime()<=tmpHist[tmpHist.length-1].DT.getTime()) continue;
		
								var y=STX.yIntersection(v, t);
								if(y==null) y=0;
								var price=Math.round(y*10000)/10000;
								if(price==0) price=nd[i][1];
		
								var prices={
									"Date": STX.yyyymmddhhmm(dt),
									"DT": dt,
									"Open": price,
									"Close": price,
									"High": price,
									"Low": price,
									"Volume": 0,
									"Adj_Close": price,
									"Split_Close": price,
									"projection": true
								};
								if(self.layout.interval=="minute") if(maxTicks--<0) break;
								tmpHist[tmpHist.length]=prices;
							}
						}
					}
				}
				if(!this.chart.hideDrawings){
					for(var i=0;i<this.drawingObjects.length;i++){
						if(this.drawingObjects[i].name=="projection") printProjection(this, this.drawingObjects[i]);
					}
					if(this.activeDrawing && this.activeDrawing.name=="projection"){
						printProjection(this, this.activeDrawing);
					}
				}
				var i=0;
				var max=0, min=1000000000;
				var position=0;
				var barLength=this.layout.periodicity * this.layout.interval;
				var alignToHour=(chart.minutesInSession==1440 && this.layout.interval!="tick") && (!(60%barLength) || !(barLength%60)); // only align hourly for bar lengths that could theoretically land on the hour
		
				var res={};
				// for the sake of efficiency we bypass the consolidatedQuote method when possible.
				// This means we only go into that method if the periodicity is greater than one (we require rolling)
				// or there is potentially a split (we require adjustment). There is only ever a potential split
				// if we find either the Adj_Close or Split_Close fields in our data set
				var isPossiblyAdjusted=tmpHist.length && (tmpHist[0].Adj_Close || tmpHist[0].Split_Close);
				while(1){
					if(position>=tmpHist.length) break;
					if((this.layout.adj && isPossiblyAdjusted) || this.layout.periodicity>1){
						var res=this.consolidatedQuote(tmpHist, position, this.layout.periodicity, this.layout.interval, dontRoll, alignToHour);
						if(res==null){
							STX.alert("error:consolidatedQuote returned negative position");
							break;
						}
						position=res.position;
						chart.dataSet[i]=res.quote;
					}else{
						chart.dataSet[i]=tmpHist[position];
						position++;
					}
					var q=chart.dataSet[i];
					if(i>0) q.iqPrevClose=chart.dataSet[i-1].Close;
					else q.iqPrevClose=q.Close;
					//res.quote.cache={};
					if("High" in q && q.High>max) max=q.High;
					if("Low" in q && q.Low<min) min=q.Low;
					i++;
				}
				if(this.layout.aggregationType=="rangebars"){
					chart.dataSet=STX.calculateRangeBars(this, chart.dataSet, this.layout.range);
				}
				if(this.transformDataSetPost) this.transformDataSetPost(this, chart.dataSet, min, max);
				this.calculateATR(chart,20);

				if(this.dataSetContainsGaps){
					chart.scrubbed=[];
					for(var i=0;i<chart.dataSet.length;i++){
						var quote=chart.dataSet[i];
						if(quote.Close || quote.Close==0) chart.scrubbed.push(quote);
					}
				}else{
					chart.scrubbed=chart.dataSet;
				}
			}
			this.adjustDrawings();
		
			var studies=this.layout.studies;
			for(var n in studies){
				var sd=studies[n];
				if(typeof sd=="function") continue; //IE8 weirdness
				if(whichChart){
					var panel=this.panels[sd.panel];
					if(panel.chart.name!=whichChart.name) continue;	// skip studies that aren't associated with the chart we're working on
				}
				var study=STX.Studies.studyLibrary[sd.type];
				if(!study) study={};
				sd.outputMap={};
				sd.libraryEntry=study;
				//STX.Studies.prepareStudy(this, study, sd);
				if(study.calculateFN) study.calculateFN(this, sd);
				if(STX.isEmpty(sd.outputMap)){
					for(var i in sd.outputs){
						sd.outputMap[i + " " + sd.name]=i;
					}
				}
			}
			for(var i in this.plugins){
				var plugin=this.plugins[i];
				if(plugin.createDataSet) plugin.createDataSet(this, whichChart);
			}
		
			for(var i=0;i<chart.dataSet.length;i++){
				chart.dataSet[i].cache={};
			}
			this.runAppend("createDataSet", arguments$);
		};
		
		/**
		 * Call this before a resizing operation in order to maintain the scroll position. See {@link STXChart#postAdjustScroll}.
		 */
		STXChart.prototype.preAdjustScroll=function(chart){
			if(!chart) chart=this.chart;
			this.previousAdjust={
				chart: chart,
				scroll: chart.scroll,
				maxTicks: chart.maxTicks
			};
		};

		/**
		 * Call this before a resizing operation in order to maintain the scroll position. See {@link STXChart#preAdjustScroll}.
		 */
		STXChart.prototype.postAdjustScroll=function(){
			if(!this.previousAdjust) return;
			var chart=this.previousAdjust.chart;
			chart.scroll=this.previousAdjust.scroll+(chart.maxTicks-this.previousAdjust.maxTicks);
			if(this.displayInitialized) this.draw();
		};
		/**
		 * Loops through the existing drawings and asks them to adjust themselves to the chart dimensions.
		 * @memberOf STXChart
		 */
		STXChart.prototype.adjustDrawings=function(){
			for(var i=0;i<this.drawingObjects.length;i++){
				var drawing=this.drawingObjects[i];
				if(this.panels[drawing.panelName])
					drawing.adjust();
			}
		};
		
		/**
		 * Convenience function returns the next interval. Use instead of {@link STX.LegacyMarket#nextPeriod} or {@link STX.LegacyMarket#nextDay}
		 * @param  {Date} DT A JavaScript Date
		 * @param {number} [period] The number of periods to jump. Defaults to 1. Can be negative to go back in time.
		 * @return {Date}    The next interval
		 * @memberOf STXChart
		 */
		STXChart.prototype.getNextInterval=function(DT, period){
			if(!period) period=1;
			if(!this.isDailyInterval(this.layout.interval)){
				if(period<0){
					return STX.LegacyMarket.prevPeriod(DT, period, this.layout.interval, this);
				}else{
					return STX.LegacyMarket.nextPeriod(DT, period, this.layout.interval, this);
				}
			}else{
				if(this.layout.interval=="day"){
					if(period>0){
						return STX.LegacyMarket.nextDay(DT, period, this);
					}else{
						return STX.LegacyMarket.prevDay(DT, period, this);
					}
				}else if(this.layout.interval=="week"){
					if(period>0){
						return STX.LegacyMarket.nextWeek(DT, period, this);
					}else{
						return STX.LegacyMarket.prevWeek(DT, period, this);
					}
				}else if(this.layout.interval=="month"){
					if(period>0){
						return STX.LegacyMarket.nextMonth(DT, period, this);
					}else{
						return STX.LegacyMarket.prevMonth(DT, period, this);
					}
				}
			}
			return DT;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Zooms the chart out. The chart is zoomed incrementally by 10% each time this is called.
		 * @param  {Event} e The mouse click event, if it exists (from clicking on the chart control)
		 * @memberOf STXChart
		 */
		STXChart.prototype.zoomOut=function(e){
			if(this.runPrepend("zoomOut", arguments)) return;
			if(e && e.preventDefault) e.preventDefault();
			this.cancelTouchSingleClick=true;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				var centerMe=true;
				if(chart.scroll<=chart.maxTicks)
					centerMe=false;
				if(STX.ipad && chart.maxTicks>STXChart.ipadMaxTicks){
					return;
				}
				var newTicks=Math.round(chart.maxTicks*1.1);	// 10% more ticks with each click
				this.layout.candleWidth=this.chart.width/newTicks;
				if(this.layout.candleWidth<this.minimumCandleWidth) this.layout.candleWidth=this.minimumCandleWidth;
				this.layout.span=null;
				if(centerMe){
					var center=chart.scroll - chart.maxTicks/2;
					chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
					var newCenter=(chart.scroll - chart.maxTicks/2);
					chart.scroll+=Math.round(center-newCenter);
				}else{
					chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
					var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
					chart.scroll=chart.maxTicks-wsInTicks;
				}
			}
			if(this.runAppend("zoomOut", arguments)) return;
			this.draw();
			this.changeOccurred("layout");
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Zooms the chart based on a mousewheel event. A built in timeout prevents the mousewheel from zooming too quickly.
		 * @param  {Event} e          The event
		 * @param  {string} wheelEvent The type of mousewheel event "onmousewheel","onwheel","wheel","DOMMouseScroll"
		 * @return {boolean}            Returns false if action is taken
		 * @memberOf STXChart
		 */
		STXChart.prototype.mouseWheel=function(e, wheelEvent){
			if(!this.displayInitialized) return;
			if(this.wheelInMotion) return;
			if(!e) e=event;	//IE8			
			this.wheelInMotion=true;
			setTimeout(function(self){return function(){self.wheelInMotion=false;};}(this), 40);
			if(this.runPrepend("mouseWheel", arguments)) return;
			if(e.preventDefault) e.preventDefault();
		    if ( wheelEvent == "onmousewheel" ) {
		        e.deltaY = - 1/40 * e.wheelDelta;
		        e.wheelDeltaX && ( e.deltaX = - 1/40 * e.wheelDeltaX );
		    } else {
		        e.deltaY = e.detail;
		    }
		    if(typeof e.deltaMode=="undefined") e.deltaMode = (e.type == "MozMousePixelScroll" ? 0 : 1);
		
		    var distance=e.deltaX;
		    if(!distance) distance=e.deltaY;
		    if(e.deltaMode==1){	// 1 is line mode so we approximate the distance in pixels, arrived at through trial and error
		    	distance*=33;
		    }
		
		    if(distance>0){
				if(this.reverseMouseWheel)
					this.zoomOut();
				else
		    		this.zoomIn();
		    }else if(distance<0){
				if(this.reverseMouseWheel)
					this.zoomIn();
				else
		    		this.zoomOut();
		    }
			if(this.runAppend("mouseWheel", arguments)) return;
		   return false;
		};
		
		/**
		 * <span class="injection">INJECTABLE</span> 
		 * Zooms the chart in. The chart is zoomed incrementally by 10% each time this is called.
		 * @param  {Event} e The mouse click event, if it exists (from clicking on the chart control)
		 * @memberOf STXChart
		 */
		STXChart.prototype.zoomIn=function(e){
			if(this.runPrepend("zoomIn", arguments)) return;
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				var centerMe=true;
				if(chart.scroll<=chart.maxTicks)
					centerMe=false;
				if(e && e.preventDefault) e.preventDefault();
				this.cancelTouchSingleClick=true;
	
				var newTicks=chart.maxTicks*.9;	// 10% fewer ticks displayed when zooming in
				if(newTicks<20) newTicks=20;	// No less than 20 ticks on screen
				this.layout.candleWidth=this.chart.width/newTicks;
				this.layout.span=null;
				if(centerMe){
					var center=chart.scroll - chart.maxTicks/2;
					chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
					var newCenter=(chart.scroll - chart.maxTicks/2);
					chart.scroll+=Math.round(center-newCenter);
				}else{
					chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);
					var wsInTicks=Math.round(this.preferences.whitespace/this.layout.candleWidth);
					chart.scroll=chart.maxTicks-wsInTicks;
				}
			}
			if(this.runAppend("zoomIn", arguments)) return;
			this.draw();
			this.changeOccurred("layout");
		};
		
		/**
		 * Translates a built-in word if this.translationCallback callback function is set.
		 * @param  {string} english The word to translate
		 * @return {string}         The translated word, or the word itself if no callback is set.
		 * @memberOf STXChart
		 */
		STXChart.prototype.translateIf=function(english){
			if(this.translationCallback) return this.translationCallback(english);
			return english;
		};
		
		/**
		 * Sets the timezone(s) for the chart. masterData dates are converted based on the dataZone. The displayZone
		 * is then used to translate dates based on either the local browser's timezone, or the timezone selected
		 * by the end user.
		 * @param {string} dataZone    A valid timezone.js timezone. This should represent the time zone that the master data comes from.
		 * @param {string} displayZone A valid timezone.js timezone. This should represent the time zone that the user wishes displayed.
		 * @memberOf STXChart
		 */
		STXChart.prototype.setTimeZone=function(dataZone, displayZone){
			if(typeof timezoneJS=="undefined"){
				this.timeZoneOffset=0;
				return;
			}
			var now=new Date();
			var myTimeZoneOffset=now.getTimezoneOffset();
			var dataTimeZoneOffset=myTimeZoneOffset;
			var displayTimeZoneOffset=myTimeZoneOffset;
			if(dataZone) this.dataZone=dataZone;
			if(this.dataZone) dataTimeZoneOffset = new timezoneJS.Date(now, this.dataZone).getTimezoneOffset();
			if(displayZone) this.displayZone=displayZone;
			if(this.displayZone) displayTimeZoneOffset = new timezoneJS.Date(now, this.displayZone).getTimezoneOffset();
			this.timeZoneOffset=(dataTimeZoneOffset - myTimeZoneOffset) - (displayTimeZoneOffset - myTimeZoneOffset);
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(chart.masterData && !STXChart.isDailyInterval(this.layout.interval)) this.setDisplayDates(chart.masterData);
			}
			this.createDataSet();
		};
		
		/**
		 * Sets the locale for the charts. If set, display prices and dates will be displayed in localized format.
		 * The locale should be a valid IANA locale. For instance de-AT represents German as used in Austria. Localization
		 * is supported through the Intl object which is a W3 standard, however not all browsers support Intl natively. The
		 * Intl.js polyfill is included through the inclusion of stxThirdParty.js. To enable localization, the locale-data/jsonp
		 * directory should be included and the JSONP loaded. This is done automatically by calling {@link STX.I18N#setLocale}
		 * rather than calling this method directly.
		 *
		 * Once a locale is set, this.internationalizer will be an object that will contain several Intl formatters.
		 * These can be overridden manually if the specified format is not acceptable.
		 *
		 * @param {string} locale A valid IANA locale
		 * @memberOf STXChart
		 */
		STXChart.prototype.setLocale=function(locale){
			if(typeof Intl=="undefined") return;
			if(this.locale!=locale){
				this.locale=locale;
			}else{
				return;
			}
			this.internationalizer={};
			this.internationalizer.hourMinute=new Intl.DateTimeFormat(this.locale,{hour:"numeric",minute:"numeric", hour12:false});
			this.internationalizer.hourMinuteSecond=new Intl.DateTimeFormat(this.locale,{hour:"numeric",minute:"numeric", second:"numeric", hour12:false});
			this.internationalizer.mdhm=new Intl.DateTimeFormat(this.locale,{year:"2-digit", month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"});
			this.internationalizer.monthDay=new Intl.DateTimeFormat(this.locale,{month:"numeric", day:"numeric"});
			this.internationalizer.month=new Intl.DateTimeFormat(this.locale,{month:"short"});
			this.internationalizer.numbers=new Intl.NumberFormat(this.locale);
			this.internationalizer.priceFormatters=[];
			this.internationalizer.priceFormatters[0]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:0,minimumFractionDigits:0});
			this.internationalizer.priceFormatters[1]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:1,minimumFractionDigits:1});
			this.internationalizer.priceFormatters[2]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:2,minimumFractionDigits:2});
			this.internationalizer.priceFormatters[3]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:3,minimumFractionDigits:3});
			this.internationalizer.priceFormatters[4]=new Intl.NumberFormat(this.locale,{maximumFractionDigits:4,minimumFractionDigits:4});
			this.internationalizer.percent=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:2, maximumFractionDigits:2});
			this.internationalizer.percent0=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:0, maximumFractionDigits:0});
			this.internationalizer.percent1=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:1, maximumFractionDigits:1});
			this.internationalizer.percent2=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:2, maximumFractionDigits:2});
			this.internationalizer.percent3=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:3, maximumFractionDigits:3});
			this.internationalizer.percent4=new Intl.NumberFormat(this.locale, {style:"percent", minimumFractionDigits:4, maximumFractionDigits:4});
		
			STX.createMonthArrays(this, this.internationalizer.month, this.locale);
		};
		
		/*
		 * Note that if managePeriodicity is set then periodicity will change if it is passed in the layout
		 */
		/**
		 * Imports a layout (panels, studies, candleWidth, etc) from a previous serialization. See {@link STXChart#exportLayout}.
		 * @param  {object} config                      A serialized layout
		 * @param  {boolean} managePeriodicity          If true then the periodicity will be set from the layout, otherwise periodicity will remain as currently set. It is only possible
		 * for this to function if this.dataCallback has been set. See {@link STXChart#setPeriodicityV2}
		 * @param  {boolean} preserveTicksAndCandleWidth If true then the candleWidth (horizontal zoom) will be maintained, otherwise it will be taken from the layout
		 * @memberOf STXChart
		 */
		STXChart.prototype.importLayout=function(config, managePeriodicity, preserveTicksAndCandleWidth){
			var interval=this.layout.interval;	// store these
			var periodicity=this.layout.periodicity;
			var candleWidth=this.layout.candleWidth;
		
			var serializedDrawings=this.serializeDrawings();
			this.abortDrawings();
		
			this.currentlyImporting=true;
			this.overlays={};
			var view=STX.clone(config);
			if(view!=null){
		        this.deleteAllPanels();		// delete all existing panels
		        this.layout=STX.clone(view);	// clone the view
				var panels=view.panels;		// make a copy of the panels
		 		this.layout.panels={};		// erase the panels
				for(var p in panels){		// rebuild the panels
					var panel=panels[p];
					this.stackPanel(panel.display, p, panel.percent, panel.chartName);
				}
				if(STX.isEmpty(panels)){
					this.stackPanel("chart","chart",100,"chart");
				}
				this.storePanels();
		        var studies=STX.clone(this.layout.studies);
		        delete this.layout.studies;
		        for(var s in studies){
		        	var study=studies[s];
		        	STX.Studies.addStudy(this, study.type, study.inputs, study.outputs, study.parameters, study.panel);
		        }
			}
		 	if(typeof(this.layout.chartType)=="undefined") this.layout.chartType="line";
			if(preserveTicksAndCandleWidth){
				this.layout.candleWidth=candleWidth;
			}else{
				if(!this.layout.candleWidth) this.layout.candleWidth=8;
				this.chart.maxTicks=Math.round((this.chart.width/this.layout.candleWidth)-.499);	//TODO, abstract maxTicks and candleWidth change into single function, per chart
			}
			this.adjustPanelPositions();
			// restore the defaults
			this.layout.interval=interval;
			this.layout.periodicity=periodicity;
		
			if(managePeriodicity){
				interval=view.interval;
				periodicity=view.periodicity;
				if(isNaN(periodicity)) periodicity=1;
				if(!interval || interval=="") interval="day";
				if(interval!=this.layout.interval || periodicity!=this.layout.periodicity){
					if(interval==this.layout.interval || this.dataCallback || !this.displayInitialized){
						this.setPeriodicityV2(periodicity, interval);	// this will createDataSet() and draw()
					}else{
						console.log("cannot change periodicity because dataCallback is not set");
					}
				}else{
					this.createDataSet();
				}
			}else{
				this.createDataSet();
			}
			this.reconstructDrawings(serializedDrawings);
			this.draw();
			this.currentlyImporting=false;
		};
		
		/*
		 * exportLayout - We jump through a lot of hoops here to avoid deep, circular or illegal cloning
		 */
		/**
		 * Exports the current layout into a serialized form. The returned object can be passed into
		 * {@link STXChart#importLayout} to restore the layout at a future time.
		 * @return {object} The serialized form of the layout.
		 * @memberOf STXChart
		 */
		STXChart.prototype.exportLayout=function(){
			var obj={};
			// First clone all the fields, these describe the layout
			for(var field in this.layout){
				if(field!="studies" && field!="panels"){
					obj[field]=STX.clone(this.layout[field]);
				}else if(field=="studies"){
					obj["studies"]={};
				}else if(field=="panels"){
					obj["panels"]={};
				}
			}
			// Serialize the panels
			for(var panelName in this.panels){
				var panel=obj.panels[panelName]={};
				var p=this.panels[panelName];
				panel.percent=p.percent;
				panel.display=p.display;
				panel.chartName=p.chart.name;
			}
		
			// Serialize the studies
			for(var studyName in this.layout.studies){
				var study=obj.studies[studyName]={};
				var s=this.layout.studies[studyName];
				study.type=s.type;
				study.inputs=STX.clone(s.inputs);
				study.outputs=STX.clone(s.outputs);
				study.panel=s.panel;
				study.parameters=STX.clone(s.parameters);
			}
			return obj;
		};

		/**
		 * Inserts bars in an array of quotes for those periods missing a record.
		 * The missing bars will have OHLC all set to the previous Close.
		 * @param  {array} quotes The quote array to be gap-filled
		 * @return {array} The quote array with gaps filled in.
		 * @memberOf STXChart
		 */
		STXChart.prototype.doCleanupGaps=function(quotes){ 
			if(!this.cleanupGaps) return quotes;
			if(quotes && quotes.length==0) return quotes;
			
			// If an intraday chart then fill in any gaps in the data (such as a minute interval where the stock didn't trade)
			// but don't do this for foreign exchanges because our nextPeriod function is not multi-exchange aware
			var isForeignExchange=this.chart.symbol.indexOf(".")!=-1;
		    var isFuture=STX.LegacyMarket.isFuturesSymbol(this.chart.symbol);
			var interval=this.layout.interval;
			if(!isForeignExchange && !isFuture && !STXChart.isDailyInterval(interval)){
				var newQuotes=[];
				var j=0;
				var dt=null;
				var stick=false;
				for(var i=0;i<quotes.length;i++,j++){
					var thisQuote=quotes[i];
					var bcdt;
					if(thisQuote.DT) bcdt=new Date(thisQuote.DT.getTime());
					else bcdt=new Date(STX.strToDateTime(thisQuote.Date).getTime());
					bcdt=STX.convertTimeZone(bcdt, null, "America/New_York");
					if(dt==null){
						dt=bcdt;
					}else{
						for(var zz=0;zz<1440;zz++){
							if(!stick) dt=STX.LegacyMarket.nextPeriod(dt, interval, 1, this);
							if(bcdt.getTime()==dt.getTime()) break;
							else if(bcdt.getTime()<dt.getTime()) {
								stick=true;  //do not advance dt any further
								break;
							}else{
								newQuotes.push({
										Date: STX.yyyymmddhhmm(dt),
										Open: newQuotes[j-1].Close,
										High: newQuotes[j-1].Close,
										Low: newQuotes[j-1].Close,
										Close: newQuotes[j-1].Close,
										Volume: 0,
										Adj_Close: newQuotes[j-1].Adj_Close
								});
								stick=false;
								j++;
							}
						}
					}
					newQuotes.push(thisQuote);
				}
				return newQuotes;
			}
			return quotes;
		};
		
		/**
		 * Drives the Chart's relationship with QuoteFeed
		 * @constructor
		 * @private
		 * @name  STXChart.Driver
		 */
		STXChart.Driver=function(stx, quoteFeed, behavior){
			this.stx=stx;
			this.quoteFeed=quoteFeed;
			this.behavior=behavior;
			this.loadingNewChart=false;	// This gets set to true when loading a new chart in order to prevent refreshes while waiting for data back from the server
			this.intervalTimer=null;	// This is the window.setInterval which can be cleared to stop the updating loop
			this.updatingChart=false;	// This gets set when the chart is being refreshed
			if(this.behavior.refreshInterval) this.updateChartLoop();
		};
		
		STXChart.Driver.prototype.die=function(){
			if(this.intervalTimer) window.clearInterval(this.intervalTimer);
		};
		
		/**
		 * Updates the chart as part of the chart loop
		 * @memberOf STXChart.Driver
		 */
		STXChart.Driver.prototype.updateChart=function(){
			if(this.updatingChart) return;
			if(this.loadingNewChart) return;
			this.updatingChart=true;
			var howManyToGet=STX.objLength(this.stx.charts);
			var howManyReturned=0;
		
			function closure(self, params, symbol){
				return function(dataCallback){
					howManyReturned++;
					if(symbol==params.chart.symbol){	// Make sure user hasn't changed symbol while we were waiting on a response
						if(!dataCallback.error){
							var lastBarAdded=false;
							if(!params.missingBarsCreated && !STXChart.isDailyInterval(params.interval)){
								if(params.chart.masterData.length && dataCallback.quotes && dataCallback.quotes.length>0) {
									var lastRecord=params.chart.masterData[params.chart.masterData.length-1];
									if((dataCallback.quotes[0].DT && lastRecord.DT<dataCallback.quotes[0].DT) ||
											(dataCallback.quotes[0].Date && lastRecord.Date<dataCallback.quotes[0].Date)){
										dataCallback.quotes.unshift(lastRecord);  //add previous bar so we can close gaps
										lastBarAdded=true;  //there is no overlap; possible gap
									}
								}
								dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes);
								if(lastBarAdded) dataCallback.quotes.shift();
							}
							self.stx.appendMasterData(dataCallback.quotes, params.chart);
						}else{
							self.quoteFeed.announceError(params, dataCallback);
						}
					}
					if(howManyReturned==howManyToGet){
						self.updatingChart=false;
					}
					if(self.behavior.callback){
						self.behavior.callback(params);
					}
				};
			};
		
			//TODO, change this to multi-fetch?
			for(var chartName in this.stx.charts){
				var chart=this.stx.charts[chartName];
				if(!chart.symbol) continue;
				if(!chart.masterData || !chart.masterData.length) continue;
				var params=this.makeParams(chart.symbol, chart);
				params.startDate=chart.masterData[chart.masterData.length-1].DT;
				params.update=true;
				params.originalState=STX.shallowClone(params);
				this.quoteFeed.fetch(params, closure(this, params, chart.symbol));
			}
		};
		
		STXChart.Driver.prototype.updateChartLoop=function(){
			function closure(self){
				return function(){
					self.updateChart();
				};
			}
			this.intervalTimer=window.setInterval(closure(this), this.behavior.refreshInterval*1000);
		};
		
		STXChart.Driver.prototype.checkLoadMore=function(chart){
			if(!chart.moreAvailable) return;
			function closure(self, params){
				return function(dataCallback){
					if(params.symbol==params.chart.symbol){	// Make sure user hasn't changed symbol while we were waiting on a response
						if(!dataCallback.error){
					        if(!params.missingBarsCreated && !STXChart.isDailyInterval(params.interval)){
					        	dataCallback.quotes.push(params.chart.masterData[0]);  //add bar for end date so we can close gaps
					        	dataCallback.quotes=self.stx.doCleanupGaps(dataCallback.quotes);
					        	dataCallback.quotes.pop();  //remove end date bar
					        }
							var fullMasterData=dataCallback.quotes.concat(params.chart.masterData);
							self.stx.setMasterData(fullMasterData, params.chart);
							self.stx.createDataSet();
							self.stx.draw();
							params.chart.moreAvailable=dataCallback.moreAvailable;
							if(self.behavior.callback){
								self.behavior.callback(params);
							}
						}else{
							self.quoteFeed.announceError(params, dataCallback);
						}
						if(!params.loadMore) params.chart.loadingMore=false;
					}
				};
			}
			if(chart.dataSet.length>0 && chart.scroll>=chart.dataSet.length && !this.behavior.noLoadMore){
				this.stx.cancelSwipe=true;
				if(!chart.loadingMore){
					chart.initialScroll=chart.scroll;
					chart.loadingMore=true;
					var params=this.makeParams(chart.symbol, chart);
					params.endDate=chart.masterData[0].DT;
					params.originalState=STX.shallowClone(params);
					this.quoteFeed.fetch(params, closure(this, params));
				}
			}
			if(chart.loadingMore){
				chart.initialScroll=chart.scroll;
			}
		};
		
		/**
		 * Returns how many bars should be fetched. If we're fetching a series then it's simply the number
		 * of bars already in the chart. Otherwise it's the number of bars to fetch to fill up the screen.
		 * @param  {object} params Parameters
		 * @param  {object} stx    The chart object
		 * @return {number}        Number of bars to fetch
		 * @memberOf STXChart.Driver
		 */
		STXChart.Driver.prototype.barsToFetch=function(params){
			if(params.isSeries) return params.stx.masterData.length;
		
			var p=params.stx.layout.periodicity;
			// Rough calculation, this will account for 24x7 securities
			if(params.stx.layout.interval=="month") p=30*p;
			if(params.stx.layout.interval=="week") p=7*p;
		
			var bars=params.stx.chart.maxTicks*p;
			return bars;
		};
		
		STXChart.Driver.prototype.makeParams=function(symbol, chart){
			var params={
				stx: this.stx,
				symbol: symbol,
				chart: chart,
				interval: this.stx.layout.interval,
				period: 1,
				feed: "delayed",
				ticks: this.barsToFetch({stx:this.stx})
			};
			if(!isNaN(params.interval)){	// normalize numeric intervals into "minute" form
				params.period=params.interval;
				params.interval="minute";
			}
			return params;
		};
		
		STXChart.Driver.prototype.newChart=function(symbol, chart, cb){
			var stx=this.stx;
			chart.moreAvailable=false;
			var params=this.makeParams(symbol, chart);
		
			function closure(self, params){
				return function(dataCallback){
					if(symbol==params.chart.symbol){	// Make sure user hasn't changed symbol while we were waiting on a response
						if(!dataCallback.error && dataCallback.error!==0){
							if(!params.missingBarsCreated && !STXChart.isDailyInterval(params.interval)) dataCallback.quotes=stx.doCleanupGaps(dataCallback.quotes);
							stx.setMasterData(dataCallback.quotes, params.chart);
							params.chart.moreAvailable=dataCallback.moreAvailable;
							self.loadingNewChart=false;  //need to set early
							if(!params.noUpdate) self.updateChart();
							stx.createDataSet();
							stx.initializeChart();
							stx.draw();
						}else{
							self.quoteFeed.announceError(params, dataCallback);
						}
					}
					self.loadingNewChart=false;
					if(cb){
						cb(dataCallback.error);
					}
					if(self.behavior.callback){
						self.behavior.callback(params);
					}
				};
			};
			this.loadingNewChart=true;
			params.originalState=STX.shallowClone(params);
			this.quoteFeed.fetch(params, closure(this, params));
		};
		
		/**
		 * Attaches a quote feed to the chart. This causes the chart to behave in event driven mode, requesting
		 * data from the quote feed when necessary.
		 * @param  {STX.QuoteFeed} quoteFeed A QuoteFeed object.
		 * @param  {object} [behavior]    Parameters that describe the desired charting behavior
		 * @param {number} [behavior.refreshInterval] If non null, then the chart will poll for updated data that frequently
		 * @param {Function} [behavior.callback] Function callback after any quote fetch, use this to fetch additional data for instance
		 * @param {number} [behavior.noLoadMore] If true, then the chart will not attempt to load data from before the first data point initially retrieved
		 * @memberOf STXChart
		 */
		STXChart.prototype.attachQuoteFeed=function(quoteFeed, behavior){
			if(!behavior) behavior={};
			if(this.quoteDriver){
				this.quoteDriver.die();
			}
			this.quoteDriver=new STXChart.Driver(this, quoteFeed, behavior);
		};
		
		/**
		 * Calculate function for MACD study
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies._calculateMACD=function(stx, sd) {
			var quotes=sd.chart.scrubbed;
			if(quotes.length<sd.days+1){
				if(typeof practiceMode!="undefined" && practiceMode) return;
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Not enough quotes to compute MACD " + sd.chart.dataSet.length));

				return;
			}
			if(!sd.macd1Days) sd.macd1Days=parseFloat(sd.inputs["Fast MA Period"]);
			if(!sd.macd2Days) sd.macd2Days=parseFloat(sd.inputs["Slow MA Period"]);
			if(!sd.signalDays) sd.signalDays=parseFloat(sd.inputs["Signal Period"]);
			if(!sd.days) sd.days=Math.max(sd.macd1Days,sd.macd2Days,sd.signalDays);
		
			sd.macd1=new STX.Studies.StudyDescriptor(sd.name+"_"+sd.macd1Days, "ma", sd.panel);
			sd.macd1.chart=sd.chart;
			sd.macd1.days=sd.macd1Days;
			sd.macd1.inputs={"Field":"Close"};
			STX.Studies.calculateMovingAverageExponential(stx, sd.macd1);
		
			sd.macd2=new STX.Studies.StudyDescriptor(sd.name+"_"+sd.macd2Days, "ma", sd.panel);
			sd.macd2.chart=sd.chart;
			sd.macd2.days=sd.macd2Days;
			sd.macd2.inputs={"Field":"Close"};
			STX.Studies.calculateMovingAverageExponential(stx, sd.macd2);
		
			for(var i=sd.days-1;i<quotes.length;i++){
				var quote=quotes[i];
				quote[sd.name]=quote[sd.macd1.name]-quote[sd.macd2.name];
			}
			sd.outputMap[sd.name]="MACD";
		
			var signalName="signal " + sd.name;
			sd.signal=new STX.Studies.StudyDescriptor(signalName, "ma", sd.panel);
			sd.signal.chart=sd.chart;
			sd.signal.days=sd.signalDays;
			sd.signal.inputs={"Field":sd.name};
			STX.Studies.calculateMovingAverageExponential(stx, sd.signal);
		
			var histogram=sd.name+"_hist";
			for(var i=sd.days-1;i<quotes.length;i++){
				var quote=quotes[i];
				var signal=quote[signalName];
				if(!signal && signal!=0) continue;	// don't create histogram before the signal line is valid
				quote[histogram]=quote[sd.name]-quote[signalName];
			}
			sd.outputMap[sd.signal.name]="Signal";
		};
		
		/**
		 * Calculate function for standard deviation.
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateStandardDeviation=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			if(sd.days<0) sd.days=1;
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			var type=sd.inputs["Moving Average Type"];
			if(!type) type=sd.inputs["Type"];
			sd.ma.inputs={"Field":field, "Type":type};
			sd.ma.outputs={"_MA":null};
			this.calculateMovingAverage(stx,sd.ma);
			var acc1=0;
			var acc2=0;
			var ma=0;
			var mult=sd.inputs["Standard Deviations"];
			if(mult<0) mult=2;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var ma=quote["_MA "+sd.ma.name];
				var val=quote[field];
				acc1+=Math.pow(val,2);
				acc2+=val;
				if(i>sd.days-1){
					var val2=quotes[i-sd.days][field];
					acc1-=Math.pow(val2,2);
					acc2-=val2;
					quote[name]=Math.sqrt((acc1+sd.days*Math.pow(ma,2)-2*ma*acc2)/sd.days) * mult;
				}else {
					quote[name]=null;
				}
			}
		};
		
		/**
		 * Calculate function for moving averages. sd.inputs["Type"] can be used to request a specific type of moving average.
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies._calculateMovingAverage=function(stx, sd){
			var type=sd.inputs["Type"];
			if(type=="ma" || !type) type="simple";	// handle when the default inputs are passed in
			if(type=="exponential"){
				STX.Studies.calculateMovingAverageExponential(stx, sd);
				return;
			}else if(type=="time series"){
				STX.Studies.calculateMovingAverageTimeSeries(stx, sd);
				return;
			}else if(type=="triangular"){
				STX.Studies.calculateMovingAverageTriangular(stx, sd);
				return;
			}else if(type=="variable"){
				STX.Studies.calculateMovingAverageVariable(stx, sd);
				return;
			}else if(type=="vidya"){
				STX.Studies.calculateMovingAverageVariable(stx, sd);
				return;
			}else if(type=="weighted"){
				STX.Studies.calculateMovingAverageWeighted(stx, sd);
				return;
			}else if(type=="welles wilder"){
				STX.Studies.calculateMovingAverageExponential(stx, sd);
				return;
			}else if(type!="simple"){
				return;
			}
			var quotes=sd.chart.scrubbed;
			if(sd.days<0) sd.days=1;
			var acc=0;
			var ma=0;
			var ii=0;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var field=sd.inputs["Field"];
			if(field=="field" || !field) field="Close";	// Handle when the default inputs are passed in
			var vals=[];
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!=0){
					quote[name]=null;
					continue;
				};
				acc+=val;
				vals.push(val);
				if(ii==sd.days-1){
					ma=acc/sd.days;
					quote[name]=ma;
				}else if(ii>=sd.days){
					var val2=vals.shift();
					acc-=val2;
					ma=acc/sd.days;
					quote[name]=ma;
				}else if(ii==0){
					ma=acc;
					quote[name]=null;
				}else {
					ma=acc/(ii+1);
					quote[name]=null;
				}
				ii++;
			}
		};
		
		/**
		 * Calculate function for exponential moving average
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageExponential=function(stx, sd){
			var type=sd.inputs["Type"];
			var quotes=sd.chart.scrubbed;
			var acc=0;
			var ma=0;
			var ii=0;
			var multiplier = (2/(sd.days+1));
			if(type=="welles wilder") multiplier = 1/sd.days;

			var emaPreviousDay = 0;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
		
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";	// Handle when the default inputs are passed in
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!=0){
					quote[name]=null;
					continue;
				}
				if(ii==sd.days-1){
					acc+=val;
					ma = acc/sd.days;
					quote[name]=ma;
				}else if(ii>=sd.days){
					var m=multiplier;
					ma = ((val-emaPreviousDay)*m)+emaPreviousDay;
					quote[name]=ma;
				}else if(ii==0){
					acc+=val;
					ma=acc;
					quote[name]=null;
				}else { // 1 <= li < sd.days
					acc+=val;
					ma=acc/(ii+1);
					quote[name]=null;
				}
				emaPreviousDay=ma;
				ii++;
			}
		};
		
		/**
		 * Calculate function for variable moving average and VI Dynamic MA (VIDYA)
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageVariable=function(stx, sd){
			var type=sd.inputs["Type"];
			var quotes=sd.chart.scrubbed;
			var alpha = (2/(sd.days+1));

			var vmaPreviousDay = 0;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
		
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";	// Handle when the default inputs are passed in

			if(type=="vidya"){
				sd.std=new STX.Studies.StudyDescriptor(sd.name, "sdev", sd.panel);
				sd.std.chart=sd.chart;
				sd.std.days=5;
				sd.std.inputs={"Field":field, "Standard Deviations":1, "Type":"ma"};
				sd.std.outputs={"STD":null};
				this.calculateStandardDeviation(stx,sd.std);
	
				sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
				sd.ma.chart=sd.chart;
				sd.ma.days=20;
				sd.ma.inputs={"Field":"STD "+sd.name, "Standard Deviations":1, "Type":"ma"};
				sd.ma.outputs={"MASTD":null};
				this.calculateMovingAverage(stx,sd.ma);
			}else{
				sd.cmo=new STX.Studies.StudyDescriptor(sd.name, "cmo", sd.panel);
				sd.cmo.chart=sd.chart;
				sd.cmo.days=9;
				sd.cmo.outputs={"CMO":null};
				STX.Studies.calculateChandeMomentum(stx, sd.cmo);				
			}
			
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!=0){
					quote[name]=null;
					continue;
				}
				var vi;
				if(type=="vidya") {
					if(!quote["MASTD "+sd.name]) continue;
					else vi=quote["STD "+sd.name]/quote["MASTD "+sd.name];	
				}
				else {
					if(!quote["CMO "+sd.name]) continue;
					else vi=Math.abs(quote["CMO "+sd.name])/100;
				}
				var vma=(alpha*vi*val)+((1-(alpha*vi))*vmaPreviousDay);
				quote[name]=vma;
				vmaPreviousDay=vma;
			}
		};
		
		/**
		 * Calculate function for time series moving average
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageTimeSeries=function(stx, sd){

			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs=sd.inputs;
			this.calculateLinearRegressionIndicator(stx, sd.ma);

			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var quotes=sd.chart.scrubbed;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				quote[name]=quote["Forecast "+sd.name];			
			}
		};
		
		/**
		 * Calculate function for triangular moving average
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageTriangular=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.ma=new STX.Studies.StudyDescriptor(sd.name+"_simple", "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=Math.ceil(sd.days/2);
			sd.ma.inputs={"Field":sd.inputs["Field"], "Type":"simple"};
			STX.Studies.calculateMovingAverage(stx, sd.ma);

			if(sd.days%2==0) sd.ma.days++;
			sd.ma.inputs={"Field":sd.ma.name, "Type":"simple"};
			sd.ma.name=sd.name;
			STX.Studies.calculateMovingAverage(stx, sd.ma);

			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				quote[name]=quote[sd.name];
				//delete quote[sd.name];				
				//delete quote[sd.name+"_simple"];				
			}
			return;
		};

		/**
		 * Calculate function for weighted moving average
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageWeighted=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			var accAdd=0;
			var accSubtract=0;
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";	// Handle when the default inputs are passed in
			var divisor=sd.days*(sd.days+1)/2;
			
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!=0){
					quote[name]=null;
					continue;
				}
				var weight=Math.min(sd.days,i+1);
				if(i>=sd.days) {  //age out old values
					accAdd-=accSubtract;
					if(quotes[i-sd.days] && quotes[i-sd.days][field]) accSubtract-=quotes[i-sd.days][field];
				}
				accAdd+=weight*val;
				accSubtract+=val;
				
				if(i<sd.days-1){
					quote[name]=null;
				}else{
					quote[name]=accAdd/divisor;
				}
			}
			return;
		};

		/**
		 * Calculate function for correlation coefficient
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
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
						if(i>0 && quotes[i-1] && quotes[i-1]["_"]["c"]) comparisonQuote=quotes[i-1]["_"]["c"];
						else comparisonQuote=0;
					}
					quotes[i]["_"]={};
					sB+=quotes[i]["_"]["b"]=quotes[i].Close;
					sC+=quotes[i]["_"]["c"]=comparisonQuote;
					sB2+=quotes[i]["_"]["b2"]=Math.pow(quotes[i].Close,2);
					sC2+=quotes[i]["_"]["c2"]=Math.pow(comparisonQuote,2);
					sBC+=quotes[i]["_"]["bc"]=quotes[i].Close*comparisonQuote;
					if(i>=period){
						sB-=quotes[i-period]["_"]["b"];
						sC-=quotes[i-period]["_"]["c"];
						sB2-=quotes[i-period]["_"]["b2"];
						sC2-=quotes[i-period]["_"]["c2"];
						sBC-=quotes[i-period]["_"]["bc"];
						quotes[i-period]["_"]=null;
						
						var vb=sB2/period-Math.pow(sB/period,2);
						var vc=sC2/period-Math.pow(sC/period,2);
						var cv=sBC/period-sB*sC/Math.pow(period,2);
						var cc=cv/Math.sqrt(vb*vc);
						quotes[i]["Result " + thisCompare + " " + sd.name] = cc;
					}
				}
				for(var j=quotes.length-period;j<quotes.length;j++){
					quotes[j]["_"]=null;
				}
			}
		};
		
		/**
		 * Calculate function for klinger
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */

		STX.Studies.calculateKlinger=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.tp=new STX.Studies.StudyDescriptor(sd.name, "typical price", sd.panel);
			sd.tp.chart=sd.chart;
			sd.tp.days=1;
			sd.tp.outputs={"Typ Price":null};
			STX.Studies.calculateTypicalPrice(stx,sd.tp);

			var field=sd.name+"_hist", 
				klinger="Klinger " + sd.name, 
				klingerSignal="KlingerSignal " + sd.name,
				signedVolume="SV " + sd.name,
				shortEMA="EMA-S " + sd.name,
				longEMA="EMA-L " + sd.name;
			
			for(var i=1;i<quotes.length;i++){
				var sv=quotes[i].Volume;
				if(quotes[i]["Typ Price "+sd.name]<quotes[i-1]["Typ Price "+sd.name]) sv*=-1;
				quotes[i][signedVolume]=sv;
			}
			
			sd.ema1=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema1.chart=sd.chart;
			sd.ema1.days=Number(sd.inputs["Short Cycle"]);
			sd.ema1.inputs={"Field":signedVolume, "Type":"exponential"};
			sd.ema1.outputs={"EMA-S":null};
			STX.Studies.calculateMovingAverageExponential(stx,sd.ema1);

			sd.ema2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema2.chart=sd.chart;
			sd.ema2.days=Number(sd.inputs["Long Cycle"]);
			sd.ema2.inputs={"Field":signedVolume, "Type":"exponential"};
			sd.ema2.outputs={"EMA-L":null};
			STX.Studies.calculateMovingAverageExponential(stx,sd.ema2);

			for(var i=Number(sd.inputs["Long Cycle"]);i<quotes.length;i++){
				quotes[i][klinger]=quotes[i][shortEMA]-quotes[i][longEMA];
			}

			sd.ema3=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema3.chart=sd.chart;
			sd.ema3.days=Number(sd.inputs["Signal Periods"]);
			sd.ema3.inputs={"Field":klinger, "Type":"exponential"};
			sd.ema3.outputs={"KlingerSignal":sd.outputs["KlingerSignal"]};
			STX.Studies.calculateMovingAverageExponential(stx,sd.ema3);
			
			for(var i=0;i<quotes.length;i++){
				quotes[i][field]=quotes[i][klinger]-quotes[i][klingerSignal];
			}
		};
		
		/**
		 * Calculate function for stochastics
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies._calculateStochastics=function(stx, sd){
			sd.max=100;
			sd.min=0;
			if(!sd.smooth) sd.smooth=(sd.inputs["Smooth"]);
			var field=sd.inputs["Field"];
			if(field==null) field="Close";

			var quotes=sd.chart.scrubbed;
		
			if(quotes.length<sd.days+1){
				if(typeof practiceMode!="undefined" && practiceMode) return;
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Not enough quotes to compute stochastics " + sd.chart.dataSet.length + ":" + sd.days));
				return;
			}
		
			function computeStochastics(position, field){
				var beg=position-sd.days+1;
				var low=1000000, high=0;
				for(var i=beg;i<=position;i++){
					low=Math.min(low, quotes[i].Low);
					high=Math.max(high, quotes[i].High);
				}
				var k=(quotes[position][field]-low)/(high-low)*100;
				return k;
			}
		
		
			var name=sd.name;
			if(sd.smooth) name=name.substring(0,name.length-2);
		
			for(var i=sd.days;i<quotes.length;i++){
				quotes[i][name]=computeStochastics(i,field);
			}
		
			if(sd.smooth){
				for(var i=sd.days+3;i<quotes.length;i++){
					quotes[i][sd.name]=(quotes[i][name]+quotes[i-1][name]+quotes[i-2][name])/3;
				}
			}
			sd.outputMap[sd.name]="Fast";
		
			sd.ma=new STX.Studies.StudyDescriptor(sd.name+"_3", "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=3;
			sd.ma.inputs={"Field":sd.name, "Type":"simple"};
			sd.ma.min=sd.min;
			sd.ma.max=sd.max;
			STX.Studies.calculateMovingAverage(stx, sd.ma);
			sd.outputMap[sd.name+"_3"]="Slow";
		};
		
		//Copyright 2012 by ChartIQ LLC
		
		
		STX.Studies.calculateIchimoku=function(stx, sd){
		
			//var quotes=stx.chart.dataSet;
			var quotes=sd.chart.scrubbed;
		
			function calculateConversionLine(stx, sd){
			    var periodHigh=0;
			    var periodLow=999999999;
			    var periodAvg=0;
			    var ii=0;
			    sd.days = sd.inputs["Conversion Line Period"];
			    for(var i=0;i<quotes.length;i++){
			        var high=quotes[i]["High"];
			        var low=quotes[i]["Low"];
			        if(high==null || isNaN(high)) high=0;
			        if(low==null || isNaN(low)) low=0;
			        if(high>periodHigh) periodHigh = high;
			        if(low<periodLow) periodLow = low;
			        if(ii>=sd.days){
			            var lastHigh=quotes[i-sd.days]["High"];
			            if(lastHigh==null || isNaN(lastHigh)) lastHigh=0;
			            if(lastHigh==periodHigh){
			                periodHigh=0;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerHigh = quotes[j]["High"];
			                    if(innerHigh==null || isNaN(innerHigh)) innerHigh=0;
			                    if(innerHigh>periodHigh) periodHigh=innerHigh;
			                }
			            }
			            var lastLow=quotes[i-sd.days]["Low"];
			            if(lastLow==null || isNaN(lastLow)) lastLow=0;
			            if(lastLow==periodLow){
			                periodLow=999999999;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerLow = quotes[j]["Low"];
			                    if(innerLow==null || isNaN(innerLow)) innerLow=0;
			                    if(innerLow<periodLow) periodLow=innerLow;
			                }
			            }
			            periodAvg=(periodHigh+periodLow)/2;
			            quotes[i]["Conversion Line " + sd.name]=periodAvg;
			        }else {
			            quotes[i]["Conversion Line " + sd.name]=null;
			        }
			        ii++;
			    }
			}
			function calculateBaseLine(stx, sd){
			    var periodHigh=0;
			    var periodLow=999999999;
			    var periodAvg=0;
			    var ii=0;
			    sd.days = sd.inputs["Base Line Period"];
			    for(var i=0;i<quotes.length;i++){
			        var high=quotes[i]["High"];
			        var low=quotes[i]["Low"];
			        if(high==null || isNaN(high)) high=0;
			        if(low==null || isNaN(low)) low=0;
			        if(high>periodHigh) periodHigh = high;
			        if(low<periodLow) periodLow = low;
			        if(ii>=sd.days){
			            var lastHigh=quotes[i-sd.days]["High"];
			            if(lastHigh==null || isNaN(lastHigh)) lastHigh=0;
			            if(lastHigh==periodHigh){
			                periodHigh=0;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerHigh = quotes[j]["High"];
			                    if(innerHigh==null || isNaN(innerHigh)) innerHigh=0;
			                    if(innerHigh>periodHigh) periodHigh=innerHigh;
			                }
			            }
			            var lastLow=quotes[i-sd.days]["Low"];
			            if(lastLow==null || isNaN(lastLow)) lastLow=0;
			            if(lastLow==periodLow){
			                periodLow=999999999;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerLow = quotes[j]["Low"];
			                    if(innerLow==null || isNaN(innerLow)) innerLow=0;
			                    if(innerLow<periodLow) periodLow=innerLow;
			                }
			            }
			            periodAvg=(periodHigh+periodLow)/2;
			            quotes[i]["Base Line " + sd.name]=periodAvg;
			        }else {
			            quotes[i]["Base Line " + sd.name]=null;
			        }
			        ii++;
			    }
			}
			function calculateLeadingSpanA(stx, sd){
			    var conversion=0;
			    var base=0;
			    var periodAvg=0;
			    var ii=0;
			    sd.days = sd.inputs["Base Line Period"];
			    for(var i=0;i<quotes.length-26;i++){
			        conversion=quotes[i]["Conversion Line " + sd.name];
			        base=quotes[i]["Base Line " + sd.name];
			        if(conversion==null || isNaN(conversion)) conversion=0;
			        if(base==null || isNaN(base)) base=0;
			        if(ii>=sd.days){
			            periodAvg=(conversion+base)/2;
			            quotes[i+26]["Leading Span A " + sd.name]=periodAvg;
			        }else {
			            quotes[i+26]["Leading Span A " + sd.name]=null;
			        }
			        ii++;
			    }
			
			    var jj=0;
			
			    for(var j=quotes.length-26;j<quotes.length;j++){
			        conversion=quotes[j]["Conversion Line " + sd.name];
			        base=quotes[j]["Base Line " + sd.name];
			        if(conversion==null || isNaN(conversion)) conversion=0;
			        if(base==null || isNaN(base)) base=0;
			        periodAvg=(conversion+base)/2;
			        sd.futureA[jj]=periodAvg;
			        jj++;
			    }
			}
			function calculateLeadingSpanB(stx, sd){
			    var periodHigh=0;
			    var periodLow=999999999;
			    var periodAvg=0;
			    var ii=0;
			    sd.days = sd.inputs["Leading Span B Period"];
			    for(var i=0;i<quotes.length-26;i++){
			        var high=quotes[i]["High"];
			        var low=quotes[i]["Low"];
			        if(high==null || isNaN(high)) high=0;
			        if(low==null || isNaN(low)) low=0;
			        if(high>periodHigh) periodHigh = high;
			        if(low<periodLow) periodLow = low;
			        if(ii>=sd.days){
			            var lastHigh=quotes[i-sd.days]["High"];
			            if(lastHigh==null || isNaN(lastHigh)) lastHigh=0;
			            if(lastHigh==periodHigh){
			                periodHigh=0;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerHigh = quotes[j]["High"];
			                    if(innerHigh==null || isNaN(innerHigh)) innerHigh=0;
			                    if(innerHigh>periodHigh) periodHigh=innerHigh;
			                }
			            }
			            var lastLow=quotes[i-sd.days]["Low"];
			            if(lastLow==null || isNaN(lastLow)) lastLow=0;
			            if(lastLow==periodLow){
			                periodLow=999999999;
			                for(var j=i+1-sd.days;j<=i;j++){
			                    var innerLow = quotes[j]["Low"];
			                    if(innerLow==null || isNaN(innerLow)) innerLow=0;
			                    if(innerLow<periodLow) periodLow=innerLow;
			                }
			            }
			            periodAvg=(periodHigh+periodLow)/2;
			            quotes[i+26]["Leading Span B " + sd.name]=periodAvg;
			        }else {
			            quotes[i+26]["Leading Span B " + sd.name]=null;
			        }
			        ii++;
			    }
			
			    ii=0;
			    for(var i=quotes.length-26;i<quotes.length;i++){
			    	if(i-sd.days<0) continue;
			        //periodHigh=0;
			        //periodLow=999999999;
			        //periodAvg=0;
			        var high=quotes[i]["High"];
			        var low=quotes[i]["Low"];
			        if(high==null || isNaN(high)) high=0;
			        if(low==null || isNaN(low)) low=0;
			        if(high>periodHigh) periodHigh = high;
			        if(low<periodLow) periodLow = low;
			        var lastHigh=quotes[i-sd.days]["High"];
			        if(lastHigh==null || isNaN(lastHigh)) lastHigh=0;
			        if(lastHigh==periodHigh){
			            periodHigh=0;
			            for(var j=i+1-sd.days;j<=i;j++){
			                var innerHigh = quotes[j]["High"];
			                if(innerHigh==null || isNaN(innerHigh)) innerHigh=0;
			                if(innerHigh>periodHigh) periodHigh=innerHigh;
			            }
			        }
			        var lastLow=quotes[i-sd.days]["Low"];
			        if(lastLow==null || isNaN(lastLow)) lastLow=0;
			        if(lastLow==periodLow){
			            periodLow=999999999;
			            for(var j=i+1-sd.days;j<=i;j++){
			                var innerLow = quotes[j]["Low"];
			                if(innerLow==null || isNaN(innerLow)) innerLow=0;
			                if(innerLow<periodLow) periodLow=innerLow;
			            }
			        }
			        periodAvg=(periodHigh+periodLow)/2;
			        sd.futureB[ii]=periodAvg;
			        ii++;
			    }
			}
			function calculateLaggingSpan(stx, sd){
			    var close=0;
			    sd.days = sd.inputs["Lagging Span Period"];
			    for(var i=sd.days;i<quotes.length;i++){
			        close=quotes[i]["Close"];
			        if(close==null || isNaN(close)) close=0;
			        quotes[i-sd.days]["Lagging Span " + sd.name]=close;
			    }
			}
		    sd.futureA=new Array();
		    sd.futureB=new Array();
		    if(quotes.length<=52){
		    	return;
		    }
		    calculateConversionLine(stx, sd);
		    calculateBaseLine(stx, sd);
		    calculateLeadingSpanA(stx, sd);
		    calculateLeadingSpanB(stx, sd);
		    calculateLaggingSpan(stx, sd);
		};
		
		STX.Studies.displayIchimoku=function(stx, sd, quotes){
		    var offset=stx.offset;
		    var intersections = [];
		    var panel=stx.panels[sd.panel];
		    STX.Studies.displaySeriesAsLine(stx, sd, quotes);
		
		
			stx.startClip(panel.name);
			var ichiQuotes=[];
		    for(var i=0;i<quotes.length;i++){ //creates array of local quote values
		    	if(quotes[i]==null) continue;
		    	ichiQuotes.push(quotes[i].transform?quotes[i].transform:quotes[i]);
		    }
		    for(var i=0;i<ichiQuotes.length-1;i++){ //creates array of intersection points
		    	if(ichiQuotes[i]==null) continue;
		    	if(ichiQuotes[i+1]==null) continue;
				if(stx.panels[sd.panel].name==sd.chart.name){
					if(ichiQuotes[i].transform) ichiQuotes[i]=ichiQuotes[i].transform;
					if(ichiQuotes[i+1].transform) ichiQuotes[i+1]=ichiQuotes[i+1].transform;
		        }
		        if(ichiQuotes[i]["Leading Span A " + sd.name]==null || isNaN(ichiQuotes[i]["Leading Span A " + sd.name])) continue;
		        else if((ichiQuotes[i]["Leading Span A " + sd.name]>ichiQuotes[i]["Leading Span B " + sd.name] && ichiQuotes[i+1]["Leading Span A " + sd.name]<ichiQuotes[i+1]["Leading Span B " + sd.name]) || (ichiQuotes[i]["Leading Span A " + sd.name]<ichiQuotes[i]["Leading Span B " + sd.name] && ichiQuotes[i+1]["Leading Span A " + sd.name]>ichiQuotes[i+1]["Leading Span B " + sd.name])){
		            var ax1=stx.computePosition(i, offset);
		            var ax2=stx.computePosition(i+1, offset);
		            var bx1=ax1;
		            var bx2=ax2;
		            var ay1=stx.pixelFromPrice(ichiQuotes[i]["Leading Span A " + sd.name], panel);
		            var ay2=stx.pixelFromPrice(ichiQuotes[i+1]["Leading Span A " + sd.name], panel);
		            var by1=stx.pixelFromPrice(ichiQuotes[i]["Leading Span B " + sd.name], panel);
		            var by2=stx.pixelFromPrice(ichiQuotes[i+1]["Leading Span B " + sd.name], panel);
		
		            var interX=STX.intersectLineLineX(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var interY=STX.intersectLineLineY(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var intersection={};
		            intersection.x=interX;
		            intersection.y=interY;
		            intersection.tick=i+1;
		            intersections.push(intersection);
		        }
		    }
		
		    var futureIntersections = [];
		    for(var i=0;i<sd.futureA.length-1;i++){ //creates array of future intersection points so clouds project into the future
		        if(sd.futureA[i]==null || isNaN(sd.futureA[i]));
		        else if((sd.futureA[i]>sd.futureB[i] && sd.futureA[i+1]<sd.futureB[i+1]) || (sd.futureA[i]<sd.futureB[i] && sd.futureA[i+1]>sd.futureB[i+1])){
		            var ax1=stx.computePosition(ichiQuotes.length+i, offset);
		            var ax2=stx.computePosition(ichiQuotes.length+i+1, offset);
		            var bx1=ax1;
		            var bx2=ax2;
		            var ay1=stx.pixelFromPrice(sd.futureA[i], panel);
		            var ay2=stx.pixelFromPrice(sd.futureA[i+1], panel);
		            var by1=stx.pixelFromPrice(sd.futureB[i], panel);
		            var by2=stx.pixelFromPrice(sd.futureB[i+1], panel);
		
		            var interX=STX.intersectLineLineX(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var interY=STX.intersectLineLineY(ax1, ax2, ay1, ay2, bx1, bx2, by1, by2);
		            var fIntersection={};
		            fIntersection.x=interX;
		            fIntersection.y=interY;
		            fIntersection.tick=ichiQuotes.length+i+1;
		            futureIntersections.push(fIntersection);
		        }
		    }
		
		    for(var k = 0;k<intersections.length;k++){
		        stx.chart.context.lineWidth=0;
		        stx.chart.context.globalAlpha=0.3;
		        stx.chart.context.beginPath();
		        stx.chart.context.moveTo(intersections[k].x,intersections[k].y);
		        if(ichiQuotes[intersections[k].tick]["Leading Span A " + sd.name]>ichiQuotes[intersections[k].tick]["Leading Span B " + sd.name]){
		            stx.chart.context.fillStyle="#00FF00"; //green colored clouds
		        }
		        else{
		            stx.chart.context.fillStyle="#FF0000"; //red colored clouds
		        }
		        if(k+1==intersections.length){ //last cloud in the present
		            for(var n = intersections[k].tick;n<ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.computePosition(n, offset),stx.pixelFromPrice(ichiQuotes[n]["Leading Span A " + sd.name], panel));
		            }
		            for(var m = ichiQuotes.length-1;m>=intersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.computePosition(m, offset),stx.pixelFromPrice(ichiQuotes[m]["Leading Span B " + sd.name], panel));
		            }
		        }
		        else{ //draw past clouds
		            for(var n = intersections[k].tick;n<intersections[k+1].tick;n++){
		                stx.chart.context.lineTo(stx.computePosition(n, offset),stx.pixelFromPrice(ichiQuotes[n]["Leading Span A " + sd.name], panel));
		            }
		            stx.chart.context.lineTo(intersections[k+1].x,intersections[k+1].y);
		            for(var m = intersections[k+1].tick-1;m>=intersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.computePosition(m, offset),stx.pixelFromPrice(ichiQuotes[m]["Leading Span B " + sd.name], panel));
		            }
		        }
		        stx.chart.context.fill();
		    }
		
		    stx.chart.context.beginPath();
		    if(k>0){
		        stx.chart.context.moveTo(stx.computePosition(ichiQuotes.length-1, offset),stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span A " + sd.name], panel));
		        var ql;
		        if(futureIntersections.length==0){ //no future intersections, just continue present cloud
		            ql=ichiQuotes.length;
		            for(var n = 0;n<sd.futureA.length;n++){
		                stx.chart.context.lineTo(stx.computePosition(ql, offset),stx.pixelFromPrice(sd.futureA[n], panel));
		                ql++;
		            }
		            ql--;
		            for(var n = sd.futureB.length-1;n>=0;n--){
		                stx.chart.context.lineTo(stx.computePosition(ql, offset),stx.pixelFromPrice(sd.futureB[n], panel));
		                ql--;
		            }
		            stx.chart.context.lineTo(stx.computePosition(ichiQuotes.length-1, offset),stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span B " + sd.name], panel));
		            stx.chart.context.fill();
		        }
		        else{ //finish present cloud so we can start on the future clouds
		            ql=ichiQuotes.length;
		
		            for(var n = 0;n<futureIntersections[0].tick-ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.computePosition(ql, offset),stx.pixelFromPrice(sd.futureA[n], panel));
		                ql++;
		            }
		            ql--;
		            stx.chart.context.lineTo(futureIntersections[0].x,futureIntersections[0].y);
		            for(var n = futureIntersections[0].tick-1-ichiQuotes.length;n>=0;n--){
		                stx.chart.context.lineTo(stx.computePosition(ql, offset),stx.pixelFromPrice(sd.futureB[n], panel));
		                ql--;
		            }
		            stx.chart.context.lineTo(stx.computePosition(ichiQuotes.length-1, offset),stx.pixelFromPrice(ichiQuotes[ichiQuotes.length-1]["Leading Span B " + sd.name], panel));
		            stx.chart.context.fill();
		        }
		    }
		
		    for(var k = 0;k<futureIntersections.length;k++){
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
		            for(var n = futureIntersections[k].tick;n<sd.futureA.length+ichiQuotes.length;n++){
		                stx.chart.context.lineTo(stx.computePosition(n, offset),stx.pixelFromPrice(sd.futureA[n-ichiQuotes.length], panel));
		            }
		            for(var m = sd.futureA.length-1;m>=futureIntersections[k].tick-ichiQuotes.length;m--){
		                stx.chart.context.lineTo(stx.computePosition(m+ichiQuotes.length, offset),stx.pixelFromPrice(sd.futureB[m], panel));
		            }
		        }
		        else{ //draw future clouds
		            for(var n = futureIntersections[k].tick;n<futureIntersections[k+1].tick;n++){
		                stx.chart.context.lineTo(stx.computePosition(n, offset),stx.pixelFromPrice(sd.futureA[n-ichiQuotes.length], panel));
		            }
		            stx.chart.context.lineTo(futureIntersections[k+1].x,futureIntersections[k+1].y);
		            for(var m = futureIntersections[k+1].tick-1;m>=futureIntersections[k].tick;m--){
		                stx.chart.context.lineTo(stx.computePosition(m, offset),stx.pixelFromPrice(sd.futureB[m-ichiQuotes.length], panel));
		            }
		        }
		        stx.chart.context.fill();
		    }
		    stx.endClip();
		};
		
		//Copyright 2012 by ChartIQ LLC
		
		STX.Studies.calculateStudyATR=function(stx, sd){
			var quotes=sd.chart.scrubbed;
	        var period=sd.days;
	        var total=0;
		    for(var i=1;i<quotes.length;i++){
				var prices=quotes[i];
				var pd=quotes[i-1];
				var trueRange=Math.max(prices.High,pd.Close)-Math.min(prices.Low,pd.Close);
				total+=trueRange;
				if(i>period) total-=quotes[i-period]["True Range " + sd.name];
				prices["True Range " + sd.name]=trueRange;
				if(i==period) prices["ATR " + sd.name]=total/period;
				else if(i>period) prices["ATR " + sd.name]=(pd["ATR " + sd.name]*(period-1)+trueRange)/period;
			}
		};

		STX.Studies.calculateATRBands=function(stx, sd){
			this.calculateStudyATR(stx,sd);

			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs["Shift"], sd.inputs["Field"], "ATR " + sd.name);
		};
		
		STX.Studies.calculateATRStops=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			this.calculateStudyATR(stx,sd);
			var useHighLow=sd.inputs["HighLow"];
		    for(var i=1;i<quotes.length-1;i++){
				var prices=quotes[i];
				var pd=quotes[i-1];
				var prev=prices["Buy Stops " + sd.name];
				if(!prev) prev=prices["Sell Stops " + sd.name];
				if(!prev) prev=0;
				if(!prices || !pd) continue;
				var base=prices.Close;
				var result=null;
		        var offset=prices["ATR " + sd.name]*sd.inputs["Multiplier"];
				if(prices.Close>prev && pd.Close>prev){
					if(useHighLow) base=prices.High;
					result=Math.max(prev,base-offset);
				}else if(prices.Close<prev && pd.Close<prev){
					if(useHighLow) base=prices.Low;
					result=Math.min(prev,base+offset);
				}else if(prices.Close>prev){
					if(useHighLow) base=prices.High;
					result=base-offset;
				}else if(prices.Close<prev){
					if(useHighLow) base=prices.Low;
					result=base+offset;
				}
				if(base<result){
					quotes[i+1]["Buy Stops " + sd.name]=result;
				}else if(base>result){
					quotes[i+1]["Sell Stops " + sd.name]=result;					
				}
				quotes[i+1]["All Stops " + sd.name]=result;
				sd.referenceOutput="All Stops";  //so PSAR2 can draw a square wave
			}
		};

		STX.Studies.calculatePSAR=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			var af=0;
			var ep=null;
			var lasttrend=false;
			var SAR=0;
			var step=parseFloat(sd.inputs["Minimum AF"]);
			var maxStep=parseFloat(sd.inputs["Maximum AF"]);

			function doReset(){
				af=0;
				ep=null;
				lasttrend=!lasttrend;
			}
			for(var i=0;i<quotes.length-1;i++){
				if(!quotes[i]) continue;

				var priorSAR=SAR;
				if(lasttrend){
					if(!ep || ep<quotes[i].High){
						ep=quotes[i].High;
						af=Math.min(af+step,maxStep);
					}
					SAR=priorSAR+af*(ep-priorSAR);
					var lowestPrior2Lows=Math.min(quotes[Math.max(1,i)-1].Low,quotes[i].Low);
					if(SAR>quotes[i+1].Low){
						SAR=ep;
						doReset();
					}else if(SAR>lowestPrior2Lows){
						SAR=lowestPrior2Lows;
					}
				}else{
					if(!ep || ep>quotes[i].Low){
						ep=quotes[i].Low;
						af=Math.min(af+step,maxStep);
					}
					SAR=priorSAR+af*(ep-priorSAR);
					var highestPrior2Highs=Math.max(quotes[Math.max(1,i)-1].High,quotes[i].High);
					if(SAR<quotes[i+1].High){
						SAR=ep;
						doReset();
					}else if(SAR<highestPrior2Highs){
						SAR=highestPrior2Highs;
					}
				}
				quotes[i+1]["Result " + sd.name]=SAR;
	    	}
		};
		
		STX.Studies.calculateTRIX=function(stx, sd){
			var fields=["Close","MA1 "+sd.name,"MA2 "+sd.name,"MA3 "+sd.name];
			var e;
			for(e=0; e<fields.length-1; e++){
				sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
				sd.ma.chart=sd.chart;
				sd.ma.days=sd.days;
				sd.ma.inputs={"Field":fields[e], "Type":"exponential"};
				sd.ma.outputs={};
				sd.ma.outputs["MA"+(e+1).toString()]=null;
				this.calculateMovingAverageExponential(stx,sd.ma);
			}
			var quotes=sd.chart.scrubbed;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-1]) continue;
		    	if(!quotes[i-1][fields[e]]) continue;
				quotes[i]["Result " + sd.name]=100*((quotes[i][fields[e]]/quotes[i-1][fields[e]])-1);
		    }
		};
		
		STX.Studies.calculateMedianPrice=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			for(var i=0;i<quotes.length;i++){
				quotes[i][name]=(quotes[i]["High"] + quotes[i]["Low"]) / 2;
			}
		};

		STX.Studies.calculateIntradayMomentum=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			
			var totalUp=0;
			var totalDown=0;
			for(var i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				var diff=quotes[i].Close-quotes[i].Open;
				if(diff>0) totalUp+=diff;
				else totalDown-=diff;
				if(i>=period){
					var pDiff=quotes[i-period].Close-quotes[i-period].Open;
					if(pDiff>0) totalUp-=pDiff;
					else totalDown+=pDiff;
				}
	    		quotes[i]["Result " + sd.name]=100*totalUp/(totalUp+totalDown);				
			}
		};
		
		STX.Studies.calculateQStick=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			
			for(var i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i]["Close-Open " + sd.name]=quotes[i].Close-quotes[i].Open;
			}
			
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=period;
			sd.ma.inputs={"Field":"Close-Open "+sd.name, "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs=sd.outputs;
			this.calculateMovingAverage(stx,sd.ma);
		};

		STX.Studies.calculateSchaff=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			var factor=0.5;
			
			sd.macd1=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.macd1.chart=sd.chart;
			sd.macd1.days=Number(sd.inputs["Short Cycle"]);
			sd.macd1.inputs={"Field":field};
			sd.macd1.outputs={"MACD1":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.macd1);
		
			sd.macd2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.macd2.chart=sd.chart;
			sd.macd2.days=Number(sd.inputs["Long Cycle"]);
			sd.macd2.inputs={"Field":field};
			sd.macd2.outputs={"MACD2":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.macd2);
		
			function getLLVHHV(p,x,n){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					var d=quotes[j][n+" "+sd.name];
					if(!d) continue;
					l=(l==null?d:Math.min(l,d));
					h=(h==null?d:Math.max(h,d));
				}
				return [l,h];
			}
			var f1=0,f2=0;
			var longCycle=Number(sd.inputs["Long Cycle"]);
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				quote["Result "+sd.name]=f2;

				if(i<longCycle-1) continue;
				quote["MACD "+sd.name]=quote["MACD1 "+sd.name]-quote["MACD2 "+sd.name];

				if(i<longCycle+(period-1)) continue;
				var lh=getLLVHHV(period,i,"MACD");
				f1=(lh[1]>lh[0]?(100*(quote["MACD "+sd.name]-lh[0])/(lh[1]-lh[0])):f1);
				quote["PF "+sd.name]=( quotes[i-1]["PF "+sd.name] ? quotes[i-1]["PF "+sd.name]+factor*(f1-quotes[i-1]["PF "+sd.name]) : f1 );
				
				if(i<longCycle+2*(period-1)) continue;
				lh=getLLVHHV(period,i,"PF");
				f2=(lh[1]>lh[0]?(100*(quote["PF "+sd.name]-lh[0])/(lh[1]-lh[0])):f2);
				quote["Result "+sd.name]=( quotes[i-1]["Result "+sd.name] ? quotes[i-1]["Result "+sd.name]+factor*(f2-quotes[i-1]["Result "+sd.name]) : f2 );
			}
		};

		STX.Studies.calculateStochMomentum=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			function getLLVHHV(p,x){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					l=(l==null?quotes[j].Low:Math.min(l,quotes[j].Low));
					h=(h==null?quotes[j].High:Math.max(h,quotes[j].High));
				}
				return [l,h];
			}

			var pKPeriods=Number(sd.inputs["%K Periods"]);
			for(var i=pKPeriods-1;i<quotes.length;i++){
				var quote=quotes[i];
				var lh=getLLVHHV(pKPeriods,i);
				quote["H "+sd.name]=quote.Close-(lh[0]+lh[1])/2;
				quote["DHL "+sd.name]=lh[1]-lh[0];
			}

			sd.hma1=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.hma1.chart=sd.chart;
			sd.hma1.days=Number(sd.inputs["%K Smoothing Periods"]);
			sd.hma1.inputs={"Field":"H "+sd.name};
			sd.hma1.outputs={"HS1":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.hma1);

			sd.hma2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.hma2.chart=sd.chart;
			sd.hma2.days=Number(sd.inputs["%K Double Smoothing Periods"]);
			sd.hma2.inputs={"Field":"HS1 "+sd.name};
			sd.hma2.outputs={"HS2":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.hma2);

			sd.dma1=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.dma1.chart=sd.chart;
			sd.dma1.days=Number(sd.inputs["%K Smoothing Periods"]);
			sd.dma1.inputs={"Field":"DHL "+sd.name};
			sd.dma1.outputs={"DHL1":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.dma1);

			sd.dma2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.dma2.chart=sd.chart;
			sd.dma2.days=Number(sd.inputs["%K Double Smoothing Periods"]);
			sd.dma2.inputs={"Field":"DHL1 "+sd.name};
			sd.dma2.outputs={"DHL2":null};
			STX.Studies.calculateMovingAverageExponential(stx, sd.dma2);
		
			for(var i=pKPeriods-1;i<quotes.length;i++){
				quotes[i]["%K "+sd.name]=(quotes[i]["HS2 "+sd.name]/(.5*quotes[i]["DHL2 "+sd.name]))*100;
			}
			
			sd.smima=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.smima.chart=sd.chart;
			sd.smima.days=Number(sd.inputs["%D Periods"]);
			sd.smima.inputs={"Field":"%K "+sd.name,"Type":sd.inputs["%D Moving Average Type"]};
			sd.smima.outputs={"%D":null};
			STX.Studies.calculateMovingAverage(stx, sd.smima);
			
			sd.zoneOutput="%K";
		};

		STX.Studies.calculateEhlerFisher=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			function getLLVHHV(p,x){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					var d=(quotes[j].High+quotes[j].Low)/2;
					l=(l==null?d:Math.min(l,d));
					h=(h==null?d:Math.max(h,d));
				}
				return [l,h];
			}
			
			var n=0;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(i<sd.days-1){
					quote["EF "+sd.name]=quote["EF Trigger "+sd.name]=n;
					continue;
				}
				var lh=getLLVHHV(sd.days,i);
				n=0.33*2*((((quotes[i].High+quotes[i].Low)/2)-lh[0])/(lh[1]-lh[0])-0.5)+0.67*n;
				if(n>0) n=Math.min(n,0.9999);
				else if(n<0) n=Math.max(n,-0.9999);
				quote["EF "+sd.name]=0.5*Math.log((1+n)/(1-n))+0.5*quotes[i-1]["EF "+sd.name];
				quote["EF Trigger "+sd.name]=quotes[i-1]["EF "+sd.name];
			}
		};
		
		STX.Studies.calculatePrettyGoodOscillator=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			this.calculateStudyATR(stx,sd);

			sd.ema=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema.chart=sd.chart;
			sd.ema.days=sd.days;
			sd.ema.inputs={"Field":"True Range " + sd.name, "Type":"exponential"};
			sd.ema.outputs={"EMA":null};
			this.calculateMovingAverageExponential(stx,sd.ema);
			
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":"Close", "Type":"simple"};
			sd.ma.outputs={"SMA":null};
			this.calculateMovingAverage(stx,sd.ma);

		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i]["SMA "+sd.name] || !quotes[i]["EMA "+sd.name]) continue;
				quotes[i]["Result " + sd.name]=(quotes[i].Close-quotes[i]["SMA "+sd.name])/quotes[i]["EMA "+sd.name];
		    }
		};
		
		STX.Studies.calculateAwesomeOscillator=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.mp=new STX.Studies.StudyDescriptor(sd.name, "med price", sd.panel);
			sd.mp.chart=sd.chart;
			sd.mp.outputs={"Med Price":null};
			this.calculateMedianPrice(stx,sd.mp);
			
			sd.ma5=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma5.chart=sd.chart;
			sd.ma5.days=5;
			sd.ma5.inputs={"Field":"Med Price " + sd.name, "Type":"simple"};
			sd.ma5.outputs={"MA5":null};
			this.calculateMovingAverage(stx,sd.ma5);

			sd.ma34=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma34.chart=sd.chart;
			sd.ma34.days=34;
			sd.ma34.inputs={"Field":"Med Price " + sd.name, "Type":"simple"};
			sd.ma34.outputs={"MA34":null};
			this.calculateMovingAverage(stx,sd.ma34);

			for(var i=33;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i][sd.name + "_hist"]=quotes[i]["MA5 " + sd.name] - quotes[i]["MA34 " + sd.name];
			}
		};
		
		STX.Studies.calculateUltimateOscillator=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var cycle=[sd.inputs["Cycle 1"],sd.inputs["Cycle 2"],sd.inputs["Cycle 3"]];
			var c01=cycle[0]*cycle[1];
			var c02=cycle[0]*cycle[2];
			var c12=cycle[1]*cycle[2];
			var accbp=[0,0,0];
			var acctr=[0,0,0];
			var start=Math.max(cycle[0],Math.max(cycle[1],cycle[2]));
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i-1]) continue;
		    	var minLC=Math.min(quotes[i].Low,quotes[i-1].Close);
		    	var bp=quotes[i].Close-minLC;
		    	var tr=Math.max(quotes[i].High,quotes[i-1].Close)-minLC;
		    	for(var x=0;x<cycle.length;x++){
		    		accbp[x]+=bp;
		    		acctr[x]+=tr;
			    	if(i>cycle[x]){
				    	var p_minLC=Math.min(quotes[i-cycle[x]].Low,quotes[i-cycle[x]-1].Close);
				    	var p_bp=quotes[i-cycle[x]].Close-p_minLC;
				    	var p_tr=Math.max(quotes[i-cycle[x]].High,quotes[i-cycle[x]-1].Close)-p_minLC;
			    		accbp[x]-=p_bp;
			    		acctr[x]-=p_tr;
			    	}
		    	}
		    	if(i<start) continue;
		    	var numerator=c12*accbp[0]/acctr[0] + c02*accbp[1]/acctr[1] + c01*accbp[2]/acctr[2];
		    	var denominator=c12+c02+c01;
				quotes[i]["Result " + sd.name]=100*numerator/denominator;
		    }
		};
		
		STX.Studies.calculatePriceVolumeTrend=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field==null) field="Close";

			var quotes=sd.chart.scrubbed;
			var total=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i][field]) continue;
		    	if(!quotes[i-1] || !quotes[i-1][field]) continue;
		    	
		    	total+=quotes[i].Volume*(quotes[i][field]-quotes[i-1][field])/quotes[i-1][field];
	    		quotes[i]["Result " + sd.name]=total;
		    }
		};

		STX.Studies.calculateOnBalanceVolume=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			var minTick=sd.inputs["Min Tick Value"];
			var obv=false;
			if(minTick==null) {
				obv=true;
				minTick=0;
			}
			var quotes=sd.chart.scrubbed;
			var total=0;
			var direction=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i][field]) continue;
		    	if(!quotes[i-1] || !quotes[i-1][field]) continue;
		    	
		    	if(quotes[i][field]-quotes[i-1][field]>minTick) direction=1;
		    	else if(quotes[i-1][field]-quotes[i][field]>minTick) direction=-1;
		    	else if(obv) direction=0;
		    	total+=quotes[i].Volume*direction;
	    		quotes[i]["Result " + sd.name]=total;
		    }
		};

		STX.Studies.calculateVolumeIndex=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			var quotes=sd.chart.scrubbed;
			var total=100;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i][field]) continue;
		    	if(!quotes[i-1] || !quotes[i-1][field]) continue;
		    	if((sd.type=="Pos Vol" && quotes[i].Volume>quotes[i-1].Volume) ||
		    	   (sd.type=="Neg Vol" && quotes[i].Volume<quotes[i-1].Volume)){
		    		total*=(quotes[i][field]/quotes[i-1][field]);
		    	}
	    		quotes[i]["Index " + sd.name]=total;
		    }
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":"Index " + sd.name, "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);
		};

		STX.Studies.calculatePerformance=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var origin=quotes[0];
		    for(var i=1;i<quotes.length;i++){
		    	if(!origin) origin=quotes[i];
		    	if(!quotes[i]) continue;
		    	quotes[i]["Result " + sd.name]=100*(quotes[i].Close/origin.Close-1);
		    }
		};
		
		STX.Studies.calculateHistoricalVolatility=function(stx, sd){
			function intFactor(days){
				if(isNaN(days)) days=365;
				if(stx.layout.interval=="day") return days;
				else if(stx.layout.interval=="week") return days/7;
				else if(stx.layout.interval=="month") return 12;
				else return days;
			}
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			var mult=sd.inputs["Standard Deviations"];
			if(mult<0) mult=1;
			annualizingFactor=100*Math.sqrt(intFactor(sd.inputs["Days Per Year"]))*mult;
			
			var arr=[];
			var accum=0;
			for(var i=1;i<quotes.length;i++){
				if(!quotes[i] || !quotes[i-1]) continue;
				var ln=Math.log(quotes[i][field]/quotes[i-1][field]);
				arr.push(ln);
				accum+=ln;
				if(i>=sd.days) {
					var d2=0;
					accum/=sd.days;
					for(var j=0;j<arr.length;j++){
						d2+=Math.pow(arr[j]-accum,2);
					}
					accum*=sd.days;
					accum-=arr.shift();
					quotes[i]["Result " + sd.name]=Math.sqrt(d2/sd.days)*annualizingFactor;
				}
		    }
		};

		STX.Studies.calculateSwingIndex=function(stx, sd){
			var T=sd.inputs["Limit Move Value"];
			if(T==null) T=99999;
			var quotes=sd.chart.scrubbed;
			var total=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-1]) continue;

		    	var A=Math.abs(quotes[i].High-quotes[i-1].Close);
		    	var B=Math.abs(quotes[i].Low-quotes[i-1].Close);
		    	var C=Math.abs(quotes[i].High-quotes[i].Low);
		    	var D=Math.abs(quotes[i-1].Close-quotes[i-1].Open);
		    	var K=Math.max(A,B);
		    	var M=Math.max(C,K);
		    	var R=M+.25*D;
		    	if(M==A) R-=.5*B;
		    	else if(M==B) R-=.5*A;

		    	var swing = (50*((quotes[i].Close-quotes[i-1].Close)+.5*(quotes[i].Close-quotes[i].Open)+.25*(quotes[i-1].Close-quotes[i-1].Open))/R)*(K/T);
    			if(R==0 || T==0) swing=0;
 		    	
	    		if(sd.type=="Swing") total=0;
	   			total+=swing;
	    		quotes[i]["Result " + sd.name]=total;
		    }
		};

		STX.Studies.calculateADX=function(stx, sd){
			this.calculateStudyATR(stx,sd);

			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			var smoothTR=0;
			var smoothPlusDM=0;
			var smoothMinusDM=0;
			var runningDX=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i-1]) continue;
		    	var plusDM=Math.max(0,quotes[i].High-quotes[i-1].High);
		    	var minusDM=Math.max(0,quotes[i-1].Low-quotes[i].Low);
		    	if(plusDM>minusDM) minusDM=0;
		    	else if(minusDM>plusDM) plusDM=0;
		    	else plusDM=minusDM=0;
		    	
		    	if(i<=period){
		    		smoothPlusDM+=plusDM;
		    		smoothMinusDM+=minusDM;
		    		smoothTR+=quotes[i]["True Range " + sd.name];
		    		if(i<period) continue;
		    	}else{
			    	smoothPlusDM=smoothPlusDM-smoothPlusDM/period+plusDM;
			    	smoothMinusDM=smoothMinusDM-smoothMinusDM/period+minusDM;
		    		smoothTR=smoothTR-smoothTR/period+quotes[i]["True Range " + sd.name];		    		
		    	}
		    	
		    	var plusDI=100*smoothPlusDM/smoothTR;
		    	var minusDI=100*smoothMinusDM/smoothTR;
		    	var DX=100*Math.abs(plusDI-minusDI)/(plusDI+minusDI);
		    	
	    		quotes[i]["+DI " + sd.name]=plusDI;
	    		quotes[i]["-DI " + sd.name]=minusDI;
			    if(i<2*period-1){
			    	runningDX+=DX;
			    }else if(i==2*period-1){
			    	quotes[i]["ADX " + sd.name]=runningDX/period;
			    }else{
			    	quotes[i]["ADX " + sd.name]=(quotes[i-1]["ADX " + sd.name]*(period-1) + DX)/period;    		
			    }
		    }
		};
		
		STX.Studies.calculateRandomWalk=function(stx, sd){
			this.calculateStudyATR(stx,sd);

			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			
			for(var i=2;i<quotes.length;i++){
				if(!quotes[i]) continue;
				var ttr=0;
				var high=quotes[i].High;
				var low=quotes[i].Low;
				var maxHigh=0;
				var maxLow=0;
				for(var j=1;j<=period;j++){
					if(i<=j) {
						maxHigh=maxLow=0;
						break;
					}
					ttr+=quotes[i-j]["True Range " + sd.name];
					var denom=((ttr/j) * Math.sqrt(j));
					var cH=(high-quotes[i-j].Low)/denom;
					var cL=(quotes[i-j].High-low)/denom;
					maxHigh=Math.max(maxHigh,cH);
					maxLow=Math.max(maxLow,cL);
				}
				quotes[i]["Random Walk High " + sd.name]=maxHigh;
				quotes[i]["Random Walk Low " + sd.name]=maxLow;
			}
		};
		
		STX.Studies.calculateChange=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			var quotes=sd.chart.scrubbed;
		    for(var i=sd.days;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-sd.days]) continue;
				quotes[i]["Result " + sd.name]=quotes[i][field]-quotes[i-sd.days][field];
		    }
		};
		
		STX.Studies.calculateRateOfChange=function(stx, sd){
			var field=sd.inputs["Field"];
			if(sd.name.indexOf("Vol ROC")==0) field="Volume";
			else if(field==null) field="Close";
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}

			var offset=sd.inputs["Center Line"];
			if(offset==null) offset=0;
			else offset=parseInt(offset,10);
			
			var quotes=sd.chart.scrubbed;
		    for(var i=sd.days;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-sd.days]) continue;
				quotes[i][name]=100*((quotes[i][field]/quotes[i-sd.days][field])-1) + offset;
		    }
		};

		STX.Studies.calculateTypicalPrice=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var total=0;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i].typicalPrice=(quotes[i].High+quotes[i].Low+quotes[i].Close)/3;
				total+=quotes[i]["typicalPrice"];
				if(i>=period) {
					total-=quotes[i-period].typicalPrice;
					quotes[i][name]=total/period;
				}
		    }
		};

		STX.Studies.calculateWeightedClose=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var total=0;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i].weightedClose=(quotes[i].High+quotes[i].Low+2*quotes[i].Close)/4;
				total+=quotes[i]["weightedClose"];
				if(i>=period) {
					total-=quotes[i-period].weightedClose;
					quotes[i][name]=total/period;
				}
		    }
		};

		STX.Studies.calculateElderRay=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			sd.ema=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema.chart=sd.chart;
			sd.ema.days=sd.days;
			sd.ema.inputs={"Field":"Close", "Type":"exponential"};
			sd.ema.outputs={"EMA":null};
			this.calculateMovingAverageExponential(stx,sd.ema);
		    for(var i=sd.days-1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
				quotes[i][sd.name+"_hist1"]=quotes[i].High-quotes[i]["EMA "+sd.name];
				quotes[i][sd.name+"_hist2"]=quotes[i].Low-quotes[i]["EMA "+sd.name];
		    }
		};
		
		STX.Studies.calculateElderForce=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
				quotes[i]["Result "+sd.name]=quotes[i].Volume*(quotes[i].Close-quotes[i-1].Close);
		    }
		};
		
		STX.Studies.calculateCenterOfGravity=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			var quotes=sd.chart.scrubbed;
		    for(var i=sd.days-1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
				var num=0,den=0;
		    	for(var j=0;j<sd.days;j++){
		    		num-=(j+1)*quotes[i-j][field];
		    		den+=quotes[i-j][field];
				}
		    	quotes[i]["Result "+sd.name]=num/den;
		    }
		};

		STX.Studies.calculateEaseOfMovement=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i-1]) continue;
				var avgCurrent=(quotes[i].High + quotes[i].Low)/2;
				var avgPrior=(quotes[i-1].High + quotes[i-1].Low)/2;
				var dm=avgCurrent-avgPrior;
				var br=(quotes[i].Volume/100000000)/(quotes[i].High-quotes[i].Low);
		    	quotes[i]["EOM1 "+sd.name]=dm/br;
				sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
				sd.ma.chart=sd.chart;
				sd.ma.days=sd.days;
				sd.ma.inputs={"Field":"EOM1 "+sd.name, "Type":sd.inputs["Moving Average Type"]};
				sd.ma.outputs={"Result":null};
				this.calculateMovingAverage(stx,sd.ma);
		    }
		};

		STX.Studies.calculatePivotPoints=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period="day";
			if(stx.layout.interval=="day") period="month";
			else if(stx.isDailyInterval(stx.layout.interval)) period="year";
			else{
				var interval=stx.layout.periodicity;
				if(stx.layout.interval!="minute"){
					interval*=stx.layout.interval;
				}
				if(interval>=30) period="week";
			}

			var isForex=STX.LegacyMarket.isForexSymbol(stx.chart.symbol);
			var marketOffset=null;
			
		    var size=0;
		    var total=0;
		    var pivotPoint=0;
		    var high=0;
		    var low=0;
		    var prevHigh=0;
		    var prevLow=0;
		    var hlSpread=0;
		    function resetPivots(){
	    		pivotPoint=total/size;
	    		prevHigh=high;
	    		prevLow=low;
	    		hlSpread=high-low;
	    		size=total=high=low=0;		    	
		    }
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i-1]) continue;
		    	total+=(quotes[i-1].High+quotes[i-1].Low+quotes[i-1].Close)/3;
		    	high=Math.max(high,quotes[i-1].High);
		    	low=Math.min(low>0?low:quotes[i-1].Low,quotes[i-1].Low);
		    	size++;
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
		    		if(marketOffset==null){
		    			//possible new daily period
		    			var dt=STX.LegacyMarket.getMarketOffset(stx,quotes[i].DT);
			    		if(isForex){
			    			//Forex beginning of day is 17:00 NY Time, so add 7 hours of msecs to make it fall on a date boundary
			    			marketOffset+=7*60*60*1000;
			    		}
		    		}
		    		var newDate=new Date(new Date(quotes[i].DT).setMilliseconds(quotes[i].DT.getMilliseconds()+marketOffset));
		    		var oldDate=new Date(new Date(quotes[i-1].DT).setMilliseconds(quotes[i-1].DT.getMilliseconds()+marketOffset));
		    		if(oldDate.getDate()!=newDate.getDate() && newDate.getDay()!=0 && newDate.getDay()!=6){
			    		//new daily period
			    		marketOffset=null;
			    		resetPivots();
			    	}
		    	}
	        	quotes[i]["Pivot " + sd.name]=pivotPoint;
	        	quotes[i]["Resistance 1 " + sd.name]=2*pivotPoint-prevLow;
	        	quotes[i]["Resistance 2 " + sd.name]=pivotPoint+hlSpread;
	        	quotes[i]["Resistance 3 " + sd.name]=pivotPoint+2*hlSpread;
	        	quotes[i]["Support 1 " + sd.name]=2*pivotPoint-prevHigh;
	        	quotes[i]["Support 2 " + sd.name]=pivotPoint-hlSpread;
	        	quotes[i]["Support 3 " + sd.name]=pivotPoint-2*hlSpread;
		    }
		};
		
		STX.Studies.calculateChaikinVolatility=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["High-Low " + sd.name]=quotes[i]["High"] - quotes[i]["Low"];
		    }
			sd.ema=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema.chart=sd.chart;
			sd.ema.days=sd.days;
			sd.ema.inputs={"Field":"High-Low "+sd.name, "Type":"exponential"};
			sd.ema.outputs={"EMA":null};
			this.calculateMovingAverageExponential(stx,sd.ema);
			var roc=sd.inputs["Rate Of Change"];
			if(!roc) roc=sd.days;
		    for(var i=roc;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-roc]["EMA "+sd.name]) continue;
		    	quotes[i]["Result " + sd.name]=100*((quotes[i]["EMA "+sd.name]/quotes[i-roc]["EMA "+sd.name])-1);
		    }
		};
		
		STX.Studies.calculateChaikinMoneyFlow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var sumMoneyFlow=0,sumVolume=0;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["MFV " + sd.name]=quotes[i]["Volume"]*(2*quotes[i]["Close"]-quotes[i]["High"]-quotes[i]["Low"])/(quotes[i]["High"]-quotes[i]["Low"]);
			    sumMoneyFlow+=quotes[i]["MFV " + sd.name];
		    	sumVolume+=quotes[i]["Volume"];
		    	if(i>sd.days-1){
				    sumMoneyFlow-=quotes[i-sd.days]["MFV " + sd.name];
			    	sumVolume-=quotes[i-sd.days]["Volume"];	    		
			    	if(sumVolume) quotes[i]["Result " + sd.name]=sumMoneyFlow/sumVolume;
		    	}
		    }
		};
		
		STX.Studies.calculateTwiggsMoneyFlow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var sumMoneyFlow=0,sumVolume=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var trh=Math.max(quotes[i-1].Close,quotes[i]["High"]);
		    	var trl=Math.min(quotes[i-1].Close,quotes[i]["Low"]);
		    	quotes[i]["MFV " + sd.name]=quotes[i]["Volume"]*(2*quotes[i]["Close"]-trh-trl)/(trh-trl==0?999999:trh-trl);
		    	if(i>sd.days-1){
		    		sumMoneyFlow*=(sd.days-1)/sd.days;
			    	sumVolume*=(sd.days-1)/sd.days;	    		
		    	}
			    sumMoneyFlow+=quotes[i]["MFV " + sd.name];
		    	sumVolume+=quotes[i]["Volume"];
		    	if(i>sd.days-1){
			    	if(sumVolume) quotes[i]["Result " + sd.name]=sumMoneyFlow/(sumVolume>0?sumVolume:999999);
		    	}
		    }
		};
		
		STX.Studies.calculateMassIndex=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["High-Low " + sd.name]=quotes[i]["High"] - quotes[i]["Low"];
		    }
			sd.ema=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema.chart=sd.chart;
			sd.ema.days=9;
			sd.ema.inputs={"Field":"High-Low "+sd.name, "Type":"exponential"};
			sd.ema.outputs={"EMA":null};
			this.calculateMovingAverageExponential(stx,sd.ema);
			sd.ema2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ema2.chart=sd.chart;
			sd.ema2.days=9;
			sd.ema2.inputs={"Field":"EMA "+sd.name, "Type":"exponential"};
			sd.ema2.outputs={"EMA2":null};
			this.calculateMovingAverageExponential(stx,sd.ema2);
			var total=0;
		    for(var j=17;j<quotes.length;j++){
		    	total+=quotes[j]["EMA "+sd.name]/quotes[j]["EMA2 "+sd.name];
		    	if(j>=17+sd.days-1){
		    		quotes[j]["Result " + sd.name]=total;
		    		total-=quotes[j-sd.days+1]["EMA "+sd.name]/quotes[j-sd.days+1]["EMA2 "+sd.name];
		    	}
		    }
		};

		STX.Studies.calculateMoneyFlowIndex=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var cumPosMF=0;
			var cumNegMF=0;
			var lastTypPrice=0;
			var directions=[];
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var typPrice=(quotes[i].High + quotes[i].Low + quotes[i].Close)/3;
		    	if(i>0){
	    			var rawMoneyFlow=typPrice*quotes[i].Volume;
		    		if(typPrice>lastTypPrice){
		    			directions.push([1,rawMoneyFlow]);
		    			cumPosMF+=rawMoneyFlow;
		    		}else if(typPrice<lastTypPrice){
		    			directions.push([-1,rawMoneyFlow]);
		    			cumNegMF+=rawMoneyFlow;
		    		}else{
		    			directions.push([0,0]);
		    		}
	    			if(i>sd.days){
	    				var old=directions.shift();
	    				if(old[0]==1) cumPosMF-=old[1];
	    				else if(old[0]==-1) cumNegMF-=old[1];
	    				if(cumNegMF==0) quotes[i]["Result " + sd.name]=100;
	    				else quotes[i]["Result " + sd.name]=100 - 100/(1 + (cumPosMF/cumNegMF));
	    			}
		    	}
		    	lastTypPrice=typPrice;
		    }
		};

		STX.Studies.calculateChandeMomentum=function(stx, sd){
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var quotes=sd.chart.scrubbed;
			var sumMomentum=0,absSumMomentum=0;
			var history=[];
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i-1]) continue;
		    	var diff=quotes[i].Close-quotes[i-1].Close;
		    	history.push(diff);
		    	sumMomentum+=diff;
		    	absSumMomentum+=Math.abs(diff);
		    	if(history.length==sd.days){
			    	quotes[i][name]=100*sumMomentum/absSumMomentum;
				    var old=history.shift();	    		
			    	sumMomentum-=old;
			    	absSumMomentum-=Math.abs(old);				    
		    	}
		    }
		};

		STX.Studies.calculateChandeForecast=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			sd.tsf=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.tsf.chart=sd.chart;
			sd.tsf.days=sd.days;
			sd.tsf.inputs={"Field":field, "Type":"time series"};
			sd.tsf.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.tsf);

		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
			    quotes[i]["Result " + sd.name]=100*(1-(quotes[i]["MA "+sd.name]/quotes[i][field]));
		    }
		};

		STX.Studies.calculateDetrendedPrice=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":field, "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);

		    for(var i=Math.floor(sd.days/2-1);i<quotes.length-Math.floor(sd.days/2+1);i++){
			    quotes[i]["Result " + sd.name]=quotes[i][field]-quotes[i+Math.floor(sd.days/2+1)]["MA "+sd.name];
		    }
		};

		STX.Studies.calculateAroon=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var daysSinceHigh=0,daysSinceLow=0;
			var xDayHigh=null,xDayLow=null;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(xDayHigh==null) xDayHigh=quotes[i].High;
		    	if(xDayLow==null) xDayHigh=quotes[i].Low;
		    	xDayHigh=Math.max(xDayHigh,quotes[i].High);
		    	if(xDayHigh==quotes[i].High){
		    		daysSinceHigh=0;
		    	}else{
		    		daysSinceHigh++;
			    	if(daysSinceHigh>sd.days){
			    		xDayHigh=quotes[i].High;
			    		daysSinceHigh=0;
			    		for(var j=1;j<=sd.days;j++){
			    			xDayHigh=Math.max(xDayHigh,quotes[i-j].High);
			    			if(xDayHigh==quotes[i-j].High){
			    				daysSinceHigh=j;
			    			}
			    		}
			    	}
		    	}
		    	xDayLow=Math.min(xDayLow,quotes[i].Low);
		    	if(xDayLow==quotes[i].Low){
		    		daysSinceLow=0;
		    	}else{
		    		daysSinceLow++;
			    	if(daysSinceLow>sd.days){
			    		xDayLow=quotes[i].Low;
			    		daysSinceLow=0;
			    		for(var j=1;j<=sd.days;j++){
			    			xDayLow=Math.min(xDayLow,quotes[i-j].Low);
			    			if(xDayLow==quotes[i-j].Low){
			    				daysSinceLow=j;
			    			}
			    		}
			    	}
		    	}
		    	quotes[i]["Aroon Up " + sd.name]=100*(1-daysSinceHigh/sd.days);
		    	quotes[i]["Aroon Down " + sd.name]=100*(1-daysSinceLow/sd.days);
		    	quotes[i]["Aroon Oscillator " + sd.name]=quotes[i]["Aroon Up " + sd.name]-quotes[i]["Aroon Down " + sd.name];
		    }
		};

		STX.Studies.calculatePrimeNumber=function(stx, sd){
			var primes=[];
			function isPrime(x){
				if(x<=0) return false;
				else if(x!=Math.floor(x)) return false;
				//assume x is an int
				else if(primes[x]!=null) return primes[x];
				var q = parseInt(Math.sqrt(x),10);
			    for (var i = 2; i <= q; i++){
			        if (x%i==0) {
			        	primes[x]=false;
			        	return false;
			        }
			    }
			    primes[x]=true;
			    return true;
			}
			var quotes=sd.chart.scrubbed;
		    for(var i=0;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
		    	
		    	var high=quote.High;
		    	//high=Math.ceil(high);
		    	for(var h=0;high>0 && high<=10;h++) high*=10;
		    	if(isPrime(high)) high+=2;
		    	high=Math.ceil(high);
		    	if(high%2==0) high++;
		    	while(!isPrime(high)) high+=2;
		    	high/=Math.pow(10,h);
		    	
		    	var low=quote.Low;
		    	//low=Math.floor(low);
		    	for(var l=0;low>0 && low<=10;l++) low*=10;
		    	if(isPrime(low)) low-=2;
		    	low=Math.floor(low);
		    	if(low%2==0) low--;
		    	if(low>0){
			    	while(!isPrime(low)) low-=2;
			    	low/=Math.pow(10,l);
			    }
		    	
		        if(sd.type=="Prime Number Bands"){
		        	quote["Prime Bands Top " + sd.name]=high;
		        	quote["Prime Bands Bottom " + sd.name]=Math.max(0,low);
		        }else{
		        	var value=0;
		        	var tolerance=sd.inputs["Tolerance Percentage"]*(high-low)/100;
		        	var skew=high+low-2*quote.Close;
		        	if(skew<tolerance)
		        		value=1;
		        	else if(skew>tolerance)
		        		value=-1;
		        	if(value) quote["Result " + sd.name]=value;
		        }
		    }
		};
		
		STX.Studies.calculateVerticalHorizontalFilter=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			sd.mhml=new STX.Studies.StudyDescriptor(sd.name, sd.type, sd.panel);
			sd.mhml.chart=sd.chart;
			sd.mhml.days=sd.days;
			sd.mhml.inputs={};
			sd.mhml.outputs={"MHML":null};
			STX.Studies.calculateMaxHighMinLow(stx, sd.mhml);
		    var sumChanges=0;
		    var changes=[];
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var change=Math.abs(quotes[i].Close-quotes[i-1].Close);
		    	changes.push(change);
		    	sumChanges+=change;
		    	if(i>=sd.days){
		    		quotes[i]["Result " + sd.name]=quotes[i]["MHML "+sd.name]/sumChanges;
		    		sumChanges-=changes.shift();
		    	}
		    }
		};

		STX.Studies.calculatePriceOscillator=function(stx, sd, isVolume){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			var maType=sd.inputs["Moving Average Type"];
			if(maType==null) maType="simple";
			if(field==null){
				if(isVolume) {
					field="Volume";
					maType="exponential";
				}
				else field="Close";
			}
			var pts=sd.inputs["Points Or Percent"];
			if(pts==null) pts="Points";

			sd.ma1=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma1.chart=sd.chart;
			sd.ma1.days=Number(sd.inputs["Short Cycle"]);
			sd.ma1.inputs={"Field":field, "Type":maType};
			sd.ma1.outputs={"Short MA":null};
			this.calculateMovingAverage(stx,sd.ma1);

			sd.ma2=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma2.chart=sd.chart;
			sd.ma2.days=Number(sd.inputs["Long Cycle"]);
			sd.ma2.inputs={"Field":field, "Type":maType};
			sd.ma2.outputs={"Long MA":null};
			this.calculateMovingAverage(stx,sd.ma2);
			
		    for(var i=0;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
		        if(pts=="Points") quote["Result " + sd.name]=quote["Short MA " + sd.name]-quote["Long MA " + sd.name];
		        else quote["Result " + sd.name]=100*((quote["Short MA " + sd.name]/quote["Long MA " + sd.name])-1);
		    }
		};

		STX.Studies.calculateKeltner=function(stx, sd){
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":"Close", "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);

			this.calculateStudyATR(stx,sd);

			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs["Shift"], "MA "+sd.name, "ATR " + sd.name);
		};
		
		STX.Studies.calculateCoppock=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			if(field==null) field="Close";

			var longDays=sd.inputs["Long RoC"];
			if(!longDays) longDays=14;
			var shortDays=sd.inputs["Short RoC"];
			if(!shortDays) shortDays=11;
			var period=sd.days;
			if(!period) period=10;
			if(longDays<shortDays) return;

		    for(var i=longDays;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-shortDays]) continue;
		    	if(!quotes[i-longDays]) continue;
				quotes[i]["Sum "+sd.name]=100*((quotes[i][field]/quotes[i-shortDays][field])+(quotes[i][field]/quotes[i-longDays][field])-2);
		    }
			
			sd.wma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.wma.chart=sd.chart;
			sd.wma.days=period;
			sd.wma.inputs={"Field":"Sum "+sd.name};
			sd.wma.outputs=sd.outputs;
			this.calculateMovingAverageWeighted(stx,sd.wma);
		};
		
		STX.Studies.calculateLinearRegressionIndicator=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs["Field"];
			if(field==null) field="Close";
			
			var sumWeights=sd.days*(sd.days+1)/2;
			var squaredSumWeights=Math.pow(sumWeights,2);
			var sumWeightsSquared=sumWeights*(2*sd.days+1)/3;
			
			var sumCloses=0;
			var sumWeightedCloses=0;
			var sumClosesSquared=0;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	sumWeightedCloses+=sd.days*quotes[i][field]-sumCloses;
		    	sumCloses+=quotes[i][field];
		    	sumClosesSquared+=Math.pow(quotes[i][field],2);
		    	if(i<sd.days-1) continue;
		    	else if(i>sd.days-1) {
		    		sumCloses-=quotes[i-sd.days][field];
		    		sumClosesSquared-=Math.pow(quotes[i-sd.days][field],2);
		    	}
		    	var b=(sd.days*sumWeightedCloses-sumWeights*sumCloses)/(sd.days*sumWeightsSquared-squaredSumWeights);
				quotes[i]["Slope "+sd.name]=b;
		    	var a=(sumCloses-b*sumWeights)/sd.days;
				quotes[i]["Intercept "+sd.name]=a;
				quotes[i]["Forecast "+sd.name]=a+b*sd.days;
		    	var c=(sd.days*sumWeightsSquared-squaredSumWeights)/(sd.days*sumClosesSquared-Math.pow(sumCloses,2));
				quotes[i]["RSquared "+sd.name]=b*b*c;
		    }
		};
		
		STX.Studies.calculateBollinger=function(stx, sd){
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":"Close", "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);

			sd.std=new STX.Studies.StudyDescriptor(sd.name, "STD Dev", sd.panel);
			sd.std.chart=sd.chart;
			sd.std.days=sd.days;
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			sd.std.inputs={"Field":field, "Standard Deviations":sd.inputs["Standard Deviations"], "Type":sd.inputs["Moving Average Type"]};
			sd.std.outputs={"STD Dev":null};
			this.calculateStandardDeviation(stx,sd.std);
			
			STX.Studies.calculateGenericEnvelope(stx, sd, 1, "MA "+sd.name, "STD Dev "+sd.name);
		};
		
		STX.Studies.calculateMAEnvelope=function(stx, sd){
			var field=sd.inputs["Field"];
			if(field=="field") field="Close";
			
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":field, "Type":sd.inputs["Moving Average Type"]};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);

			var shift=sd.inputs["Shift Percentage"]/100;

			STX.Studies.calculateGenericEnvelope(stx, sd, shift, "MA "+sd.name);
		};
		
		STX.Studies.calculateGenericEnvelope=function(stx, sd, shift, centerIndex, offsetIndex){
			if(!shift) shift=0;
			if(!offsetIndex) offsetIndex="Close";
			if(!centerIndex) centerIndex="Close";
			var quotes=sd.chart.scrubbed;
		    for(var i=0;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
				if(!quote[centerIndex]) continue;
				var mult=shift*quote[offsetIndex];
		        quote[sd.type + " Top " + sd.name]=quote[centerIndex]+mult;
		        quote[sd.type + " Bottom " + sd.name]=quote[centerIndex]-mult;
		        quote[sd.type + " Median " + sd.name]=quote[centerIndex];
		        quote["Bandwidth " + sd.name]=200*mult/quote[centerIndex];
		        quote["%b " + sd.name]=50*((quote.Close-quote[centerIndex])/mult+1);
		    }
		};
		
		STX.Studies.calculateMaxHighMinLow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			var low=-1,high=-1;
		    for(var i=0;i<quotes.length;i++){
		        var period=sd.days;
	        	high=Math.max(high==-1?quotes[i]["High"]:high,quotes[i]["High"]);
		        low=Math.min(low==-1?quotes[i]["Low"]:low,quotes[i]["Low"]);
		        if(sd.inputs["High Period"]) period=sd.inputs["High Period"];
		        if(i>=period){
		        	if((quotes[i-period]["High"])==high){
		        		high=quotes[i]["High"];
		        		for(var j=1;j<period;j++){
		        			high=Math.max(high,quotes[i-j]["High"]);
		        		}
		        	}
		        }
		        if(sd.inputs["Low Period"]) period=sd.inputs["Low Period"];
			    if(i>=period){
		        	if((quotes[i-period]["Low"])==low){
		        		low=quotes[i]["Low"];
		        		for(var j=1;j<period;j++){
		        			low=Math.min(low,quotes[i-j]["Low"]);
		        		}
		        	}
		        }
		        var result=0;
		        if(sd.type=="HHV"){
		        	result=high;
		        }else if(sd.type=="LLV"){
		        	result=low;
		        }else if(sd.type=="Donchian Width"){
		        	result=high-low;
		        }else if(sd.type=="GAPO" || sd.type=="Gopala"){
		        	result=Math.log(high-low)/Math.log(period);
		        }else if(sd.type=="VT HZ Filter"){
		        	result=high-low;
			        quotes[i]["MHML "+sd.name]=result;		        	
			        continue;
		        }else if(sd.type=="Williams %R"){
		        	result=-100*(high-quotes[i].Close)/(high-low);
			        quotes[i]["Result " + sd.name]=result;		        	
			        continue;
		        }
		    	if(i==quotes.length-1) break;
		    	
		        if(sd.type=="Donchian Channel"){
			        quotes[i+1]["Donchian High " + sd.name]=high;
			        quotes[i+1]["Donchian Low " + sd.name]=low;
			        quotes[i+1]["Donchian Median " + sd.name]=(high+low)/2;
		        }else{  //width
			        quotes[i+1]["Result " + sd.name]=result;		        	
		        }
		    }
		};
				
		STX.Studies.calculateAccumulationDistribution=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var total=0;
		    for(var i=1;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	var yClose=quotes[i-1].Close;
		    	if(!quote) continue;
		    	var todayAD=0;
		    	if(quote.Close>yClose){
		    		todayAD=quote.Close-Math.min(quote.Low,yClose);
		    	}else if(quote.Close<yClose){
		    		todayAD=quote.Close-Math.max(quote.High,yClose);
		    	}
	        	total+=todayAD;
	        	quote["Result " + sd.name]=total;
		    }
		};
		
		STX.Studies.calculateCCI=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			sd.tp=new STX.Studies.StudyDescriptor(sd.name, "typical price", sd.panel);
			sd.tp.chart=sd.chart;
			sd.tp.days=sd.days;
			sd.tp.outputs={"Typ Price":null};
			this.calculateTypicalPrice(stx,sd.tp);
			
			sd.ma=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=sd.days;
			sd.ma.inputs={"Field":"typicalPrice", "Type":"simple"};
			sd.ma.outputs={"MA":null};
			this.calculateMovingAverage(stx,sd.ma);

		    for(var i=sd.days-1;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
				var md=0;
				for(var j=0;j<sd.days;j++){
					md+=Math.abs(quotes[i-j]["typicalPrice"] - quote["MA " + sd.name]);
				}
				md/=sd.days;
		        quote["Result " + sd.name]=(quote["typicalPrice"] - quote["MA " + sd.name]) / (0.015 * md);
		    }
		};
		
		STX.Studies.calculateFractalChaos=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			var fractalHigh=0;
			var fractalLow=0;
			var test=0;
		    for(var i=4;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var j;
		    	test=0;
		    	for(j=0;j<=i;j++){
		    		if(!quotes[i-j]) break;
		    		if(quotes[i-j].High>quotes[i-2].High) break;
		    		if(j<2 && quotes[i-j].High==quotes[i-2].High) break;
		    		if(quotes[i-j].High<quotes[i-2].High) test++;
		    		if(test==4) {
		    			fractalHigh=quotes[i-2].High;
		    			break;
		    		}
		    	}
		        if(sd.type=="Fractal Chaos Bands"){
		        	quotes[i]["Fractal High " + sd.name]=fractalHigh>0?fractalHigh:null;
		        }else if(test==4){ //oscillator
		        	quotes[i]["Result " + sd.name]=1;
		        }
		        test=0;	
		    	for(j=0;j<i;j++){
		    		if(!quotes[i-j]) break;
		    		if(quotes[i-j].Low<quotes[i-2].Low) break;
		    		if(j<2 && quotes[i-j].Low==quotes[i-2].Low) break;
		    		if(quotes[i-j].Low>quotes[i-2].Low) test++;
		    		if(test==4) {
		    			fractalLow=quotes[i-2].Low;
		    			break;
		    		}
		    	}
		        if(sd.type=="Fractal Chaos Bands"){
				    quotes[i]["Fractal Low " + sd.name]=fractalLow>0?fractalLow:null;
		        }else if(test==4){ //oscillator
		        	quotes[i]["Result " + sd.name]=-1;
		        }
		    }
		};
			
		STX.Studies.calculatePriceRelative=function(stx, sd){
			stx.panels[sd.panel].studyQuotes={};
			if(stx.chart.symbol.indexOf(":")>-1) {
				stx.panels[sd.panel].studyQuotes=null;
				return;
			}
			var cSym=sd.inputs["Comparison Symbol"].split(":")[0]; //do not allow : in symbol
			if(cSym=="" || cSym==stx.chart.symbol) {
				stx.panels[sd.panel].studyQuotes=null;
				return;
			}
			stx.panels[sd.panel].studyQuotes[cSym]=true;

			var quotes=sd.chart.scrubbed;
			if(sd.loadedInitialData==true){
				var q=0;
				for(;q<quotes.length;q++){
					if(quotes[q]!=null && quotes[q][cSym]!=null) break;
				}
				if(q==quotes.length) sd.loadedInitialData=null;
			}

			if(sd.loadedInitialData==null){  //check to see if we've loaded the initial data
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
								STX.Comparison.processComparison(params.stx, params.symbol, result.dataCallback.quotes);
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
							STX.Comparison.processComparison(stx,params.symbol,data);
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

		STX.Studies.displayPrettyGoodOscillator=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var low=-3;
			var high=3;
			
			var panel=stx.panels[sd.panel];
			var color=stx.chart.context.strokeStyle;
			
			stx.chart.context.globalAlpha=.2;
			stx.chart.context.strokeStyle=sd.outputs["Result"];
				
			stx.chart.context.beginPath();
			var ph=stx.pixelFromPrice(high,panel);
			stx.chart.context.moveTo(0,ph);
			stx.chart.context.lineTo(stx.chart.width,ph);

			pl=stx.pixelFromPrice(low,panel);			
			stx.chart.context.moveTo(0,pl);
			stx.chart.context.lineTo(stx.chart.width,pl);
			stx.chart.context.stroke();
			stx.chart.context.closePath();

			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:high, direction:1, color:sd.outputs["Result"]});
			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:low, direction:-1, color:sd.outputs["Result"]});

			stx.chart.context.strokeStyle=color;
			stx.chart.context.globalAlpha=1;
		};

		STX.Studies.displayAwesomeOscillator=function(stx, sd, quotes){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.name];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);
			var negativeOffset=(stx.tmpWidth-stx.layout.candleWidth)/2;

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			var upColor=sd.outputs["Increasing Bar"];
			var downColor=sd.outputs["Decreasing Bar"];
			stx.canvasColor("stx_histogram");
			stx.chart.context.globalAlpha=1;
			stx.chart.context.fillStyle="#CCCCCC";
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(quote==null || quotes[i-1]==null) continue;
				if(i==0);
				else if(quotes[i-1][sd.name+"_hist"]<quote[sd.name+"_hist"]) stx.chart.context.fillStyle=upColor;
				else if(quotes[i-1][sd.name+"_hist"]>quote[sd.name+"_hist"]) stx.chart.context.fillStyle=downColor;
				stx.chart.context.fillRect(Math.floor(stx.computePosition(i, 1)+negativeOffset),
											Math.floor(y), 
											Math.floor(myWidth),
											Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
		};

		STX.Studies.displayRAVI=function(stx, sd, quotes){
			for(var i=0;i<quotes.length;i++){
				quotes[i][sd.name+"_hist"]=quotes[i]["Result "+sd.name];
				//delete quotes[i]["Result "+sd.name];
			}
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.name];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);
			var negativeOffset=(stx.tmpWidth-stx.layout.candleWidth)/2;

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			
			var upColor=sd.outputs["Increasing Bar"];
			var downColor=sd.outputs["Decreasing Bar"];
			stx.canvasColor("stx_histogram");
			stx.chart.context.globalAlpha=1;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(quote==null || quotes[i-1]==null) continue;
				var overBought=0, overSold=0;
				if(sd.parameters && sd.parameters.studyOverZonesEnabled){
					overBought=parseFloat(sd.parameters.studyOverBoughtValue), overSold=parseFloat(sd.parameters.studyOverSoldValue);
				}
				if(i==0) stx.chart.context.fillStyle="#CCCCCC";
				else if(quote[sd.name+"_hist"]>overBought && quotes[i-1][sd.name+"_hist"]<quote[sd.name+"_hist"]) stx.chart.context.fillStyle=upColor;
				else if(quote[sd.name+"_hist"]<overSold && quotes[i-1][sd.name+"_hist"]>quote[sd.name+"_hist"]) stx.chart.context.fillStyle=downColor;
				else stx.chart.context.fillStyle="#CCCCCC";
				stx.chart.context.fillRect(Math.floor(stx.computePosition(i, 1)+negativeOffset),
						Math.floor(y), 
						Math.floor(myWidth),
						Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
		};

		STX.Studies.displayElderRay=function(stx, sd, quotes){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.name];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);
			var negativeOffset=(stx.tmpWidth-stx.layout.candleWidth)/2;

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			function drawBar(i,reduction,output,hist){
				stx.chart.context.fillStyle=sd.outputs[output];
				stx.chart.context.fillRect(Math.floor(stx.computePosition(i, 1)+negativeOffset)+myWidth*reduction,
						Math.floor(y), 
						Math.floor(myWidth)*(1-2*reduction),
						Math.floor(stx.pixelFromPrice(quote[sd.name+hist], panel)-y));
			}
			
			stx.canvasColor("stx_histogram");
			var fillStyle=stx.chart.context.fillStyle;
			stx.chart.context.globalAlpha=1;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				if(quote[sd.name+"_hist1"]>0) drawBar(i,0,"Elder Bull Power","_hist1");
				if(quote[sd.name+"_hist2"]<0) drawBar(i,0,"Elder Bear Power","_hist2");
				if(quote[sd.name+"_hist1"]<0) drawBar(i,.1,"Elder Bull Power","_hist1");
				if(quote[sd.name+"_hist2"]>0) drawBar(i,.1,"Elder Bear Power","_hist2");
			}
			stx.chart.context.fillStyle=fillStyle;
		};
		
		STX.Studies.displayPivotPoints=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
			if(sd.inputs["Shading"]) {
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Resistance 3 " + sd.name, bottomBand:"Resistance 2 " + sd.name,color:sd.outputs["Resistance 3"]});
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Resistance 2 " + sd.name, bottomBand:"Resistance 1 " + sd.name,color:sd.outputs["Resistance 2"]});
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Resistance 1 " + sd.name, bottomBand:"Pivot " + sd.name,color:sd.outputs["Resistance 1"]});
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Support 1 " + sd.name, bottomBand:"Pivot " + sd.name,color:sd.outputs["Support 1"]});
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Support 2 " + sd.name, bottomBand:"Support 1 " + sd.name,color:sd.outputs["Support 2"]});
				STX.Studies.prepareChannelFill(stx,quotes,{panelName: sd.panel, noSlopes: true, topBand:"Support 3 " + sd.name, bottomBand:"Support 2 " + sd.name,color:sd.outputs["Support 3"]});
			}
		};
		
		STX.Studies.displayMassIndex=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var bulge=sd.inputs["Bulge Threshold"];
			
			var panel=stx.panels[sd.panel];
			var color=stx.chart.context.strokeStyle;
			
			stx.chart.context.globalAlpha=.2;
			stx.chart.context.strokeStyle=sd.outputs["Result"];
				
			stx.chart.context.beginPath();
			var p=stx.pixelFromPrice(bulge,panel);
			stx.chart.context.moveTo(0,p);
			stx.chart.context.lineTo(stx.chart.width,p);
			stx.chart.context.stroke();
			stx.chart.context.closePath();

			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:bulge, direction:1, color:sd.outputs["Result"]});

			stx.chart.context.strokeStyle=color;
			stx.chart.context.globalAlpha=1;
		};

		STX.Studies.displayChannel=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);
			if(sd.inputs["Channel Fill"]) {
				var parameters={panelName: sd.panel};
				for(var p in sd.outputs){
					var lastWord=p.split(" ").pop();
					if(lastWord=="Top" || lastWord=="High"){
						parameters.topBand=p + " " + sd.name;
					}else if(lastWord=="Bottom" || lastWord=="Low"){
						parameters.bottomBand=p + " " + sd.name;
					}else if(lastWord=="Median" || lastWord=="Channel"){
						parameters.color=sd.outputs[p];
					}
				}
				STX.Studies.prepareChannelFill(stx,quotes,parameters);
			}
		};
		
		STX.Studies.prepareChannelFill=function(stx, quotes, parameters){
			//We use the quote cache for our y values since we already plotted the series.
			var panel=stx.panels[parameters.panelName];
	        var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			var noSlopes=parameters.noSlopes;

			var highs=[],lows=[];
		    for(var i=1;i<quotes.length;i++){
		    	var quote_1=quotes[i-1];
		    	if(!quote_1 || !quote_1.cache) continue;
				if(panel.name==stx.chart.name && quote_1.transform) quote_1=quote_1.transform;
		        if(!highs.length){
		            var hy1=Math.max(t,Math.min(b,quote_1.cache[parameters.topBand]));
		            if(!isNaN(hy1)){
		            	//var x1=stx.pixelFromDate(quotes[i-1].Date, panel.chart);
		            	var x1=(i==1?0:(i-1)*stx.layout.candleWidth + stx.offset);
		            	highs.push([x1,hy1]);
		            }
		        }

	            if(!lows.length){
		            var ly1=Math.max(t,Math.min(b,quote_1.cache[parameters.bottomBand]));
		            if(!isNaN(ly1)){
		            	//var x1=stx.pixelFromDate(quotes[i-1].Date, panel.chart);
		            	var x1=(i==1?0:(i-1)*stx.layout.candleWidth + stx.offset);
		            	lows.push([x1,ly1]);
		            }
	            }
	            var quote=quotes[i];
				if(panel.name==stx.chart.name && quote.transform) quote=quote.transform;
	            if(highs.length || lows.length){
	            	//var x2=stx.pixelFromDate(quotes[i].Date, panel.chart);
	            	var x2=i*stx.layout.candleWidth + stx.offset;
	            	if(highs.length){
		            	if(noSlopes){
		            		highs.push([x2,highs[highs.length-1][1]]);
		            	}
		            	var hy2=Math.max(t,Math.min(b,quote.cache[parameters.topBand]));
		            	highs.push([x2,hy2]);
	            	}
	            	if(lows.length){
		            	if(noSlopes){
		            		lows.push([x2,lows[lows.length-1][1]]);
		            	}
		            	var ly2=Math.max(t,Math.min(b,quote.cache[parameters.bottomBand]));
		            	lows.push([x2,ly2]);
	            	}
	            }
		    }
		    var points=highs.concat(lows.reverse());
		    STX.Studies.fillArea(stx, points, parameters.color, null, parameters.panelName);
		};
		
		STX.Studies.drawZones=function(stx,sd,quotes){
			if(!sd.parameters || !sd.parameters.studyOverZonesEnabled) return;

			var low=parseFloat(sd.parameters.studyOverSoldValue);
			var high=parseFloat(sd.parameters.studyOverBoughtValue);
			var lowColor=sd.parameters.studyOverSoldColor;
			var highColor=sd.parameters.studyOverBoughtColor;
			var output=sd.zoneOutput;
			if(!output) output="Result";
			var zoneColor=sd.outputs[output];
			if(zoneColor==null || zoneColor=="auto" || STX.isTransparent(zoneColor)) zoneColor=stx.defaultColor;
			if(lowColor=="") lowColor=zoneColor;
			if(highColor=="") highColor=zoneColor;
			var drawBorders=stx.chart.panel.yAxis.displayBorder || stx.axisBorders;
			var borderEdge=Math.round(stx.chart.width)+.5;
			var w=drawBorders?borderEdge-.5:stx.chart.width;
			var tickWidth=drawBorders?3:0; // pixel width of tick off edge of border
			
			var color=stx.chart.context.fillStyle;
			
			var panel=stx.panels[sd.panel];
			
			stx.chart.context.globalAlpha=.2;

			panel.yAxisPlotter=new STX.Plotter();
			panel.yAxisPlotter.newSeries("border", "stroke", stx.canvasStyle("stx_grid_border"));

			stx.chart.context.beginPath();
			var ph=Math.round(stx.pixelFromPrice(high,panel))+.5;
			stx.chart.context.strokeStyle=highColor;
			stx.chart.context.moveTo(0,ph);
			stx.chart.context.lineTo(w,ph);
			stx.chart.context.stroke();
			
			var pl=Math.round(stx.pixelFromPrice(low,panel))+.5;			
			stx.chart.context.strokeStyle=lowColor;
			stx.chart.context.moveTo(0,pl);
			stx.chart.context.lineTo(w,pl);
			stx.chart.context.stroke();
			stx.chart.context.closePath();

			if(drawBorders){
				panel.yAxisPlotter.moveTo("border", borderEdge-.5, ph);
				panel.yAxisPlotter.lineTo("border", borderEdge+tickWidth, ph);
				panel.yAxisPlotter.moveTo("border", borderEdge-.5, pl);
				panel.yAxisPlotter.lineTo("border", borderEdge+tickWidth, pl);
			}

			stx.chart.context.fillStyle=color;
			
			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:output + " " + sd.name, threshold:high, direction:1, color:highColor});
			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:output + " " + sd.name, threshold:low, direction:-1, color:lowColor});

			stx.chart.context.globalAlpha=1;
			
			if(!sd.libraryEntry.yaxis){
				var yAxis=panel.yAxis;
				if(drawBorders){
					var b=Math.round(yAxis.bottom)+.5;
					panel.yAxisPlotter.moveTo("border", borderEdge, yAxis.top);
					panel.yAxisPlotter.lineTo("border", borderEdge, b);
					panel.yAxisPlotter.draw(stx.chart.context, "border");
				}

				// Draw the y-axis with high/low
				stx.canvasFont("stx_yaxis");
				stx.canvasColor("stx_yaxis");
				var ypx=panel.height/panel.shadow;
				var textX=stx.chart.canvasWidth-stx.yaxisLeft + tickWidth + 3;
				stx.chart.context.fillText(high, textX, ph);
				stx.chart.context.fillText(low, textX, pl);
				panel.axisDrawn=true;
			}
		};

		STX.Studies.preparePeakValleyFill=function(stx, quotes, parameters){
			//We use the quote cache for our y values since we already plotted the series.
			var panel=stx.panels[parameters.panelName];
	        var t=panel.yAxis.top;
			var b=panel.yAxis.bottom;
			if(!parameters.threshold && parameters.threshold!=0) return; 
			var yThresh;  //where threshold hits yaxis
			if(parameters.panelName==stx.chart.panel.name){
				yThresh=stx.pixelFromPriceTransform(parameters.threshold, panel);
			}else{
				yThresh=stx.pixelFromPrice(parameters.threshold, panel);
			}
			
			var points=[];
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i-1]) continue;
		    	var quote=quotes[i];
		    	var quote_1=quotes[i-1];
		    	if(parameters.panelName==stx.chart.panel.name){
		    		// Case 1, on the chart (such as a baseline_delta)
		    		var qItem=quote.cache[parameters.band];
		    		var qItem_1=quote_1.cache[parameters.band];
					if(quote.transform) qItem=stx.pixelFromPrice(quote.transform[parameters.band],panel);
					if(quote_1.transform) qItem_1=stx.pixelFromPrice(quote_1.transform[parameters.band],panel);
				}else if(quote.cache && quote_1.cache){
					// Case 2, we already have a cache going. This will be faster than computing.
			    	var qItem=quote.cache[parameters.band];
			    	var qItem_1=quote_1.cache[parameters.band];
			    	// If the cache hasn't gotten the bands yet then we need to compute
			    	if(typeof qItem=="undefined" || typeof qItem_1=="undefined"){
			    		var qItem=stx.pixelFromPrice(quote[parameters.band], panel);
			    		var qItem_1=stx.pixelFromPrice(quote_1[parameters.band],panel);			    		
			    	}
			    }else{
			    	// Case 3, no cache established yet then we need to compute
			    	var qItem=stx.pixelFromPrice(quote[parameters.band], panel);
			    	var qItem_1=stx.pixelFromPrice(quote_1[parameters.band],panel);
			    }
		        if(!points.length){
	            	var x1=(i-1)*stx.layout.candleWidth + stx.offset;
	            	if(i==1){
	            		var leftTick=stx.chart.dataSet.length-stx.chart.scroll;
						if(leftTick>0){
							var x0=stx.offset-stx.layout.candleWidth;
							var baseline=stx.chart.dataSet[leftTick-1];
							if(panel.name==stx.chart.panel.name && baseline.transform) baseline=baseline.transform;
							var y0=baseline[parameters.band];
							y0=(panel.yAxis.high-y0)*panel.yAxis.multiplier+t;
							var y0Clipped=y0;//Math.max(t,Math.min(b,y0));
				            if(!isNaN(y0Clipped)){
				            	if(y0>=yThresh && qItem_1>=yThresh){
					            	points.push([x0, parameters.direction==1?yThresh:y0Clipped]);
				            	}else if(y0<=yThresh && qItem_1<=yThresh){
						            points.push([x0, parameters.direction==-1?yThresh:y0Clipped]);
				            	}else{
				            		points.push([x1-(x1-x0)*(yThresh-qItem_1)/(y0-qItem_1),yThresh]);
				            	}
				            }
						}
					}
	            	var y1=qItem_1;//Math.max(t,Math.min(b,qItem_1));
		            if(!isNaN(y1) && ((quote_1[parameters.band]>=parameters.threshold && parameters.direction==1) || (quote_1[parameters.band]<=parameters.threshold && parameters.direction==-1))){
		            	points.push([x1,y1]);
		            }else{
		            	points.push([x1,yThresh]);
		            }
		        }
	            
	            if(points.length){
	            	var x2=i*stx.layout.candleWidth + stx.offset;
	            	if(stx.extendLastTick && i==quotes.length-1) x2+=stx.offset;
		           	var y2=qItem;//Math.max(t,Math.min(b,qItem));
		           	if((quote[parameters.band]>parameters.threshold && parameters.direction==1) || (quote[parameters.band]<parameters.threshold && parameters.direction==-1)){
		           		if(points[points.length-1][1]==yThresh){
		           			points.push([points[points.length-1][0]+(x2-points[points.length-1][0])*(yThresh-qItem_1)/(y2-qItem_1),yThresh]);
		          		}
		           		points.push([x2,y2]);
		           	}else{
		           		if(points[points.length-1][1]!=yThresh){
		           			points.push([points[points.length-1][0]+(x2-points[points.length-1][0])*(yThresh-qItem_1)/(y2-qItem_1),yThresh]);
		           		}
		            	points.push([x2,yThresh]);
		            }
	            }
		    }
		    if(!points.length) return;
		    if(parameters.edgeHighlight){
		    	if(parameters.edgeParameters.lineWidth>100) parameters.edgeParameters.lineWidth=1; // trap case where no width is specified in the css
		    	for(var p=0;p<points.length-1;p++){
		    		if(points[p][1]!=yThresh || points[p+1][1]!=yThresh)
		    			stx.plotLine(points[p][0],points[p+1][0],points[p][1],points[p+1][1],parameters.edgeHighlight,"segment",stx.chart.context,true,parameters.edgeParameters);
		    	}
		    }
		    points.push([points[points.length-1][0],yThresh],[points[0][0],yThresh]);
		    var opacity=parameters.opacity;
		    if(opacity==null) opacity=0.3;
		    STX.Studies.fillArea(stx, points, parameters.color, opacity, parameters.panelName);
		};

		/**
		 * Passes a calculation function to the Modulus library of technical indicators.
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies._passToModulus=function(stx, sd){
	    	console.log("Undefined Study: " + sd.type);
	    	return;
		};

		/**
		 * Annotation drawing tool. An annotation is a simple text tool. It uses the class stx_annotation
		 * to determine the font style and color for the annotation. Class stx_annotation_highlight_bg is used to
		 * determine the background color when highlighted.
		 *
		 * The controls controls.annotationSave and controls.annotationCancel are used to create HTMLElements for
		 * saving and canceling the annotation while editing. A textarea is created dynamically. The annotation tool
		 * attempts to draw the annotations at the same size and position as the textarea so that the effect is wysiwig.
		 * @constructor
		 * @name  STX.Drawing.annotation
		 */
		STX.Drawing.annotation=function(){
			this.name="annotation";
			this.arr=[];
			this.w=0;
			this.h=0;
			this.padding=4;
			this.text="";
			this.ta=null;
			this.fontSize=0;
			this.font={};
		};
		STX.Drawing.annotation.stxInheritsFrom(STX.Drawing.BaseTwoPoint);

		STX.Drawing.annotation.prototype.getFontString=function(){
			this.fontDef={
				style:null,
				weight:null,
				size:"12px",
				family:null
			};
			var css=this.stx.canvasStyle("stx_annotation");
			if(css){
				if(css.fontStyle) this.fontDef.style=css.fontStyle;
				if(css.fontWeight) this.fontDef.weight=css.fontWeight;
				if(css.fontSize) this.fontDef.size=css.fontSize;
				if(css.fontFamily) this.fontDef.family=css.fontFamily;
			}
			if(this.font.style) this.fontDef.style=this.font.style;
			if(this.font.weight) this.fontDef.weight=this.font.weight;
			if(this.font.size) this.fontDef.size=this.font.size;
			if(this.font.family) this.fontDef.family=this.font.family;
			this.fontString="";
			var first=false;
			for(var n in this.fontDef){
				if(this.fontDef[n]){
					if(!first){
						this.fontString+=" ";
					}else{
						first=true;
					}
					this.fontString+=this.fontDef[n];
				}
			}
		};

		STX.Drawing.annotation.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.font=STX.clone(this.stx.currentVectorParameters.annotation.font);
		};

		STX.Drawing.annotation.prototype.measure=function(){};
		
		STX.Drawing.annotation.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);

			context.font=this.fontString;
			context.textBaseline="top";
			var x=x0;
			var y=y0;
			var w=this.w;
			var h=this.h;
			var color=this.color;
			if(color=="auto" || STX.isTransparent(color)) color=this.stx.defaultColor;
			if(this.highlighted) color=this.stx.canvasStyle("stx_highlight_vector");
			if(this.stem){
				var sx0, sx1, sy0, sy1;
				if(this.stem.d){	// absolute positioning of stem
					sx0=this.stx.pixelFromTick(this.stem.t);	// bottom of stem
					sy0=this.stx.pixelFromValueAdjusted(panel, this.stem.t, this.stem.v);
					sx1=x+w/2;	// center of text
					sy1=y+h/2;
				}else if(this.stem.x){	// stem with relative offset positioning
					sx0=x;
					sy0=y;
					x+=this.stem.x;
					y+=this.stem.y;
					sx1=x+w/2;
					sy1=y+h/2;
				}
		
				context.beginPath();
				if(this.borderColor) context.strokeStyle=this.borderColor;
				else context.strokeStyle=color;
				context.moveTo(sx0, sy0);
				context.lineTo(sx1, sy1);
				context.stroke();
			}
			if(this.highlighted){
				this.stx.canvasColor("stx_annotation_highlight_bg", context);
				context.fillRect(x, y, w, h);
			}else{
				if(this.backgroundColor){
					context.fillStyle=this.backgroundColor;
					context.fillRect(x, y, w, h);
				}else if(this.stem){	// If there's a stem then use the container color otherwise the stem will show through
					context.fillStyle=this.stx.containerColor;
					context.fillRect(x, y, w, h);
				}
			}
			if(this.borderColor){
				context.beginPath();
				context.strokeStyle=this.borderColor;
				context.rect(x, y, w, h);
				context.stroke();
			}
			//this.stx.canvasFont("stx_annotation");
			if(this.highlighted){
				this.stx.canvasColor("stx_annotation_highlight", context);
			}else{
				context.fillStyle=color;
			}
			y+=this.padding;
			for(var i=0;i<this.arr.length;i++){
				context.fillText(this.arr[i], x+this.padding, y);
				y+=this.fontSize;
			}
			context.textBaseline="alphabetic";
		};
		
		STX.Drawing.annotation.prototype.edit=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			// When mouse events are attached to the container then any dom objects on top
			// of the container will intercept those events. In particular, the textarea for
			// annotations gets in the way, so here we capture the mouseup that fires on the textarea
			// and pass it along to the kernel if necessary
			function handleTAMouseUp(stx){
				return function(e){
					if(stx.manageTouchAndMouse && STXChart.drawingLine){
						stx.mouseup(e);
					}
				};
			};
		
			function cancelAnnotation(self){
				return function(){
					self.stx.undo();
					self.stx.cancelTouchSingleClick=true;
				};
			}
			function saveAnnotation(self){
				return function(){
					if(self.ta.value=="") return;
					self.text=self.ta.value;
					self.adjust();
		
					self.stx.addDrawing(self);
					self.stx.changeOccurred("vector");
					self.stx.undo();
					self.stx.cancelTouchSingleClick=true;
				};
			};
		
			function resizeAnnotation(self){
				return function(e){
					if(e){
						var key = (window.event) ? event.keyCode : e.keyCode;
						switch(key){
							case 27:
								self.stx.undo();
								return;
						}
					}
					var stx=self.stx;
					var ta=self.ta;
					var save=stx.controls.annotationSave;
					var cancel=stx.controls.annotationCancel;
					var arr=ta.value.split('\n');
					var w=0;
					//stx.canvasFont("stx_annotation");
					stx.chart.context.font=self.fontString;
					for(var i=0;i<arr.length;i++){
						var m=stx.chart.context.measureText(arr[i]).width;
						if(m>w) w=m;
					}
					h=(arr.length+1)*(self.fontSize+3);
					if(w<50) w=50;
					ta.style.width=(w+30) + "px";	// Leave room for scroll bar
					ta.style.height=h+"px";
					var y=parseInt(STX.stripPX(ta.style.top));
					var x=STX.stripPX(ta.style.left);
					w=ta.clientWidth;
					h=ta.clientHeight;
					if(x+w+100<self.stx.chart.canvasWidth){
						save.style.top=y+"px";
						cancel.style.top=y+"px";
						save.style.left=(x+w + 10) + "px";
						cancel.style.left=(x+w + 60) + "px";
					}else if(y+h+30<self.stx.chart.canvasHeight){
						save.style.top=(y+h+10) + "px";
						cancel.style.top=(y+h+10) + "px";
						save.style.left=x + "px";
						cancel.style.left=(x+50) + "px";
					}else{
						save.style.top=(y-35) + "px";
						cancel.style.top=(y-35) + "px";
						save.style.left=x + "px";
						cancel.style.left=(x+50) + "px";
					}
				};
			}
		
			this.stx.undisplayCrosshairs();
			this.stx.editingAnnotation=true;
			this.stx.openDialog="annotation";
			if(this.ta==null){
				this.ta=document.createElement("TEXTAREA");
				this.ta.className="stx_annotation";
				this.ta.onkeyup=resizeAnnotation(this);
				this.ta.onmouseup=handleTAMouseUp(this.stx);
				this.ta.setAttribute("wrap","hard");
				if(STX.isIOS7or8) this.ta.setAttribute("placeholder","Enter Text");
				this.stx.chart.container.appendChild(this.ta);
				this.ta.style.position="absolute";
				this.ta.style.width="100px";
				this.ta.style.height="20px";
			}
			this.ta.style.font=this.fontString;
			if(this.color){
				if(this.color=="transparent" || this.color=="auto"){
					var styles=getComputedStyle(this.ta);
					if(styles && STX.isTransparent(styles["backgroundColor"])){
						this.ta.style.color=this.stx.defaultColor;
					}else{
						this.ta.style.color="#000"; // text area always has white background
					}
				}else{
					this.ta.style.color=this.color;
				}
			}
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
		
			this.ta.style.left=x0+"px";
			this.ta.style.top=y0+"px";
		
			this.stx.controls.annotationSave.style.display="inline-block";
			this.stx.controls.annotationCancel.style.display="inline-block";
			this.stx.controls.annotationSave.onclick=saveAnnotation(this);
			this.stx.controls.annotationCancel.onclick=cancelAnnotation(this);
			resizeAnnotation(this)();
			var ta=this.ta;
			var timeout=0;
			if(STX.ipad) timeout=400;
			//if(!STX.isIOS7or8){
				STX.focus(ta, timeout);
			//}
			if(STX.isAndroid){
				// Android soft keyboard will cover up the lower half of the browser so if our
				// annotation is in that area we temporarily scroll the chart container upwards
				// The style.bottom of the chart container is reset in abort()
				this.priorBottom=this.stx.chart.container.style.bottom;
				var keyboardHeight=400; // hard coded. We could get this by measuring the change in innerHeight but timing is awkward because the keyboard scrolls
				var screenLocation=this.stx.resolveY(y0)+100; // figure 100 pixels of height for text
				if(screenLocation>STX.pageHeight()-keyboardHeight){
					var pixelsFromBottomOfScreen=STX.pageHeight()-screenLocation;
					var scrolledBottom=keyboardHeight-pixelsFromBottomOfScreen;
					this.stx.chart.container.style.bottom=scrolledBottom+"px";
				}
			}
		};
		
		STX.Drawing.annotation.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			this.copyConfig();
			this.getFontString();
			this.p0=[tick,value];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.v0=value;
			this.adjust();
		
			this.edit(context);
			return false;
		};

		STX.Drawing.annotation.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			var tickDiff=repositioner.tick-tick;
			var valueDiff=repositioner.value-value;
			this.p0=[repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.v0=this.p0[1];
			this.render(context);
		};

		STX.Drawing.annotation.prototype.intersected=function(tick, value, box){
			var panel=this.stx.panels[this.panelName];
			if(!this.p0) return null; // in case invalid drawing (such as from panel that no longer exists)
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
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
			return false;
			//return this.boxIntersection(tick, value);
		};
		
		STX.Drawing.annotation.prototype.abort=function(){
			this.stx.controls.annotationSave.style.display="none";
			this.stx.controls.annotationCancel.style.display="none";
			if(this.ta) this.stx.chart.container.removeChild(this.ta);
			this.ta=null;
			this.stx.openDialog="";
			this.stx.showCrosshairs();
			document.body.style.cursor="crosshair";
			this.stx.editingAnnotation=false;
			STX.clearCanvas(this.stx.chart.tempCanvas, this);
			if(STX.isAndroid){
				this.stx.chart.container.style.bottom=this.priorBottom;
			}
			STX.fixScreen();
		};
		
		/**
		 * Reconstruct an annotation
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The text color for the annotation
		 * @param {string} pnl The panel name
		 * @param {string} d0 String form date or date time
		 * @param {number} v0 The value at which to position the annotation
		 * @param {string} text The annotation text (escaped using escape())
		 * @param {string} bc Border color
		 * @param {string} bg Background color
		 * @memberOf STX.Drawing.annotation
		 */
		STX.Drawing.annotation.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.d0=obj["d0"];
			this.v0=obj["v0"];
			this.text=unescape(obj["text"]);
			this.stem=obj.stem;
			this.borderColor=obj.bc;
			this.backgroundColor=obj.bg;
			this.font=STX.replaceFields(obj["fnt"], {"st":"style","sz":"size","wt":"weight","fl":"family"});
			if(!this.font) this.font={};
			this.adjust();
		};
		
		STX.Drawing.annotation.prototype.serialize=function(){
			var obj={
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				d0:this.d0,
				v0:this.v0,
				text:escape(this.text)
			};
			if(this.font){
				var fnt=STX.removeNullValues(STX.replaceFields(this.font, {"style":"st","size":"sz","weight":"wt","family":"fl"}));
				if(!STX.isEmpty(fnt)) obj.fnt=fnt;
			}
			if(this.stem){
				obj["stem"]={
					"d": this.stem.d,
					"v": this.stem.v,
					"x": this.stem.x,
					"y": this.stem.y
				};
			}
			if(this.borderColor) obj["bc"]=this.borderColor;
			if(this.backgroundColor) obj["bg"]=this.backgroundColor;
		
			return obj;
		};
		
		STX.Drawing.annotation.prototype.adjust=function(){
			this.getFontString();
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.arr=this.text.split('\n');
			var w=0;
			this.stx.chart.context.font=this.fontString;
			//this.stx.canvasFont("stx_annotation");
			for(var i=0;i<this.arr.length;i++){
				var m=this.stx.chart.context.measureText(this.arr[i]).width;
				if(m>w) w=m;
			}
			//this.fontSize=this.stx.getCanvasFontSize("stx_annotation");
			this.fontSize=STX.stripPX(this.fontDef.size);
			h=this.arr.length*this.fontSize;
			if(STX.touchDevice) h+=5;
			this.w=w+(this.padding*2);
			this.h=h+(this.padding*2);
			var x1=this.stx.pixelFromTick(this.p0[0], panel.chart)+w;
			var y1=this.stx.pixelFromPrice(this.p0[1], panel)+h;
			this.p1=[this.stx.tickFromPixel(x1, panel.chart), this.stx.valueFromPixel(y1, panel)];
			if(this.stem){
				if(this.stem.d) this.stem.t=this.stx.tickFromDate(this.stem.d, panel.chart);
			}
		};
		
		
		/**
		 * Line drawing tool. A line is a vector defined by two points that is infinite in both directions.
		 * @constructor
		 * @name  STX.Drawing.line
		 */
		STX.Drawing.line=function(){
			this.name="line";
			this.dragToDraw=false;
		};
		
		STX.Drawing.line.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.line.prototype.calculateOuterSet=function(panel){
			if(this.p0[0]==this.p1[0] || this.p0[1]==this.p1[1] || this.stx.isDailyInterval(this.stx.layout.interval)){
				return;
			}
		
			var vector={
					x0:this.p0[0],
					y0:this.p0[1],
					x1:this.p1[0],
					y1:this.p1[1]
			};
			if(vector.x0>vector.x1){
				vector={
						x0:this.p1[0],
						y0:this.p1[1],
						x1:this.p0[0],
						y1:this.p0[1]
				};
			}
		
			var earlier=vector.x0-1000;
			var later=vector.x1+1000;
		
			this.v0B=STX.yIntersection(vector, earlier);
			this.v1B=STX.yIntersection(vector, later);
			this.d0B=this.stx.dateFromTick(earlier, panel.chart);
			this.d1B=this.stx.dateFromTick(later, panel.chart);
		};
		
		STX.Drawing.line.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.penDown=true;
				return false;
			}
			this.p1=[tick,value];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
			this.v0=this.p0[1];
			this.v1=this.p1[1];
			this.calculateOuterSet(panel);
			this.penDown=false;
			return true;	// kernel will call render after this,
		};
		
		/**
		 * Reconstruct a line
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The line color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} v1 Value (price) for the second point
		 * @param {number} d0 Date (string form) for the first point
		 * @param {number} d1 Date (string form) for the second point
		 * @memberOf STX.Drawing.line
		 */
		STX.Drawing.line.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.v0=obj["v0"];
			this.v1=obj["v1"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			if(obj["d0B"]){
				this.d0B=obj["d0B"];
				this.d1B=obj["d1B"];
				this.v0B=obj["v0B"];
				this.v1B=obj["v1B"];
			}
			this.adjust();
		};
		
		STX.Drawing.line.prototype.serialize=function(){
			var obj={
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				v0:this.v0,
				v1:this.v1
			};
			if(this.d0B){
				obj.d0B=this.d0B;
				obj.d1B=this.d1B;
				obj.v0B=this.v0B;
				obj.v1B=this.v1B;
			}
			return obj;
		};
		
		STX.Drawing.line.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d1, panel.chart), this.v1];
			// Use outer set if original drawing was on intraday but now displaying on daily
			if(this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B){
				this.p0=[this.stx.tickFromDate(this.d0B, panel.chart), this.v0B];
				this.p1=[this.stx.tickFromDate(this.d1B, panel.chart), this.v1B];
			}
		};
		
		/**
		 * Ray drawing tool. A ray is defined by two points. It travels infinitely past the second point.
		 * See {@link STX.Drawing.line}
		 * @constructor
		 * @name  STX.Drawing.ray
		 */
		STX.Drawing.ray=function(){
			this.name="ray";
		};
		
		STX.Drawing.ray.stxInheritsFrom(STX.Drawing.line);
		
		STX.Drawing.ray.prototype.calculateOuterSet=function(panel){
			if(this.p0[0]==this.p1[0] || this.p0[1]==this.p1[1] || this.stx.isDailyInterval(this.stx.layout.interval)){
				return;
			}
		
			var vector={
					x0:this.p0[0],
					y0:this.p0[1],
					x1:this.p1[0],
					y1:this.p1[1]
			};
		
			var endOfRay=vector.x1+1000;
			if(vector.x0>vector.x1){
				endOfRay=vector.x1-1000;
			}
		
		
			this.v0B=this.v0;
			this.v1B=STX.yIntersection(vector, endOfRay);
			this.d0B=this.d0;
			this.d1B=this.stx.dateFromTick(endOfRay, panel.chart);
		};
		
		STX.Drawing.ray.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d1, panel.chart), this.v1];
			// Use outer set if original drawing was on intraday but now displaying on daily
			if(this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B){
				this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
				this.p1=[this.stx.tickFromDate(this.d1B, panel.chart), this.v1B];
			}
		};
		
		
		/**
		 * Horizontal line drawing tool. The horizontal line extends infinitely in both directions.
		 * @constructor
		 * @name  STX.Drawing.horizontal
		 */
		STX.Drawing.horizontal=function(){
			this.name="horizontal";
			this.dragToDraw=false;
		};
		
		STX.Drawing.horizontal.stxInheritsFrom(STX.Drawing.segment);
		STX.Drawing.horizontal.prototype.measure=function(){};
		
		STX.Drawing.horizontal.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			this.v0=value;
			this.d0=this.stx.dateFromTick(tick, panel.chart);
			//this.adjust(); // moved to drawingClick - gus
			return true;	// kernel will call render after this,
		};
		
		
		/**
		 * Reconstruct a horizontal
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The line color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} d0 Date (string form) for the first point
		 * @memberOf STX.Drawing.horizontal
		 */
		STX.Drawing.horizontal.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.v0=obj["v0"];
			this.d0=obj["d0"];
			this.axisLabel=obj["al"];
			this.adjust();
		};
		
		STX.Drawing.horizontal.prototype.serialize=function(){
			var obj={
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				v0:this.v0,
				d0:this.d0,
				al:this.axisLabel
			};
		
			return obj;
		};
		
		STX.Drawing.horizontal.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d0, panel.chart)+100, this.v0];
		};
		
		STX.Drawing.horizontal.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
			this.axisLabel=this.stx.currentVectorParameters.axisLabel;
		};

		/**
		 * Vertical line drawing tool. The vertical line extends infinitely in both directions.
		 * See {@link STX.Drawing.segment}
		 * @constructor
		 * @name  STX.Drawing.vertical
		 */
		STX.Drawing.vertical=function(){
			this.name="vertical";
		};
		
		STX.Drawing.vertical.stxInheritsFrom(STX.Drawing.horizontal);
		STX.Drawing.vertical.prototype.measure=function(){};
		
		STX.Drawing.vertical.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d0, panel.chart), this.v0+1];
		};
		
		/**
		 * Continuous line drawing tool. Creates a series of connected line segments, each one completed with a user click.
		 * @constructor
		 * @name  STX.Drawing.continuous
		 */
		STX.Drawing.continuous=function(){
			this.name="continuous";
			this.dragToDraw=false;
		};
		
		STX.Drawing.continuous.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.continuous.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) {
				this.stx.undo();//abort
				return true;
			}
			
			this.p1=[tick,value];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
			this.v0=this.p0[1];
			this.v1=this.p1[1];
		
			// render a segment
			var Segment=STX.Drawing["segment"];
			var segment=new Segment;
			var obj=this.serialize(this.stx);
			segment.reconstruct(this.stx, obj);
			this.stx.addDrawing(segment);
			this.stx.changeOccurred("vector");
			this.stx.draw();
		
			this.p0=[this.p1[0], this.p1[1]];	// reset initial point for next segment, copy by value
		
			return false;
		};
		
		/**
		 * Freeform drawing tool. Set splineTension to a value from 0 to 1 (default .3). This is a dragToDraw function
		 * and automatically disables the crosshairs while enabled.
		 * @constructor
		 * @name  STX.Drawing.freeform
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
			
			if(this.penDown==false){
				this.copyConfig();
				this.startX=Math.round(this.stx.resolveX(this.stx.pixelFromTick(tick, panel.chart)));
				this.startY=Math.round(this.stx.resolveY(this.stx.pixelFromValueAdjusted(panel, tick, value)));
				this.d0=this.stx.dateFromTick(tick, panel.chart);
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
			this.d1=this.stx.dateFromTick(tick, panel.chart);
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
			function weeksInMonth(startDate,symbol){return 5;};
			function daysInWeek(startDate,symbol){return 5;};
			function daysInMonth(startDate,symbol){return 30;};
			function minPerDay(startDate,symbol){return 390;};
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
			if(intvl==0) return;
			
			var cwr=this.stx.layout.candleWidth/this.candleWidth;
			var mlt=panel.yAxis.multiplier/this.multiplier;
			var spx=this.stx.pixelFromDate(this.d0, panel.chart);
			var spy=this.stx.pixelFromValueAdjusted(panel, this.stx.tickFromDate(this.d0,panel.chart), this.v0);
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
		
			if(arrPoints.length==0) return;
			if(this.splineTension<0){
				this.stx.connectTheDots(arrPoints, color, this.name, context, panel, parameters)
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
			if(intvl==0) return;
		
			var cwr=this.stx.layout.candleWidth/this.candleWidth;
			var mlt=panel.yAxis.multiplier/this.multiplier;
			var spx=this.stx.pixelFromDate(this.d0, panel.chart);
			var spy=this.stx.pixelFromValueAdjusted(panel, this.stx.tickFromDate(this.d0,panel.chart), this.v0);
		
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
				v0:this.v0,
				int:this.interval,
				pd:this.periodicity,
				nodes:this.nodes
			};
		};
		
		/**
		 * Reconstruct a freeform drawing. It is not recommended to do this programatically.
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The line color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} cw Candle width from original drawing
		 * @param {number} mlt Y-axis multiplier from original drawing
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} d0 Date (string form) for the first point
		 * @param {number} int Interval from original drawing
		 * @param {number} pd Periodicity from original drawing
		 * @param {array} nodes An array of nodes in form [x0a,x0b,y0a,y0b, x1a, x1b, y1a, y1b, ....]
		 * @memberOf STX.Drawing.freeform
		 */
		STX.Drawing.freeform.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.candleWidth=obj["cw"];
			this.multiplier=obj["mlt"];
			this.d0=obj["d0"];
			this.v0=obj["v0"];
			this.interval=obj["int"];
			this.periodicity=obj["pd"];
			this.nodes=obj["nodes"];
			this.adjust();
		};
		
		//@proprietary ChartIQ drawing tool
		STX.Drawing.projection=function(){
			this.name="projection";
			this.arr=[];
			this.intersect=0;
			this.chartsOnly=true;
		};
		
		STX.Drawing.projection.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.projection.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			if(this.arr.length<2) return;
			var color=this.color;
			var hcolor=this.stx.getCanvasColor("stx_highlight_vector");
		
			var parameters={
					pattern: this.pattern,
					lineWidth: this.lineWidth
			};
		
			var x0=this.stx.pixelFromDate(this.arr[0][0], panel.chart);
			var y0=this.stx.pixelFromPriceTransform(this.arr[0][1], panel);
			for(var i=1;i<this.arr.length;i++){
				var x1=this.stx.pixelFromDate(this.arr[i][0], panel.chart);
				var y1=this.stx.pixelFromPriceTransform(this.arr[i][1], panel);
				var c=color;
				if(this.highlighted && i>=this.intersect) c=hcolor;
				this.stx.plotLine(x0, x1, y0, y1, c, "segment", context, true, parameters);
				x0=x1;
				y0=y1;
			}
		};
		
		STX.Drawing.projection.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(this.arr.length==0){
				var q=this.stx.chart.dataSet[this.stx.chart.dataSet.length-1];
				this.arr.push([q.Date, q.Close]);
				this.freeze=this.stx.chart.scroll;
				this.freezeTick=this.stx.chart.dataSet.length;
			}else{
				if(tick<=this.stx.tickFromDate(this.arr[this.arr.length-2][0], panel.chart)) return false;
			}
			this.arr.push([this.stx.dateFromTick(tick, panel.chart), value]);
			return false;
		};
		
		STX.Drawing.projection.prototype.move=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			this.arr[this.arr.length-1]=[this.stx.dateFromTick(tick, panel.chart), value];
			var stx=this.stx;
			stx.createDataSet();
			this.stx.chart.scroll=this.freeze+(this.stx.chart.dataSet.length-this.freezeTick);
			this.stx.draw();
			this.render(context);
		};
		
		STX.Drawing.projection.prototype.intersected=function(tick, value, box){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			for(var i=1;i<this.arr.length;i++){
				var x0=this.stx.tickFromDate(this.arr[i-1][0], panel.chart);
				var x1=this.stx.tickFromDate(this.arr[i][0], panel.chart);
				var y0=this.arr[i-1][1];
				var y1=this.arr[i][1];
				var inter=STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, x0, y0, x1, y1, "segment");
				if(inter){
					this.intersect=i;
					return true;
				}
			}
			return false;
		};
		
		STX.Drawing.projection.prototype.measure=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			if(this.intersect){
				var x0=this.stx.tickFromDate(this.arr[this.intersect-1][0], panel.chart);
				var x1=this.stx.tickFromDate(this.arr[this.intersect][0], panel.chart);
				var y0=this.arr[this.intersect-1][1];
				var y1=this.arr[this.intersect][1];
				this.stx.setMeasure(y0, y1, x0, x1);
			}else{
				var x0=this.stx.tickFromDate(this.arr[this.arr.length-2][0], panel.chart);
				var x1=this.stx.tickFromDate(this.arr[this.arr.length-1][0], panel.chart);
				var y0=this.arr[this.arr.length-2][1];
				var y1=this.arr[this.arr.length-1][1];
				this.stx.setMeasure(y0, y1, x0, x1);
			}
		};
		
		STX.Drawing.projection.prototype.adjust=function(){};
		
		STX.Drawing.projection.prototype.abort=function(force){
			function killme(stx, result){
				stx.createDataSet();
				stx.draw();
				return result;
			}
			// force means kill the entire projection, such as clear drawings
			if(force){
				this.arr=[];
				return killme(this.stx, false);
			}
		
			if(this.highlighted){
				// delete the highlighted section, but don't kill the entire thing
				if(this.intersect<=1){
					this.arr=[];
					return killme(this.stx, false);
				}
				this.arr=this.arr.slice(0, this.intersect);
				return killme(this.stx, true);
			}else{
				// If we aren't highlighted then just trying to end the drawing
				this.arr.pop();
				if(this.arr.length<=1){
					this.stx.chart.scroll=this.freeze;
					return killme(this.stx, false);	// Didn't actually draw anything
				}
				this.stx.addDrawing(this);	// Push ourselves into the drawing list
				this.stx.changeOccurred("vector");
				return killme(this.stx, false);
			}
		};
		
		STX.Drawing.projection.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.arr=obj["arr"];
		};
		
		STX.Drawing.projection.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				arr:this.arr
			};
		};
		
		/**
		 * Measure tool
		 * @constructor
		 * @name  STX.Drawing.measure
		 */
		STX.Drawing.measure=function(){
			this.name="measure";
			this.dragToDraw=false;
		};
		
		STX.Drawing.measure.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.measure.prototype.click=function(context, tick, value){
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.penDown=true;
				
				return false;
			}
			this.stx.undo();
			this.penDown=false;
			return true;
		};
		
		/**
		 * Ellipse drawing tool.
		 * @constructor
		 * @name  STX.Drawing.ellipse
		 */
		STX.Drawing.ellipse=function(){
			this.name="ellipse";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.ellipse.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.ellipse.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
		
		
			var left=x0-(x1-x0);
			var right=x1;
			var middle=y0;
			var bottom=y1;
			var top=y0-(y1-y0);
			var weight=(bottom-top)/6;
			var lineWidth=this.lineWidth;
			if(!lineWidth) lineWidth=1.1;
			var edgeColor=this.color;
			if(edgeColor=="auto" || STX.isTransparent(edgeColor)) edgeColor=this.stx.defaultColor;
			if(this.highlighted){
				edgeColor=this.stx.getCanvasColor("stx_highlight_vector");
				if(lineWidth==.1) lineWidth=1.1;
			}
		
			var fillColor=this.fillColor;
			context.beginPath();
			context.moveTo(left, middle);
			context.bezierCurveTo(left, bottom+weight, right, bottom+weight, right, middle);
			context.bezierCurveTo(right, top-weight, left, top-weight, left, middle);
		
			if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
				context.fillStyle=fillColor;
				context.globalAlpha=.2;
				context.fill();
				context.globalAlpha=1;
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
			context.closePath();
			if(this.highlighted){
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x1, y1, p1Fill);
			}
		};
		
		
		STX.Drawing.ellipse.prototype.intersected=function(tick, value, box){
			this.whichPoint=null;
			if(!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.pointIntersection(this.p1[0], this.p1[1], box)){
				this.highlighted="p1";
				this.whichPoint="p1";
				return {
					action: "drag",
					point: "p1"
				};
			}			var left=this.p0[0]-(this.p1[0]-this.p0[0]);
			var right=this.p1[0];
			var bottom=this.p1[1];
			var top=this.p0[1]-(this.p1[1]-this.p0[1]);

			if(tick>Math.max(left, right) || tick<Math.min(left, right)) return false;
			if(value>Math.max(top, bottom) || value<Math.min(top, bottom)) return false;
			this.highlighted=true;
			return {
				action: "move",
				p0: STX.clone(this.p0),
				p1: STX.clone(this.p1),
				tick: tick,
				value: value
			};
		};
		
		STX.Drawing.ellipse.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
		};
		
		/**
		 * Reconstruct an ellipse
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} col The border color
		 * @param {string} fc The fill color
		 * @param {string} pnl The panel name
		 * @param {string} ptrn Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} lw Optional line width. Defaults to 1.
		 * @param {number} v0 Value (price) for the center point
		 * @param {number} v1 Value (price) for the outside point
		 * @param {number} d0 Date (string form) for the center point
		 * @param {number} d1 Date (string form) for the outside point
		 * @memberOf STX.Drawing.ellipse
		 */
		STX.Drawing.ellipse.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.fillColor=obj["fc"];
			this.panelName=obj["pnl"];
			this.pattern=obj["ptrn"];
			this.lineWidth=obj["lw"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			this.v0=obj["v0"];
			this.v1=obj["v1"];
			this.adjust();
		};
		
		STX.Drawing.ellipse.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				v0:this.v0,
				v1:this.v1
			};
		};
		
		/**
		 * Fibonacci drawing tool.
		 * @constructor
		 * @name  STX.Drawing.fibonacci
		 */
		STX.Drawing.fibonacci=function(){
			this.name="fibonacci";
			//this.dragToDraw=true;
		};
		
		STX.Drawing.fibonacci.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.fibonacci.mapping={
				"trend":"t",
				"color":"c",
				"parameters":"p",
				"pattern":"pt",
				"opacity":"o",
				"lineWidth":"lw",
				"level":"l",
				"extendLeft":"e",
				"printLevels":"pl"
		};
		
		STX.Drawing.fibonacci.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.parameters=this.stx.currentVectorParameters.fibonacci;
		};
		/*
		 * Calculate the outer points of the fib series, which are used to detect highlighting
		 */
		STX.Drawing.fibonacci.prototype.setOuter=function(){
			this.outer={
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1)
			};
			var y0=this.p0[1];
			var y1=this.p1[1];
			var x0=this.p0[0];
			var x1=this.p1[0];
			var top=Math.min(y1, y0);
			var bottom=Math.max(y1, y0);
			var height=bottom-top;
			var isUpTrend=(y1-y0)/(x1-x0)>0;
		
			var min=0;
			var max=1;
			for(var i=0;i<this.parameters.fibs.length;i++){
				var fib=this.parameters.fibs[i];
				if(fib.level>=min && fib.level<=max) continue;
				var val=isUpTrend?bottom-height*fib.level:top+height*fib.level;
				var x=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, val);
				if(fib.level<min){
					min=fib.level;
					isUpTrend?(this.outer.p0[1]=val):(this.outer.p1[1]=val);
					isUpTrend?(this.outer.p0[0]=x):(this.outer.p1[0]=x);
				}else if(fib.level>max){
					max=fib.level;
					isUpTrend?(this.outer.p1[1]=val):(this.outer.p0[1]=val);
					isUpTrend?(this.outer.p1[0]=x):(this.outer.p0[0]=x);
				}
			}
		};
		
		STX.Drawing.fibonacci.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.v0=value;
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) return this.dragToDraw;
		
			this.p1=[tick,value];
			this.v1=value;
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
			this.setOuter();
			this.parameters=STX.clone(this.parameters);	// separate from the global object
			this.penDown=false;
			
			return true;	// kernel will call render after this
		};
		
		STX.Drawing.fibonacci.prototype.render=function(context){
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
			var w=context.measureText("161.8%").width;
			var minX=Number.MAX_VALUE, minY=Number.MAX_VALUE, maxX=Number.MAX_VALUE*-1, maxY=Number.MAX_VALUE*-1;
			var txtColor=this.color;
			if(txtColor=="auto" || STX.isTransparent(txtColor)) txtColor=this.stx.defaultColor;
			context.fillStyle=txtColor;
			for(var i=0;i<this.parameters.fibs.length;i++){
				var fib=this.parameters.fibs[i];
				var y=isUpTrend?bottom-height*fib.level:top+height*fib.level;
				y=Math.round(y);
				var x=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, y);
				var farX=this.stx.chart.width;
				if(this.parameters.printLevels){
					var txt=(fib.level*100)+"%";
					farX-=w;
					context.fillText(txt, farX, y);
					farX-=5;
				}else if(this.parameters.printValues){
					if(x<this.stx.chart.width){
						var v0=this.p0[1];
						var v1=this.p1[1];
						var price=v0 + ((v1-v0)*fib.level);
						if(panel.chart.transformFunc) price=panel.chart.transformFunc(this.stx, panel.chart, price);
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
				var nearX=this.parameters.extendLeft?0:x;
				var fibColor=fib.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.color;
				if(fibColor=="auto" || STX.isTransparent(fibColor)) fibColor=this.stx.defaultColor;
				this.stx.plotLine(nearX, farX, y, y, fibColor, "segment", context, panel, fib.parameters);
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
				var y=isUpTrend?bottom-height*level:top+height*level;
				y=Math.round(y);
				if(y<minY){
					minX=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, y);
					minY=y;
				}
				if(y>maxY){
					maxX=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, y);
					maxY=y;
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

		STX.Drawing.fibonacci.prototype.reposition=function(context, repositioner, tick, value){
			STX.Drawing.BaseTwoPoint.prototype.reposition.apply(this, arguments);
			this.adjust();
		};

		STX.Drawing.fibonacci.prototype.intersected=function(tick, value, box){
			//TODO, find some efficient way to allow an intersection across the entire trend line, not just between the two clicked points
			if(!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.outer.p0[0], this.outer.p0[1], this.outer.p1[0], this.outer.p1[1], "segment")){
				if(this.name!="horizontal" && this.name!="vertical"){
					if(this.pointIntersection(this.p0[0], this.p0[1], box)){
						this.highlighted="p0";
						this.whichPoint="p0";
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
					}
				}
				// This object will be used for repositioning
				this.highlighted=true;
				return {
					action: "move",
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1),
					tick: tick, // save original tick
					value: value // save original value
				};				
			}
			return null;
		};
		
		/**
		 * Reconstruct a fibonacci
		 * @param  {STXChart} stx The chart object
		 * @param  {object} obj A drawing descriptor
		 * @param {string} pnl The panel name
		 * @param {number} v0 Value (price) for the first point
		 * @param {number} v1 Value (price) for the second point
		 * @param {number} d0 Date (string form) for the first point
		 * @param {number} d1 Date (string form) for the second point
		 * @param {object} parameters Configuration parameters
		 * @param {object} parameters.trend Describes the trend line
		 * @param {string} parameters.trend.color The color for the trend line (Defaults to "auto")
		 * @param {object} parameters.trend.parameters Line description object (pattern, opacity, lineWidth)
		 * @param {array} parameters.fibs A fib description object for each fib (level, color, parameters)
		 * @param {boolean} extendLeft True to extend the fib lines to the left of the screen. Defaults to false.
		 * @param {boolean} printLevels True (default) to print text for each level
		 * @memberOf STX.Drawing.fibonacci
		 */
		STX.Drawing.fibonacci.prototype.reconstruct=function(stx, obj){
			obj=STX.replaceFields(obj, STX.reverseObject(STX.Drawing.fibonacci.mapping));
			this.stx=stx;
			this.parameters=obj["parameters"];
			if(!this.parameters) this.parameters=STX.clone(this.stx.currentVectorParameters.fibonacci);	// For legacy fibs that didn't include parameters
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			this.v0=obj["v0"];
			this.v1=obj["v1"];
			this.adjust();
		};
		
		STX.Drawing.fibonacci.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), this.v0];
			this.p1=[this.stx.tickFromDate(this.d1, panel.chart), this.v1];
			this.setOuter();
		};
		
		STX.Drawing.fibonacci.prototype.serialize=function(){
			var obj={
				name:this.name,
				parameters:this.parameters,
				pnl: this.panelName,
				col:this.color,
				d0:this.d0,
				d1:this.d1,
				v0:this.v0,
				v1:this.v1
			};
			return STX.replaceFields(obj, STX.Drawing.fibonacci.mapping);
		};
		
		// Proprietary ChartIQ drawing tool
		STX.Drawing.bellcurve=function(){
			this.name="bellcurve";
			this.profile=[];
			this.twoClicked=false;
			this.chartsOnly=true;
			//this.dragToDraw=true;
		};
		
		STX.Drawing.bellcurve.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.bellcurve.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.p0=[tick,value];
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) return this.dragToDraw;
		
			this.p1=[tick,value];
			this.d0=this.stx.dateFromTick(this.p0[0], panel.chart);
			this.d1=this.stx.dateFromTick(this.p1[0], panel.chart);
			this.twoClicked=true;
			this.penDown=false;
			
			return true;	// kernel will call render after this
		};
		
		STX.Drawing.bellcurve.prototype.profileRange=function(profile, x, right){
			if(x>=profile.length){
				profile[x]=[];
				profile[x][0]=right;
				return;
			}
			for(var y=0,l=profile[x].length;y<l;y++){
				var left=profile[x][y];
				if(left.High>=right.High && left.Low<=right.Low){			// inside
					this.profileRange(profile, x+1, right);
					return;
				}else if(right.High>left.High && right.Low<left.High && right.Low>=left.Low){ // overlap higher
					this.profileRange(profile, x+1, {"High": left.High, "Low": right.Low});
					right={"High": right.High, "Low": left.High};
				}else if(right.Low<left.Low && right.High>left.Low && right.High<=left.High){ // overlap lower
					this.profileRange(profile, x+1, {"High": right.High, "Low": left.Low});
					right={"High": left.Low, "Low": right.Low};
				}else if(left.High<right.High && left.Low>right.Low){			// engulfing
					this.profileRange(profile, x, {"High": left.Low, "Low": right.Low});
					this.profileRange(profile, x+1, {"High": left.High, "Low": left.Low});
					right={"High": right.High, "Low": left.High};
				}
			}
			profile[x][y]=right;
		};
		
		STX.Drawing.bellcurve.prototype.render=function(context){
			function calculateProfile(self, panel){
				return function(){
					self.profile=[];
					var sorted=[];
					var tick0=Math.min(self.p0[0], self.p1[0]);
					var tick1=Math.max(self.p0[0], self.p1[0]);
					if(tick1-tick0>3000) return;	// too many ticks to process
					for(var i=tick0;i<tick1;i++){
						if(i<0 || i>=panel.chart.dataSet.length) continue;
						var prices=panel.chart.dataSet[i];
						sorted.push({"High": prices.High, "Low": prices.Low});
					}
					function sortFunc(a,b){
						if(a.Low<b.Low) return -1;
						if(a.Low>b.Low) return 1;
						return 0;
					}
					sorted.sort(sortFunc);
					for(var i=0;i<sorted.length;i++){
						self.profileRange(self.profile, 0, sorted[i]);
					}
				};
			}
		
			if(!this.p1) return;
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			this.x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			if(this.profile.length==0 || !this.twoClicked){
				if(this.timer) clearTimeout(this.timer);
				this.timer=setTimeout(calculateProfile(this, panel), 20);
			}
			if(this.highlighted){
				context.fillStyle=this.stx.getCanvasColor("stx_highlight_vector");
				context.globalAlpha=.5;
			}else{
				context.fillStyle=this.color;
				if(STX.isTransparent(context.fillStyle)) context.fillStyle=this.stx.defaultColor;
				context.globalAlpha=.5;
			}
			var cw=this.stx.layout.candleWidth;
			context.beginPath();
			for(var x=0;x<this.profile.length;x++){
				for(var y=0;y<this.profile[x].length;y++){
					var range=this.profile[x][y];
					var y0=this.stx.pixelFromPrice(range.High, panel);
					var y1=this.stx.pixelFromPrice(range.Low, panel);
					var x0=Math.min(this.x0,this.x1) + x*cw;
					var x1=x0 + Math.round(cw*.75);
					context.moveTo(x0, y0);
					context.lineTo(x1, y0);
					context.lineTo(x1, y1);
					context.lineTo(x0, y1);
					context.lineTo(x0, y0);
				}
			}
			context.fill();
			context.closePath();
			context.globalAlpha=1;
		};
		
		STX.Drawing.bellcurve.prototype.intersected=function(tick, value, box){
			if(tick<Math.max(this.p0[0],this.p1[0]) && tick>Math.min(this.p0[0],this.p1[0])) return true;
			return false;
		};
		
		STX.Drawing.bellcurve.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
		};
		
		STX.Drawing.bellcurve.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.p0=[this.stx.tickFromDate(this.d0, panel.chart), 0];
			this.p1=[this.stx.tickFromDate(this.d1, panel.chart), 0];
		};
		
		STX.Drawing.bellcurve.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj["col"];
			this.panelName=obj["pnl"];
			this.d0=obj["d0"];
			this.d1=obj["d1"];
			this.adjust();
			this.twoClicked=true;
		};
		
		STX.Drawing.bellcurve.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				d0:this.d0,
				d1:this.d1
			};
		};
		
		
		/**
		 * Comparison namespace
		 * @namespace
		 * @name  STX.Comparison
		 */
		STX.Comparison=function(){};	// Create namespace
		
		STX.Comparison.mouseHasMoved=false;
		
		/**
		 * Transform function for comparison charting
		 * @param  {STXChart} stx     The charting object
		 * @param  {STXChart.Chart} chart   The specific chart
		 * @param  {number} price The price to transform
		 * @return {number}         The transformed price (into percentage)
		 * @memberOf STX.Comparison
		 */
		STX.Comparison.priceToPercent=function(stx, chart, price){
			return Math.round(((price-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000)/10000;
		};
		
		/**
		 * Untransform function for comparison charting
		 * @param  {STXChart} stx     The charting object
		 * @param  {STXChart.Chart} chart   The specific chart
		 * @param  {number} percent The price to untransform
		 * @return {number}         The untransformed price
		 * @memberOf STX.Comparison
		 */
		STX.Comparison.percentToPrice=function(stx, chart, percent){
			return STX.Comparison.baseline*(1+(percent/100));
		};
		
		STX.Comparison.stopSort=function(lhs, rhs){
			return lhs-rhs;
		};
		
		STX.Comparison.createComparisonSegmentInner=function(stx, chart){
			if(!chart.isComparison) return false;
			// create an array of the fields that we're going to compare
			var fields=[];
			for(var field in chart.series){
				if(chart.series[field].parameters.isComparison){
					fields.push(field);
				}
			}
			var priceFields=["Close","Open","High","Low","iqPrevClose"];
		
			chart.dataSegment=[];
			var firstQuote=null;
			var firstTick=chart.dataSet.length - chart.scroll;
			var lastTick=firstTick+chart.maxTicks;
		
			// Create the list of displayable comparison stops
			var stopPointer=0;
			var stops=[];
			for(var i=0;i<stx.drawingObjects.length;i++){
				var drawing=stx.drawingObjects[i];
				if(drawing.name=="comparison_stop")
					if(drawing.tick>firstTick && drawing.tick<=lastTick)
						stops.push(drawing.tick);
			}
			stops.sort(STX.Comparison.stopSort);
			for(var i=0;i<=chart.maxTicks;i++){
				if(i==chart.maxTicks) i=-1;  //go back and revisit the tick before the first
				position=firstTick + i;
				if(position<chart.dataSet.length && position>=0){
					var quote=chart.dataSet[position];
					if(!firstQuote){
						firstQuote=STX.clone(quote);
					}
		
					// iterate through the fields calculating the percentage gain/loss
					// We store the results in the "transform" subobject of the data set
					// Note we inline the math calculation to save overhead of JS function call
					if(!quote.transform) quote.transform={
						"cache": {},
						"DT": quote.DT,
						"Date": quote.Date
					};
					STX.Comparison.baseline=firstQuote.Close;
					for(var j=0;j<priceFields.length;j++){
						var field=priceFields[j];
						if(quote[field] || quote[field]==0)
							quote.transform[field]=Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000)/10000;	// first compute the close pct, our baseline
					}
		
					var s=stx.layout.studies;
					if(s){
						for(var n in s){
							var sd=s[n];
							if(stx.panels[sd.panel].name!=sd.chart.name) continue;
							for(var field in sd.outputMap){
								if(quote[field] || quote[field]==0)
									quote.transform[field]=Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000)/10000;	// first compute the close pct, our baseline
							}
							if(sd.referenceOutput && quote[sd.referenceOutput + " " + sd.name]!=null)
								quote.transform[sd.referenceOutput + " " + sd.name]=Math.round(((quote[sd.referenceOutput + " " + sd.name]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000)/10000;	// first compute the close pct, our baseline
						}
					}
					
					for(var j in stx.plugins){
						var plugin=stx.plugins[j];
						if(!plugin.transformOutputs) continue;
						for(var field in plugin.transformOutputs){
							if(quote[field] || quote[field]==0)
								quote.transform[field]=Math.round(((quote[field]-STX.Comparison.baseline)/STX.Comparison.baseline*100)*10000)/10000;	// first compute the close pct, our baseline
						}
					}

					// Reset baseline for each series at each stop
					var createAStop=false;
					if(stops && stopPointer<stops.length){
						if(position===stops[stopPointer]){
							createAStop=true;
							stopPointer++;
						}
					}
					var mouseStop=null;
					if(stx.activeDrawing && stx.activeDrawing.name=="comparison_stop"){
						mouseStop=stx.activeDrawing.tick;
					}
					if(createAStop || position==mouseStop){
						for(var j=0;j<fields.length;j++){
							var field=fields[j];
							var current=quote[field];
							firstQuote[field]=current/(1+(quote.transform.Close/100));
						}
					}
		
					// Transform the series comparisons to percent
					for(var j=0;j<fields.length;j++){
						var field=fields[j];
						var current=quote[field];
						if(current || current==0){	// Skip blanks
							var baseline=firstQuote[field];
							if(!baseline && baseline!=0){	// This takes care of a stock that starts part way through the comparison
																			// assumes the the quote.comparison.Close has already been calculated and sets us at that value
								firstQuote[field]=baseline=current/(1+(quote.transform.Close/100));
							}
							quote.transform[field]=Math.round(((current-baseline)/baseline*100)*10000)/10000;
						}
					}
					chart.dataSegment.push(quote);
				}else if(position<0){
					chart.dataSegment.push(null);
				}
				if(i<0) break;  //we revisited tick before first so we are done
			}
			stx.clearPixelCache();
			return true;
		};
		
		/**
		 * Creates the comparison lines. Comparison charts use a transform to transform the y-axis to percentages.
		 * @memberOf STX.Comparison
		 */
		STX.Comparison.createComparisonSegment=function(){
			for(var chartName in this.charts){
				var chart=this.charts[chartName];
				if(chart.isComparison)
					STX.Comparison.createComparisonSegmentInner(this, chart);
			}
		};
		
		/**
		 * Formats the percentage values on the comparison chart
		 * @param  {STXChart} stx   The chart object
		 * @param  {STXChart.Panel} panel The panel
		 * @param  {number} price The percentage (whole number)
		 * @return {string}       The percentage formatted as a percent (possibly using localization if set in stx)
		 * @memberOf STX.Comparison
		 */
		STX.Comparison.priceFormat=function(stx, panel, price){
			if(price==null || typeof price=="undefined") return "";
		    var priceTick=panel.yAxis.priceTick;
			if(stx.internationalizer){
		  	    if(priceTick>=1) price=stx.internationalizer.percent0.format(price/100);
		        else if(priceTick>=.1) price=stx.internationalizer.percent1.format(price/100);
		        else if(priceTick>=.01) price=stx.internationalizer.percent2.format(price/100);
		        else if(priceTick>=.001) price=stx.internationalizer.percent3.format(price/100);
		        else price=stx.internationalizer.percent4.format(price);
		
		    }else{
			    if(priceTick>=1) price=price.toFixed(0) + "%";
		        else if(priceTick>=.1) price=price.toFixed(1) + "%";
		        else if(priceTick>=.01) price=price.toFixed(2) + "%";
		        else if(priceTick>=.001) price=price.toFixed(3) + "%";
		        else price=price.toFixed(4) + "%";
		    }
		    if(parseFloat(price)==0 && price.charAt(0)=="-"){	// remove minus sign from -0%, -0.0%, etc
		    	price=price.substring(1);
		    }
			return price;
		};
		/**
		 * Creates and maintains correlation coefficient panels. Called from STX.Comparison.add but could be called from elsewhere as well.
		 * @param {object} stx           The chart object
		 * @param {string} symbol The symbol to correlate
		 * @private
		 */
		STX.Comparison.correlate=function(stx, symbol){
			
			if(!STX.Comparison.requestCorrelation || correlationPeriod<=0) return;
			var correlationPeriod=parseInt($$$(".stxCorrelate .stx-input-field").value,10);
			
			var corrPanel=stx.panels[STX.Comparison.correlationPanel+" ("+correlationPeriod+")"];
			var inputs={"id":STX.Comparison.correlationPanel+" ("+correlationPeriod+")", "Period": correlationPeriod, "Compare To": []};
			var outputs={};
			var panelName=null;
			if(corrPanel){
				for(var i=0;i<stx.layout.studies[corrPanel.name].inputs["Compare To"].length;i++){
					inputs["Compare To"].push(stx.layout.studies[corrPanel.name].inputs["Compare To"][i]);
				}
				for(var o in stx.layout.studies[corrPanel.name].outputs){
					outputs[o]=stx.layout.studies[corrPanel.name].outputs[o];
				}
				panelName=corrPanel.name;
			}
			inputs["Compare To"].push(symbol);
			outputs["Result "+symbol]=STX.Comparison.colorSelection;
			STX.Studies.addStudy(stx, "correl", inputs, outputs, null, panelName);

			for(var panel in stx.panels){
				if(stx.panels[panel].name.indexOf(STX.Comparison.correlationPanel)==0) {
					var compareArray=stx.layout.studies[stx.panels[panel].name].inputs["Compare To"];
					for(var i=0;i<compareArray.length;i++){
						if(compareArray[i]==symbol) {
							stx.layout.studies[stx.panels[panel].name].outputs["Result "+symbol]=STX.Comparison.colorSelection;
						}
					}
				}
			}
		};
		
		/**
		 * Turns on and off the checkbox for generating correlation coefficient
		 * @memberOf STX.Comparison
		 */
		STX.Comparison.toggleCorrelate=function(stx){
			STX.Comparison.requestCorrelation=!STX.Comparison.requestCorrelation;
			var display=$$$(".stxCorrelate .stx-checkbox");
			if(display) {
				STX.unappendClassName(display,(!STX.Comparison.requestCorrelation).toString());
				STX.appendClassName(display,STX.Comparison.requestCorrelation.toString());
			}
		};
		/**
		 * Turns comparison charting on or off and sets the transform
		 * @param {STXChart} stx   The chart object
		 * @param {STXChart.Chart} chart The specific chart for comparisons
		 * @param {boolean} onOff Turn on or off
		 * @memberOf STXChart
		 */
		STXChart.prototype.setComparison=function(stx, chart, onOff){
			if(!chart.isComparison && onOff){
				stx.setTransform(chart, STX.Comparison.priceToPercent, STX.Comparison.percentToPrice);
				chart.panel.yAxis.priceFormatter=STX.Comparison.priceFormat;
				chart.panel.yAxis.whichSet="dataSegment";
			}else if(chart.isComparison && !onOff){
				stx.unsetTransform(chart);
				chart.panel.yAxis.priceFormatter=null;
				chart.panel.yAxis.whichSet="dataSet";
			}
			chart.isComparison=onOff;
		};
		
		STX.Comparison.startPlugin=function(){
			STXChart.prototype.prepend("createDataSegment", STX.Comparison.createComparisonSegment);
		};
		
		
		STX.Drawing.comparison_stop=function(){
			this.name="comparison_stop";
			this.panel=null;
		};
		
		STX.Drawing.comparison_stop.stxInheritsFrom(STX.Drawing);
		
		STX.Drawing.comparison_stop.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.tick=this.stx.tickFromDate(this.d0, panel.chart);
		};
		
		STX.Drawing.comparison_stop.prototype.move=function(context, tick, value){
			this.tick=tick;
			STX.Comparison.mouseHasMoved=true;
			this.stx.draw();
		};
		
		STX.Drawing.comparison_stop.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var chart=panel.chart;
			if(!chart.isComparison) return;	// Only display the stops when comparison is enabled
			var yAxis=panel.yAxis;
			var stx=this.stx;
			var x=Math.round(stx.pixelFromTick(this.tick, chart))+.5;
			var color=stx.defaultColor;
			if(this.highlighted){
				color=stx.getCanvasColor("stx_highlight_vector");
			}
			stx.chart.context.stxLine(x, panel.top+yAxis.topOffset, x, panel.bottom-yAxis.bottomOffset, color, 1, .5, [10,10]);
		};
		
		STX.Drawing.comparison_stop.prototype.abort=function(){
		};
		
		STX.Drawing.comparison_stop.prototype.intersected=function(tick, value, box){
			if(this.tick>=box.x0 && this.tick<=box.x1) return true;
			return false;
		};
		
		STX.Drawing.comparison_stop.prototype.highlight=function(highlighted){	// return true if the highlighting status changes
			if(this.highlighted!=highlighted){
				this.highlighted=highlighted;
				return true;
			}
			return false;
		};
		
		STX.Drawing.comparison_stop.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			// Don't actually create the first stop until the user has moused around
		    // This way the render will be in effect automatically
			if(STX.Comparison.mouseHasMoved){
				this.tick=tick;
				this.d0=this.stx.dateFromTick(this.tick, panel.chart);
			}else{
		        return false;
		    }
		    var stx=this.stx;
		    // immediately shut off comparison stop drawing after the first stop
		    // use setTimeout so that the current thread can finish creating the drawing
		    // object before we change activeDrawing
		    setTimeout(function(){
		        STX.Drawing.comparison_stop.stop(stx);
		    },0);
			return true;
		};
		
		STX.Drawing.comparison_stop.start=function(stx, chart){
			STX.Comparison.vectorType=stx.currentVectorParameters.vectorType;
			STX.Comparison.mouseHasMoved=false;
			stx.changeVectorType("comparison_stop");
			stx.drawingClick(chart.panel, 0, 0);
		};
		
		STX.Drawing.comparison_stop.clear=function(stx, chart){
			if(stx.activeDrawing && stx.activeDrawing.name=="comparison_stop"){
				STX.Drawing.comparison_stop.stop(stx);
			}
			var panel=chart.panel;
			var i=0;
			while(i<stx.drawingObjects.length){
				var drawing=stx.drawingObjects[i];
				if(drawing.name=="comparison_stop" && drawing.panelName==panel.name){
					drawing.abort(true);
					stx.undoStamp();
					stx.drawingObjects.splice(i,1);
					continue;
				}
				i++;
			}
			stx.changeOccurred("vector");
			stx.draw();
		};
		
		STX.Drawing.comparison_stop.stop=function(stx){
			stx.currentVectorParameters.vectorType=STX.Comparison.vectorType;
			stx.undo();
		};
		
		STX.Drawing.comparison_stop.prototype.serialize=function(){
			var obj={
					name:this.name,
					pnl: this.panelName,
					d0:this.d0
				};
			return obj;
		};
		
		STX.Drawing.comparison_stop.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.panelName=obj["pnl"];
			this.d0=obj["d0"];
			this.adjust();
		};
		
		/**
		 * Marker base object. Derive your own marker object from this base object using stxInheritFrom.
		 * @constructor
		 * @name  STX.Markers
		 */
		STX.Markers=function(){
			this.markerHolder=null;
			this.redrawTimeout=null;
			this.Construct();
		};
		
		STX.Markers.currentZindex=1;
		
		/**
		 * Sets up a marker holder to receive markers.
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.reset=function(){
			this.markers=[];
			if(!this.panel.markerHolder){
				this.panel.markerHolder=document.createElement("DIV");
				this.panel.markerHolder.style.position="absolute";
				this.panel.markerHolder.style.left="0px";
				this.panel.markerHolder.style.overflow="hidden";
				this.panel.markerHolder.style.zIndex=1;	// This will be below the crosshairs and other chart navigational divs
				this.stx.chart.container.appendChild(this.panel.markerHolder);
				this.stx.adjustPanelPositions();
			}
		};
		
		/**
		 * Clears all markers for this marker object.
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.clear=function(){
			if(this.panel.markerHolder){
				this.stx.chart.container.removeChild(this.panel.markerHolder);
				this.panel.markerHolder=null;
			}
			this.reset();
		};
		
		
		/**
		 * Positions a marker. The date will determine the relative x-axis positioning.
		 * For efficiency, markers are kept sorted by tick from left to right
		 * @param  {HTMLELement} node The marker to place
		 * @param  {Date} date The JavaScript date where to place the marker
		 * @return {object}      Returns a marker
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.placeMarker=function(node, date){
			var stx=this.stx;
			function incrementZIndex(e){
				if(marker.stem) marker.stem.style.zIndex=STX.Markers.currentZindex;
				marker.node.style.zIndex=STX.Markers.currentZindex++;
			}
			function takeFocus(e){
				incrementZIndex(e);
				stx.openDialog="marker";
				stx.undisplayCrosshairs();
			}
			function releaseFocus(e){
				stx.openDialog="";
				stx.doDisplayCrosshairs();
			}
		
			var marker={
					node: node,
					date: date
			};
			node.style.display="none";
			if(this.drawStems){
				var stem=document.createElement("DIV");
				stem.className=this.stemClass;
				stem.style.position="absolute";
				stem.style.display="none";
				marker.stem=stem;
			}
		
			if(this.focus){
				if(!STX.android && !STX.ipad && !STX.iphone){
					marker.node.addEventListener("mouseover", (function(node, stx){return takeFocus;})(marker.node, stx));
					marker.node.addEventListener("mouseout", (function(node, stx){return releaseFocus;})(marker.node, stx));
				}else{
					marker.node.addEventListener("touchstart", (function(node){return incrementZIndex;})(marker));
				}
			}else if(this.hover){
				if(STX.ipad || STX.iphone){
					marker.node.addEventListener("touchstart",(function(node){return incrementZIndex;})(marker));
				}else{
					marker.node.addEventListener("mouseover", (function(node){return incrementZIndex;})(marker));
				}
			}
		
			this.markers.push(marker);
			node.style.position="absolute";
			this.panel.markerHolder.appendChild(node);
			if(marker.stem) this.panel.markerHolder.appendChild(marker.stem);
			this.setMarkerTick(this.panel.chart, marker);
			if(this.markers.length>1){	// keep the markers sorted!
				if(marker.tick < this.markers[this.markers.length-2].tick){
					this.sortMarkers();
				}
			}
			return marker;
		};
		
		/**
		 * Sorts the markers so that marker drawing and searching can be efficient.
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.sortMarkers=function(){
			function mySort(l, r){
				if(l.tick<r.tick) return -1;
				if(l.tick>r.tick) return 1;
				return 0;
			};
			this.markers.sort(mySort);
		};
		
		/**
		 * Determines the tick for the marker from the marker date
		 * @param {STXChart.Chart} chart  The chart
		 * @param {object} marker The marker
		 * @param {Date} marker.date The date for the marker
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.setMarkerTick=function(chart, marker){
			// TODO, use binary search for finding date
			for(var i=0;i<chart.dataSet.length;i++){
				var quotes=chart.dataSet[i];
				var qms=quotes.DT.getTime();
				var pms=qms;
				if(i>0) pms=chart.dataSet[i-1].DT.getTime();
				var dms=marker.date.getTime();
				// If the event lands on that day, or if the event landed between bars
				if(qms==dms){
					marker.tick=i;
					return;
				}else if(qms>dms && pms<dms){
					marker.tick=Math.max(i-1,0);
					return;
				}
			}
			var dt=new Date(chart.dataSet[i-1].DT);
			for(var j=chart.dataSet.length;j<chart.dataSet.length*2;j++){
				var pms=dt.getTime();
				dt=this.stx.getNextInterval(dt, this.stx.layout.periodicity);
				var qms=dt.getTime();
				var dms=marker.date.getTime();
				// If the event lands on that day, or if the event landed between bars
				if(qms==dms){
					marker.tick=j;
					return;
				}else if(qms>dms && pms<dms){
					marker.tick=Math.max(j-1,0);
					return;
				}
			}
		};
		
		/**
		 * Called from createDataSet to set marker ticks
		 * @param  {STXChart} stx The chart engine
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.createDataSet=function(stx){
			for(var j=0;j<this.markers.length;j++){
				var marker=this.markers[j];
				this.setMarkerTick(this.panel.chart, marker);
			}
		};
		
		/**
		 * Called from initializeChart to initialize the marker object
		 * @param  {STXChart} stx The charting engine
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.initializeChart=function(stx){
			this.stx=stx;
			this.panel=stx.panels[this.panelName];
			this.reset();
			this.initialize(stx);
		};
		
		STX.Markers.prototype.drawUnder=function(stx, chart){};
		
		/**
		 * <span class="animation">Animation Loop</span> 
		 * Draws the markers on the screen. Called from draw() object. This method can be throttled by setting this.transitionMS.
		 * @param  {STXChart} stx   The charting engine
		 * @param  {STXChart.Chart} chart The specific chart
		 * @memberOf STX.Markers
		 */
		STX.Markers.prototype.drawOver=function(stx, chart){
			function draw(self, stx){
				return function(){
					self.redrawTimeout=null;
					var panel=stx.panels[self.panelName];
					if(!panel) return;
					if(!panel.hidden && self.placementFunction){
						var chart=panel.chart;
						var markerSet=[];
						var firstTick=chart.dataSet.length-stx.chart.scroll;
						var lastTick=firstTick+chart.dataSegment.length;
						for(var i=0;i<self.markers.length;i++){
							var marker=self.markers[i];
							if(!marker.tick) continue;
							var node=marker.node;
							var stem=marker.stem;
							if(marker.tick>=firstTick /*&& marker.tick<=lastTick*/){
								if(node.style.display!="block"){
									node.style.display="block";
									if(stem) stem.style.display="block";
								}
								markerSet.push(marker);
							}else{
								if(node.style.display!="none"){
									node.style.display="none";
									if(stem) stem.style.display="none";
								}
							}
						}
						self.placementFunction(self, stx, panel, markerSet);
					}
				};
			}
			if(!this.redrawTimeout) this.redrawTimeout=setTimeout(draw(this, stx), this.transitionMS);
		};
		
		STX.QuoteFeed.BarChart=function(url){
			this.url=url;
			this.exchangeZones={"AX":"Australia/Sydney"};
		};
		
		/**
		 * Barchart version of quotes which uses web API to fetch data
		 * @name  Barchart
		 * @constructor
		 */

		STX.QuoteFeed.BarChart.stxInheritsFrom(STX.QuoteFeed);
		
		STX.QuoteFeed.BarChart.prototype.isBats=function(symbol){
			if(symbol.length<5) return true;
			return false;
		};
		
		STX.QuoteFeed.BarChart.prototype.isIndex=function(symbol){
			if(symbol.length && symbol[0]=='$') return true;
			return false;
		};
		
		STX.QuoteFeed.BarChart.prototype.symbology=function(symbol){
			return symbol;
		};
		
		STX.QuoteFeed.BarChart.prototype.batsOpen=function(){
			var nd=STX.getETDateTime();
			if(nd.getHours()>=17) return false;
			if(nd.getHours()<8) return false;
			return true;
		}
		
		STX.QuoteFeed.BarChart.prototype.fetch=function(params, cb){
			var url = this.url + "/getHistory.csv";

			var isbats=this.isBats(params.symbol);
			if(STXChart.isDailyInterval(params.interval)){
				url+="?type=dailyContinue";
			}else{
				if(params.extended && isbats){
					url+="?type=formTMinutes";
				}else{
					url+="?type=minutes";
				}
				url+="&interval=" + params.period;
			}
			if(params.adj==false){
				url+="&splits=false";
			}else{
				url+="&splits=true";
			}

			var myDate=new Date();
			if(params.endDate){
				myDate=params.endDate;
				if(STXChart.isDailyInterval(params.interval)){
					myDate.setDate(myDate.getDate() - 1);   // set a day back since data with end day date, 
															// 00:00 time is actually included in the results, 
															// (even though API doc says exclusive of end date) 
															// we don't want that result again

				}
				myDate=STX.convertTimeZone(myDate,null,"America/New_York");
				url+="&endDate=" + STX.yyyymmddhhmm(myDate);
				if(!params.maxRecords) params.maxRecords=20000;
			}else{
				if(params.startDate){
					var startDate=new Date(params.startDate);
					if(STXChart.isDailyInterval(params.interval)){
						startDate.setDate(startDate.getDate() + 1);   // set a day ahead, same reason as above, 00:00 is included in results. 
					}
					startDate=STX.convertTimeZone(startDate,null,"America/New_York");
					url+="&startDate=" + STX.yyyymmddhhmm(startDate);
					params.maxRecords=0;
				}else if(!params.maxRecords){
					params.maxRecords=params.ticks*3;
				}
			}
			if(params.maxRecords) url+="&maxRecords=" + params.maxRecords;

			url+="&order=asc";

			var symbol=this.symbology(params.symbol);

			if(isbats && params.update){
				if(symbol.indexOf(".BZ")==-1 && (!STX.LegacyMarket.isAfterDelayed(symbol) || params.extended) && this.batsOpen() && symbol.charAt(0)!='$')	// After 4:20 always get delayed data on refreshes
					symbol=symbol+".BZ";
			}
			url+="&symbol=" + encodeURIComponent(symbol);

			if(params.nocache) url+="&nocache";

			var self=this;
			STX.postAjax(url, null, function(status, res){
				if(status!=200){
					cb({error:status});
					return;
				}
				if(res=="\r\n"){
					cb({quotes:[]});
					return;
				}
				var res=self.process(res, params);
				
				var moreToLoad=true;
				if(!params.maxRecords || res.length<params.maxRecords){
					moreToLoad=false;
				}
				cb({quotes:res, moreAvailable:moreToLoad});
			});
		};
		
		STX.QuoteFeed.BarChart.prototype.process=function(quotes, params){
			var interval=params.interval;
			var stx=params.stx;
			var symbol=params.symbol;
			var newQuotes=[];
			var arr=quotes.split("\r\n");
			if(arr.length<2) return newQuotes;
			var fds=arr[0].split(",");
			var fieldNames={};
			var suppressVolume=(params.update && STXChart.isDailyInterval(interval));
			for (var i=0;i<fds.length;i++){
				fieldNames[fds[i]]=i;
			}
			for(var i=1;i<arr.length;i++){
				var fields=arr[i].split(',');
				if(fields.length<fds.length) continue;
				var field=fields[fieldNames["timestamp"]].replace(/"/g,"");
				if(field=="") continue;
				var bcdt=STX.strToDateTime(field);
				if(params.startDate && bcdt<params.startDate) continue;
				newQuotes.push({
					Date: STX.yyyymmddhhmm(bcdt),
					Open: parseFloat(fields[fieldNames["open"]].replace(/"/g,"")),
					High: parseFloat(fields[fieldNames["high"]].replace(/"/g,"")),
					Low: parseFloat(fields[fieldNames["low"]].replace(/"/g,"")),
					Close: parseFloat(fields[fieldNames["close"]].replace(/"/g,"")),
					Volume: (suppressVolume?0:parseFloat(fields[fieldNames["volume"]].replace(/"/g,""))),
					Adj_Close: parseFloat(fields[fieldNames["close"]].replace(/"/g,""))
				});
			}
			return newQuotes;
		};

		/**
		 * Return true if your quote feed should make an immediate refresh after initial load. For instance if your
		 * initial load is EOD and then you need to immediately load a real-time bar
		 * @param  {object} params The same parameters that are passed to fetch()
		 * @return {boolean}       Return true if a refresh is required immediately
		 * @memberOf  STX.QuoteFeed
		 * @private
		 */
		STX.QuoteFeed.prototype.requiresImmediateRefresh=function(params){
			return false;
		};

		/**
		 * Xignite version of quotes which uses web API to fetch data
		 * @name  Xignite
		 * @constructor
		 */
		STX.QuoteFeed.Xignite=function(token){
			this.token=token;
			this.exchangeZones=STX.QuoteFeed.Xignite.Utility.timeZone;
		};
		
		STX.QuoteFeed.Xignite.stxInheritsFrom(STX.QuoteFeed);

		STX.QuoteFeed.Xignite.prototype.requiresImmediateRefresh=function(params){
			return this.isBats(params.chart.symbol);
		};

		STX.QuoteFeed.Xignite.prototype.isBats=function(symbol){
			return (symbol.length<6 && symbol.indexOf(".")==-1);
		};
		
		STX.QuoteFeed.Xignite.prototype.isIndex=function(symbol){
			if(symbol && symbol.indexOf(".IND")>0) return true;
			return false;
		};
		
		STX.QuoteFeed.Xignite.prototype.symbology=function(symbol){
			return symbol;
		};
		
		STX.QuoteFeed.Xignite.prototype.batsOpen=function(){
			var nd=STX.getETDateTime();
			if(nd.getHours()>=17) return false;
			if(nd.getHours()<8) return false;
			return true;
		};
		
		STX.QuoteFeed.Xignite.prototype.fetch=function(params, cb){

			var missingBarsShutoff=true;  //not very effective unless we can fetch all of our data at once

			function toMarketTime(date,tz){
				var utcTime=new Date(date.getTime() + date.getTimezoneOffset() * 60000);
				if(tz && tz.indexOf("UTC")!=-1) return utcTime;
				else return STX.convertTimeZone(utcTime,"UTC",tz);
			}

			var isBats=this.isBats(params.symbol);
			var isIndex=this.isIndex(params.symbol);
			var isForex=STX.LegacyMarket.isForexSymbol(params.symbol);
			var isFuture=STX.LegacyMarket.isFuturesSymbol(params.symbol);
			var isDaily=STXChart.isDailyInterval(params.interval);
			var symbol=this.symbology(params.symbol);
			var expiredFuture=false;
			var marketZone=null;

			if(params.chart.loadingMore) params.loadMore=true;

			if(!this.resultsCache) this.resultsCache={};
			//initialize or don't use when loading more (since we prepend data, not replace it)
			if(!this.resultsCache[symbol] || params.loadMore || !params.totalRecords) this.resultsCache[symbol]=[];

			// Default to today
			var myDate=new Date();
			if(params.endDate){
				myDate=params.endDate;  // pointer to endDate
				if(params.loadMore) params.maxRecords=20000;
			}else if(!params.startDate){
				if(this.startDate) params.startDate=this.startDate;
				if(!params.maxRecords){
					params.maxRecords=params.ticks*3;
				}
			}
			//adjust periods to account for those where there is no market activity
			var theFactor=1;
			if(params.interval=="day") theFactor=STX.QuoteFeed.Xignite.Utility.nonMarketMaxRecordsFactor;
			else if(!isDaily) theFactor=STX.QuoteFeed.Xignite.Utility.marketClosedMaxRecordsFactor;
			//normalize ticks
			var myMaxRecords=1000;
			if(params.interval=="month"){
				console.log("Interval 'month' not supported natively by Xignite!");
			}else if(params.interval=="week"){
				console.log("Interval 'week' not supported natively by Xignite!");
			}
			if(!isDaily && params.period<10){
				myMaxRecords=Math.ceil(Math.min(Math.max(params.maxRecords*theFactor,6000),20000));
			}else{
				myMaxRecords=Math.ceil(Math.min(Math.max(params.maxRecords*theFactor,1000),20000));
			}

			var api=null;
			var arguments=null;
			var error="";

			if(isForex){
				marketZone="UTC";
				myDate=toMarketTime(myDate,marketZone);
				if(symbol.charAt(0)=="^") symbol=symbol.substr(1);
				if(symbol.substr(0,3).toUpperCase()==symbol.substr(3,3).toUpperCase()) error="Invalid Forex symbol";

				if(params.stx.quoteDriver.behavior.snapshotRefresh && myDate.getDay()!=6){
					if(STX.QuoteFeed.Xignite.getSnapshotQuote(params,symbol,isDaily,0,cb,this)) return;
				}

				var startDate=myDate;
				if(!params.startDate && params.maxRecords){  //must calculate startdate so we can use API
					startDate=new Date(myDate.getTime());
					if(isDaily) startDate.setDate(startDate.getDate()-myMaxRecords);
					else startDate.setMinutes(startDate.getMinutes()-myMaxRecords*(isNaN(params.interval)?params.period:params.interval));
				}else if(params.startDate){
					startDate=toMarketTime(params.startDate,marketZone);
				}
				if(!params.update && isDaily){
					if(STX.LegacyMarket.isForexMetal(params.symbol)){
						if(",USD,AUD,CAD,CHF,EUR,GBP,HKD,ZAR,".indexOf(","+symbol.substr(3,3)+",")!=-1){
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalMajorMetals);
						}else{
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalMetals);
						}
					}else{
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalForex);
					}
					arguments={
						Symbol: symbol,
						StartDate: STX.mmddyyyy(STX.yyyymmdd(startDate)),
						EndDate: STX.mmddyyyy(STX.yyyymmdd(myDate))
					};
				}else{
					if(STX.LegacyMarket.isForexMetal(params.symbol,true)){
						error="Intraday data not available.";  //intraday not available
					}else{
						if(STX.LegacyMarket.isForexMetal(params.symbol)){
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayRTMetals);				
						}else{
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayRTForex);
						}
						arguments={
							Symbol: symbol,
							StartTime: STX.mmddyyyy(STX.yyyymmdd(startDate))+" 00:00:00",
							EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
							Period: (params.interval=="hour"?params.period*60:params.period)
						};
						if(isDaily){
							api.results.time=null;
							arguments.Period=1440;
						}else if(params.update){
							if(params.startDate){
								var pStartDate=toMarketTime(params.startDate,marketZone);
								arguments.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(pStartDate).split(" ")[1]+":00";
							}
						}else{
							arguments.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(startDate).split(" ")[1]+":00";
							arguments.EndTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(myDate).split(" ")[1]+":59";
						}
					}
				}
				if(symbol.charAt(0)!="^") symbol="^"+symbol;
			}else if(isFuture){
				marketZone="America/New_York";
				myDate=toMarketTime(myDate,marketZone);
				if(symbol.charAt(0)=="/") symbol=symbol.substr(1);
				var month="0",year="0";  //default to continuous contract
				var cash=false;
				if(symbol.length>2 && !isNaN(symbol.substr(symbol.length-1))){  //includes month and year
					//get year from symbol
					symYear=parseInt(symbol.split("").reverse().join(""),10).toString().split("").reverse().join("");
					var thisYear=(toMarketTime(new Date(),marketZone)).getFullYear();
					year=thisYear+9;
					symYearAsInt=parseInt(symYear,10);
					if(symYear.length<=4 && symYearAsInt>0 && symYearAsInt<year){
						while(year%(Math.pow(10,symYear.length))!=symYearAsInt) {
							year--;
						}
						if(thisYear>year) expiredFuture=true;
					}else year="X";
					month=STX.convertFutureMonth(symbol.charAt(symbol.length-symYear.length-1));
					if(month=="Y" && symYearAsInt=="0") {
						cash=true;
						month="0";
						year="0";
						expiredFuture=true; //turn off updates for the ..Y0 futures, they don't seem to be up to date nor accessible in delayed API
					}
					symbol=symbol.substr(0,symbol.length-symYear.length-1);
				}
				if(isNaN(year) || isNaN(month)){
					error="Invalid futures symbol.";
				}else if(!isDaily){
					error="Intraday futures data is not supported.";  //intraday not available
				}else if(!params.update){
					api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalFuture);
					var endDate=new Date(myDate.getTime());
					if(year>0 && year<=endDate.getFullYear()) {
						endDate.setYear(year);
						if(month>0 && month<=endDate.getMonth()+1) {
							endDate.setDate(28);
							endDate.setMonth(month-1);
						}
					}
					if(!params.startDate && params.maxRecords){  //must calculate startdate so we can use API
						var startDate=new Date(endDate.getTime());
						if(year>0) startDate.setFullYear(Math.min(year,startDate.getFullYear()));
						startDate.setDate(startDate.getDate()-myMaxRecords);
					}else if(params.startDate){
						startDate=toMarketTime(params.startDate,marketZone);
					}
					arguments={
						Symbol: symbol,
						StartDate: (startDate?STX.mmddyyyy(STX.yyyymmdd(startDate)):null),
						EndDate: STX.mmddyyyy(STX.yyyymmdd(endDate)),
						Month: month,
						Year: year
					};
					if(year!=0 || cash){  //includes month and year
						api.method=api.method["future"];
					}else{
						api.method=api.method["commodity"];
					}
				}else if(!expiredFuture){
					api=STX.clone(STX.QuoteFeed.Xignite.Templates.DelayedFuture);
					arguments={
						Symbol: symbol,
						Month: month,
						Year: year
					};
				}
				if(symbol.charAt(0)!="/") symbol="/"+symbol;		
			}else if(isBats && params.startDate && params.update){
				marketZone="America/New_York";
				myDate=toMarketTime(myDate,marketZone);

				if(params.stx.quoteDriver.behavior.snapshotRefresh && myDate.getDay()%6){
					var newDT=new timezoneJS.Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate(), myDate.getHours(), myDate.getMinutes(), marketZone);
					if(STX.QuoteFeed.Xignite.getSnapshotQuote(params,symbol,isDaily,newDT.getTimezoneOffset(),cb,this)) return;
				}

				//We need to force the start date to be today, since Xignite may not provide BATS across days in the future
				//Besides, we shouldn't need BATS data from any day besides today anyway.
				//var startDate=STX.mmddyyyy(STX.yyyymmdd(toMarketTime(params.startDate,marketZone)));
				var startDate=STX.mmddyyyy(STX.yyyymmdd(myDate));
				api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayBATSRTEquity);
				arguments={
					Identifier: symbol,
					Period: (params.interval=="hour"?params.period*60:params.period),
					StartTime: startDate+" 00:00:00",
					EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
					IncludeExtended: (!!params.extended).toString()
				};
				if(isDaily){
					api.results.time=null;
					api.results.volume=null;
					arguments.Period=1439;
			   	}else if(params.update){
					if(params.startDate){
						var pStartDate=toMarketTime(params.startDate,marketZone);
						if(myDate.getDate()==pStartDate.getDate()){
							arguments.StartTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(pStartDate).split(" ")[1]+":00";
						}
					}
				}
			}else{
				var exchange=symbol.split(".")[1];
				if(exchange){
					if(exchange.length<4) error="Invalid Exchange";
					else marketZone=STX.QuoteFeed.Xignite.Utility.timeZone[exchange];
				}
				if(!marketZone) marketZone="America/New_York";
				myDate=toMarketTime(myDate,marketZone);
				if(!params.update && isDaily){
					if(isIndex)
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalIndex);
					else
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalEquity);
					arguments={
						Identifier: symbol,
						StartDate: (params.startDate?STX.mmddyyyy(STX.yyyymmdd(toMarketTime(params.startDate,marketZone))):null),
						EndDate: STX.mmddyyyy(STX.yyyymmdd(myDate)),
						PeriodType: STX.QuoteFeed.Xignite.Utility.xIgniteInterval(params.interval),
						Periods: myMaxRecords
					};
				}else{
					if(isIndex){
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayIndex);
					}else{
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayEquity);
					}
					var startDate=myDate;
					if(!params.startDate && params.maxRecords){  //must calculate startdate so we can use API
						startDate=new Date(myDate.getTime());
						if(isDaily) startDate.setDate(startDate.getDate()-myMaxRecords);
						else startDate.setMinutes(startDate.getMinutes()-myMaxRecords*(params.interval=="hour"?params.period*60:params.period));
					}else if(params.startDate){
						startDate=toMarketTime(params.startDate,marketZone);
					}
					arguments={
						Identifier: symbol,
						StartTime: STX.mmddyyyy(STX.yyyymmdd(startDate))+" 00:00:00",
						EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
						Period: (params.interval=="hour"?params.period*60:params.period),
						IncludeExtended: (!!params.extended && isBats).toString()
					};
					if(isDaily){
						api.results.time=null;
						arguments.Period=1440;
				   	}else if(params.update){
						if(params.startDate){
							var pStartDate=toMarketTime(params.startDate,marketZone);
							if(myDate.getDate()>=pStartDate.getDate()){
								arguments.StartTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(pStartDate).split(" ")[1]+":00";
							}
						}
					}else{
						arguments.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(startDate).split(" ")[1]+":00";
						arguments.EndTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(myDate).split(" ")[1]+":59";
					}
				}
			}

			if(api && arguments && error==""){
				STX.postAjax(STX.QuoteFeed.Xignite.Utility.url(api,arguments,params,this.token), null, function(status, res){
					if(status!=200){
						if(!params.update) {
							cb({error:status});
							return;
						}
					}
					function processData(quotes, params){
						var newQuotes=[];
						var arr=quotes.split("\r\n");
						if(arr.length<2) return newQuotes;
						var fds=arr[0].split(",");
						var fieldNames={};
						for (var i=0;i<fds.length;i++){
							fieldNames[fds[i]]=i;
						}
						var dt=null;
						var stick=false;
						var NYOffsetMap={};
						for(var i=1;i<arr.length;i++){
							var fields=arr[i].split(',');
							if(fields.length<fds.length) continue;
							//if(fields[fieldNames["Outcome"]]!="Success") continue;
							var date=fields[fieldNames[api.results.date]];
							if(date=="") continue;
							if(api.results.time){
								date+=" "+fields[fieldNames[api.results.time]];
							}
							//date is in market time.  we want to store in YYYY-MM-DDTHH:MM:SSZ format (UTC)
							//params filter dates are in local time
							//market time-market UTC offset = UTC time (for storing)
							//UTC time+local offset = local time (for filtering)
							var bcdt=STX.strToDateTime(date);
							if(bcdt.getDay()==6) continue; //filter out erroneous Saturday data
							if(!isDaily){
								var marketOffset=0;
								//TODO futures offset should be in eastern (once we have intraday programmed for them)
								if(api.results.offset){
									marketOffset=fields[fieldNames[api.results.offset]];
								}
								bcdt.setMinutes(bcdt.getMinutes()-bcdt.getTimezoneOffset()-60*marketOffset);

								/* NOTE: not sure how necessary this code is.
								 * 		even though Xignite is returning data after 4PM, it is still classified as "Market" session.
								 * 		so we may want to rip this block out in the future if there are complaints.
								 */
						
								//the hours returned from the LegacyMarket.getHours function is in New York Time.
								var hours=STX.LegacyMarket.getHours(params.symbol, params.extended);
								if(!(hours.endHour==23 && hours.endMinute==59)){
									//Calculate the timezone difference just once per day
									//Store the offsets in a map NYOffsetMap
									var key=bcdt.getFullYear().toString()+"-"+(bcdt.getMonth()+1).toString()+"-"+bcdt.getDate().toString();
									if(NYOffsetMap[key]==null){
										var sessionTest=STX.convertTimeZone(bcdt, null, "America/New_York");
										var sessionTestOffset=sessionTest.getTimezoneOffset()-bcdt.getTimezoneOffset();
										NYOffsetMap[key]=sessionTestOffset*60000;
									}
									var bcdt2=new Date(bcdt.getTime()-NYOffsetMap[key]);
									if(bcdt2.getHours()>hours.endHour || (bcdt2.getHours()==hours.endHour && bcdt2.getMinutes()>hours.endMinute))
										continue;
								}
							}
							if(params.startDate && bcdt<params.startDate) continue;
							if(params.endDate && bcdt>=params.endDate) continue;		
							if(!missingBarsShutoff && params.stx.cleanupGaps && !isDaily){
								if(dt==null){
									dt=bcdt;
								}else{
									for(var zz=0;zz<1440;zz++){
										if(!stick) dt=STX.LegacyMarket.nextPeriod(dt, params.stx.layout.interval, 1, params.stx, params.symbol);
										if(bcdt.getTime()==dt.getTime()) break;
										else if(bcdt.getTime()<dt.getTime()) {
											stick=true;  //do not advance dt any further
											break;
										}else{
											var lastQuote=newQuotes[newQuotes.length-1];
											newQuotes.push({
													DT: dt,
													Open: lastQuote.Close,
													High: lastQuote.Close,
													Low: lastQuote.Close,
													Close: lastQuote.Close,
													Volume: 0,
													Adj_Close: lastQuote.Adj_Close
											});
											stick=false;
										}
									}
								}
							}
							var ratio=parseFloat(fields[fieldNames[api.results.ratio]]);
							if(!ratio || isNaN(ratio)) ratio=1;
							var open=parseFloat(fields[fieldNames[api.results.open]]);
							var high=parseFloat(fields[fieldNames[api.results.high]]);
							var low=parseFloat(fields[fieldNames[api.results.low]]);
							var close=parseFloat(fields[fieldNames[api.results.close]]);
							//Xignite bad data fixes
							if(open==0 && high==low) open=close;
							if(high==0) high=Math.max(open,close);
							if(low==0) low=Math.min(open,close);
							if(close>0){
								newQuotes.push({
									//Date: STX.yyyymmddhhmm(bcdt),
									DT: bcdt,
									Open: open,
									High: high,
									Low: low,
									Close: close,
									Volume: (api.results.volume?parseFloat(fields[fieldNames[api.results.volume]]):0),
									Adj_Close: parseFloat(fields[fieldNames[api.results.close]])/ratio
								})
							}else if(!missingBarsShutoff && params.stx.cleanupGaps){
								var lastQuote=newQuotes[newQuotes.length-1];
								newQuotes.push({
										DT: bcdt,
										Open: lastQuote.Close,
										High: lastQuote.Close,
										Low: lastQuote.Close,
										Close: lastQuote.Close,
										Volume: 0,
										Adj_Close: lastQuote.Adj_Close
								});
							}
						}

						if(newQuotes.length){
							params.attempts=0;
							if(newQuotes[0].DT>newQuotes[newQuotes.length-1].DT) newQuotes.reverse();
						}
						if(!params.totalRecords) params.totalRecords=0;
						params.totalRecords+=newQuotes.length;
						if(!missingBarsShutoff) params.missingBarsCreated=true;
						return newQuotes;
					}
					var results=processData(res, params);

					var todayBarFetch=null;

					if(isDaily && !params.loadMore) {
						while(results.length && this.resultsCache[symbol].length){
							if(results[0].DT<this.resultsCache[symbol][this.resultsCache[symbol].length-1].DT) results.shift();  //strip dups
							else if(+results[0].DT==+this.resultsCache[symbol][this.resultsCache[symbol].length-1].DT) this.resultsCache[symbol].pop();  //replace last bar with one just fetched
							else break;
						}
						results=this.resultsCache[symbol]=this.resultsCache[symbol].concat(results);
						if(isFuture && this.resultsCache[symbol].length>1 && this.resultsCache[symbol][this.resultsCache[symbol].length-2].DT.getTime()==this.resultsCache[symbol][this.resultsCache[symbol].length-1].DT.getTime()){
							this.resultsCache[symbol].splice(-2,1);
						}
						/*if(params.maxRecords && params.totalRecords>=params.maxRecords){
							this.resultsCache[symbol].splice(0,params.totalRecords-params.maxRecords);
							params.totalRecords=this.resultsCache[symbol].length;
							//if(!params.startDate) moreToLoad=true;
						}*/
						if(!params.update){
							params.update=true;
							params.endDate=null;
							if(results.length){
								params.startDate=new Date(results[results.length-1].DT.getTime());
								params.suppressSymbolNotFound=true;
							}else{
								params.startDate=new Date();
								params.startDate.setDate(params.startDate.getDate()-2);  //params.StartDate is not used for daily forex real time but we
																			//need to set it and make sure it is before any ticks
																			//we get from real time query or those ticks will be discarded
																			//and we need to set it so maxRecords does not get computed.
							}
							if(!results.length || STX.yyyymmddhhmm(new Date(myDate)).substr(0,8)!=STX.yyyymmddhhmm(results[results.length-1].DT).substr(0,8)){
								if(!expiredFuture && !STX.LegacyMarket.isForexMetal(params.symbol,true)){
									todayBarFetch=function(s){
										return function(p,c){
											setTimeout(function(){ s.fetch(p,c); },10);
										};
									}(this);
								}
							}
						}
					}
	
					//Regardless of all past calculations if the data is sparse, then we may not have gotten back
					//enough bars.  In that case, we will set params.moreToLoad to true if we feel there is more data behind there.
					var moreToLoad=false;
					if(!todayBarFetch && params.totalRecords>0 && params.maxRecords){
						moreToLoad=true;
					}
					// calling cb will return the data in daily pieces.
					// we only want to do that if we:
					// 1. are not chaining multiple requests to server
					// 2. are not requesting a start date on the data
					// 3. are requesting maxRecords (normal fetch) but are not asking for a real time update
					if(!todayBarFetch || !params.startDate || (params.maxRecords && !params.update)) {
						params.noUpdate=!!todayBarFetch; //suppress a real time update when fetching today's bar
						if(!todayBarFetch) params.loadMore=false;
						if(params.moreToLoad) {
							moreToLoad=true;
							params.moreToLoad=false;
						}
						if(!todayBarFetch && cb){
							cb({quotes:results, moreAvailable:moreToLoad});
						}
					}else{
						if(moreToLoad) params.moreToLoad=true;
					}

					if(todayBarFetch){
						params.bypassSnapshot=true;
						todayBarFetch(params, cb);
					}
				}.bind(this), null, true);
			}

			if(error!=""){
				if(cb) cb({error:error});
			}
		};

		STX.QuoteFeed.Xignite.Templates={

			token: "/* xignite token */",
			defaultToken: "0DA08C44AFA447B4BE864136810F8093",

			/* Daily/weekly/monthly historical equity request */
			HistoricalEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/www_xignite",  //"www.xignite.com"
				version:null,
				func:	"xGlobalHistorical",
				format:	"csv",
				method:	{
					day:	"GetGlobalHistoricalQuotesRange",
					week:	"GetGlobalHistoricalWeeklyQuotesRange",
					month:	"GetGlobalHistoricalMonthlyQuotesRange",
					as_of:	"GetGlobalHistoricalQuotesAsOf"
				},
				statics:"IdentifierType=Symbol&AdjustmentMethod=None",
				fields:	"GlobalQuotes.Date,GlobalQuotes.Last,GlobalQuotes.Open,GlobalQuotes.High,GlobalQuotes.Low,GlobalQuotes.Volume,GlobalQuotes.SplitRatio",
				results:{
					date:	"GlobalQuotes Date",
					time:	null,
					open:	"GlobalQuotes Open",
					close:	"GlobalQuotes Last",
					high:	"GlobalQuotes High",
					low:	"GlobalQuotes Low",
					volume:	"GlobalQuotes Volume",
					offset: null,
					ratio:	"GlobalQuotes SplitRatio"
				}
			},
			
			/* Historical index request */
			HistoricalIndex: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/globalindiceshistorical_xignite",  //"globalindiceshistorical.xignite.com"
				version:null,
				func:	"xglobalindiceshistorical",
				format:	"csv",
				method:	{
					day:	"GetHistoricalIndexValues",
					as_of:	"GetHistoricalIndexValuesTrailing"
				},
				statics:"IdentifierType=Symbol",
				fields:	"Values.Date,Values.Last,Values.Open,Values.High,Values.Low,Values.Volume",
				results:{
					date:	"Values Date",
					time:	null,
					open:	"Values Open",
					close:	"Values Last",
					high:	"Values High",
					low:	"Values Low",
					volume:	"Values Volume",
					offset: null,
					ratio:	null
				}
			},
			
			/* Historical FOREX request */
			HistoricalForex: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/globalcurrencies_xignite",  //"globalcurrencies.xignite.com"
				version:null,
				func:	"xGlobalCurrencies",
				format:	"csv",
				method:	"GetHistoricalRatesRange",
				statics:"FixingTime=00:00:00&PriceType=Bid&PeriodType=Daily",
				fields:	"StartDate,Open,High,Low,Close",//,Volume",
				results:{
					date:	"StartDate",
					time:	null,
					open:	"Open",
					close:	"Close",
					high:	"High",
					low:	"Low",
					volume:	null,
					offset: null,
					ratio:	null
				}
			},

			/* Historical Major (USD,AUD,CAD,CHF,EUR,GBP,HKD,ZAR) Metals request when metal is first in pair */
			HistoricalMajorMetals: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/globalmetals_xignite",  //"globalmetals.xignite.com"
				version:null,
				func:	"xGlobalMetals",
				format:	"csv",
				method:	"GetHistoricalMetalQuotesRange",
				statics:"FixingTime=00:00:00&PriceType=Bid&PeriodType=Daily&Currency=",
				fields:	"StartDate,StartTime,Open,High,Low,Close",//,Volume",
				results:{
					date:	"StartDate",
					time:	null,
					open:	"Open",
					close:	"Close",
					high:	"High",
					low:	"Low",
					volume:	null,
					offset: null,
					ratio:	null
				}
			},

			/* Historical Metals request for other currencies and when metal is second in pair*/
			HistoricalMetals: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/globalcurrencies_xignite",  //"globalcurrencies.xignite.com"
				version:null,
				func:	"xGlobalCurrencies",
				format:	"csv",
				method:	"GetLondonHistoricalRatesRange",
				statics:null,
				fields:	"StartDate,Open,High,Low,Close",//,Volume",
				results:{
					date:	"StartDate",
					time:	null,
					open:	"Open",
					close:	"Close",
					high:	"High",
					low:	"Low",
					volume:	null,
					offset: null,
					ratio:	null
				}
			},

			/* Historical Futures request */
			HistoricalFuture: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/www_xignite",  //"www.xignite.com"
				version:null,
				func:	"xFutures",
				format:	"csv",
				method:	{
					"future": 	"GetHistoricalFutureRange",
					"commodity":"GetHistoricalCommodityRange"
				},
				statics:null,
				fields:	"Quotes.Date,Quotes.Open,Quotes.High,Quotes.Low,Quotes.Last,Quotes.Volume",
				results:{
					date:	"Quotes Date",
					time:	null,
					open:	"Quotes Open",
					close:	"Quotes Last",
					high:	"Quotes High",
					low:	"Quotes Low",
					volume:	"Quotes Volume",
					offset: null,
					ratio:	null
				}
			},

			/* Intraday delayed equity request */
			IntradayEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:"v3",
				func:	"xGlobalQuotes",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=Symbol&Precision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume,ChartBars.AdjustmentRatio",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday BATS Real Time equity request */
			IntradayBATSRTEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xBATSRealTime",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=SymbolPrecision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume,ChartBars.AdjustmentRatio",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday BATS Real Time equity request */
			IntradayBATSRTEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xBATSRealTime",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=SymbolPrecision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume,ChartBars.AdjustmentRatio",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday BATS Real Time equity request */
			IntradayBATSRTEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xBATSRealTime",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=SymbolPrecision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume,ChartBars.AdjustmentRatio",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday BATS Real Time equity request */
			IntradayBATSRTEquity: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xBATSRealTime",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=Symbol&Precision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume,ChartBars.AdjustmentRatio",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday delayed index request */
			IntradayIndex: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xglobalindices",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=Symbol&Precision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	null
				}
			},
			
			/* Intraday Real Time index request */
			IntradayRTIndex: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xglobalindicesrealtime",
				format:	"csv",
				method:	"GetChartBars",
				statics:"IdentifierType=Symbol&Precision=Minutes&AdjustmentMethod=None",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Close,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Volume",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	null
				}
			},
			
			/* Intraday FOREX request */
			IntradayRTForex: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xGlobalCurrencies",
				format:	"csv",
				method:	"GetChartBars",
				statics:"Precision=Minutes&PriceType=Bid",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Close,ChartBars.Volume",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday Metals request */
			IntradayRTMetals: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/chartiq_xignite",  //"chartiq.xignite.com"
				version:null,
				func:	"xGlobalMetals",
				format:	"csv",
				method:	"GetChartBars",
				statics:"Precision=Minutes&PriceType=Bid&Currency=",
				fields:	"ChartBars.StartDate,ChartBars.StartTime,ChartBars.UTCOffset,ChartBars.Open,ChartBars.High,ChartBars.Low,ChartBars.Close,ChartBars.Volume",
				results:{
					date:	"ChartBars StartDate",
					time:	"ChartBars StartTime",
					open:	"ChartBars Open",
					close:	"ChartBars Close",
					high:	"ChartBars High",
					low:	"ChartBars Low",
					volume:	"ChartBars Volume",
					offset: "ChartBars UTCOffset",
					ratio:	"ChartBars AdjustmentRatio"
				}
			},

			/* Delayed Futures request (for today)*/
			DelayedFuture: {
				host:	"http"+(STX.isIE9?"":"s")+"://services.chartiq.com/www_xignite",  //"www.xignite.com"
				version:null,
				func:	"xFutures",
				format:	"csv",
				method:	"GetDelayedFuture",
				statics:null,
				fields:	"Date,Time,Open,High,Low,Last,Volume",
				results:{
					date:	"Date",
					time:	null,
					open:	"Open",
					close:	"Last",
					high:	"High",
					low:	"Low",
					volume:	"Volume",
					offset: null,
					ratio:	null
				}
			}
		};

		STX.QuoteFeed.Xignite.getSnapshotQuote=function(params, symbol, isDaily, offset, cb, caller){
			//snapshot update code
			if(params.update && 
				!params.bypassSnapshot && 
				params.stx.chart.masterData && 
				params.stx.chart.masterData.length &&
				",line,colored_line,mountain,baseline_delta,".indexOf(params.stx.layout.chartType)>-1){
				var url;
				var field="Bid";
				if(STX.LegacyMarket.isForexMetal(params.symbol)){
					url="https://services.chartiq.com/chartiq_xignite/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol="+symbol+"&Currency=&_fields=Date,Time,Bid";
				}else if(STX.LegacyMarket.isForexSymbol(params.symbol)){
					url="https://services.chartiq.com/chartiq_xignite/xGlobalCurrencies.json/GetRealTimeRate?Symbol="+symbol+"&_fields=Date,Time,Bid";					
				}else{
					url="https://services.chartiq.com/chartiq_xignite/xBATSRealTime.json/GetRealQuote?Symbol="+symbol+"&_fields=Date,Time,Close";					
					field="Close";
				}
				if(STX.QuoteFeed.Xignite.Templates.token.indexOf("/*")==-1){
					url+="&_Token="+STX.QuoteFeed.Xignite.Templates.token;
				}else{
					url+="&_Token="+STX.QuoteFeed.Xignite.Templates.defaultToken;					
				}
				STX.postAjax(url, null, function(status, res){
					if(status==200){
						res=JSON.parse(res);
						var mdDate=params.stx.chart.masterData[params.stx.chart.masterData.length-1].DT;
						/* align date to beginning of interval */
						var nextDate=new Date(mdDate);
						if(isDaily) nextDate.setDate(nextDate.getDate()+1);
						else nextDate.setMinutes(nextDate.getMinutes()+(isNaN(params.interval)?params.period:params.interval));

						var bcdt=STX.strToDateTime(res.Date+" "+res.Time);
						bcdt.setMinutes(bcdt.getMinutes()+offset-bcdt.getTimezoneOffset());
						bcdt.setSeconds(0); bcdt.setMilliseconds(0);
						var quote=res[field];
						if(bcdt>=mdDate && bcdt<=nextDate && quote>0) {
							var update=[{
								DT: (+bcdt==+nextDate?nextDate:mdDate),
								Open: quote,
								High: quote,
								Low: quote,
								Close: quote,
								Volume: 0,
								Adj_Close: quote
							}];
							if(params.stx.quoteDriver) cb({quotes:update});
							else cb(null, update);
							return;
						}
					}
					params.bypassSnapshot=true;
					caller.fetch(params,cb);
				});
				return true;
			}
			return false;
		};

		STX.QuoteFeed.Xignite.Utility={

			xIgniteInterval: function(interval){
				if(!isNaN(interval)) return "";
				else if(interval.charAt(0)=='d') return "Day";
				else if(interval.charAt(0)=='w') return "Week";
				else if(interval.charAt(0)=='m') return "Month";
				else if(interval.charAt(0)=='y') return "Year";
				else return interval;
			},
			url: function(api,args,params,token){
				var u=api.host;
				if(api.version) u+="/"+api.version;
				u+="/"+api.func+"."+api.format;
				if(api.method instanceof Object){
					if(api.method.as_of && !params.startDate && params.maxRecords){
						u+="/"+api.method.as_of;
					}
					//else u+="/"+api.method[params.interval];
					else{
						u+="/"+api.method["day"];
					}
				}else{
					u+="/"+api.method;
				}
				if(token){
					u+="?_Token="+token;
				}else if(STX.QuoteFeed.Xignite.Templates.token.indexOf("/*")==-1){
					u+="?_Token="+STX.QuoteFeed.Xignite.Templates.token;
				}else{
					u+="?_Token="+STX.QuoteFeed.Xignite.Templates.defaultToken;					
				}
				if(api.statics) u+="&"+api.statics;
				if(api.fields) u+="&_fields="+api.fields;
				for(var a in args){
					u+="&"+a+"="+ (args[a]?args[a]:"");
				}
				return u;
			},
			nonMarketMaxRecordsFactor:	8/5,	// These APIs return fewer records than requested
												// because the records requested (periods)
												// include non-market days
			marketClosedMaxRecordsFactor:  7/2, // These APIs return fewer records than requested
												// because the records requested (periods)
												// include market closed times
			timeZone: {							//Note: this may be replaced by the new STX.Market classes
				"BVMF":"America/Sao_Paulo",
				"MTAA":"Europe/Rome",
				"RTSX":"Europe/Moscow",
				"XAMS":"Europe/Amsterdam",
				"XASX":"Australia/Sydney",
				"XATH":"Europe/Athens",
				"XBAR":"Europe/Madrid",
				"XBRA":"Europe/Bratislava",
				"XBER":"Europe/Berlin",
				"XBOM":"Asia/Calcutta",
				"XBRU":"Europe/Brussels",
				"XBUD":"Europe/Budapest",
				"XCNQ":"America/Toronto",
				"XCSE":"Europe/Copenhagen",
				"XDUB":"Europe/Dublin",
				"XDUS":"Europe/Berlin",
				"XETR":"Europe/Berlin",
				"XFRA":"Europe/Berlin",
				"XHAM":"Europe/Berlin",
				"XHAN":"Europe/Berlin",
				"XHEL":"Europe/Helsinki",
				"XHKG":"Asia/Hong_Kong",
				"XICE":"Atlantic/Reykjavik",
				"XJSE":"Africa/Johannesburg",
				"XLIM":"America/Lima",
				"XKOS":"Asia/Seoul",
				"XKRX":"Asia/Seoul",
				"XLIS":"Europe/Lisbon",
				"XLON":"Europe/London",
				"XMAD":"Europe/Madrid",
				"XMCE":"Europe/Madrid",
				"XMUN":"Europe/Berlin",
				"XMUS":"Asia/Muscat",
				"XNSE":"Asia/Calcutta",
				"XNZE":"Pacific/Auckland",
				"XOSL":"Europe/Oslo",
				"XPAR":"Europe/Paris",
				"XPRA":"Europe/Prague",
				"XRIS":"Europe/Riga",
				"XSGO":"America/Santiago",
				"XSES":"Asia/Singapore",
				"XSHE":"Asia/Shanghai",
				"XSHG":"Asia/Shanghai",
				"XSTO":"Europe/Stockholm",
				"XSTU":"Europe/Berlin",
				"XSWX":"Europe/Zurich",
				"XTAE":"Asia/Tel_Aviv",
				"XTAI":"Asia/Taipei",
				"XTAL":"Europe/Tallinn",
				"XTKS":"Asia/Tokyo",
				"XTNX":"America/Toronto",
				"XTSE":"America/Toronto",
				"XTSX":"America/Toronto",
				"XLIT":"Europe/Vilnius",
				"XVAL":"Europe/Madrid",
				"XVTX":"Europe/Zurich",
				"XWAR":"Europe/Warsaw",
				"XWBO":"Europe/Vienna",
				
				"INDARCX":"America/New_York",
				"INDBVMF":"America/Sao_Paulo",
				"INDCBSX":"America/Chicago",
				"INDMTAA":"Europe/Rome",
				"INDXASE":"America/New_York",
				"INDXASX":"Australia/Sydney",
				"INDXBOM":"Asia/Calcutta",
				"INDXBUD":"Europe/Budapest",
				"INDXCME":"America/Chicago",
				"INDXCSE":"Europe/Copenhagen",
				"IND_DBI":"Europe/Berlin",
				"INDXHEL":"Europe/Helsinki",
				"INDXHKG":"Asia/Hong_Kong",
				"INDXJSE":"Africa/Johannesburg",
				"INDXKOS":"Asia/Seoul",
				"INDXKRX":"Asia/Seoul",
				"INDXMAD":"Europe/Madrid",
				"INDXMCE":"Europe/Madrid",
				"INDXNAS":"America/New_York",
				"INDXNSE":"Asia/Calcutta",
				"INDXNZE":"Pacific/Auckland",
				"INDXOSL":"Europe/Oslo",
				"INDXSES":"Asia/Singapore",
				"INDXSHE":"Asia/Shanghai",
				"INDXSHG":"Asia/Shanghai",
				"INDXSTO":"Europe/Stockholm",
				"INDXSTU":"Europe/Berlin",
				"INDXSTX":"Europe/Zurich",
				"INDXSWX":"Europe/Zurich",
				"INDXTAE":"Asia/Tel_Aviv",
				"INDXTAI":"Asia/Taipei",
				"INDXTKS":"Asia/Tokyo",
				"INDXTSE":"America/Toronto",
				"INDXWAR":"Europe/Warsaw",
				"INDXWBO":"Europe/Vienna",
				"IND_DJI":"America/New_York",
				"IND_DJTSMI":"America/New_York",
				"IND_EURONEXT":"Europe/Brussels",
				"IND_FTSE":"Europe/London",
				"IND_FTSEEUR":"Europe/London",
				"IND_FTSEUSD":"Europe/London",
				"IND_GIDS":"America/New_York",
				"IND_GIF":"America/New_York",
				"IND_HKGI":"Asia/Shanghai",
				"IND_NIKKEI":"Asia/Tokyo"
			}
		};

		return _exports;
	
	}
	
	{
		if ( typeof define === "function" && define.amd ) {
			define( ["stxTimeZoneData","stxThirdParty","stx"], function(_stxTimeZoneData,_stxThirdParty,_stx) { return _stxKernel_js(_stxThirdParty,_stx); } );
		}else{
			var _stxThirdParty={};
			if(typeof(window.STXThirdParty)!="undefined") _stxThirdParty=window.STXThirdParty;
	
			var _stx={
				"STX":window.STX,
				"STXChart":window.STXChart,
				"$$":window.$$,
				"$$$":window.$$$
			};
			_stxKernel_js(_stxThirdParty,_stx);
		}
	}
	
})();
