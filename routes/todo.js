
require("dotenv").config();
const express = require("express");
const { append } = require("express/lib/response");
const router = express.Router();
const request = require("request");
const parse = require("body-parser");

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM to_do_lists;`)
      .then((data) => {
        const categories = data.rows;
        const templateVars = {categories};
        res.render("index", templateVars);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
  router.post("/", (req, res) => {

  });

  return router;
};
