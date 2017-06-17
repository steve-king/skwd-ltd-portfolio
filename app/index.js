const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Setup
app.use(morgan('dev'));
app.use(bodyParser.json());

// Models
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
require('app/models/user').init(sequelize);

// View
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Controller
const routes = require('app/routes');
app.use('/', routes);

// Listen
const port = process.env.PORT || 5000;
app.listen(port, function(){
  console.log('Listening at http://localhost:' + port);
});
