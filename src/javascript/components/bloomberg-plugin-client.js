const io = require('socket.io-client');
const errorTopic = 'plugin-error';
const requestTopic = 'plugin-request';

function Session() {
    this.listenerId = 0; // helps correlate listeners when getting responses from the server
    this.socket = io('http://localhost:8198'); // each session has it's own socket
    this.socket.on(errorTopic, m => { // receive all exceptions from the server and show them in console
        console.error('Error from blpapi: ', m.stack);
    });
}

Session.prototype.on = function(event, listener) {
    let listenerId = this.listenerId++;
    this.socket.on(event, m => {
        // execute correlated listeners
        if (listenerId === m.listenerId) {
            listener(m.payload);
        }
    });
    // tell the server to listen for events
    this.socket.emit(requestTopic, {functionName: 'on', listenerId, event});
};

Session.prototype.start = bindInvokeFunction('start');
Session.prototype.authorize = bindInvokeFunction('authorize');
Session.prototype.authorizeUser = bindInvokeFunction('authorizeUser');
Session.prototype.stop = bindInvokeFunction('stop');
Session.prototype.destroy = bindInvokeFunction('destroy');
Session.prototype.openService = bindInvokeFunction('openService');
Session.prototype.subscribe = bindInvokeFunction('subscribe');
Session.prototype.resubscribe = bindInvokeFunction('resubscribe');
Session.prototype.unsubscribe = bindInvokeFunction('unsubscribe');
Session.prototype.request = bindInvokeFunction('request');

function bindInvokeFunction(functionName) {
    return function() {
        // tell the server to execute a function
        this.socket.emit(requestTopic, {functionName, args: [...arguments]});
    }
}

// todo: temporary namespace for OpenFin plugin architecture
fin.desktop.Plugins = {};
fin.desktop.Plugins.blpapi = {Session};