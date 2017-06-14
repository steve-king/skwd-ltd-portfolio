var express = require('express');
var app = express();

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Load routes
var routes = require('./routes');
app.use('/', routes);

// Listen
var port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('Listening at http://localhost:' + port);
});
