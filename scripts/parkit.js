$(window).load(function() {    
    var state = document.readyState;
    
    if (typeof(localStorage) == 'undefined' ) {
	console.log("upgrade your browser");
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 
    
    if (state == 'loaded' || state == 'complete') {
	console.log("load completed, calling geoLocation");
	getLocation();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(getLocation, 250);
	} else {
	    document.addEventListener('deviceready',getLocation,false);
	}
    }

});


var getLocation = function() {
    var suc = function(p) {
	parkIt(p);
    };
    var fail = function() {
	console.log("not able to get the current position");
	alert("NOT ABLE TO GET THE CURRENT POSITION");
    };
    navigator.geolocation.getCurrentPosition(suc,fail);
}

var getStoreIndex = function(store) {
//    var gpsstore = new Lawnchair({table: 'mygps', adaptor: 'dom'});
    var result;
    store.get('index', function(r) {
	if(r === null) {
	    console.log("index undefined, initializing...");
	    result = 0;
	    console.log(result);
	    store.save({key:'index', value:result});
	    return result;
	} else {
	    console.log(r);
	    result = r.value;
	    console.log("result value = " + result);
	    return result;
	}
	return result;
    });
}

function parkIt(p) {
    try {
        // create my Lawnchair stores
        var gpsstore = new Lawnchair({table: 'mygps', adaptor: 'dom'});
	var index;
	var position = {};

	gpsstore.get('index', function(r) {
	    if(r === null) {
		console.log("index undefined, initializing...");
		index = 0;
		gpsstore.save({key:'index', value:index});
	    } else {
		console.log(r);
		index = r.value;
	    }
	});

	position.index = index;
	position.name = 'Last Saved';
	position.latitude = p.coords.latitude;
	position.longitude = p.coords.longitude;
	gpsstore.save({key:'default', value:position});

	index = parseInt(index) + 1;
	gpsstore.save({key:'index', value:index});

        // gpsstore.save({key:'destination', value:"home"});

//	newtext = "Car parked";
	newtext = "Car parked @ lat " + p.coords.latitude + " long " + p.coords.longitude;

	$('#result').text(newtext);
	$('#result').append("<div id=\"save\"><a href=\"#\">Give a name to this position</a></div>");

	//$("#save").button();
	$('#save').click(function() {
	    $('#save').hide();
            $('.saving').show("slow");
	    //$("button").button();
	    $("a").button();
        });

	$(".savingButton" ).click(function() {
	    position = $("input").val();
	    position_with_name = {};
	    position_with_name.index = index;
	    position_with_name.name = position;
	    position_with_name.latitude = p.coords.latitude;
	    position_with_name.longitude = p.coords.longitude;
	    gpsstore.save({key:index, value:position_with_name});

	    // gpsstore.save({key:'destination', value:position});
	    $('.saving').hide("slow");
	    $('#result').append("<br />Position saved as " + position);
	});
    } catch (e) {
	if (e == QUOTA_EXCEEDED_ERR) {
	    alert('Quota exceeded!');
	}
    }
    
}
