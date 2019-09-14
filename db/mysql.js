const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'target'
});

connection.connect((err) => {
  if (err) {
    console.log('MySQL connection error');
  } else {
    console.log('MySQL connected');
  }
});

module.exports = connection;
