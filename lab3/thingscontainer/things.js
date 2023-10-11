var express = require('express');
var router = express.Router();
var thingsList = [
    { id: 1, title: 'A beautiful blue sky.' },
    { id: 2, title: 'The bubbles in my glass of water.' },
];
router.get('/', function (req, res) {
    res.json(thingsList);
});
router.post('/', function (req, res) {
    thingsList.push(req.body);
    res.json(thingsList);
});
module.exports = router;
