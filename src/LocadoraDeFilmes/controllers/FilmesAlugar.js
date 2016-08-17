var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');
var Locacao = require('../models/Locacao');

// Controller FilmesAlugar
var FilmesAlugar = function (req, res) {

    var usuario = null;
    var filme = null;

    var validateFilmeId = function (number) {
        if (typeof number !== "number") {
            res.send(new Response().error("Par\u00e2metro filmeId inv\u00e1lido"));
            return false;
        }
        return true;
    };

    var alugar = function (err, status) {
        if (status) {
            new Locacao().alugar(usuario.id, filme.id, function (err, status) {
                if (status) {
                    res.send(new Response().success(filme));
                } else {
                    res.send(new Response().error("Loca\u00e7\u00e3o j\u00e1 efetuada."));
                }
            });
        } else {
            res.send(new Response().error("Loca\u00e7\u00e3o n\u00e3o dispon\u00edvel."));
        }
    };

    var copiasDisponiveis = function (err, data) {
        if (data === null) {
            res.send(new Response().error("Filme n\u00e3o encontrado."));
        } else {
            filme = data;
            new Locacao().hasCopiasDisponiveis(filme.id, alugar);
        }
    };

    var init = function (usr) {
        if (validateFilmeId(parseInt(req.body.filmeId))) {
            usuario = usr;
            new Filme().getFilmeById(parseInt(req.body.filmeId), copiasDisponiveis);
        }
    };

    Auth.check(req, res, init);
};

module.exports = FilmesAlugar;