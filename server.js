var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var cors = require('cors');
var helmet = require('helmet');
var config = require('./app/config');
var https = require('https');
var fs = require('fs');
var tls = require('tls');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());
app.use(helmet());


app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    // Set custom headers for CORS
    res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
    if (req.method == 'OPTIONS') {
        res.status(200).end();
    } else {
        next();
    }
});

// REGISTER OUR ROUTES -------------------------------
app.use('/', require('./app/routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


mongoose.connect(config.MONGODBSERVER, function(err, res) {
    if (err) {
        console.log('ERROR: connecting to Database. ' + err);
    }
});


//start server
var options = {
    key: fs.readFileSync(__dirname + '/app/config/ssl/client1-key.pem'),
    cert: fs.readFileSync(__dirname + '/app/config/ssl/client1-crt.pem')
};
/* https.createServer(options, app).listen(3000, function() {
 console.log("Node server running on https://localhost:3000");
 });*/
app.listen(config.PORT, function() {
    console.log("Node server running on http://localhost:3000");
    //userData.drop();
});


