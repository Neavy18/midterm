// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 30001;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require('body-parser');

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

const request = require("request-promise");
const parser = require("xml2json");

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
 
  const options = {
    json: true,
    uri: `https://api.wolframalpha.com/v2/query?appid=39VL68-QT8V494VVW&input=${req.body.text}`
  };
  request(options)
    .then((result) => {
      const xml = result;
      const options = {
        object: true
      }
      const jsonFormatted = parser.toJson(xml, options);
      console.log(typeof(jsonFormatted));
      return jsonFormatted;
    })
    .then((jsonFormatted) => res.send(jsonFormatted.queryresult.datatypes));

});

app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
