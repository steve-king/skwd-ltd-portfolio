/**
 * @param email {string}
 * @return {string}
 */
function validateEmail(_email) {

  if (!_email) {
    throw new Error('email.required');
  }

  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = _email.toString().trim();

  if(!pattern.test(email)) {
    throw new Error('email.invalid');
  }
  return email;
}

module.exports = {
  validateEmail,
};
