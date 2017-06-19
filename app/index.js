const app = require('express')();

// Setup
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

// Models
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);
const UserModel = require('app/models/user')(sequelize);

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
