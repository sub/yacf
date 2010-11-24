console.log("positions.js code included");

$(window).load(function() {    
    console.log("positions load function");
    var state = document.readyState;
    
    if (typeof(localStorage) == 'undefined' ) {
	console.log("upgrade your browser");
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 
    
    if (state == 'loaded' || state == 'complete') {
	console.log("load completed, calling geoLocation");
	getPositions();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    console.log("setting timeout for getPositions");
	    setTimeout(getPositions, 250);
	} else {
	    console.log("else");
	    document.addEventListener('deviceready',getPositions,false);
	}
    }

});

var getPositions = function() {
    console.log("in - getPositions function");

    var store = new Lawnchair({table: 'mygps', adaptor: 'dom'});
    var newText;

    // default o conome
    // store.get('default', function(r) {
    // 	console.log(r);
    // 	console.log(r.value.name);
    // });

    $(".result").hide();

    newText = "<li data-role=\"list-divider\">Saved positions</li>"

    store.each(function(r){
	el = r.value;
	if(el.name !== undefined) {
	    console.log(el.name);
	    newText += "<li><a href=\"whereis2.html?id="+el.index+"\" rel=\"external\">" + el.name + "</a></li>";
	}
    });

    newText += "</ul>";
    $('.ui-listview').html(newText).listview("refresh");

}