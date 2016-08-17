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
            return false;
        }
        
        return true;
    };
    
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
    
    var registraUsuario = function(err, usuario){
        if(usuario === null){
            new Usuario().insertUsuario({
                nome: nome,
                email: email,
                senha: senha
            }, function(err, usuarioId){
                if(err){
                    res.send(new Response().error("Falha ao cadastrar novo usu\u00e1rio"));
                } else {
                    res.send(new Response().success({
                        id: usuarioId
                    }));
                }
            });
        } else {
            res.send(new Response().error("E-mail j\u00e1 em uso."));
        }
    };
    
    var init = function(){
        if(
            validateNome(nome) &&
            validateEmail(email) &&
            validateSenha(senha)
        ){
            new Usuario().getUsuarioByEmail(email, registraUsuario);
        }
    };
    
    init();
};

module.exports = UsuarioCadastro;