/**
 * Validate
 * Express middleware
 * - validates req.body.invitationToken
 */
function validate(req, res, next) {
  if (!req.body.invitationToken) {
    let error = new Error();
    error.status = 401; // unauthorised
    error.message = 'Invalid or expired invitationToken';
    return next(error);
  }
  return next();
}

/**
 * @param numDays {int} - number of days the token will be valid for
 *
 */
function generate(numDays) {

}

module.exports = {
  validate
};
