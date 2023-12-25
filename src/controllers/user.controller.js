const UserService = require('../services/user.service.js')
const fs = require('fs');
const validates = require('../utils/validates.js');

class UserController {

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json(error);
        }
    }

    async getUserById(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(404).json(`{User ${id}} not found`);
        }
        try {
            const user = await UserService.getUserById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async postUser(req, res) {
        const { name, surname, email, dob, password } = req.body;
        if (validates.someNull(name, surname, email, dob, password))
            res.status(400).json(new Error('Invalides'))

        try {
            const user = await UserService.postUser(name, surname, email, dob, password);
            res.status(200).send(user)
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async deleteUser(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id)))
            return res.status(404).json(`{User ${id}} not found`);

        try {
            const response = await UserService.deleteUser(id);
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = new UserController();