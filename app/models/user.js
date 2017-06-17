const Sequelize = require('sequelize');
var User;

/**
 * User schema
 */
const userSchema = {
  email: Sequelize.STRING,
  loginCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogin: Sequelize.DATE,
  logoutCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogout: Sequelize.DATE,
}

function init(sequelize, NODE_ENV, userSchema) {
  if (!NODE_ENV) {
    NODE_ENV = process.env.NODE_ENV;
  }

  User = sequelize.define('user', userSchema);

  // Sync schema to DB
  // - BE CAREFUL if you need to use 'alter' in production
  if (NODE_ENV === 'development') {
    sequelize.sync({ alter: true});
  } else {
    sequelize.sync();
  }
}

function getCreate(email) {
  return User.findOrCreate({ where: { email }})
    .then(rows => {
      const user = rows[0];
      return user.get({ plain: true });
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

function get(id) {
  return User.findOne({ where: { id }})
    .then(user => {
      if (user === null) {
        throw new Error('404');
      }
      return user.get({ plain: true });
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}

function update(id, newFields) {
  return User
    .findOne({ where: { id }})
    .then(user => user.update(newFields))
    .then(user => user.get({ plain: true }))
    .catch(err => {
      throw err;
    });
}

module.exports = {
  init,
  getCreate,
  get,
  update,
};
