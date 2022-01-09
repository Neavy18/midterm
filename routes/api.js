require("dotenv").config();
const express = require('express');
const router  = express.Router();
const request = require("request");

const userInput = '';

module.exports = () => {
  router.get("/Films", (req, res) => {
    const apiURL = `http://www.omdbapi.com/?apikey=${process.env.filmsApiKey}&t=${userInput}`;
    request(apiURL, function (error, response, body) {
      console.log();
    });
  });
  return router;
};


//sample code
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});
