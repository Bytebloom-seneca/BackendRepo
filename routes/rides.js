const express = require("express");
const router = express.Router();
const { postRide, getRides } = require("../controllers/ridesController");

router.post("/", postRide);
router.get("/", getRides);

module.exports = router;
