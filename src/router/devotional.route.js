const { Router } = require('express');
const DevotionalController = require('../controllers/devotional.controller.js');
const Auth0Controller = require('../controllers/authorization.controller.js');

const devocionalRoute = Router();

devocionalRoute.get('/', DevotionalController.getAllDevotionals);
devocionalRoute.get('/:id', DevotionalController.getDevotionalById);
devocionalRoute.post('/', Auth0Controller.validateRoll, DevotionalController.postDevotional);

module.exports = devocionalRoute;