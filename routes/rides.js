const express = require("express");
const router = express.Router();


const { postRide, getRides } = require("../controllers/ridesController");
const { matchRides } = require("../controllers/ridesController");
const verifyToken = require("../middleware/verifyToken");

//router.post("/", verifyToken, postRide);  // 🛡️ Secure route
router.post("/", postRide); // TEMPORARY ONLY
router.get("/", getRides);
//router.post("/match", verifyToken, matchRides); //Secure
router.post("/match", matchRides); //TEMPORARY ONLY


module.exports = router;
