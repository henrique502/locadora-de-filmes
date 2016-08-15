var express = require('express');
var http = require('http');
var app = express();

app.use(function(req, res, next){
    res.header("Content-Type", "application/json");
    
    // Carrega banco de dados
    req.db = require("./config/database");
    next();
});

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
  res.render('error', {
    message: err.message,
    error: err
  });
});

// Inicia Servidor
http.createServer(app).listen(3000);