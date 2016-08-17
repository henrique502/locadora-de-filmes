var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');

// Controller Logoff
var Logoff = function(req, res){
    
    var token = req.body.token;
    
    if(typeof token !== "string"){
        res.send(new Response().error("Token inv\u00e1lido"));
        return;
    }
    
    var clearTokenCallback = function(status){
        if(status){
            res.send(new Response().success({}));
        } else {
            res.send(new Response().error("Token inv\u00e1lido"));
        }
    };
    
    var init = function(){
        Auth.clearToken(res, token, clearTokenCallback);
    };
    
    init();
};

module.exports = Logoff;