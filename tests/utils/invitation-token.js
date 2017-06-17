require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const InvitationToken = require('app/utils/invitation-token');

describe('utils/invitation-token', () => {
  it ('generateToken() returns a token string', done => {
    expect(InvitationToken.generate()).to.be.a('string');
    done();
  });

  it ('validateToken() throws "invitationToken.required" error if no string provided', done => {
    try { InvitationToken.validate(null) }
    catch (err) {
      expect(err.message).to.equal('invitationToken.required');
      done();
    }
  });

  it ('validateToken() returns payload for a valid token', done => {
    const token = InvitationToken.generate(30);
    expect(InvitationToken.validate(token)).to.be.a('string');
    done();
  });
});
