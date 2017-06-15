const express = require('express');
const router = express.Router();

const email = require('./email');
const invitationToken = require('./invitation-token');
const accessToken = require('./access-token');
const User = require('./User');

// AUTH API
// ----------------------------------------------------

/**
 * Login
 * endpoint: POST api/auth
 * @param req.body.email {string}
 * @param req.body.invitationToken {string}
 */
router.post('/',
  email.validate,
  invitationToken.validate,
  accessToken.generate,
  User.login,
  (req, res) => {
    res.json({
      user: req.body.user,
    });
  }
);

/**
 * Login
 * endpoint: POST api/auth
 * @param req.body.email {string}
 * - This doesn't really do much except record the fact the user has chosen to delete their accessToken
 */
router.post('/logout',
  User.logout,
  (req, res) => {
    res.json({
      user: req.body.user,
    });
  }
);

module.exports = router;
