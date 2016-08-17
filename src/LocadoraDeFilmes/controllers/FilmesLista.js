var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesLista
var FilmesLista = function(req, res){

    var usuario = null;

    var showLista = function(lista){
        res.send(new Response().success(lista));
    };
    
    var init = function(usr){
        usuario = usr;
        
        if(typeof req.url_parts.query.termo === "string"){
            new Filme().getFilmesByTitulo(req.url_parts.query.termo, showLista);
        } else {
            new Filme().getFilmes(showLista);
        }
    };
    
    Auth.check(req, res, init);
};

module.exports = FilmesLista;