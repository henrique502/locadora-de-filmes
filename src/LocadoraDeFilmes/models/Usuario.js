var schemas = require("../config/schemas.js");
var database = require("../config/database");
var _ = require("lodash");

/* Usuario Model */
var Usuario = function (data) { this.data = data; };
Usuario.prototype.data = {};
Usuario.prototype.get = function (name) { return this.data[name]; };
Usuario.prototype.set = function (name, value) { this.data[name] = value; };
Usuario.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Usuario;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};


/**
 * getUsuarioByEmailSenha
 * @param email string
 * @param senha string
 * @param callback function(err, usuario)
 */
Usuario.prototype.getUsuarioByEmailSenha = function(email, senha, callback){
    database.getConnection(function(err, connection) {
 
        var sql = 'SELECT id, nome, email FROM usuarios WHERE email = ? AND senha = ?';
        connection.query(sql, [email, senha], function(error, rows) {
            if (error || rows.length !== 1){
                callback(error, null);
            } else {
                callback(null, new Usuario().sanitize(rows[0]));
            }
        });

        connection.release();
    });
};

/**
 * updateToken
 * @param auth string
 * @param usuarioId int
 * @param callback function(err)
 */
Usuario.prototype.updateToken = function(auth, usuarioId, callback){
    database.getConnection(function(err, connection) {
 
        var sql = 'UPDATE usuarios SET auth = ? WHERE id = ?';
        connection.query(sql, [auth, usuarioId], function(error, rows) {
            if (error){
                callback(error);
            } else {
                callback(null);
            }
        });

        connection.release();
    });
};

/**
 * getUsuarioFromToken
 * @param token object Token
 * @param callback function(err, Usuario)
 */
Usuario.prototype.getUsuarioFromToken = function(token, callback){
    database.getConnection(function(err, connection) {
 
        var sql = 'SELECT id, nome, email FROM usuarios WHERE id = ? AND auth = ?';
        connection.query(sql, [token.id, token.auth], function(error, rows) {
            if (error || rows.length !== 1){
                callback(error, null);
            } else {
                callback(null, new Usuario().sanitize(rows[0]));
            }
        });

        connection.release();
    });
};

/**
 * getUsuarioByEmail
 * @param email string
 * @param callback function(err, Usuario)
 */
Usuario.prototype.getUsuarioByEmail = function(email, callback){
    database.getConnection(function(err, connection) {
        console.log(email);
        var sql = 'SELECT id, nome, email FROM usuarios WHERE email = ?';
        connection.query(sql, [email.toLowerCase()], function(error, rows) {
            if (error || rows.length !== 1){
                callback(error, null);
            } else {
                callback(null, new Usuario().sanitize(rows[0]));
            }
        });

        connection.release();
    });
};

/**
 * insertUsuario
 * @param usuario object
 * @param callback function(err, usuarioId)
 */
Usuario.prototype.insertUsuario = function(usuario, callback){
    database.getConnection(function(err, connection) {
 
        var sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
        connection.query(sql, [usuario.nome, usuario.email.toLowerCase(), usuario.senha], function(error, rows) {
            if (error){
                callback(error, null);
            } else {
                callback(null, rows.insertId);
            }
        });

        connection.release();
    });
};

module.exports = Usuario;