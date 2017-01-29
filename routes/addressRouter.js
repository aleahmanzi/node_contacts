const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {addressInfo} = require('../models/addressmodels');



module.exports = router;
