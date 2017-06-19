const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

let app = require('app');

describe('Routes', () => {
  after(done => {
      app.server.close();
      app.database.close();
      done();
  });

  it('GET / should load the index.html template', (done) => {
    chai.request(app.server)
      .get('/')
      .end((err, res) => {
        expect(err).to.equal(null);
        expect(res.status).to.equal(200);
        expect(res.type).to.equal('text/html');
        done();
      });
  });
});
