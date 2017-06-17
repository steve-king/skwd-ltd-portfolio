/**
 * @param numDays {int} - number of days the token will be valid for
 *
 */
function generateToken(numDays = 30) {
  return 'Generated token';
}

/**
 * Validate
 */
function validateToken(invitationToken) {
  if (!invitationToken) {
    throw new Error('invitationToken.required');
  }
  return invitationToken;
}



module.exports = {
  validate: validateToken,
  generate: generateToken,
};
