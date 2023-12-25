const { Router } = require("express");
const { getAllDevs, getDevById, postDev } = require('../services/devocional.service.js')
const Auth0Controller = require('../controllers/auth0.controller.js');

const devocionalRoute = Router();

devocionalRoute.get('/', getAllDevs);
devocionalRoute.get('/:id', getDevById)
devocionalRoute.post('/', Auth0Controller.validateRoll, postDev);

module.exports = devocionalRoute;