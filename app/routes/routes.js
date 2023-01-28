const users = require("../controller/controller.js");
module.exports = function(router) {

    router.get('/', function (req, res, next) {
        console.log("Router Working");
        res.end();
    });
  
    // Create a new User
    router.post("/", users.create);

    return router;
  };