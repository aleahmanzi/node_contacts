const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const addressInfo = mongoose.model('addressInfo');

// GET REQUEST -- Address

router.get('/', (req, res) => {
  addressInfo
    .find()
    .then(addressInfo => {
      res.json({
        addressInfo: addressInfo.map(
          (addressInfo) => addressInfo.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});

module.exports = router;
