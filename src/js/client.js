"use strict"; /* eslint-env browser */ /* global */ /* eslint no-warning-comments: [1, { "terms": ["todo", "fix", "help"], "location": "anywhere" }] */
var socket = io.connect();

var map;

$("#restaurantSearchBtn").on("click", function searchYelp () {
	initMap();
	socket.emit("yelpSearchRequest", {term: $("#restaurantSearch").val()});
});

$("#checkInBtn").on("click", function checkInBtnClicked () {
	$("#recentVisits").prepend("<li>" + $("#restaurantName").text() + " - " + formatAMPM(new Date()) + "</li>");
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

	$("#restaurantName").text(data.businesses[0].name);
	$("#restaurantAddress").text(data.businesses[0].location.address1);
	$("#restaurantPic").prop("src", data.businesses[0].image_url);
	$("#checkInTile").show();

	_.forEach(data.businesses, function (store) {
		updateMap(store.coordinates, store.url);
	});
});

$(function () {
	$("#checkInTile").hide();
});

function formatAMPM (date) {
	var hours = date.getHours();
	var minutes = date.getMinutes();
	var ampm = hours >= 12 ? 'pm' : 'am';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	minutes = minutes < 10 ? '0'+minutes : minutes;
	var strTime = hours + ':' + minutes + ' ' + ampm;
	return strTime;
}

$("#membersInput").on("keyup", function () {
	$("#membersSpan").text($("#membersInput").val() || 0);
$("#householdCostSpan").text(Math.round(parseFloat($("#membersInput").val() || 0) * 51.3));
});

$(".gasTransInputs").on("keyup", function () {
	var dollarsyr = Math.round(parseFloat($("#mipday").val()) * 365 * parseFloat($("#mipg").val()) * parseFloat($("#dollarsg").val()));
	var kgemissions = Math.round(parseFloat($("#mipday").val()) * 0.411 * 30);

	$("#makenmodelSpan").text($("#makenmodel").val() || "car");
	$("#dollarsyrSpan").text(dollarsyr || 0);
	$("#kgemissionsSpan").text(kgemissions || 0);
});
