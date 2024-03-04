const { db } = require('../connect.db.js');
const DataBaseModel = require('../models/dataBase.model.js');

class UserService {
	async logIn(email) {
		const sql = `
        SELECT
            _userId userId,
            _password password
        FROM
            users
        WHERE
            _email = ?
        `;
		return new Promise((response, reject) => {
			db.get(sql, [email], (err, row) => {
				if (err) reject(err.message);
				else response(row);
			});
		});
	}
	async getAll() {

		const sql = `
        SELECT
            _userId userId,
            _name name,
            _surname surname,
            _email email,
            _dob dob,
            _rol rol,
            _image image
        FROM
            users
        `;

		return await DataBaseModel.getAll(sql);
	}
	async getById(id) {
		const sql = `
        SELECT
            _userId userId,
            _name name,
            _surname surname,
            _email email,
            _dob dob,
            _rol rol,
            _image image
        FROM
            users
        WHERE
            _userId = ?
        `;
		return await DataBaseModel.get(sql, [id]);
	}
	async post(insert) {
		const sql = `
        INSERT INTO
            users (_name, _surname, _email, _dob, _password, _createdAt)
        VALUES
            (${insert.map((_) => '?').join(',')})
        `;
		return await DataBaseModel.post(sql, insert);
	}
	async update(insert) {
		const sql = `
        UPDATE
            users
        SET
            _name = ?,
            _surname = ?,
            _dob = ?,
            _updateAt = ?
        WHERE
            _userId = ?
        `;
		return await DataBaseModel.update(sql, insert);
	}
	async disable(id) {
		const sql = `
        UPDATE 
            users
        SET
            _deletedAt = ${Date.now()}
        WHERE
            _userId = ? AND _deletedAt IS NULL
        `;
		return await DataBaseModel.disable(sql, [id]);
	}
}

module.exports = new UserService();