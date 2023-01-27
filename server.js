var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
const dbService = require('./dbService');

// when a request come in, it's gonna log it for you
app.use(morgan('dev'));


app.get('/', function(req, res){
  res.send("hello from home");
});

// use 8080 or the environment to which you deploying to has 
// a specific server that it requires use that instead.
// accomendate for deployment eg. on heroku
app.listen(port, function(){
  console.log('Running the server on port ' + port);
});

