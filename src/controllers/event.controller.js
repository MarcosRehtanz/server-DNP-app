'use strict'
const EventService = require('../services/event.service.js')
const validates = require('../utils/validates.js');
const Bycrpt = require('../models/bcrypt.model.js')
require('dotenv').config();

class EventController {
    async getAll(_, res) {
        try {
            const events = await EventService.getAll();
            res.status(200).json(events);
        } catch (error) {
            console.error(error);
            res.status(500).json(error);
        }
    }
    async getById(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            return res.status(404).json(`{Event ${id}} not found`);
        }
        try {
            const event = await EventService.getById(id);
            res.status(200).json(event);
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    }
    async post(req, res) {
        const { name, description, date } = req.body;

        if (validates.someNull(name, description, date))
            res.status(400).json({ name, description, date })

        try {
            const insert = [name, description, email, dob, hash, Date.now()];
            const event = await EventService.post(insert);
            res.status(200).send({ message: event });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const { name, description, date } = req.body;
        if (validates.someNull(id, name, description, date))
            res.status(400).json({ id, name, description, date })

        try {
            const insert = [name, description, date, Date.now(), id];
            const result = await EventService.update(insert);
            res.status(200).send({ result });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }

    }
    async disable(req, res) {
        const { id } = req.params;
        if (isNaN(Number(id)))
            return res.status(404).json(`{Event ${id}} not found`);

        try {
            const response = await EventService.disable(id);
            res.status(200).json(response)
        } catch (error) {
            console.error(error);
            res.status(500).json(error)
        }
    }
}

module.exports = new EventController();