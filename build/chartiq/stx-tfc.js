/**
	Account object. Derive an account object from this basic template and
	ensure that each of the functions works correctly and that the data
	is stored in the specified format.
	@constructor
	@abstract
*/


STX.Account=function(){
	this.balances={
		liquidity: 100000,
		unsettledCash: 0,
		cash: 100000,
		buyingPower: 200000
	};
	this.positions={
		"IBM":{quantity:1000,basis:126.13},
		"GE":{quantity:100,basis:26.11},
		"SPY":{quantity:-1000,basis:187.11},
		"LNKD":{quantity:-100,basis:230}
	};
	this.openOrders={
		"IBM":[{id:"1", action:"sell", quantity:500, limit:197, tif:"GTC"},
		{id:"2", action:"sell", quantity:500, limit:196, tif:"GTC"}],
		"TSLA":[{id:"3", action:"buy", quantity:10, limit:170, tif:"DAY"}],
		"GE":[{id:"4", action:"sell", quantity:100, limit:30, tif:"GTC", oco:"5"},
			{id:"5", action:"sell", quantity:100, limit:25, tif:"GTC", oco:"4"}
			],
		"LNKD":[{id:"6", action:"buy", quantity:100, limit:112, tif:"DAY", oto: [
				{id:"7", action:"sell", quantity:100, limit:130, tif:"GTC", oco:"8"},
				{id:"8", action:"sell", quantity:100, stop:110, tif:"GTC", oco:"7"}
				]}
			]
	};
	this.executions={
		"SPY":[{date:"01/01/2014 09:30", quantity:100, price:113.00, basis:110}]
	};
	this.config={
		oto:true,
		oco:true,
		disableModifyOrderQuantity: false
	};
};

/**
 * @callback STX.Account.Balances
 * @param {string} err Null if no error, otherwise the printable error message
 * @param {object} balances A balances object
 * @param {number} balances.liquidity The liquidation value for the account
 * @param {number} balances.cash Trading cash in the account
 * @param {number} balances.unsettledCash Unsettled cash for the account
 * @param {number} balances.buyingPower Buying power for the account. Null if not a margin account.
 */

/**
 * @callback STX.Account.Positions
 * @param {string} err Null if no error, otherwise the printable error message
 * @param {object} positions A positions object. Contains a field for each security symbol.
 * @example
 * 	this.positions={
		"IBM":{quantity:1000,basis:126.13}, // "basis" is the (current, cumulative) cost-basis for the position
		"GE":{quantity:100,basis:26.11},
		"SPY":{quantity:-1000,basis:187.11}, // Use negative values for short positions
		"LNKD":{quantity:-100,basis:230}
	};
 */
/**
 * @callback STX.Account.OpenOrders
 * @param {string} err Null if no error, otherwise the printable error message
 * @param {object} openOrders An open orders object. Contains a field for each security symbol. Each symbol contains an array
 * of open orders. It is assumed that each open order is referenced by a unique id. An optional "oco" field should reference the id
 * of a linked order. An optional "oto" field contains an array of orders that will be triggered on execution.
 * @example
	this.openOrders={
		"IBM":[{id:"1", action:"sell", quantity:500, limit:197, tif:"GTC"}, // There are two open orders to sell IBM at two different prices
		{id:"2", action:"sell", quantity:500, limit:196, tif:"GTC"}],

		"TSLA":[{id:"3", action:"buy", quantity:10, limit:170, tif:"DAY"}],	// There is a single day order to buy TSLA

		"GE":[{id:"4", action:"sell", quantity:100, limit:30, tif:"GTC", oco:"5"},	// There is an OCO outstanding to sell GE
			{id:"5", action:"sell", quantity:100, stop:20, tif:"GTC", oco:"4"}
			],

		"LNKD":[{id:"6", action:"buy", quantity:100, limit:112, tif:"DAY", oto: [	// LNKD has an open order and an OTO bracket (and OTO that contains an OCO)
				{id:"7", action:"sell", quantity:100, limit:130, tif:"GTC", oco:"8"},
				{id:"8", action:"sell", quantity:100, stop:110, tif:"GTC", oco:"7"}
				]}
			]
	};
 */
/**
 * Abstract for fetching balances. Your implementation should set this.balances
 * @param  {STX.Account.Balances} cb Callback function fc(err)
 */
STX.Account.prototype.fetchBalances=function(cb){cb();};

/**
 * Abstract for fetching Positions. Your implementation should set this.positions
 * @param  {STX.Account.Positions} cb Callback function fc(err)
 */
STX.Account.prototype.fetchPositions=function(cb){cb();};

/**
 * Abstract for fetching Open Orders. Your implementation should set this.openOrders
 * @param  {STX.Account.OpenOrders} cb Callback function fc(err)
 */
STX.Account.prototype.fetchOpenOrders=function(cb){cb();};

/**
 * Abstract for Placing an order
 * @param {STX.TFC} tfc The TFC object
 * @param {object} order The order, in native TFC format. The abstract interface
 * is responsible for converting this order into the format required by the broker interface.
 * @param {string} order.type "order" (as opposed to "replace")
 * @param {string} order.symbol The security symbol
 * @param {string} order.action "buy","sell"
 * @param {number} order.quantity The quantity to trade
 * @param {number} [order.limit] The limit price, optional (if no limit or stop then the order is a market order)
 * @param {number} [order.stop] The stop price, optional.
 * @param {string} order.tif "GTC" or "DAY"
 * @param {array} [order.oto] Optional OTO array, each array element contains an order in this same format
 * @param  {function} cb Callback function fc(err)
 */
STX.Account.prototype.placeOrder=function(tfc, order, cb){};

/**
 * Abstract for Modifying an order (cancel/replace)
 * @param {STX.TFC} tfc The TFC object
 * @param {object} order The modification order, in native TFC format. The abstract interface
 * is responsible for converting this order into the format required by the broker interface.
 * @param {string} order.type "replace" (as opposed to "order")
 * @param {string} order.symbol The security symbol
 * @param {string} order.id The ID of the order being modified
 * @param {string} order.action "buy" or "sell"
 * @param {object} order.limit Limit price (if one exists)
 * @param {number} order.limit.old Old limit price if there was one
 * @param {number} order.limit.new New limit price if there is one
 * @param {object} order.stop Stop price (if one exists)
 * @param {number} order.stop.old Old stop price if there was one
 * @param {number} order.stop.new New stop price if there is one
 * @param {object} order.quantity Quantity tuple
 * @param {number} order.quantity.old Old quantity
 * @param {number} order.quantity.new New quantity
 * @param {object} order.tif TIF tuple
 * @param {string} order.tif.old Old TIF
 * @param {string} order.tif.new New TIF
 * @param {object} [order.oto] Optional tuple containing old and new oto
 * @param {object} [order.oto.old] Old OTO
 * @param {object} [order.oto.new] New OTO
 * @param  {function} cb Callback function fc(err)
 */
STX.Account.prototype.replaceOrder=function(tfc, order, cb){};

/**
 * Abstract for Canceling an order
 * @param {STX.TFC} tfc The TFC object
 * @param {object} order The order to cancel, in native TFC format. The abstract interface
 * is responsible for converting this order into the format required by the broker interface.
 * @param  {function} cb Callback function fc(err)
 */
STX.Account.prototype.cancelOrder=function(tfc, order, cb){};

/**
 * @callback Confirmation
 * @param {number} [commission]	The commission amount if available
 * @param {number} [fees] The fee amount if available
 * @param {number} [total] Total amount of trade
 * @param {array} [errors] Any errors
 * @param {array} [warnings] Any warnings
 */

/**
 * Confirm an order before placing it. This is optional and only for firms that support a server side
 * order confirmation (Are you sure) process. If not supported then simply call the callback
 * @param {STX.TFC} tfc The TFC object
 * @param  {object}   order The order to confirm
 * @param  {Confirmation} cb    The callback when confirmed with Confirmation object.
 */
STX.Account.prototype.confirmOrder=function(tfc, order, cb){
	cb();
};
/**
 * @callback Tradability
 * @param {boolean} tradable True if the symbol can be traded
 * @param {boolean} shortable True if the symbol can be shorted
 */
/**
 * Determines the tradability of the requested symbol. This includes whether it's tradable at all
 * and whether it can be shorted. Override this with your own firm's logic and query.
 * @param  {string} symbol Symbol to check
 * @param {Tradability} cb Callback with tradability status
 */
STX.Account.prototype.tradability=function(symbol, cb){
	function isIndex(symbol){
		if(symbol.indexOf("$")!=-1) return true;
		if(symbol.indexOf("^")!=-1){
			if(symbol.length==7) return false; // forex symbol
			return true;
		}
		return false;
	}
	var tradability={
		tradable: true,
		shortable: true,
		decimalPrecision: null
	};
	if(!symbol){
		tradability.tradable=false;
		cb(tradability);
		return;
	}
	if(isIndex(symbol)) tradability.tradable=false;
	// shortable: check for existence of margin account
	// shortable: check easy to borrow list
	// shortable: check price > $X
	cb(tradability);
};

/**
	Demo account - A demo implementation of the STX.Account abstract class. This
	class supports placing, modifying and canceling orders. The openOrders will reflect
	the changes but are never executed. Market orders execute immediately and update
	positions. Balances and P&L are static.
*/
STX.Account.Demo=function(){
	this.balances={
		liquidity: 100000,
		unsettledCash: 0,
		cash: 100000,
		buyingPower: 200000
	};
	this.positions={
		"IBM":{quantity:1000,basis:126.13, price:129.13, prevClose:123.13},
		"GE":{quantity:100,basis:26.11, price:24.11, prevClose:26.11},
		"SPY":{quantity:-1000,basis:187.11, price:187.11, prevClose:190.11},
		"LNKD":{quantity:-100,basis:230, price:186, prevClose:240}
	};
	this.openOrders={
		"IBM":[{id:"1", action:"sell", quantity:500, limit:197, tif:"GTC"},
		{id:"2", action:"sell", quantity:500, limit:196, tif:"GTC"}],
		"TSLA":[{id:"3", action:"buy", quantity:10, limit:170, tif:"DAY"}],
		"GE":[{id:"4", action:"sell", quantity:100, limit:30, tif:"GTC", oco:"5"},
			{id:"5", action:"sell", quantity:100, limit:25, tif:"GTC", oco:"4"}
			],
		"LNKD":[{id:"6", action:"buy", quantity:100, limit:112, tif:"DAY", oto: [
				{id:"7", action:"sell", quantity:100, limit:130, tif:"GTC", oco:"8"},
				{id:"8", action:"sell", quantity:100, stop:110, tif:"GTC", oco:"7"}
				]}
			]
	};
};
STX.Account.Demo.stxInheritsFrom(STX.Account);

STX.Account.Demo.prototype.placeOrder=function(tfc, order, cb){
	if(order.constructor == Array){
		var symbol=order[0].symbol;
		if(!this.openOrders[symbol]) this.openOrders[symbol]=[];
		order[0].id=STX.uniqueID();
		order[1].id=STX.uniqueID();
		order[0].oco=order[1].id;
		order[1].oco=order[0].id;
		this.openOrders[symbol].push(order[0]);
		this.openOrders[symbol].push(order[1]);
	}else{
		if(!this.openOrders[order.symbol]) this.openOrders[order.symbol]=[];
		if(!order.limit && !order.stop){	// market orders
			this.execute(order, tfc.stx.currentQuote().Close);
		}else{
			order.id=STX.uniqueID();
			this.openOrders[order.symbol].push(order);
		}
	}
	cb();
};

STX.Account.Demo.prototype.cancelOrder=function(tfc, order, cb){
	for(var symbol in this.openOrders){
		var openOrders=this.openOrders[symbol];
		for(var i=0;i<openOrders.length;i++){
			var openOrder=openOrders[i];
			if(order.id==openOrder.id){
				openOrders.splice(i,1);
				cb();
				return;
			}
		}
	}
	cb();
};

STX.Account.Demo.prototype.replaceOrder=function(tfc, order, cb){
	for(var symbol in this.openOrders){
		var openOrders=this.openOrders[symbol];
		for(var i=0;i<openOrders.length;i++){
			var openOrder=openOrders[i];
			if(order.id==openOrder.id){
				openOrder.limit=order.limit["new"];
				openOrder.stop=order.stop["new"];
				openOrder.tif=order.tif["new"];
				openOrder.quantity=order.quantity["new"];
				if(order.oto["new"]){
					openOrder.oto=order.oto["new"];
				}else{
					delete openOrder.oto;
				}
				cb();
				return;
			}
		}
	}
};

STX.Account.Demo.prototype.execute=function(order, price){
	var quantity=order.quantity;
	if(order.action=="sell" || order.action=="short") quantity*=-1;
	this.balances.cash-=quantity*price;
	this.balances.buyingPower=2*this.balances.cash;
	var position=this.positions[order.symbol];
	if(!position){
		this.positions[order.symbol]={quantity: quantity, basis: price, price:price, prevClose:price};
	}else{
		if(quantity>0) position.basis=((position.quantity * position.basis) + (quantity*price))/(position.quantity+quantity);
		position.quantity+=quantity;
		position.price=price;
		if(position.quantity==0){
			delete this.positions[order.symbol];
		}
	}
	var openOrders=this.openOrders[order.symbol];
	for(var i=0;i<openOrders.length;i++){
		if(openOrders[i].id==order.id){
			openOrders.splice(i,1);
			if(openOrders.length==0){
				delete this.openOrders[order.symbol];
			}
			return;
		}
	}
};
/**
 * Trade From Chart object (TFC). TFC should be constructed once and associated with an STXChart (stx)
 * object. It should also be passed a valid STX.Account which can be used for querying and placing orders.
 * The TFC object creates and manages a number of DOM elements which are located in stx-tfc.html.
 * @constructor
 * @param {object} config Configuration object
 * @param {object} config.stx     The chart object to enable TFC.
 * @param {object} config.account Valid STX.Account object for querying brokerage and placing trades
 * @param {object} [config.chart]   The specific chart (panel) for trading componentry. Defaults to the default chart.
 * @param {boolean} [config.oco] Set to true if oco orders are supported
 * @param {boolean} [config.oto] Set to true if oto orders are supported
 *
 * @todo  update quantity/amount when current quote is updated
 * @todo  scrollable positions and open orders in expanded tab
 */
STX.TFC=function(config){
	if(!config.chart) config.chart=config.stx.chart;
	this.modifyingOrder=null;	// This will contain the open order we are currently modifying, if we are modifying an order
	this.construct(config);
	this.positionIScroll=null;
	this.openOrderIScroll=null;
};

