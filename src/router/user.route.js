const { Router } = require('express');

const { getAllUsers, getUserById, postUser, deleteUser } = require('../controllers/user.controller.js');
const UserRoute = Router();

UserRoute.get('/', getAllUsers);
UserRoute.get('/:id', getUserById);
UserRoute.post('/', postUser);
UserRoute.delete('/:id', deleteUser);

module.exports = UserRoute;