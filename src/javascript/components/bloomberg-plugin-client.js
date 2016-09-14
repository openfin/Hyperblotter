//=====================================================================
// Bloomberg Plugin Client
//=====================================================================
var io = require('socket.io-client');
var socket = io('http://localhost:5432');
const requestTopic = 'plugin-request';
const responseTopic = 'plugin-response';
const errorTopic = 'plugin-error';

let sessions = [];

function Session() {
    this.id = getUuid();
    this.events = {};
    sessions.push(this);
    socket.emit(requestTopic, {functionName: 'newSession', id: this.id});
}

Session.prototype.on = function(event, listener) {
    let callbackId = getUuid();
    if (typeof this.events[event] !== 'object') {
        this.events[event] = {callbacks: {}};
    }
    this.events[event].callbacks[callbackId] = listener;
    socket.emit(requestTopic, {functionName: 'on', id: this.id, callbackId, event});
};
socket.on(responseTopic, m => {
    console.log(m.event, ': ', m.payload); // todo

    let session = sessions.find(e => e.id === m.id);
    session.events[m.event].callbacks[m.callbackId](m.payload);
});
socket.on(errorTopic, m => {
    console.error(m.error);
});

function bindInvokeFunction(functionName) {
    return function() {
        socket.emit(requestTopic, {functionName, id: this.id, args: [...arguments]});
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


// UUID v4
function getUuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}