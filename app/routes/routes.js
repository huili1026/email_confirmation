const users = require("../controller/controller.js");


module.exports = function(router) {

    // user registration route
    router.post("/users", users.create);
    
    // user login route
    //http://localhost:port/api/authenticate
    router.post('/authenticate', users.findUser);

    router.put("/activate/:token", users.findOne);

    return router;
  };