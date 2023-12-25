const { response } = require('express');
const { db } = require('../connect.db.js');

class UserService {
    async logIn(email){
        const sql = `
        SELECT
            _password
        FROM
            users
        WHERE
            _email = ?
        `;
        return new Promise((response, reject)=>{
            db.get(sql, [email], (err, row) => {
                if (err) reject(err.message);
                else response(row);
            })
        })
    }
    async getAllUsers() {

        const sql = `
        SELECT
            _id id, _name name, _surname surname, _email email, _dob dob, _image image
        FROM
            users
        `;
        // WHERE
        //     _deletedAt IS NULL

        return new Promise((response, reject) => {
            db.all(sql, [], (err, rows) => {
                if (err) reject(err);
                else response(rows);
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
        return new Promise((response, reject) => {
            db.get(sql, [id], (err, row) => {
                if (err) reject(err);
                else response(row);
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
        return new Promise((response, reject) => {
            db.run(sql, insert, (err) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else response(`${insert[0]} has been inserted`);
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