/**
 * Holds references to the top level DOM elements that are used with TFC. These elements
 * are appended to the chart container in STX.TFC.prototype.construct.
 * @type {Object}
 * @property {HTMLElement} dragLineAbove The draggable line that is above the price (stop or limit)
 * @property {HTMLElement} dragLineCenter The draggable line at the center of a limit/stop order
 * @property {HTMLElement} dragLineBelow The draggable line that is below the price (stop or limit)
 * @property {HTMLElement} marketOrder The market order widget
 * @property {HTMLElement} limitOrder The limit/stop order widget
 * @property {HTMLElement} otoAbove The OTO widget above the dragLineAbove
 * @property {HTMLElement} otoBelow The OTO widget below the dragLineBelow
 * @property {HTMLElement} ocoOrder The OCO order widget (located below the ocoBelow)
 * @property {HTMLElement} ocoAbove The OCO widget that is the above line
 * @property {HTMLElement} ocoBelow The OCO widget that is the below line
 * @property {HTMLElement} shadeAbove Shading above an OCO
 * @property {HTMLElement} shadeBelow Shading below an OCO
 */
STX.TFC.prototype.dom={
	dragLineAbove:null,
	dragLineCenter:null,
	dragLineBelow:null,
	marketOrder:null,
	limitOrder:null,
	otoAbove:null,
	otoBelow:null,
	ocoOrder:null,
	ocoAbove:null,
	ocoBelow:null,
	shadeAbove:null,
	shadeBelow:null
};

/**
 * Contains references to templates (HTML objects) that are reusable
 * @property {HTMLElement} openOrderMarker The template used to create open order markers
 * @type {Object}
 */
STX.TFC.prototype.templates={
	openOrderMarker:null
};

/**
 * When a template is instantiated, a reference is saved in ephemeralNodes so that it can
 * be deleted at a future time
 * @property {array} openOrders Array of instantiated openOrders templates
 * @type {Object}
 */
STX.TFC.prototype.ephemeralNodes={
	openOrders:[]
};

/**
 * Contains references to each type of action. For each action a menu item is specified as "node".
 * The dom array should contain each of the TFC components that are to be enabled for that type of order
 * @type {Object}
 */
STX.TFC.prototype.menu={
	enableMarket:{nodes:[], dom:["marketOrder"]},
	enableBuy:{nodes:[], dom:["limitOrder","dragLineCenter"]},
	enableSell:{nodes:[], dom:["limitOrder","dragLineCenter"]},
	enableShort:{nodes:[], dom:["limitOrder","dragLineCenter"]},
	enableCover:{nodes:[], dom:["limitOrder","dragLineCenter"]},
	enableStraddle:{nodes:[], dom:["ocoOrder","ocoAbove","ocoBelow","dragLineAbove","dragLineBelow","shadeAbove","shadeBelow"]},
	enableStrangle:{nodes:[], dom:["ocoOrder","ocoAbove","ocoBelow","dragLineAbove","dragLineBelow","shadeAbove", "shadeBelow"]},
	enableBracket:{nodes:[], dom:["limitOrder","dragLineAbove","dragLineBelow","otoAbove","otoBelow", "shadeAbove", "shadeBelow"]}
};

/**
 * Contains references to all of the individual HTML elements that may need to be referenced. Each of these
 * elements would be a sub element of one of the top level elements contained in STX.TFC.prototype.dom.
 * @type {Object}
 */
STX.TFC.prototype.elements={
};

/**
 * Positions nodes at the given price.
 * @param  {number} price       The price (relative to the y-axis)
 * @param  {array} nodes       An array of nodes to move to the desired location
 * @param  {string} [where]       If either "top" or "bottom", then the node will not be allowed to overlap the noOverlap nodes
 * @param  {array} [noOverlap]   An array of nodes which cannot be overlapped
 * @param  {boolean} [keepOnChart] If true then the nodes will not be allowed to move off the chart
 */
STX.TFC.prototype.positionAtPrice=function(price, nodes, where, noOverlap, keepOnChart){
	if(!where) where="center";
	var px=this.locationFromPrice(price), node;
	for(var i=0;i<nodes.length;i++){
		var nodeName=nodes[i];
		if(typeof nodeName=="string"){
			node=this.dom[nodeName];
		}else{
			node=nodeName;
		}
		var top=null;
		if(where=="center"){
			top=(px-(node.offsetHeight/2));
		}else if(where=="top"){
			if(noOverlap){
				for(var j=0;j<noOverlap.length;j++){
					var oNode=this.dom[noOverlap[j]];
					var bottom=STX.stripPX(oNode.style.top)+oNode.offsetHeight;
					if(bottom>px) px=bottom;
				}
			}
			top=Math.round(px)+1;
		}else if(where=="bottom"){
			if(noOverlap){
				for(var j=0;j<noOverlap.length;j++){
					var oNode=this.dom[noOverlap[j]];
					var top=STX.stripPX(oNode.style.top);
					if(px>top) px=top;
				}
			}
			top=Math.round(px-node.offsetHeight);
		}
		if(keepOnChart){
			if(top<0) top=0;
			else if(top+node.offsetHeight>this.chart.panel.height) top=this.chart.panel.height-node.offsetHeight;
		}
		if(top!=null) node.style.top=(top)+"px";
	}
};

/**
 * Enables the market order widget
 */
STX.TFC.prototype.enableMarket=function(){
	this.activeTrade="market";
	this.dom.marketOrder.style.top="0px";
	if(STX.LegacyMarket.isForexFuturesSymbol(this.stx.chart.symbol)){
		this.elements.askForexPart.style.visibility="";
		this.elements.bidForexPart.style.visibility="";
	}else{
		this.elements.askForexPart.style.visibility="hidden";
		this.elements.bidForexPart.style.visibility="hidden";
	}
	this.updateValues();
};

/**
 * Sets the initial order price. This is either the current quote for the security or, if modifying an order
 * the current limit or stop price for the order.
 * @param  {object} params Optional parameters
 */
STX.TFC.prototype.initializeOrderPrice=function(params){
	this.centerPrice=this.stx.currentQuote().Close;
	if(params && params.openOrder){
		// If we're modifying an open order then set the price to the price of the initial open order
		var price=this.centerPrice;
		if(params.openOrder.limit) price=params.openOrder.limit;
		else if(params.openOrder.stop) price=params.openOrder.stop;
		this.centerPrice=price;
	}	
};

/**
 * Enables a buy order. 
 * 
 * Note the concept of "limit" and "stop" lose some of their meaning in the context of trading from the chart.
 * What we are actually doing is setting a price that, if the security hits that price, creates a market order. This is the true and original
 * meaning of a limit or stop order. The distinction regarding which way the stock is traveling is not significant in the context of trading
 * from the chart. As such, a "limit" order in this context could be a stop or a limit when initiating a trade.
 *
 * However, when *closing a position*, the meaning of stop and limit take on more significance. When closing a position, we want to "stop our loss"
 * or "limit our gains" and thus when we place a bracket (or one leg of a bracket) around an initial positions, we do use the "stop" and "loss" terminology.
 *
 * The "buy" order is used only for initiating a long position. @see STX.TFC.prototype.enableCover for covering a short position.
 *
 * 
 * @param  {object} [params] Initial parameters for the order, only used if we are modifying an open order and need to derive the initial price from that order.
 */
STX.TFC.prototype.enableBuy=function(params){
	this.activeTrade="buy";
	STX.swapClassName(this.dom.dragLineAbove, "red", "green");
	STX.swapClassName(this.dom.dragLineBelow, "red", "green");
	STX.swapClassName(this.dom.dragLineCenter, "green", "red");
	STX.unappendClassName(this.dom.limitOrder, "new-cover-order");
	STX.unappendClassName(this.dom.limitOrder, "new-sell-order");
	STX.unappendClassName(this.dom.limitOrder, "new-short-order");
	STX.appendClassName(this.dom.limitOrder, "new-buy-order");

	STX.unappendClassName(this.dom.limitOrder, "with-stop");
	STX.unappendClassName(this.dom.limitOrder, "with-limit");
	this.initializeOrderPrice(params);
	this.positionAtPrice(this.centerPrice, ["limitOrder","dragLineCenter"]);
	this.elements.dragLineCenterPrice.innerHTML=this.formatPrice(this.centerPrice);

	if(params && params.openOrder){
		this.elements.limitShares.value=params.openOrder.quantity;
		this.elements.limitTIF.value=params.openOrder.tif;
	}
	//this.elements.limitTIF.focus();
};



/**
 * Enables a sell order.
 * @param  {object} [params] Initial parameters for the order, only used when modifying an open order to obtain the current limit/stop price.
 */
STX.TFC.prototype.enableSell=function(params){
	this.activeTrade="sell";
	STX.swapClassName(this.dom.dragLineCenter, "red", "green");
	STX.unappendClassName(this.dom.limitOrder, "new-cover-order");
	STX.unappendClassName(this.dom.limitOrder, "new-buy-order");
	STX.unappendClassName(this.dom.limitOrder, "new-short-order");
	STX.appendClassName(this.dom.limitOrder, "new-sell-order");
	STX.unappendClassName(this.dom.limitOrder, "with-stop");
	STX.unappendClassName(this.dom.limitOrder, "with-limit");
	var quantity=0;
	var position=this.account.positions[this.stx.chart.symbol];
	if(position) quantity=position.quantity;
	this.elements.sharesOwned.innerHTML=STX.commas(quantity);
	this.initializeOrderPrice(params);
	this.positionAtPrice(this.centerPrice, ["limitOrder","dragLineCenter"]);
	this.elements.dragLineCenterPrice.innerHTML=this.formatPrice(this.centerPrice);
	if(params && params.openOrder){
		this.elements.limitShares.value=params.openOrder.quantity;
		this.elements.limitTIF.value=params.openOrder.tif;
	}
};

/**
 * Enable a short order (selling to open a position)
 * @param  {object} [params] Initial parameters, only used when modifying an open order to obtain the current limit/stop price.
 */
STX.TFC.prototype.enableShort=function(params){
	this.activeTrade="short";
	STX.swapClassName(this.dom.dragLineAbove, "green", "red");
	STX.swapClassName(this.dom.dragLineBelow, "green", "red");
	STX.swapClassName(this.dom.dragLineCenter, "red", "green");
	STX.unappendClassName(this.dom.limitOrder, "new-cover-order");
	STX.unappendClassName(this.dom.limitOrder, "new-sell-order");
	STX.unappendClassName(this.dom.limitOrder, "new-buy-order");
	STX.appendClassName(this.dom.limitOrder, "new-short-order");

	STX.unappendClassName(this.dom.limitOrder, "with-stop");
	STX.unappendClassName(this.dom.limitOrder, "with-limit");
	this.initializeOrderPrice(params);
	this.positionAtPrice(this.centerPrice, ["limitOrder","dragLineCenter"]);
	this.elements.dragLineCenterPrice.innerHTML=this.formatPrice(this.centerPrice);
	if(params && params.openOrder){
		this.elements.limitShares.value=params.openOrder.quantity;
		this.elements.limitTIF.value=params.openOrder.tif;
	}
};

/**
 * Enables a buy to cover order (closing a short position)
 * @param  {object} [params] Initial parameters, only used when modifying an open order to obtain the current limit/stop price.
 */
STX.TFC.prototype.enableCover=function(params){
	this.activeTrade="cover";
	STX.swapClassName(this.dom.dragLineCenter, "green", "red");
	STX.unappendClassName(this.dom.limitOrder, "new-sell-order");
	STX.unappendClassName(this.dom.limitOrder, "new-buy-order");
	STX.unappendClassName(this.dom.limitOrder, "new-short-order");
	STX.appendClassName(this.dom.limitOrder, "new-cover-order");
	STX.unappendClassName(this.dom.limitOrder, "with-stop");
	STX.unappendClassName(this.dom.limitOrder, "with-limit");
	var quantity=0;
	var position=this.account.positions[this.stx.chart.symbol];
	if(position) quantity=position.quantity;
	this.elements.sharesOwned.innerHTML=STX.commas(quantity);
	this.initializeOrderPrice(params);
	this.positionAtPrice(this.centerPrice, ["limitOrder","dragLineCenter"]);
	this.elements.dragLineCenterPrice.innerHTML=this.formatPrice(this.centerPrice);
	if(params && params.openOrder){
		this.elements.limitShares.value=params.openOrder.quantity;
		this.elements.limitTIF.value=params.openOrder.tif;
	}
};

/**
 * Enables a bracket order. A bracket order is, specifically, an OCO (one cancels the other) with stop and limit legs, to *close* an open position.
 * The bracket order will calculate the risk/reward for the open position. Note that the system does not support modification of an OCO specifically
 * but rather modification of one or the other legs. If the brokerage supports/requires modification of a complete OCO, then the translation layer
 * should make that adjustment.
 */
STX.TFC.prototype.enableBracket=function(){
	STX.unappendClassName(this.dom.limitOrder, "new-cover-order");
	STX.unappendClassName(this.dom.limitOrder, "new-sell-order");
	STX.unappendClassName(this.dom.limitOrder, "new-short-order");
	STX.unappendClassName(this.dom.limitOrder, "new-buy-order");

	STX.unappendClassName(this.dom.shadeAbove, "tfc-profit");
	STX.unappendClassName(this.dom.shadeBelow, "tfc-profit");
	STX.swapClassName(this.dom.shadeAbove, "tfc-neutral", "tfc-loss");
	STX.swapClassName(this.dom.shadeBelow, "tfc-neutral", "tfc-loss");


	STX.appendClassName(this.dom.otoAbove, "bracket");
	STX.appendClassName(this.dom.otoBelow, "bracket");
	var position=this.account.positions[this.stx.chart.symbol];
	if(position.quantity>0){
		this.activeTrade="bracket_sell";
		STX.swapClassName(this.dom.dragLineAbove, "red", "green");
		STX.swapClassName(this.dom.dragLineBelow, "red", "green");
		STX.appendClassName(this.dom.limitOrder, "new-sell-order");
		this.elements.otoAboveLegLabel.innerHTML="Sell Limit";
		this.elements.otoBelowLegLabel.innerHTML="Sell Stop";
	}else{
		this.activeTrade="bracket_cover";
		STX.swapClassName(this.dom.dragLineAbove, "green", "red");
		STX.swapClassName(this.dom.dragLineBelow, "green", "red");		
		STX.appendClassName(this.dom.limitOrder, "new-cover-order");
		this.elements.otoBelowLegLabel.innerHTML="Buy Limit";
		this.elements.otoAboveLegLabel.innerHTML="Buy Stop";
	}
	this.elements.sharesOwned.innerHTML=STX.commas(position.quantity);


	STX.appendClassName(this.dom.limitOrder, "with-stop");
	STX.appendClassName(this.dom.limitOrder, "with-limit");
	this.centerPrice=this.stx.currentQuote().Close;
	var y=this.stx.pixelFromPriceTransform(this.centerPrice, this.chart.panel);
	this.positionAboveLine(this.stx.valueFromPixelUntransform(y-50, this.chart.panel));
	this.positionBelowLine(this.stx.valueFromPixelUntransform(y+50, this.chart.panel));
	this.updateValues();
	this.render();
};

/**
 * Enable a straddle order. A straddle is, specifically, an OCO (one cancels the other) to *open* a position. The goal of the straddle is to
 * capture a breakout from a presumed trading range. The resulting position may be either long or short.
 */
