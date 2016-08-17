var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesAlugados
var FilmesAlugados = function(req, res){
    Auth.check(req, res, function(usuario){
        new Filme().getFilmesAlugadosByUsuario(usuario, function(lista){
            res.send(new Response().success(lista));
        });
    });
};

module.exports = FilmesAlugados;