var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesDevolver
var FilmesDevolver = function(req, res){
    Auth.check(req, res, function(usuario){
        console.log(usuario);
        res.send(new Response().success('FilmesDevolver'));
    });
};



module.exports = FilmesDevolver;