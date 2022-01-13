// Client facing scripts here
// require("dotenv").config();

//Create actual item to be inserted in chosen table (i.e. "Harry Potter")
const createListItem = function (toDo) {
  const $listItem = $(`<li class="list-group-item">
  <input type="checkbox" class="editButton" name="" id="${toDo.id}">
  ${toDo.name}
  </li>`);
  return $listItem;
};

//Function that handles deleting of listItem
// const deleteListItem = function(toDo) {

// };

// jquery listens for event, after event occurs,
// passback todo.id to backend, dbquery delete
//
const appendToDoToTable = function (toDo) {
  if (toDo.category_id === 1) {
    console.log("Check out your toDos--------->:", toDo);
    const newBookToDO = createListItem(toDo);
    $("#booksList").append(newBookToDO);
  }

  if (toDo.category_id === 2) {
    const newProductToDO = createListItem(toDo);
    // console.log("Check out your productsList:", newBookToDO);
    $("#productsList").append(newProductToDO);
  }

  if (toDo.category_id === 3) {
    const newMoviesToDO = createListItem(toDo);
    // console.log("Check out your moviesList:", newMoviesToDO);
    $("#moviesList").append(newMoviesToDO);
  }

  if (toDo.category_id === 4) {
    const newRestaurantsToDO = createListItem(toDo);
    // console.log("Check out your restaurantsList:", newRestaurantsToDO);
    $("#restaurantsList").append(newRestaurantsToDO);
  }
};

const renderTables = function (toDos) {
  // console.log("Check out your toDos--------->:", toDos);
  const newBookToDO = createListItem(toDos.books[toDos.books.length - 1]);
  $("#booksList").append(newBookToDO);

  // console.log("Check out your booksList:", newBookToDO);

  const newProductToDO = createListItem(
    toDos.products[toDos.products.length - 1]
  );
  // console.log("Check out your productsList:", newBookToDO);
  $("#productsList").append(newProductToDO);

  const newMoviesToDO = createListItem(toDos.movies[toDos.movies.length - 1]);
  // console.log("Check out your moviesList:", newMoviesToDO);
  $("#moviesList").append(newMoviesToDO);

  const newRestaurantsToDO = createListItem(
    toDos.restaurants[toDos.restaurants.length - 1]
  );
  // console.log("Check out your restaurantsList:", newRestaurantsToDO);
  $("#restaurantsList").append(newRestaurantsToDO);
};

//Shorthand version of ajax that is call
const loadTables = function () {
  $.get("/todos", function (data) {
    //create function to take db as parameter, so
    console.log("before renderTables Call ---->");

    renderTables(data);
    // console.log({ data });
  });
};

$(document).ready(function () {
  $(".categorysubmitter").click(function () {
    let userInput = "";
    userInput = $("#to-do-input").val();

    if (!userInput.length) {
      // console.log("Text area is empty");
    }
    $.ajax({
      url: "/api/fetch/wolfram",
      method: "POST",
      data: { text: encodeURI(`${userInput}`) },
    }).then((res) => {
      const newToDo = res;
      // console.log("this is apiResponse from ajax POST --->", newToDo);
      if (!newToDo.length) {
        // console.log("The API response from app.js $ajax request was empty!");
      }
      console.log("before loadTables Call ---->");
      appendToDoToTable(newToDo);
    });
  });
  $(".editButton").click(function (event) {
    console.log("This is your event response---->", event.target.id);
    $.ajax({
      url: "/completed",
      method: "POST",
      data: { id: event.target.id },
    }).then((response) => {
      if (response) {
        console.log("Please run ----->", response);
        $(this).parent().remove();
      }
    });
  });
});
