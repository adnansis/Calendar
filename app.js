var express = require('express');

var indexRouter = require('./app_api/routes/index');
const cors = require('cors');

var app = express();

app.use(cors());
app.use('/', indexRouter);

module.exports = app;