const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
require('../models/UserInfo');

const should = chai.should();

const {DATABASE_URL} = require('../config');
const userInfo = mongoose.model('userInfo');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function tearDownDb() {
  return new Promise((resolve, reject) => {
    console.warn('Deleting database');
    mongoose.connection.dropDatabase()
      .then(result => resolve(result))
      .catch(err => reject(err))
  });
}


function seedUserData() {
  console.info('seeding user data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      name: {
  		firstName: faker.name.findName(),
  		lastName: faker.name.findName()
  	   },
  	  email: faker.internet.email()
    });
  }
  return userInfo.insertMany(seedData);
}


describe('user API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedUserData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


  describe('GET endpoint', function() {

    it('should return all existing users', function() {

      let res;
      return chai.request(app)
        .get('/userInfo')
        .then(_res => {
          res = _res;
          // check that res has correct status
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);

          return userInfo.count();
        })
        .then(count => {
          // check number of posts v number of posts in db
          res.body.should.have.length.of(count);
        });
    });

    it('should return users with right fields', function() {

      let resUser;
      return chai.request(app)
        .get('/userInfo')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(post) {
            post.should.be.a('object');
            post.should.include.keys('name', 'email', 'username');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resUser = res.body[0];
          return userInfo.findById(resUser.id).exec();
        })
        .then(post => {
          resUser.name.should.equal(post.name);
          resUser.email.should.equal(post.email);
          resUser.username.should.equal(post.username);
        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new user', function() {

      const newUser = {
	      name: faker.address.name(), 
	      email: faker.address.email(),
	      username: faker.address.username()
      };

      return chai.request(app)
        .post('/userInfo')
        .send(newUser)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'name', 'email', 'username');
          res.body.name.should.equal(newUser.name);
          res.body.id.should.not.be.null;
          res.body.email.should.equal(newUser.email);
          res.body.content.should.equal(newUser.content);
          res.body.username.should.equal(newUser.username);
          return userInfo.findById(res.body.id).exec();
        })
        .then(function(post) {
          post.name.should.equal(newUser.name);
          post.username.should.equal(newUser.username);
          post.email.should.equal(newUser.email);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update fields you send over', function() {
      const updateData = {
        name: 'Aleah Manzi',
        email: 'aleah@gmail.com',
        username: 'username'
      };

      return userInfo
        .findOne()
        .exec()
        .then(post => {
          updateData.id = post.id;

          return chai.request(app)
            .put(`/userInfo/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.name.should.equal(updateData.name);
          res.body.email.should.equal(updateData.email);
          res.body.username.should.equal(updateData.username);

          return userInfo.findById(res.body.id).exec();
        })
        .then(post => {
          post.name.should.equal(updateData.name);
          post.username.should.equal(updateData.username);
          post.email.should.equal(updateData.email);
        });
    });
  });

  describe('DELETE endpoint', function() {

    it('should delete a username by id', function() {

      let post;

      return userInfo
        .findOne()
        .exec()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/userInfo/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return userInfo.findById(post.id);
        })
        .then(_post => {

          should.not.exist(_post);
        });
    });
  });
});

