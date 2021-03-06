exports.DATABASE_URL = (
	process.env.MONGODB_URI ||
	process.env.DATABASE_URL ||
    global.DATABASE_URL || 
    "mongodb://localhost:27017/contacts2");

exports.TEST_DATABASE_URL = (
	process.env.TEST_DATABASE_URL ||
	'mongodb://localhost/test-blog-app');

exports.PORT = process.env.PORT || 8080;