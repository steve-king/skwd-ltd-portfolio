const chai = require('chai');
chai.use(require('chai-http'));
const expect = chai.expect;

const app = require('app');
const AccessToken = require('app/utils/access-token');

const privateSlug = 'farfetch-os';
const publicSlug = 'nike-running';

describe('api/projects', () => {
  let publicProjects;
  let allProjects;

  const validToken = AccessToken.generate('npm.test@steveking.info');
  const invalidToken = 'Invalid access token';

  // Clean up
  after(done => {
      app.server.close();
      done();
  });

  it('list public projects if token not present', (done) => {
    chai.request(app.server)
      .get('/api/projects')
      .end((err, res) => {
        publicProjects = res.body.projects;
        expect(res.status).to.equal(200);
        expect(publicProjects).to.be.an('array');
        let privateFound = false;
        publicProjects.forEach(project => {
          if (project.private) {
            privateFound = true;
          }
        });
        expect(privateFound).to.be.false;
        done();
      });
  });

  // In this case do not send 401 unauthorised response - just return the public list
  it('list public projects if token is present but not valid', (done) => {
    chai.request(app.server)
      .get('/api/projects')
      .set('Authorization', 'Bearer ' + invalidToken)
      .end((err, res) => {
        publicProjects = res.body.projects;
        expect(res.status).to.equal(200);
        expect(publicProjects).to.be.an('array');
        let privateFound = false;
        publicProjects.forEach(project => {
          if (project.private) {
            privateFound = true;
          }
        });
        expect(privateFound).to.be.false;
        done();
      });
  });

  it('list all projects if token is present and valid', (done) => {
    chai.request(app.server)
      .get('/api/projects')
      .set('Authorization', 'Bearer ' + validToken)
      .end((err, res) => {
        privateProjects = res.body.projects;
        expect(res.status).to.equal(200);
        expect(privateProjects).to.be.an('array');

        let privateFound = false;
        privateProjects.forEach(project => {
          if (project.private) {
            privateFound = true;
          }
        });
        expect(privateFound).to.be.true;
        done();
      });
  });

  it('load single public project by slug', (done) => {
    chai.request(app.server)
      .get('/api/projects/' + publicSlug)
      .end((err, res) => {
        expect(res.body.project).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('load a single private project if token is present and valid', (done) => {
    chai.request(app.server)
      .get('/api/projects/' + privateSlug)
      .set('Authorization', 'Bearer ' + validToken)
      .end((err, res) => {
        expect(res.body.project).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('Deny access to private project if token not present', (done) => {
    chai.request(app.server)
      .get('/api/projects/' + privateSlug)
      .end((err, res) => {
        expect(res.status).to.equal(401); // unauthorised
        done();
      });
  });

  it('Deny access to private project if token is invalid', (done) => {
    chai.request(app.server)
      .get('/api/projects/' + privateSlug)
      .set('Authorization', 'Bearer ' + invalidToken)
      .end((err, res) => {
        expect(res.status).to.equal(401); // unauthorised
        done();
      });
  });
});
