let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let jwt = require("jsonwebtoken");

let passport = require("passport");

//let ContactsList = require("../models/businessContactsList");

let listController = require("../controller/businessContactsList");
/* Read operation */

// helper function for guard purposes
function requireAuth(req, res, next) {
  // check if the user is logged in
  if (!req.isAuthenticated()) {
    return res.redirect("/login");
  }
  next();
}

router.get("/", requireAuth, listController.displayContactList);

/*Create operation*/
router.get("/add", requireAuth, listController.displayAddList);
/* Processing the add Page */
router.post("/add", requireAuth, listController.processAddList);

/* display Update operation*/
router.get("/edit/:id", requireAuth, listController.displayUpdateList);

/* Processing the Update Page */
router.post("/edit/:id", requireAuth, listController.processUpdateList);

/*delete operation*/
router.get("/delete/:id", requireAuth, listController.processDeleteList);

module.exports = router;
