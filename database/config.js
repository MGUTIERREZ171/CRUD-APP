const mysql = require('mysql2/promise');
require("dotenv").config();


const pool = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE
});

module.exports = {
    pool
}
   