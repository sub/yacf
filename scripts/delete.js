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

$.extend({
  getUrlVars: function(){
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getUrlVar: function(name){
    return $.getUrlVars()[name];
  },
  getParentUrlVars: function(){
    var vars = [], hash;
    var hashes = parent.window.location.href.slice(parent.window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  },
  getParentUrlVar: function(name){
    return $.getParentUrlVars()[name];
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
	var currentId = $.getUrlVar('id');
	
	if(currentId === undefined) {
	    console.log("id is undefined");
	} else {
	    if(currentId == 0) currentId = "default";
	}
	    
	$('#delete').click(function() {
	    //console.log("DELETE button clicked");
	    store.remove(currentId);
	    //console.log("maybe REMOVED" + currentId);
	    $('ui-dialog').dialog('close');
        });

	window.location.pathname = 'index.html';

    } catch (e) {
	console.log("something wrong happened");
    }
}
