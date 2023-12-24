const { Router } = require("express");
const { getAllDevs, getDevById, postDev } = require('../services/devocional.service.js')

const devocionalRoute = Router();

devocionalRoute.get('/', getAllDevs);
devocionalRoute.get('/:id', getDevById)
devocionalRoute.post('/', postDev);

module.exports = devocionalRoute;