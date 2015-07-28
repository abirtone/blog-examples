var express = require('express');
var session = require('express-session');
var validator = require('express-validator');
var compression = require('compression');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var pkg = require('../package.json');
var winston = require('winston');
var fs = require('fs');

//Both way to read environment variables are the same.
var mongoHost = process.env.MONGO_1_PORT_27017_TCP_ADDR || 'localhost';
var mongoPort = process.env['MONGO_1_PORT_27017_TCP_PORT'] || '27017';

mongoose.connect('mongodb://'+mongoHost+':'+mongoPort+'/it-blogs');


var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}


module.exports = function (app) {
    if(process.env.NODE_ENV == 'prod'){
      var logStream = fs.createWriteStream(process.env.LOGS_DIR + '/abirtone-blog-agenda-api.log',{flags: 'a'});
      app.use(logger('combined', { skip: function(req, res) { return res.statusCode < 400 }, stream:  logStream}));
    }else{
      app.use(logger('dev'));
    }
    app.use(compression({
        threshold: 512
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(validator());
    app.use(allowCrossDomain);


};
