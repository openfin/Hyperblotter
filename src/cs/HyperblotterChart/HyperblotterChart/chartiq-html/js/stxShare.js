(function(){

	function _stxShare_js(_exports) {
		
		var STX=_exports.STX;
		var STXChart=_exports.STXChart;
		
		/**
		 * Manages chart sharing and uploading.
		 * @constructor
		 * @name STXSocial
		 * @version ChartIQ plug-in
		 */
		function STXSocial(){
		}
		
		_exports.STXSocial=STXSocial;
		
		/**
		 * Base class for a decorator. A decorator adds custom branding to a chart image before it is rendered.
		 * @constructor
		 * @name STXSocial.Decoration
		 * @version ChartIQ plug-in
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
		 * @memberOf STXSocial
		 * @version ChartIQ plug-in
		 */
		STXSocial.createImage=function(stx, widthPX, heightPX, decorationObj, cb){
			if(!decorationObj) decorationObj=STXSocial.defaultDecorator;
			if(!decorationObj.initialize) decorationObj=null;
			
			// Compute and/or determine sizes of headers and footers for decorator
			if(decorationObj){
				decorationObj.initialize(stx, stx.chart.canvas, widthPX, heightPX);
			}
			
			// Set background for any part of canvas that is currently transparent
			STX.fillTransparentCanvas(stx.chart.context, stx.containerColor, stx.chart.canvas.width, stx.chart.canvas.height);
			
			// Render panel labels
			STXSocial.watermarkPanels(stx);
			
			// We use style height/width instead of the canvas width/height when the backing store is 2x on retina screens
			var renderedHeight=stx.chart.canvas.height;
			var renderedWidth=stx.chart.canvas.width;
			if(stx.chart.canvas.style.height){
				renderedHeight=STX.stripPX(stx.chart.canvas.style.height);
				renderedWidth=STX.stripPX(stx.chart.canvas.style.width);
			}
			if(widthPX && heightPX){
				renderedHeight=heightPX;
				renderedWidth=widthPX;
				if(decorationObj){
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
				if(decorationObj){
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
		 * @memberOf STXSocial
		 * @version ChartIQ plug-in
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
		 * @memberOf STXSocial
		 * @version ChartIQ plug-in
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
				if(panel.hidden) continue;
				if(panel.name=="chart") continue;
				stx.canvasColor("stx_panel_background");
				stx.chart.context.font=getComputedStyle(panel.title).font;
				var t=panel.top + panel.icons.offsetTop;
				var w=stx.chart.context.measureText(panel.title.innerHTML.toUpperCase()).width;
				STX.semiRoundRect(stx.chart.context, 0, t+4, w+6, 20, 5, true);
		
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
		 * @memberOf STXSocial
		 * @version ChartIQ plug-in
		 * @example
		 * function runSampleUI(){
		 * 		// put your code to establish the behavior of your UI.
		 * 		STXSocial.brandMyChart(stxx, "logo.png",[10,-30]);
		 * }
		 */
		STXSocial.brandMyChart=function(stx, imageURL, positioning){
			function prependDisplayChart(stx, image, positioning){
				return function(){
					var x=stx.chart.canvasWidth/2-image.width/2;
					var y=stx.panels.chart.height/2-image.height/2;
					if(positioning){
						if(positioning[0]>0){
							x=positioning[0];
						}else{
							x=stx.chart.width-image.width+positioning[0];
						}
						if(positioning[1]>0){
							y=positioning[1];
						}else{
							y=stx.panels.chart.height-image.height+positioning[1];
						}
					}
					stx.chart.context.drawImage(image, x, stx.panels.chart.top+y);
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

		/*
		 * Here's an example implementation of chart sharing upload.
		 * (example python code available in our tutorials (http://chartiq.com/licensing/documentation/tutorial-Chart Sharing.html)
		 */
		STXSocial.shareChart=function(stx, override, successCB, failureCB){
			STXSocial.createImage(stx, null, null, null, function(imgData){
				var id=STX.uniqueID();
				var host="http://share.chartiq.com";
				var url= host + "/upload/" + id;
				if(override){
					if(override.host) host=override.host;
					if(override.path) url=host+override.path+"/"+id;
				}
				var startOffset=stx.getStartDateOffset();
				var metaData={
					"layout": stx.exportLayout(),
					"drawings": stx.serializeDrawings(),
					"xOffset": startOffset,
					"startDate": stx.chart.dataSegment[startOffset].Date,
					"endDate": stx.chart.dataSegment[stx.chart.dataSegment.length-1].Date,
					"id": id,
					"symbol": stx.chart.symbol
				};
				var payload={"id": id, "image": imgData, "config": metaData};
				STXSocial.uploadImage(imgData, url, payload, function(err, response){
					if(err!==null){
						failureCB(err);
					}else{
						successCB(host+response);
					}
				});
				// end sample code to upload image to a server
			});
		};
		
		return _exports;
		
	}

	{
		if ( typeof define === "function" && define.amd ) {
			define( ["stxKernelOs"], function(_stxKernel) { return _stxShare_js(_stxKernel); } );
		}else{	
			var _stxKernel={
				"STX":window.STX,
				"STXChart":window.STXChart
			};
			var _=_stxShare_js(_stxKernel);
			window.STXSocial=_.STXSocial;
		}
	}

})();





