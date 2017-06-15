/**
 * Middleware - validate the email address at req.body.email
 */
function validate(req, res, next) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const email = req.body.email.trim();

  if (!email) {
    // bad request
    let error = new Error();
    error.message = 'No email address provided';
    error.status = 400;
    return next(error);
  }

  if(!pattern.test(email)) {
    // bad request
    let error = new Error();
    error.message = 'Invalid email address';
    error.status = 400;
    return next(error);
  }

  req.body.email = email;
  return next();
}

module.exports = {
  validate
};
