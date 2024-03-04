const sqlite3 = require('sqlite3').verbose();
require('dotenv').config();
const dataBaseURL = process.env.DATABASE_URL || ':memory:';

// open the database
let db = new sqlite3.Database(dataBaseURL, (err) => {
	if (err) {
		return console.error(err.message);
	}
	console.log('Connected');
});

module.exports = {
	connect: (cb) => {
		if (db) {
			cb();
		}
	},
	db,
};