var express = require('express');
var app = express();

const status = require('./status');
const document = require('./docPulseRoutes');

app.use('/', status);
app.use('/document',document)

module.exports = app;
