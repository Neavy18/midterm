// Client facing scripts here
// require("dotenv").config();

//
const createListItem = function(toDo) {
  const $listItem = $(`<li class="list-group-item">${toDo.name}</li>`);
  return $listItem;
};


const renderTables = function(toDos) {
  console.log("Check out your toDos:", toDos);
  const newBookToDO = createListItem(toDos.books[toDos.books.length - 1]);
  console.log("Check out your newbooktoDos:", newBookToDO);
  $("#booksList").append(newBookToDO);
};

//Shorthand version of ajax that is call
const loadTables = function() {
  $.get("/todos", function(data) {
    //create function to take db as parameter, so
    renderTables(data);
    console.log({ data });
  });
};

$(document).ready(function() {
  let userInput = "";
  $(".categorysubmitter").click(function() {
    userInput = $("#to-do-input").val();

    if (!userInput.length) {
      console.log("Text area is empty");
    }
    $.ajax({
      url: "/api/fetch/wolfram",
      method: "POST",
      data: { text: encodeURI(`${userInput}`) },
    }).then((res) => {
      const apiResponse = res;
      console.log("this is apiResponse --->", apiResponse);
      if (!apiResponse.length) {
        console.log("The API response from app.js $ajax request was empty!");
      }
      loadTables();
    });
  });
});
