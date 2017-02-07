const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
require('../models/AddressInfo');


const should = chai.should();

const {DATABASE_URL} = require('../config');
const addressInfo = mongoose.model('addressInfo');
const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);
mongoose.Promise = global.Promise;


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
    console.log("how about here????", addressInfo);
    it('should return all existing addresses', function() {

      let res;
      return chai.request(app)
        .get('/addressInfo')
        .then(function(_res) {
          console.log('did we make it here???');
          res = _res;
          // check that res has correct status
          res.should.have.status(200);
          res.body.addressInfo.should.have.length.of.at.least(1);
          return addressInfo.count();
        })
        .then(function(count) {
          // check number of posts v number of posts in db
          res.body.addressInfo.should.have.length.of(count);
        });
    });

    it('should return addresses with right fields', function() {

      let resAddress;
      return chai.request(app)
        .get('/addressInfo')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.addressInfo.should.be.a('array');
          res.body.addressInfo.should.have.length.of.at.least(1);

          res.body.addressInfo.forEach(function(addressInfo) {
            addressInfo.should.be.a('object');
            addressInfo.should.include.keys('street1', 'city', 'state');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resAddress = res.body.addressInfo[0];
          return addressInfo.findById(resAddress.id).exec();
        })
        .then(function(addressInfo) {
          resAddress.street1.should.equal(addressInfo.street1);
          resAddress.city.should.equal(addressInfo.city);
          resAddress.state.should.equal(addressInfo.state);
        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new addres', function() {

      const newAddress = {
	      street1: faker.Address.streetName(), 
	      city: faker.Address.city(),
	      state: faker.Address.state()
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
        .then(function(addressInfo) {
          addressInfo.street1.should.equal(newAddress.street1);
          addressInfo.state.should.equal(newAddress.state);
          addressInfo.city.should.equal(newAddress.city);
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
        .then(function(addressInfo) {
          updateData.id = addressInfo.id;

          return chai.request(app)
            .put(`/addressInfo/${addressInfo.id}`)
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
        .then(function(addressInfo) {
          addressInfo.street1.should.equal(updateData.street1);
          addressInfo.state.should.equal(updateData.state);
          addressInfo.city.should.equal(updateData.city);
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