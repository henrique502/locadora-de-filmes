var schemas = require("../config/schemas.js");  
var _ = require("lodash");

/* Locacao Model */
var Locacao = function (data) {  
    this.data = data;
};

Locacao.prototype.data = {};

Locacao.prototype.get = function (name) {  
    return this.data[name];
};

Locacao.prototype.set = function (name, value) {  
    this.data[name] = value;
};







Locacao.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Locacao;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

module.exports = Locacao;
