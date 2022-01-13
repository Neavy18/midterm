//import helper function
const { tableSorter } = require("./db/helpers");
const {
  insertResult,
  fetchToDoProducts,
  fetchToDoBooks,
  fetchToDoRestaurants,
  fetchToDoMovies,
} = require("./db/queries");

// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 30001;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const request = require("request-promise");
const parser = require("xml2json");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const { Router } = require("express");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
//const categoriesRoutes = require("./routes/categories");
//const { append } = require("express/lib/response");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// API ROUTES
// app.use("/", categoriesRoutes(db));

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.post("/api/fetch/wolfram", (req, res) => {
  const userInput = req.body.text;
  const options = {
    json: true,
    uri: `https://api.wolframalpha.com/v2/query?appid=39VL68-QT8V494VVW&input=${userInput}`,
  };
  request(options)
    .then((result) => {
      const xml = result;
      const options = {
        object: true,
      };
      const jsonFormatted = parser.toJson(xml, options);
      // console.log(typeof jsonFormatted);
      return jsonFormatted;
    })
    .then((jsonFormatted) => {
      // console.log(
      //   "this is the special string ---->",
      // );
      const formattedUserInput = userInput.split("%20").join(" ");
      // console.log("After format --->:", formattedUserInput);
      insertResult(
        formattedUserInput,
        tableSorter(jsonFormatted.queryresult.datatypes),
        db
      )
        //response should be the message we want to send
        .then((response) => res.send(response));
      console.log("checkout------>:", jsonFormatted.queryresult.datatypes);
    });
});

app.get("/", (req, res) => {
  const queryString = `
  SELECT * FROM to_do_lists
  `;
  db.query(queryString).then((data) => {
    return res.render("homepage", {toDos: data.rows});
  });
});

//route that will handle the rendering of the toDo lists.
app.get("/todos", (req, res) => {
  //This promise just runs x4 async functions to listen at same time

  Promise.all([
    fetchToDoBooks(db),
    fetchToDoProducts(db),
    fetchToDoMovies(db),
    fetchToDoRestaurants(db),
  ]).then((all) => {
    const tableData = {
      books: all[0],
      products: all[1],
      movies: all[2],
      restaurants: all[3],
    };

    // console.log("these should be your books:", all[0])
    // console.log("these should be your products:", all[1])
    // console.log("these should be your movies:", all[2])
    // console.log("these should be your restaurants:", all[3])
    return res.send(tableData);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
