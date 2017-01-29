const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {groupInfo} = require('../models/groupmodel');



module.exports = router;
