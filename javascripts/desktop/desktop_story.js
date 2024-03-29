
var Story = {};

var expanded;
	
var initialize_story;

var show_error;

show_error = function(error_message) {
	alert (jQuery.parseJSON(error_message)["error"]["message"]);
}

initialize_story = function(options) {
	Story.chapter_ids = ["chapter_1","chapter_2","chapter_3"];
	
	Story.map_loaded = [0,0,0];
	expanded = 0;
	
	Story.current_story = options;

	Story.chapter_html = new Array(3);
	Story.chapter_details_html = new Array(3);
	
	for (chap = 0; chap < Story.chapter_ids.length; chap++)
	{
		curr_chap_data = Story.current_story.activities[chap];
		curr_id = Story.chapter_ids[chap];
		try {
			if (curr_chap_data.image_url == null || curr_chap_data.image_url == "") {
				if (curr_chap_data.category_image_name != null) {
					curr_chap_data.image_url = "../images/story_pics/" + curr_chap_data.category_image_name;
				}
				else{
					curr_chap_data.image_url = "http://oyster.me/images/default-activity-icon.png";
					//BUG: Why pull this off the web instead of using local??	
				}
			}
		} catch (e)
		{
			console.log(e);
			console.log(curr_chap_data);
		}
		
		click_phone = ""
		display_phone = ""
		try {
			if (curr_chap_data.phone != null ) {
				click_phone = curr_chap_data.phone.replace(/-/g,"").substr(2,curr_chap_data.phone.length-2);
				display_phone = "(" + click_phone.substring(0,3) + ") " + click_phone.substring(3,6) + "-" + click_phone.substring(6,10);
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
			
		var api_image_url = "", api_image_class = "";
		switch(curr_chap_data.system)
		{
			case "yelp":
				api_image_class = "yelp_image";
				api_image_url = "../images/yelp_logo_100x50-2x.png"
				break;
			case "upcoming":
				api_image_class = "upcoming_image";
				api_image_url = "../images/upcoming_logo2.gif"
				break;
		}

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
			business_url: curr_chap_data.business_url,
			api_image_class: api_image_class,
			api_image_url: api_image_url
		}
		$('#story_list').append(ich.chapter_details_html(data));
		$('#' + curr_id + "_details").trigger("create");
	}
	
	getAllMapsOnce();
	
	$('#chapter_1').click (function() {
		if (expanded != 1) {
			expanded = 1;
			hide_then_expand(1, function() { $('#chapter_1_details').slideToggle(400); } );
			//getMapOnce(Story.current_story.activities[0].latitude,Story.current_story.activities[0].longitude, 1);
		}
		else {
			expanded = 0;
			$('#chapter_1_arrow').attr('src',"../images/right-arrow.png");
			$('#chapter_1_details').slideToggle(400, function() {
				$('#chapter_2').toggle(400); //toggle('fast');
				$('#chapter_3').toggle(400); //toggle('fast');
			} );
		}
	});

	$('#chapter_2').click (function() {
		if (expanded != 2) {
			expanded = 2;
			hide_then_expand(2, function() { $('#chapter_2_details').slideToggle(400); } );
			//getMapOnce(Story.current_story.activities[0].latitude,Story.current_story.activities[0].longitude, 2);
		}
		else {
			expanded = 0;
			$('#chapter_2_arrow').attr('src',"../images/right-arrow.png");
			$('#chapter_2_details').slideToggle(400, function() {
				$('#chapter_1').toggle(400); //toggle('fast');
				$('#chapter_3').toggle(400); //toggle('fast');
			} );
		}
	});

	$('#chapter_3').click (function() {
		if (expanded != 3) {
			expanded = 3;
			hide_then_expand(3, function() { $('#chapter_3_details').slideToggle(400); } );
			//getMapOnce(Story.current_story.activities[0].latitude,Story.current_story.activities[0].longitude, 3);
		}
		else {
			expanded = 0;
			$('#chapter_3_arrow').attr('src',"../images/right-arrow.png");
			$('#chapter_3_details').slideToggle(400, function() {
				$('#chapter_1').toggle(400); //toggle('fast');
				$('#chapter_2').toggle(400); //toggle('fast');
			} );
		}
	});
}


function hide_then_expand(chapter_elem, details_slide)
{
	$('#chapter_'+(chapter_elem)+'_arrow').attr('src',"../images/down-arrow.png");

	count = 0;
	for(chap = 0; chap < Story.chapter_ids.length; chap++) {
		if (chap+1 != chapter_elem) {
			count++;
			//$('#' + Story.chapter_ids[chap]).slideToggle('slow');
			if (count == 1)
				$('#' + Story.chapter_ids[chap]).toggle(400); //toggle('fast');
			else
				$('#' + Story.chapter_ids[chap]).toggle(400,details_slide); //.toggle('fast', details_slide);
			$('#chapter_'+(chap+1)+'_arrow').attr('src',"../images/right-arrow.png");
		}
	}
}

function getAllMapsOnce(lat,lng,elem)
{
	for(chap = 0; chap < Story.chapter_ids.length; chap++) {
		lat = Story.current_story.activities[chap].latitude;
		lng = Story.current_story.activities[chap].longitude;
		if (Story.map_loaded[chap] == 0)
		{
			Story.map_loaded[chap] = 1;
			map_src = getMap(lat,lng,"themap" + (chap+1) );
			$('#themap' + (chap+1)).html('<img src="' + map_src + '" style="width:300px;" />');
		}
	}
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
	return ("http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=17&markers=color:blue%7Clabel:S%7C" + lat + "," + lng + "&size=576x174&sensor=false");
}


