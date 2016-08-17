var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Usuario = require('../models/Usuario');

// Controller Login
var Login = function(req, res){
    
    var email = req.body.email;
    var senha = req.body.senha;
    
    var validateEmail = function(string){
        if(typeof string !== "string"){
            res.send(new Response().error("Preencha o campo e-mail."));
            return false;
        }
        
        if(!Auth.validaEmail(string)){
            res.send(new Response().error("Forne\u00e7a um e-mail v\u00e1lido."));
            return false;
        }
        
        return true;
    };
    
    var validateSenha = function(string){
        if(typeof string !== "string"){
            res.send(new Response().error("Preencha campo senha."));
            return false;
        }
        
        if(string.length < 5 || string.length > 16){
            res.send(new Response().error("A senha deve ter de 5 a 16 caracteres."));
            return false;
        }
        
        return true;
    };
    
    var login = function(err, usuario){
        if(err || usuario === null){
            res.send(new Response().error("E-mail e/ou senha inv\u00e1lidos."));
        } else {
            Auth.getToken(usuario, function(token){
                res.send(new Response().success({
                    token: token,
                    id: usuario.id,
                    nome: usuario.nome
                }));
            });
        }
    };
    
    var init = function(){
        if(
            validateEmail(email) &&
            validateSenha(senha)
        ){
            new Usuario().getUsuarioByEmailSenha(email, senha, login);
        }
    };
    
    init();
};

module.exports = Login;