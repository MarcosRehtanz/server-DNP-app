const { Router } = require("express");
const DevocionalService = require('../services/devocional.service.js')

const devocionalRoute = Router();

const devocionalService = new DevocionalService();

devocionalRoute.get('/', devocionalService.getAllDevs);

module.exports = devocionalRoute;