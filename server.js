var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require("./app/routes/routes")(router);

app.use(morgan('dev'));  // log request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use('/api', appRoutes);

app.get('/home', function(req, res){
  res.send("hello from home");
});


// use 8080 or the environment to which you deploying to has 
// a specific server that it requires use that instead.
// accomendate for deployment eg. on heroku
app.listen(port, function(){
  console.log('Running the server on port ' + port);
});

