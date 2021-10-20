let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let ContactsList = require("../models/businessContactsList");

/* Read operation */

router.get("/", (req, res, next) => {
  ContactsList.find((err, businessContactsList) => {
    if (err) {
      return console.error(err);
    } else {
      console.log(businessContactsList);
      res.render("businessContactDetails/contactInfo", {
        title: "Contact Information",
        businessContactsList: businessContactsList,
      });
    }
  });
});
module.exports = router;

/*Create operation*/
router.get("/add", (req, res, next) => {
  res.render("businessContactDetails/add", {
    title: "Add contact",
  });
});
/* Processing the add Page */
router.get("/add", (req, res, next) => {
  let newContact = ContactsList({
    contact_name: req.body.contact_name,
    contact_number: req.body.contact_number,
    email: req.body.body.email,
  });

  ContactsList.create(newContact, (err, newContact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/businessContactsList");
    }
  });
});

/*Update operation*/
router.get("/edit/:id", (req, res, next) => {});

/* Processing the Update Page */
router.post("/edit/:id", (req, res, next) => {});

/*delete operation*/
router.get("/delete/:id", (req, res, next) => {});
