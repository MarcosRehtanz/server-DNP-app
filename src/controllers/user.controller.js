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
            if (!Boolean(hash))
                return res.status(401).json({ error: 'Email or Password Invalid' })
            const access = await Bycrpt.decode(password, hash.password);
            if (access) {
                const user = await UserService.getById(hash.userId);
                const token = jwt.sign({ ...user }, process.env.PRIVATE_KEY);
                res.status(202).json({ token, user });
            } else {
                res.status(401).json({ error: 'Email or Password Invalid' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    async getAll(_, res) {
        try {
            const users = await UserService.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(400).json(error);
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(404).json(`{User ${id}} not found`);
        }
        try {
            const user = await UserService.getById(id);
            res.status(200).json(user);
        } catch (error) {
            res.status(400).json(error)
        }
    }
    async post(req, res) {
        const { name, surname, email, dob, password } = req.body;

        if (validates.someNull(name, surname, email, dob, password))
            res.status(400).json({ name, surname, email, dob, password })

        try {
            const hash = await Bycrpt.encode(password);
            const insert = [name, surname, email, dob, hash, Date.now()];
            const user = await UserService.post(insert);
            res.status(200).send({ message: user });
        } catch (error) {
            res.status(400).json({ error: error });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, surname, dob } = req.body;
        console.log(req.body);
        if (validates.someNull(id, name, surname, dob))
            res.status(400).json({ id, name, surname, dob })

        try {
            const insert = [name, surname, dob, Date.now(), id];
            const result = await UserService.update(insert);
            res.status(200).send({ result });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }

    }
    async disable(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id)))
            return res.status(404).json(`{User ${id}} not found`);

        try {
            const response = await UserService.disable(id);
            res.status(200).json(response)
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = new UserController();