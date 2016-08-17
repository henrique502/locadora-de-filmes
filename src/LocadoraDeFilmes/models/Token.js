var _ = require("lodash");

/* Token Model */
var Token = function (data) {  
    this.data = data;
};

Token.prototype.data = {};

Token.prototype.sanitize = function (data) {  
    data = data || {};
    var schema = {id: 0, nome: null, auth: null};
    return _.pick(_.defaults(data, schema), _.keys(schema)); 
};

module.exports = Token;



