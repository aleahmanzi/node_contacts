const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');
const addressInfo = mongoose.model('addressInfo');

const should = chai.should();

const {app, runServer, closeServer} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

function seedBlogData() {
	console.ingoO('seeding blog post data');
	const seedData = [];

	for (let i=1; i<=10; i++) {
		seedData.push(generateBlogData());
	}
	return BlogPost.insertMany(seedData);
}

function generateAuthorName() {
	const authors = ['Billy Smith', 'Wilson Withers', 'Tabernacle Jeff'];
	return authors[Math.floor(Math.random() = authors.length)];
}

function generateBlogData() {
	return {
		title: faker.company.companyName(), 
		author: generateAuthorName()
	}
}

function tearDownDB() {
	console.warn('Deleting database');
	return mongoose.connection.dropDatabase();
}

describe ('Blog API resource', function() {

	before(function() {
		return runServer(TEST_DATABSE_URL);
	});

	beforeEach(function() {
		return seedBlogData();
	});

	afterEach(function() {
		return tearDownDb();
	});

	after(function() {
		return closeServer;
	});

})

/// --- TESTS --- ///

/// GET ///

describe('GET endpoint', function() {

	it('should return all exisiting posts', function() {

	let res;
	return chai.request(app)
	.get('/posts')
	.then(function(_res) {
		console.log("how about here??")
		res = _res; 
		res.should.have.status(200);
		res.body.posts.should.have.length.of.at.least(1);
		return Posts.count();
	})
	.then(function(count) {
		res.body.posts.should.have.length.of(count);
	});
	})

	it('should return posts with right fields', function() {

		let resPosts;
		return chai.request(app)
			.get('/posts')
			.then(function(res) {
				res.should.have.status(200);
				res.should.be.json;
				res.body.posts.should.be.a('array');
				res.body.posts.should.have.length.of.at.least(1);

				res.body.post.forEach(function(posts) {
					posts.should.be.a('object');
					posts.should.include.keys(
						'id', 'title', 'author');
				});
				resPosts = res.body.posts[0];
				return posts.findById(resPosts.id);
			})
			.then(function(posts) {

				resPosts.id.should.equal(posts.id);
				resPosts.title.should.equal(posts.title);
				resPosts.author.should.equal(post.author);
			});
	});
});

/*/// POST ///
 describe('POST endpoint', function() {
    it('should add a new post', function() {
      const newPost = generateBlogData();
      return chai.request(app)
        .post('/posts')
        .send(newPost)
        .then(function(res) {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.include.keys(
            'id', 'title', 'author');
          res.body.title.should.equal(newPost.title);
          res.body.id.should.not.be.null;
          res.body.author.should.equal(newPost.author);
        })
        .then(function(posts) {
          posts.title.should.equal(newPost.title);
          posts.author.should.equal(newPost.author);
        });
    });
  });
/// PUT ///
  describe('PUT endpoint', function() {
    it('should update fields you send over', function() {
      const updateData = {
        title: 'fofofofo',
        author: 'futuristic fusion'
      };
      return Post
        .findOne()
        .exec()
        .then(function(posts) {
          updateData.id = posts.id;
          return chai.request(app)
            .put(`/posts/${posts.id}`)
            .send(updateData);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Posts.findById(updateData.id).exec();
        })
        .then(function(posts) {
          restaurant.title.should.equal(updateData.title);
        });
      });
  });
/// DELETE ///
  describe('DELETE endpoint', function() {
    it('delete a post by id', function() {
      let post;
      return Post
        .findOne()
        .exec()
        .then(function(_post) {
          restaurant = _post;
          return chai.request(app).delete(`/posts/${restaurant.id}`);
        })
        .then(function(res) {
          res.should.have.status(204);
          return Post.findById(post.id).exec();
        })
        .then(function(_post) {
          should.not.exist(_post);
        });
    });
  });
*/