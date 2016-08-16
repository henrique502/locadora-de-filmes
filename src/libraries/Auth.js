var Crypto = require('crypto');
var Response = require('./Response');
var Usuario = require('../models/Usuario');
var Token = require('../models/Token');

var Auth = function () {

    this.check = function (req, res, callback) {
        var token = decodeToken(req.url_parts.query.token);

        new Usuario().getUsuarioFromToken(token, function (err, usuario) {
            if (err || usuario === null) {
                res.send(new Response().error(1, "Token inv\u00e1lido"));
                res.end();
            } else {
                callback(usuario);
            }

        });
    };

    this.getToken = function (usuario, callback) {
        if (usuario.id <= 0)
            return;

        Crypto.randomBytes(20, function (err, buffer) {
            var auth = usuario.id + '#' + buffer.toString('hex');

            new Usuario().updateToken(auth, usuario.id, function (err) {
                var token = JSON.stringify(new Token({
                    id: usuario.id,
                    nome: usuario.nome,
                    auth: auth
                }).data);

                callback(encode(token));
            });
        });
    };

    this.clearToken = function (res, encodeToken, callback) {
        var token = decodeToken(encodeToken);
        
        if(token === null){
            callback(true);
        }
        
        new Usuario().getUsuarioFromToken(token, function (err, usuario) {
            new Usuario().updateToken(null, usuario.id, function (err) {
                if (err) {
                    callback(err);
                } else {
                    callback(null);
                }
            });
        });
    };

    var decodeToken = function (token) {
        if (typeof token !== "string")
            return null;

        token = decode(token).toString().trim();

        token = JSON.parse(token);
        if (typeof token !== 'object')
            return null;

        return new Token().sanitize(token);
    };

    var encode = function (string) {
        return new Buffer(string).toString('base64');
    };

    var decode = function (string) {
        return new Buffer(string, 'base64').toString('utf8');
    };
};

module.exports = new Auth();