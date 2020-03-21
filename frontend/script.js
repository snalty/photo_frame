var timer = "5" // timer in seconds to change photo

$(document).ready(function () {
   startSlideshow();
});

async function getPhotoList() {
    var photoList = await $.ajax({
        type: "method",
        url: "localhost:5000/api/get_photos",
        dataType: "json",
    }); 

    return photoList
}

function startSlideshow() {
    var photoDiv = $("#photo")
    setInterval(() => {
        var photoList = await getPhotoList();
        var index = 0;
    }, 60 * 60 * 1000);

    setInterval(() => {
        photoDiv.css("background-image", `url(http://localhost:3011/photos/${photoList[index]})`)
    }, timer * 1000);


}