

var Story = {};
	
var initialize_story;

Story.chapter_ids = ["chapter_1","chapter_2","chapter_3"];
Story.map_loaded = [0,0,0];

initialize_story = function(options) {
	$('#story_list').html('');
	
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
			curr_chap_data.image_url = document.baseURI + "/assets/default-activity-icon.png";
		}
		img_html = "<img src=\"" + curr_chap_data.image_url + "\" alt=\"pic\"></img>";
		Story.chapter_html[chap] = "<div id=\"" + Story.chapter_ids[chap] + "\" class=\"activity activity-" + curr_chap_data.category + "-evening\"><div class=\"chapter ui-corner-all\" ><table><tr><td><span id=\"" + curr_id + "_img\">" + img_html + "</span></td><td columnwidth=\"2\"><span id=\"" + curr_id + "\"><div class=\"meta\" ><div class=\"chapter-header\"><strong>Chapter " + (chap+1) + ": " + curr_chap_data.category + "</strong></div><div class=\"chapter-details\"><strong>" + curr_chap_data.name + "</strong><br/>" + curr_chap_data.source_category[0] + "</div></div></span></td></tr></table></div></div>";
		Story.chapter_details_html[chap] =   "<div id=\"" + curr_id + "_details\" style=\"display:none;\">	<!-- Map -->    <br /><div class=\"map_container\" style=\"margin-bottom: 25px;\">        <div class=\"the_map\" id=\"themap" + (chap+1) + "\"></div>    </div><!--END OF: Map -->	<!-- Address and Phone -->    <ul data-role=\"listview\" data-theme=\"a\" data-inset=\"true\">        <li><img src=\"assets/pin.png\" alt=\"Location\" class=\"ui-li-icon\"><span id=\"" + curr_id + "_addr\">" + curr_chap_data.address + ", " + curr_chap_data.city + "</span></li>        <li><img src=\"assets/phone.png\" alt=\"Phone\" class=\"ui-li-icon\"><span id=\"" + curr_id + "_phone\">" + curr_chap_data.phone + "</span></li>    </ul>  <br /><!-- END OF: Address and Phone --></div>";
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
	return ("http://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=15&markers=color:blue%7Clabel:S%7C" + lat + "," + lng + "&size=287x100&sensor=false");
}

function collapse_all_but(chapter_elem)
{
	for(chap = 0; chap < Story.chapter_ids.length; chap++)
	if (chap+1 != chapter_elem) {
		$('#' + Story.chapter_ids[chap]).slideToggle('slow');
	}
}