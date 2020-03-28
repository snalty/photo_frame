$(document).ready(function () {



  /* Assign on click values to objects f */
  $("#next_button").click(nextPhoto);
});

function nextPhoto() {
  var result;
  $.getJSON("http://192.168.1.76/api/next", function( data ) {
    result = data;
  });
  console.log('result');
}


function getCurrentPhoto() {

}

