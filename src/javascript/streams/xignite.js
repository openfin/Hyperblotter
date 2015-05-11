var EventEmitter = require('events').EventEmitter,
    _ = require('underscore');

var xIgnite = Object.create(EventEmitter.prototype);

module.exports = xIgnite;