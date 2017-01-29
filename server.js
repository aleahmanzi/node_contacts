const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const contactRouter = require('./routes/contactRouter');
const addressRouter = require('./routes/addressRouter');
const groupRouter = require('./routes/groupRouter');
const userRouter = require('./routes/userRouter');

const PORT = 8080;
const jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.use(bodyParser.json());
app.use('/contactInfo', contactRouter);
app.use('/addressInfo', addressRouter);
app.use('/groupInfo', groupRouter);
app.use('/userInfo', userRouter);


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
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};