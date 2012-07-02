$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
});

$(function() {
	$('#refreshButton').click(function() {
		console.log("Refresh!");
		$('#story_submit').click();
	})
});
	
var Story = {};
	
var initialize_story;

Story.chapter_ids = ["chapter_1","chapter_2","chapter_3"];
Story.map_loaded = [0,0,0];

initialize_story = function(options) {
	
	Story.current_story = options;
	console.log ("Testing Story Manager");
	console.log (Story.current_story);	

	Story.chapter_html = new Array(3);
	Story.chapter_details_html = new Array(3);
	
	for (chap = 0; chap < Story.chapter_ids.length; chap++)
	{
		curr_chap_data = Story.current_story.activities[chap];
		curr_id = Story.chapter_ids[chap];
		if (curr_chap_data.image_url == null) {
			curr_chap_data.image_url = document.baseURI + "/images/default-activity-icon.png";
		}
		
		click_phone = ""
		display_phone = ""
		try {
			if (curr_chap_data.phone != null ) {
				click_phone = curr_chap_data.phone.replace(/-/g,"").substr(2,curr_chap_data.phone.length-2);
				display_phone = "(" + click_phone.substring(0,3) + ") " + click_phone.substring(3,6) + "-" + click_phone.substring(6,10)
			}
		}
		catch(err){
			click_phone = "";
			display_phone = "";
		}

		display_address = curr_chap_data.address + ", " + curr_chap_data.city;
		if (display_address.length > 28)
			display_address = display_address.substring(0,25) + "..."; 

		business_name = curr_chap_data.name;
		if (business_name.length > 30)
			business_name = business_name.substring(0,27) + "...";

		source_category = curr_chap_data.source_category[0]
		if (source_category.length > 20)
			source_category = source_category.substring(0,17) + "...";

		var map_url = "http://maps.google.com/maps?q=" + curr_chap_data.latitude + "," + curr_chap_data.longitude
		

		var data = {
			id: chap+1,
			chapter_name: Story.chapter_ids[chap],
			category: curr_chap_data.category,
			image_url: curr_chap_data.image_url,
			business_name: business_name,
			source_category: source_category
		}
		$('#story_list').append(ich.chapter_html(data));
		data = {
			map_url: map_url,
			image_url: curr_chap_data.image_url,
			id: chap+1,
			chapter_name: Story.chapter_ids[chap],
			category: curr_chap_data.category,
			business_name: business_name,
			source_category: source_category,
			click_phone: click_phone,
			display_address: display_address,
			display_phone: display_phone,
			business_url: curr_chap_data.business_url
		}
		$('#story_list').append(ich.chapter_details_html(data));
		$('#' + curr_id + "_details").trigger("create");
	}
	
	$('#chapter_1').click (function() {
		$('#chapter_1_details').slideToggle('slow', function() {
		});
		getMapOnce(Story.current_story.activities[0].latitude,Story.current_story.activities[0].longitude, 1);
		collapse_all_but(1);
	});

	$('#chapter_2').click (function() {
		$('#chapter_2_details').slideToggle('slow', function() {
		});
		getMapOnce(Story.current_story.activities[1].latitude,Story.current_story.activities[1].longitude, 2);
		collapse_all_but(2);
	});

	$('#chapter_3').click (function() {	
		$('#chapter_3_details').slideToggle('slow', function() {
		});
		getMapOnce(Story.current_story.activities[2].latitude,Story.current_story.activities[2].longitude, 3);
		collapse_all_but(3);
	});

}

function getMapOnce(lat,lng,elem)
{
	if (Story.map_loaded[elem-1] == 0)
	{
		Story.map_loaded[elem-1] = 1;
		map_src = getMap(lat,lng,"themap" + elem);
		$('#themap' + elem).html('<img src="' + map_src + '" style="width:288px;height:87" />');
	}
}
function getMap(lat,lng, elementid)
{
	/*
	//This gets an interactive Google Map.
	var myOptions = {
	          center: new google.maps.LatLng(lat, lng),
	          zoom: 8,
	          mapTypeId: google.maps.MapTypeId.ROADMAP
	        };
    var map = new google.maps.Map(document.getElementById(elementid), myOptions);
	*/
	return ("http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=16&markers=color:blue%7Clabel:S%7C" + lat + "," + lng + "&size=576x174&sensor=false");
}

function collapse_all_but(chapter_elem)
{
	if ( $('#chapter_'+(chapter_elem)+'_arrow').attr('src').indexOf("down") > 0)
		$('#chapter_'+(chapter_elem)+'_arrow').attr('src',"images/right-arrow.png");
	else
		$('#chapter_'+(chapter_elem)+'_arrow').attr('src',"images/down-arrow.png");

	for(chap = 0; chap < Story.chapter_ids.length; chap++) {
		if (chap+1 != chapter_elem) {
			$('#' + Story.chapter_ids[chap]).slideToggle('slow');
			$('#chapter_'+(chap+1)+'_arrow').attr('src',"images/right-arrow.png");
		}
	}
}
$(function() {
	$('#story').live('pageshow',function(event, ui){
		console.log( "Loading Story List");
		$.mobile.showPageLoadingMsg();
	});
	/*$('#story').live('page',function(event, ui){
		console.log( "Finished Loading Story list");
		$.mobile.hidePageLoadingMsg();
	});*/
});

$(function() {
	$(document).on("click", "#story_submit", function() {
			var $this = $( this ),
				theme = $this.jqmData("theme") || $.mobile.loadingMessageTheme,
				msgText = $this.jqmData("msgtext") || $.mobile.loadingMessage,
				textonly = !!$this.jqmData("textonly");
			$.mobile.showPageLoadingMsg(theme, msgText, textonly);
		})

	$('#story_submit').click(function(click_event) {
		var location = $('#addr_search').val();
		var zip = $('#zip_search').val();

		valid_zip = /^\d{5}(-\d{4})?(?!-)$/

		if (location.match(valid_zip)==null){
			if (zip == "" || zip == null){
		  		alert("Please either enter a zip code or click the \"Near My\" button");
		  		click_event.preventDefault();
		  		return false;
		  	}
		}
		if (zip == "" || zip == null){
			$('#zip_search').val(location);
		}


		if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
			if (window.instadateConfig["data_server_url"].match(/InstadateIphone/)) {
				//Changing the backend URL because we're on an iphone or iphone simulator
				window.instadateConfig["data_server_url"] = "http://www.instadateapp.com/";
			}
		}
		console.log ("Getting data from backend url: " + window.instadateConfig["data_server_url"] + "story/create" );

		//$.mobile.showPageLoadingMsg();
		//Clear any existing data
		$('#story_list').html('');
		$.ajax({
		  type: 'post',
		  data: $("#story_form").serialize(),
		  success: function(data) {
			initialize_story(jQuery.parseJSON(data));
			$.mobile.hidePageLoadingMsg();
		  },
		  url: window.instadateConfig["data_server_url"] + "story/create"
		});
		return true;
	});
	$('#addr_search').click(function() {
		$('#addr_search').val("");
		$('#zip_search').val("");
		$('#lat_search').val("");
		$('#lng_search').val("");
	});
	
});