STX.TFC.prototype.enableStraddle=function(){
	this.activeTrade="straddle";
	STX.swapClassName(this.dom.dragLineAbove, "green", "red");
	STX.swapClassName(this.dom.dragLineBelow, "green", "red");
	STX.unappendClassName(this.dom.shadeAbove, "tfc-neutral");
	STX.unappendClassName(this.dom.shadeBelow, "tfc-neutral");
	STX.swapClassName(this.dom.shadeAbove, "tfc-profit", "tfc-loss");
	STX.swapClassName(this.dom.shadeBelow, "tfc-profit", "tfc-loss");
	this.elements.ocoAboveHead.innerHTML="Buy Stop";
	this.elements.ocoBelowHead.innerHTML="Sell Stop";
	this.centerPrice=this.stx.currentQuote().Close;
	var y=this.stx.pixelFromPriceTransform(this.centerPrice, this.chart.panel);
	this.positionAboveLine(this.stx.valueFromPixelUntransform(y-50, this.chart.panel));
	this.positionBelowLine(this.stx.valueFromPixelUntransform(y+50, this.chart.panel));
	this.updateValues();
	this.render();
};

/**
 * Enable a strangle order. A strangle is, specifically, an OCO (one cancels the other) to *open* a position. The goal of the straddle is to
 * profit when a security bounces within a presumed trading range. The resulting position may be either long or short.
 */
STX.TFC.prototype.enableStrangle=function(){
	this.activeTrade="strangle";
	STX.swapClassName(this.dom.dragLineAbove, "red", "green");
	STX.swapClassName(this.dom.dragLineBelow, "red", "green");
	STX.unappendClassName(this.dom.shadeAbove, "tfc-neutral");
	STX.unappendClassName(this.dom.shadeBelow, "tfc-neutral");
	STX.swapClassName(this.dom.shadeAbove, "tfc-loss", "tfc-profit");
	STX.swapClassName(this.dom.shadeBelow, "tfc-loss", "tfc-profit");
	this.elements.ocoAboveHead.innerHTML="Sell Limit";
	this.elements.ocoBelowHead.innerHTML="Buy Limit";
	this.centerPrice=this.stx.currentQuote().Close;
	var y=this.stx.pixelFromPriceTransform(this.centerPrice, this.chart.panel);
	this.positionAboveLine(this.stx.valueFromPixelUntransform(y-50, this.chart.panel));
	this.positionBelowLine(this.stx.valueFromPixelUntransform(y+50, this.chart.panel));
	this.updateValues();
	this.render();
};

/**
 * Adds a stop widget to an active buy or short trade. The stop widget will be either on the bottom or top depending on whether it is a buy or short trade
 * and the user can position it. When a stop (or limit) is added to such a trade, it will be placed as an OTO (one trigger other) trade.
 * @param {number} [initialPrice] - The initial price to place the trade. If not set then the price will be computed visually, so that the stop widget does
 * not overlap the buy/short widget.
 */
STX.TFC.prototype.addOTOStop=function(initialPrice){
	STX.appendClassName(this.dom.limitOrder, "with-stop");
	if(this.activeTrade=="buy"){
		this.dom.otoBelow.style.display="";
		this.dom.dragLineBelow.style.display="";
		if(!initialPrice) initialPrice=this.priceFromLocation(STX.stripPX(this.dom.limitOrder.style.top)+this.dom.limitOrder.offsetHeight);
		this.positionBelowLine(initialPrice);
		this.elements.otoBelowLegLabel.innerHTML="Sell Stop";
	}else if(this.activeTrade=="short"){
		this.dom.otoAbove.style.display="";
		this.dom.dragLineAbove.style.display="";
		if(!initialPrice) initialPrice=this.priceFromLocation(STX.stripPX(this.dom.limitOrder.style.top));
		this.positionAboveLine(initialPrice);
		this.elements.otoAboveLegLabel.innerHTML="Buy Stop";
	}
	this.updateValues();
};

/**
 * Removes the OTO order (stop or limit) that is above the buy/short order.
 */
STX.TFC.prototype.removeOTOAbove=function(){
	this.dom.otoAbove.style.display="none";
	this.dom.dragLineAbove.style.display="none";
	if(this.activeTrade=="buy"){
		STX.unappendClassName(this.dom.limitOrder, "with-limit");
	}else if(this.activeTrade=="short"){
		STX.unappendClassName(this.dom.limitOrder, "with-stop");
	}
};

/**
 * Adds a limit widget to an active buy or short trade. The limit widget will be either on the bottom or top depending on whether it is a buy or short trade
 * and the user can position it. When a limit (or stop) is added to such a trade, it will be placed as an OTO (one trigger other) trade.
 * @param {number} [initialPrice] - The initial price to place the trade. If not set then the price will be computed visually, so that the limit widget does
 * not overlap the buy/short widget.
 */
STX.TFC.prototype.addOTOLimit=function(initialPrice){
	STX.appendClassName(this.dom.limitOrder, "with-limit");
	if(this.activeTrade=="buy"){
		this.dom.otoAbove.style.display="";
		this.elements.otoAboveLegLabel.innerHTML="Sell Limit";
		this.dom.dragLineAbove.style.display="";
		if(!initialPrice) initialPrice=this.priceFromLocation(STX.stripPX(this.dom.limitOrder.style.top));
		this.positionAboveLine(initialPrice);
	}else if(this.activeTrade=="short"){
		this.dom.otoBelow.style.display="";
		this.elements.otoBelowLegLabel.innerHTML="Buy Limit";
		this.dom.dragLineBelow.style.display="";
		if(!initialPrice) initialPrice=this.priceFromLocation(STX.stripPX(this.dom.limitOrder.style.top)+this.dom.limitOrder.offsetHeight);
		this.positionBelowLine(initialPrice);
	}
	this.updateValues();
};

/**
 * Removes the OTO order that is below the buy/short order.
 */
STX.TFC.prototype.removeOTOBelow=function(){
	this.dom.otoBelow.style.display="none";
	this.dom.dragLineBelow.style.display="none";
	if(this.activeTrade=="buy"){
		STX.unappendClassName(this.dom.limitOrder, "with-stop");
	}else if(this.activeTrade=="short"){
		STX.unappendClassName(this.dom.limitOrder, "with-limit");
	}
};

/**
 * Sets the active input to either "shares" or "currency". This will determine which calculations are made as the user moves the tfc widgets
 * up and down the y-axis. For instance, if the user last set the currency value, then the shares will change as the tfc widgets are moved.
 * @param {string} activeInput Either "shares" or "currency".
 */
STX.TFC.prototype.setActiveInput=function(activeInput){
	this.activeInput=activeInput;
};

/**
 * Updates all of the numerical values on the screen including: shares, currency, risk/reward, profit & loss. This method is called
 * whenever the user enables or manipulates a tfc element.
 */
STX.TFC.prototype.updateValues=function(){
	var currentQuote=this.stx.currentQuote();
	var bid=currentQuote.Bid?currentQuote.Bid:currentQuote.Close;
	var ask=currentQuote.Ask?currentQuote.Ask:currentQuote.Close;
	var position=this.account.positions[this.stx.chart.symbol];
	var price=this.centerPrice;
	if(this.activeTrade=="bracket_sell" || this.activeTrade=="bracket_cover")
		price=Math.abs(position.basis);
	if(this.activeTrade=="market"){
		if(this.activeInput=="shares"){
			var quantity=this.quantityFromValue(this.elements.marketShares.value);
			var amount=quantity*currentQuote.Close;
			this.elements.marketCurrency.value=amount.toFixed(0);
		}else if(this.activeInput=="currency"){
			var amount=this.quantityFromValue(this.elements.marketCurrency.value);
			var quantity=Math.round(amount/currentQuote.Close);
			this.elements.marketShares.value=quantity;
		}
		if(STX.LegacyMarket.isForexFuturesSymbol(this.stx.chart.symbol)){
			var str=bid.toString();
			var wholePart=str.substring(0, str.indexOf("."));
			if(wholePart=="") wholePart="0";
			var decimalPart=str.substring(str.indexOf(".")+1);
			var equityPart=wholePart+"."+ decimalPart.substring(0,2);
			var strong=decimalPart.substring(2,4);
			var sub=decimalPart.substring(4);
			this.elements.bidEquityPart.innerHTML=equityPart;
			this.elements.bidForexPart.innerHTML=strong + "<SUP>" + sub + "</SUP>";

			var str=ask.toString();
			var wholePart=str.substring(0, str.indexOf("."));
			if(wholePart=="") wholePart="0";
			var decimalPart=str.substring(str.indexOf(".")+1);
			var equityPart=wholePart+"."+ decimalPart.substring(0,2);
			var strong=decimalPart.substring(2,4);
			var sub=decimalPart.substring(4);
			this.elements.askEquityPart.innerHTML=equityPart;
			this.elements.askForexPart.innerHTML=strong + "<SUP>" + sub + "</SUP>";
		}else{
			this.elements.askEquityPart.innerHTML=this.formatPrice(ask);
			this.elements.bidEquityPart.innerHTML=this.formatPrice(bid);
		}
		if(amount || amount==0) this.elements.marketCurrency.value=STX.commas(amount.toFixed(2));
		if(quantity || quantity==0) this.elements.marketShares.value=STX.commas(quantity);
	}else{
		if(this.activeInput=="shares"){
			var quantity=this.quantityFromValue(this.elements.limitShares.value);
			var amount=quantity*price;
			this.elements.limitCurrency.value=amount.toFixed(0);
		}else if(this.activeInput=="currency"){
			var amount=this.quantityFromValue(this.elements.limitCurrency.value);
			var quantity=Math.round(amount/price);
			this.elements.limitShares.value=quantity;
		}
		if(amount || amount==0) this.elements.limitCurrency.value=STX.commas(amount.toFixed(2));
		if(quantity || quantity==0) this.elements.limitShares.value=STX.commas(quantity);
	}

	if(this.activeTrade=="buy" || this.activeTrade=="bracket_sell"){
		var stopAmount=quantity*this.belowPrice;
		var gainLoss=stopAmount-amount;
		var percentGL=risk=(this.belowPrice-price)/price;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		if(quantity) this.elements.belowGainAmount.innerHTML=gainLoss;
		this.elements.belowGainPercent.innerHTML=percentGL;

		var limitAmount=quantity*this.abovePrice;
		var gainLoss=limitAmount-amount;
		var percentGL=reward=(this.abovePrice-price)/price;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		if(quantity) this.elements.aboveGainAmount.innerHTML=gainLoss;
		this.elements.aboveGainPercent.innerHTML=percentGL;
		if(risk && reward){
			var ratio=reward/Math.abs(risk);
			this.elements.limitRiskReward.innerHTML="1 : "+ ratio.toFixed(1);
		}
	}

	if(this.activeTrade=="short" || this.activeTrade=="bracket_cover"){
		var stopAmount=quantity*this.abovePrice;
		var gainLoss=amount-stopAmount;
		var percentGL=risk=(price-this.abovePrice)/price;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		if(quantity) this.elements.aboveGainAmount.innerHTML=gainLoss;
		this.elements.aboveGainPercent.innerHTML=percentGL;

		var limitAmount=quantity*this.belowPrice;
		var gainLoss=amount-limitAmount;
		var percentGL=reward=(price-this.belowPrice)/price;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		if(quantity) this.elements.belowGainAmount.innerHTML=gainLoss;
		this.elements.belowGainPercent.innerHTML=percentGL;
		if(risk && reward){
			var ratio=reward/Math.abs(risk);
			this.elements.limitRiskReward.innerHTML="1 : "+ ratio.toFixed(1);
		}
	}

	if(this.activeTrade=="sell" && position){
		if(!quantity || quantity>position.quantity){
			quantity=position.quantity;
		}
		amount=quantity*this.centerPrice;
		var basis=position.basis*quantity;
		var gainLoss=amount-basis;
		var percentGL=gainLoss/basis;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		this.elements.gainAmount.innerHTML=gainLoss;
		this.elements.gainPercent.innerHTML=percentGL;
	}
	if(this.activeTrade=="cover" && position){
		if(!quantity || Math.abs(quantity)>Math.abs(position.quantity)){
			quantity=position.quantity;
		}
		quantity=Math.abs(quantity);
		amount=quantity*this.centerPrice;
		var basis=Math.abs(position.basis)*quantity;
		var gainLoss=basis-amount;
		var percentGL=gainLoss/basis;

		if(gainLoss>0) gainLoss="+" + STX.money(gainLoss,0);
		else gainLoss="-" + STX.money(Math.abs(gainLoss));

		percentGL=STX.commas((percentGL*100).toFixed(2)) + "%";
		if(percentGL>0) percentGL="+" + percentGL;

		this.elements.gainAmount.innerHTML=gainLoss;
		this.elements.gainPercent.innerHTML=percentGL;
	}

	if(this.activeTrade=="straddle" || this.activeTrade=="strangle"){
		var amount=parseFloat(this.elements.ocoCurrency.value);
		if(isNaN(amount)) amount=0;
		var quantity=Math.round(amount/this.abovePrice);
		this.elements.ocoAboveShares.innerHTML=STX.commas(quantity);

		var quantity=Math.round(amount/this.belowPrice);
		this.elements.ocoBelowShares.innerHTML=STX.commas(quantity);
	}

};

/**
 * Positions the center line at the requested price. The center line is the line that runs through the middle of a buy,sell,short,cover widget and
 * represents the limit or stop price for the trade.
 * @param  {number} price The price to set the center line
 */
STX.TFC.prototype.positionCenterLine=function(price){
	this.centerPrice=price;
	this.positionAtPrice(this.centerPrice, ["limitOrder","dragLineCenter"]);
	this.elements.dragLineCenterPrice.innerHTML=this.formatPrice(this.centerPrice);
	this.positionBelowLine(Math.min(this.centerPrice, this.belowPrice));
	this.positionAboveLine(Math.max(this.centerPrice, this.abovePrice));
};

/**
 * Positions the "above line" which is the top line in an OCO or OTO order. For OTO orders, it is made sure that the above element does not
 * overlap the order element, but does allow the above line to slide underneath.
 * @param  {number} price The price to set the above line
 */
STX.TFC.prototype.positionAboveLine=function(price){
	this.abovePrice=price;
	this.positionAtPrice(this.abovePrice, ["dragLineAbove"]);
	this.elements.dragLineAbovePrice.innerHTML=this.formatPrice(this.abovePrice);
	if(this.activeTrade=="short" || this.activeTrade=="buy"){
		this.positionAtPrice(this.abovePrice, ["otoAbove"], "bottom", ["limitOrder"]);
	}else if(this.activeTrade=="strangle" || this.activeTrade=="straddle"){
		this.positionAtPrice(this.abovePrice, ["ocoAbove"], "bottom");
	}else if(this.activeTrade=="bracket_sell"){
		this.positionAtPrice(this.abovePrice, ["otoAbove"], "bottom");
	}else if(this.activeTrade=="bracket_cover"){
		this.positionAtPrice(this.abovePrice, ["otoAbove"], "bottom");
	}
};

/**
 * Positions the "below line" which is the bottom line in an OCO or OTO order. For OTO orders, it is made sure that the below element does not
 * overlap the order element, but does allow the below line to slide underneath.
 * @param  {number} price The price to set the below line
 */
