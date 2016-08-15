

/* GET home page. */
router.get('/', function(req, res, next) {
    res.header("Content-Type", "application/json");
    req.db.connect();
    //var controller = require("./controllers/welcome");
    //controller.init(req, res);
    req.db.end();
});