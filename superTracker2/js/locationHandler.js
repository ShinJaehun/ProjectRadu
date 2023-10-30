// Functions handling location updates

function initializeGeolocation(){
	var geolocation=null;
		
	if(window.navigator && window.navigator.geolocation){
		geolocation=window.navigator.geolocation;
	}
	
	if(geolocation){
		geolocation.getCurrentPosition(onLocationUpdate);
		
		// call onLocationUpdate when sensor gets new location
		g_watch = geolocation.watchPosition(onLocationUpdate,null,{
			enableHighAccuracy:true,
			maximumAge:1000
		});
		
		return true;
	}
	return false;
}
		
function onLocationUpdate(event){
	var newLocation=new google.maps.LatLng(
		event["coords"].latitude, 
		event["coords"].longitude
	);
	
	if(g_screen==ScreenType.tracking){
		g_route.push({
			lat:newLocation.lat(),
			lng:newLocation.lng(),
			time:new Date().getTime()
		});
		
		g_polyline.setPath(g_route);
	}
	
	if(!g_marker.getPosition().equals(newLocation)){
		
		g_marker.setOptions({
			icon:getRotatedIcon(
				g_marker.getPosition(),
				newLocation
			)
		});
	}
	g_marker.setPosition(newLocation);
    // g_map.setCenter(newLocation);
	
	if(g_screen!=ScreenType.collection){
		g_map.setCenter(newLocation);
	}
}	