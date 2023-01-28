const User = require("../models/user.js");
const bcrypt = require("bcrypt");

// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.email) {
      res.json({ success: false, message: 'Ensure username, email, and password were provided' });
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
      if (err) {
        res.json({ success: false, message: 'Username or email already exists!' });
      } else { 
        res.json({ success: true, message: 'User created!' });
      }
    });
};
  