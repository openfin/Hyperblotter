//https://staging.vestorly.com/api/v2/articles?vestorly_auth=eyJwYXlsb2FkIjoiNTUzMjVhOTI4NzM4NDU0ZjQ3MDAwMDAxIiwiY3JlYXRlZF9vbiI6MTQyOTQwMjUyMiwic2lnbmF0dXJlIjoidmJQZ3Q1Qzd4YVlhSjZqUndpYUEwOUl0bnRSbnBLQTduRXY4NG5DNS9jdz0ifQ&limit=5&text_query=babe%20ruth
var _ = require('underscore');

var xhr = require('xhr-browserify');
var url = require('url');

var fetchArticles = function(query, callback) {
	// var targetUrl = 'https://staging.vestorly.com/api/v2/articles?vestorly_auth=eyJwYXlsb2FkIjoiNTUzMjVhOTI4NzM4NDU0ZjQ3MDAwMDAxIiwiY3JlYXRlZF9vbiI6MTQyOTQwMjUyMiwic2lnbmF0dXJlIjoidmJQZ3Q1Qzd4YVlhSjZqUndpYUEwOUl0bnRSbnBLQTduRXY4NG5DNS9jdz0ifQ&limit=5&text_query=' + encodeURI(query);
	// var uri = url.parse(targetUrl, true);
	// xhr(uri, callback);

	console.log('you rang?', query.key.toLowerCase());

	//callback(require('src/javascript/vendor/'+query.key.toLowerCase()+'.json'));
	//callback(require('../vendor/c.json'));

	switch(query.key.toLowerCase()) {
		case 'c': callback(require('../vendor/c.json')); break;
		case 'fb': callback(require('../vendor/fb.json')); break;
		case 'gs': callback(require('../vendor/gs.json')); break;
		case 'goog': callback(require('../vendor/goog.json')); break;
		case 'msft': callback(require('../vendor/msft.json')); break;

	}

};
 
module.exports = fetchArticles;