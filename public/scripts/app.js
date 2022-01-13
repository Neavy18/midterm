// Client facing scripts here
// require("dotenv").config();

//Create actual item to be inserted in chosen table (i.e. "Harry Potter")

const createListItem = function(toDo) {
  const $listItem = $(`<li class="list-group-item">${toDo.name}</li>`);
  return $listItem;
};

const renderTables = function(toDos) {
  // console.log("Check out your toDos:", toDos);
  const newBookToDO = createListItem(toDos.books[toDos.books.length - 1]);

  // console.log("Check out your booksList:", newBookToDO);
  $("#booksList").append(newBookToDO);

  const newProductToDO = createListItem(toDos.products[toDos.products.length - 1]);
  // console.log("Check out your productsList:", newBookToDO);
  $("#productsList").append(newProductToDO);

  const newMoviesToDO = createListItem(toDos.movies[toDos.movies.length - 1]);
  // console.log("Check out your moviesList:", newMoviesToDO);
  $("#moviesList").append(newMoviesToDO);

  const newRestaurantsToDO = createListItem(toDos.restaurants[toDos.restaurants.length - 1]);
  // console.log("Check out your restaurantsList:", newRestaurantsToDO);
  $("#restaurantsList").append(newRestaurantsToDO);
};

//Shorthand version of ajax that is call
const loadTables = function() {
  $.get("/todos", function(data) {
    //create function to take db as parameter, so
    renderTables(data);
    // console.log({ data });
  });
};

$(document).ready(function() {
  let userInput = "";
  $(".categorysubmitter").click(function() {
    userInput = $("#to-do-input").val();

    if (!userInput.length) {
      // console.log("Text area is empty");
    }
    $.ajax({
      url: "/api/fetch/wolfram",
      method: "POST",
      data: { text: encodeURI(`${userInput}`) },
    }).then((res) => {
      const apiResponse = res;
      // console.log("this is apiResponse --->", apiResponse);
      if (!apiResponse.length) {
        // console.log("The API response from app.js $ajax request was empty!");
      }
      loadTables();
    });
  });
});
