const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

const blogPostsRouter = require('./contactRouter');

const PORT = 8080;
const jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use('/contactInfo', contactRouter);
app.use('/addressInfo', addressRouter);
app.use('/groupInfo', groupRouter);
app.use('/userInfo', userRouter);


