const mysql = require('mysql');

const connection = mysql.createConnection({
 
});

connection.connect((err) => {
  if (err) {
    console.log('MySQL connection error');
  } else {
    console.log('MySQL connected');
  }
});

class Database {
  constructor(connection) {
    this.connection = connection;
  }

  query(sql, args ) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) { return reject(err); }
        resolve(rows);
      });
    });
  }
}

module.exports.connect = connection;
module.exports.dbconnect = new Database(connection);
