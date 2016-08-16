var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');
var Usuario = require('../models/Usuario');

// Controller FilmesDevolver
var Login = function(req, res){
    var email = req.body.email;
    var senha = req.body.senha;
    
    // http://localhost:3000/api/filmes/lista?token=eyJpZCI6MSwibm9tZSI6IkhlbnJpcXVlIFJpZWdlciIsImF1dGgiOiIxI2UzNGY0NmIxYmJlZWZiMjU1MThkMTNhMWQ0NmI0YjJiMDJmMTlhYjUifQ==
    
    if(typeof email !== "string" || typeof senha !== "string"){
        res.send(new Response().error(101, "Preencha email e/ou senha."));
        return;
    }
    
    new Usuario().getUsuarioByEmailSenha(email, senha, function(err, usuario){
        if(err){
            res.end(new Response().error(102, "E-mail e/ou senha inv\u00e1lidos."));
        }
        
        Auth.getToken(usuario, function(token){
            res.send(new Response().success({
                token: token,
                id: usuario.id,
                nome: usuario.nome
            }));
        });
    });
};

module.exports = Login;