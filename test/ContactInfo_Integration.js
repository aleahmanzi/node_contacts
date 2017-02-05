const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
require('../models/ContactInfo');

const should = chai.should();

const {DATABASE_URL} = require('../config');
const contactInfo = mongoose.model('contactInfo');
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


function seedContactData() {
  console.info('seeding contact data');
  const seedData = [];
  for (let i=1; i<=10; i++) {
    seedData.push({
      name: {
  		firstName: faker.name.findName(),
  		lastName: faker.name.findName()
  	   },
	  birthday: {
	  	date: faker.date.recent()
	  },
	  email: {
	    personal: faker.internet.email(),
	    work: faker.internet.email() 
	  }
	});
  }

  return contactInfo.insertMany(seedData);
}


describe('contact API resource', function() {

  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedContactData();
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
        .get('/contactInfo')
        .then(_res => {
          res = _res;
          console.log("here's the data", res)

          // check that res has correct status
          res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);

          return contactInfo.count();
        })
        .then(count => {
          // check number of posts v number of posts in db
          res.body.should.have.length.of(count);
        });
    });

    it('should return addresses with right fields', function() {

      let resContact;
      return chai.request(app)
        .get('/contactInfo')
        .then(function(res) {

          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body.should.have.length.of.at.least(1);

          res.body.forEach(function(post) {
            post.should.be.a('object');
            post.should.include.keys('name', 'birthday', 'phoneNumber', 'email');
          });
          // just check one of the posts that its values match with those in db
          // and we'll assume it's true for rest
          resContact = res.body[0];
          return contactInfo.findById(resContact.id).exec();
        })
        .then(post => {
          resContact.name.should.equal(post.name);
          resContact.birthday.should.equal(post.birthday);
          resContact.phoneNumber.should.equal(post.phoneNumber);
          resContact.email.should.equal(post.email);

        });
    });
  });

  describe('POST endpoint', function() {

    it('should add a new addres', function() {

      const newContact = {
	      name: {
	  		firstName: faker.name.findName(),
	  		lastName: faker.name.findName()
	  	   },
		  birthday: {
		  	date: faker.date(),
		  	age: faker.number()
		  },
		  phoneNumber: {
		    mobile: faker.phone(),
		    work: faker.phone(),
		    other: faker.phone()
		  },
		  email: {
		    personal: faker.internet.email(),
		    work: faker.internet.email() 
		  }
      };

      return chai.request(app)
        .post('/contactInfo')
        .send(newContact)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'name', 'birthday', 'phoneNumber', 'email');
          res.body.name.should.equal(newContact.name);
          res.body.id.should.not.be.null;
          res.body.birthday.should.equal(newContact.birthday);
          res.body.content.should.equal(newContact.content);
          return contactInfo.findById(res.body.id).exec();
        })
        .then(function(post) {
          post.name.should.equal(newContact.name);
          post.email.should.equal(newContact.email);
          post.birthday.should.equal(newContact.birthday);
        });
    });
  });

  describe('PUT endpoint', function() {

    it('should update fields you send over', function() {
      const updateData = {
        name: 'aleah manzi',
        birthday: 'December 19',
        phoneNumber: '603-555-5555'
      };

      return contactInfo
        .findOne()
        .exec()
        .then(post => {
          updateData.id = post.id;

          return chai.request(app)
            .put(`/contactInfo/${post.id}`)
            .send(updateData);
        })
        .then(res => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.name.should.equal(updateData.name);
          res.body.birthday.should.equal(updateData.birthday);
          res.body.phoneNumber.should.equal(updateData.phoneNumber);

          return contactInfo.findById(res.body.id).exec();
        })
        .then(post => {
          post.name.should.equal(updateData.name);
          post.phoneNumber.should.equal(updateData.phoneNumber);
          post.birthday.should.equal(updateData.birthday);
        });
    });
  });

  describe('DELETE endpoint', function() {

    it('should delete a contact by id', function() {

      let post;

      return contactInfo
        .findOne()
        .exec()
        .then(_post => {
          post = _post;
          return chai.request(app).delete(`/contactInfo/${post.id}`);
        })
        .then(res => {
          res.should.have.status(204);
          return contactInfo.findById(post.id);
        })
        .then(_post => {

          should.not.exist(_post);
        });
    });
  });
});