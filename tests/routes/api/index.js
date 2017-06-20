const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

let app = require('app');

describe('api', () => {
  after(done => {
      app.server.close();
      app.database.close();
      done();
  });

  it('should respond with JSON', (done) => {
    chai.request(app.server)
      .get('/api/pages/home')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('application/json');
        expect(res.body).to.have.property('title');
        done();
      });
  });
});
