(function () {
  'use strict';
	var subscribeToInterAppBus = function () {
    fin.desktop.InterApplicationBus.subscribe('*', 'tickerSelection', function (msg) {
      console.log('Message Received: ' + msg.symbolName);
      // a duplicate WPF window gets created.
      // this line seems to be the cause
      // stxx.newChart(msg.symbolName);
      fin.desktop.System.getAllExternalApplications(list => console.log(list, 'list here'));
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