var Auth = require('../libraries/Auth');
var Response = require('../libraries/Response');

// Controller Logoff
var Logoff = function(req, res){
    
    var token = req.body.token;
    
    if(typeof token !== "string"){
        res.send(new Response().error("Token inv\u00e1lido"));
        return;
    }
    
    var clearTokenCallback = function(err){
        if(err){
            res.send(new Response().error("Token inv\u00e1lido"));
        } else {
            res.send(new Response().success({}));
        }
    };
    
    var init = function(){
        Auth.clearToken(res, token, clearTokenCallback);
    };
};

module.exports = Logoff;