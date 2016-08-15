var http = require("http");
var url = require("url");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "root", 
    password: "", 
    database: "db_locadora"
}); 



console.log("Iniciando");

var server = http.createServer(function (request, response) {
    response.setHeader('Content-Type', 'application/json');
    response.send(JSON.stringify({ a: 1 }));
    
    
    connection.connect();
    connection.end();
    response.end();
    
});

server.listen(8080);
console.log("127.0.0.1:8080");



