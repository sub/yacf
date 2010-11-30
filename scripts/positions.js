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
//	    newText += "<li><a href=\"whereis2.html?id="+el.index+"\" rel=\"external\">" + el.name + "</a></li>";
	    newText += "<li id=\""+el.index+"\">" + el.name + "</li>";
	}
    });

    newText += "</ul>";
    $('.ui-listview').html(newText).listview("refresh");

//    lis = $("li").get();
//    for (var i = 0; i < lis.length; i++) {
    $("li").click(function() {
	attr_value = $(this).attr("id");	     
	window.location.pathname = "/whereis2.html?id="+attr_value;
	// $.get('whereis4.html', { id: attr_value }, function(data) {
	// 	$('.content').html(data);
	// 	console.log("attr value " + attr_value);
	// });
    });
    //    }

}