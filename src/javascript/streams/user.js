var EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),
    socket = require('../streams/socket.js');

var users = Object.create(EventEmitter.prototype),
	that = this,
	currentUser = {};

socket.on('user:rollcall', function (){
	socket.respondToRollcall(currentUser);
});

function login(userName) {
	currentUser.name = userName;
	this.emit('data', currentUser);
	socket.join(currentUser);
};

users.login = login;
users.currentUser = currentUser;
module.exports = users;