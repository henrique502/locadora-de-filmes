var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Usuario = require('../models/Usuario');

// Controller FilmesDevolver
var Login = function(req, res){
    var email = req.body.email;
    var senha = req.body.senha;

    if(typeof email !== "string" || typeof senha !== "string"){
        res.send(new Response().error(101, "Preencha email e/ou senha."));
        return;
    }
    
    new Usuario().getUsuarioByEmailSenha(email, senha, function(err, usuario){
        if(err){
            res.end(new Response().error(101, "Preencha email e/ou senha."));
        }
        
        res.send(new Response().success({
            token: Auth.getToken(usuario),
            id: usuario.id,
            nome: usuario.nome
        }));
    });
};

module.exports = Login;