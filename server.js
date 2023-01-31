var express = require("express");
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var bodyParser = require("body-parser");
var router = express.Router();
var appRoutes = require("./app/routes/routes")(router);
var path = require('path');

app.use(morgan('dev'));  // log request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'));  //let frontend access file
app.use('/api', appRoutes);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

// app.get('/activate/:token', function(req, res){
//   console.log('click link=>' + req.params.token);
//   res.sendFile(path.join(__dirname + '/public/app/views/pages/home.html'));
// });


// use 8080 or the environment to which you deploying to has 
// a specific server that it requires use that instead.
// accomendate for deployment eg. on heroku
app.listen(port, function(){
  console.log('Running the server on port ' + port);
});

