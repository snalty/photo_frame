var timer = "120" // timer in seconds to change photo
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

    setInterval(() => {
        update_photo_list()
    }, 60*60*1000 );

    setTimeout(() => {
        loadingDiv.css("display", "none");
        next_picture();
    }, 3000);

    setInterval(() => {
        next_picture()
     }, timer * 1000);

     $(document).keypress(function (e) { 
        if (e.which == 110) {
            next_picture()
        }
    });
}

function update_photo_list() {
    $.getJSON(`http://${hostname}/api/get_photos`, function (result) {
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
        photoDiv.css("background-image", `url(http://${hostname}/photos/${photoList[index]})`);
        console.log(`Updating backend index to ${index}`)
        $.getJSON(`http://${hostname}/api/update_active_photo?index=${index}&filename=${photoList[index]}`, function( data ) {
	    console.log(data);
        });
	next_index();    
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
