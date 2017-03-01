const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const seeder = require('mongoose-seeder');
const path = require('path');
var moment = require('moment');


require('./models/AddressInfo');
require('./models/ContactInfo');
require('./models/GroupInfo');
require('./models/UserInfo');

const app = express();

require('./authentication')(app);
app.use('/browser', express.static(path.join(__dirname, '/browser')));

const contactRouter = require('./routes/Contact');
const addressRouter = require('./routes/Address');
const groupRouter = require('./routes/Group');
const userRouter = require('./routes/User');
const Google = require('./authentication/Google_oauth');

const PORT = 8080;
const jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

const {DATABASE_URL} = require('./config');

app.use(bodyParser.json());
app.use('/contactInfo', contactRouter);
app.use('/addressInfo', addressRouter);
app.use('/groupInfo', groupRouter);
app.use('/userInfo', userRouter);
app.use('/auth/google', Google);

app.use('/browser', express.static(path.join(__dirname, '/browser')));

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname, '/browser/js/index.html'))
});

function runServer() {
	return new Promise((resolve, reject) => {	
	    server = app.listen(PORT || 8080, () => {
	      console.log(`Your app is listening on port ${PORT}`);
	      resolve();
	    })
	    .on('error', err => {
			reject(err);
	    });
	  });
}

function openDatabase() {
	console.log("connecting to DB", DATABASE_URL);
	return new Promise((resolve, reject) => {
		mongoose.connect(DATABASE_URL);
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function() {
			console.log("connection successful");
			resolve();
		});
	});
};

function closeServer() {
	return new Promise((resolve, reject) => {
	console.log('Closing server');
	server.close(err => {
	   if (err) {
	       return reject(err);
	   }
	   resolve();
	});
	});
}

if (require.main === module) {
  runServer().then(openDatabase).catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
