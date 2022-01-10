// Client facing scripts here
// require("dotenv").config();

$(document).ready(function () {
  let userInput = "";
  $(".categorysubmitter").click(function () {
    userInput = $("#to-do-input").val();
    console.log(userInput);
    if (!userInput.length) {
      console.log("Text area is empty");
    }
    // API FOR FILMS
    // $.getJSON(
    //   `http://www.omdbapi.com/?apikey=55a0316c&t=${userInput}`,
    //   function (data) {
    //     console.log(data);
    //   }
    // );
    //API FOR BOOKS
    // $.getJSON(
    //   `https://www.googleapis.com/books/v1/volumes?q=${userInput}&key=AIzaSyAUm046-kSn4kSG-RWw1-EymDpGe7qNQM0`,
    //   function(data) {
    //     console.log(data.items[0].volumeInfo.title);
    //   }
    // );
    $.getJSON(
      `https://maps.googleapis.com/maps/api/place/findplacefromtext/json
    ?fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry
    &input=${userInput}
    &inputtype=textquery
    &key=AIzaSyAUm046-kSn4kSG-RWw1-EymDpGe7qNQM0`,
      function (data) {
        console.log(data);
      }
    );

    // $.getJSON(`http://api.wolframalpha.com/v1/simple?appid=39VL68-QT8V494VVW&i=${userInput}`, function(data) {
    //   console.log(data);
    // });
  });
});

// http://api.wolframalpha.com/v1/simple?appid=DEMO&i=What+airplanes+are+flying+overhead%3F
//google restaurant key AIzaSyCKMXffRd9J0RGo2hE6V8u1DKFmhXuI3Wg
// google book key AIzaSyA8B6qPrVpirwR5Qtl0IQ8AnbZUSjTGSM0
// google map key AIzaSyAUm046-kSn4kSG-RWw1-EymDpGe7qNQM0

//google book key on mandg@gmail.com account AIzaSyAUm046-kSn4kSG-RWw1-EymDpGe7qNQM0
