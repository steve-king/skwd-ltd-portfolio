const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

/**
 * @param email {string}
 * @param expDays {integer} (optional)
 * @return accessToken {string | error}
 * - Create a signed JWT accessToken with user's email address
 */
function generateToken(email, expDays = 30) {
  return jwt.sign({ email }, JWT_SECRET, {
    expiresIn: expDays + ' days'
  });
}

/**
 * @param req {Express req object}
 * @return {bool | error}
 * A simple check whether the Authorization header is present and legit.
 * Used where we don't want a request to be completely blocked due to the absence of a Bearer token.
 */
function authenticateToken(authHeader) {
  if (authHeader) {
    const accessToken = authHeader.replace('Bearer ', '');
    try { return jwt.verify(accessToken, JWT_SECRET) }
    catch (err) { throw err; }
  }
  throw new Error('No accessToken provided');
}

module.exports = {
  generate: generateToken,
  authenticate: authenticateToken,
};
