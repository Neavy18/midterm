// require("dotenv").config();
// const express = require("express");
// const { append } = require("express/lib/response");
// const router = express.Router();
// const request = require("request");
// const parse = require("body-parser");

// // module.exports = () => {



// router.get("/films", (req, res) => {
//   const userInput = document.getElementById('#to-do-input').value;
//   console.log(userInput);
  // const apiURL = `http://www.omdbapi.com/?apikey=${process.env.filmsApiKey}&t=${userInput}`;
  // request(apiURL, function(error, response, body) {
  //   if (response.statusCode !== 200)
  //     return "this is an error -->", error, null;
  //   else {
  //     console.log(
  //       "THIS SHOULD BE THE JSON INFO----->:",
  //       JSON.parse(body).response
  //     );
  //   }
  // });
// });

// router.get("/films", (req, res) => {

//   const apiURL = `http://www.omdbapi.com/?apikey=${process.env.filmsApiKey}&t=${userInput}`;
//   request(apiURL, function(error, response, body) {
//     if (response.statusCode !== 200)
//       return "this is an error -->", error, null;
//     else {
//       console.log(
//         "THIS SHOULD BE THE JSON INFO----->:",
//         JSON.parse(body).response
//       );
//     }
//   });
// });
// return router;
// };

// router.get("/Books", (req, res) => {});

// router.get("/Products", (req, res) => {});

// router.get("/Restaurants", (req, res) => {});

// module.exports = router;
