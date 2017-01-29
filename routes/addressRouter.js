const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {addressInfo} = require('../models/addressmodel');



module.exports = router;
