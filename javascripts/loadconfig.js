if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  //alert ("Device!");
  window.oysterConfig = {
  	data_server_url:document.baseURI
  }
} else {
  //alert ("Desktop Browser!"); //this is the browser
  window.oysterConfig = {
  	data_server_url:document.baseURI
  }
}