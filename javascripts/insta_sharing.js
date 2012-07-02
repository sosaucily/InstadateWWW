function authAndShareToFacebook(isLoggedIn, message, url) {
	if (isLoggedIn) {
		window.plugins.nativeControls.facebookConnect();
		window.plugins.nativeControls.shareToFacebook(message, url);
	}
	else {
		window.plugins.nativeControls.shareToFacebook(message, url);
	}
}

function showSharingSheet() {
	console.log("Running showSharingSheet function");
	var buttons = ["Share to Facebook", "Share to Twitter", "Share via Email", "Cancel"];
	nativeControls = window.plugins.nativeControls;
	var delegate = nativeControls.createActionSheet(buttons, null, 3, 3);
	var message = "Test message from Instadate";
	var url = "http://www.instadateapp.com/testtest";
	var subject = "Check out this date!";
	var body = "I have shared a date with you, check it out!";
	delegate.onActionSheetDismissed = function(index)
	{
		switch(index) {
			case 0:
				console.log("Sharing to Facebook!");
				nativeControls.isLoggedToFacebook(function(isLoggedIn) { authAndShareToFacebook(isLoggedIn, message, url); });
				console.log("Done");
				break;
			case 1:
				console.log("Sharing to Twitter!");
				nativeControls.shareToTwitter(message, url);
				console.log("Done");
				break;
			case 2:
				console.log("Sharing via Email!");
				nativeControls.shareToMail(subject, body);
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
	$('#share_1').click(function() {
		showSharingSheet();
	});
});