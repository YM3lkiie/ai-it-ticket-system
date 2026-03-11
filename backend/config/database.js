// DATABASE CONNECTION FILE
const { connect } = require("mssql");
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Mysql@123",
    databse: "ai_ticket_system"
});

connection.connect((error) => {
    if(error) {
        console.error("Database connection failed:", error);
        returen;
    }
    console.log("Conencted to MySQL Database");
});

module.exports = connection