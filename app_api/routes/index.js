const express = require("express");
const router = express.Router();

const ctrlCalendar = require("../controllers/calendar");

router.get("/calendar/:yyyymm", ctrlCalendar.getCalendar);

module.exports = router;