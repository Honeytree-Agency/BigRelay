const path = require('path');
const sqlite3 = require('sqlite3');

const Database = new sqlite3.Database(path.join(__dirname, 'sql.db'));

module.exports = Database;
