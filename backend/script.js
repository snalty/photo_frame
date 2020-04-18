const hostname = location.hostname;

$(document).ready(function () {
  updateCurrentPhoto();


  /* Assign on click values to objects f */
  $("#next_button").click(nextPhoto);
});

function nextPhoto() {
  var result;
  $.getJSON(`http://${hostname}/api/next`, function( data ) {
    result = data;
    setTimeout(updateCurrentPhoto, 250);
  });
}


function updateCurrentPhoto() {
  console.log("Updating photo in preview");
  $("#frame_loading").hide();
  $.getJSON(`http://${hostname}/api/get_active_photo`, function( data ) {
    $("#frame").css("background-image", `url(http://${hostname}/photos/${data['filename']}`);
  });
}

