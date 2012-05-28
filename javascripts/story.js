$( document ).bind( 'mobileinit', function(){
  $.mobile.loader.prototype.options.text = "loading";
  $.mobile.loader.prototype.options.textVisible = false;
  $.mobile.loader.prototype.options.theme = "a";
  $.mobile.loader.prototype.options.html = "";
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
		display_address = display_address.substring(0,35); 

		business_name = curr_chap_data.name.substring(0,30);
		source_category = curr_chap_data.source_category[0].substring(0,20);

		map_url = "http://maps.google.com/maps?q=" + curr_chap_data.latitude + "," + curr_chap_data.longitude

		img_html = "<img src=\"" + curr_chap_data.image_url + "\" alt=\"pic\"></img>";
		Story.chapter_html[chap] = "<div id=\"" + Story.chapter_ids[chap] + "\" class=\"activity activity-" + curr_chap_data.category + "-evening\"><div class=\"chapter ui-corner-all\" ><table><tr><td><span id=\"" + curr_id + "_img\">" + img_html + "</span></td><td columnwidth=\"2\"><span id=\"" + curr_id + "\"><div class=\"meta\" ><div class=\"chapter-header\"><strong>Chapter " + (chap+1) + ": " + curr_chap_data.category + "</strong></div><div class=\"chapter-details\"><strong>" + business_name + "</strong><br/>" + source_category + "</div></div></span></td></tr></table></div></div>";
		Story.chapter_details_html[chap] =   "<div id=\"" + curr_id + "_details\" style=\"display:none;margin: 10px 10px 10px 10px\">	<!-- Map -->    <div class=\"map_container\" style=\"margin-bottom: 10px;\">        <div class=\"the_map\" id=\"themap" + (chap+1) + "\"></div>    </div><!--END OF: Map -->	<!-- Address and Phone -->";
		Story.chapter_details_html[chap] += "<ul data-role=\"listview\" data-theme=\"a\" data-mini=\"true\" data-inset=\"true\">";
		Story.chapter_details_html[chap] += "<li><img src=\"images/pin.png\" alt=\"Location\" class=\"ui-li-icon\"><span id=\"" + curr_id + "_addr\"><a class=\"addr_link\" href=\"" + map_url + "\" target=\"_blank\">" + display_address + "</a></span></li>";
		Story.chapter_details_html[chap] += "<li><img src=\"images/phone.png\" alt=\"Phone\" class=\"ui-li-icon\"><span id=\"" + curr_id + "_phone\"><a class=\"phone_link\" href=\"tel:" +click_phone+ "\">" + display_phone + "</a></span></li>";
		Story.chapter_details_html[chap] += "<li><img src=\"images/info.png\" alt=\"Yelp\" class=\"ui-li-icon\"><span id=\"" + curr_id + "_api\"><a class=\"api_link\" href=\"" +curr_chap_data.business_url+ "\">More details</a></span><div style=\"margin:0 0 0 10px;display:inline-block;\"><a href=\"" +curr_chap_data.business_url+ "\"><img src=\"images/yelp_logo_30.png\" style=\"margin:-6px 0 -10px 0px;\" /></a></div></li>";
		Story.chapter_details_html[chap] += "</ul>  <!-- END OF: Address and Phone --></div>";
		$('#story_list').append(Story.chapter_html[chap]);
		$('#story_list').append(Story.chapter_details_html[chap]);
		$('#' + curr_id + "_details").trigger("create");

	}
	
	$('#chapter_1').click (function() {
		getMapOnce(Story.current_story.activities[0].latitude,Story.current_story.activities[0].longitude, 1);
		collapse_all_but(1);
		$('#chapter_1_details').slideToggle('slow', function() {
		});
	});

	$('#chapter_2').click (function() {
		getMapOnce(Story.current_story.activities[1].latitude,Story.current_story.activities[1].longitude, 2);
		collapse_all_but(2);
		$('#chapter_2_details').slideToggle('slow', function() {
		});
	});

	$('#chapter_3').click (function() {
		getMapOnce(Story.current_story.activities[2].latitude,Story.current_story.activities[2].longitude, 3);
		collapse_all_but(3);
		$('#chapter_3_details').slideToggle('slow', function() {
		});
	});

}
function getMapOnce(lat,lng,elem)
{
	if (Story.map_loaded[elem-1] == 0)
	{
		Story.map_loaded[elem-1] = 1;
		map_src = getMap(lat,lng,"themap" + elem);
		$('#themap' + elem).html('<img src="' + map_src + '" />');
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
	return ("http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=15&markers=color:blue%7Clabel:S%7C" + lat + "," + lng + "&size=288x87&sensor=false");
}

function collapse_all_but(chapter_elem)
{
	for(chap = 0; chap < Story.chapter_ids.length; chap++)
	if (chap+1 != chapter_elem) {
		$('#' + Story.chapter_ids[chap]).slideToggle('slow');
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