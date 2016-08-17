var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesAlugados
var FilmesAlugados = function(req, res){
    
    var usuario = null;
    
    var init = function(usr){
        usuario = usr;
        
        new Filme().getFilmesAlugadosByUsuario(usuario, function(lista){
            res.send(new Response().success(lista));
        });
    };
    
    Auth.check(req, res, init);
};

module.exports = FilmesAlugados;