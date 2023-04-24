const express = require("express");
const router = express.Router(); //this creates express router
const Thing = require("../models/thing");
const stuffCtrl = require("../controllers/sauce")

router.post("/", stuffCtrl.createThing);
router.get("/", stuffCtrl.getAllThings);
router.get("/:id", stuffCtrl.getOneThing);
router.put("/:id",stuffCtrl.modifyThing);
router.delete("/:id", stuffCtrl.deleteThing);

module.exports = router;
exports.getOneThing
