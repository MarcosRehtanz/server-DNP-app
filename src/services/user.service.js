const { db } = require('../connect.db.js');

class UserService {
    async getAllUsers() {

        const sql = `
        SELECT
            _id id, _name name, _surname surname, _email email, _dob dob, _image image
        FROM
            users
        `;
        // WHERE
        //     _deletedAt IS NULL

        return new Promise((res, rej) => {
            db.all(sql, [], (err, rows) => {
                if (err) rej(err);
                else res(rows);
            })
        })
    }
    async getUserById(id) {
        const sql = `
        SELECT
            _id id, _name name, _surname surname, _email email, _dob dob, _image image
        FROM
            users
        WHERE
            _id = ?
        `;
        return new Promise((res, rej) => {
            db.get(sql, [id], (err, row) => {
                if (err) rej(err);
                else res(row);
            })
        });
    }
    async postUser() {
        const insert = [...Object.values(arguments), Date.now()]
        const sql = `
        INSERT INTO
            users (_name, _surname, _email, _dob, _password, _createdAt)
        VALUES
            (${insert.map((_) => '?').join(',')})
        `;
        return new Promise((res, rej) => {
            db.run(sql, insert, (err) => {
                if (err) {
                    console.log(err);
                    rej(err);
                } else res(`${insert[0]} has been inserted`);
            })
        })
    }
    async deleteUser(id) {
        const sql = `
        UPDATE 
            users
        SET
            _deletedAt = ${Date.now()}
        WHERE
            _id = ? AND _deletedAt IS NULL
        `
        return new Promise((resolve, reject) => {
            db.run(sql, [id], (err) => {
                console.log(err);
                if (err) reject(err);
                else resolve(`User ${id} has been deleted`)
            })
        })
    }
}

module.exports = new UserService();