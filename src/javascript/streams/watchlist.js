var EventEmitter = require('events').EventEmitter,
    _ = require('underscore');

var watchlist = Object.create(EventEmitter.prototype),
	equities = [{
		key:'GOOG',
		selected: false
	}, {
		key:'MSFT',
		selected: false
	}, {
		key:'C',
		selected: false
	}, {
		key:'GS',
		selected: false
	}, {
		key:'FB',
		selected: false
	}];

function getCurrent() {
	return equities;
}

setTimeout(function () {
	var qTree = document.querySelector('#q-example');
	qTree.addEventListener('fin-selection-changed', function(e) {
		var row = qTree.getSelectedRow();
		select(row.hierarchy.data);
	});
}, 1000);


function select(symbolKey) {
	_.map(equities, function(eq) {
		if(eq.key === symbolKey) {
			eq.selected = true;
			watchlist.emit('selected', eq);
		} else{
			eq.selected = false;
		}
	});
	watchlist.emit('update', equities);
};

function addSymbol(symbol) {
	equities.push(symbol);
	watchlist.emit('update', equities);
}
function removeSymbol(symbol) {
	equities = _.reject(equities, function (symb) {
		symb === symbol;
	});
	watchlist.emit('update', equities);
}

watchlist.on('get-watchlist', function(){
	return equities;
});

watchlist.getCurrent = getCurrent;
watchlist.addSymbol = addSymbol;
watchlist.removeSymbol = removeSymbol;
watchlist.select = select;

module.exports = watchlist;