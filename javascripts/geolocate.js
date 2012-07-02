
    $(document).ready(function() {

        $('#findme').click(function() {
			//alert ("checking location!");
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(success, error);
            } else {
                error('Geolocation not supported');
            }
        });
    });

    function success(position) {
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
				console.log(addr);
				for (x = 0; x < addr.length; x++){
					types = addr[x].types;
					for (y=0; y<types.length; y++){
						if (types[y] == "locality")
							city = addr[x].long_name;
						else if (types[y] == "administrative_area_level_1")
							state = addr[x].short_name;
						else if (types[y] == "postal_code")
							zip = addr[x].short_name;
					}
				}
				$('#zip_search').val(zip);
				$('#lat_search').val(position.coords.latitude);
				$('#lng_search').val(position.coords.longitude);
				$('#addr_search').val(zip + " - " + city);
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
	