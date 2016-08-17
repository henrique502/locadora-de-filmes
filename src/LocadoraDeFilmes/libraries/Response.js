/* Locacao Library */
var Response = function(){  
    this.success = function(data){
        return {
            status: "OK",
            data: data
        };
    };
    
    this.error = function(msg){
        return {
            status: "ERROR",
            msg: msg
        };
        
    };
};

module.exports = Response;