const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    var value = req.body.password.toString();
    const salt = bcrypt.genSalt(10);
    var hash = await bcrypt.hash(value, parseInt(salt));

    // Create a User
    const user = new User({
      username: req.body.username,
      password: hash ,
      email: req.body.email
    });
  
    // Save User in the database
    User.create(user, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      else res.send('user created!' + data);
    });
  };
  