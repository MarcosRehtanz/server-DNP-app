const bcrypt = require('bcrypt');

class Bycrpt {
	saltRounds = 10;
	async encode(password) {
		return new Promise((resolve, reject) => {
			bcrypt.hash(password, this.saltRounds, function (err, hash) {
				if (err) reject({error: err.message, origin: 'bcrypt'});
				else resolve(hash);
			});
		});
	}

	async decode(password, passwordDB) {
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, passwordDB, function(err, result) {
				if(err) reject(err.message);
				else resolve(result);
			});
		});
	}

}

module.exports = new Bycrpt();