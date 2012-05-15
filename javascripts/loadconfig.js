if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/)) {
  //alert ("Device!");
  window.instadateConfig = {
  	data_server_url:"http://www.instadate.com/"
  }
} else {
  //alert ("Desktop Browser!"); //this is the browser
  window.instadateConfig = {
  	data_server_url:document.baseURI
  }
}