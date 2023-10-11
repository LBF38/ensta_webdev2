var express = require('express');
var session = require('express-session');
var app = express();
app.use(express.json());
var things = require('./things.js');

app.use(session({ secret: "Shh, it's a secret!", }));
app.get('/', function (req, res) {
    if (req.session.page_views) {
        req.session.page_views++;
        res.send('You have visited this page ' + req.session.page_views
            + ' times');
    } else {
        req.session.page_views = 1;
        res.send("Welcome to this page for the first time!");
    }
});

// First middleware before response is sent
app.use(function (req, res, next) {
    console.log("Start");
    next();
});
// Route handler
app.get('/', function (req, res, next) {
    console.log("Middle");
    res.send('This is the things app!');
    next();
});
// Second middleware after response is sent
app.use('/', function (req, res, next) {
    console.log('End');
    next();
});

//Middleware function to log request protocol
app.use('/things', function (req, res, next) {
    console.log("A request for things received at " + Date.now());
    next();
});
app.use('/things', things);
app.listen(3000);
