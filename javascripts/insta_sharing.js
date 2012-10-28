function authAndShareToFacebook(isLoggedIn, message, url) {
	if (isLoggedIn) {
		window.plugins.shareKit.facebookConnect();
		window.plugins.shareKit.shareToFacebook(message + "http://" + url, null);
	}
	else {
		window.plugins.shareKit.shareToFacebook(message + "http://" + url, null);
	}
}

function authAndShareToTwitter(isLoggedIn, message, url) {
	if (isLoggedIn) {
		window.plugins.shareKit.twitterConnect();
		window.plugins.shareKit.shareToTwitter(message + url, null);
	}
	else {
		window.plugins.shareKit.shareToTwitter(message + url, null);
	}
}

function showSharingSheet(message, subject, body, url) {
	var buttons = ["Share to Facebook", "Share to Twitter", "Share via Email", "Cancel"];
	var delegate = window.plugins.nativeControls.createActionSheet(buttons, null, 3, 3);
	delegate.onActionSheetDismissed = function(index)
	{
		switch(index) {
			case 0:
				window.plugins.shareKit.isLoggedToFacebook(function(isLoggedIn) { authAndShareToFacebook(isLoggedIn, message, url); });
				break;
			case 1:
				window.plugins.shareKit.isLoggedToTwitter(function(isLoggedIn) { authAndShareToTwitter(isLoggedIn, message, url); });
				break;
			case 2:
				window.plugins.shareKit.shareToMail(subject, body + url);
				break;
			default:
		}
	};
}

function onPhotoURISuccess() {
	alert('Successfully shared');
}

function onFail(mesage) {
	alert('Sharing failed with message: ' + message);
}

$(function() {
	$('#share_story_screen').click(function() {
		var message = window.search_city + " is my Oyster - ";
		var subject = window.search_city + " is my Oyster";
		var body = "Check out what I just planned with Oyster - ";
		var url = "theoyster.me/stories/" + Story.current_story.story_id;
		showSharingSheet(message, subject, body, url);
	});
	$('#share_home_screen').click(function() {
		var message = "Check out Oyster, the best way to discover new things near you - ";
		var subject = "Check out Oyster";
		var body = "Oyster helps you find new and interesting things to do near you. Get it now - ";
		var url = "theoyster.me";
		showSharingSheet(message, subject, body, url);
	});
});