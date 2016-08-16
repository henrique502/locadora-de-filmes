var schemas = require("../config/schemas.js");
var database = require("../config/database");
var _ = require("lodash");

/* Usuario Model */
var Usuario = function (data) { this.data = data; };
Usuario.prototype.data = {};
Usuario.prototype.get = function (name) { return this.data[name]; };
Usuario.prototype.set = function (name, value) { this.data[name] = value; };

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
 * @param auth string
 * @param usuarioId int
 * @param callback function(err)
 */
Usuario.prototype.getUsuarioFromToken = function(auth, usuarioId, callback){
    database.getConnection(function(err, connection) {
 
        var sql = 'SELECT id, nome, email FROM usuarios WHERE id = ? AND auth = ?';
        connection.query(sql, [usuarioId, auth], function(error, rows) {
            if (error || rows.length !== 1){
                callback(error, null);
            } else {
                callback(null, new Usuario().sanitize(rows[0]));
            }
        });

        connection.release();
    });
};


Usuario.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Usuario;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

module.exports = Usuario;