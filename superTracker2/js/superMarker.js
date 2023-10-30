function getRotatedIcon(oldPosition, newPosition) {
    var icon= {
		url: "images/sup1.png",
		anchor: new google.maps.Point(41, 13)
	};
	
	try{
		var bear = bearing(oldPosition, newPosition);
	}catch(err){
		// if no information about bearing, icon stays default
		return icon;
	}
	
    var offset = 22.5 + 270;
    bear += offset;
    bear = bear % 360;
	
    if (bear >= 45 && bear < 90) {
        icon = {
            url: "images/sup2.png",
            anchor: new google.maps.Point(30, 35)
        };
    } else if (bear >= 90 && bear < 135) {
        icon = {
            url: "images/sup3.png",
            anchor: new google.maps.Point(13, 41)
        };
    } else if (bear >= 135 && bear < 180) {
        icon = {
            url: "images/sup4.png",
            anchor: new google.maps.Point(30, 35)
        };
    } else if (bear >= 180 && bear < 225) {
        icon = {
            url: "images/sup5.png",
            anchor: new google.maps.Point(41, 13)
        };
    } else if (bear >= 225 && bear < 270) {
        icon = {
            url: "images/sup6.png",
            anchor: new google.maps.Point(35, 30)
        };
    } else if (bear >= 270 && bear < 315) {
        icon = {
            url: "images/sup7.png",
            anchor: new google.maps.Point(13, 41)
        };
    } else if (bear >= 315 && bear < 360) {
        icon = {
            url: "images/sup8.png",
            anchor: new google.maps.Point(35, 30)
        };
    }

	return icon;
}

function bearing(oldPosition, newPosition) {
    var longDiff = newPosition.lng() - oldPosition.lng();
    var y = Math.sin(longDiff) * Math.cos(newPosition.lat());
    var x = Math.cos(oldPosition.lat()) *
        Math.sin(newPosition.lat()) -
        Math.sin(oldPosition.lat()) *
        Math.cos(newPosition.lat()) *
        Math.cos(longDiff);

    return (radToDeg(Math.atan2(y, x)) + 360) % 360;
}

function radToDeg(angle) {
    return angle * (180 / Math.PI);
}