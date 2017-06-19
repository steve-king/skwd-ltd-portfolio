require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

const UserModel = require('app/models/user');

describe('models/user', () => {

  // Stub functions on the sequelize object
  let sequelizeDefine;
  let sequelizeSync;
  beforeEach(() => {
    sequelizeDefine = sinon.stub(sequelize, 'define');
    sequelizeSync = sinon.stub(sequelize, 'sync');
  });
  afterEach(() => {
    sequelize.define.restore();
    sequelize.sync.restore();
  });

  it ('init() calls sequelize.define() with the table name', done => {
    const User = UserModel(sequelize, process.env.NODE_ENV);
    expect(sequelizeDefine.calledWith('user')).to.equal(true);
    done();
  });

  it ('init() calls sequelize.sync() in development', done => {
    const User = UserModel(sequelize, 'development');
    expect(sequelizeSync.called).to.equal(true);
    done();
  });

  it ('init() calls sequelize.sync() without alter option in production', done => {
    const User = UserModel(sequelize, 'production');
    expect(
      sequelizeSync.neverCalledWith(
        sinon.match.has('alter', true)
      )
    ).to.equal(true);
    done();
  });
});

describe('models/user', () => {

  let user;
  const User = UserModel(sequelize, process.env.NODE_ENV);

  it('getCreate() gets/creates returns a user by email', done => {
    User.getCreate('npm.test@steveking.info')
    .then(_user => {
      user = _user;
      expect(user).to.have.property('email');
      expect(user.email).to.equal('npm.test@steveking.info')
      done();
    })
  });

  it('get() returns a user by id', done => {
    User.get(user.id)
    .then(user => {
      expect(user).to.have.property('email');
      expect(user.email).to.equal('npm.test@steveking.info')
      done();
    })
  });

  it('update() updates user fields', done => {
    User.update(user.id, { email: 'npm.test2@steveking.info'})
    .then(user => {
      expect(user).to.have.property('email');
      expect(user.email).to.equal('npm.test2@steveking.info')
      done();
    })
  });

  it('delete() deletes a user by id', done => {
    User.delete(user.id)
    .then(success => {
      expect(success).to.equal(1);
      done();
    })
  });
});
