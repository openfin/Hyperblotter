var fin = require('../vendor/openfin.js'),
	EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),
    socket = require('../streams/socket.js'),
	notifications = Object.create(EventEmitter.prototype),
	user = require('../streams/user.js'),
	currentUser;

user.on('data', function (usr) {
	currentUser = usr;
});

socket.on('notification:symbol', function(data) {
	if (currentUser.name === data.destName) {
		var notification = new fin.desktop.Notification({
			url: 'http://localhost:8080/build/notification.html',
			message: {
				text : data.origName + ' wants you to look at ',
				symbol : data.symbol
			}
		});
	}
});

//this is super dumb.
try {
	fin.desktop.main(function () {
		fin.desktop.InterApplicationBus.subscribe('*', 'notification:symbol', function (data) {
			watchlistStream.select(data);
		});
	});
} catch(ex) {
	console.log('no openfin');
}


function sendSymbol(symbol, destName) {
	console.log(symbol, destName);
   socket.sendSymbol(currentUser.name, symbol, destName);
	var notification = new fin.desktop.Notification({
		url: location.href + 'notification.html',
		message: {
			text : 'Symbol sent',
			symbol : ''
		}
	});
}
notifications.sendSymbol = sendSymbol;
module.exports = notifications;