STX.TFC.prototype.positionBelowLine=function(price){
	this.belowPrice=price;
	this.positionAtPrice(this.belowPrice, ["dragLineBelow"]);
	this.elements.dragLineBelowPrice.innerHTML=this.formatPrice(this.belowPrice);
	if(this.activeTrade=="buy" || this.activeTrade=="short"){
		this.positionAtPrice(this.belowPrice, ["otoBelow"], "top", ["limitOrder"]);
	}else if(this.activeTrade=="strangle" || this.activeTrade=="straddle"){
		this.positionAtPrice(this.belowPrice, ["ocoBelow"], "top");
		this.dom.ocoOrder.style.top=this.dom.ocoBelow.style.top;
	}else if(this.activeTrade=="bracket_sell" || this.activeTrade=="bracket_cover"){
		this.positionAtPrice(this.belowPrice, ["otoBelow"], "top");
		this.dom.limitOrder.style.top=(STX.stripPX(this.dom.otoBelow.style.top)+this.dom.otoBelow.clientHeight)+"px";
	}

};

/**
 * Places the currently enabled elements along their y axis depending on the prices that have been set. This gets called whenever
 * the screen is panned, zoomed or resized because the placement is relative to the size of the chart itself. It also ensures
 * that the shaded areas do not extend past the top and bottom of the chart panel.
 */
STX.TFC.prototype.render=function(){
	if(this.activeTrade=="sell" || this.activeTrade=="cover"){
		this.positionCenterLine(this.centerPrice);
	}else if(this.activeTrade=="buy" || this.activeTrade=="short"){
		this.positionCenterLine(this.centerPrice);
		this.positionAboveLine(this.abovePrice);
		this.positionBelowLine(this.belowPrice);
	}else if(this.activeTrade=="straddle" || this.activeTrade=="strangle"){
		this.positionAboveLine(this.abovePrice);
		this.positionBelowLine(this.belowPrice);		
	}
	if(this.activeTrade=="bracket_sell" || this.activeTrade=="bracket_cover"){
		this.positionAboveLine(this.abovePrice);
		this.positionBelowLine(this.belowPrice);
		this.dom.shadeAbove.style.top="0px";
		this.dom.shadeAbove.style.bottom=(this.chart.panel.height-this.locationFromPrice(this.abovePrice)) + "px";
		this.dom.shadeBelow.style.top=this.locationFromPrice(this.belowPrice) + "px";
		this.dom.shadeBelow.style.bottom="0px";
	}
	if(this.activeTrade=="straddle" || this.activeTrade=="strangle"){
		this.dom.shadeAbove.style.top="0px";
		this.dom.shadeAbove.style.bottom=(this.chart.panel.height-this.locationFromPrice(this.abovePrice)) + "px";
		this.dom.shadeBelow.style.top=this.locationFromPrice(this.belowPrice) + "px";
		this.dom.shadeBelow.style.bottom="0px";
	}
	this.renderOpenOrders();
};

/**
 * This method should be called whenever the symbol is changed. Any existing, unfinished orders will be closed out. New open orders
 * will be fetched and displayed.
 */
STX.TFC.prototype.changeSymbol=function(){
	if(!this.account) return;
	if(this.activeTrade=="market"){
		this.enableMarket();
	}else if(this.activeTrade){
		this.closeTFC();
	}
	this.configureMenu();
	this.updateData();
};

/**
 * Returns the price given the location (top) of a node. Adjusts for panel position in the chart.
 * @param  {number} y The location of the node (assumed to be included in a holder that is aligned with the chart panel)
 * @return {number}   The price represented by that y position
 */
STX.TFC.prototype.priceFromLocation=function(y){
	return this.stx.valueFromPixelUntransform(y+this.chart.panel.top, this.chart.panel);
};

/**
 * Returns the y-position for a node given the price
 * @param  {number} p The requested price
 * @return {number}   The y-position (within the chart panel)
 */
STX.TFC.prototype.locationFromPrice=function(p){
	return this.stx.pixelFromPriceTransform(p, this.chart.panel)-this.chart.panel.top;
};

/**
 * Called from an STX.safeDrag operation when the center line has been grabbed. Recalculates the center price and repositions the center elements.
 * @param  {Event} e A JS event from a STX.safeDrag operation (displacementY is expected)
 */
STX.TFC.prototype.dragCenterLine=function(e){
	if(this.activeTrade=="bracket_cover" || this.activeTrade=="bracket_sell") return;	// prevent an error if the order portion of bracket is grabbed
	var newTop=this.initialPosition+e.displacementY;
	var newCenter=newTop+(this.dom.dragLineCenter.offsetHeight/2);
	var newPrice=this.priceFromLocation(newCenter);
	this.positionCenterLine(newPrice);
	this.updateValues();
};

/**
 * Called from an STX.safeDrag operation when the above line has been grabbed. Recalculates the above price and repositions the above elements.
 * @param  {Event} e A JS event from a STX.safeDrag operation (displacementY is expected)
 */
STX.TFC.prototype.dragAboveLine=function(e){
	var newTop=this.initialPosition+e.displacementY;
	var newCenter=newTop+(this.dom.dragLineAbove.offsetHeight/2);
	var newPrice=this.priceFromLocation(newCenter);
	if(this.activeTrade=="buy" || this.activeTrade=="short" || this.activeTrade=="bracket_sell" || this.activeTrade=="bracket_cover"){
		if(newPrice<this.centerPrice) newPrice=this.centerPrice;
	}else if(this.activeTrade=="strangle" || this.activeTrade=="straddle"){
		var currentPrice=this.stx.currentQuote().Close;
		if(newPrice<currentPrice) newPrice=currentPrice;	// straddle/strangle cannot be inside current market price
	}
	this.positionAboveLine(newPrice);
	this.updateValues();
	this.render();
};

/**
 * Called from an STX.safeDrag operation when the below line has been grabbed. Recalculates the below price and repositions the below elements.
 * @param  {Event} e A JS event from a STX.safeDrag operation (displacementY is expected)
 */
STX.TFC.prototype.dragBelowLine=function(e){
	var newTop=this.initialPosition+e.displacementY;
	var newCenter=newTop+(this.dom.dragLineBelow.offsetHeight/2);
	var newPrice=this.priceFromLocation(newCenter);
	if(this.activeTrade=="buy" || this.activetrade=="short" || this.activeTrade=="bracket_sell" || this.activeTrade=="bracket_cover"){
		if(newPrice>this.centerPrice) newPrice=this.centerPrice;
	}else if(this.activeTrade=="strangle" || this.activeTrade=="straddle"){
		var currentPrice=this.stx.currentQuote().Close;
		if(newPrice>currentPrice) newPrice=currentPrice;	// straddle/strangle cannot be inside current market price
	}
	this.positionBelowLine(newPrice);
	this.updateValues();
	this.render();
};

/**
 * Hides all of the top level widgets contained in STX.TFC.prototype.dom. This is called when closing the TFC.
 */
STX.TFC.prototype.hideAllDOM=function(){
	for(var componentName in this.dom){
		var component=this.dom[componentName];
		component.style.display="none";
	}
};

/**
 * Removes all of the ephemeral nodes (open order tags). This occurs typically when the symbol is changed. Or TFC is disabled.
 * @param  {string} which Which ephemeral nodes to clear out (i.e. "openOrders")
 */
STX.TFC.prototype.clearEphemeral=function(which){
	var nodes=this.ephemeralNodes[which];
	for(var i=0;i<nodes.length;i++){
		var node=nodes[i];
		this.holder.removeChild(node);
	}
	this.ephemeralNodes[which]=[];
};

/**
 * Instantiates a new element from a template. The new element is ephemeral, and stored in STX.TFC.prototype.ephemeralNodes.
 * @param  {HTMLElement} template The template to utilize
 * @param  {string} which    Which type of ephemeral node this is (i.e. "openOrders")
 * @return {HTMLElement}          The newly instantiated node
 */
STX.TFC.prototype.instantiateTemplate=function(template, which){
	var node=this.templates[template].cloneNode(true);
	this.holder.appendChild(node);
	this.ephemeralNodes[which].push(node);
	node.style.display="";
	return node;
};

/**
 * Creates a text printable description of an order. This is used when generating various types of order tickets.
 * @param  {object} order An order object
 * @return {string}       A text description of the order
 */
STX.TFC.prototype.createDescription=function(order){
	var description=order.action;
	description+=" " + STX.commas(order.quantity);
	description+=" @ ";
	if(order.limit) description+=order.limit;
	else if(order.stop) description+=order.stop;
	else description+="MKT";
	return description.capitalize();
};

/**
 * Enables/creates the widgets necessary to modify an open order. The same widgets that are used to create a new order are used, so the
 * main job of this function is to figure out the type of order and instantiate those widgets at the price levels of the current open order.
 * @param  {HTMLElement} openOrderMarker The open order marker to modify. It is assumed that the marker contains a reference to the actual open order.
 */
STX.TFC.prototype.modifyOpenOrder=function(openOrderMarker){
	var openOrderMarkers=this.ephemeralNodes["openOrders"];
	var position=this.account.positions[this.stx.chart.symbol];
	var quantity=0;
	if(position) quantity=position.quantity;
	var openOrder=openOrderMarker.openOrder;
	this.modifyingOrder=openOrder;			// Use this when submitting the modification

	this.renderOpenOrders();	// this will hide the now modifyingOrder

	// Now enable the trade components to modify this order

	this.setActiveInput("shares");	// Trigger updates to dollar values
	STX.appendClassName(this.dom.limitOrder, "tfc-cancel");
	if(openOrder.action=="buy" || openOrder.action=="cover"){
		STX.appendClassName(this.elements.limitReplace, "green");
	}else{
		STX.unappendClassName(this.elements.limitReplace, "green");
	}
	this.elements.cancelDescription.innerHTML=this.createDescription(openOrder);
	if(openOrder.action=="buy"){
		this.newTrade("enableBuy", {"openOrder":openOrder});
	}else if(openOrder.action=="cover"){
		this.newTrade("enableCover", {"openOrder":openOrder});
	}else if(openOrder.action=="sell"){
		this.newTrade("enableSell", {"openOrder":openOrder});
	}else if(openOrder.action=="short"){
		this.newTrade("enableShort", {"openOrder":openOrder});
	}
	if(openOrder.oto){	// Enable and position the OTO elements, if any
		if(openOrder.action=="buy"){
			this.activeTrade=="buy";
		}else{
			this.activeTrade=="short";
		}
		for(var i=0;i<openOrder.oto.length;i++){
			var order=openOrder.oto[i];
			if(order.stop){
				this.addOTOStop(order.stop);
			}else if(order.limit){
				this.addOTOLimit(order.limit);
			}
		}
	}
	if(this.account.config.disableModifyOrderQuantity){
		this.elements.limitCurrency.readOnly=true;
		this.elements.limitShares.readOnly=true;
	}
};

/**
 * Determines whether a and b overlap vertically on the screen. This method is specific to TFC, assuming that elements are positioned using style.top.
 * @param  {HTMLElement} a The first element
 * @param  {HTMLElement} b The second element
 * @return {boolean}   True if they overlap, otherwise false.
 */
STX.TFC.prototype.overlap=function(a, b){
	var t1=STX.stripPX(a.style.top);
	var b1=t1+a.offsetHeight;
	var t2=STX.stripPX(b.style.top);
	var b2=t2+b.offsetHeight;
	if(t1==t2) return true;
	if(t1<t2 && b1>t2) return true;
	if(t1>t2 && t1<b2) return true;
	return false;
};
/**
	Positions the open orders on the screen at the appropriate location. If they are off the y-axis then they will pile up at the top
	or bottom of the screen. If a marker overlaps another then it's width is extended so that it can be visible.
*/

STX.TFC.prototype.renderOpenOrders=function(){
	var openOrderMarkers=this.ephemeralNodes.openOrders;
	for(var i=0;i<openOrderMarkers.length;i++){
		var openOrderMarker=openOrderMarkers[i];
		openOrderMarker.style.display="";
		openOrderMarker.style.width="";
		var openOrder=openOrderMarker.openOrder;
		var price=null;
		if(openOrder.limit) price=openOrder.limit;
		else if(openOrder.stop) price=openOrder.stop;
		else price=this.stx.currentQuote().Close; // market order
		this.positionAtPrice(price, [openOrderMarker],"center", null, true);
		var overlapOffset=0;
		for(var j=i+1;j<openOrderMarkers.length;j++){
			var potentialOverlap=openOrderMarkers[j];
			if(this.overlap(openOrderMarker, potentialOverlap)){
				overlapOffset+=30;
			}
		}
		if(this.activeTrade && this.activeTrade!="market"){
			openOrderMarker.style.width="425px";			
		}
		if(overlapOffset){
			openOrderMarker.style.width=(openOrderMarker.offsetWidth+overlapOffset)+"px";
		}
	}
	// hide any associated with the current modifyingOrder
	for(var i=0;i<openOrderMarkers.length;i++){
		var openOrderMarker=openOrderMarkers[i];
		if(this.modifyingOrder && this.modifyingOrder.id==openOrderMarker.openOrder.id){
			openOrderMarker.style.display="none";

			if(openOrderMarker.linked){
				for(var i=0;i<openOrderMarker.linked.length;i++)
					openOrderMarker.linked[i].style.display="none";
			}
		}
	}
};

/**
	Create the open order markers
*/

/**
 * Creates the open order markers and attaches safe mouse/touch events to them. An open order can be modified by clicking on it. Also,
 * crosshairs are turned off as a user hovers over an open order marker. This method is called recursively for OTO orders. OTO orders
 * are given the "pending" class attachment to render them differently. Clicking on an OTO pulls up the modification of the base order (including OTO legs).
 * @param  {object} openOrder       An open order in the expected format
 * @param  {object} [baseOrderMarker] The linked order if it is an OTO order.
 */
STX.TFC.prototype.createOpenOrderMarker=function(openOrder, baseOrderMarker){
	var openOrderMarker=this.instantiateTemplate("openOrderMarker", "openOrders");
	openOrderMarker.openOrder=openOrder;
	var priceNode=$$$(".tfc-price", openOrderMarker);
	/*if(openOrder.limit) priceNode.innerHTML=openOrder.limit;
	else if(openOrder.stop) priceNode.innerHTML=openOrder.stop;
	else priceNode.innerHTML="MKT";*/
	priceNode.innerHTML=openOrder.quantity;
	if(!openOrder.limit && !openOrder.stop) priceNode.innerHTML+=" MKT";

	if(openOrder.action=="sell" || openOrder.action=="short"){
		STX.swapClassName(openOrderMarker, "red", "green");
	}else{
		STX.swapClassName(openOrderMarker, "green", "red");				
	}
	if(baseOrderMarker){
		STX.appendClassName(openOrderMarker, "pending");	// OTO orders
	}
	var whichMarker=openOrderMarker;
	if(baseOrderMarker){
		whichMarker=baseOrderMarker;
		if(!baseOrderMarker.linked) baseOrderMarker.linked=[];	// Link any OTO markers so that we can hide them when modifying
		baseOrderMarker.linked.push(openOrderMarker);
	}
	// parent node is the arrow as a whole
	STX.safeClickTouch(priceNode.parentNode, function(self, whichMarker){return function(){self.crosshairsOn();self.modifyOpenOrder(whichMarker);};}(this, whichMarker));
	STX.safeMouseOver(openOrderMarker, function(self){ return function(e){self.crosshairsOff();};}(this));
	STX.safeMouseOut(openOrderMarker, function(self){ return function(e){self.crosshairsOn();};}(this));

	if(openOrder.oto){
		for(var i=0;i<openOrder.oto.length;i++){
			var order=openOrder.oto[i];
			this.createOpenOrderMarker(order, openOrderMarker);
		}
	}
};

