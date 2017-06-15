const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

/**
 * User schema
 */
const User = sequelize.define('user', {
  email: Sequelize.STRING,
  invitationToken: Sequelize.STRING,
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

/**
 * Login
 * Express middleware
 * - Find existing user or create new
 * - Save accessToken, invitationToken and date info
 * - Add user object to the request body
 */
function login(req, res, next) {
  User.findOrCreate({ where: { email: req.body.email }})
  .then(result => {
    const user = result[0];

    // Update the user
    user.invitationToken = req.body.invitationToken;
    user.loginCount ++;
    user.lastLogin = new Date();

    return user.save();
  })
  .then(user => {
    // Attach user fields to req.body
    const { id, email } = user.get({ plain: true });
    req.body.user = {
      id,
      email,
      accessToken: req.body.accessToken,
      loggedIn: true
    };
    next();
  })
  .catch(err => {
    console.log(err); // Log the internal error
    // Send generic 500 error to client
    let error = new Error();
    error.status = 500;
    next(error);
  });
}

/**
 * Logout
 * Express middleware
 * - Keep a date record of user deleting their accessToken
 */
function logout(req, res, next) {
  User.find({ where: { email: req.body.email}})
  .then(user => {
    if (user) {
      user.logoutCount ++;
      user.lastLogout = new Date();
      return user.save();
    }
  })
  .then(user => {
    // Attach user fields to req.body
    const { email } = user.get({ plain:true });
    req.body.user = {
      email,
      loggedIn: false
    };
    next();
  })
  .catch(err => {
    console.log(err); // Log the internal error
    // Send generic 500 error to client
    let error = new Error();
    error.status = 500;
    next(error);
  });
}

module.exports = {
  login,
  logout,
};
