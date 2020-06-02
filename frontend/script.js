var timer = "30" // timer in seconds to change photo
var photoList = [];
var index = 0;
var photoDiv;
var input;
var loadingDiv;
var hostname = location.hostname;

$(document).ready(function () {
    photoDiv = $("#photo");
    photoDiv.click( function() {
        console.log("fuck");
    });
    loadingDiv = $("#loading");
    //mouseClick();
    startSlideshow();
    setInterval( function () {
	mouseClick();
        console.log("Is doc focused:" + document.hasFocus());
    }, 1000);
});

// Function that does a mouse click because qt-webkit-kiosk seems dumb and doesnt seem to get focus straight away maybe?
function mouseClick() {
    var json_url = "http://" + hostname + "/api/mouseclick";
    $.getJSON(json_url, function( data ) {
	    console.log("clicking the mouse for reasons");
    });                                             
}

function startSlideshow() {
    update_photo_list()

    setInterval(update_photo_list, 60*60*1000);

    setTimeout(function() {
        loadingDiv.css("display", "none");
        next_picture();
    }, 3000);

    setInterval(next_picture, timer * 1000);

function update_photo_list() {
    var json_url = "http://" + hostname + "/api/get_photos";
    $.getJSON(json_url, function (result) {
        if (result.length > 0) {
	   photoList = result
	}
        console.log(photoList)
    });
    index = 0;
};

function next_picture() {
    console.log(photoList);
    if (photoList.length != 0) {
        change_photo();
        update_active_photo();
	    next_index();
     }
}

function change_photo() {
    var img_url = "url(http://" + hostname + "/photos/" + photoList[index] + ")";
    photoDiv.clone().prop('id', 'tempPhoto').css("z-index", 100).prependTo(photoDiv.parent());
    photoDiv.css("background-image", img_url);
    setTimeout(function () {
        console.log("Removing temporary cover image");
        $('#tempPhoto').remove();
    }, 5000)
}

function update_active_photo() {
    var json_url = "http://" + hostname + "/api/update_active_photo?index=" + index + "&filename=" + photoList[index];
    $.getJSON(json_url, function( data ) {
	    console.log("Updating active photo");
    });
}

function next_index() {
    if (index == photoList.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
}

$(document).keydown(function (e) {
	console.log(e.which);                                                                                                   if (e.which == 110) {                                                                                                       console.log("Keypress triggered next picture");                                                                         next_picture();                                                                                                     }                                                                                                                   });
};
