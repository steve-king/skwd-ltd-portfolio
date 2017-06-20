const app = require('express')();

console.log('hello');

// Setup
app.use(require('morgan')('dev'));
app.use(require('body-parser').json());

// Models
const Sequelize = require('sequelize');
const database = new Sequelize(process.env.DATABASE_URL, { logging: false });
const UserModel = require('app/models/user')(database);

// View
app.engine('html', require('ejs').renderFile);
app.set('views', __dirname + '/views');

// Controller
const routes = require('app/routes');
app.use('/', routes);

// Listen
const port = process.env.PORT || 5000;
const server = app.listen(port, function(){
  console.log('Listening at http://localhost:' + port);
});

// export for testing
if (process.env.NODE_ENV === 'test') {
  module.exports = {
    database,
    server,
    UserModel,
  };
}
