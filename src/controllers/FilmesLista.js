var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');


// Controller FilmesLista
var FilmesLista = function(req, res){
    Auth.check(req, res, function(usuario){
        var termo = null;
        if(typeof req.url_parts.query.termo === "string"){
            termo = req.url_parts.query.termo;
        }
        
        if(termo){
            new Filme().getFilmesByTitulo(termo, function(lista){
                res.send(new Response().success(lista));
            });
        } else {
            new Filme().getFilmes(function(lista){
                res.send(new Response().success(lista));
            });
        }
    });
};

module.exports = FilmesLista;