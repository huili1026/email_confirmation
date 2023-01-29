const User = require("../models/user.js");
const bcrypt = require("bcrypt");
require('dotenv').config();
var jwt = require('jsonwebtoken'); // Import JWT Package
var secret = 'harrypotter'; // Create custom secret for use in JWT
var nodemailer = require('nodemailer'); // Import Nodemailer Package
var sgTransport = require('nodemailer-sendgrid-transport'); // Import Nodemailer Sengrid Transport Package
const sgMail = require('@sendgrid/mail')


// Create and Save a new User
exports.create = async (req, res) => {
    // Validate request
    if (!req.body.username || !req.body.password || !req.body.email) {
      res.json({ success: false, message: 'Ensure username, email, and password were provided' });
    } 

    var value = req.body.password; 
    const salt = bcrypt.genSalt(10);
    var hash = await bcrypt.hash(value, parseInt(salt));

    // Create a User 
    const user = new User({
      username: req.body.username,
      password: hash,
      email: req.body.email,
    });

    const token = jwt.sign(
      { username: user.username, email: user.email },
      secret,
      {
        expiresIn: "12h",
      }
    );
    user.temporarytoken = token;
      
    // Save User in the database
    await User.create(user, (err, data) => {
      if (err) {
        res.json({ success: false, message: 'Username or email already exists!' });
      } else { 

        sgMail.setApiKey(process.env.SENDGRID_API_KEY)
        const msg = {
            to: user.email,
            from: 'gretalee1026@gmail.com', // Change to your verified sender
            subject: 'Your Activation Link',
            text: 'Hello ' + user.name + ', thank you for registering at localhost.com. Please click on the following link to complete your activation: http://localhost:8080/activate/' + user.temporarytoken,
            html: 'Hello<strong> ' + user.name + '</strong>,<br><br>Thank you for registering at localhost.com. Please click on the link below to complete your activation:<br><br><a href="http://localhost:8080/activate/' + user.temporarytoken + '">http://localhost:8080/activate/'+ user.temporarytoken + '</a>'
        }
        sgMail.send(msg).then(() => {
            console.log('Email sent')
        }) .catch((error) => {
            console.error(error)
        })

        res.json({ success: true, message: 'Account registered! Please check your e-mail for activation.' });
      }
    });
};
  
exports.findOne = async (req, res) => {
  User.findBytoken(req.params.temporarytoken, (err, data) => {
    var token = req.params.temporarytoken;
    console.log(token);
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with id ${req.params.temporarytoken}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Tutorial with id " + req.params.temporarytoken
        });
      }
    } else {
      var user = new User(res.body);
      jwt.verify(token, secret, function(err, decoded) {
        if (err) {
            res.json({ success: false, message: 'Password link has expired' }); // Token has expired or is invalid
        } else {
            if (!user) {
                res.json({ success: false, message: 'Password link has expired' }); // Token is valid but not no user has that token anymore
            } else {
              user.temporarytoken = null;
              user.confirmed = true;
              res.json({ success: true, user: user }); // Return user object to controller
            }
        }
    }); 
    }  
  });
};

