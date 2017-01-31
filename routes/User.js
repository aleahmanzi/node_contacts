const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const userInfo = mongoose.model('userInfo');

// GET REQUEST -- User

router.get('/', (req, res) => {
  userInfo
    .find()
    .then(userInfo => {
      res.json({
        userInfo: userInfo.map(
          (userInfo) => userInfo.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


module.exports = router;
