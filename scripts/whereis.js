// steps = 0 => coming from whereis2.html
// steps = 1 => coming from whereis-text.html
function loader(method, steps) {
    var state = document.readyState;

    if (typeof(localStorage) == 'undefined' ) {
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 

    if (state == 'loaded' || state == 'complete') {
	method(steps);
    } else {
        if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(method(steps), 250);
        } else {
	    document.addEventListener('deviceready',method(steps),false);
	}
    }
}

function getLocationFromStore() {
    console.log("** getLocationFromStore");
    var gpsstore = new Lawnchair({table: 'mygps', adaptor: 'dom'});
    var to_lat;
    var to_long;
    // retrieve my data from my stores
    gpsstore.get('destination', function(r) {
        destination = r.value;
    });
    gpsstore.get('latitude', function(r) {
        to_lat = r.value; 
    });
    gpsstore.get('longitude', function(r) {
        to_long = r.value; 
    });

    $('.content').append(destination + "(lat: " + to_lat + ", long: " + to_long + ")");
    $('.content').append('<br /><a href="whereis2.html" rel="external">watch on map</a>');

}

var getLocation = function(steps) {
    console.log("getLocation");
    var suc = function(p) {
	initializeMap(p, steps);
    };
    var fail = function() {
	alert("NOT ABLE TO GET THE CURRENT POSITION");
    };
    navigator.geolocation.getCurrentPosition(suc,fail);
}

function initializeMap(p, steps) {
    console.log("initializeMap");
    var gpsstore = new Lawnchair({table: 'mygps', adaptor: 'dom'});
    var destination;
    var to_lat;
    var to_long;
    var fromLatLng;
    var toLatLng;
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var map;

    console.log("actual latitude " + p.coords.latitude);
    console.log("actual longitude " + p.coords.longitude);
    // retrieve my data from my stores
    gpsstore.get('destination', function(r) {
        destination = r.value;
	console.log("destination " + destination);
    });
    gpsstore.get('latitude', function(r) {
        to_lat = r.value; 
	console.log("to_lat " + to_lat);
    });
    gpsstore.get('longitude', function(r) {
        to_long = r.value;
	console.log("to_long " + to_long);
    });

    // ATTENTION!! fake pos!!
    //toLatLng = new google.maps.LatLng(to_lat, to_long);
    toLatLng = new google.maps.LatLng(to_lat+1, to_long-2);
    fromLatLng = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);
    console.log(fromLatLng);
    console.log(toLatLng);

    var request = {
	origin:fromLatLng, 
	destination:toLatLng,
	travelMode: google.maps.DirectionsTravelMode.DRIVING
	// WALKING, BICYCLING
    };

    directionsService.route(request, function(result, status) {
	console.log("waiting for google service");
	if (status == google.maps.DirectionsStatus.OK) {
	    console.log("google returned OK");
	    console.log(result);
	    directionsDisplay.setDirections(result);
	    if(steps) { 
		showSteps(result);
		return;
	    }
	}
    });

    var myOptions = {
	zoom:7,
	mapTypeId: google.maps.MapTypeId.ROADMAP,
    }
    
    map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    console.log(map);
    directionsDisplay.setMap(map);
}

function showSteps(directionResult) {
    var myRoute = directionResult.routes[0].legs[0];
    var newText;
    newText = "<li data-role=\"list-divider\">Total time</li>"
    newText += "<li>" + myRoute.duration.text + "</li>";
    newText += "<li data-role=\"list-divider\">FROM</li>"
    newText += "<li>" + myRoute.start_address + "</li>";
    
    newText += "<li data-role=\"list-divider\">Directions</li>"
    //TODO: paginate
    for (var i = 0; i < myRoute.steps.length; i++) {
	newText += "<li>" + i + " " + myRoute.steps[i].instructions;
	newText += " " + myRoute.steps[i].distance.text  + "</li>" ;
    }

    newText += "<li data-role=\"list-divider\">TO</li>"
    newText += "<li>" + myRoute.end_address + "</li>";
    $('.ui-listview').html(newText).listview("refresh");
}

