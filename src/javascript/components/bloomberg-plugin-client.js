//=====================================================================
// Bloomberg Plugin Client
//=====================================================================
var io = require('socket.io-client');
const errorTopic = 'plugin-error';
const requestTopic = 'plugin-request';

function Session() {
    this.callbackId = 0; // helps correlate callbacks when getting responses from the server
    this.socket = io('http://localhost:5432');
    this.socket.on(errorTopic, m => {
        console.error(m);
    });
}

Session.prototype.on = function(event, listener) {
    let callbackId = this.callbackId++;
    this.socket.on(event, m => {
        if (callbackId === m.callbackId) {
            listener(m.payload);
        }
    });
    this.socket.emit(requestTopic, {functionName: 'on', callbackId, event});
};

function bindInvokeFunction(functionName) {
    return function() {
        this.socket.emit(requestTopic, {functionName, args: [...arguments]});
    }
}
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

fin.desktop.Plugins = {};
fin.desktop.Plugins.blpapi = {Session};