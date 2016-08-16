var Response = require('./Response');
var Usuario = require('../models/Usuario');

// eyJpZCI6MSwibm9tZSI6IkhlbnJpcXVlIFJpZWdlciIsImVtYWlsIjoiaGVucmlxdWVAaHJkZXYuY29tLmJyIn0=

var Auth = function(){  
    
    this.check = function(req, res){
        var token = decodeToken(req);
        
        console.log(token);
        
        if(token){
            return true;
        }
        
        res.send(new Response().error(1, "Token inválido"));
        
        return false;
        
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