const mysql = require("mysql");

const databaseCredentials = {
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE
};
const connection = mysql.createConnection(databaseCredentials);

module.exports = connection;
