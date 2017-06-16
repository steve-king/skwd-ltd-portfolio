/**
 * @param email {string}
 * @return {string}
 */
function validateEmail(_email) {
  const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const email = _email.trim();
  if (!email) {
    throw new Error('email.required');
  }
  if(!pattern.test(email)) {
    throw new Error('email.invalid');
  }
  return email;
}

module.exports = {
  validateEmail,
};