/**
 * Creates open order markers from the openOrders in the Account object
 */
STX.TFC.prototype.deriveOpenOrderMarkers=function(){
	this.clearEphemeral("openOrders");
	var openOrders=this.account.openOrders[this.stx.chart.symbol];
	if(openOrders && openOrders.length>0){
		for(var i=0;i<openOrders.length;i++){
			var openOrder=openOrders[i];
			if(openOrder.cancelled) continue;
			this.createOpenOrderMarker(openOrder);
		}
		this.renderOpenOrders();
	}
};

/**
 * Creates the open orders for the current security, first by fetching the open orders, then by creating markers for them, and finally by rendering the markers
 * @param {boolean} immediate If true then new data is not fetched but the existing data is simply re-rendered, for instance when switching symbols
 */
STX.TFC.prototype.updateData=function(){
	var self=this;
	var fetched={
		fetched: 0
	};

	function closure(symbol, self){
		return function(){
			if(self.selectSymbol) self.selectSymbol(symbol);
		};
	};
	function update(){
		self.deriveOpenOrderMarkers();

		self.elements.currentCash.innerHTML=STX.money(self.account.balances.cash, 0);
		self.elements.currentFunds.innerHTML=STX.money(self.account.balances.buyingPower, 0);
		var position=self.account.positions[self.stx.chart.symbol];
		if(!position) position={quantity:0, basis:0};
		self.elements.currentPosition.innerHTML=STX.commas(position.quantity);

		// Build balances table
		$$$(".tfc-liquidity").innerHTML=STX.money(self.account.balances.liquidity);
		$$$(".tfc-unsettled-cash").innerHTML=STX.money(self.account.balances.unsettledCash);
		$$$(".tfc-cash").innerHTML=STX.money(self.account.balances.cash);
		$$$(".tfc-buying-power").innerHTML=STX.money(self.account.balances.buyingPower);

		// Build open orders table
		var table=$$$(".stx-current-orders tbody");
		STX.clearNode(table);
		var foundOne=false;
		var symbolList=[];
		symbolList.push(self.stx.chart.symbol);
		for(var symbol in self.account.openOrders){
			if(symbol!=self.stx.chart.symbol) symbolList.push(symbol);
		}
		var dividerDrawn=false;
		var foundCurrentSymbol=false;
		for(var j=0;j<symbolList.length;j++){
			var symbol=symbolList[j];
			var openOrders=self.account.openOrders[symbol];
			if(!openOrders) continue;
			for(var i=0;i<openOrders.length;i++){
				var openOrder=openOrders[i];
				foundOne=true;
				var tr=STX.newChild(table, "TR");
				if(symbol==self.stx.chart.symbol){
					tr.className="tfc-current-symbol";
					foundCurrentSymbol=true;
				}else if(foundCurrentSymbol && !dividerDrawn){
					dividerDrawn=true;
					tr.className="stx-divider";
					var td=STX.newChild(tr, "TD");
					td.setAttribute("colspan","7");
					tr=STX.newChild(table, "TR");
				}
				tr.id="tfc-open-order-" + openOrder.id;
				if(!openOrders.securityType || openOrders.securityType.toUpperCase()!="OPTION")
					tr.addEventListener("tap", closure(symbol, self));
					//STX.safeClickTouch(tr, closure(symbol, self));

				STX.newChild(tr, "TD", null, openOrder.action.capitalize());
				STX.newChild(tr, "TD", null, openOrder.quantity);
				STX.newChild(tr, "TD", null, symbol);
				var price=0;
				if(openOrder.limit){
					STX.newChild(tr, "TD", null, "@LMT");
					STX.newChild(tr, "TD", null, openOrder.limit);
					price=openOrder.limit;
				}else if(openOrder.stop){
					STX.newChild(tr, "TD", null, "@STP");
					STX.newChild(tr, "TD", null, openOrder.stop);
					price=openOrder.stop;
				}else{
					STX.newChild(tr, "TD", null, "@MKT");
					STX.newChild(tr, "TD", null, "");
				}
				STX.newChild(tr, "TD", null, openOrder.tif);
				if(price){
					STX.newChild(tr, "TD", null, STX.money(price*openOrder.quantity));
				}else{
					STX.newChild(tr, "TD", null, "");					
				}
			}
		}
		if(!foundOne){
			var tr=STX.newChild(table, "TR");
			var td=STX.newChild(tr, "TD", "tfc-not-found", "No Open Orders");
		}

		// Build positions table
		var table=$$$(".stx-current-position tbody");
		STX.clearNode(table);
		var foundOne=false;
		var symbolList=[];
		symbolList.push(self.stx.chart.symbol);
		for(var symbol in self.account.positions){
			if(symbol!=self.stx.chart.symbol) symbolList.push(symbol);
		}
		var dividerDrawn=false;
		var foundCurrentSymbol=false;
		for(var j=0;j<symbolList.length;j++){
			var symbol=symbolList[j];
			var position=self.account.positions[symbol];
			if(!position) continue;
			foundOne=true;
			var tr=STX.newChild(table, "TR");
			if(symbol==self.stx.chart.symbol){
				tr.className="tfc-current-symbol";
				foundCurrentSymbol=true;
			}else if(foundCurrentSymbol && !dividerDrawn){
				dividerDrawn=true;
				tr.className="stx-divider";
				var td=STX.newChild(tr, "TD");
				td.setAttribute("colspan","5");
				tr=STX.newChild(table, "TR");
			}
			tr.id="tfc-position-" + symbol;
			if(!position.securityType || position.securityType.toUpperCase()!="OPTION")
				tr.addEventListener("tap", closure(symbol, self));
			STX.newChild(tr, "TD", null, symbol);
			STX.newChild(tr, "TD", null, position.quantity);
			//TODO, update position prices with quotes
			var contractSize=position.contractSize?position.contractSize:1;
			STX.newChild(tr, "TD", null, STX.money(position.price * position.quantity * contractSize));

			var cumGL=(position.price-position.basis)/position.basis*100;
			cumGL=cumGL.toFixed(2) + "%";
			if(cumGL>0) cumGL="+" + cumGL;
			STX.newChild(tr, "TD", null, cumGL);

			var todaysGL=(position.price-position.prevClose)/position.prevClose*100;
			todaysGL=todaysGL.toFixed(2) + "%";
			if(todaysGL>0) todaysGL="+" + todaysGL;
			STX.newChild(tr, "TD", null, todaysGL);
		}
		if(!foundOne){
			var tr=STX.newChild(table, "TR");
			var td=STX.newChild(tr, "TD", "tfc-not-found", "No Positions");
			td.setAttribute("colspan", 5);
			$$$(".stx-trade-positions thead").style.display="none";
		}else{
			$$$(".stx-trade-positions thead").style.display="";				
		}
		self.refreshScrollWindows();
		self.configureMenu(); // menu options may have changed if a position has recently opened or closed

	};
	update();	// first update with the data that we already have

	function cb(fetched){
		return function(){
			fetched.fetched++;
			if(fetched.fetched<3) return;
			update();
		};
	}
	// then fetch fresh data, and we'll update again when it comes in
	this.account.fetchOpenOrders(cb(fetched));
	this.account.fetchBalances(cb(fetched));
	this.account.fetchPositions(cb(fetched));
};

/**
 * Refreshes the iscroll mechanism for the positions and open orders widgets in the expanded panel.
 */
STX.TFC.prototype.refreshScrollWindows=function(){
	var positionWrapper=$$$(".stx-current-position tbody").parentNode.parentNode;
	var openOrderWrapper=$$$(".stx-current-orders tbody").parentNode.parentNode;
	var totalHeight=positionWrapper.parentNode.parentNode.clientHeight-positionWrapper.parentNode.offsetTop-30; // a little extra just to try and avoid overlapping the condense/expand toggle
	var positionCount=0, openOrderCount=0;
	if(!this.account) return;
	for(var symbol in this.account.positions){
		positionCount++;
	}
	for(var symbol in this.account.openOrders){
		var openOrder=this.account.openOrders[symbol];
		for(var i=0;i<openOrder.length;i++){
			openOrderCount++;
		}
	}
	var ratio=positionCount/(positionCount+openOrderCount);
	var positionHeight=Math.ceil(totalHeight*ratio);
	// minimum sizes if positions or open orders in either
	if(positionHeight<totalHeight*.3 && positionCount>0){
		positionHeight=Math.round(totalHeight*.3);
	}else if(positionHeight>totalHeight*.7 && openOrderCount>0){
		positionHeight=Math.round(totalHeight*.7);
	}
	var openOrderHeight=totalHeight-positionHeight;
	// minimum size when no orders
	if(openOrderHeight<60){
		openOrderHeight=60;
		positionHeight=totalHeight-openOrderHeight;
	}
	positionWrapper.style.height=(positionHeight - positionWrapper.offsetTop) + "px";
	openOrderWrapper.style.height=(openOrderHeight - openOrderWrapper.offsetTop) + "px";

	if(this.positionIScroll==null){
		this.positionIScroll=STX.iscroll.newScroller(positionWrapper, {tap:true, scrollbars: true, interactiveScrollbars: true,version: "IScroll5"});
	}else{
		this.positionIScroll.refresh();
	}
	if(this.openOrdersIScroll==null){
		this.openOrdersIScroll=STX.iscroll.newScroller(openOrderWrapper, {tap:true, scrollbars: true, interactiveScrollbars: true, version: "IScroll5"});
	}else{
		this.openOrdersIScroll.refresh();
	}
};

/**
 * The TFC menu is dynamic based on whether the account contains a current position for the enables security, and whether that position is
 * long or short. This method configures the menu as such by looking at the account's current position for the enabled security.
 */
STX.TFC.prototype.configureMenu=function(){
	if(!this.account){
		alert("hiding no account");
		setDisplay(self.menu.enableBuy.nodes, "none");
		setDisplay(self.menu.enableSell.nodes, "none");
		setDisplay(self.menu.enableShort.nodes, "none");
		setDisplay(self.menu.enableCover.nodes, "none");
		setDisplay(self.menu.enableStraddle.nodes, "none");
		setDisplay(self.menu.enableStrangle.nodes, "none");
		setDisplay(self.menu.enableBracket.nodes, "none");
		return;	// no account enabled then trading not enabled
	}
	function setDisplay(nodes, value){
		for(var i=0;i<nodes.length;i++){
			nodes[i].style.display=value;
		}
	}
	var self=this;
	var symbol=self.stx.chart.symbol;
	this.account.tradability(symbol, function(tradability){
		self.tradability=tradability;
		if(!symbol) tradability.tradable=false; // make sure cannot trade when no security enabled
		var position=self.account.positions[symbol];
		setDisplay(self.menu.enableBuy.nodes, "none");
		setDisplay(self.menu.enableSell.nodes, "none");
		setDisplay(self.menu.enableShort.nodes, "none");
		setDisplay(self.menu.enableCover.nodes, "none");
		setDisplay(self.menu.enableStraddle.nodes, "none");
		setDisplay(self.menu.enableStrangle.nodes, "none");
		setDisplay(self.menu.enableBracket.nodes, "none");
		if(!tradability.tradable){
			setDisplay(self.menu.enableMarket.nodes, "none");
			return;
		}
		setDisplay(self.menu.enableMarket.nodes, "");
		if(!position){
			setDisplay(self.menu.enableBuy.nodes, "");
			setDisplay(self.menu.enableShort.nodes, "");
			if(self.account.config.oco){
				setDisplay(self.menu.enableStraddle.nodes, "");
				setDisplay(self.menu.enableStrangle.nodes, "");
			}
		}else{
			if(self.account.config.oco){
				setDisplay(self.menu.enableBracket.nodes, "");
			}
			if(position.quantity<0){
				setDisplay(self.menu.enableShort.nodes, "");
				setDisplay(self.menu.enableCover.nodes, "");
			}else{
				setDisplay(self.menu.enableBuy.nodes, "");
				setDisplay(self.menu.enableSell.nodes, "");
			}
		}
		if(!tradability.shortable){
			setDisplay(self.menu.enableShort.nodes, "none");
			setDisplay(self.menu.enableStraddle.nodes, "none");
			setDisplay(self.menu.enableStrangle.nodes, "none");
		}
	});
};

/**
 * Opens Trade From Chart. The menu is configured for the current security and open orders are retrieved and displayed.
 */
STX.TFC.prototype.openTFC=function(){
	if(!this.account) return;
	this.configureMenu();
	this.updateData();
};

/**
 * Closes Trade From Chart. Any active trading elements are hidden. The chart itself is scrolled back to its initial margins.
 * Open orders remain displayed.
 */
STX.TFC.prototype.closeTFC=function(){
	STX.hideKeyboard();
	this.modifyingOrder=null;	// allow open order markets to display
	this.stx.layout.crosshair=this.crosshairsOriginallyOn;
	this.crosshairsOriginallyOn=null;
	this.activeTrade=null;
	this.clearActive();
	this.hideAllDOM();
	this.stx.resizeChart();
	var wsInTicks=Math.round(this.stx.preferences.whitespace/this.stx.layout.candleWidth);
	this.stx.chart.scroll=this.stx.chart.maxTicks-wsInTicks;
	if(this.stx.displayInitialized) this.stx.draw();
	//this.updateData();
};

/**
 * Creates a new trade of the requested type. Crosshairs are automatically turned off, but the prior crosshair state is remembered for when TFC
 * is closed. The chart is scrolled left in order to make room for the TFC widgets.
 * @param  {string} componentName The component to enable (i.e. "enableMarket")
 * @param  {object} [params]        If the result of the user clicking on an open order marker to modify, then the open order will be passed in the params.
 */
STX.TFC.prototype.newTrade=function(componentName, params){
	if(!params || !params.openOrder){
		this.modifyingOrder=null;	// allow open order markets to display
		STX.unappendClassName(this.dom.limitOrder, "tfc-cancel");
		this.elements.limitCurrency.readOnly=false;
		this.elements.limitShares.readOnly=false;
	}
	this.hideAllDOM();
	var which=this.menu[componentName];
	var dom=which.dom;
	for(var i=0;i<dom.length;i++){
		var tradeElementName=dom[i];
		this.dom[tradeElementName].style.display="";
	}
	this.crosshairsOriginallyOn=this.stx.layout.crosshair;
	this.stx.layout.crosshair=false;
	this[componentName](params);	// run initialize function
	this.stx.resizeChart();
	// Adjust the chart space to make room for trading components, except market orders
	if(componentName!="enableMarket"){
		var wsInTicks=Math.round(this.width/this.stx.layout.candleWidth);
		this.stx.chart.scroll=this.stx.chart.maxTicks-wsInTicks;
		this.stx.draw();
	}
	this.updateValues();
};

