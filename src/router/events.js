const { Router } = require('express');
const eventRoute = Router();
const eventsJSON = require('../db/events.json');

eventRoute.get('/', (req, res) => {
    res.status(200).json(eventsJSON);
})

module.exports = eventRoute;