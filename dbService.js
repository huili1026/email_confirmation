const mysql = require("mysql");
const dbConfig = require("./dbConfig.js");

var connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

connection.connect((err) => {
    if (err){
        console.log(err.message)
    }
    console.log('db ' + connection.state)
});