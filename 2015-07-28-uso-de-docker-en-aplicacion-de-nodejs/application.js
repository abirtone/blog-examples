var express = require('express');
var winston = require('winston');
var app = express();

var port = process.env.PORT || 3000;


require('./config/express')(app);
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);
module.exports = app;
