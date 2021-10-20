let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let businessContactsList = require("../models/businessContactsList");

/* Reado operation */

router.get("/", (req, res, next) => {
  businessContactsList.find((err, businessContactsList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(businessContactsList);
      res.render("contactInfo", {
        title: "Information",
        businessContactsList: businessContactsList,
      });
    }
  });
});
module.exports = router;
