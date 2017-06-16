const express = require('express');
const router = express.Router();

const form = require('utils/form');
const InvitationToken = require('utils/invitation-token');
const AccessToken = require('utils/access-token');
const User = require('models/user');

// AUTH API
// ----------------------------------------------------

/**
 * Login
 * endpoint: POST api/auth
 * @param req.body.email {string}
 * @param req.body.invitationToken {string}
 * @return user {object}
 */
router.post('/',
  (req, res, next) => {

    let email;
    let invitationToken;
    let accessToken;

    try { email = form.validateEmail(req.body.email); }
    catch (err) { return res.status(400).send({ error: err.message }); }

    try { invitationToken = InvitationToken.validate(req.body.invitationToken); }
    catch (err) { return res.status(401).send({ error: err.message }); }

    try { accessToken = AccessToken.generate(email); }
    catch (err) {
      console.error(err);
      return res.status(500).send();
    }

    User.getCreate(email)
      .then(user =>
        User.update(user.id, {
          invitationToken,
          loginCount: user.loginCount + 1,
          lastLogin: new Date()
        })
      )
      .then(user => {
        delete user.invitationToken;
        user.accessToken = accessToken;
        res.json({ user });
      })
      .catch(err => {
        console.error(err);
        res.status(500).send();
      });
  }
);

/**
 * Logout
 * endpoint: POST api/auth/logout
 * @param req.body.email {string}
 * - record the fact the user has decided to delete their accessToken
 */
router.get('/logout/:userId',
  (req, res) => {
    User.get(req.params.userId)
      .then(user =>
        User.update(user.id, {
          logoutCount: user.logoutCount + 1,
          lastLogout: new Date(),
        })
      )
      .then(user => res.status(200).send())
      .catch(err => {
        if (err.message === '404') {
          res.status(404).send({ error: 'User not found' });
        } else {
          res.status(500).send();
        }
      });
  }
);

module.exports = router;
