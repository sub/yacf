$(window).load(function() {    
    var state = document.readyState;
    
    if (typeof(localStorage) == 'undefined' ) {
	console.log("upgrade your browser");
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 
    
    if (state == 'loaded' || state == 'complete') {
	console.log("load completed, calling nuke");
	nuke();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    setTimeout(nuke, 250);
	} else {
	    document.addEventListener('deviceready',nuke,false);
	}
    }

});

function nuke() {
    try {
        // create my Lawnchair stores
        var store = new Lawnchair({table: 'mygps', adaptor: 'dom'});
	store.nuke();
	$('#result').html("NUKED!");
    } catch (e) {
	console.log("something wrong happened");
    }
}
