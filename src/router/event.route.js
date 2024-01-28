'use strict'
const { Router } = require('express');
const Auth0Controller = require('../controllers/authorization.controller.js')

const EventController = require('../controllers/event.controller.js');
const eventRoute = Router();

eventRoute.get('/', EventController.getAll);
eventRoute.get('/:id', EventController.getById);
eventRoute.delete('/:id', EventController.disable);

eventRoute.post('/', Auth0Controller.validateRoll, EventController.post);
eventRoute.put('/:id', Auth0Controller.validateRoll, EventController.update)

module.exports = eventRoute;