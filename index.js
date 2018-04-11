"use strict"; /* eslint-env node */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
var debug = false;

// Load Node Modules & Custom Modules
var express = require("express"),
	app = express(),
	server = app.listen(process.env.PORT || (process.argv[2] || 8000), function expressServerListening () {
		console.log(server.address());
	}),
	io = require("socket.io"),
	listener = io.listen(server),
	pugStatic = require("pug-static"),
	yelp = require('yelp-fusion').client("7QQ2UGj29Jmcot4RYRsDkC-_Dxo5gm3nMcokmkf1LqdkJnjLfnnBxVnM-mBLYoLcSkl4KBUzMhjt0TtVkutc0Spac_VfLJZsvorSOe9QwBT2e-KnFWeny310GdHNWnYx"),
	utils = require("./utils.js");



// Express Middleware
// var router = require("./app/routes.js");
// app.use("/", router);
app.use(express.static(__dirname + "/dist"));
app.use(express.static(__dirname + "/public"));
app.use(pugStatic(__dirname + "/views"));

// Socket.io Control
listener.sockets.on("connection", function connectionDetected (socket) {
	socket.on("refreshRequest", function processRefreshRequest (options) {
		socket.emit("refreshResponse", {});
	});
	socket.on("yelpSearchRequest", function yelpSearchRequest (data) {
		yelp.search({
			term: data.term,
			location: "Honolulu, HI"
		}).then(response => {
			console.log("Successfully searched for " + data.term + "!");
			socket.emit("yelpSearchResponse", {businesses: response.jsonBody.businesses});
		}).catch(e => {
			console.log(e);
		});
	});
});