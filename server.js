const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const blogPostsRouter = require('./contactRouter');
const app = express();
const PORT = 8080;
const jsonParser = bodyParser.json();

app.use(morgan('common'));
app.use(bodyParser.json());