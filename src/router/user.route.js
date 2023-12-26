const { Router } = require('express');

const UserController = require('../controllers/user.controller.js');
const UserRoute = Router();

UserRoute.get('/', UserController.getAll);
UserRoute.get('/:id', UserController.getById);
UserRoute.post('/signup', UserController.post);
UserRoute.delete('/:id', UserController.disable);
UserRoute.put('/update', UserController.update)

UserRoute.post('/login', UserController.logIn);

module.exports = UserRoute;