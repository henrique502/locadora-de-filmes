var schemas = require("../config/schemas.js");  
var _ = require("lodash");

/* Usuario Model */
var Usuario = function (data) {  
    this.data = data;
};

Usuario.prototype.data = {};

Usuario.prototype.get = function (name) {  
    return this.data[name];
};

Usuario.prototype.set = function (name, value) {  
    this.data[name] = value;
};







Usuario.prototype.sanitize = function (data) {  
    data = data || {};
    schema = schemas.Usuario;
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

module.exports = Usuario;