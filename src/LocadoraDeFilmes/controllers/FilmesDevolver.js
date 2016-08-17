var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');
var Locacao = require('../models/Locacao');

// Controller FilmesDevolver
var FilmesDevolver = function (req, res) {
    
    var usuario = null;

    var validateFilmeId = function (number) {
        if (typeof number !== "number") {
            res.send(new Response().error("Par\u00e2metro filmeId inv\u00e1lido"));
            return false;
        }
        return true;
    };
    
    var devolver = function(err, filme){
        if(err){
            res.send(new Response().error("Filme n\u00e3o encontrado."));
        } else {
            new Locacao().getLocacao(filme.id, usuario.id, function (err, locacao) {
                if (locacao) {
                    new Locacao().devolver(usuario.id, filme.id, function (err, status) {
                        if (status) {
                            res.send(new Response().success(filme));
                        } else {
                            res.send(new Response().error("Devolu\u00e7\u00e3o n\u00e3o efetuada."));
                        }
                    });
                } else {
                    res.send(new Response().error("Loca\u00e7\u00e3o n\u00e3o encontrada"));
                }
            });
        }
    };
    
    var init = function (usr) {
        if (validateFilmeId(parseInt(req.body.filmeId))) {
            usuario = usr;
            new Filme().getFilmeById(parseInt(req.body.filmeId), devolver);
        }
    };
    
    Auth.check(req, res, init);
};

module.exports = FilmesDevolver;