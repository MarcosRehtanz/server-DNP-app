const { Router } = require('express');

const { getAllUsers, getUserById, postUser, deleteUser, logIn } = require('../controllers/user.controller.js');
const UserRoute = Router();

UserRoute.get('/', getAllUsers);
UserRoute.get('/:id', getUserById);
UserRoute.post('/', postUser);
UserRoute.delete('/:id', deleteUser);

UserRoute.post('/login', logIn);

module.exports = UserRoute;