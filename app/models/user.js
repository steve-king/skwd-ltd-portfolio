const Sequelize = require('sequelize');

/**
 * User schema
 */
const userSchema = {
  email: Sequelize.STRING,
  loginCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogin: Sequelize.DATE,
  logoutCount: { type: Sequelize.INTEGER, defaultValue: 0 },
  lastLogout: Sequelize.DATE,
};

let instance;
class UserModel {

  constructor(sequelize, NODE_ENV) {

    // Return new instance if we call the model again with sequelize (for tests)
    if (!instance || sequelize) {
      instance = this;
      this.db = sequelize.define('user', userSchema);

      // Allow manual setting of NODE_ENV in constructor (for tests)
      if (!NODE_ENV) {
        NODE_ENV = process.env.NODE_ENV;
      }

      // Sync schema to DB
      // - BE CAREFUL if you need to use 'alter' in production
      if (NODE_ENV === 'development') {
        sequelize.sync({ alter: true });
      } else {
        sequelize.sync();
      }
    }

    return instance;
  }

  getCreate(email) {
    return this.db
      .findOrCreate({ where: { email }})
      .then(rows => {
        const user = rows[0];
        return user.get({ plain: true });
      })
      .catch(err => {
        console.error(err);
        throw err;
      });
  }

  get(id) {
    return this.db
      .findOne({ where: { id }})
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

  update(id, newFields) {
    return this.db
      .findOne({ where: { id }})
      .then(user => user.update(newFields))
      .then(user => user.get({ plain: true }))
      .catch(err => {
        throw err;
      });
  }

  delete(id) {
    return this.db
      .destroy({ where: {id}})
      .then(success => {
        return success;
      })
      .catch(err => {
        throw err;
      });
  }
}

module.exports = (sequelize, NODE_ENV) => new UserModel(sequelize, NODE_ENV);
