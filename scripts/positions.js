$(window).load(function() {    
    var state = document.readyState;
    
    if (typeof(localStorage) == 'undefined' ) {
	console.log("upgrade your browser");
	alert('Upgrade your browser as it does not support HTML5 localStorage.');
    } 
    
    if (state == 'loaded' || state == 'complete') {
	//console.log("load completed, calling geoLocation");
	getPositions();
    } else {
	if (navigator.userAgent.indexOf('Browzr') > -1) {
	    //console.log("setting timeout for getPositions");
	    setTimeout(getPositions, 250);
	} else {
	    document.addEventListener('deviceready',getPositions,false);
	}
    }

});

var getPositions = function() {
    var store = new Lawnchair({table: 'mygps', adaptor: 'dom'});
    var newText;
    var results = 0;

    $(".result").hide();

    //newText = "<li data-role=\"list-divider\">Saved positions</li>"
    newText = "";

    store.each(function(r){
	results = 1;
	el = r.value;
	if(el.name !== undefined) {
	    newText += "<li id=\""+el.index+"\">" + el.name + "</li>";
	}
    });

    if(!results) newText += "<li>No saved positions, park your car first!</li>";
    newText += "</ul>";
    $('.ui-listview').html(newText).listview("refresh");

//    lis = $("li").get();
//    for (var i = 0; i < lis.length; i++) {
    if(results) {
	$("li").click(function() {
	    attr_value = $(this).attr("id");	     
	    window.location.pathname = "/whereis.html?id="+attr_value;
	});
	//    }
    }
}