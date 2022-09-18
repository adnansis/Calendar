var express = require('express');

var indexRouter = require('./routes/index');
var calendarRouter = require("./app_api/routes/");
var indexApi = require("./app_api/routes/index");
const cors = require('cors');

var app = express();

app.use(cors());
app.use('/', indexRouter);

module.exports = app;