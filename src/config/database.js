var mysql = require("mysql");

// Configura banco de dados MySQL
module.exports = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "db_locadora"
});