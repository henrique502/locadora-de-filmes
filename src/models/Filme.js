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
            
            console.log(sql);
            
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

module.exports = Filme;