var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesAlugados
var FilmesAlugados = function(req, res){
    
    // valida token
    if(!Auth.check(req, res)){ return; }
    
    
    
    
    
    
    
    res.send(new Response().success('FilmesAlugados'));
};



module.exports = FilmesAlugados;