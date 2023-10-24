const express = require("express");

const router = express.Router();

const {getContacts,createContact,getContact,updateContact,deleteContact} = require('../contactController/contactController.js');
const validateToken = require("../middleware/validateTokenHandler.js");


//as some of the request have same route we can attach them together


router.use(validateToken);
router.route("/").get(getContacts).post(createContact)

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact)


module.exports = router;