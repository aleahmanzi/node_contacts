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


app.use(function(req, res, next){
 
   // Website you wish to allow to connect
   res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
 
   // Request methods you wish to allow
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
 
   // Request headers you wish to allow
   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
 
   // Set to true if you need the website to include cookies in the requests sent
   // to the API (e.g. in case you use sessions)
   res.setHeader('Access-Control-Allow-Credentials', true);
 	next();
 
 });

require('./authentication')(app);
app.use('/browser', express.static(path.join(__dirname, '/browser')));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

const contactRouter = require('./routes/Contact');
const addressRouter = require('./routes/Address');
const groupRouter = require('./routes/Group');
const userRouter = require('./routes/User');
const Google = require('./authentication/Google_oauth');

const PORT = process.env.PORT || 8080;
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
	server.close(err => {
	   if (err) {
	       return reject(err);
	   }
	   resolve();
	});
	});
}
console.log("theh string req main", require.main)
if (require.main === module) {
  runServer().then(openDatabase).catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};
