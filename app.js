var express = require('express');

var indexRouter = require('./routes/index');
var calendarRouter = require("./app_api/routes/");
var indexApi = require("./app_api/routes/index");

var app = express();

app.use('/', indexRouter);

module.exports = app;