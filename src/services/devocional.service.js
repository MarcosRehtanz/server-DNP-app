const { db } = require('../connect.db.js');

class DevocionalService {

    constructor() { }
    async getAllDevs(req, res) {

        const sql = `SELECT * FROM devocional`
        let msgErr, msgRows;

        return db.all(sql, [], (err, rows) => {
            if (err) 
                res.status(400).json(err.message);
            else 
                res.status(200).json(rows);
        })

        return { msgErr, msgRows };

    }
}

module.exports = DevocionalService;