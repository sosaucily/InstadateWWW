function authAndShareToFacebook(isLoggedIn, message, url) {
	if (isLoggedIn) {
		window.plugins.shareKit.facebookConnect();
		window.plugins.shareKit.shareToFacebook(message, url);
	}
	else {
		window.plugins.shareKit.shareToFacebook(message, url);
	}
}

function authAndShareToTwitter(isLoggedIn, message, url) {
	if (isLoggedIn) {
		window.plugins.shareKit.twitterConnect();
		window.plugins.shareKit.shareToTwitter(message, url);
	}
	else {
		window.plugins.shareKit.shareToTwitter(message, url);
	}
}

function showSharingSheet(message, subject, body) {
	console.log("Running showSharingSheet function");
	var buttons = ["Share to Facebook", "Share to Twitter", "Share via Email", "Cancel"];
	var delegate = window.plugins.nativeControls.createActionSheet(buttons, null, 3, 3);
	delegate.onActionSheetDismissed = function(index)
	{
		switch(index) {
			case 0:
				console.log("Sharing to Facebook!");
				window.plugins.shareKit.isLoggedToFacebook(function(isLoggedIn) { authAndShareToFacebook(isLoggedIn, message, null); });
				console.log("Done");
				break;
			case 1:
				console.log("Sharing to Twitter!");
				window.plugins.shareKit.isLoggedToTwitter(function(isLoggedIn) { authAndShareToTwitter(isLoggedIn, message, null); });
				window.plugins.shareKit.shareToTwitter(message, url);
				console.log("Done");
				break;
			case 2:
				console.log("Sharing via Email!");
				window.plugins.shareKit.shareToMail(subject, body);
				console.log("Done");
				break;
			default:
				console.log("Cancelling sharing function");
		}
	};
	console.log("showSharingSheet function complete");
}

function onPhotoURISuccess() {
	alert('Successfully shared');
}

function onFail(mesage) {
	alert('Sharing failed with message: ' + message);
}

$(function() {
	$('#share_home_screen').click(function() {
		var message = "Test message from Instadate";
		var subject = "Check out this date!";
		var body = "I have shared a date with you, check it out!";
		showSharingSheet(message, subject, body);
	});
	$('#share_story_screen').click(function() {
		var message = "Test message from Instadate";
		var subject = "Check out this date!";
		var body = "I have shared a date with you, check it out!";
		showSharingSheet(message, subject, body);
	});
});