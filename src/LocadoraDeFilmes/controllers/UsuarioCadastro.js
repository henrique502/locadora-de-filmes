var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Usuario = require('../models/Usuario');

// Controller UsuarioCadastro
var UsuarioCadastro = function(req, res){
    
    var email = req.body.email;
    var senha = req.body.senha;
    var nome = req.body.nome;
    
    var validateNome = function(string){
        if(typeof string !== "string" || string.length < 3){
            res.send(new Response().error("Preencha campo nome."));
            res.end();
        }
    };
    
    var validateEmail = function(string){
        if(typeof string !== "string"){
            res.send(new Response().error("Preencha o campo e-mail."));
            res.end();
        }
        
        if(!Auth.validaEmail(string)){
            res.send(new Response().error("Forne\u00e7a um e-mail v\u00e1lido."));
            res.end();
        }
    };
    
    var validateSenha = function(string){
        if(typeof string !== "string"){
            res.send(new Response().error("Preencha campo senha."));
            res.end();
        }
        
        if(string.length < 5 || string.length > 16){
            res.send(new Response().error("A senha deve ter de 5 a 16 caracteres."));
            res.end();
        }
    };
    
    var registraUsuario = function(err, usuario){
        if(usuario === null){
            
        } else {
            res.send(new Response().error("E-mail j\u00e1 em uso."));
            res.end();
        }
        
        
        
        
    };
    
    

    var init = function(){
        validateNome(nome);
        validateEmail(email);
        validateSenha(senha);
        
        new Usuario().getUsuarioByEmail(email, registraUsuario);
    };
    
    init();
};

module.exports = UsuarioCadastro;