function loader() {
    var state = document.readyState;

    if (typeof(localStorage) == 'undefined' ) {
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 

    if (state == 'loaded' || state == 'complete') {
	getLocation();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(geoLocation, 250);
	} else {
	    document.addEventListener('deviceready',geoLocation,false);
	}
    }
}

var getLocation = function() {
    var suc = function(p) {
	parkIt(p);
    };
    var fail = function() {
	alert("NOT ABLE TO GET THE CURRENT POSITION");
    };
    navigator.geolocation.getCurrentPosition(suc,fail);
}

function parkIt(p) {
    try {
        // create my Lawnchair stores
        var gpsstore = new Lawnchair({table: 'mygps', adaptor: 'dom'});

        // save some data to my stores
        gpsstore.save({key:'destination', value:"home"});
        gpsstore.save({key:'latitude', value:p.coords.latitude});
        gpsstore.save({key:'longitude', value:p.coords.longitude});
	
	newtext = "Car parked @ lat " + p.coords.latitude + " long " + p.coords.longitude;
	$('.content').text(newtext);
    } catch (e) {
	if (e == QUOTA_EXCEEDED_ERR) {
	    alert('Quota exceeded!');
	}
    }
    
}
