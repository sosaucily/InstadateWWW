
$(document).ready(function() {

    $('#findme').click(function() {
		//alert ("checking location!");
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(geo_success, error);
        } else {
            error('Geolocation not supported');
        }
    });
});

function auto_geo() {
	navigator.geolocation.getCurrentPosition(afterGeoSuccess, error);
}
	
function afterGeoSuccess(position) {
	if (typeof google === 'undefined') {
		
		dynamicallyReloadGoogle();		
		
		setTimeout(function() {			
			geo_success(position, submit_story);
		}, 2000);
	} else {
		geo_success(position, submit_story);
	}
}

function geo_success(position, callback) {
  //alert (google);
  var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
  geocoder = new google.maps.Geocoder();
  geocoder.geocode({'location':latlng},
    function(results, status) {
		if (status != "OK") {
			console.log ("Error retrieving geolocation - " + status);
			alert ("Error retrieving geolocation - " + status);
		}
		else {
			addr = results[0].address_components
			city = "", zip = "", state="";
			for (x = 0; x < addr.length; x++){
				types = addr[x].types;
				for (y=0; y<types.length; y++){
					if (types[y] == "locality") {
						city = addr[x].long_name;
						window.search_city = city;
					}
					else if (types[y] == "administrative_area_level_1")
						state = addr[x].short_name;
					else if (types[y] == "postal_code")
						zip = addr[x].short_name;
				}
			}
			$('#zip_search').val(zip);
			window.zip_search = zip;
			$('#lat_search').val(position.coords.latitude);
			window.lat_search = position.coords.latitude;
			$('#lng_search').val(position.coords.longitude);
			window.lat_search = position.coords.longitude;
			$('#addr_search').val(zip);
			// + " - " + city);
			window.addr_search = zip;
			// + " - " + city;
			$('#loading_city').html(window.city);
			$('#loading_city').hide().html(window.city).fadeIn(600);
		  	callback && callback();
		}
    }
  );
}

function updateCity() { //Get the city and fill it into #loading_city when complete
	geocoder.geocode({'address':window.addr_search},
    	function(results, status) {
			if (status != "OK") {
				console.log ("Error retrieving geolocation - " + status);
				alert ("Error retrieving geolocation - " + status);
			}
			else {
				addr = results[0].address_components
				city = "", zip = "", state="";
				for (x = 0; x < addr.length; x++){
					types = addr[x].types;
					for (y=0; y<types.length; y++){
						if (types[y] == "locality") {
							city = addr[x].long_name;
							window.search_city = city;
							$('#loading_city').html(city);
						}
						else if (types[y] == "administrative_area_level_1")
							state = addr[x].short_name;
						else if (types[y] == "postal_code")
							zip = addr[x].short_name;
					}
				}
			}
	    }
  	);
}
	
function error(msg) {
	  console.log(msg);
      var errMsg = typeof msg == 'string' ? msg : "Geolocation failed - Make sure you have your web browser enabled under Settings - Location Services";
      alert (errMsg);
	  //$('#msg').html(errMsg);
}

function onBodyLoad()
{		
	document.addEventListener('deviceready', function() {
		try {
			//Do something.. if you dare.
			if (!navigator.geolocation) {
				window.location.replace("#customize");
			}
			$.mobile.showPageLoadingMsg();
			custom_update_loading_image();
			auto_geo();
		} catch (e) {
			alert(e);
		}
		}, false);
	document.addEventListener("deviceready", onDeviceReady, false);
	
	//comment these 3 out for mobile, uncomment for desktop browser testing
	if (window.oysterDesktop) {
		$.mobile.showPageLoadingMsg();
		custom_update_loading_image();
		auto_geo();
	}
	
}
