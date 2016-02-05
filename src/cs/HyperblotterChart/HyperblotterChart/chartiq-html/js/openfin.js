(function () {
    'use strict';
	var subscribeToInterAppBus = function () {

        fin.desktop.InterApplicationBus.subscribe('*', 'tickerSelection', function (msg) {
			console.log('Message Received: ' + msg.symbolName);
            stxx.newChart(msg.symbolName);
        });
    };

    //event listeners.
    document.addEventListener('DOMContentLoaded', function () {
        //OpenFin is ready
        fin.desktop.main(function () {
			subscribeToInterAppBus();
        });
    });
}());