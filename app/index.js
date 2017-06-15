const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

//
app.use(morgan('dev'));
app.use(bodyParser.json());

// View engine setup
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Load routes
const routes = require('./routes');
app.use('/', routes);

// Listen
const port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('Listening at http://localhost:' + port);
});
