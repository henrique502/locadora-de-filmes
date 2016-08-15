var http = require("http");
var url = require("url");
var mysql = require("mysql");

console.log("Iniciando");

http.createServer(function (request, response) {
    request.on("end", function(){
        request.resume();
        
        
        response.writeHead(200, {
            // 'Content-Type': 'application/json'
            'Content-Type': 'text/plain'
        });
        response.write("Hello World");
        console.log("Hello World");
        
        response.end();
    });
    
}).listen(8082);
console.log("localhost:8082");



