var timer = "30" // timer in seconds to change photo
var photoList = [];
var index = 0;
var photoDiv;
var loadingDiv;
var hostname = location.hostname;

$(document).ready(function () {
    photoDiv = $("#photo");
    loadingDiv = $("#loading")
    photoDiv.focus()
    startSlideshow();
});

function startSlideshow() {
    update_photo_list()

    setInterval(update_photo_list, 60*60*1000);

    setTimeout(function() {
        loadingDiv.css("display", "none");
        next_picture();
    }, 3000);

    setInterval(next_picture, timer * 1000);

     $(document).keypress(function (e) { 
        if (e.which == 110) {
	    console.log("Keypress triggered next picture")
            next_picture()
        }
    });
}

function update_photo_list() {
    var json_url = "http://" + hostname + "/api/get_photos";
    $.getJSON(json_url, function (result) {
        if (result.length > 0) {
	   photoList = result
	}
        console.log(photoList)
    });
    index = 0;
}

function next_picture() {
    console.log(photoList)
    if (photoList.length != 0) {
	var img_url = "url(http://" + hostname + "/photos/" + photoList[index] + ")";
        photoDiv.css("background-image", img_url);
        console.log("Updating backend index to index number " + index + " and setting css-background value to " + img_url);
	var json_url = "http://" + hostname + "/api/update_active_photo?index=" + index + "&filename=" + photoList[index];
	console.log(json_url);
        $.getJSON(json_url, function( data ) {
	    console.log(data);
        });
	next_index();
	console.log("Preloading next image");
	var preload = new Image();
	preload.src = "http://" + hostname + "/photos/" + photoList[index + 1];
     }
}

function next_index() {
    if (index == photoList.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
}