/**
 * Clears out the "active" class from menu items, so that they no longer have active styling. Also clears the share and currency input boxes.
 * Any existing trading UI elements will be closed except for the market order widget which will remain open.
 */
STX.TFC.prototype.clearActive=function(){
	for(var componentName in this.menu){
		var components=this.menu[componentName].nodes;
		for(var i=0;i<components.length;i++){
			STX.unappendClassName(components[i], "active");
		}
	}
	this.elements.marketShares.value="";
	this.elements.marketCurrency.value="";
	this.elements.limitShares.value="";
	this.elements.limitCurrency.value="";
	this.elements.ocoCurrency.value="";
	STX.unappendClassName(this.dom.otoAbove, "bracket");
	STX.unappendClassName(this.dom.otoBelow, "bracket");
};

/**
 * Places an order or modification. Defers to the current brokerage Account object. When the order is placed the widgets are cleared out
 * unless the user is trading with market orders in which case the widget remains in place.
 * @param  {object} order The order to place
 */
STX.TFC.prototype.placeOrder=function(order){
	var self=this;
	if(order.type=="replace"){
		this.account.replaceOrder(this, order, function(err, obj){
			STX.DialogManager.dismissDialog();
			if(err){
				STX.alert(err);
			}
			// temporarily modify the order in our open orders. updateData should refresh from what is at the brokerage.
			if(obj && obj.id){
				var symbol=self.stx.chart.symbol;
				var openOrders=self.account.openOrders[symbol];
				for(var i=0;i<openOrders.length;i++){
					var openOrder=openOrders[i];
					if(openOrder.id==order.id){
						openOrder.id=obj.id;
						if(order.limit["new"]) openOrder.limit=order.limit["new"];
						else delete openOrder.limit;
						if(order.stop["new"]) openOrder.stop=order.stop["new"];
						else delete openOrder.stop;
						if(order.quantity["new"]) openOrder.quantity=order.quantity["new"];
					}
				}
				self.deriveOpenOrderMarkers();
			}
			self.updateData();
			self.closeTFC();
			self.stx.draw();
		});
	}else{
		this.account.placeOrder(this, order, function(err, obj){
			STX.DialogManager.dismissDialog();
			if(err){
				STX.alert(err);
			}
			// temporarily add the order to our open orders. updateData should refresh from what is at the brokerage.
			if(obj && obj.id){
				order.id=obj.id;
				var symbol=self.stx.chart.symbol;
				var openOrders=self.account.openOrders[symbol];
				if(!openOrders) openOrders=self.account.openOrders[symbol]=[];
				openOrders.push(order);
				self.deriveOpenOrderMarkers();
			}
			self.updateData();
			if(self.activeTrade!="market") self.closeTFC();
			self.stx.draw();
		});
	}
};

/**
 * Places a cancel request for the current open order. Cancel requests are deferred through the brokerage Account object.
 */
STX.TFC.prototype.cancelOpenOrder=function(){
	var order=this.modifyingOrder;
	var self=this;
	this.modalEnd();
	STX.DialogManager.displayDialog('tfcConfirmOrder');
	STX.unappendClassName($$$("#tfcConfirmOrder"), "tfc-pending");
	$$$("#tfcConfirmOrder .processOrder").style.display="block";
	$$$("#tfcConfirmOrder .orderProcessed").style.display="none";
	this.account.cancelOrder(this, order, function(err){
		STX.DialogManager.dismissDialog();
		if(err){
			STX.alert(err);
		}
		order.cancelled=true; // hide the order, since it should be cancelled now. Ideally updateData clears it out but that has some latency
		self.updateData();
		self.closeTFC();
		self.stx.draw();
	});
};

/**
 * Creates an OCO order from the position and input values in the GUI. The OCO is an array consisting of two orders. This format
 * can be received by the order interface in STX.Account.
 * @return {array}        A tuple containing the two orders
 */
STX.TFC.prototype.createOCOFromGUI=function(){
	var order={}, order2={};
	order.symbol=this.stx.chart.symbol;
	order2.symbol=this.stx.chart.symbol;
	if(this.activeTrade=="strangle"){
		// use innerHTML not because we're lazy but to ensure quantity matches what user is seeing on screen
		order.quantity=this.quantityFromValue(this.elements.ocoAboveShares.innerHTML);
		order2.quantity=this.quantityFromValue(this.elements.ocoBelowShares.innerHTML);
		order.action="sell";
		order.limit=parseFloat(this.elements.dragLineAbovePrice.innerHTML);
		order2.action="buy";
		order2.limit=parseFloat(this.elements.dragLineBelowPrice.innerHTML);
		order.tif=this.elements.ocoTIF.value;
		order2.tif=this.elements.ocoTIF.value;
	}else if(this.activeTrade=="straddle"){
		order.quantity=this.quantityFromValue(this.elements.ocoAboveShares.innerHTML);
		order2.quantity=this.quantityFromValue(this.elements.ocoBelowShares.innerHTML);
		order.action="buy";
		order.stop=parseFloat(this.elements.dragLineAbovePrice.innerHTML);
		order2.action="sell";
		order2.stop=parseFloat(this.elements.dragLineBelowPrice.innerHTML);
		order.tif=this.elements.ocoTIF.value;
		order2.tif=this.elements.ocoTIF.value;
	}else if(this.activeTrade=="bracket_cover" || this.activeTrade=="short"){
		order.quantity=this.quantityFromValue(this.elements.limitShares.value);
		order2.quantity=order.quantity;
		order.action="buy";
		order.stop=parseFloat(this.elements.dragLineAbovePrice.innerHTML);
		order2.action="buy";
		order2.limit=parseFloat(this.elements.dragLineBelowPrice.innerHTML);
		order.tif=this.elements.limitTIF.value;
		order2.tif=this.elements.limitTIF.value;
	}else if(this.activeTrade=="bracket_sell" || this.activeTrade=="buy"){
		order.quantity=this.quantityFromValue(this.elements.limitShares.value);
		order2.quantity=order.quantity;
		order.action="sell";
		order.limit=parseFloat(this.elements.dragLineAbovePrice.innerHTML);
		order2.action="sell";
		order2.stop=parseFloat(this.elements.dragLineBelowPrice.innerHTML);
		order.tif=this.elements.limitTIF.value;
		order2.tif=this.elements.limitTIF.value;
	}
	order.oco=true;
	order2.oco=true;

	return [order, order2];
};

/**
 * Returns a quantity given a string value which may contain commas.
 * @param  {string} value Value from an input box
 * @return {number}       A valid quantity, float
 */
STX.TFC.prototype.quantityFromValue=function(value){
	var quantity=parseFloat(value.replace(",","","g"));
	if(isNaN(quantity)) quantity=0;
	return quantity;
};

/**
 * Creates an order from the positioning and input values of the GUI elements. The order will be in a format that can be placed
 * through the STX.Account interface. This will include OTO orders, but not OCO orders which are created in STX.TFC.prototype.createOCOFromGUI.
 * @param  {string} action The order type ("limit_buy","limit_sell","limit_short","limit_cover")
 * @return {object}        The order
 */
STX.TFC.prototype.createOrderFromGUI=function(action){
	var actionMap={
		"market_buy": "buy",
		"market_sell": "sell",
		"limit_buy": "buy",
		"limit_sell": "sell",
		"limit_short": "short",
		"limit_cover": "cover",
		"OCO": "OCO"
	}
	var order={};
	order["type"]="order";
	order.symbol=this.stx.chart.symbol;
	order.action=actionMap[action];
	if(action=="limit_buy" || action=="limit_sell" || action=="limit_short" || action=="limit_cover"){
		order.quantity=this.quantityFromValue(this.elements.limitShares.value);
		order.tif=this.elements.limitTIF.value;
		var currentPrice=this.stx.currentQuote().Close;
		var centerPrice=parseFloat(this.elements.dragLineCenterPrice.innerHTML);
		if(order.action=="buy" || order.action=="cover"){
			if(centerPrice<=currentPrice) order.limit=centerPrice;
			else order.stop=centerPrice;
		}else{
			if(centerPrice>=currentPrice) order.limit=centerPrice;
			else order.stop=centerPrice;
		}
	}else if(action=="market_buy" || action=="market_sell"){
		order.quantity=this.quantityFromValue(this.elements.marketShares.value);
		order.tif="DAY";
	}
	// If either below or above lines are displayed then we create an oto
	if(this.dom.otoAbove.style.display!="none" || this.dom.otoBelow.style.display!="none"){
		var oto=this.createOCOFromGUI();					// re-use existing code to create OCO
		oto[0].tif="GTC";
		oto[1].tif="GTC";
		if(this.dom.otoAbove.style.display=="none"){	// delete either part of the OCO if it's not enabled
			oto.splice(0,1);
		}
		if(this.dom.otoBelow.style.display=="none"){
			oto.splice(1,1);
		}
		order.oto=oto;
	}

	return order;
};

/**
 * Creates a replace order from the positioning and input values of the GUI elements. The order will be in a format that can be placed
 * through the STX.Account interface. This will include OTO orders. The format for replace orders is to create a an object for each
 * order parameter that includes a "old" and "new" value.
 * @return {object}        The order
 */
STX.TFC.prototype.createReplaceFromGUI=function(){
	var order={
		type:"replace",
		symbol:"",
		action:"",
		limit: {},
		stop: {},
		quantity:{},
		tif:{},
		oto:{}
	};
	order.id=this.modifyingOrder.id;
	order.symbol=this.stx.chart.symbol;
	order.action=this.modifyingOrder.action;
	if(this.modifyingOrder.limit){
		order.limit.old=this.modifyingOrder.limit;
	}else{
		order.stop.old=this.modifyingOrder.stop;		
	}
	var currentPrice=this.stx.currentQuote().Close;
	var centerPrice=parseFloat(this.elements.dragLineCenterPrice.innerHTML);

	if(order.action=="buy" || order.action=="cover"){
		if(centerPrice<=currentPrice) order.limit["new"]=centerPrice;
		else order.stop["new"]=centerPrice;
	}else{
		if(centerPrice>=currentPrice) order.limit["new"]=centerPrice;
		else order.stop["new"]=centerPrice;
	}

	order.quantity["old"]=this.modifyingOrder.quantity;
	order.quantity["new"]=this.quantityFromValue(this.elements.limitShares.value);

	order.tif["old"]=this.modifyingOrder.tif;
	order.tif["new"]=this.elements.limitTIF.value;

	order.oto["old"]=this.modifyingOrder.oto;

	// If either below or above lines are displayed then we create an oto
	if(this.dom.otoAbove.style.display!="none" || this.dom.otoBelow.style.display!="none"){
		var oto=this.createOCOFromGUI();					// re-use existing code to create OCO
		oto[0].tif="GTC";
		oto[1].tif="GTC";
		if(this.dom.otoAbove.style.display=="none"){	// delete either part of the OCO if it's not enabled
			oto.splice(0,1);
		}
		if(this.dom.otoBelow.style.display=="none"){
			oto.splice(1,1);
		}
		order.oto["new"]=oto;
	}else{
		order.oto["new"]=null;
	}

	return order;
};

/**
 * Creates the confirmation dialog for a replace order. This does nothing if no change is detected between the original and new orders.
 * The class "no-change" is appended to an html element in the dialog if no change in that parameter occurred, for instance quantity may
 * not change but price may. This class can be used to style the dialog to indicate which values are changing.
 */
STX.TFC.prototype.confirmReplace=function(order){
	var descriptionNode=$$$("#tfcConfirmReplace .tfcOrderDescription");
	var quantityNodeOld=$$$("#tfcConfirmReplace .tfcOrderQuantityOld");
	var priceNodeOld=$$$("#tfcConfirmReplace .tfcOrderPriceOld");
	var tifNodeOld=$$$("#tfcConfirmReplace .tfcOrderTifOld");
	var otoNodeOld=$$$("#tfcConfirmReplace .tfcOrderOTOOld");
	var quantityNodeNew=$$$("#tfcConfirmReplace .tfcOrderQuantityNew");
	var priceNodeNew=$$$("#tfcConfirmReplace .tfcOrderPriceNew");
	var tifNodeNew=$$$("#tfcConfirmReplace .tfcOrderTifNew");
	var otoNodeNew=$$$("#tfcConfirmReplace .tfcOrderOTONew");
	var otoLine=$$$("#tfcConfirmReplace .tfc-confirm-oto");

	var actionText=order.action;
	var description=actionText.capitalize();
	description+=" " + order.symbol;
	descriptionNode.innerHTML=description.capitalize();

	var foundAChange=false;
	
	quantityNodeNew.innerHTML=order.quantity["new"];
	quantityNodeOld.innerHTML=order.quantity["old"];
	if(order.quantity["old"]!=order.quantity["new"]){
		STX.unappendClassName(quantityNodeOld, "no-change");
		foundAChange=true;
	}else{
		STX.appendClassName(quantityNodeOld, "no-change");
	}

	var priceOld, priceNew;
	if(order.limit.old) priceOld=this.formatPrice(order.limit.old) + " LMT";
	else if(order.stop.old) priceOld=this.formatPrice(order.stop.old) + " STP";
	else priceOld="MKT";

	if(order.limit["new"]) priceNew=this.formatPrice(order.limit["new"]) + " LMT";
	else if(order.stop["new"]) priceNew=this.formatPrice(order.stop["new"]) + " STP";
	else priceNew="MKT";

	priceNodeOld.innerHTML=priceOld;
	if(priceOld!=priceNew){
		STX.unappendClassName(priceNodeOld, "no-change");
		foundAChange=true;
	}else{
		STX.appendClassName(priceNodeOld, "no-change");
	}
	priceNodeNew.innerHTML=priceNew;

	tifNodeOld.innerHTML=order.tif["old"];
	if(order.tif["old"]!=order.tif["new"]){
		STX.unappendClassName(tifNodeOld, "no-change");
		foundAChange=true;
	}else{
		STX.appendClassName(tifNodeOld, "no-change");
	}
	tifNodeNew.innerHTML=order.tif["new"];

	otoNodeOld.innerHTML=this.printableOTO(order.oto["old"]);
	otoNodeNew.innerHTML=this.printableOTO(order.oto["new"]);
	if(otoNodeOld.innerHTML!=otoNodeNew.innerHTML){
		STX.unappendClassName(otoNodeOld, "no-change");
		foundAChange=true;
	}else{
		STX.appendClassName(otoNodeOld, "no-change");
	}
	if(!order.oto["old"] && !order.oto["new"]){
		otoLine.style.display="none";
	}else{
		otoLine.style.display="";
	}


	if(!foundAChange) return;

	var submitButton=$$$("#tfcConfirmReplace .tfcSubmit");
	var abandonButton=$$$("#tfcConfirmReplace .tfcAbandon");
	function closure(self, order, submitButton){
		return function(){
			STX.clearSafeClickTouches(submitButton);
			STX.clearSafeClickTouches(abandonButton);
			STX.appendClassName($$$("#tfcConfirmReplace"), "tfc-pending")
			$$$("#tfcConfirmReplace .processOrder").style.display="block";
			self.placeOrder(order);
		};
	};
	STX.safeClickTouch(submitButton, closure(this, order, submitButton));
	STX.safeClickTouch(abandonButton, STX.DialogManager.dismissDialog);

	this.modalEnd();
	STX.DialogManager.displayDialog('tfcConfirmReplace');
	STX.unappendClassName($$$("#tfcConfirmReplace"), "tfc-pending")
	$$$("#tfcConfirmReplace .processOrder").style.display="none";
	$$$("#tfcConfirmReplace .orderProcessed").style.display="block";
};

