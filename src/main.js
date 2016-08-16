var express = require('express');
var http = require('http');
var url = require('url');
var bodyParser = require('body-parser');
var app = express();

app.use(function(req, res, next){
    res.header("Content-Type", "application/json");
    
    req.url_parts = url.parse(req.url, true);
    next();
});

app.use(bodyParser.urlencoded({
    extended: true
}));


// Carrega rotas
app.use('/', require('./config/router'));


/* 404 */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* Erros */
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: err
  });
});

// Inicia Servidor
http.createServer(app).listen(3000);