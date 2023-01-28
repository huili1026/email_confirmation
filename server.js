var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require("body-parser");

// when a request come in, it's gonna log it for you
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.post('/users', function(req,res){
  res.send('testing user routs');
});

app.get('/home', function(req, res){
  res.send("hello from home");
});

require("./app/routes/routes.js")(app);

// use 8080 or the environment to which you deploying to has 
// a specific server that it requires use that instead.
// accomendate for deployment eg. on heroku
app.listen(port, function(){
  console.log('Running the server on port ' + port);
});

