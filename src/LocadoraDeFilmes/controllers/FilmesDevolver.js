var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');
var Locacao = require('../models/Locacao');

// Controller FilmesDevolver
var FilmesDevolver = function (req, res) {
    Auth.check(req, res, function (usuario) {

        var filmeId = parseInt(req.body.filmeId);

        if (typeof filmeId !== "number") {
            res.send(new Response().error("Par\u00e2metro filmeId inv\u00e1lido"));
            return;
        }

        new Filme().getFilmeById(filmeId, function (err, filme) {
            if (err)
                throw err;

            if (filme === null) {
                res.send(new Response().error("Filme n\u00e3o encontrado."));
                res.end();
            }

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
        });
    });
};

module.exports = FilmesDevolver;