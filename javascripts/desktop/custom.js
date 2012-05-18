/*-----------------------------------------------------------------------------------*/
/*	Start Custom jQuery
/*-----------------------------------------------------------------------------------*/

$(document).ready(function(){

/*-----------------------------------------------------------------------------------*/
/*	App Store Badge Glow
/*-----------------------------------------------------------------------------------*/
	
	$('p.app-store').fadeTo(0, .40, 0);
	
	$('p.app-store').mouseover(function(){
		
		$(this).fadeTo(9000, 100, 0);
		
	});
	
/*-----------------------------------------------------------------------------------*/
/*	Configure Slides and Feature List
/*-----------------------------------------------------------------------------------*/

	$('ul.features li.top-row').equalize('height');
	
	$('#slides').cycle({timeout:5000,pause:1});
	
/*-----------------------------------------------------------------------------------*/
/*	Tab & Panel Switches
/*-----------------------------------------------------------------------------------*/
	
	$('#tabs li').click(function(){
	
			// Get current and clicked panels
			var current = '#' + $('#tabs li.current').attr('data-panel');
			var clicked = '#' + $(this).attr('data-panel');

			// Toggle tabs
			$('#tabs li').removeClass('current');
			$(this).addClass('current');
			
			$(current).toggle(400, function(){
				$(clicked).toggle(400);				
			});
			
	});
	
/*-----------------------------------------------------------------------------------*/
/*	Thats all folks!
/*-----------------------------------------------------------------------------------*/

});