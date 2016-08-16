/* Locacao Library */
var Response = function(){  
    this.success = function(data){
        return {
            status: "OK",
            data: data
        };
    };
    
    this.error = function(code, msg){
        return {
            status: "ERROR",
            code: code,
            msg: msg
        };
        
    };
};

module.exports = Response;