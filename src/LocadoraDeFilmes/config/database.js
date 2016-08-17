var mysql = require("mysql");

var database = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_locadora"
});

database.on('error', function () {
    database.end();
});

// Configura banco de dados MySQL
module.exports = database;