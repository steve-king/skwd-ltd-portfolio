/**
 * Validate
 * Express middleware
 * - validates req.body.invitationToken
 */
function validateToken(invitationToken) {
  if (!invitationToken) {
    throw new Error('invitationToken.required');
  }
  return invitationToken;
}

/**
 * @param numDays {int} - number of days the token will be valid for
 *
 */
function generateToken(numDays) {

}

module.exports = {
  validate: validateToken,
  generate: generateToken,
};
