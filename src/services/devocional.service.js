const { db } = require('../connect.db.js');
const { someNull } = require('../utils/validates.js')

class DevocionalService {
    getAllDevs(req, res) {

        const sql = `
        SELECT 
            _id id,
            _title title,
            _description description,
            _date date,
            _author author
        FROM
            devotionals
        `
        db.all(sql, [], (err, rows) => {
            if (err)
                res.status(400).json(err.message);
            else
                res.status(200).json(rows);
        })
    }
    getDevById(req, res) {
        const { id } = req.params;
        console.log(id);
        if (isNaN(Number(id))) {
            return res.status(400).json('Invalid Id');
        }

        const sql = `
        SELECT
            _id id,
            _title title,
            _description description,
            _date date,
            _author author
        FROM
            devotionals
        WHERE
            _id = ${id}
        `
        db.get(sql, [], (err, row) => {
            if (err)
                res.status(500).send('Internal server error')
            else if (!Boolean(row))
                res.status(404).json('Devotional not found')
            else
                res.status(200).json(row)
        })
    }
    postDev(req, res) {
        // console.log(req);
        const { title, description, authorId } = req.body;

        if (someNull(title, description, authorId))
            res.status(400).json(new Error('Invalides'))

        const insert = [title, description, new Date(), authorId];
        const sql = `
        INSERT INTO devotionals (_title, _description, _date, _author)
            VALUES
                (${insert.map((_) => '?').join(',')})
        `;
        console.log(sql);
        db.run(sql, insert, (err) => {
            if (err) res.status(400).send(err);
            else res.status(200).send(`${title}has been inserted`);
        })
    }

}

module.exports = new DevocionalService();