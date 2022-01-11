const { request, response } = require("express");

if (response.body.datatype === 'Books') {
  `INSERT INTO categories {request.body.text, 1}`
}
