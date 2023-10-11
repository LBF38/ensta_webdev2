var express = require('express');
var app = express();
app.use(express.json());
var things = require('./things.js');
app.use('/things', things);
app.listen(3000);
