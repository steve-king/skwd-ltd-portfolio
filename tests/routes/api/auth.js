const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

let app = require('app');

describe('api/auth', () => {

  let user;

  // Clean up
  after(done => {
      app.UserModel
        .delete(user.id)
        .then(() => app.database.close());
      app.server.close();
      done();
  });

  it('should respond with an accessToken', (done) => {
    chai.request(app.server)
      .post('/api/auth')
      .send({ email: 'npm.test@steveking.info', invitationToken: '123' })
      .end((err, res) => {
        user = res.body.user;
        expect(res.status).to.equal(200);
        expect(user).to.have.property('accessToken');
        app.UserModel
          .get(user.id)
          .then(user => {
            expect(user.loginCount).to.equal(1);
            done();
          });
      });
  });

  it('Invalid email - 400 with error message', (done) => {
    chai.request(app.server)
      .post('/api/auth')
      .send({ email: 'test', invitationToken: '123' })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Missing invitationToken - 401 with error message', (done) => {
    chai.request(app.server)
      .post('/api/auth')
      .send({ email: 'npm.test@steveking.info', invitationToken: '' })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('Logs out the user', (done) => {
    chai.request(app.server)
      .get('/api/auth/logout/' + user.id)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        app.UserModel
          .get(user.id)
          .then(user => {
            expect(user.logoutCount).to.equal(1);
            done();
          });
      });
  });
});
