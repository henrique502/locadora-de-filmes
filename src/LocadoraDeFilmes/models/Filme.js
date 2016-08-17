var schemas = require("../config/schemas.js");
var database = require("../config/database");
var _ = require("lodash");

/* Filme Model */
var Filme = function (data) { this.data = data; };
Filme.prototype.data = {};
Filme.prototype.get = function (name) { return this.data[name]; };
Filme.prototype.set = function (name, value) { this.data[name] = value; };
Filme.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Filme;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

/**
 * getFilmes
 * @param callback function(array)
 */
Filme.prototype.getFilmes = function(callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT filmes.id, filmes.titulo, filmes.diretor, filmes.copias, COUNT(locacao.usuario) AS alugados ';
            sql+= 'FROM filmes LEFT JOIN locacao ON filmes.id = locacao.filme ';
            sql+= 'GROUP BY filmes.id ';
            sql+= 'ORDER BY filmes.titulo ASC';

        connection.query(sql, function(error, rows) {
            if (error) throw error;
            
            var lista = [];
            for (var i in rows) {
                lista.push(rows[i]);
            }
            
            callback(lista);
        });

        connection.release();
    });
};

/**
 * getFilmesByTitulo
 * @param termo string
 * @param callback function(array)
 */
Filme.prototype.getFilmesByTitulo = function(termo, callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT filmes.id, filmes.titulo, filmes.diretor, filmes.copias, COUNT(locacao.usuario) AS alugados ';
            sql+= 'FROM filmes LEFT JOIN locacao ON filmes.id = locacao.filme ';
            sql+= 'WHERE LOWER(filmes.titulo) LIKE ? ';
            sql+= 'GROUP BY filmes.id ';
            sql+= 'ORDER BY filmes.titulo ASC';
            
        connection.query(sql, ['%' + termo.toLowerCase() + '%'], function(error, rows) {
            if (error) throw error;
            
            var lista = [];
            for (var i in rows) {
                lista.push(rows[i]);
            }
            
            callback(lista);
        });

        connection.release();
    });
};

/**
 * getFilmesAlugadosByUsuario
 * @param usuario Usuario
 * @param callback function(array)
 */
Filme.prototype.getFilmesAlugadosByUsuario = function(usuario, callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT filmes.id, filmes.titulo, filmes.diretor ';
            sql+= 'FROM filmes INNER JOIN locacao ON filmes.id = locacao.filme ';
            sql+= 'WHERE locacao.usuario = ? ';
            sql+= 'ORDER BY filmes.titulo ASC';

        connection.query(sql, [usuario.id], function(error, rows) {
            if (error) throw error;
            
            var lista = [];
            for (var i in rows) {
                lista.push(rows[i]);
            }
            
            callback(lista);
        });

        connection.release();
    });
};

/**
 * getFilmeById
 * @param filmeId int
 * @param callback function(err, Filme)
 */
Filme.prototype.getFilmeById = function(filmeId, callback){
    database.getConnection(function(err, connection) {

        var sql = 'SELECT id, titulo, diretor, copias ';
            sql+= 'FROM filmes WHERE id = ? ';

        connection.query(sql, [filmeId], function(error, rows) {
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

module.exports = Filme;