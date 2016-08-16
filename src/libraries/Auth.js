var Crypto = require('crypto');
var Response = require('./Response');
var Usuario = require('../models/Usuario');
var Token = require('../models/Token');

var Auth = function(){  
    
    this.check = function(req, res){
        var token = decodeToken(req);
        
        console.log(token);
        
        if(token){
            return;
        }
        
        res.send(new Response().error(1, "Token inválido"));
        res.end();
    };
    
    this.getToken = function(usuario, callback){
        if(usuario.id <= 0) return;
        
        Crypto.randomBytes(20, function(err, buffer) {
            var auth = usuario.id + '#' + buffer.toString('hex');

            new Usuario().updateToken(auth, usuario.id, function(err){
                var token = encode(JSON.stringify(new Token({
                    id: usuario.id,
                    nome: usuario.nome,
                    auth: auth
                })));
                
                callback(token);
            });
        });
    };
    
    var decodeToken = function(req){
        var token = req.url_parts.query.token;
        if(!token) return null;
        
        token = decode(token).toString().trim();
        token = JSON.parse(token);
        if(typeof token !== 'object') return null;
        
        return new Usuario().sanitize(token);
    };
    
    var encode = function(string){
        return new Buffer(string).toString('base64');
    };
    
    var decode = function(string){
        return new Buffer(string, 'base64').toString('utf8');
    };
};

module.exports = new Auth();