const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('src/db/dnp.db', (err) => {
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
}