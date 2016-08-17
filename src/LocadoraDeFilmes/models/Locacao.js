var schemas = require("../config/schemas.js");
var database = require("../config/database");
var _ = require("lodash");

/* Locacao Model */
var Locacao = function (data) { this.data = data; };
Locacao.prototype.data = {};
Locacao.prototype.get = function (name) { return this.data[name]; };
Locacao.prototype.set = function (name, value) { this.data[name] = value; };
Locacao.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Locacao;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

/**
 * getLocacao
 * @param filmeId int
 * @param usuarioId int
 * @param callback function(err, Locacao)
 */
Locacao.prototype.getLocacao = function(filmeId, usuarioId, callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT filme, usuario ';
            sql+= 'FROM locacao WHERE filme = ? AND usuario = ? ';

        connection.query(sql, [filmeId, usuarioId], function(error, rows) {
            if (error){
                callback(error, null);
            } else {
            
                if(rows.length === 1){
                    callback(null, rows[0]);
                } else {
                    callback(null, null);
                }
            }
        });

        connection.release();
    });
};

/**
 * alugar
 * @param filmeId int
 * @param usuarioId int
 * @param callback function(err, status)
 */
Locacao.prototype.alugar = function(filmeId, usuarioId, callback){
    database.getConnection(function(err, connection) {

        var sql = 'INSERT INTO locacao (filme, usuario) VALUES (?, ?)';

        connection.query(sql, [filmeId, usuarioId], function(error, rows) {
            if (error){
                callback(error, false);
            } else {
                callback(null, true);
            }
        });

        connection.release();
    });
};

/**
 * devolver
 * @param filmeId int
 * @param usuarioId int
 * @param callback function(error, status)
 */
Locacao.prototype.devolver = function(filmeId, usuarioId, callback){
    database.getConnection(function(err, connection) {

        var sql = 'DELETE FROM locacao WHERE filme = ? AND usuario = ? LIMIT 1';

        connection.query(sql, [filmeId, usuarioId], function(error, rows) {
            if (error){
                callback(error, false);
            } else {
                callback(null, true);
            }
        });

        connection.release();
    });
};

/**
 * hasCopiasDisponiveis
 * @param filmeId int
 * @param callback function(err, Boolean)
 */
Locacao.prototype.hasCopiasDisponiveis = function(filmeId, callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT filmes.copias, COUNT(locacao.usuario) AS alugados ';
            sql+= 'FROM filmes LEFT JOIN locacao ON filmes.id = locacao.filme ';
            sql+= 'WHERE filmes.id = ? ';
            sql+= 'GROUP BY filmes.id ';

        connection.query(sql, [filmeId], function(error, rows) {
            if (error){
                callback(error, null);
            } else {
            
                if(rows.length === 1){
                    callback(null, rows[0].copias > rows[0].alugados);
                } else {
                    callback(null, false);
                }
            }
        });

        connection.release();
    });
};

module.exports = Locacao;
