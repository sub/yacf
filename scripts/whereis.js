function loader() {
    var state = document.readyState;

    if (typeof(localStorage) == 'undefined' ) {
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 

    if (state == 'loaded' || state == 'complete') {
	getLocationFromStore();
    } else {
        if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(getLocationFromStore, 250);
        } else {
	    document.addEventListener('deviceready',getLocationFromStore,false);
	}
    }
}

function getLocationFromStore(p) {
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
