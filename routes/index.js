var express = require('express');
var router = express.Router();

const ctrlCalendar = require("../app_api/controllers/calendar");

/* GET users listing. */
router.get("/calendar/:yyyymm", ctrlCalendar.getCalendar);

module.exports = router;