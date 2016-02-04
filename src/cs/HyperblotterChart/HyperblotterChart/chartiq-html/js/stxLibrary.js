// Copyright 2012-2015 by ChartIQ LLC


(function(){

	function _stxLibrary_js(_exports) {

		var STX=_exports.STX;
		var STXChart=_exports.STXChart;


		//backwards compatibility
		{
			/**
			 * @deprecated use STX.Studies.displayHistogramWithSeries instead
			 */
			STX.Studies.displayKlinger=STX.Studies.displayHistogramWithSeries;
			/**
			 * @deprecated use STX.Studies.displayHistogramWithSeries instead
			 */
			STX.Studies.displayMACD=STX.Studies.displayHistogramWithSeries;
		}
		/**
		 * A sample display function for an overlay. An overlay displays in the chart area.
		 *
		 * Also note the use of clipping to ensure that the overlay doesn't print outside of the panel
		 *
		 * Finally note that when color=="auto" you can use stx.defaultColor which will automatically adjust based on the background color. This
		 * is the default for studies that use the color picker for user selection of output colors.
		 * @memberOf STX.Studies
		 */
		STX.Studies.displayPSAR2=function(stx, sd, quotes){
			stx.startClip(sd.panel);
			var squareWave=(sd.inputs["Plot Type"]=="squarewave");
			for(var output in sd.outputs){
				var field=output + " " + sd.name;
				stx.chart.context.beginPath();
				var panel=stx.panels[sd.panel];
				var candleWidth=stx.layout.candleWidth;
				var pointWidth=Math.max(3,Math.floor(stx.chart.tmpWidth/2));
				for(var x=0;x<quotes.length;x++){
					var quote=quotes[x];
					if(!quote || (!quote[field] && quote[field]!==0)) continue;
					if(quote.candleWidth) candleWidth=quote.candleWidth;
					if(panel.name==panel.chart.name && quote.transform) quote=quote.transform;
					var x0=stx.pixelFromBar(x, panel.chart);
					if(squareWave) x0-=candleWidth/2;
					var y0=stx.pixelFromPrice(quote[field], panel);
					if(x===0 || !quotes[x-1] || (!quotes[x-1][field] && quotes[x-1][field]!==0)) {
						stx.chart.context.moveTo(x0,y0);
					}
					if(squareWave) {
						stx.chart.context.lineTo(x0,y0);
						stx.chart.context.lineTo(x0+candleWidth, y0);
						if(quotes[x+1]){
							var quote_1=quotes[x+1];
							if(panel.name==panel.chart.name && quote_1.transform) quote_1=quote_1.transform;
							if(!quote_1[field] && quote_1[field]!==0){
								stx.chart.context.lineTo(x0+candleWidth, stx.pixelFromPrice(quote_1[sd.referenceOutput + " " + sd.name], stx.panels[sd.panel]));
							}
						}
					}else{
						stx.chart.context.moveTo(x0-pointWidth/2,y0);
						stx.chart.context.lineTo(x0+pointWidth/2,y0);
					}
				}
				stx.chart.context.lineWidth=1;
				if(sd.highlight) stx.chart.context.lineWidth=3;
				var color=sd.outputs[output];
				if(color=="auto") color=stx.defaultColor;	// This is calculated and set by the kernel before draw operation.
				stx.chart.context.strokeStyle=color;
				stx.chart.context.stroke();
				stx.chart.context.closePath();
				stx.chart.context.lineWidth=1;
			}
			stx.endClip();
		};

		/**
		 * A sample of a custom initialize function. It is rare that one would be required. In this case we simply customize the input display
		 * but otherwise call the default.
		 * @memberOf STX.Studies
		 */
		STX.Studies.initializeStochastics=function(stx, type, inputs, outputs){
			inputs.display="Stoch (" + inputs.Period + ")";
			return STX.Studies.initializeFN.apply(null, arguments);
		};
		
		/**
		 * A simple calculation function.  Volume is already obtained, so all that is done here is setting colors.
		 * @memberOf STX.Studies
		 */
		STX.Studies.calculateVolume=function(stx, sd){
			if(sd.name=="vchart"){
				stx.setStyle("stx_volume_up","color",sd.outputs["Up Volume"]);
				stx.setStyle("stx_volume_down","color",sd.outputs["Down Volume"]);
			}else{
				if(!stx || !stx.chart.dataSet) return;
				var remove=sd.parameters.removeStudy;
				stx.layout.volumeUnderlay=!remove;
				stx.changeOccurred("layout");
				if(remove){
					STX.Studies.removeStudy(stx, sd);
				}else{
					stx.setStyle("stx_volume_underlay_up","color",sd.outputs["Up Volume"]);
					stx.setStyle("stx_volume_underlay_down","color",sd.outputs["Down Volume"]);
					if(sd.outputs["Up Border"]) stx.setStyle("stx_volume_underlay_up","border-left-color",sd.outputs["Up Border"]);
					if(sd.outputs["Down Border"]) stx.setStyle("stx_volume_underlay_down","border-left-color",sd.outputs["Down Border"]);
				}
			}
		};
		
		
		/**
		 * Moving Average convenience function
		 * @param  {string} type The type of moving average, e.g. simple, exponential, triangular, etc
		 * @param  {number} periods Moving average period
		 * @param  {string} field The field in the data array to perform the moving average on
		 * @param  {number} offset Periods to offset the result by
		 * @param  {string} name String to prefix to the name of the output.  Full name of output would be name + " " + sd.name, for instance "Signal MACD"
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 * @memberOf STX.Studies
		 * @since 04-2015
		 */
		STX.Studies.MA=function(type, periods, field, offset, name, stx, sd){
			ma=new STX.Studies.StudyDescriptor(name + " " + sd.name, "ma", sd.panel);
			ma.chart=sd.chart;
			ma.days=parseInt(periods,10);
			ma.inputs={};
			if(type) ma.inputs.Type=type;
			if(field) ma.inputs.Field=field;
			if(offset) ma.inputs.Offset=parseInt(offset,10);
			STX.Studies.calculateMovingAverage(stx, ma);
		};

		/**
		 * Creates a volume underlay for the chart. The underlay is always 25% of the height of the chart.
		 * The color and opacity of the underlay can be controlled with the classes stx_volume_underlay_up and
		 * stx_volume_underlay_down.
		 */
		STX.Studies.volUnderlay=function(stx, sd, quotes){
			var seriesParam=[{
				field: "Volume",
				fill_color_up:		stx.canvasStyle("stx_volume_underlay_up").color,
				border_color_up:	stx.canvasStyle("stx_volume_underlay_up").borderLeftColor,
				opacity_up:			stx.canvasStyle("stx_volume_underlay_up").opacity,
				fill_color_down:	stx.canvasStyle("stx_volume_underlay_down").color,
				border_color_down:	stx.canvasStyle("stx_volume_underlay_down").borderLeftColor,
				opacity_down:		stx.canvasStyle("stx_volume_underlay_down").opacity
			}];
			var params={
				name: 				"Volume",
				panel:				sd.panel,
				heightPercentage:	sd.inputs.HeightPercentage?sd.inputs.HeightPercentage:sd.study.parameters.heightPercentage,
				widthFactor:		1
			};
			stx.drawHistogram(params,seriesParam);
		};


		/**
		 *
		 * Creates a volume chart. This is the one study that requires a specific panel name called "vchart".
		 * If no volume is available on the screen then the panel will be watermarked "Volume Not Available" (translated if a translate function is attached to the kernel object).
		 * 
		 */
		STX.Studies.createVolumeChart=function(stx, sd, quotes){
			var seriesParam=[{
				field:				"Volume",
				fill_color_up:		stx.canvasStyle("stx_volume_up").color,
				border_color_up:	"#000000",//this.canvasStyle("stx_volume_up")["borderLeftColor"],
				opacity_up:			1,
				fill_color_down:	stx.canvasStyle("stx_volume_down").color,
				border_color_down:	"#000000",//this.canvasStyle("stx_volume_down")["borderLeftColor"]
				opacity_down:		1
			}];
			
			var params={
				name: 				"Volume",
				panel:				sd.panel,
				widthFactor:		1,
				bindToYAxis: 		true
			};

			sd.outputMap.Volume="transparent";
			STX.Studies.createYAxis(stx, sd, sd.chart.dataSegment, stx.panels[sd.panel]);
			stx.drawHistogram(params,seriesParam);
		};
				

		/**
		 * Calculate function for MACD study
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMACD=function(stx, sd) {
			var quotes=sd.chart.scrubbed;
			if(!quotes) return;
			if(quotes.length<sd.days+1){
				if(typeof practiceMode!="undefined" && practiceMode) return;
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Not enough quotes to compute MACD " + sd.chart.dataSet.length));

				return;
			}
			if(!sd.macd1Days) sd.macd1Days=parseFloat(sd.inputs["Fast MA Period"]);
			if(!sd.macd2Days) sd.macd2Days=parseFloat(sd.inputs["Slow MA Period"]);
			if(!sd.signalDays) sd.signalDays=parseFloat(sd.inputs["Signal Period"]);
			if(!sd.days) sd.days=Math.max(sd.macd1Days,sd.macd2Days,sd.signalDays);
		
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			
			var maType=sd.inputs["Moving Average Type"];
			if(!maType) maType="exponential";
			
			STX.Studies.MA(maType, sd.macd1Days, field, 0, "MACD1", stx, sd);
			STX.Studies.MA(maType, sd.macd2Days, field, 0, "MACD2", stx, sd);
		
			var i, quote;
			for(i=sd.days-1;i<quotes.length;i++){
				quote=quotes[i];
				quote["MACD "+sd.name]=quote["MACD1 "+sd.name]-quote["MACD2 "+sd.name];
			}
			var sigMaType=sd.inputs["Signal MA Type"];
			if(!sigMaType) sigMaType="exponential";
			STX.Studies.MA(sigMaType, sd.signalDays, "MACD "+sd.name, 0, "Signal", stx, sd);
		
			var histogram=sd.name+"_hist";
			for(i=sd.days-1;i<quotes.length;i++){
				quote=quotes[i];
				var signal=quote["Signal "+sd.name];
				if(!signal && signal!==0) continue;	// don't create histogram before the signal line is valid
				quote[histogram]=quote["MACD "+sd.name]-quote["Signal "+sd.name];
			}
		};
		
		/**
		 * Calculate function for standard deviation.
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateStandardDeviation=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			if(sd.days<0) sd.days=1;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var type=sd.inputs["Moving Average Type"];
			if(!type) type=sd.inputs.Type;
			STX.Studies.MA(type, sd.days, field, sd.inputs.Offset, "_MA", stx, sd);

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
				ma=quote["_MA "+sd.name];
				var val=quote[field];
				if(isNaN(val)) val=0;
				acc1+=Math.pow(val,2);
				acc2+=val;
				if(i>sd.days-1){
					var val2=quotes[i-sd.days][field];
					if(isNaN(val2)) val2=0;
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
		STX.Studies.calculateMovingAverage=function(stx, sd){
			if(!sd.chart.scrubbed) return;
			var type=sd.inputs.Type;
			if(type=="ma" || !type) type="simple";	// handle when the default inputs are passed in
			if(type=="ema" || type=="exponential"){
				STX.Studies.calculateMovingAverageExponential(stx, sd);
				return;
			}else if(type=="tsma" || type=="time series"){
				STX.Studies.calculateMovingAverageTimeSeries(stx, sd);
				return;
			}else if(type=="tma" || type=="triangular"){
				STX.Studies.calculateMovingAverageTriangular(stx, sd);
				return;
			}else if(type=="vma" || type=="variable"){
				STX.Studies.calculateMovingAverageVariable(stx, sd);
				return;
			}else if(type=="vdma" || type=="vidya"){
				STX.Studies.calculateMovingAverageVariable(stx, sd);
				return;
			}else if(type=="wma" || type=="weighted"){
				STX.Studies.calculateMovingAverageWeighted(stx, sd);
				return;
			}else if(type=="smma" || type=="welles wilder"){
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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";	// Handle when the default inputs are passed in
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			var vals=[];
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!==0){
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
					continue;
				}
				acc+=val;
				vals.push(val);
				if(ii==sd.days-1){
					ma=acc/sd.days;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=ma;
				}else if(ii>=sd.days){
					var val2=vals.shift();
					acc-=val2;
					ma=acc/sd.days;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=ma;
				}else if(ii===0){
					ma=acc;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
				}else {
					ma=acc/(ii+1);
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
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
			var type=sd.inputs.Type;
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
		
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";	// Handle when the default inputs are passed in
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!==0){
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
					continue;
				}
				if(ii==sd.days-1){
					acc+=val;
					ma = acc/sd.days;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=ma;
				}else if(ii>=sd.days){
					var m=multiplier;
					ma = ((val-emaPreviousDay)*m)+emaPreviousDay;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=ma;
				}else if(ii===0){
					acc+=val;
					ma=acc;
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
				}else { // 1 <= li < sd.days
					acc+=val;
					ma=acc/(ii+1);
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
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
			var type=sd.inputs.Type;
			var quotes=sd.chart.scrubbed;
			var alpha = (2/(sd.days+1));

			var vmaPreviousDay = 0;
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
		
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";	// Handle when the default inputs are passed in

			if(type=="vidya"){
				sd.std=new STX.Studies.StudyDescriptor(sd.name, "sdev", sd.panel);
				sd.std.chart=sd.chart;
				sd.std.days=5;
				sd.std.inputs={"Field":field, "Standard Deviations":1, "Type":"ma"};
				sd.std.outputs={"STD":null};
				STX.Studies.calculateStandardDeviation(stx,sd.std);
	
				STX.Studies.MA("ma", 20, "STD "+sd.name, 0, "MASTD", stx, sd);

			}else{
				sd.cmo=new STX.Studies.StudyDescriptor(sd.name, "cmo", sd.panel);
				sd.cmo.chart=sd.chart;
				sd.cmo.days=9;
				sd.cmo.outputs={"CMO":null};
				STX.Studies.calculateChandeMomentum(stx, sd.cmo);				
			}
			
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!==0){
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
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
				if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=vma;
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
			STX.Studies.calculateLinearRegressionIndicator(stx, sd.ma);

			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			var quotes=sd.chart.scrubbed;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=quote["Forecast "+sd.name];			
			}
		};
		
		/**
		 * Calculate function for triangular moving average
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateMovingAverageTriangular=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			var days=Math.ceil(sd.days/2);
			STX.Studies.MA("simple", days, sd.inputs.Field, 0, "TRI1", stx, sd);
			if(sd.days%2===0) days++;
			STX.Studies.MA("simple", days, "TRI1 "+sd.name, 0, "TRI2", stx, sd);

			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=quote["TRI2 "+sd.name];			
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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";	// Handle when the default inputs are passed in
			var divisor=sd.days*(sd.days+1)/2;
			
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}
			var offset=parseInt(sd.inputs.Offset,10);
			if(isNaN(offset)) offset=0;
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				var val=quote[field];
				if(!val && val!==0){
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
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
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=null;
				}else{
					if(i+offset>=0 && i+offset<quotes.length) quotes[i+offset][name]=accAdd/divisor;
				}
			}
			return;
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
				longEMA="EMA-L " + sd.name,
				i;
			for(i=1;i<quotes.length;i++){
				var sv=quotes[i].Volume;
				if(quotes[i]["Typ Price "+sd.name]<quotes[i-1]["Typ Price "+sd.name]) sv*=-1;
				quotes[i][signedVolume]=sv;
			}
			
			STX.Studies.MA("exponential", Number(sd.inputs["Short Cycle"]), signedVolume, 0, "EMA-S", stx, sd);
			STX.Studies.MA("exponential", Number(sd.inputs["Long Cycle"]), signedVolume, 0, "EMA-L", stx, sd);

			for(i=Number(sd.inputs["Long Cycle"]);i<quotes.length;i++){
				quotes[i][klinger]=quotes[i][shortEMA]-quotes[i][longEMA];
			}

			STX.Studies.MA("exponential", Number(sd.inputs["Signal Periods"]), klinger, 0, "KlingerSignal", stx, sd);
			
			for(i=0;i<quotes.length;i++){
				quotes[i][field]=quotes[i][klinger]-quotes[i][klingerSignal];
			}
		};
		
		/**
		 * Calculate function for stochastics
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 */
		STX.Studies.calculateStochastics=function(stx, sd){
			sd.max=100;
			sd.min=0;
			if(!sd.smooth) sd.smooth=(sd.inputs.Smooth);
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

			var quotes=sd.chart.scrubbed;
			if(!quotes) return;
		
			if(quotes.length<sd.days+1){
				if(typeof practiceMode!="undefined" && practiceMode) return;
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Not enough quotes to compute stochastics " + sd.chart.dataSet.length + ":" + sd.days));
				return;
			}
		
			function computeStochastics(position, field, days){
				var beg=position-days+1;
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

			var fastPeriod=sd.inputs["%K Periods"];
			if(!fastPeriod) fastPeriod=sd.days;

			for(var i=fastPeriod;i<quotes.length;i++){
				quotes[i][name]=computeStochastics(i,field,fastPeriod);
			}
		
			var smoothingPeriod=sd.inputs["%K Smoothing Periods"];
			if(smoothingPeriod) sd.smooth=true;
			else if(sd.smooth) smoothingPeriod=3;
			if(sd.smooth){
				sd.smooth=new STX.Studies.StudyDescriptor(sd.name, "ma", sd.panel);
				sd.smooth.chart=sd.chart;
				sd.smooth.days=smoothingPeriod;
				sd.smooth.inputs={"Field":name, "Type":"simple"};
				STX.Studies.calculateMovingAverage(stx, sd.smooth);
			}
			sd.outputMap[sd.name]="Fast";

			var slowPeriod=sd.inputs["%D Periods"];
			if(!slowPeriod) slowPeriod=3;
			sd.ma=new STX.Studies.StudyDescriptor(sd.name+"_3", "ma", sd.panel);
			sd.ma.chart=sd.chart;
			sd.ma.days=slowPeriod;
			sd.ma.inputs={"Field":sd.name, "Type":"simple"};
			sd.ma.min=sd.min;
			sd.ma.max=sd.max;
			STX.Studies.calculateMovingAverage(stx, sd.ma);
			sd.outputMap[sd.name+"_3"]="Slow";
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
				prices["Sum True Range " + sd.name]=total;
				if(i==period) prices["ATR " + sd.name]=total/period;
				else if(i>period) prices["ATR " + sd.name]=(pd["ATR " + sd.name]*(period-1)+trueRange)/period;
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
				STX.Studies.MA("exponential", sd.days, fields[e], 0, "MA"+(e+1).toString(), stx, sd);
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
				quotes[i][name]=(quotes[i].High + quotes[i].Low) / 2;
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
			STX.Studies.MA(sd.inputs["Moving Average Type"], period, "Close-Open "+sd.name, 0, "Result", stx, sd);
		};

		STX.Studies.calculateSchaff=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var period=sd.days;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var factor=0.5;

			STX.Studies.MA(sd.inputs["Moving Average Type"], Number(sd.inputs["Short Cycle"]), field, 0, "MACD1", stx, sd);
			STX.Studies.MA(sd.inputs["Moving Average Type"], Number(sd.inputs["Long Cycle"]), field, 0, "MACD2", stx, sd);
		
			function getLLVHHV(p,x,n){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					var d=quotes[j][n+" "+sd.name];
					if(!d) continue;
					l=(l===null?d:Math.min(l,d));
					h=(h===null?d:Math.max(h,d));
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
					l=(l===null?quotes[j].Low:Math.min(l,quotes[j].Low));
					h=(h===null?quotes[j].High:Math.max(h,quotes[j].High));
				}
				return [l,h];
			}

			var pKPeriods=Number(sd.inputs["%K Periods"]);
			var i;
			for(i=pKPeriods-1;i<quotes.length;i++){
				var quote=quotes[i];
				var lh=getLLVHHV(pKPeriods,i);
				quote["H "+sd.name]=quote.Close-(lh[0]+lh[1])/2;
				quote["DHL "+sd.name]=lh[1]-lh[0];
			}

			STX.Studies.MA("exponential", Number(sd.inputs["%K Smoothing Periods"]), "H "+sd.name, 0, "HS1", stx, sd);
			STX.Studies.MA("exponential", Number(sd.inputs["%K Double Smoothing Periods"]), "HS1 "+sd.name, 0, "HS2", stx, sd);
			STX.Studies.MA("exponential", Number(sd.inputs["%K Smoothing Periods"]), "DHL "+sd.name, 0, "DHL1", stx, sd);
			STX.Studies.MA("exponential", Number(sd.inputs["%K Double Smoothing Periods"]), "DHL1 "+sd.name, 0, "DHL2", stx, sd);
		
			for(i=pKPeriods-1;i<quotes.length;i++){
				quotes[i]["%K "+sd.name]=(quotes[i]["HS2 "+sd.name]/(0.5*quotes[i]["DHL2 "+sd.name]))*100;
			}
			
			STX.Studies.MA(sd.inputs["%D Moving Average Type"], Number(sd.inputs["%D Periods"]), "%K "+sd.name, 0, "%D", stx, sd);
			
			sd.zoneOutput="%K";
		};

		STX.Studies.calculateEhlerFisher=function(stx, sd){
			var quotes=sd.chart.scrubbed;

			function getLLVHHV(p,x){
				var l=null, h=null;
				for(var j=x-p+1;j<=x;j++){
					var d=(quotes[j].High+quotes[j].Low)/2;
					l=(l===null?d:Math.min(l,d));
					h=(h===null?d:Math.max(h,d));
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

			STX.Studies.calculateStudyATR(stx,sd);

			STX.Studies.MA("exponential", sd.days, "True Range "+sd.name, 0, "EMA", stx, sd);
			STX.Studies.MA("simple", sd.days, "Close", 0, "SMA", stx, sd);

		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i] || !quotes[i]["SMA "+sd.name] || !quotes[i]["EMA "+sd.name]) continue;
				quotes[i]["Result " + sd.name]=(quotes[i].Close-quotes[i]["SMA "+sd.name])/quotes[i]["EMA "+sd.name];
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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var minTick=sd.inputs["Min Tick Value"];
			var obv=false;
			if(!minTick && minTick!==0) {
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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
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
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, "Index "+sd.name, 0, "MA", stx, sd);
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
				else if(stx.layout.interval=="week") return 52;
				else if(stx.layout.interval=="month") return 12;
				else return days;
			}
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
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
			if(T===null || isNaN(T)) T=99999;
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
		    	var R=M+0.25*D;
		    	if(M==A) R-=0.5*B;
		    	else if(M==B) R-=0.5*A;

		    	var swing = (50*((quotes[i].Close-quotes[i-1].Close)+0.5*(quotes[i].Close-quotes[i].Open)+0.25*(quotes[i-1].Close-quotes[i-1].Open))/R)*(K/T);
    			if(R===0 || T===0) swing=0;
 		    	
	    		if(sd.type=="Swing") total=0;
	   			total+=swing;
	    		quotes[i]["Result " + sd.name]=total;
		    }
		};

		STX.Studies.calculateADX=function(stx, sd){
			STX.Studies.calculateStudyATR(stx,sd);

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
			STX.Studies.calculateStudyATR(stx,sd);

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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			var quotes=sd.chart.scrubbed;
		    for(var i=sd.days;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-sd.days]) continue;
				quotes[i]["Result " + sd.name]=quotes[i][field]-quotes[i-sd.days][field];
		    }
		};
		
		STX.Studies.calculateRateOfChange=function(stx, sd){
			var field=sd.inputs.Field;
			if(sd.name.indexOf("Vol ROC")===0) field="Volume";
			else if(!field || field=="field") field="Close";
			var name=sd.name;
			for(var p in sd.outputs){
				name=p + " " + name;
			}

			var offset=sd.inputs["Center Line"];
			if(!offset) offset=0;
			else offset=parseInt(offset,10);
			
			var quotes=sd.chart.scrubbed;
		    for(var i=sd.days;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-sd.days]) continue;
				if(sd.name.indexOf("Momentum")===0) quotes[i][name]=quotes[i][field]-quotes[i-sd.days][field] + offset;
				else quotes[i][name]=100*((quotes[i][field]/quotes[i-sd.days][field])-1) + offset;
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
				total+=quotes[i].typicalPrice;
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
				total+=quotes[i].weightedClose;
				if(i>=period) {
					total-=quotes[i-period].weightedClose;
					quotes[i][name]=total/period;
				}
		    }
		};

		STX.Studies.calculateElderRay=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			STX.Studies.MA("exponential", sd.days, "Close", 0, "EMA", stx, sd);

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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
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
				STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, "EOM1 "+sd.name, 0, "Result", stx, sd);

		    }
		};

		STX.Studies.calculateChaikinVolatility=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    var i;
			for(i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["High-Low " + sd.name]=quotes[i].High - quotes[i].Low;
		    }
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, "High-Low "+sd.name, 0, "MA", stx, sd);

			var roc=sd.inputs["Rate Of Change"];
			if(!roc) roc=sd.days;
		    for(i=roc;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(!quotes[i-roc]["MA "+sd.name]) continue;
		    	quotes[i]["Result " + sd.name]=100*((quotes[i]["MA "+sd.name]/quotes[i-roc]["MA "+sd.name])-1);
		    }
		};
		
		STX.Studies.calculateChaikinMoneyFlow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var sumMoneyFlow=0,sumVolume=0;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["MFV " + sd.name]=quotes[i].Volume*(2*quotes[i].Close-quotes[i].High-quotes[i].Low)/(quotes[i].High-quotes[i].Low);
			    sumMoneyFlow+=quotes[i]["MFV " + sd.name];
		    	sumVolume+=quotes[i].Volume;
		    	if(i>sd.days-1){
				    sumMoneyFlow-=quotes[i-sd.days]["MFV " + sd.name];
			    	sumVolume-=quotes[i-sd.days].Volume;	    		
			    	if(sumVolume) quotes[i]["Result " + sd.name]=sumMoneyFlow/sumVolume;
		    	}
		    }
		};
		
		STX.Studies.calculateTwiggsMoneyFlow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var sumMoneyFlow=0,sumVolume=0;
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	var trh=Math.max(quotes[i-1].Close,quotes[i].High);
		    	var trl=Math.min(quotes[i-1].Close,quotes[i].Low);
		    	quotes[i]["MFV " + sd.name]=quotes[i].Volume*(2*quotes[i].Close-trh-trl)/(trh-trl===0?999999:trh-trl);
		    	if(i>sd.days-1){
		    		sumMoneyFlow*=(sd.days-1)/sd.days;
			    	sumVolume*=(sd.days-1)/sd.days;	    		
		    	}
			    sumMoneyFlow+=quotes[i]["MFV " + sd.name];
		    	sumVolume+=quotes[i].Volume;
		    	if(i>sd.days-1){
			    	if(sumVolume) quotes[i]["Result " + sd.name]=sumMoneyFlow/(sumVolume>0?sumVolume:999999);
		    	}
		    }
		};
		
		STX.Studies.calculateMassIndex=function(stx, sd){
			var quotes=sd.chart.scrubbed;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	quotes[i]["High-Low " + sd.name]=quotes[i].High - quotes[i].Low;
		    }

			STX.Studies.MA("exponential", 9, "High-Low "+sd.name, 0, "EMA", stx, sd);
			STX.Studies.MA("exponential", 9, "EMA "+sd.name, 0, "EMA2", stx, sd);

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
	    				if(cumNegMF===0) quotes[i]["Result " + sd.name]=100;
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
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			STX.Studies.MA("time series", sd.days, field, 0, "MA", stx, sd);
		    for(var i=1;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
			    quotes[i]["Result " + sd.name]=100*(1-(quotes[i]["MA "+sd.name]/quotes[i][field]));
		    }
		};

		STX.Studies.calculateDetrendedPrice=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, field, 0, "MA", stx, sd);


		    for(var i=Math.floor(sd.days/2-1);i<quotes.length-Math.floor(sd.days/2+1);i++){
			    quotes[i]["Result " + sd.name]=quotes[i][field]-quotes[i+Math.floor(sd.days/2+1)]["MA "+sd.name];
		    }
		};

		STX.Studies.calculateAroon=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var daysSinceHigh=0,daysSinceLow=0;
			var xDayHigh=null,xDayLow=null;
			var j;
		    for(var i=0;i<quotes.length;i++){
		    	if(!quotes[i]) continue;
		    	if(xDayHigh===null) xDayHigh=quotes[i].High;
		    	if(xDayLow===null) xDayLow=quotes[i].Low;
		    	xDayHigh=Math.max(xDayHigh,quotes[i].High);
		    	if(xDayHigh==quotes[i].High){
		    		daysSinceHigh=0;
		    	}else{
		    		daysSinceHigh++;
			    	if(daysSinceHigh>sd.days){
			    		xDayHigh=quotes[i].High;
			    		daysSinceHigh=0;
			    		for(j=1;j<=sd.days;j++){
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
			    		for(j=1;j<=sd.days;j++){
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
				else if(primes[x]===true || primes[x]===false) return primes[x];
				var q = parseInt(Math.sqrt(x),10);
			    for (var i = 2; i <= q; i++){
			        if (x%i===0) {
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
		    	if(high%2===0) high++;
		    	while(!isPrime(high)) high+=2;
		    	high/=Math.pow(10,h);
		    	
		    	var low=quote.Low;
		    	//low=Math.floor(low);
		    	for(var l=0;low>0 && low<=10;l++) low*=10;
		    	if(isPrime(low)) low-=2;
		    	low=Math.floor(low);
		    	if(low%2===0) low--;
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
			var field=sd.inputs.Field;
			var maType=sd.inputs["Moving Average Type"];
			if(!maType) maType="simple";
			if(!field || field=="field"){
				if(isVolume) {
					field="Volume";
					maType="exponential";
				}
				else field="Close";
			}
			var pts=sd.inputs["Points Or Percent"];
			if(!pts) pts="Points";
			
			STX.Studies.MA(maType, Number(sd.inputs["Short Cycle"]), field, 0, "Short MA", stx, sd);
			STX.Studies.MA(maType, Number(sd.inputs["Long Cycle"]), field, 0, "Long MA", stx, sd);
			
		    for(var i=0;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
		        if(pts=="Points") quote["Result " + sd.name]=quote["Short MA " + sd.name]-quote["Long MA " + sd.name];
		        else quote["Result " + sd.name]=100*((quote["Short MA " + sd.name]/quote["Long MA " + sd.name])-1);
		    }
		};

		STX.Studies.calculateKeltner=function(stx, sd){
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, "Close", 0, "MA", stx, sd);
			STX.Studies.calculateStudyATR(stx,sd);
			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs.Shift, "MA "+sd.name, "ATR " + sd.name);
		};
		
		STX.Studies.calculateCoppock=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";

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

			STX.Studies.MA("weighted", period, "Sum "+sd.name, 0, "Result", stx, sd);
		};
		
		STX.Studies.calculateLinearRegressionIndicator=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			
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
		
		// Old version of study had outputs "Bollinger Band ...", this will convert to new "Bollinger Bands ..."
		STX.Studies.convertOldBollinger=function(stx, type, inputs, outputs, parameters, panel){
			for(var o in outputs){
				if(o.indexOf("Bands")>0) break;  //new way already
				outputs[o.replace(/ Band /," Bands ")]=outputs[o];
				delete outputs[o];
			}
			return STX.Studies.initializeFN(stx, type, inputs, outputs, parameters, panel);
		};
		
		STX.Studies.calculateBollinger=function(stx, sd){
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, field, 0, "MA", stx, sd);

			sd.std=new STX.Studies.StudyDescriptor(sd.name, "STD Dev", sd.panel);
			sd.std.chart=sd.chart;
			sd.std.days=sd.days;
			sd.std.inputs={"Field":field, "Standard Deviations":1, "Type":sd.inputs["Moving Average Type"]};
			sd.std.outputs={"STD Dev":null};
			STX.Studies.calculateStandardDeviation(stx,sd.std);
			
			STX.Studies.calculateGenericEnvelope(stx, sd, sd.inputs["Standard Deviations"], "MA "+sd.name, "STD Dev "+sd.name);
		};
		
		STX.Studies.calculateMAEnvelope=function(stx, sd){
			var field=sd.inputs.Field;
			if(!field || field=="field") field="Close";
			STX.Studies.MA(sd.inputs["Moving Average Type"], sd.days, field, 0, "MA", stx, sd);
			var shiftType=sd.inputs["Shift Type"];
			var shift=sd.inputs.Shift;
			if(!shiftType){//legacy
				shiftType="percent";
				shift=sd.inputs["Shift Percentage"];
			}
			if(shiftType=="percent"){
				STX.Studies.calculateGenericEnvelope(stx, sd, shift/100, "MA "+sd.name);
			}else if(shiftType=="points"){
				STX.Studies.calculateGenericEnvelope(stx, sd, null, "MA "+sd.name, null, Number(shift));
			}
		};

		/**
		 * Calculate function for preparing data to be used by displayChannel().
		 * Inserts the following fields in the dataSet:
		 * <code>
		 * quote[sd.type + " Top " + sd.name]=quote[centerIndex]+totalShift;<br>
		 * quote[sd.type + " Bottom " + sd.name]=quote[centerIndex]-totalShift;<br>
		 * quote[sd.type + " Median " + sd.name]=quote[centerIndex];<br>
		 * quote["Bandwidth " + sd.name]=200*totalShift/quote[centerIndex];<br>
		 * quote["%b " + sd.name]=50*((quote.Close-quote[centerIndex])/totalShift+1);<br>
		 * </code>
		 * Example: 'Prime Bands' + ' Top ' +  'Prime Number Bands (true)'.
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 * @param  {object} percentShift Used to calculate totalShift. Defaults to 0 (zero)
		 * @param  {object} centerIndex  Quote element to use for center series (Open, Close, High, Low). Defaults to "Close"
		 * @param  {object} offsetIndex  Quote element to use for calculating totalShift (percentShift*quote[offsetIndex]+pointShift;)
		 * @param  {object} pointShift   Used to calculate totalShift.Defaults to 0 (zero)
		 * @memberOf STX.Studies
		 */
		STX.Studies.calculateGenericEnvelope=function(stx, sd, percentShift, centerIndex, offsetIndex, pointShift){
			if(!percentShift) percentShift=0;
			if(!pointShift) pointShift=0;
			if(!offsetIndex) offsetIndex="Close";
			if(!centerIndex) centerIndex="Close";
			var quotes=sd.chart.scrubbed;
		    for(var i=0;quotes && i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
				if(!quote[centerIndex]) continue;
				var totalShift=percentShift*quote[offsetIndex]+pointShift;
		        quote[sd.type + " Top " + sd.name]=quote[centerIndex]+totalShift;
		        quote[sd.type + " Bottom " + sd.name]=quote[centerIndex]-totalShift;
		        quote[sd.type + " Median " + sd.name]=quote[centerIndex];
		        quote["Bandwidth " + sd.name]=200*totalShift/quote[centerIndex];
		        quote["%b " + sd.name]=50*((quote.Close-quote[centerIndex])/totalShift+1);
		    }
		};
		
		STX.Studies.calculateMaxHighMinLow=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			var low=-1,high=-1;
		    for(var i=0;i<quotes.length;i++){
		        var period=sd.days;
	        	high=Math.max(high==-1?quotes[i].High:high,quotes[i].High);
		        low=Math.min(low==-1?quotes[i].Low:low,quotes[i].Low);
		        if(sd.inputs["High Period"]) period=sd.inputs["High Period"];
		        var j;
		        if(i>=period){
		        	if((quotes[i-period].High)==high){
		        		high=quotes[i].High;
		        		for(j=1;j<period;j++){
		        			high=Math.max(high,quotes[i-j].High);
		        		}
		        	}
		        }
		        if(sd.inputs["Low Period"]) period=sd.inputs["Low Period"];
			    if(i>=period){
		        	if((quotes[i-period].Low)==low){
		        		low=quotes[i].Low;
		        		for(j=1;j<period;j++){
		        			low=Math.min(low,quotes[i-j].Low);
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
			STX.Studies.calculateTypicalPrice(stx,sd.tp);
			
			STX.Studies.MA("simple", sd.days, "typicalPrice", 0, "MA", stx, sd);

		    for(var i=sd.days-1;i<quotes.length;i++){
		    	var quote=quotes[i];
		    	if(!quote) continue;
				var md=0;
				for(var j=0;j<sd.days;j++){
					md+=Math.abs(quotes[i-j].typicalPrice - quote["MA " + sd.name]);
				}
				md/=sd.days;
		        quote["Result " + sd.name]=(quote.typicalPrice - quote["MA " + sd.name]) / (0.015 * md);
		    }
		};
		
		STX.Studies.calculateFractalChaos=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			
			var fractalHigh=0;
			var fractalLow=0;
			var test=0;
		    for(var i=4;i<quotes.length;i++){
		    	quotes[i]["Result " + sd.name]=0;
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
		    	for(j=0;j<=i;j++){
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
		
		STX.Studies.displayPrettyGoodOscillator=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var low=-3;
			var high=3;
			
			var panel=stx.panels[sd.panel];
			var color=stx.chart.context.strokeStyle;
			
			stx.chart.context.globalAlpha=0.2;
			stx.chart.context.strokeStyle=sd.outputs.Result;
				
			stx.chart.context.beginPath();
			var ph=stx.pixelFromPrice(high,panel);
			stx.chart.context.moveTo(0,ph);
			stx.chart.context.lineTo(stx.chart.width,ph);

			pl=stx.pixelFromPrice(low,panel);			
			stx.chart.context.moveTo(0,pl);
			stx.chart.context.lineTo(stx.chart.width,pl);
			stx.chart.context.stroke();
			stx.chart.context.closePath();

			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:high, direction:1, color:sd.outputs.Result});
			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:low, direction:-1, color:sd.outputs.Result});

			stx.chart.context.strokeStyle=color;
			stx.chart.context.globalAlpha=1;
		};

		STX.Studies.displayRAVI=function(stx, sd, quotes){
			var i;
			for(i=0;i<quotes.length;i++){
				if(!quotes[i]) continue;
				quotes[i][sd.name+"_hist"]=quotes[i]["Result "+sd.name];
				//delete quotes[i]["Result "+sd.name];
			}
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
			stx.startClip(sd.panel);
			for(i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote || !quotes[i-1]) continue;
				var overBought=0, overSold=0;
				if(sd.parameters && sd.parameters.studyOverZonesEnabled){
					overBought=parseFloat(sd.parameters.studyOverBoughtValue);
					overSold=parseFloat(sd.parameters.studyOverSoldValue);
				}
				if(i===0) stx.chart.context.fillStyle="#CCCCCC";
				else if(quote[sd.name+"_hist"]>overBought && quotes[i-1][sd.name+"_hist"]<quote[sd.name+"_hist"]) stx.chart.context.fillStyle=upColor;
				else if(quote[sd.name+"_hist"]<overSold && quotes[i-1][sd.name+"_hist"]>quote[sd.name+"_hist"]) stx.chart.context.fillStyle=downColor;
				else stx.chart.context.fillStyle="#CCCCCC";
				if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
				stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2),
						Math.floor(y),
						Math.floor(myWidth),
						Math.floor(stx.pixelFromPrice(quote[sd.name+"_hist"], panel)-y));
			}
			stx.endClip();
		};

		STX.Studies.displayElderRay=function(stx, sd, quotes){
			STX.Studies.determineMinMax(stx, sd, quotes);
			var panel = stx.panels[sd.panel];
			panel.yAxis.low=panel.min=Math.min(0,panel.min);
			panel.yAxis.high=panel.max=Math.max(0,panel.max);
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var y=stx.pixelFromPrice(0, panel);

			var myWidth=stx.layout.candleWidth-2;
			if(myWidth<2) myWidth=1;
			function drawBar(i,reduction,output,hist){
				stx.chart.context.fillStyle=sd.outputs[output];
				stx.chart.context.fillRect(Math.floor(stx.pixelFromBar(i, panel.chart)-myWidth/2+myWidth*reduction),
						Math.floor(y), 
						Math.floor(myWidth*(1-2*reduction)),
						Math.floor(stx.pixelFromPrice(quote[sd.name+hist], panel)-y));
			}
			
			stx.canvasColor("stx_histogram");
			var fillStyle=stx.chart.context.fillStyle;
			stx.chart.context.globalAlpha=1;
			stx.startClip(sd.panel);
			for(var i=0;i<quotes.length;i++){
				var quote=quotes[i];
				if(!quote) continue;
				if(quote.candleWidth) myWidth=Math.floor(Math.max(1,quote.candleWidth-2));
				if(quote[sd.name+"_hist1"]>0) drawBar(i,0,"Elder Bull Power","_hist1");
				if(quote[sd.name+"_hist2"]<0) drawBar(i,0,"Elder Bear Power","_hist2");
				if(quote[sd.name+"_hist1"]<0) drawBar(i,0.1,"Elder Bull Power","_hist1");
				if(quote[sd.name+"_hist2"]>0) drawBar(i,0.1,"Elder Bear Power","_hist2");
			}
			stx.endClip();
			stx.chart.context.fillStyle=fillStyle;
		};
		
		STX.Studies.displayMassIndex=function(stx, sd, quotes){
			STX.Studies.displaySeriesAsLine(stx, sd, quotes);

			var bulge=sd.inputs["Bulge Threshold"];
			
			var panel=stx.panels[sd.panel];
			var color=stx.chart.context.strokeStyle;
			
			stx.chart.context.globalAlpha=0.2;
			stx.chart.context.strokeStyle=sd.outputs.Result;
				
			stx.chart.context.beginPath();
			var p=stx.pixelFromPrice(bulge,panel);
			stx.chart.context.moveTo(0,p);
			stx.chart.context.lineTo(stx.chart.width,p);
			stx.chart.context.stroke();
			stx.chart.context.closePath();

			STX.Studies.preparePeakValleyFill(stx,quotes,{panelName:sd.panel, band:"Result " + sd.name, threshold:bulge, direction:1, color:sd.outputs.Result});

			stx.chart.context.strokeStyle=color;
			stx.chart.context.globalAlpha=1;
		};
		
		/**
		 * Rendering function for displaying a Channel study output composed of top, middle and bottom lines.
		 * 
		 * Requires study library input of <code>"Channel Fill":true</code> to determine if the area within the channel is to be shaded. 
		 * Shading will be done using the "xxxxx Channel" or "xxxxx Median" color defined in the outputs parameter of the study library.
		 * 
		 * Requires study library outputs to have fields in the format of :
		 * - 'xxxxx Top' or 'xxxxx High' for the top band,
		 * - 'xxxxx Bottom' or 'xxxxx Low' for the bottom band and 
		 * - 'xxxxx Median' or 'xxxxx Channel' for the middle line. 
		 * 
		 * It expects 'quotes' to have fields for each series in the channel with keys in the following format: 
		 * - study-output-name ( from study library) + " " + sd.name. 
		 * - Example: 'Prime Bands Top'+ ' ' +  'Prime Number Bands (true)'. Which equals : 'Prime Bands Top Prime Number Bands (true)'
		 * 
		 * @param  {STXChart} stx Chart object
		 * @param  {object} sd  Study Descriptor
		 * @param {array} quotes The array of quotes needed to render the channel
		 * @memberOf STX.Studies
		 * @example
		 * "inputs": {"Period":5, "Shift": 3, "Field":"field", "Channel Fill":true}
		 * "outputs": {"Prime Bands Top":"red", "Prime Bands Bottom":"auto", "Prime Bands Channel":"rgb(184,44,11)"}
		 */
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


		/**
		 * A sample study calculation function. Note how sd.chart.scrubbed is used instead of dataSet. Also note the naming convention
		 * for the outputs.
		 * @memberOf STX.Studies
		 */
		STX.Studies.calculateRSI=function(stx, sd){
			var quotes=sd.chart.scrubbed;
			function computeRSI(avgGain, avgLoss){
				if(avgLoss===0) return 100;
				var rs=avgGain/avgLoss;
				return 100-(100/(1+rs));
			}
			if(quotes.length<sd.days+1){
				if(typeof practiceMode!="undefined" && practiceMode) return;
				stx.watermark(sd.panel,"center","bottom",stx.translateIf("Not enough quotes to compute RSI"));
				return;
			}
			var gain=0, loss=0, i, change;
			for(i=1;i<sd.days;i++){
				change=quotes[i].Close-quotes[i-1].Close;
				if(change<0) loss+=(change*-1);
				else gain+=change;
			}
			var avgGain=gain/sd.days;
			var avgLoss=loss/sd.days;
			quotes[i][sd.name]=computeRSI(avgGain, avgLoss);
			var name="RSI " + sd.name;
			for(i=sd.days;i<quotes.length;i++){
				var quote=quotes[i];
				change=quote.Close-quotes[i-1].Close;
				if(change>0){
					avgGain=((avgGain*(sd.days-1))+change)/sd.days;
					avgLoss=avgLoss*(sd.days-1)/sd.days;
				}else{
					avgLoss=((avgLoss*(sd.days-1))+(change*-1))/sd.days;
					avgGain=avgGain*(sd.days-1)/sd.days;
				}
				quote[name]=computeRSI(avgGain, avgLoss);
			}
			sd.zoneOutput="RSI";
		};

		/**
		 * The studyLibrary defines all of the available studies. This is used to drive the dialog boxes and creation of the studies. When you
		 * create a custom study you should add it to the studyLibrary.
		 * See {@tutorial Custom Studies} for complete details
		 * @type {Object}
		 * @memberOf STX.Studies
		 * @example
		 * "RAVI": {
				"name": "RAVI",
				"seriesFN": STX.Studies.displayRAVI,
				"calculateFN": STX.Studies.calculatePriceOscillator,
				"inputs": {"Field":"field", "Short Cycle":7, "Long Cycle":65},
				"outputs": {"Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:.3, studyOverBoughtColor:"auto", studyOverSoldValue:-.3, studyOverSoldColor:"auto"}
				}
			},
		 */
		STX.Studies.studyLibrary={
			"rsi": {
				"name": "RSI",
				"inputs": {"Period":14},
				"calculateFN": STX.Studies.calculateRSI,
				"range": "0 to 100",
				"outputs":{"RSI":"auto"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
				}
			},
			"ma": {
				"name": "Moving Average",
				"overlay": true,
				"range": "bypass",
				"calculateFN": STX.Studies.calculateMovingAverage,
				"inputs": {"Period":50,"Field":"field","Type":"ma","Offset":0, "Underlay": false},
				"outputs": {"MA":"#FF0000"}
			},
			"macd": {
				"name": "MACD",
				"calculateFN": STX.Studies.calculateMACD,
				"seriesFN": STX.Studies.displayHistogramWithSeries,
				"inputs": {"Fast MA Period":12,"Slow MA Period":26,"Signal Period":9},
				"outputs":{"MACD":"auto", "Signal":"#FF0000", "Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"}
			},
			"stochastics": {
				"name": "Stochastics",
				"range": "0 to 100",
				"initializeFN": STX.Studies.initializeStochastics,
				"calculateFN": STX.Studies.calculateStochastics,
				"inputs": {"Period":14,"Smooth":true},
				"outputs":{"Fast":"auto", "Slow":"#FF0000"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
				}
			},
			"Aroon": {
				"name": "Aroon",
				"range": "0 to 100",
				"calculateFN": STX.Studies.calculateAroon,
				"outputs":{"Aroon Up":"#00DD00", "Aroon Down":"#FF0000"}
			},
			"Aroon Osc": {
				"name": "Aroon Oscillator",
				"calculateFN": STX.Studies.calculateAroon,
				"outputs":{"Aroon Oscillator":"auto"}
			},
			"Lin R2": {
				"name": "Linear Reg R2",
				"calculateFN": STX.Studies.calculateLinearRegressionIndicator,
				"inputs": {"Period":14,"Field":"field"},
				"outputs":{"RSquared":"auto"}
			},
			"Lin Fcst": {
				"name": "Linear Reg Forecast",
				"overlay": true,
				"calculateFN": STX.Studies.calculateLinearRegressionIndicator,
				"inputs": {"Period":14,"Field":"field"},
				"outputs":{"Forecast":"auto"}
			},
			"Lin Incpt": {
				"name": "Linear Reg Intercept",
				"overlay": true,
				"calculateFN": STX.Studies.calculateLinearRegressionIndicator,
				"inputs": {"Period":14,"Field":"field"},
				"outputs":{"Intercept":"auto"}
			},
			"Time Fcst": {
				"name": "Time Series Forecast",
				"overlay": true,
				"calculateFN": STX.Studies.calculateLinearRegressionIndicator,
				"inputs": {"Period":14,"Field":"field"},
				"outputs":{"Forecast":"auto"}
			},
			"VT HZ Filter": {
				"name": "Vertical Horizontal Filter",
				"calculateFN": STX.Studies.calculateVerticalHorizontalFilter,
				"inputs": {"Period":28}
			},
			"TRIX": {
				"name": "TRIX",
				"calculateFN": STX.Studies.calculateTRIX
			},
			"STD Dev": {
				"name": "Standard Deviation",
				"calculateFN": STX.Studies.calculateStandardDeviation,
				"inputs": {"Period":14,"Field":"field", "Standard Deviations":2, "Moving Average Type":"ma"}
			},
			"Trade Vol": {
				"name": "Trade Volume Index",
				"calculateFN": STX.Studies.calculateOnBalanceVolume,
				"inputs": {"Min Tick Value":0.5}
			},
			"Swing": {
				"name": "Swing Index",
				"calculateFN": STX.Studies.calculateSwingIndex,
				"inputs": {"Limit Move Value":0.5}
			},
			"Acc Swing": {
				"name": "Accumulative Swing Index",
				"calculateFN": STX.Studies.calculateSwingIndex,
				"inputs": {"Limit Move Value":0.5}
			},
			"Price ROC": {
				"name": "Price Rate of Change",
				"calculateFN": STX.Studies.calculateRateOfChange,
				"inputs": {"Field":"field","Period":14}
			},
			"Vol ROC": {
				"name": "Volume Rate of Change",
				"calculateFN": STX.Studies.calculateRateOfChange
			},
			"Momentum": {
				"name": "Momentum Indicator",
				"calculateFN": STX.Studies.calculateRateOfChange,
				"inputs": {"Period":14},
				"centerline": 0
			},
			"Price Vol": {
				"name": "Price Volume Trend",
				"calculateFN": STX.Studies.calculatePriceVolumeTrend,
				"inputs": {"Field":"field"}
			},
			"Pos Vol": {
				"name": "Positive Volume Index",
				"calculateFN": STX.Studies.calculateVolumeIndex,
				"inputs": {"Field":"field","Moving Average Type":"ma","Period":255},
				"outputs": {"Index":"auto","MA":"#FF0000"}
			},
			"Neg Vol": {
				"name": "Negative Volume Index",
				"calculateFN": STX.Studies.calculateVolumeIndex,
				"inputs": {"Field":"field","Moving Average Type":"ma","Period":255},
				"outputs": {"Index":"auto","MA":"#FF0000"}
			},
			"On Bal Vol": {
				"name": "On Balance Volume",
				"calculateFN": STX.Studies.calculateOnBalanceVolume,
				"inputs": {}
			},
			"Perf Idx": {
				"name": "Performance Index",
				"calculateFN": STX.Studies.calculatePerformance,
				"inputs": {"Field":"field"}
			},
			"Stch Mtm": {
				"name": "Stochastic Momentum Index",
				"calculateFN": STX.Studies.calculateStochMomentum,
				"inputs": {"%K Periods":10,"%K Smoothing Periods":3, "%K Double Smoothing Periods":3, "%D Periods":10, "%D Moving Average Type":"ema"},
				"outputs":{"%K":"auto", "%D":"#FF0000"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:40, studyOverBoughtColor:"auto", studyOverSoldValue:-40, studyOverSoldColor:"auto"}
				}
			},
			"Hist Vol": {
				"name": "Historical Volatility",
				"calculateFN": STX.Studies.calculateHistoricalVolatility,
				"inputs": {"Field":"field", "Period":10, "Days Per Year":[252,365], "Standard Deviations":1}
			},
			"Pretty Good": {
				"name": "Pretty Good Oscillator",
				"seriesFN": STX.Studies.displayPrettyGoodOscillator,
				"calculateFN": STX.Studies.calculatePrettyGoodOscillator
			},
			"Ultimate": {
				"name": "Ultimate Oscillator",
				"calculateFN": STX.Studies.calculateUltimateOscillator,
				"inputs": {"Cycle 1":7, "Cycle 2":14, "Cycle 3":28},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:70, studyOverBoughtColor:"auto", studyOverSoldValue:30, studyOverSoldColor:"auto"}
				}
			},
			"Vol Osc": {
				"name": "Volume Oscillator",
				"calculateFN": STX.Studies.calculatePriceOscillator,
				"inputs": {"Short Cycle":12, "Long Cycle":26, "Points Or Percent":["Points","Percent"]}
			},
			"Twiggs": {
				"name": "Twiggs Money Flow",
				"calculateFN": STX.Studies.calculateTwiggsMoneyFlow,			
				"inputs":{"Period":21}
			},
			"Chaikin MF": {
				"name": "Chaikin Money Flow",
				"calculateFN": STX.Studies.calculateChaikinMoneyFlow,			
				"inputs":{"Period":20}
			},
			"Chaikin Vol": {
				"name": "Chaikin Volatility",
				"calculateFN": STX.Studies.calculateChaikinVolatility,			
				"inputs": {"Period":14, "Rate Of Change":2, "Moving Average Type":"ma"}
			},
			"Price Osc": {
				"name": "Price Oscillator",
				"calculateFN": STX.Studies.calculatePriceOscillator,
				"inputs": {"Field":"field", "Long Cycle":26, "Short Cycle":12, "Moving Average Type":"ema"}
			},
			"EOM": {
				"name": "Ease of Movement",
				"calculateFN": STX.Studies.calculateEaseOfMovement,			
				"inputs": {"Period":14, "Moving Average Type":"ma"}
			},
			"CCI": {
				"name": "Commodity Channel Index",
				"calculateFN":  STX.Studies.calculateCCI,			
				"inputs": {"Period":20},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:100, studyOverBoughtColor:"auto", studyOverSoldValue:-100, studyOverSoldColor:"auto"}
				}
			},
			"Detrended": {
				"name": "Detrended Price Oscillator",
				"calculateFN": STX.Studies.calculateDetrendedPrice,
				"inputs": {"Field":"field","Period":14, "Moving Average Type":"ma"}
			},
			"True Range": {
				"name": "True Range",
				"calculateFN": STX.Studies.calculateStudyATR,
				"inputs": {},
				"outputs":{"True Range":"auto"}
			},
			"ATR": {
				"name": "Average True Range",
				"calculateFN": STX.Studies.calculateStudyATR,
				"outputs":{"ATR":"auto"}
			},
			"Ehler Fisher": {
				"name": "Ehler Fisher Transform",
				"calculateFN": STX.Studies.calculateEhlerFisher,
				"inputs": {"Period":10},
				"outputs":{"EF":"auto", "EF Trigger":"#FF0000"}
			},
			"Schaff": {
				"name": "Schaff Trend Cycle",
				"range": "0 to 100",
				"calculateFN": STX.Studies.calculateSchaff,
				"inputs": {"Field":"field","Period":10, "Short Cycle":23, "Long Cycle":50, "Moving Average Type":"ema"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:75, studyOverBoughtColor:"auto", studyOverSoldValue:25, studyOverSoldColor:"auto"}
				}
			},
			"QStick": {
				"name": "",
				"calculateFN": STX.Studies.calculateQStick,
				"inputs": {"Period":8, "Moving Average Type":"ma"}
			},
			"Coppock": {
				"name": "Coppock Curve",
				"calculateFN": STX.Studies.calculateCoppock,
				"inputs": {"Field":"field","Short RoC":11,"Long RoC":14,"Period":10}
			},
			"Chande Mtm": {
				"name": "Chande Momentum Oscillator",
				"calculateFN": STX.Studies.calculateChandeMomentum,
				"inputs": {"Period":9},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:50, studyOverBoughtColor:"auto", studyOverSoldValue:-50, studyOverSoldColor:"auto"}
				}
			},
			"Chande Fcst": {
				"name": "Chande Forecast Oscillator",
				"calculateFN": STX.Studies.calculateChandeForecast,
				"inputs": {"Field":"field", "Period":14}
			},
			"Intraday Mtm": {
				"name": "Intraday Momentum Index",
				"calculateFN": STX.Studies.calculateIntradayMomentum,
				"inputs": {"Period":20},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:70, studyOverBoughtColor:"auto", studyOverSoldValue:30, studyOverSoldColor:"auto"}
				}
			},
			"RAVI": {
				"name": "RAVI",
				"seriesFN": STX.Studies.displayRAVI,
				"calculateFN": STX.Studies.calculatePriceOscillator,
				"inputs": {"Field":"field", "Short Cycle":7, "Long Cycle":65},
				"outputs": {"Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:0.3, studyOverBoughtColor:"auto", studyOverSoldValue:-0.3, studyOverSoldColor:"auto"}
				}
			},
			"Random Walk": {
				"name": "Random Walk Index",
				"calculateFN": STX.Studies.calculateRandomWalk,
				"outputs": {"Random Walk High":"#FF0000", "Random Walk Low":"#0000FF"}
			},
			"ADX": {
				"name": "ADX/DMS",
				"calculateFN": STX.Studies.calculateADX,
				"outputs": {"ADX":"auto", "+DI":"#00FF00", "-DI":"#FF0000"}
			},
			"Directional": {
				"name": "ADX/DMS",
				"calculateFN": STX.Studies.calculateADX,
				"outputs": {"ADX":"auto", "+DI":"#00FF00", "-DI":"#FF0000"}
			},
			"High Low": {
				"name": "High Low Bands",
				"overlay": true,
				"seriesFN": STX.Studies.displayChannel,
				"calculateFN": function(stx, sd){ sd.inputs["Moving Average Type"]="triangular"; STX.Studies.calculateMAEnvelope(stx, sd); },
				"inputs": {"Field":"field", "Period":10, "Shift Percentage":5, "Channel Fill":true},
				"outputs": {"High Low Top":"auto", "High Low Median":"auto", "High Low Bottom":"auto"}
			},
			"High-Low": {
				"name": "High Minus Low",
				"calculateFN": function(stx, sd){var quotes=sd.chart.scrubbed; for(var i=0;i<quotes.length;i++){ quotes[i]["Result " + sd.name]=quotes[i].High - quotes[i].Low; }},
				"inputs": {}
			},
			"Med Price": {
				"name": "Median Price",
				"calculateFN": STX.Studies.calculateMedianPrice,
				"inputs": {}
			},
			"MA Env": {
				"name": "Moving Average Envelope",
				"overlay": true,
				"seriesFN": STX.Studies.displayChannel,
				"calculateFN": STX.Studies.calculateMAEnvelope,
				"inputs": {"Field":"field", "Period":50, "Shift Type":["percent","points"], "Shift": 5, "Moving Average Type": "ma", "Channel Fill":true},
				"outputs": {"MA Env Top":"auto", "MA Env Median":"auto", "MA Env Bottom":"auto"}
			},
			"Fractal Chaos Bands": {
				"name": "Fractal Chaos Bands",
				"overlay": true,
				"calculateFN": STX.Studies.calculateFractalChaos,
				"seriesFN": STX.Studies.displayChannel,
				"inputs": {"Channel Fill":true},
				"outputs": {"Fractal High":"auto", "Fractal Low":"auto", "Fractal Channel":"auto"}
			},
			"Fractal Chaos": {
				"name": "Fractal Chaos Oscillator",
				"range": "-1 to 1",
				"calculateFN": STX.Studies.calculateFractalChaos,
				"inputs": {},
				"centerline": 20  //so centerline is "off the chart" and not visible
			},
			"GAPO": {
				"name": "Gopalakrishnan Range Index",
				"calculateFN": STX.Studies.calculateMaxHighMinLow
			},
			"Gopala": {
				"name": "Gopalakrishnan Range Index",
				"calculateFN": STX.Studies.calculateMaxHighMinLow
			},
			"Prime Number Bands": {
				"name": "Prime Number Bands",
				"overlay": true,
				"calculateFN": STX.Studies.calculatePrimeNumber,
				"seriesFN": STX.Studies.displayChannel,
				"inputs": {"Channel Fill":true},
				"outputs": {"Prime Bands Top":"auto", "Prime Bands Bottom":"auto", "Prime Bands Channel":"auto"}
			},
			"Prime Number": {
				"name": "Prime Number Oscillator",
				"range": "-1 to 1",
				"calculateFN": STX.Studies.calculatePrimeNumber,
				"inputs": {"Tolerance Percentage":5}
			},
			"Bollinger Bands": {
				"name": "Bollinger Bands",
				"overlay": true,
				"initializeFN": STX.Studies.convertOldBollinger,
				"calculateFN": STX.Studies.calculateBollinger,
				"seriesFN": STX.Studies.displayChannel,
				"inputs": {"Field":"field", "Period":20, "Standard Deviations": 2, "Moving Average Type":"ma", "Channel Fill": true},
				"outputs": {"Bollinger Bands Top":"auto", "Bollinger Bands Median":"auto", "Bollinger Bands Bottom":"auto"}
			},
			"Donchian Channel": {
				"name": "Donchian Channel",
				"overlay": true,
				"calculateFN": STX.Studies.calculateMaxHighMinLow,
				"seriesFN": STX.Studies.displayChannel,
				"inputs": {"High Period":20, "Low Period":20, "Channel Fill":true},
				"outputs": {"Donchian High":"auto", "Donchian Median":"auto", "Donchian Low":"auto"}
			},
			"HHV": {
				"name": "Highest High Value",
				"calculateFN": STX.Studies.calculateMaxHighMinLow,
				"inputs": {"Period":14},
			},
			"LLV": {
				"name": "Lowest Low Value",
				"calculateFN": STX.Studies.calculateMaxHighMinLow,
				"inputs": {"Period":14},
			},
			"Mass Idx": {
				"name": "Mass Index",
				"seriesFN": STX.Studies.displayMassIndex,
				"calculateFN": STX.Studies.calculateMassIndex,
				"inputs": {"Period":25,"Bulge Threshold":27},
			},
			"Keltner": {
				"name": "Keltner Channel",
				"overlay": true,
				"seriesFN": STX.Studies.displayChannel,
				"calculateFN": STX.Studies.calculateKeltner,
				"inputs": {"Period":50, "Shift": 5, "Moving Average Type":"ema", "Channel Fill":true},
				"outputs": {"Keltner Top":"auto", "Keltner Median":"auto", "Keltner Bottom":"auto"}
			},
			"PSAR": {
				"name": "Parabolic SAR",
				"overlay": true,
				"calculateFN": STX.Studies.calculatePSAR,
				"seriesFN": STX.Studies.displayPSAR2,
				"inputs": {"Minimum AF":0.02,"Maximum AF":0.2}
			},
			"Klinger": {
				"name": "Klinger Volume Oscillator",
				"seriesFN": STX.Studies.displayHistogramWithSeries,
				"calculateFN": STX.Studies.calculateKlinger,
				"inputs": {"Signal Periods":13, "Short Cycle":34, "Long Cycle":55},
				"outputs": {"Klinger":"auto", "KlingerSignal":"#FF0000", "Increasing Bar":"#00DD00", "Decreasing Bar":"#FF0000"}
			},
			"Elder Ray": {
				"name": "Elder Ray Index",
				"seriesFN": STX.Studies.displayElderRay,
				"calculateFN": STX.Studies.calculateElderRay,
				"inputs": {"Period":13},
				"outputs": {"Elder Bull Power":"#00DD00", "Elder Bear Power":"#FF0000"}
			},
			"Elder Force": {
				"name": "Elder Force Index",
				"calculateFN": STX.Studies.calculateElderForce,
				"inputs": {}
			},
			"LR Slope": {
				"name": "Linear Reg Slope",
				"calculateFN": STX.Studies.calculateLinearRegressionIndicator,
				"inputs": {"Period":14,"Field":"field"},
				"outputs":{"Slope":"auto"}
			},
			"COG": {
				"name": "Center Of Gravity",
				"calculateFN": STX.Studies.calculateCenterOfGravity,
				"inputs": {"Period":10,"Field":"field"},
			},
			"Typical Price": {
				"name": "Typical Price",
				"calculateFN": STX.Studies.calculateTypicalPrice,
				"inputs": {"Period":14,"Overlay":false}
			},
			"Weighted Close": {
				"name": "Weighted Close",
				"calculateFN": STX.Studies.calculateWeightedClose,
				"inputs": {"Period":14,"Overlay":false}
			},
			"M Flow":{
				"name": "Money Flow Index",
				"range": "0 to 100",
				"calculateFN": STX.Studies.calculateMoneyFlowIndex,
				"inputs":{"Period":14},				
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:80, studyOverBoughtColor:"auto", studyOverSoldValue:20, studyOverSoldColor:"auto"}
				}
			},
			"Williams %R": {
				"name": "Williams %R",
				"calculateFN": STX.Studies.calculateMaxHighMinLow,
				"inputs":{"Period":14},
				"parameters": {
					template:"studyOverZones",
					init:{studyOverZonesEnabled:true, studyOverBoughtValue:-20, studyOverBoughtColor:"auto", studyOverSoldValue:-80, studyOverSoldColor:"auto"}
				}
			},
			"W Acc Dist": {
				"name": "Williams Accumulation/Distribution",
				"calculateFN": STX.Studies.calculateAccumulationDistribution,
				"inputs":{}
			},
			"vchart": {
				"name": "Volume Chart",
				"display": "Volume",
			    "range": "0 to max",
			    "yAxis": {"ground":true, "initialMarginTop":0},
			    "seriesFN": STX.Studies.createVolumeChart,
			    "calculateFN": STX.Studies.calculateVolume,
			    "inputs": {},
			    "outputs": {"Up Volume":"#8cc176","Down Volume":"#b82c0c"},
			    "parameters": {
			    	"zoom": 0,
			    	"displayBorder": true
			    }
			},
			"volume": {
				"name": "Volume Chart",
				"display": "Volume",
			    "range": "0 to max",
			    "yAxis": {"ground":true, "initialMarginTop":0},
			    "seriesFN": STX.Studies.createVolumeChart,
			    "calculateFN": STX.Studies.calculateVolume,
			    "inputs": {},
			    "outputs": {"Up Volume":"#8cc176","Down Volume":"#b82c0c"},
			    "parameters": {
			    	"zoom": 0,
			    	"displayBorder": true
			    }
			},
			"vol undr": {
				"name": "Volume Underlay",
				"underlay": true,
			    "seriesFN": STX.Studies.volUnderlay,
			    "calculateFN": STX.Studies.calculateVolume,
			    "inputs": {},
			    "outputs": {"Up Volume":"#8cc176","Down Volume":"#b82c0c"},
				"customRemoval": true,
				"removeFN": function(stx, sd){
						stx.layout.volumeUnderlay=false;
						stx.changeOccurred("layout");
					},
			    "parameters": {
			    	"displayBorder": true,
			    	"heightPercentage": 0.25
				}
			}
		};

		/**
		 * Creates a Lines renderer
		 * 
		 * Note: by default the renderer will display lines as underlays. As such, they will appear below the chart ticks and any other studies or drawings.
		 * 
		 * See {@link STX.Renderer#construct} for parameters required by all renderers
		 * @param {Object} config Config for renderer
		 * @param  {object} [config.params] Parameters to control the renderer itself
		 * @param  {number} [config.params.width] Width of the rendered line
		 * @param  {string} [config.params.subtype="none"] Subtype of rendering: "step" or "none"
		 * @param  {string} [config.params.type="line"] Type of rendering "line", "mountain" 
		 * @constructor
		 * @name  STX.Renderer.Lines
		 * 
		 * @example
			// create series for the renderer
			stxx.addSeries("NOK", {display:"NOK",data:{useDefaultQuoteFeed:true},width:4});
			stxx.addSeries("SNE", {display:"Sony",data:{useDefaultQuoteFeed:true},width:4});

			// create the y axis to assign to the renderer
			var axis=new STXChart.YAxis();
			axis.position="left";
			axis.textStyle="#FFBE00";

			// create a renderer and associate it to the chart
			renderer=stxx.setSeriesRenderer(new STX.Renderer.Lines({params:{name:"lines", type:"mountain", yAxis:axis}}));

			// remove all series form the renderer (not always needed) , attach new series, and render.
			renderer.removeAllSeries()
				.attachSeries("NOK", "#FFBE00")
				.attachSeries("SNE", "#FF9300")
				.ready();
			}
		 * 
		 * @example
			// This is an example on how completely remove a renderer and all associated data. 
			// This should only be necessary if you are also removing the chart itself.
			
			// remove all series from the renderer including series data from the masterData
      		renderer.removeAllSeries(true);
      		
      		// detach the series renderer from the chart.
      		stxx.removeSeriesRenderer(renderer);
      		
      		// delete the renderer itself.
      		delete renderer;
		 */
		STX.Renderer.Lines=function(config){
			this.construct(config);
		};
		STX.Renderer.Lines.stxInheritsFrom(STX.Renderer, false);

		STX.Renderer.Lines.prototype.performCalculations=function(){
			if(this.params.yAxis){
				var panel=this.stx.panels[this.params.panel];
				var fields=[];
				for(var i=0;i<this.seriesParams.length;i++){
					fields.push(this.seriesParams[i].field);
				}
				var minMax=this.stx.determineMinMax(this.stx.chart.dataSegment, fields, false, true);
				this.stx.calculateYAxisRange(panel, this.params.yAxis, minMax[0], minMax[1]);
				this.params.yAxis.high=minMax[1];
				this.params.yAxis.low=minMax[0];
			}
		};

		STX.Renderer.Lines.prototype.draw=function(){
			var chart=this.stx.panels[this.params.panel].chart;
			var seriesMap={};
			var s;
			for(s=0;s<this.seriesParams.length;s++){
				if(chart.series[this.seriesParams[s].field] ) { // make sure the series is still there.
					var defaultParams=STX.clone(chart.series[this.seriesParams[s].field].parameters);
					seriesMap[this.seriesParams[s].field]={
							parameters: STX.extend(STX.extend(defaultParams,this.params),this.seriesParams[s]),
							yValueCache: this.caches[this.seriesParams[s].field],
							useChartLegend: this.params.type=="legacy"
					};
				}
			}
			this.stx.drawSeries(chart,seriesMap, this.params.yAxis);
			for(s in seriesMap){
				this.caches[s]=seriesMap[s].yValueCache;
			}
		};

		/**
		 * Creates a Histogram renderer
		 * See {@link STX.Renderer#construct} for parameters required by all renderers
		 * @param {Object} config Config for renderer
		 * @param  {object} [config.params] Parameters to control the renderer itself
		 * @param  {boolean} [config.params.defaultBorders] Whether to draw a border for each bar as a whole.  Can be overridden by a border set for a series.  Default: false.
		 * @param  {number} [config.params.widthFactor] Width of each bar as a percentage of the candleWidth. Valid values are 0.00-1.00. Default: .8
		 * @param  {number} [config.params.heightPercentage] The amount of vertical space to use, valid values are 0.00-1.00. Default: .7
		 * @param  {boolean} [config.params.bindToYAxis] Set to true to bind the rendering to the y-axis and to draw it. Automatically set if params.yAxis is present.
		 * @param  {string} [config.params.subtype="overlaid"] Subtype of rendering "stacked", "clustered", "overlaid"
		 * @constructor
		 * @name  STX.Renderer.Histogram
		 * 	@example		
			    var axis2=new STXChart.YAxis();
			    axis2.position="left";
			
				// configure the histogram display
				var params={
					yAxis: axis2,
					name:				"Sentiment Data",
					type:				"histogram",
					subtype:			"stacked",
					heightPercentage:	.7,	 // how high to go. 1 = 100%
					opacity:			.7,  // only needed if supporting IE8, otherwise can use rgba values in histMap instead
					widthFactor:		.8	 // to control space between bars. 1 = no space in between
				};
				
			 	//legend creation callback
				function histogramLegend(colors){
			        stxx.chart.legendRenderer(stxx,{legendColorMap:colors, coordinates:{x:260, y:stxx.panels["chart"].yAxis.top+30}, noBase:true});
			    }
  
  				histRenderer=stxx.setSeriesRenderer(new STX.Renderer.Histogram({params: params, callback: histogramLegend}));

				stxx.addSeries("^NIOALL", {display:"Symbol 1",data:{useDefaultQuoteFeed:true}});
				stxx.addSeries("^NIOAFN", {display:"Symbol 2",data:{useDefaultQuoteFeed:true}});
				stxx.addSeries("^NIOAMD", {display:"Symbol 3",data:{useDefaultQuoteFeed:true}});
  				
	      		histRenderer.removeAllSeries()
				.attachSeries("^NIOALL","#6B9CF7")
				.attachSeries("^NIOAFN","#95B7F6")
				.attachSeries("^NIOAMD","#B9D0F5")
				.ready();  //use ready() to immediately draw the histogram
		 *		
		 * @example
			// this is an example on how completely remove a renderer and all associated data. This should only be necessary if you are also removing the chart itself
			// remove all series from the renderer including series data from the masterData
      		renderer.removeAllSeries(true);
      		// detach the series renderer from the chart.
      		stxx.removeSeriesRenderer(renderer);
      		// delete the renderer itself.
      		delete renderer;
		 */
		STX.Renderer.Histogram=function(config){
			this.construct(config);
			this.params.type="histogram";
			this.params.highlightable=false;
		};

		STX.Renderer.Histogram.stxInheritsFrom(STX.Renderer, false);
		STX.Renderer.Histogram.prototype.performCalculations=function(){
			if(this.params.yAxis){
				var panel=this.stx.panels[this.params.panel];
				var fields=[];
				for(var i=0;i<this.seriesParams.length;i++){
					fields.push(this.seriesParams[i].field);
				}
				var minMax=this.stx.determineMinMax(this.stx.chart.dataSegment, fields, this.params.subtype=="stacked", true);
				this.stx.calculateYAxisRange(panel, this.params.yAxis, 0, minMax[1]);
				var heightPercentage=this.params.heightPercentage?this.params.heightPercentage:1;
				this.params.yAxis.high=minMax[1]/this.params.heightPercentage;
				this.params.yAxis.min=0; // So that zoom doesn't pull negative numbers in
				this.params.bindToYAxis=true;
			}
		};

		STX.Renderer.Histogram.prototype.draw=function(){
			this.stx.drawHistogram(STX.clone(this.params), this.seriesParams);
		};


		/**
		 * Creates a Heatmap renderer
		 * See {@link STX.Renderer#construct} for parameters required by all renderers
		 * @param {Object} config Config for renderer
		 * @param  {object} [config.params] Parameters to control the renderer itself
		 * @param  {number} [config.params.widthFactor] Width of each bar as a percentage of the candleWidth. Valid values are 0.00-1.00. Default: 1
		 * @param  {number} [config.params.height] The amount of vertical space to use, in price units. For example, 2=>2 unit increments on yaxis.
		 * @constructor
		 * @name  STX.Renderer.Heatmap
		 */
		STX.Renderer.Heatmap=function(config){
			this.construct(config);
			this.params.type="heatmap";
			this.params.highlightable=false;
		};

		STX.Renderer.Heatmap.stxInheritsFrom(STX.Renderer, false);
		STX.Renderer.Heatmap.prototype.performCalculations=function(){
			var panel=this.stx.panels[this.params.panel];
			var yAxis=this.params.yAxis?this.params.yAxis:panel.yAxis;
			var fields=[];
			for(var i=0;i<this.seriesParams.length;i++){
				fields.push(this.seriesParams[i].field);
			}
			var minMax=this.stx.determineMinMax(this.stx.chart.dataSegment, fields, false, true);
			if(this.params.yAxis){
				this.stx.calculateYAxisRange(panel, yAxis, minMax[0], minMax[1]);
			}else if(this.params.panel==this.stx.chart.panel.name){
				this.stx.chart.lowValue=Math.min(this.stx.chart.lowValue, minMax[0]);
				this.stx.chart.highValue=Math.max(this.stx.chart.highValue, minMax[1]);
			}else{
				this.stx.calculateYAxisRange(panel, yAxis, minMax[0], minMax[1]);
				panel.lowValue=panel.yAxis.low;
				panel.highValue=panel.yAxis.high;
			}
		};

		STX.Renderer.Heatmap.prototype.draw=function(){
			this.stx.drawHeatmap(STX.clone(this.params), this.seriesParams);
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
		 * @see {@link STX.Drawing.BaseTwoPoint}
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
			if(this.highlighted) color=this.stx.getCanvasColor("stx_highlight_vector");
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

		STX.Drawing.annotation.prototype.onChange=function(e){
			//no operation. Override if you want to capture the change.
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
			}
		
			function cancelAnnotation(self){
				return function(){
					self.stx.undo();
					self.stx.cancelTouchSingleClick=true;
				};
			}
			function saveAnnotation(self){
				return function(){
					if(self.ta.value==="") return;
					self.text=self.ta.value;
					self.adjust();
		
					self.stx.addDrawing(self);
					self.stx.changeOccurred("vector");
					self.stx.undo();
					self.stx.cancelTouchSingleClick=true;
				};
			}
		
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
			if(!this.ta){
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
				if(STX.ipad){
					var ta=this.ta;
					this.ta.ontouchend=function(e){
						if(document.activeElement===ta){
								window.focus();
								STX.focus(ta, true);
						}
					};
				}
			}
			var self=this;
			this.ta.oninput=function(e){
				self.onChange(e);
			};
			this.ta.style.font=this.fontString;
			if(this.color){
				if(this.color=="transparent" || this.color=="auto"){
					var styles=getComputedStyle(this.ta);
					if(styles && STX.isTransparent(styles.backgroundColor)){
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
			if(this.name=="callout"){
				this.ta.style.left=x0-this.defaultWidth+"px";
				this.ta.style.top=y0-this.defaultHeight+"px";
			}
		
			this.stx.controls.annotationSave.style.display="inline-block";
			this.stx.controls.annotationCancel.style.display="inline-block";
			this.stx.controls.annotationSave.onclick=saveAnnotation(this);
			this.stx.controls.annotationCancel.onclick=cancelAnnotation(this);
			resizeAnnotation(this)();

			var timeout=0;
			if(STX.ipad) timeout=400;
			//if(!STX.isIOS7or8){
				STX.focus(this.ta);
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
			this.setPoint(0, tick, value, panel.chart);
			this.adjust();
		
			this.edit(context);
			return false;
		};

		STX.Drawing.annotation.prototype.reposition=function(context, repositioner, tick, value){
			var panel=this.stx.panels[this.panelName];
			var tickDiff=repositioner.tick-tick;
			var valueDiff=repositioner.value-value;
			this.setPoint(0, repositioner.p0[0]-tickDiff, repositioner.p0[1]-valueDiff, panel.chart);
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
		 * @param  {object}[obj] A drawing descriptor
		 * @param {string} [obj.col] The text color for the annotation
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.d0] String form date or date time
		 * @param {number} [obj.v0] The value at which to position the annotation
		 * @param {string} [obj.text] The annotation text (escaped using escape())
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {string} [obj.bc] Border color
		 * @param {string} [obj.bg] Background color
		 * @param {string} [obj.lw] Line width
		 * @param {string} [obj.ptrn] Line pattern
		 * @memberOf STX.Drawing.annotation
		 */
		STX.Drawing.annotation.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.d0=obj.d0;
			this.tzo0=obj.tzo0;
			this.v0=obj.v0;
			this.text=unescape(obj.text);
			this.stem=obj.stem;
			this.borderColor=obj.bc;
			this.backgroundColor=obj.bg;
			this.lineWidth=obj.lw;
			this.pattern=obj.ptrn;
			this.font=STX.replaceFields(obj.fnt, {"st":"style","sz":"size","wt":"weight","fl":"family"});
			if(!this.font) this.font={};
			this.adjust();
		};
		
		STX.Drawing.annotation.prototype.serialize=function(){
			var obj={
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				d0:this.d0,
				tzo0:this.tzo0,
				v0:this.v0,
				text:escape(this.text)
			};
			if(this.font){
				var fnt=STX.removeNullValues(STX.replaceFields(this.font, {"style":"st","size":"sz","weight":"wt","family":"fl"}));
				if(!STX.isEmpty(fnt)) obj.fnt=fnt;
			}
			if(this.stem){
				obj.stem={
					"d": this.stem.d,
					"v": this.stem.v,
					"x": this.stem.x,
					"y": this.stem.y
				};
			}
			if(this.borderColor) obj.bc=this.borderColor;
			if(this.backgroundColor) obj.bg=this.backgroundColor;
			if(this.lineWidth) obj.lw=this.lineWidth;
			if(this.pattern) obj.ptrn=this.pattern;

			return obj;
		};
		
		STX.Drawing.annotation.prototype.adjust=function(){
			this.getFontString();
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);
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
			if(this.stem && this.stem.d){
				this.stem.t=this.stx.tickFromDate(this.stem.d, panel.chart);
			}
		};
		
		/**
		 * segment is an implementation of a {@link STX.Drawing.BaseTwoPoint} drawing.
		 * @name STX.Drawing.segment
		 * @constructor
		 */
		STX.Drawing.segment=function(){
			this.name="segment";
		};
		
		STX.Drawing.segment.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.segment.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
		
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
			this.stx.plotLine(x0, x1, y0, y1, color, this.name, context, panel, parameters);
		
			if(this.axisLabel && !this.highlighted){
				if(this.name=="horizontal") {
					this.stx.endClip();
					var txt=this.p0[1];
					if(panel.chart.transformFunc) txt=panel.chart.transformFunc(this.stx, panel.chart, txt);
					if(panel.yAxis.priceFormatter)
						txt=panel.yAxis.priceFormatter(this.stx, panel, txt);
					else
						txt=this.stx.formatYAxisPrice(txt, panel);
					this.stx.createYAxisLabel(panel, txt, y0, color);
					this.stx.startClip(panel.name);
				}else if(this.name=="vertical") {
					var dt, newDT;
					/* set d0 to the right timezone */
					dt=this.stx.dateFromTick(this.p0[0], panel.chart, true);
					var milli=dt.getSeconds()*1000+dt.getMilliseconds();
					if(this.stx.dataZone){ 	// this creates a date in the right quote feed date
						newDT=new timezoneJS.Date(dt.getFullYear(), dt.getMonth(), dt.getDate(), dt.getHours(), dt.getMinutes(), this.stx.dataZone);
						dt=new Date(newDT.getTime()+milli);
					}
					if(this.stx.displayZone){ // this converts from the quote feed timezone to the chart specified time zone
						newDT=new timezoneJS.Date(dt.getTime(), this.stx.displayZone);
						dt=new Date(newDT.getFullYear(), newDT.getMonth(), newDT.getDate(), newDT.getHours(), newDT.getMinutes());
						dt=new Date(dt.getTime()+milli);
					}
					var myDate=STX.yyyymmddhhmm(dt);
					/***********/
					if(panel.chart.xAxis.formatter){
						myDate=panel.chart.xAxis.formatter(myDate);
					}else if(this.stx.internationalizer){
						dt = STX.strToDateTime(myDate);
						var str=this.stx.internationalizer.monthDay.format(dt);
						if(dt.getHours()!==0 || dt.getMinutes()!==0)
							str+=" " + this.stx.internationalizer.hourMinute.format(dt);
						myDate=str;
					}else{
						myDate=STX.mmddhhmm(myDate);
					}
					this.stx.endClip();
					this.stx.createXAxisLabel(panel, myDate, x0, color, null, true);			
					this.stx.startClip(panel.name);
				}
			}
			if(this.highlighted && this.name!="horizontal" && this.name!="vertical"){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}
		
		};
		
		STX.Drawing.segment.prototype.abort=function(){
			this.stx.setMeasure(null,null,null,null,false);
		};
		
		STX.Drawing.segment.prototype.intersected=function(tick, value, box){
			this.whichPoint=null;
			if(!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(this.name!="horizontal" && this.name!="vertical" && this.name!="gartley"){
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
				}
			}
			var isIntersected=this.lineIntersection(tick, value, box, this.name);
			if(isIntersected){
				this.highlighted=true;
				// This object will be used for repositioning
				return {
					action: "move",
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1),
					tick: tick, // save original tick
					value: value // save original value
				};
			}else{
				return null;
			}
		};
		
		STX.Drawing.segment.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
			if(this.pattern=="none") this.pattern="solid";
		};
		
		/**
		 * Reconstruct a segment
		 * @memberOf  STX.Drawing.segment
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 */
		STX.Drawing.segment.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			this.v0=obj.v0;
			this.v1=obj.v1;
			this.adjust();
		};
		
		STX.Drawing.segment.prototype.serialize=function(){
			return {
				name:this.name,
				pnl: this.panelName,
				col:this.color,
				ptrn:this.pattern,
				lw:this.lineWidth,
				d0:this.d0,
				d1:this.d1,
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				v0:this.v0,
				v1:this.v1
			};
		};
		
		
		/**
		 * Continuous line drawing tool. Creates a series of connected line segments, each one completed with a user click.
		 * 
		 * It inherits its properties from {@link STX.Drawing.segment}.
		 * @constructor
		 * @name  STX.Drawing.continuous
		 */
		STX.Drawing.continuous=function(){
			this.name="continuous";
			this.dragToDraw=false;
			this.maxSegments=null;
		};
		
		STX.Drawing.continuous.stxInheritsFrom(STX.Drawing.segment);
		
		STX.Drawing.continuous.prototype.click=function(context, tick, value){
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
			
			this.setPoint(1, tick, value, panel.chart);
		
			// render a segment
			var Segment=STX.Drawing.segment;
			var segment=new Segment();
			var obj=this.serialize(this.stx);
			segment.reconstruct(this.stx, obj);
			this.stx.addDrawing(segment);
			this.stx.changeOccurred("vector");
			this.stx.draw();
			this.segment++;
			
			if(this.maxSegments && this.segment>this.maxSegments) return true;		
			this.setPoint(0, tick, value, panel.chart);  // reset initial point for next segment, copy by value
			return false;
		};

		
		/**
		 * Line drawing tool. A line is a vector defined by two points that is infinite in both directions.
		 * 
		 * It inherits its properties from {@link STX.Drawing.segment}.
		 * @constructor
		 * @name  STX.Drawing.line
		 */
		STX.Drawing.line=function(){
			this.name="line";
		};

		STX.Drawing.line.prototype.dragToDraw=false;
		
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
				this.setPoint(0, tick, value, panel.chart);
				this.penDown=true;
				return false;
			}
			this.setPoint(1, tick, value, panel.chart);
			this.calculateOuterSet(panel);
			this.penDown=false;
			return true;	// kernel will call render after this
		};
		
		/**
		 * Reconstruct a line
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.v0B] Computed outer Value (price) for the first point if original drawing was on intraday but now displaying on daily
		 * @param {number} [obj.v1B] Computed outer Value (price) for the second point if original drawing was on intraday but now displaying on daily
		 * @param {number} [obj.d0B] Computed outer Date (string form) for the first point if original drawing was on intraday but now displaying on daily
		 * @param {number} [obj.d1B] Computed outer Date (string form) for the second point if original drawing was on intraday but now displaying on daily
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @memberOf STX.Drawing.line
		 */
		STX.Drawing.line.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.v0=obj.v0;
			this.v1=obj.v1;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			if(obj.d0B){
				this.d0B=obj.d0B;
				this.d1B=obj.d1B;
				this.v0B=obj.v0B;
				this.v1B=obj.v1B;
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
				tzo0: this.tzo0,
				tzo1: this.tzo1,
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
			this.setPoint(0, this.d0, this.v0, panel.chart);		
			this.setPoint(1, this.d1, this.v1, panel.chart);
			// Use outer set if original drawing was on intraday but now displaying on daily
			if(this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B){
				this.setPoint(0, this.d0B, this.v0B, panel.chart);		
				this.setPoint(1, this.d1B, this.v1B, panel.chart);
			}
		};
		
		/**
		 * Ray drawing tool. A ray is defined by two points. It travels infinitely past the second point.
		 * 
		 * It inherits its properties from {@link STX.Drawing.line}.
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
			this.setPoint(0, this.d0, this.v0, panel.chart);		
			this.setPoint(1, this.d1, this.v1, panel.chart);
			// Use outer set if original drawing was on intraday but now displaying on daily
			if(this.stx.isDailyInterval(this.stx.layout.interval) && this.d0B){	
				this.setPoint(1, this.d1B, this.v1B, panel.chart);
			}
		};
		
		
		/**
		 * Horizontal line drawing tool. The horizontal line extends infinitely in both directions.
		 * 
		 * It inherits its properties from {@link STX.Drawing.segment}
		 * @constructor
		 * @name  STX.Drawing.horizontal
		 */
		STX.Drawing.horizontal=function(){
			this.name="horizontal";
		};

		STX.Drawing.horizontal.prototype.dragToDraw=false;
		
		STX.Drawing.horizontal.stxInheritsFrom(STX.Drawing.segment);
		STX.Drawing.horizontal.prototype.measure=function(){};
		
		STX.Drawing.horizontal.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			this.setPoint(0, tick, value, panel.chart);
			return true;	// kernel will call render after this
		};
		
		
		/**
		 * Reconstruct a horizontal
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The line color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {boolean} [obj.al] True to include an axis label
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @memberOf STX.Drawing.horizontal
		 */
		STX.Drawing.horizontal.prototype.reconstruct=function(stx, obj){
			this.stx=stx;
			this.color=obj.col;
			this.panelName=obj.pnl;
			this.pattern=obj.ptrn;
			this.lineWidth=obj.lw;
			this.v0=obj.v0;
			this.d0=obj.d0;
			this.tzo0=obj.tzo0;
			this.axisLabel=obj.al;
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
				tzo0:this.tzo0,
				al:this.axisLabel
			};
		
			return obj;
		};
		
		STX.Drawing.horizontal.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);
			this.p1=[this.p0[0]+100, this.p0[1]];
		};
		
		STX.Drawing.horizontal.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
			this.axisLabel=this.stx.currentVectorParameters.axisLabel;
		};

		/**
		 * Vertical line drawing tool. The vertical line extends infinitely in both directions.
		 * 
		 * It inherits its properties from {@link STX.Drawing.horizontal}.
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
			this.setPoint(0, this.d0, this.v0, panel.chart);
			this.p1=[this.p0[0], this.p0[1]+1];
		};
		

		
		/**
		 * Measure tool.
		 * It inherits its properties from {@link STX.Drawing.segment}.
		 * @constructor
		 * @name  STX.Drawing.measure
		 */
		STX.Drawing.measure=function(){
			this.name="measure";
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
		 * rectangle is an implementation of a {@link STX.Drawing.BaseTwoPoint} drawing
		 * @constructor
		 * @name  STX.Drawing.rectangle
		 */
		STX.Drawing.rectangle=function(){
			this.name="rectangle";
		};
		
		STX.Drawing.rectangle.stxInheritsFrom(STX.Drawing.BaseTwoPoint);
		
		STX.Drawing.rectangle.prototype.render=function(context){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			var x0=this.stx.pixelFromTick(this.p0[0], panel.chart);
			var x1=this.stx.pixelFromTick(this.p1[0], panel.chart);
			var y0=this.stx.pixelFromValueAdjusted(panel, this.p0[0], this.p0[1]);
			var y1=this.stx.pixelFromValueAdjusted(panel, this.p1[0], this.p1[1]);
		
			var x=Math.round(Math.min(x0, x1))+0.5;
			var y=Math.min(y0, y1);
			var width=Math.max(x0,x1)-x;
			var height=Math.max(y0, y1)-y;
			var edgeColor=this.color;
			if(this.highlighted){
				edgeColor=this.stx.getCanvasColor("stx_highlight_vector");
			}
		
			var fillColor=this.fillColor;
			if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
				context.beginPath();
				context.rect(x, y, width, height);
				context.fillStyle=fillColor;
				context.globalAlpha=0.2;
				context.fill();
				context.closePath();
				context.globalAlpha=1;
			}
		
			var parameters={
					pattern: this.pattern,
					lineWidth: this.lineWidth
			};
			if(this.highlighted && parameters.pattern=="none"){
				parameters.pattern="solid";
				if(parameters.lineWidth==0.1) parameters.lineWidth=1;
			}
		
			// We extend the vertical lines by .5 to account for displacement of the horizontal lines
			// HTML5 Canvas exists *between* pixels, not on pixels, so draw on .5 to get crisp lines
			this.stx.plotLine(x0, x1, y0, y0, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x1, x1, y0-0.5, y1+0.5, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x1, x0, y1, y1, edgeColor, "segment", context, panel, parameters);
			this.stx.plotLine(x0, x0, y1+0.5, y0-0.5, edgeColor, "segment", context, panel, parameters);
			if(this.highlighted){
				var p0Fill=this.whichPoint=="p0"?true:false;
				var p1Fill=this.whichPoint=="p1"?true:false;
				this.littleCircle(context, x0, y0, p0Fill);
				this.littleCircle(context, x1, y1, p1Fill);
			}
		};
		
		STX.Drawing.rectangle.prototype.intersected=function(tick, value, box){
			this.whichPoint=null;
			if(!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
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
			if(this.boxIntersection(tick, value)){
				this.highlighted=true;
				return {
					action: "move",
					p0: STX.clone(this.p0),
					p1: STX.clone(this.p1),
					tick: tick,
					value: value
				};
			}
			return null;
		};
		
		STX.Drawing.rectangle.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
			this.lineWidth=this.stx.currentVectorParameters.lineWidth;
			this.pattern=this.stx.currentVectorParameters.pattern;
		};
		
		/**
		 * Reconstruct an rectangle
		 * @param  {STXChart} stx The chart object
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The border color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @memberOf STX.Drawing.rectangle
		 */
		STX.Drawing.rectangle.prototype.reconstruct=function(stx, obj){
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
			this.adjust();
		};
		
		STX.Drawing.rectangle.prototype.serialize=function(){
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
				v1:this.v1
			};
		};

		/**
		 * Ellipse drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.BaseTwoPoint}.
		 * @constructor
		 * @name  STX.Drawing.ellipse
		 */
		STX.Drawing.ellipse=function(){
			this.name="ellipse";
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
				if(lineWidth==0.1) lineWidth=1.1;
			}
		
			var fillColor=this.fillColor;
			context.beginPath();
			context.moveTo(left, middle);
			context.bezierCurveTo(left, bottom+weight, right, bottom+weight, right, middle);
			context.bezierCurveTo(right, top-weight, left, top-weight, left, middle);
		
			if(fillColor && !STX.isTransparent(fillColor) && fillColor!="auto"){
				context.fillStyle=fillColor;
				context.globalAlpha=0.2;
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
			}
			var left=this.p0[0]-(this.p1[0]-this.p0[0]);
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
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The border color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {string} [obj.ptrn] Optional pattern for line "solid","dotted","dashed". Defaults to solid.
		 * @param {number} [obj.lw] Optional line width. Defaults to 1.
		 * @param {number} [obj.v0] Value (price) for the center point
		 * @param {number} [obj.v1] Value (price) for the outside point
		 * @param {number} [obj.d0] Date (string form) for the center point
		 * @param {number} [obj.d1] Date (string form) for the outside point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @memberOf STX.Drawing.ellipse
		 */
		STX.Drawing.ellipse.prototype.reconstruct=function(stx, obj){
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
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				v0:this.v0,
				v1:this.v1
			};
		};
		
		/**
		 * Fibonacci drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.BaseTwoPoint}
		 * @constructor
		 * @name  STX.Drawing.fibonacci
		 */
		STX.Drawing.fibonacci=function(){
			this.name="fibonacci";
			this.configurator="fibonacci";
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
				"printLevels":"pl",
				"printValues":"pv",
				"timezone":"tz"
		};
		
		STX.Drawing.fibonacci.prototype.copyConfig=function(){
			this.color=this.stx.currentVectorParameters.currentColor;
			this.fillColor=this.stx.currentVectorParameters.fillColor;
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
					if(isUpTrend){
						this.outer.p0[1]=val;
						this.outer.p0[0]=x;
					}else{
						this.outer.p1[1]=val;
						this.outer.p1[0]=x;
					}
				}else if(fib.level>max){
					max=fib.level;
					if(isUpTrend){
						this.outer.p1[1]=val;
						this.outer.p1[0]=x;
					}else{
						this.outer.p0[1]=val;
						this.outer.p0[0]=x;
					}
				}
			}
		};
		
		STX.Drawing.fibonacci.prototype.click=function(context, tick, value){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.copyConfig();
			if(!this.penDown){
				this.setPoint(0, tick, value, panel.chart);
				this.penDown=true;
				return false;
			}
			if(this.accidentalClick(tick, value)) return this.dragToDraw;
		
			this.setPoint(1, tick, value, panel.chart);
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
			this.stx.canvasFont("stx_yaxis", context); // match font from y axis so it looks cohesive
			var w=context.measureText("161.8%").width+10;// give it extra space so it does not overlap with the price labels.
			var minX=Number.MAX_VALUE, minY=Number.MAX_VALUE, maxX=Number.MAX_VALUE*-1, maxY=Number.MAX_VALUE*-1;
			var txtColor=this.color;
			if(txtColor=="auto" || STX.isTransparent(txtColor)) txtColor=this.stx.defaultColor;
			for(var i=0;i<this.parameters.fibs.length;i++){
				context.textAlign="left";
				context.fillStyle=txtColor;
				var fib=this.parameters.fibs[i];
				var y=isUpTrend?bottom-height*fib.level:top+height*fib.level;
				y=Math.round(y);
				var x=STX.xIntersection({x0:x0,x1:x1,y0:y0,y1:y1}, y);
				var nearX=this.parameters.extendLeft?0:x;
				var farX=this.stx.chart.left+this.stx.chart.width;
				if(this.parameters.printLevels){
					var txt=Math.round(fib.level*1000)/10+"%";
					farX-=w;
					if(this.parameters.printValues) {
						context.fillStyle=txtColor; // the price labels screw up the color and font size...so  reset before rendering the text
						this.stx.canvasFont("stx_yaxis", context); // use the same context as the y axis so they match.
					}
					if(farX<nearX) context.textAlign="right";
					context.fillText(txt, farX, y);
					if(farX<nearX) farX+=5;
					else  farX-=5;
				}
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
				this.stx.plotLine(nearX, farX, y, y, fibColor, "segment", context, panel, fib.parameters);
				context.globalAlpha=0.05;
				context.beginPath();
				context.moveTo(farX,y);
				context.lineTo(nearX,y);
				if(nearX) context.lineTo(Math.max(x0,x1),isUpTrend?bottom:top);
				else context.lineTo(nearX,isUpTrend?bottom:top);
				context.lineTo(farX,isUpTrend?bottom:top);
				if( typeof fillColor!="undefined" ) context.fill(); // so legacy fibs continue to have no fill color.
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

		STX.Drawing.fibonacci.prototype.reposition=function(context, repositioner, tick, value){
			STX.Drawing.BaseTwoPoint.prototype.reposition.apply(this, arguments);
			this.adjust();
		};

		STX.Drawing.fibonacci.prototype.intersected=function(tick, value, box){
			//TODO, find some efficient way to allow an intersection across the entire trend line, not just between the two clicked points
			if(!this.p0 || !this.p1) return null; // in case invalid drawing (such as from panel that no longer exists)
			if(STX.boxIntersects(box.x0, box.y0, box.x1, box.y1, this.outer.p0[0], this.outer.p0[1], this.outer.p1[0], this.outer.p1[1], "segment")){
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
		 * @param  {object} [obj] A drawing descriptor
		 * @param {string} [obj.col] The border color
		 * @param {string} [obj.fc] The fill color
		 * @param {string} [obj.pnl] The panel name
		 * @param {number} [obj.v0] Value (price) for the first point
		 * @param {number} [obj.v1] Value (price) for the second point
		 * @param {number} [obj.d0] Date (string form) for the first point
		 * @param {number} [obj.d1] Date (string form) for the second point
		 * @param {number} [obj.tzo0] Offset of UTC from d0 in minutes
		 * @param {number} [obj.tzo1] Offset of UTC from d1 in minutes
		 * @param {object} [obj.parameters] Configuration parameters
		 * @param {object} [obj.parameters.trend] Describes the trend line
		 * @param {string} [obj.parameters.trend.color] The color for the trend line (Defaults to "auto")
		 * @param {object} [obj.parameters.trend.parameters] Line description object (pattern, opacity, lineWidth)
		 * @param {array} [obj.parameters.fibs] A fib description object for each fib (level, color, parameters)
		 * @param {boolean} [obj.parameters.extendLeft] True to extend the fib lines to the left of the screen. Defaults to false.
		 * @param {boolean} [obj.parameters.printLevels] True (default) to print text for each percentage level
		 * @param {boolean} [obj.parameters.printValues] True to print text for each price level
		 * @memberOf STX.Drawing.fibonacci
		 */
		STX.Drawing.fibonacci.prototype.reconstruct=function(stx, obj){
			obj=STX.replaceFields(obj, STX.reverseObject(STX.Drawing.fibonacci.mapping));
			this.stx=stx;
			this.parameters=obj.parameters;
			if(!this.parameters) this.parameters=STX.clone(this.stx.currentVectorParameters.fibonacci);	// For legacy fibs that didn't include parameters
			this.color=obj.col;
			this.fillColor=obj.fc;
			this.panelName=obj.pnl;
			this.d0=obj.d0;
			this.d1=obj.d1;
			this.tzo0=obj.tzo0;
			this.tzo1=obj.tzo1;
			this.v0=obj.v0;
			this.v1=obj.v1;			
			this.adjust();
		};
		
		STX.Drawing.fibonacci.prototype.adjust=function(){
			var panel=this.stx.panels[this.panelName];
			if(!panel) return;
			this.setPoint(0, this.d0, this.v0, panel.chart);
			this.setPoint(1, this.d1, this.v1, panel.chart);
			this.setOuter();
		};
		
		STX.Drawing.fibonacci.prototype.serialize=function(){
			var obj={
				name:this.name,
				parameters:this.parameters,
				pnl: this.panelName,
				col:this.color,
				fc:this.fillColor,
				d0:this.d0,
				d1:this.d1,
				tzo0: this.tzo0,
				tzo1: this.tzo1,
				v0:this.v0,
				v1:this.v1
			};
			return STX.replaceFields(obj, STX.Drawing.fibonacci.mapping);
		};


		/**
		 * Retracement drawing tool.
		 * 
		 * It inherits its properties from {@link STX.Drawing.fibonacci}
		 * @constructor
		 * @name  STX.Drawing.retracement
		 */
		STX.Drawing.retracement=function(){
			this.name="retracement";
		};
		
		STX.Drawing.retracement.stxInheritsFrom(STX.Drawing.fibonacci);
		

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
		};
		
		STX.QuoteFeed.BarChart.prototype.fetch=function(params, cb){
			var url = this.url + "/getHistory.csv";

			var isbats=!params.noBats && this.isBats(params.symbol);
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
			if(params.adj===false){
				url+="&splits=false";
			}else{
				url+="&splits=true";
			}

			var myDate=new Date();
			var startDate;
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
				
				if(params.startDate){
					startDate=new Date(params.startDate);
					if(STXChart.isDailyInterval(params.interval)){
						startDate.setDate(startDate.getDate() + 1);   // set a day ahead, same reason as above, 00:00 is included in results. 
					}
					startDate=STX.convertTimeZone(startDate,null,"America/New_York");
					url+="&startDate=" + STX.yyyymmddhhmm(startDate);
					params.maxRecords=0;
				}else if(!params.maxRecords) params.maxRecords=20000;
			}else{
				if(params.startDate){
					startDate=new Date(params.startDate);
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
				res=self.process(res, params);
				
				var moreToLoad=!params.stx.quoteDriver.behavior.noLoadMore;
				if(!params.maxRecords || res.length<params.maxRecords){
					moreToLoad=false;
				}
				var attrExch="DELAYED";
				if(isBats) attrExch="BATS";
				else if(STX.LegacyMarket.isForexSymbol(params.symbol)) attrExch="REAL-TIME";
				cb({quotes:res, moreAvailable:moreToLoad, attribution:{source:"barchart",exchange:attrExch}});
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
			var i;
			for(i=0;i<fds.length;i++){
				fieldNames[fds[i]]=i;
			}
			for(i=1;i<arr.length;i++){
				var fields=arr[i].split(',');
				if(fields.length<fds.length) continue;
				var field=fields[fieldNames.timestamp].replace(/"/g,"");
				if(field==="") continue;
				var bcdt=STX.strToDateTime(field);
				if(params.startDate && bcdt<params.startDate) continue;
				newQuotes.push({
					Date: STX.yyyymmddhhmm(bcdt),
					Open: parseFloat(fields[fieldNames.open].replace(/"/g,"")),
					High: parseFloat(fields[fieldNames.high].replace(/"/g,"")),
					Low: parseFloat(fields[fieldNames.low].replace(/"/g,"")),
					Close: parseFloat(fields[fieldNames.close].replace(/"/g,"")),
					Volume: (suppressVolume?0:parseFloat(fields[fieldNames.volume].replace(/"/g,""))),
					Adj_Close: parseFloat(fields[fieldNames.close].replace(/"/g,""))
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
		 * Xignite version of quotes which uses web API to fetch data. Pass the Xignite provided token to 
		 * the constructor. If constructed without a token then the STX.QuoteFeed.Xignite.Utility.overrides members
		 * will be examined for rules on building the url path. overrides can be used for instance to redirect
		 * the QuoteFeed to a proxy server that injects the token and an Access-Control-Allow-Origin header.
		 * 
		 * **Note:** please review the following tutorial about data accessibility before attempting to request data from the browser : {@tutorial Integrating Third Party Data Feeds}
		 *
		 * @example Proxy server config
		 *		Here is a sample proxy setup for Apache:
		 *		
		 *		        SSLEngine on
		 *		        SSLProxyEngine On
		 *		        SSLProxyVerify none
		 *		        SSLProxyCheckPeerCN off
		 *		
		 *		        ProxyPass /www_xignite/ https://www.xignite.com/
		 *		        ProxyPass /globalquotes_xignite/ https://globalquotes.xignite.com/
		 *		        ProxyPass /batsrealtime_xignite/ https://batsrealtime.xignite.com/
		 *		        ProxyPass /globalcurrencies_xignite/ https://globalcurrencies.xignite.com/
		 *		        ProxyPass /globalmetals_xignite/ https://globalmetals.xignite.com/
		 *		        ProxyPass /globalnews_xignite/ https://globalnews.xignite.com/
		 *		        ProxyPass /fundamentals_xignite/ https://fundamentals.xignite.com/
		 *		        ProxyPass /globalindices_xignite/ https://globalindices.xignite.com/
		 *		        ProxyPass /globalindicesrealtime_xignite/ https://globalindicesrealtime.xignite.com/
		 *		        ProxyPass /globalindiceshistorical_xignite/ https://globalindiceshistorical.xignite.com/
		 *		        ProxyPass /financials_xignite/ https://financials.xignite.com/
		 *		        ProxyPass /globalexchanges_xignite/ https://globalexchanges.xignite.com/
		 *		        ProxyPass /navs_xignite/ https://navs.xignite.com/
		 *		        Header set Access-Control-Allow-Origin "*"
		 *
		 *  	Also add the following override before you attach to the feed ( leave the protocol out -- not http:// or https:// should be included) :
		 * 				STX.QuoteFeed.Xignite.Utility.overrides.server="yourProxyServer.yourCompany.com";
		 * 
		 *  	If you need to have a different protocol than the default ("http"+(STX.isIE9?"":"s")+"://") add the following line	
		 * 				STX.QuoteFeed.Xignite.Utility.overrides.protocol="https://"; // change protocol as needed.
		 * 
		 *  	If you need to have a different path than the defaults (see proxy config sample) add the following line. The same path will be appended to all calls.	
		 * 				STX.QuoteFeed.Xignite.Utility.overrides.path="your path here";
		 *  
		 * @example Default use case
		 * stxx.attachQuoteFeed(new STX.QuoteFeed.Xignite(myToken));
		 * 
		 * @example Using a proxy server
		 * STX.QuoteFeed.Xignite.Utility.overrides.server="yourProxyServer.yourCompany.com";
		 * stxx.attachQuoteFeed(new STX.QuoteFeed.Xignite());
		 * 
		 * @param  {string} [token] optional Xignite API token
		 * @name  Xignite
		 * @constructor
		 */
		STX.QuoteFeed.Xignite=function(token){
			this.token=token;
			this.exchangeZones=STX.QuoteFeed.Xignite.Utility.timeZone;

			/** If a token is passed in then we're going to assume that the customer is going to attempt
			to connect to Xignite against their raw API. This means that we will use the server that is set
			for each data Template, and that no path needs to be appended.

			The exception to this rule is if the developer has already set the overrides.server to something
			other than the default. This indicates that the developer knows what they are doing so we won't
			make any assumptions */
			if(token && STX.QuoteFeed.Xignite.Utility.overrides.server=="devservices.chartiq.com/data"){
				STX.QuoteFeed.Xignite.Utility.overrides.server=null;
				STX.QuoteFeed.Xignite.Utility.overrides.path="";
			}
		};
		
		STX.QuoteFeed.Xignite.stxInheritsFrom(STX.QuoteFeed);

		STX.QuoteFeed.Xignite.prototype.requiresImmediateRefresh=function(params){
			return this.isBats(params.chart.symbol);
		};

		STX.QuoteFeed.Xignite.prototype.isBats=function(symbol){
			return ((symbol.length<5 || (symbol.length==5 && symbol[4]!="X")) &&
					symbol.indexOf(".")==-1 && symbol.indexOf(":")==-1 && symbol.charAt(0)!='/');
		};
		
		STX.QuoteFeed.Xignite.prototype.isIndex=function(symbol){
			if(symbol && symbol.indexOf(".IND")>0) return true;
			if(symbol && symbol.charAt(0)=="^" && symbol.length<6) return true;
			return false;
		};
		
		STX.QuoteFeed.Xignite.prototype.isMutual=function(symbol){
			if(symbol.length<5 || symbol.length>6) return false;
			for(var j=0;j<symbol.length;j++){
				if(symbol[j]<'A' || symbol[j]>'Z') return false;
			}
			if(symbol[symbol.length-1]=='X') return true;
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

			var noDST=true; // Xignite hack: Xignite servers aren't changing GMT offset in DST so data is one hour behind... 
			// When getting daily rollup (Periods=1440), the Fixing time is unchangeable and set to 11PM in DST
			// This causes the last hour of the last historical bar to also be represented in the first update bar.
			// Obviously they need to fix this!
			function dst(dt){
				var jan = new Date(dt.getFullYear(), 0, 1);
				var jul = new Date(dt.getFullYear(), 6, 1);
				var stdOffset=Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
				return dt.getTimezoneOffset() != stdOffset;
			}
			function toMarketTime(date,tz){
				var utcTime=new Date(date.getTime() + date.getTimezoneOffset() * 60000);
				if(tz && tz.indexOf("UTC")!=-1) return utcTime;
				else return STX.convertTimeZone(utcTime,"UTC",tz);
			}

			var isBats=!params.noBats && this.isBats(params.symbol);
			var isIndex=this.isIndex(params.symbol);
			var isMutual=this.isMutual(params.symbol);
			var isForex=STX.LegacyMarket.isForexSymbol(params.symbol);
			var isFuture=STX.LegacyMarket.isFuturesSymbol(params.symbol);
			var isDaily=STXChart.isDailyInterval(params.interval);
			var symbol=this.symbology(params.symbol);
			var expiredFuture=false;
			var marketZone=null;
			var getSplitInfo=false;

			var maxTicks=20000;
			
			if(params.chart.loadingMore) params.loadMore=true;

			if(!this.resultsCache) this.resultsCache={};
			//initialize or don't use when loading more (since we prepend data, not replace it)
			if(isForex && symbol.charAt(0)!="^") symbol="^"+symbol;
			if(!this.resultsCache[symbol] || params.loadMore || !params.totalRecords) this.resultsCache[symbol]=[];

			// Default to today
			var myDate=new Date();
			if(params.endDate){
				myDate=params.endDate;  // pointer to endDate
				if(params.loadMore) params.maxRecords=maxTicks;
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
			if(!params.maxRecords){
				myMaxRecords=Math.min(myMaxRecords,maxTicks);				
			}else{
				if(!isDaily && params.period<10){
					myMaxRecords=Math.ceil(Math.min(Math.max(params.maxRecords*theFactor,6000),maxTicks));
				}else{
					myMaxRecords=Math.ceil(Math.min(Math.max(params.maxRecords*theFactor,1000),maxTicks));
				}
			}

			if(myMaxRecords>maxTicks || (params.stx.chart.symbol==params.symbol && params.fetchMaximumBars)) myMaxRecords=maxTicks;

			var api=null;
			var args=null;
			var error="";
			var startDate;

			if(isForex){
				marketZone="UTC";
				myDate=toMarketTime(myDate,marketZone);
				if(symbol.charAt(0)=="^") symbol=symbol.substr(1);
				if(symbol.substr(0,3).toUpperCase()==symbol.substr(3,3).toUpperCase()) error="Invalid Forex symbol";

				if(params.stx.quoteDriver.behavior.snapshotRefresh && myDate.getDay()!=6){
					if(STX.QuoteFeed.Xignite.getSnapshotQuote(params,symbol,isDaily,0,cb,this)) return;
				}

				startDate=myDate;
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
					args={
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
						args={
							Symbol: symbol,
							StartTime: STX.mmddyyyy(STX.yyyymmdd(startDate))+" 00:00:00",
							EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
							Period: (params.interval=="hour"?params.period*60:params.period)
						};
						if(isDaily){
							api.results.time=null;
							args.Period=1440;
						}else if(params.update){
							if(params.startDate){
								var pStartDate1=toMarketTime(params.startDate,marketZone);
								args.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(pStartDate1).split(" ")[1]+":00";
							}
						}else{
							args.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(startDate).split(" ")[1]+":00";
							args.EndTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(myDate).split(" ")[1]+":59";
						}
					}
				}
				if(symbol.charAt(0)!="^") symbol="^"+symbol;
			}else if(isFuture){
				marketZone="America/New_York";
				myDate=toMarketTime(myDate,marketZone);
				if(symbol.charAt(0)=="/") symbol=symbol.substr(1);
				var month=0,year=0;  //default to continuous contract
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
					if(month=="Y" && symYearAsInt===0) {
						cash=true;
						month=0;
						year=0;
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
						startDate=new Date(endDate.getTime());
						if(year>0) startDate.setFullYear(Math.min(year,startDate.getFullYear()));
						startDate.setDate(startDate.getDate()-myMaxRecords);
					}else if(params.startDate){
						startDate=toMarketTime(params.startDate,marketZone);
					}
					args={
						Symbol: symbol,
						StartDate: (startDate?STX.mmddyyyy(STX.yyyymmdd(startDate)):null),
						EndDate: STX.mmddyyyy(STX.yyyymmdd(endDate)),
						Month: month.toString(),
						Year: year.toString()
					};
					if(year!==0 || cash){  //includes month and year
						api.method=api.method.future;
					}else{
						api.method=api.method.commodity;
					}
				}else if(!expiredFuture){
					api=STX.clone(STX.QuoteFeed.Xignite.Templates.DelayedFuture);
					args={
						Symbol: symbol,
						Month: month.toString(),
						Year: year.toString()
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

				if(isDaily){
					api=STX.clone(STX.QuoteFeed.Xignite.Templates.BATSRealQuote);
					args={
						Symbol: symbol
					};
			   	}else if(params.update){
					//We need to force the start date to be today, since Xignite may not provide BATS across days in the future
					//Besides, we shouldn't need BATS data from any day besides today anyway.
					//var startDate=STX.mmddyyyy(STX.yyyymmdd(toMarketTime(params.startDate,marketZone)));
					startDate=STX.mmddyyyy(STX.yyyymmdd(myDate));
					api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayBATSRTEquity);
					args={
						Identifier: symbol,
						Period: (params.interval=="hour"?params.period*60:params.period),
						StartTime: startDate+" 00:00:00",
						EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
						IncludeExtended: (!!params.extended).toString()
					};
					if(params.startDate){
						var pStartDate2=toMarketTime(params.startDate,marketZone);
						if(myDate.getDate()==pStartDate2.getDate()){
							args.StartTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(pStartDate2).split(" ")[1]+":00";
						}
					}
				}
			}else{
				delete params.noBats;
				var exchange=symbol.split(".").pop();
				if(exchange){
					if(symbol.indexOf(".")>-1 && exchange.length<4) error="Invalid Exchange";
					else marketZone=STX.QuoteFeed.Xignite.Utility.timeZone[exchange];
				}
				if(!marketZone) marketZone="America/New_York";
				myDate=toMarketTime(myDate,marketZone);
				if(!params.update && isDaily){
					if(isIndex)
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalIndex);
					else
						api=STX.clone(STX.QuoteFeed.Xignite.Templates.HistoricalEquity);
					args={
						Identifier: symbol,
						StartDate: (params.startDate?STX.mmddyyyy(STX.yyyymmdd(toMarketTime(params.startDate,marketZone))):null),
						EndDate: STX.mmddyyyy(STX.yyyymmdd(myDate)),
						PeriodType: STX.QuoteFeed.Xignite.Utility.xIgniteInterval(params.interval),
						Periods: myMaxRecords
					};
				}else{
					if(isDaily){
						if(isMutual){
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.DelayedMF);
							if(symbol.length==6){  //hack, Xignite sending most recent NAV in PreviousNAV field for UITs
								api.results.open=api.results.close=api.results.high=api.results.low="PreviousNAV";
							}
						}else if(isIndex){
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.DelayedIndex);
						}else{
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.DelayedEquity);
						}
						args={
							Identifier: symbol
						};
					}else{
						if(isMutual){
							error="Intraday data not available.";  //intraday not available
						}else if(isIndex){
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayIndex);
						}else{
							api=STX.clone(STX.QuoteFeed.Xignite.Templates.IntradayEquity);
						}
						startDate=myDate;
						if(!params.startDate && params.maxRecords){  //must calculate startdate so we can use API
							startDate=new Date(myDate.getTime());
							if(isDaily) startDate.setDate(startDate.getDate()-myMaxRecords);
							else startDate.setMinutes(startDate.getMinutes()-myMaxRecords*(params.interval=="hour"?params.period*60:params.period));
						}else if(params.startDate){
							startDate=toMarketTime(params.startDate,marketZone);
						}
						//temporary fix, Xignite is not returning any intraday bars when start date is before 2011
						//if(!isIndex && startDate<new Date(2011,0,1,0,0,0,0)) startDate=new Date(2011,0,1,0,0,0,0);
						args={
							Identifier: symbol,
							StartTime: STX.mmddyyyy(STX.yyyymmdd(startDate))+" 00:00:00",
							EndTime: STX.mmddyyyy(STX.yyyymmdd(myDate))+" 23:59:59",
							Period: (params.interval=="hour"?params.period*60:params.period),
							IncludeExtended: (!!params.extended && isBats).toString()
						};
					   	if(params.update){
							if(params.startDate){
								var pStartDate3=toMarketTime(params.startDate,marketZone);
								if(myDate.getDate()>=pStartDate3.getDate()){
									args.StartTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(pStartDate3).split(" ")[1]+":00";
								}
							}
						}else{
							args.StartTime=STX.mmddyyyy(STX.yyyymmdd(startDate))+" "+STX.friendlyDate(startDate).split(" ")[1]+":00";
							args.EndTime=STX.mmddyyyy(STX.yyyymmdd(myDate))+" "+STX.friendlyDate(myDate).split(" ")[1]+":59";
							if(!isIndex) getSplitInfo=true;
						}
					}
				}
			}

			if(api && args && error===""){
				var splitArray=[];
				var mamaCallbackFunction=function(status, res){
					if(status!=200){
						if(!params.update && cb) cb({error:status});
						return;
					}
					function processData(quotes, params){
						var newQuotes=[];
						var arr=quotes.split("\r\n");
						if(arr.length<2) return newQuotes;
						var fds=arr[0].split(",");
						var fieldNames={};
						var i;
						for (i=0;i<fds.length;i++){
							fieldNames[fds[i]]=i;
						}
						var dt=null;
						var stick=false;
						var NYOffsetMap={};
						for(i=1;i<arr.length;i++){
							var fields=arr[i].split(',');
							if(fields.length<fds.length) continue;
							//if(fields[fieldNames["Outcome"]]!="Success") continue;
							var date=fields[fieldNames[api.results.date]];
							if(date==="") continue;
							if(api.results.time){
								date+=" "+fields[fieldNames[api.results.time]];
							}
							//date is in market time.  we want to store in YYYY-MM-DDTHH:MM:SSZ format (UTC)
							//params filter dates are in local time
							//market time-market UTC offset = UTC time (for storing)
							//UTC time+local offset = local time (for filtering)
							var bcdt=STX.strToDateTime(date);
							if(bcdt.getDay()==6) continue; //filter out erroneous Saturday data
							if(isForex && isDaily && params.update && noDST && dst(bcdt)){  //Xignite bug is enabled, for forex daily update
								bcdt.setDate(bcdt.getDate()+1);
							}
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
									if(!NYOffsetMap[key] && NYOffsetMap[key]!==0){
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
							if(!missingBarsShutoff && !isDaily){
								if(dt===null){
									dt=bcdt;
								}else{
									for(var zz=0;zz<1440;zz++){
										if(!stick) dt=STX.LegacyMarket.nextPeriod(dt, params.stx.layout.interval, 1, params.stx, params.symbol);
										if(bcdt.getTime()==dt.getTime()) break;
										else if(bcdt.getTime()<dt.getTime()) {
											stick=true;  //do not advance dt any further
											break;
										}else{
											var lastQuote1=newQuotes[newQuotes.length-1];
											newQuotes.push({
													DT: dt,
													Open: lastQuote1.Close,
													High: lastQuote1.Close,
													Low: lastQuote1.Close,
													Close: lastQuote1.Close,
													Volume: 0,
													Adj_Close: lastQuote1.Adj_Close
											});
											stick=false;
										}
									}
								}
							}
							var ratio=parseFloat(fields[fieldNames[api.results.ratio]]);
							if(!ratio || isNaN(ratio)) ratio=1;
							if(getSplitInfo){
								if(splitArray.length){
									if(bcdt<splitArray[0].ExDate) ratio*=splitArray[0].SplitRatio;
									else splitArray.pop();
								}
							}
							var open=parseFloat(fields[fieldNames[api.results.open]]);
							var high=parseFloat(fields[fieldNames[api.results.high]]);
							var low=parseFloat(fields[fieldNames[api.results.low]]);
							var close=parseFloat(fields[fieldNames[api.results.close]]);
							//Xignite bad data fixes
							if(open===0 && high==low) open=close;
							if(high===0) high=Math.max(open,close);
							if(low===0) low=Math.min(open,close);
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
								});
							}else if(!missingBarsShutoff){
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
							else if(+results[0].DT==+this.resultsCache[symbol][this.resultsCache[symbol].length-1].DT) {
								var popped=this.resultsCache[symbol].pop();
								if(!results[0].Volume) results[0].Volume=popped.Volume;  //replace last bar with one just fetched, preserving Volume if necessary
							}
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
											setTimeout(function(){ s.fetch(STX.extend(p,{noBats:true}),c); },10);
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
						moreToLoad=!params.stx.quoteDriver.behavior.noLoadMore;
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
							var attrExch="DELAYED";
							if(isBats) attrExch="BATS";
							else if(isForex) attrExch="REAL-TIME";
							else if(isMutual) attrExch="EOD";
							cb({quotes:results, moreAvailable:moreToLoad, attribution:{source:"xignite",exchange:attrExch}});
						}
					}else{
						if(moreToLoad) params.moreToLoad=true;
					}

					if(todayBarFetch){
						params.bypassSnapshot=true;
						todayBarFetch(params, cb);
					}
				};
				STX.postAjax(STX.QuoteFeed.Xignite.Utility.url(api,args,params,this.token), null, function(status, res){
					if(getSplitInfo){
						splitApi=STX.clone(STX.QuoteFeed.Xignite.Templates.SplitRatio);
						var splitArgs={
							Identifier: symbol,
							StartDate: STX.mmddyyyy(STX.yyyymmdd(startDate)),
							EndDate:   STX.mmddyyyy(STX.yyyymmdd(new Date()))
						};
						STX.postAjax(STX.QuoteFeed.Xignite.Utility.url(splitApi,splitArgs,null,this.token), null, function(status2, res2){
							if(status2==200){
								try{
									splitArray=JSON.parse(res2).Splits;
								}catch(e){}
								for(var i=0;i<splitArray.length;i++) {
									splitArray[i].ExDate=STX.strToDateTime(splitArray[i].ExDate);
									if(i) splitArray[i].SplitRatio*=splitArray[i-1].SplitRatio;
								}
							}
							mamaCallbackFunction.call(this,status,res);
						}.bind(this), null, true);					
					}else{
						mamaCallbackFunction.call(this,status,res);
					}
				}.bind(this), null, true);
			}

			if(error!==""){
				if(cb) cb({error:error});
			}
		};

		STX.QuoteFeed.Xignite.Templates={

			token: "/* xignite token */",

			/* Daily/weekly/monthly historical equity request */
			HistoricalEquity: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "www.xignite.com",  //"www.xignite.com"
					path: "/www_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalindiceshistorical.xignite.com",
					path: "/globalindiceshistorical_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalcurrencies.xignite.com",
					path: "/globalcurrencies_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalmetals.xignite.com",
					path: "/globalmetals_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalcurrencies.xignite.com",
					path: "/globalcurrencies_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "www.xignite.com",
					path: "/www_xignite"
				},
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

			/* Equity Delayed Quote */
			DelayedEquity: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalquotes.xignite.com",
					path: "/globalquotes_xignite"
				},
				version:"v3",
				func:	"xglobalquotes",
				format:	"csv",
				method:	"GetGlobalDelayedQuote",
				statics:"IdentifierType=Symbol",
				fields:	"Date,Volume,Open,High,Low,Last",
				results:{
					date:	"Date",
					time:	null,  //not needed for daily update
					open:	"Open",
					close:	"Last",
					high:	"High",
					low:	"Low",
					volume:	"Volume",
					offset: null,
					ratio:	null
				}
			},

			/* Intraday delayed equity request */
			IntradayEquity: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
					ratio:	null // field not implemented yet "ChartBars AdjustmentRatio"
				}
			},
			
			/* Intraday BATS Real Time equity request */
			IntradayBATSRTEquity: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
					ratio:	null // field not implemented yet "ChartBars AdjustmentRatio"
				}
			},
			
			/* BATS Real Time Quote */
			BATSRealQuote: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "batsrealtime.xignite.com",
					path: "/batsrealtime_xignite"
				},
				version:null,
				func:	"xBATSRealTime",
				format: "csv",
				method: "GetRealQuote",
				statics:null,
				fields: "Date,Last,Open,High,Low",
				results:{
					date:	"Date",
					time:	null,  //not needed for fdaily update
					open:	"Open",
					close:	"Last",
					high:	"High",
					low:	"Low",
					volume:	null,  //not needed for daily update
					offset: null,
					ratio:	null
				}
			},

			/* Index Delayed Quote */
			DelayedIndex: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "globalindices.xignite.com",
					path: "/globalindices_xignite"
				},
				version:null,
				func:	"xglobalindices",
				format:	"csv",
				method:	"GetDelayedIndexValue",
				statics:"IdentifierType=Symbol",
				fields:	"Value.Date,Value.Volume,Value.Open,Value.High,Value.Low,Value.Last",
				results:{
					date:	"Value Date",
					time:	null,  //not needed for daily update
					open:	"Value Open",
					close:	"Value Last",
					high:	"Value High",
					low:	"Value Low",
					volume:	"Value Volume",
					offset: null,
					ratio:	null
				}
			},

			/* Intraday delayed index request */
			IntradayIndex: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "chartiq.xignite.com",
					path: "/chartiq_xignite"
				},
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
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "www.xignite.com",
					path: "/www_xignite"
				},
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
			},
			
			/* Delayed Mutual Fund request (for last NAV)*/
			DelayedMF: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "navs.xignite.com",
					path: "/navs_xignite"
				},
				version:"v2",
				func:	"xNAVs",
				format:	"csv",
				method:	"GetNAV",
				statics:"IdentifierType=Symbol",
				fields:	"Date,NAV,PreviousNAV",
				results:{
					date:	"Date",
					time:	null,
					open:	"NAV",
					close:	"NAV",
					high:	"NAV",
					low:	"NAV",
					volume:	null,
					offset: null,
					ratio:	null
				}
			},

			/* Split Ratio request (for intraday)*/
			SplitRatio: {
				host: {
					protocol: "http"+(STX.isIE9?"":"s")+"://",
					server: "www.xignite.com",
					path: "/www_xignite"
				},
				version:null,
				func:	"xGlobalHistorical",
				format:	"json",
				method:	"GetSplitHistory",
				statics:"IdentifierType=Symbol",
				fields:	"Splits.ExDate,Splits.SplitRatio",
				results:{
					date: "Splits ExDate",
					ratio:"Splits SplitRatio"
				}			
			}
		};

		STX.QuoteFeed.Xignite.getSnapshotQuote=function(params, symbol, isDaily, offset, cb, caller){
			return false;
		/*	
			//snapshot update code
			if(params.update && 
				!params.bypassSnapshot && 
				params.stx.chart.masterData && 
				params.stx.chart.masterData.length &&
				",line,colored_line,mountain,baseline_delta,".indexOf(params.stx.layout.chartType)>-1){
				var url;
				var field="Bid";
				if(STX.LegacyMarket.isForexMetal(params.symbol)){
					url=(caller.server?caller.server:"http"+(STX.isIE9?"":"s")+"://"+"services.chartiq.com")+"/chartiq_xignite/xGlobalMetals.json/GetRealTimeMetalQuote?Symbol="+symbol+"&Currency=&_fields=Date,Time,Bid";
				}else if(STX.LegacyMarket.isForexSymbol(params.symbol)){
					url=(caller.server?caller.server:"http"+(STX.isIE9?"":"s")+"://"+"services.chartiq.com")+"/chartiq_xignite/xGlobalCurrencies.json/GetRealTimeRate?Symbol="+symbol+"&_fields=Date,Time,Bid";					
				}else{
					url=(caller.server?caller.server:"http"+(STX.isIE9?"":"s")+"://"+"services.chartiq.com")+"/chartiq_xignite/xBATSRealTime.json/GetRealQuote?Symbol="+symbol+"&_fields=Date,Time,Close";					
					field="Close";
				}
				if(caller.token!=null){
					if(caller.token!="") url+="&_Token="+caller.token;
				}else if(STX.QuoteFeed.Xignite.Templates.token.indexOf("/*")==-1){
					if(STX.QuoteFeed.Xignite.Templates.token!="") url+="&_Token="+STX.QuoteFeed.Xignite.Templates.token;
				}
				STX.postAjax(url, null, function(status, res){
					if(status==200){
						res=JSON.parse(res);
						var mdDate=params.stx.chart.masterData[params.stx.chart.masterData.length-1].DT;
						// align date to beginning of interval
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
		*/
		};

		STX.QuoteFeed.Xignite.Utility={
			/**
			 * Set the overrides values to control how Xignite works. The "server" member will override the individual
			 * server settings for each of the STX.QuoteFeed.Xignite.Templates.
			 *
			 * Set path to "" to override the default proxy paths for the templates.
			 *
			 * Set token to "" to not send a token
			 */
			overrides :{
				protocol: "http"+(STX.isIE9?"":"s")+"://",
				server: "devservices.chartiq.com/data",
				path: null,
				token: null
			},

			xIgniteInterval: function(interval){
				if(!isNaN(interval)) return "";
				else if(interval.charAt(0)=='d') return "Day";
				else if(interval.charAt(0)=='w') return "Week";
				else if(interval.charAt(0)=='m') return "Month";
				else if(interval.charAt(0)=='y') return "Year";
				else return interval;
			},
			url: function(api,args,params,token){
				var override=STX.QuoteFeed.Xignite.Utility.overrides;
				var u="";
				if(api.host instanceof Object){
					u+=(override.protocol!==null)?override.protocol:api.host.protocol;
					u+=(override.server!==null)?override.server:api.host.server;
					u+=(override.path!==null)?override.path:api.host.path;
				}else{
					u+=api.host;
				}
				if(api.version) u+="/"+api.version;
				u+="/"+api.func+"."+api.format;
				if(api.method instanceof Object){
					if(api.method.as_of && !params.startDate && params.maxRecords){
						u+="/"+api.method.as_of;
					}
					//else u+="/"+api.method[params.interval];
					else{
						u+="/"+api.method.day;
					}
				}else{
					u+="/"+api.method;
				}
				u+="?";
				if(token!==null && typeof(token)!="undefined"){
					if(token!=="") u+="&_Token="+token;
				}else if(STX.QuoteFeed.Xignite.Templates.token.indexOf("/*")==-1){
					if(STX.QuoteFeed.Xignite.Templates.token!=="")
						u+=(override.token!==null)?override.token:("&_Token="+STX.QuoteFeed.Xignite.Templates.token);
				}else if(override.token!==null){
					u+="&_Token="+override.token;
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
                //"XBAR": "Europe/Madrid",  no data comes back from this exchange
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
                //"XVAL": "Europe/Madrid",  no data comes back from this exchange
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
                //"INDXSTU": "Europe/Berlin",  no data comes back from this exchange
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
			define( ["stxKernelOs"], function(_stxKernel) { return _stxLibrary_js(_stxKernel); } );
		}else{	
			var _stxKernel={
				"STX":window.STX,
				"STXChart":window.STXChart
			};
			_stxLibrary_js(_stxKernel);
		}
	}

})();




	
