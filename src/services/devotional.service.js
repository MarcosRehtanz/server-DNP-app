const DataBaseModel = require('../models/dataBase.model.js');

class DevocionalService {
    async getAll() {

        const sql = `
        SELECT 
            _devotionalId id,
            _title title,
            _description description,
            _date date,
            devotionals._userId userId,
            users._name name,
            users._surname surname,
            users._image image
        FROM
            devotionals
        ORDER BY
            _date DESC
        INNER JOIN users
            ON users._userId = devotionals._userId
        `;
        return await DataBaseModel.getAll(sql);
    }
    async getById(id) {
        const sql = `
        SELECT
            _devotionalId id,
            _title title,
            _description description,
            _date date,
            devotionals._userId userId,
            _name name,
            _surname surname,
            _image image
        FROM
            devotionals
        LEFT JOIN users
            ON users._userId = devotionals._userId
        WHERE
            devotionals._devotionalId = ?
        `;
        const result = await DataBaseModel.get(sql, [id]);
        return [result, (result) ? 200 : 404];
	}
    async post(insert = []) {
        const sql = `
        INSERT INTO devotionals (_title, _description, _date, _userId)
            VALUES
                (${insert.map((_) => '?').join(',')})
        `;
        return await DataBaseModel.post(sql, insert);
    }

}

module.exports = new DevocionalService();