/**
 * Creates a printable description of the oto legs for an order. This description is used to create the confirmation dialogs.
 * @param  {array} oto An array of orders in the oto
 * @return {string}     The printable description
 */
STX.TFC.prototype.printableOTO=function(oto){
	var str="";
	if(oto){
		for(var i=0;i<oto.length;i++){
			var leg=oto[i];
			if(i==1) str+=" / ";
			str+=leg.action.capitalize() + " " + this.printablePrice(leg);
		}
	}
	return str;
};

/**
 * Creates a confirmation dialog for an order. This method will return without enabling the dialog if no quantity has been specified.
 * @param  {Object} order The order to place
 */
STX.TFC.prototype.confirmOrder=function(order){
	var self=this;
	this.modalEnd();
	STX.unappendClassName($$$("#tfcConfirmOrder"), "tfc-pending")
	$$$("#tfcConfirmOrder .processOrder").style.display="block";
	$$$("#tfcConfirmOrder .orderProcessed").style.display="none";
	STX.DialogManager.displayDialog('tfcConfirmOrder');
	this.account.confirmOrder(this, order, function(confirmation){
		var descriptionNode=$$$("#tfcConfirmOrder .tfcOrderDescription");
		var priceNode=$$$("#tfcConfirmOrder .tfcOrderPrice");
		var tifNode=$$$("#tfcConfirmOrder .tfcOrderTif");
		var otoNode=$$$("#tfcConfirmOrder .tfc-confirm-oto");

		var actionText=order.action;
		if(action=="limit_short") actionText+=" (short)";
		else if(action=="limit_cover") actionText+=" (to cover)";
		var description=actionText + " " + STX.commas(order.quantity);
		if(!STX.LegacyMarket.isForexFuturesSymbol(self.stx.chart.symbol)){
			description+=" shares of";
		}
		description+=" " + order.symbol;
		descriptionNode.innerHTML=description.capitalize();

		var price="@ ";
		if(order.limit) price+=self.formatPrice(order.limit);
		if(order.stop) price+=self.formatPrice(order.stop) + " Stop";
		if(!order.limit && !order.stop) price+="MKT";

		priceNode.innerHTML=price;

		if(order.tif=="DAY") tifNode.innerHTML="Day Order";
		else if(order.tif=="GTC") tifNode.innerHTML="Good Until Cancelled";

		if(order.oto){
			otoNode.style.display="";
			$$$("#tfcConfirmOrder .tfcOrderOTO").innerHTML=self.printableOTO(order.oto);
		}else{
			otoNode.style.display="none";		
		}

		var submitButton=$$$("#tfcConfirmOrder .tfcSubmit");
		var abandonButton=$$$("#tfcConfirmOrder .tfcAbandon");
		function closure(self, order, submitButton){
			return function(){
				STX.clearSafeClickTouches(submitButton);
				STX.clearSafeClickTouches(abandonButton);
				$$$("#tfcConfirmOrder .processOrder").style.display="block";
				STX.appendClassName($$$("#tfcConfirmOrder"), "tfc-pending")
				self.placeOrder(order);
			};
		};
		STX.safeClickTouch(abandonButton, STX.DialogManager.dismissDialog);
		if(confirmation && confirmation.errors){
			submitButton.style.display="none";
			for(var i=0;i<confirmation.errors.length;i++){
				var div=STX.newChild($$$("#tfcConfirmOrder .tfc-errors"), "div", null, confirmation.errors[i]);
			}
		}else{
			STX.clearNode($$$("#tfcConfirmOrder .tfc-errors"));
			submitButton.style.display="";
			STX.safeClickTouch(submitButton, closure(self, order, submitButton));
		}
		if(confirmation && confirmation.warnings){
			for(var i=0;i<confirmation.warnings.length;i++){
				var div=STX.newChild($$$("#tfcConfirmOrder .tfc-warnings"), "div", null, confirmation.warnings[i]);
			}
		}else{
			STX.clearNode($$$("#tfcConfirmOrder .tfc-warnings"));
		}
		$$$("#tfcConfirmOrder .processOrder").style.display="none";
		$$$("#tfcConfirmOrder .orderProcessed").style.display="block";
	});
};

/**
 * Either confirms or places the order depending on whether this.config.skipConfirms is set to true or not
 * @param {string} type Either "order","oco" or "replace" depending on the type of order
 * @param  {string} action The order action ("limit_buy","limit_sell","limit_short","limit_cover")
 */
STX.TFC.prototype.confirmOrPlaceOrder=function(type, action){
	if(type=="order"){
		var order=this.createOrderFromGUI(action);
		if(order.quantity==0) return;
		if(this.config.skipConfirms){
			this.placeOrder(order);
		}else{
			this.confirmOrder(order);
		}
	}else if(type=="OCO"){
		var order=this.createOCOFromGUI();
		if(order[0].quantity==0) return;
		if(this.config.skipConfirms){
			this.placeOrder(order);
		}else{
			this.confirmOCO(order);
		}
	}else if(type=="replace"){
		var order=this.createReplaceFromGUI();
		if(this.config.skipConfirms){
			this.placeOrder(order);
		}else{
			this.confirmReplace(order);
		}
	}
};

/**
 * Formats a price according to the conventions used on the y-axis. This should ensure that trade prices are always the same
 * number of decimal places as the security currently trades. It will further ensure that decimal places do not exceed
 * this.tradability.maxDecimalPlaces
 * @param  {number} price The price to format
 * @return {string}       The price formatted as text, fixed to the appropriate number of decimal places
 */
STX.TFC.prototype.formatPrice=function(price){
	var p=this.stx.formatYAxisPrice(price, this.chart.panel);
	if(this.tradability && this.tradability.maxDecimalPlaces && this.tradability.maxDecimalPlaces!=0){
		var i=p.indexOf(".");
		if(i!=-1){
			var decimalPart=p.slice(i+1);
			if(decimalPart.length>this.tradability.maxDecimalPlaces){
				p=parseFloat(p).toFixed(this.tradability.maxDecimalPlaces);
			}
		}
	}
	return p;
};

/**
 * Convenience function for creating a printable text label for the price of an order. This will be "MKT" or "xxx LMT" or "xxx STP".
 * @param  {object} order The order
 * @return {string}       The printable text.
 */
STX.TFC.prototype.printablePrice=function(order){
	if(!order.limit && !order.stop) return "MKT";
	if(order.limit && order.stop) return this.formatPrice(order.limit) + " LMT " + this.formatPrice(order.stop) + " STP";
	if(order.limit) return this.formatPrice(order.limit);
	if(order.stop) return this.formatPrice(order.stop) + " STP";
	return;
};

/**
 * Creates a confirmation dialog for an OCO (one cancels the other) order. This will be used for straddles, strangles and brackets. This
 * method will return without enabling the dialog if the quantity has not been specified.
 */
STX.TFC.prototype.confirmOCO=function(order){
	var descriptionNodes=[];
	descriptionNodes.push($$$("#tfcConfirmOCO .tfcOrderDescription1"));
	descriptionNodes.push($$$("#tfcConfirmOCO .tfcOrderDescription2"));
	var tifNode=$$$("#tfcConfirmOCO .tfcOrderTif");

	for(var i=0;i<2;i++){
		var oco=order[i];
		var description=oco.action + " " + STX.commas(oco.quantity);
		if(!STX.LegacyMarket.isForexFuturesSymbol(this.stx.chart.symbol)){
			description+=" shares of";
		}
		description+=" " + oco.symbol;
		description+=" @ ";
		description += this.printablePrice(oco);
		descriptionNodes[i].innerHTML=description.capitalize();
	}

	if(order[0].tif=="DAY") tifNode.innerHTML="Day Order";
	else if(order[0].tif=="GTC") tifNode.innerHTML="Good Until Cancelled";

	var submitButton=$$$("#tfcConfirmOCO .tfcSubmit");
	var abandonButton=$$$("#tfcConfirmOCO .tfcAbandon");
	function closure(self, order, submitButton){
		return function(){
			STX.clearSafeClickTouches(submitButton);
			STX.clearSafeClickTouches(abandonButton);
			$$$("#tfcConfirmOCO .processOrder").style.display="block";
			STX.appendClassName($$$("#tfcConfirmOCO"), "tfc-pending");
			self.placeOrder(order);
		};
	};
	STX.safeClickTouch(submitButton, closure(this, order, submitButton));
	STX.safeClickTouch(abandonButton, STX.DialogManager.dismissDialog);

	this.modalEnd();
	STX.DialogManager.displayDialog('tfcConfirmOCO');
	STX.unappendClassName($$$("#tfcConfirmOCO"), "tfc-pending")
	$$$("#tfcConfirmOCO .processOrder").style.display="none";
	$$$("#tfcConfirmOCO .orderProcessed").style.display="block";
};

/**
 * Called when a user submits an order or replace. This will pull up the appropriate confirmation dialog, assuming all order parameters have been filled in.
 * @param  {string} action The type of action
 */
STX.TFC.prototype.userAction=function(action){
	if(action=="replace"){
		this.confirmOrPlaceOrder("replace");
	}else if(action=="OCO"){
		this.confirmOrPlaceOrder("OCO", action);
	}else{
		if(this.activeTrade=="bracket_cover" || this.activeTrade=="bracket_sell"){
			this.confirmOrPlaceOrder("OCO", action);
		}else{
			this.confirmOrPlaceOrder("order", action);
		}
	}
};

/**
 * Turns the crosshairs off while the mouse is passing over an object such as an open order marker
 */
STX.TFC.prototype.crosshairsOff=function(){
	this.crosshairMouseOverState=this.stx.layout.crosshair;
	this.stx.layout.crosshair=false;
};

/**
 * Turns the crosshairs on when the mouse passes out of an object such asn an open order marker
 */
STX.TFC.prototype.crosshairsOn=function(){
	if(this.crosshairsOriginallyOn==null)
		this.stx.layout.crosshair=this.crosshairMouseOverState;
};

/**
 * Puts the chart into a modal mode when the user is mousing over a TFC element. This prevents the chart
 * from scrolling with mouse movements or intercepting key strokes.
 */
STX.TFC.prototype.modalBegin=function(){
	if(this.stx.grabbingScreen) return;	// Don't intercept modal if the user is scrolling the chart
	this.stx.editingAnnotation=true;	// This prevents keystrokes from being intercepted
	this.stx.modalBegin();
};

/**
 * Takes the chart out of modal mode when the user mouses out of a TFC element.
 */
STX.TFC.prototype.modalEnd=function(){
	this.stx.modalEnd();
	this.stx.editingAnnotation=false;
};

/**
 * Start method for a drag operation. Callback from STX.safeDrag
 * @param  {Event} e    The mouse or touch event
 * @param  {HTMLElement} node The element that is being dragged
 */
STX.TFC.prototype.startDrag=function(e, node){
	this.initialPosition=STX.stripPX(node.style.top);
	this.stx.modalBegin();
	STX.appendClassName(node, "dragging");
};

/**
 * End method for a drag operation. Callback from STX.safeDrag
 * @param  {Event} e    The mouse or touch event
 * @param  {HTMLElement} node The element that was dragged
 */
STX.TFC.prototype.endDrag=function(e, node){
	this.stx.modalEnd();
	STX.unappendClassName(node, "dragging");
};

/**
 * Callback method for when marker order widget is dragged. This does nothing but reposition the widget for the convenience of the user.
 * @param  {Event} e The mouse or touch event
 */
STX.TFC.prototype.dragMarketOrder=function(e){
	var newPosition=this.initialPosition+e.displacementY;
	if(newPosition<0) newPosition=0;
	var parentNode=this.dom.marketOrder.parentNode;
	if(newPosition+this.dom.marketOrder.offsetHeight>parentNode.clientHeight){
		newPosition=parentNode.clientHeight-this.dom.marketOrder.offsetHeight;
	}
	this.dom.marketOrder.style.top=newPosition+"px";
};

/**
 * Adjusts the size of the "holder" whenever the chart panel is resized
 * @todo Abstract along with Marker holders
 */
STX.TFC.prototype.adjustMarker=function(){
	if(!this.chart.panel) return;
	this.holder.style.display="block";
	this.holder.style.width=this.chart.canvasWidth+"px";
	this.holder.style.top=this.chart.panel.top+"px";
	this.holder.style.height=this.chart.panel.height+"px";
};

/**
 * Enables an account. Without an enabled account TFC will not operate.
 * @param  {STX.TFC.Account} account The account to enable
 */
STX.TFC.prototype.enableAccount=function(account){
	this.account=account;
	if(!this.account.config) this.account.config={};
	if(!this.account.config.oto){
		this.elements.addOTOStop.style.display="none";
	}else{
		this.elements.addOTOStop.style.display="";		
	}
	this.updateData();
};

/**
 * Sets a callback to be called when the screen needs to be resized. Used when the size of the TFC window is modified.
 * @param {function} resizeCallback The resize callback (i.e. resizeScreen())
 */
STX.TFC.prototype.setResizeCallback=function(resizeCallback){
	var self=this;
    STX.safeClickTouch($$$(".stx-trade-nav .stx-trade-ticket-toggle"), function(stx){
      return function(){
        stx.preAdjustScroll();
        STX.unappendClassName($$$(".stx-trade-nav"), "active");
        STX.appendClassName($$$(".stx-trade-info"), "active");
		self.refreshScrollWindows();
        resizeCallback();
        stx.postAdjustScroll();
      };
    }(this.stx));
    STX.safeClickTouch($$$(".stx-trade-info .stx-trade-ticket-toggle"), function(stx){
      return function(){
        stx.preAdjustScroll();
        STX.unappendClassName($$$(".stx-trade-info"), "active");
        STX.appendClassName($$$(".stx-trade-nav"), "active");
        resizeCallback();
        stx.postAdjustScroll();
      };
    }(this.stx));
};

/**
 * Adds touch/click events to menu items
 */
STX.TFC.prototype.establishMenu=function(){
	for(var componentName in this.menu){
		var components=this.menu[componentName].nodes;
		for(var i=0;i<components.length;i++){
			STX.safeClickTouch(components[i], function(self, componentName){
				return function(e){
					if(!self.stx.displayInitialized) return;
					if(self.menu[componentName].nodes[0].className.indexOf("active")==-1){
						self.clearActive();
						for(var i=0;i<self.menu[componentName].nodes.length;i++){
							STX.appendClassName(self.menu[componentName].nodes[i], "active");
						}
						self.newTrade(componentName);
					}else{
						self.closeTFC();
					}
				};
			}(this, componentName));
		}
	}
};

