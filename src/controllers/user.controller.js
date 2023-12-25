const UserService = require('../services/user.service.js')
const validates = require('../utils/validates.js');
const Bycrpt = require('../models/bcrypt.model.js')
const jwt = require('jsonwebtoken');
require('dotenv').config();

class UserController {

    async logIn(req, res) {
        const { email, password } = req.body;
        console.log(email, password);
        try {
            const hash = await UserService.logIn(email);
            if(!Boolean(hash))
                return res.status(401).json({ error: 'Email or Password Invalid' })
            const access = await Bycrpt.decode(password, hash.password);
            if (access) {
                const user = await UserService.getUserById(hash.id);
                const token = jwt.sign({ ...user }, process.env.PRIVATE_KEY);
                res.status(202).json({ token });
            } else {
                res.status(401).json({ error: 'Email or Password Invalid' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAllUsers(_, res) {
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
            res.status(400).json({ name, surname, email, dob, password })

        try {
            const hash = await Bycrpt.encode(password);

            const user = await UserService.postUser(name, surname, email, dob, hash);
            res.status(200).send({ message: user });
        } catch (error) {
            res.status(400).json({ error: error.message });
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