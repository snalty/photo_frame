var timer = "30" // timer in seconds to change photo
var photoList = [];
var index = 0;
var photoDiv;
var input;
var loadingDiv;
var hostname = location.hostname;

var socket = io('ws://127.0.0.1:5000/');
socket.connect();

function photo_listener() {
    // Listen for message called 
    socket.on('photos', function(msg) {
        photoList = JSON.parse(msg);
    })
};

function next_listener() {
    socket.on('next', function() {
        console.log('API instructed next photo')
        neSSxt_picture();
    })
};

photo_listener();
next_listener();

$(document).ready(function () {
    photoDiv = $("#photo");
    loadingDiv = $("#loading");
    startSlideshow();
});

function startSlideshow() {
    setInterval(update_photo_list, 60*60*1000);

    setTimeout(function() {
        loadingDiv.css("display", "none");
        next_picture();
    }, 3000);

    setInterval(next_picture, timer * 1000);
}

function update_photo_list() {
    socket.emit('get_photos', function(msg) {
        print(msg)
        photoList = JSON.parse(msg);
    })
    index = 0;
};

function next_picture() {
    console.log(photoList);
    if (photoList.length != 0) {
        change_photo();
//        update_active_photo();
	    next_index();
     }
}

function change_photo() {
//    var img_url = "url(http://" + hostname + "/photos/" + photoList[index] + ")";
    var img_url = "url(file:///C:/Users/Sam/photo_frame/photos/" + photoList[index] + ")";
    photoDiv.css("background-image", img_url);
}

// function update_active_photo() {
//     var json_url = "http://" + hostname + "/api/update_active_photo?index=" + index + "&filename=" + photoList[index];
//     $.getJSON(json_url, function( data ) {
// 	    console.log("Updating active photo");
//     });
// }

function next_index() {
    if (index == photoList.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
}