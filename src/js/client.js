"use strict"; /* eslint-env browser */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
var socket = io.connect();

function searchYelp (term) {
	socket.emit("searchYelp", {term: term});
}