const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const form = require('app/utils/form');

describe('utils/form', () => {
  it('validateEmail() returns valid strings', done => {
    expect(form.validateEmail('test123@test.com')).to.equal('test123@test.com');
    done();
  });

  it('validateEmail() throws "email.required" error if string is empty', (done) => {
    const values = ['', null, false];
    values.forEach(email => {
      try { form.validateEmail(email) }
      catch (err) { expect(err.message).to.equal('email.required') }
    })
    done();
  });

  it('validateEmail() throws "email.invalid" error if string is invalid', (done) => {
    const values = [
      'test',
      123,
      'something@.',
      'test.com'
    ];
    values.forEach(email => {
      try { form.validateEmail(email) }
      catch (err) { expect(err.message).to.equal('email.invalid') }
    })
    done();
  });
});
