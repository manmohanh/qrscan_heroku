const mysql = require("mysql2/promise");
const pool = mysql.createPool({
  host: process.env.SQL_SERVER,
  user: process.env.SQL_USER,
  database: process.env.SQL_DATABASE,
  password: process.env.SQL_PASSWORD,
  port: process.env.SQL_PORT,
});
// let sql = "SELECT * FROM metadata_marks";
// pool.query(sql, function (error, result) {
//   if (error) console.log(error);
//   else console.log(result);
// });
module.exports = pool;
