$(window).load(function() {    
    var state = document.readyState;
    
    if (typeof(localStorage) == 'undefined' ) {
	console.log("upgrade your browser");
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 
    
    if (state == 'loaded' || state == 'complete') {
	console.log("load completed, calling deleteLocation");
	deleteLocation();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(deleteLocation, 250);
	} else {
	    document.addEventListener('deviceready',deletetLocation,false);
	}
    }

});


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

function deleteLocation() {
    try {
        // create my Lawnchair stores
        var store = new Lawnchair({table: 'mygps', adaptor: 'dom'});
	var index;
	var position = {};

	store.get('index', function(r) {
	    if(r === null) {
		console.log("index undefined, exiting...");
		return;
	    } else {
		console.log(r);
		index = r.value;
	    }
	});

	$('#delete').click(function() {
	    console.log("DELETE button clicked");
	    store.remove('default');
	    console.log("maybe REMOVED");
	    $('ui-dialog').dialog('close');
        });

	window.location.pathname = 'index.html';

    } catch (e) {
	console.log("something wrong happened");
    }
}
