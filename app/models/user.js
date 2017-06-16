const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

/**
 * User schema
 */
const User = sequelize.define('user', {
  email: Sequelize.STRING,
  // invitationId: Sequelize.STRING,
  loginCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogin: Sequelize.DATE,
  logoutCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogout: Sequelize.DATE,
});

/**
 * Syncronise schema to database
 * - BE CAREFUL if you need to use 'alter' in production
 */
if (process.env.NODE_ENV === 'development') {
  sequelize.sync({ alter: true});
} else {
  sequelize.sync();
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
  getCreate,
  get,
  update,
};
