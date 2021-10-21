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
router.post("/add", (req, res, next) => {
  let newContact = ContactsList({
    "contact_name": req.body.contact_name,
    "contact_number": req.body.contact_number,
    "email": req.body.email
  });

  ContactsList.create(newContact, (err, newContact) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/contactInfo");
    }
  });
});

/* display Update operation*/
router.get("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  ContactsList.findById(id, (err,  businessContactsList) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("businessContactDetails/edit", {
        title: "Edit Contact Information",
        businessContactsList:  businessContactsList,
      });
    }
  });
});

/* Processing the Update Page */
router.post("/edit/:id", (req, res, next) => {
  let id = req.params.id;

  let updateContact = ContactsList({
    "_id": id,
    "contact_name": req.body.contact_name,
    "contact_number": req.body.contact_number,
    "email": req.body.email
  });

  ContactsList.updateOne({ _id: id }, updateContact, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      console.log(updateContact)
      res.redirect("/contactInfo");
      
    }
  });
});

/*delete operation*/
router.get("/delete/:id", (req, res, next) => {
  let id = req.params.id;
  ContactsList.remove({ _id: id }, (err) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      // refresh the book list
      res.redirect("/contactInfo");
    }
  });
});
