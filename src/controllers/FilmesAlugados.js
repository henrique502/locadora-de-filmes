var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesAlugados
var FilmesAlugados = function(req, res){
    Auth.check(req, res, function(usuario){
        console.log(usuario);
        res.send(new Response().success('FilmesAlugados'));
    });
};



module.exports = FilmesAlugados;