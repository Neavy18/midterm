// Client facing scripts here
// require("dotenv").config();

$(document).ready(function() {
  let userInput = "";
  $(".categorysubmitter").click(function() {
    userInput = $("#to-do-input").val();
    console.log(userInput);
    if (!userInput.length) {
      console.log("Text area is empty");
    }
    // this is for the film API :)
    $.getJSON(`http://www.omdbapi.com/?apikey=${process.env.filmsApiKey}&t=${userInput}`, function(data) {
      console.log(data);
    });
    // $.getJSON(`http://api.wolframalpha.com/v1/simple?appid=39VL68-QT8V494VVW&i=${userInput}`, function(data) {
    //   console.log(data);
    // });
  });
});

// http://api.wolframalpha.com/v1/simple?appid=DEMO&i=What+airplanes+are+flying+overhead%3F
