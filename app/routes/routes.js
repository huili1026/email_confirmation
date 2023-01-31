const users = require("../controller/controller.js");


module.exports = function(router) {

    // Create a new User
    router.post("/users", users.create);
    
    router.put("/activate/:token", users.findOne);

    return router;
  };