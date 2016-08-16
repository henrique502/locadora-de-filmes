var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Filme = require('../models/Filme');

// Controller FilmesDevolver
var FilmesAlugar = function(req, res){
    
    // valida token
    if(!Auth.check(req, res)){ return; }
    
    
    
    
    
    
    
    res.send(new Response().success('FilmesAlugar'));
};



module.exports = FilmesAlugar;