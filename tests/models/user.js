require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const sinon = require('sinon');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL);

const User = require('app/models/user');

describe('models/user', () => {

  // Define/restore stub functions for sequelize
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
    User.init(sequelize, process.env.NODE_ENV);
    expect(sequelizeDefine.calledWith('user')).to.equal(true);
    done();
  });

  it ('init() calls sequelize.sync() in development', done => {
    User.init(sequelize, 'development');
    expect(sequelizeSync.called).to.equal(true);
    done();
  });

  it ('init() calls sequelize.sync() without alter option in production', done => {
    User.init(sequelize, 'production');
    expect(
      sequelizeSync.neverCalledWith(
        sinon.match.has('alter', true)
      )
    ).to.equal(true);
    done();
  });
});

describe('models/user', () => {

});
