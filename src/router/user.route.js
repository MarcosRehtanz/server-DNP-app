const { Router } = require('express');

const UserController = require('../controllers/user.controller.js');
const UserRoute = Router();

UserRoute.get('/', UserController.getAll);
UserRoute.get('/:id', UserController.getById);
UserRoute.delete('/:id', UserController.disable);
UserRoute.put('/:id', UserController.update)

UserRoute.post('/signup', UserController.post);
UserRoute.post('/login', UserController.logIn);

module.exports = UserRoute;