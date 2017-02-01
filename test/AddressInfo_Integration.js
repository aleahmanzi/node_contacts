const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();

const {DATABASE_URL} = require('../config');
const {addressInfo} = require('../models/AddressInfo');
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


function seedAddressData() {
  console.info('seeding address data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      street1: faker.address.streetName(), 
      city: faker.address.city(),
      state: faker.address.state()
    });
  }
  return addressInfo.insertMany(seedData);
}


describe('address API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedAddressData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });


  describe('GET endpoint', function() {

    it('should return all existing addresses', function() {

      let res;
      return chai.request(app)
        .get('/addressInfo')
        .then(_res => {
          res = _res;
          // check that res has correct status
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);

          return addressInfo.count();
        })
        .then(count => {
          // check number of posts v number of posts in db
          res.body.should.have.length.of(count);
        });
    });

    it('should return addresses with right fields', function() {

      let resAddress;
      return chai.request(app)
        .get('/addressInfo')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(post) {
            post.should.be.a('object');
            post.should.include.keys('street1', 'city', 'state');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resAddress = res.body[0];
          return addressInfo.findById(resAddress.id).exec();
        })
        .then(post => {
          resAddress.street1.should.equal(post.street1);
          resAddress.city.should.equal(post.city);
          resAddress.state.should.equal(post.state);
        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new addres', function() {

      const newAddress = {
	      street1: faker.address.streetName(), 
	      city: faker.address.city(),
	      state: faker.address.state()
      };

      return chai.request(app)
        .post('/addressInfo')
        .send(newAddress)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'street1', 'city', 'state');
          res.body.street1.should.equal(newAddress.street1);
          res.body.id.should.not.be.null;
          res.body.city.should.equal(newAddress.city);
          res.body.content.should.equal(newAddress.content);
          return addressInfo.findById(res.body.id).exec();
        })
        .then(function(post) {
          post.street1.should.equal(newAddress.street1);
          post.state.should.equal(newAddress.state);
          post.city.should.equal(newAddress.city);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update fields you send over', function() {
      const updateData = {
        street1: '123 Test Road',
        city: 'Brooklyn',
        state: 'New York'
      };

      return addressInfo
        .findOne()
        .exec()
        .then(post => {
          updateData.id = post.id;

          return chai.request(app)
            .put(`/addressInfo/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.street1.should.equal(updateData.street1);
          res.body.city.should.equal(updateData.city);
          res.body.state.should.equal(updateData.state);

          return addressInfo.findById(res.body.id).exec();
        })
        .then(post => {
          post.street1.should.equal(updateData.street1);
          post.state.should.equal(updateData.state);
          post.city.should.equal(updateData.city);
        });
    });
  });

  describe('DELETE endpoint', function() {

    it('should delete an address by id', function() {

      let post;

      return addressInfo
        .findOne()
        .exec()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/addressInfo/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return addressInfo.findById(post.id);
        })
        .then(_post => {

          should.not.exist(_post);
        });
    });
  });
});