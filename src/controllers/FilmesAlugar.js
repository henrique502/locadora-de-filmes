var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');
var Locacao = require('../models/Locacao');

// Controller FilmesAlugar
var FilmesAlugar = function(req, res){
    Auth.check(req, res, function(usuario){
        
        var filmeId = parseInt(req.body.filmeId);

        if (typeof filmeId !== "number") {
            res.send(new Response().error("Par\u00e2metro filmeId inv\u00e1lido"));
            return;
        }
        
        new Filme().getFilmeById(filmeId, function(err, filme){
            if(err) throw err;
            
            if(filme === null){
                res.send(new Response().error("Filme n\u00e3o encontrado."));
                res.end();
            }
            
            new Locacao().hasCopiasDisponiveis(filmeId, function(err, status){
                if(status){
                    new Locacao().alugar(usuario.id, filme.id, function(err, status){
                        if(status){
                            res.send(new Response().success(filme));
                        } else {
                            res.send(new Response().error("Loca\u00e7\u00e3o n\u00e3o efetuada."));
                        }
                    });
                } else {
                    res.send(new Response().error("Loca\u00e7\u00e3o n\u00e3o dispon\u00edvel."));
                }
                
            });
        });
    });
};

module.exports = FilmesAlugar;