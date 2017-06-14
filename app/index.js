var express = require('express');
var app = express();

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Routes
// -----------------------------------------------
// Static assets
app.use(express.static(process.cwd() + '/public'));

// Index view
app.get('/', function(req, res){
  res.render('index.html', {
    foo: process.env.DATABASE_URL
  });
});

// Listen
var port = process.env.PORT;
app.listen(port, function(){
  console.log('Listening at http://localhost:' + port);
});
