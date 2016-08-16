var schemas = require("../config/schemas.js");  
var _ = require("lodash");

/* Filme Model */
var Filme = function (data) {  
    this.data = data;
};

Filme.prototype.data = {};

Filme.prototype.get = function (name) {  
    return this.data[name];
};

Filme.prototype.set = function (name, value) {  
    this.data[name] = value;
};







Filme.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Filme;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

module.exports = Filme;