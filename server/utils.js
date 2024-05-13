const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'mysql',
  user: 'root',
  password: 'password',
  database: 'grocery'
})

module.exports = connection;
