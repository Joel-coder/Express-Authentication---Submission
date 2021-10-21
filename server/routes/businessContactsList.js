let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");

let ContactsList = require("../models/businessContactsList");

let listController = require("../controller/businessContactsList")
/* Read operation */

router.get("/", listController.displayContactList);


/*Create operation*/
router.get("/add", listController.displayAddList);
/* Processing the add Page */
router.post("/add", listController.processAddList);

/* display Update operation*/
router.get("/edit/:id", listController.displayUpdateList );

/* Processing the Update Page */
router.post("/edit/:id", listController.processUpdateList);

/*delete operation*/
router.get("/delete/:id", listController.processDeleteList);


module.exports = router;