
//https://chrome.google.com/webstore/search/manual%20geolocation?hl=en
//remember HTTPS

var g_map;
var g_marker;
var g_polyline;

var ScreenType={
		"main":1,
		"tracking":2,
		"publishing":3,
		"collection":4
}
var g_screen=ScreenType.main;

var g_route=new Array();
var g_collection=new Array();// will contain routes
var g_collectionIndex=0;

var g_timeout;

function main() {
	google.maps.Polyline.prototype.getBounds = function() {
		var bounds = new google.maps.LatLngBounds();
		this.getPath().forEach(function(item, index) {
			bounds.extend(new google.maps.LatLng(item.lat(), item.lng()));
		});
		return bounds;
	};

	var defaultLocation = {lat: 62, lng: 28};

	g_map= new google.maps.Map(document.getElementById('map'), {
		zoom: 16,
		center: defaultLocation,
	});
	
	g_marker = new google.maps.Marker({
		position: defaultLocation,
		map: g_map,
		icon: "images/sup1.png"
	});
	
	g_polyline = new google.maps.Polyline({
		map: g_map,
		// path: ??
		strokeColor: '#AA0000',
		strokeOpacity: 0.5,
		strokeWeight: 2
	});
		
	var success=initializeGeolocation();
	if(success==false){
		alert("Problem with location!");
	}
	 
	if(getCookie("collection")!=""){
		g_collection=JSON.parse(getCookie("collection"));
	}

	initControls(); 
	
}
