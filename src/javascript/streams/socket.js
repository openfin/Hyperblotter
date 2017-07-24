var EventEmitter = require('events').EventEmitter,
  _ = require('underscore'),
  io = require('socket.io-client'),
  socket = io('http://nerfapi-openfin.rhcloud.com:8000');

socket.on('connect', function(plop) {
  console.log('connected');
})
var socketStream = Object.create(EventEmitter.prototype),
  that = this;

function send(data) {
  console.log('sending data', data);
  socket.emit('openfin:socketmesage', data);
};

function sendStuff(stuff) {
  console.log('stuff was sent!', stuff);
}

function join(user) {
  user.id = socket.id;
  send({
    message: 'user:join',
    data: user
  });
  rollCall();
}

function respondToRollcall(user) {
  console.log('respondToRollcall', user);
  send({
    message: 'user:rollcall:respond',
    data: user
  });
}

function rollCall() {
  send({
    message: 'user:rollcall'
  });
}

function sendSymbol(origName, symbol, destName) {
  send({
    message: 'notification:symbol',
    data: {
      destName: destName,
      origName: origName,
      symbol: symbol
    }
  });
}

//this sucks
// changed package to packageObject as 'package' is a reserved word in strict mode
socket.on('openfin:socketmesage', function(packageObject) {
  if (packageObject.message === 'user:join') {
    socketStream.emit('user:joined', packageObject.data);
  } else if (packageObject.message === 'user:rollcall') {
    socketStream.emit('user:rollcall');
  } else if (packageObject.message === 'user:rollcall:respond') {
    socketStream.emit('user:joined', packageObject.data);
  } else if (packageObject.message === 'notification:symbol') {
    socketStream.emit('notification:symbol', packageObject.data);
  }
});

socketStream.sendStuff = sendStuff;
socketStream.join = join;
socketStream.respondToRollcall = respondToRollcall;
socketStream.sendSymbol = sendSymbol;

module.exports = socketStream;