/**
 * This constructs the Trade From the Chart object. It is called from the actual object constructor. Within, we instantiate all
 * of the components that can be used in TFC and we set up all of the event handlers. TFC makes use of the "STX.safe" event handlers
 * to seamlessly handle both touch and mouse events through one interface.
 * @param {object} config Configuration object
 * @param {object} config.stx     The chart object to enable TFC.
 * @param {object} config.account Valid STX.Account object for querying brokerage and placing trades
 * @param {object} [config.chart]   The specific chart (panel) for trading componentry. Defaults to the default chart.
 * @param {boolean} [config.skipConfirms] If set to true then there will be no confirm messages. Pressing buy or sell buttons will place a trade! 

 */
STX.TFC.prototype.construct=function(config){
	var container=$$$(".tfc.container");
	this.config=config;
	this.chart=config.chart;
	this.stx=config.stx;
	this.width=container.offsetWidth;
	this.holder=document.createElement("DIV");
	this.holder.style.position="absolute";
	this.holder.style.left="0px";
	this.holder.style.overflow="hidden";
	this.holder.style.zIndex=2;	// This will be below the crosshairs and other chart navigational divs but above marker holders
	this.stx.chart.container.appendChild(this.holder);
	this.adjustMarker();
	STXChart.prototype.append("adjustPanelPositions", function(self){
		return function(){
			self.adjustMarker();
		};
	}(this));

	this.dom.dragLineAbove=$$$(".drag-price-line", container).cloneNode(true);
	this.dom.dragLineCenter=$$$(".drag-price-line", container).cloneNode(true);
	this.dom.dragLineBelow=$$$(".drag-price-line", container).cloneNode(true);
	this.dom.marketOrder=$$$(".market-order", container).cloneNode(true);
	this.dom.limitOrder=$$$(".stx-limit-order", container).cloneNode(true);
	this.dom.otoAbove=$$$(".OTO.stx-stop", container).cloneNode(true);
	this.dom.otoBelow=$$$(".OTO.stx-stop", container).cloneNode(true);
	this.dom.ocoOrder=$$$(".stx-oco-order", container).cloneNode(true);
	this.dom.ocoAbove=$$$(".oco.tfc-oco-above", container).cloneNode(true);
	this.dom.ocoBelow=$$$(".oco.tfc-oco-below", container).cloneNode(true);
	this.dom.shadeAbove=$$$(".tfc-shade", container).cloneNode(true);
	this.dom.shadeBelow=$$$(".tfc-shade", container).cloneNode(true);

	for(var componentName in this.dom){
		var component=this.dom[componentName];
		this.holder.appendChild(component);
		if(!(componentName in {shadeAbove:true,shadeBelow:true})){
			STX.safeMouseOver(component, function(self){ return function(e){self.modalBegin();};}(this));
			STX.safeMouseOut(component, function(self){ return function(e){self.modalEnd();};}(this));
		}
	}
	this.elements.marketBuy=$$$(".tfc-market-buy-action", this.dom.marketOrder);
	this.elements.marketSell=$$$(".tfc-market-sell-action", this.dom.marketOrder);
	this.elements.limitBuy=$$$(".click.tfc-buy", this.dom.limitOrder);
	this.elements.limitReplace=$$$(".click.tfc-replace", this.dom.limitOrder);
	this.elements.limitSell=$$$(".click.tfc-sell", this.dom.limitOrder);
	this.elements.limitShort=$$$(".click.tfc-short", this.dom.limitOrder);
	this.elements.limitCover=$$$(".click.tfc-cover", this.dom.limitOrder);
	this.elements.dragLineAbovePrice=$$$(".tfc-price", this.dom.dragLineAbove);
	this.elements.dragLineCenterPrice=$$$(".tfc-price", this.dom.dragLineCenter);
	this.elements.dragLineBelowPrice=$$$(".tfc-price", this.dom.dragLineBelow);
	this.elements.addOTOStop=$$$(".OTO.stop", this.dom.limitOrder);
	this.elements.removeOTOAbove=$$$(".stx-btn.stx-ico .stx-ico-close", this.dom.otoAbove);
	this.elements.addOTOLimit=$$$(".OTO.limit", this.dom.limitOrder);
	this.elements.removeOTOBelow=$$$(".stx-btn.stx-ico .stx-ico-close", this.dom.otoBelow);
	this.elements.sharesOwned=$$$(".tfc-shares-owned span", this.dom.limitOrder);
	this.elements.marketShares=$$$("input.tfc-shares", this.dom.marketOrder);
	this.elements.marketCurrency=$$$("input.tfc-currency", this.dom.marketOrder);
	this.elements.limitShares=$$$("input.tfc-shares", this.dom.limitOrder);
	this.elements.limitCurrency=$$$("input.tfc-currency", this.dom.limitOrder);
	this.elements.gainAmount=$$$(".tfc-gain-amount", this.dom.limitOrder);
	this.elements.gainPercent=$$$(".tfc-gain-percent", this.dom.limitOrder);
	this.elements.aboveGainAmount=$$$(".tfc-gain-amount", this.dom.otoAbove);
	this.elements.aboveGainPercent=$$$(".tfc-gain-percent", this.dom.otoAbove);
	this.elements.belowGainAmount=$$$(".tfc-gain-amount", this.dom.otoBelow);
	this.elements.belowGainPercent=$$$(".tfc-gain-percent", this.dom.otoBelow);
	this.elements.ocoGainAmount=$$$(".tfc-gain-amount", this.dom.ocoOrder);
	this.elements.ocoGainPercent=$$$(".tfc-gain-percent", this.dom.ocoOrder);
	this.elements.otoAboveLegLabel=$$$(".tfc-oto-leg-label", this.dom.otoAbove);
	this.elements.otoBelowLegLabel=$$$(".tfc-oto-leg-label", this.dom.otoBelow);
	this.elements.limitRiskReward=$$$(".risk-reward .stx-data", this.dom.limitOrder);
	this.elements.ocoRiskReward=$$$(".inputTemplate .risk-reward", this.dom.ocoOrder);
	this.elements.askForexPart=$$$(".tfc-ask strong", this.dom.marketOrder);
	this.elements.bidForexPart=$$$(".tfc-bid strong", this.dom.marketOrder);
	this.elements.askEquityPart=$$$(".tfc-ask span", this.dom.marketOrder);
	this.elements.bidEquityPart=$$$(".tfc-bid span", this.dom.marketOrder);
	this.elements.ocoAboveHead=$$$(".stx-head", this.dom.ocoAbove);
	this.elements.ocoBelowHead=$$$(".stx-head", this.dom.ocoBelow);
	this.elements.ocoRiskReward=$$$(".risk-reward", this.dom.ocoOrder);
	this.elements.ocoCurrency=$$$(".stx-data input", this.dom.ocoOrder);
	this.elements.ocoAboveShares=$$$(".stx-data span", this.dom.ocoAbove);
	this.elements.ocoBelowShares=$$$(".stx-data span", this.dom.ocoBelow);
	this.elements.ocoTrade=$$$(".click.oco", this.dom.ocoOrder);
	this.elements.limitTIF=$$$("select", this.dom.limitOrder);
	this.elements.ocoTIF=$$$("select", this.dom.ocoOrder);
	this.elements.abandonLimitOrder=$$$(".stx-btn.stx-ico", this.dom.limitOrder);
	this.elements.abandonOCOOrder=$$$(".stx-btn.stx-ico", this.dom.ocoOrder);
	this.elements.cancelLimitOrder=$$$(".tfc-cancel-button", this.dom.limitOrder);
	this.elements.cancelDescription=$$$(".tfc-cancel-description", this.dom.limitOrder);

	this.templates.openOrderMarker=$$$(".tfc .open-order-marker", container);

	this.menu.enableMarket.nodes=document.querySelectorAll(".stx-trade-panel .stx-market");
	this.menu.enableBuy.nodes=document.querySelectorAll(".stx-trade-panel .stx-buy");
	this.menu.enableSell.nodes=document.querySelectorAll(".stx-trade-panel .stx-sell");
	this.menu.enableShort.nodes=document.querySelectorAll(".stx-trade-panel .stx-short");
	this.menu.enableCover.nodes=document.querySelectorAll(".stx-trade-panel .stx-cover");
	this.menu.enableStraddle.nodes=document.querySelectorAll(".stx-trade-panel .stx-straddle");
	this.menu.enableStrangle.nodes=document.querySelectorAll(".stx-trade-panel .stx-strangle");
	this.menu.enableBracket.nodes=document.querySelectorAll(".stx-trade-panel .stx-bracket");

	this.establishMenu();

	this.elements.currentCash=$$$(".stx-trade-panel .tfc-current-cash");
	this.elements.currentFunds=$$$(".stx-trade-panel .tfc-current-funds");
	this.elements.currentPosition=$$$(".stx-trade-panel .tfc-current-position");

	var safety=STX.safeDrag(this.dom.marketOrder,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.marketOrder),
		function(self){ return function(e){ self.dragMarketOrder(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.marketOrder);};}(this)
	);

	STX.safeClickTouch(this.elements.marketBuy, function(self, action) { return function(e){ self.userAction(action);};}(this, "market_buy"), {"safety":safety});
	STX.safeClickTouch(this.elements.marketSell, function(self, action) { return function(e){ self.userAction(action);};}(this, "market_sell"), {"safety":safety});

	STX.safeClickTouch(this.elements.limitBuy, function(self, action) { return function(e){ self.userAction(action);};}(this, "limit_buy"), {"safety":safety});
	STX.safeClickTouch(this.elements.limitSell, function(self, action) { return function(e){ self.userAction(action);};}(this, "limit_sell"), {"safety":safety});
	STX.safeClickTouch(this.elements.limitShort, function(self, action) { return function(e){ self.userAction(action);};}(this, "limit_short"), {"safety":safety});
	STX.safeClickTouch(this.elements.limitCover, function(self, action) { return function(e){ self.userAction(action);};}(this, "limit_cover"), {"safety":safety});
	STX.safeClickTouch(this.elements.limitReplace, function(self, action) { return function(e){ self.userAction(action);};}(this, "replace"), {"safety":safety});

	STX.safeClickTouch(this.elements.ocoTrade, function(self, action) { return function(e){ self.userAction(action);};}(this, "OCO"), {"safety":safety});

	STX.safeDrag(this.dom.dragLineCenter,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineCenter),
		function(self){ return function(e){ self.dragCenterLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineCenter);};}(this)
	);
	var safety=STX.safeDrag(this.dom.limitOrder,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineCenter),
		function(self){ return function(e){ self.dragCenterLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineCenter);};}(this)
	);
	STX.safeDrag(this.dom.dragLineAbove,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineAbove),
		function(self){ return function(e){ self.dragAboveLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineAbove);};}(this)
	);
	STX.safeDrag(this.dom.ocoAbove,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineAbove),
		function(self){ return function(e){ self.dragAboveLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineAbove);};}(this)
	);
	STX.safeDrag(this.dom.otoAbove,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineAbove),
		function(self){ return function(e){ self.dragAboveLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineAbove);};}(this)
	);
	STX.safeDrag(this.dom.dragLineBelow,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineBelow),
		function(self){ return function(e){ self.dragBelowLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineBelow);};}(this)
	);
	STX.safeDrag(this.dom.ocoBelow,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineBelow),
		function(self){ return function(e){ self.dragBelowLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineBelow);};}(this)
	);	
	STX.safeDrag(this.dom.otoBelow,
		function(self, node){ return function(e){ self.startDrag(e, node);};}(this, this.dom.dragLineBelow),
		function(self){ return function(e){ self.dragBelowLine(e);};}(this),
		function(self){ return function(e){ self.endDrag(e, self.dom.dragLineBelow);};}(this)
	);
	var sharedParams={"safety": safety};	// since addOTOStop and addOTOLimit are overlapping, on touch devices the touch event will trigger the first
											// and the click event will trigger the second! The effect is of a double click. To prevent this we set these
											// two nodes to use the same params for the safeClickTouch. Furthermore we hook up the safety from our draggable
											// limitOrder widget
	STX.safeClickTouch(this.elements.addOTOStop, function(self) { return function(e){ self.addOTOStop();};}(this), sharedParams);
	STX.safeClickTouch(this.elements.removeOTOAbove, function(self) { return function(e){ self.removeOTOAbove();};}(this));
	STX.safeClickTouch(this.elements.addOTOLimit, function(self) { return function(e){ self.addOTOLimit();};}(this), sharedParams);
	STX.safeClickTouch(this.elements.removeOTOBelow, function(self) { return function(e){ self.removeOTOBelow();};}(this));

	STXChart.prototype.append("draw", function(self) { return function(){ self.render();};}(this));

	// http://stackoverflow.com/questions/19335109/ios-7-safari-os-locks-up-for-4-seconds-when-clicking-focusing-on-a-html-input
	STX.safeClickTouch(this.elements.limitShares, function(self) { return function(e){
		if(STX.isIOS7or8){
			e.preventDefault();
			e.target.focus();
		}
		self.setActiveInput("shares");
	};}(this));
	STX.safeClickTouch(this.elements.limitCurrency, function(self) { return function(e){
		if(STX.isIOS7or8){
			e.preventDefault();
			e.target.focus();
		}
		self.setActiveInput("currency");
	};}(this));
	STX.safeClickTouch(this.elements.marketShares, function(self) { return function(e){
		if(STX.isIOS7or8){
			e.preventDefault();
			e.target.focus();
		}
		self.setActiveInput("shares");
	};}(this));
	STX.safeClickTouch(this.elements.marketCurrency, function(self) { return function(e){
		if(STX.isIOS7or8){
			e.preventDefault();
			e.target.focus();
		}
		self.setActiveInput("currency");
	};}(this));

	this.elements.limitShares.addEventListener("change", function(self) { return function(e){ self.updateValues();};}(this));
	this.elements.limitCurrency.addEventListener("change", function(self) { return function(e){ self.updateValues();};}(this));
	this.elements.marketShares.addEventListener("change", function(self) { return function(e){ self.updateValues();};}(this));
	this.elements.marketCurrency.addEventListener("change", function(self) { return function(e){ self.updateValues();};}(this));
	this.elements.ocoCurrency.addEventListener("change", function(self) { return function(e){ self.updateValues();};}(this));

	STX.safeClickTouch(this.elements.abandonLimitOrder, function(self) { return function(e){ self.closeTFC();};}(this));
	STX.safeClickTouch(this.elements.abandonOCOOrder, function(self) { return function(e){ self.closeTFC();};}(this));
	STX.safeClickTouch(this.elements.cancelLimitOrder, function(self) { return function(e){ self.cancelOpenOrder();};}(this));

	if(config.account){
		this.enableAccount(config.account);
	}
	window.addEventListener("resize", function(self){return function(){self.refreshScrollWindows();};}(this));

};
