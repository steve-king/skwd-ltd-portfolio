const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const tokenLifespan = '30 days';

/**
 * Generate
 * Express middleware
 * - Create a signed JWT accessToken with user's email address
 * - Attach accessToken to the req.body
 */
function generate(req, res, next) {
  const payload = { email: req.body.email };
  const options = { expiresIn: tokenLifespan };

  const access_token = jwt.sign(payload, JWT_SECRET, options,
    (err, accessToken) => {
      if (err) {
        console.log(err); // Log the internal error
        // Send generic 500 error to client
        let error = new Error();
        error.status = 500;
        next(error);
      } else {
        req.body.accessToken = accessToken;
        console.log('ACCESS TOKEN: ', accessToken);
        next();
      }
    }
  );
}

/**
 * ProtectedResource
 * Express middleware
 * - Checks if Authorization header is valid
 * - If not responds with a 401 unauthorised error
 */
function protectedResource(req, res, next) {
  const authHeader = req.get('Authorization');

  if (authHeader) {
    const accessToken = authHeader.replace('Bearer ', '');
    try {
      req.body.accessTokenDecoded = jwt.verify(accessToken, JWT_SECRET);
      return next();
    }
    catch(err) {
      let error = new Error();
      error.status = 401; // unauthorised
      error.message = 'Protected resource - Invalid or expired accessToken';
      return next(error);
    }
  } else {
    let error = new Error();
    error.status = 401; // unauthorised
    error.message = 'Protected resource - No accessToken provided';
    return next(error);
  }
  return next();
}

/**
 * isValid
 * @param req {Express req object}
 * @return {bool}
 * A simple check whether the Authorization header is present and legit.
 * Used where we don't want a request to be completely blocked due to the absence of a Bearer token.
 */
function isValid(req) {
  const authHeader = req.get('Authorization');
  if (authHeader) {
    const accessToken = authHeader.replace('Bearer ', '');
    if (jwt.verify(accessToken, JWT_SECRET)) {
      return true;
    }
  }
  return false;
}

module.exports = {
  generate,
  protectedResource,
  isValid,
};
