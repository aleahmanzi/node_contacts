const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {userInfo} = require('../models/usermodel');




module.exports = router;
