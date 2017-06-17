require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const AccessToken = require('app/utils/access-token');

describe('utils/access-token', () => {
  it ('generateToken() returns a signed string', done => {
    expect(AccessToken.generate('test@test.com')).to.be.a('string');
    done();
  });

  it ('authenticateToken() returns a decoded accessToken', done => {
    const authHeader = 'Bearer ' + AccessToken.generate('test@test.com');
    const payload = AccessToken.authenticate(authHeader);
    expect(payload).to.be.a('object');
    expect(payload.email).to.equal('test@test.com');
    expect(payload.iat).to.be.a('number');
    expect(payload.exp).to.be.a('number');
    done();
  });

  it ('authenticateToken() throws error for an expired accessToken', done => {
    const accessToken = AccessToken.generate('test@test.com', 0);
    try{ AccessToken.authenticate(accessToken) }
    catch (err) { expect(err.message).to.equal('jwt expired') }
    done();
  });
});
