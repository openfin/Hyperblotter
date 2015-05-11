var EventEmitter = require('events').EventEmitter,
    _ = require('underscore'),
    socket = require('./socket.js'),
    team = [];

var teamStream = Object.create(EventEmitter.prototype);

socket.on('user:joined', function(member) {
	if(member.name && _.where(team, {name: member.name}).length < 1) {
		member.selected = false;
		team.push(member);
		teamStream.emit('update', team);
	}
});

function getCurrent() {
	return team;
}

function select(name) {
	_.map(team, function(m) {
		if(m.name === name) {
			m.selected = true;
			teamStream.emit('selected', m);
		} else {
			m.selected = false;
		}
	});

	teamStream.emit('update', team);
}

teamStream.getCurrent = getCurrent;
teamStream.select = select;
module.exports = teamStream;