"use strict"; /* eslint-env browser */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
var socket = io.connect();

var map;

$("#restaurantSearchBtn").on("click", function searchYelp () {
	initMap();
	socket.emit("yelpSearchRequest", {term: $("#restaurantSearch").val()});
});

$("#restaurantSearch").keyup(function (event) {
	if (event.keyCode === 13) {
		$("#restaurantSearchBtn").click();
	}
});

function initMap () {
	var hnl = {lat: 21.4389, lng: -158};
	map = new google.maps.Map($("#map")[0], {
		zoom: 10,
		center: hnl
	});
}

function updateMap (coordinates, url) {
	new google.maps.Marker({
		position: {lat: coordinates.latitude, lng: coordinates.longitude},
		map: map,
	});
}

socket.on("yelpSearchResponse",function yelpSearchResponse (data) {
	console.log(data.businesses);
	_.forEach(data.businesses, function (store) {
		updateMap(store.coordinates, store.url);
	});
<<<<<<< HEAD
}

function members() {
    var input = document.getElementById("members").value;
    alert(input);
}
=======
});
>>>>>>> 239076f560823b3cde03babfbb2358e823cd0d5e
