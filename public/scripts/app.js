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

    $.ajax({
      url: "/api/fetch/wolfram",
      method: "POST",
      data: { text: encodeURI(`${userInput}`) },
    }).then((res) => console.log("here ----->", res));
  });
});
