// Client facing scripts here
// require("dotenv").config();

$(document).ready(function () {
  let userInput = "";
  $(".categorysubmitter").click(function () {
    userInput = $("#to-do-input").val();

    if (!userInput.length) {
      console.log("Text area is empty");
    }
    $.ajax({
      url:"/api/fetch/wolfram",
      method:"POST",
      data:{text:encodeURI(`${userInput}`)}
      })
      .then(res => {
        const apiResponse = res
        console.log("this is apiResponse --->", apiResponse);
        if(!apiResponse.length) {
          console.log("The API response from app.js $ajax request was empty!")
        }

      })
    });
  });
