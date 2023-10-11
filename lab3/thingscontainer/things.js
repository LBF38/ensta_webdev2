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
router.get('/:id', function (req, res) {
    const id = parseInt(req.params.id);
    const thing = thingsList.find(thing => thing.id === id);
    if (thing) {
        res.send('The id is ' + thing.id + " and the title is " + thing.title);
    } else {
        res.status(404).send('id not found.');
    }
});
module.exports = router;
