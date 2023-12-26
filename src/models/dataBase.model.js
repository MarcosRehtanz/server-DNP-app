const { db } = require('../connect.db.js');

class DataBaseModel {
    async getAll(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.all(sql, params, (err, rows) => {
                if (err)
                    reject(err.message);
                else
                    resolve(rows);
            })
        })
    }
    async get(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, row) => {
                if (err)
                    reject(err.message);
                else
                    resolve(row);
            })
        })
    }
    async post(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err)
                    reject(err.message);
                else
                    resolve(`Register has been successful`);
            })
        })
    }
    async update(sql, params){
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err.message);
                else resolve(`Register has been updated`)
            })
        })
    }
    async disable(sql, params = []) {
        return new Promise((resolve, reject) => {
            db.run(sql, params, (err) => {
                if (err) reject(err.message);
                else resolve(`Register has been disable`)
            })
        })
    }
}

module.exports = new DataBaseModel()