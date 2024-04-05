'use strict';
const DataBaseModel = require('../models/dataBase.model.js');

class EventService {
	async getAll() {

		const sql = `
        SELECT
            _eventId eventId,
            _name name,
            _description description,
            _date date
        FROM
            events
        `;

		return await DataBaseModel.getAll(sql);
	}
	async getById(id) {
		const sql = `
        SELECT
            _eventId eventId,
            _name name,
            _description description,
            _date date
        FROM
            events
        WHERE
            _eventId = ?
        `;
		return await DataBaseModel.get(sql, [id]);
	}
	async post(insert) {
		const sql = `
        INSERT INTO
            events (_name, _description, _date, _createdAt)
        VALUES
            (${insert.map(() => '?').join(',')})
        `;
		return await DataBaseModel.post(sql, insert);
	}
	async update(insert) {
		const sql = `
        UPDATE
            events
        SET
            _name = ?,
            _description = ?,
            _date = ?
        WHERE
            _eventId = ?
        `;
		return await DataBaseModel.update(sql, insert);
	}
	async disable(id) {
		const sql = `
        UPDATE 
            events
        SET
            _deletedAt = ${Date.now()}
        WHERE
            _eventId = ? AND _deletedAt IS NULL
        `;
		return await DataBaseModel.disable(sql, [id]);
	}
}

module.exports = new EventService();