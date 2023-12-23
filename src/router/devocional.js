const { Router } = require("express");
const devocionalesJSON = require('../db/devocionales.json');

const devocionalRoute = Router();

devocionalRoute.get('/', (req, res) => {
    res.status(200).send(devocionalesJSON)
});

module.exports = devocionalRoute;