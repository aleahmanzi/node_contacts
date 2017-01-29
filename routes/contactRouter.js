const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {contactInfo} = require('../models/contactmodels');

// GET REQUEST
router.get('/', (req, res) => {
  contactInfo
    .find()
    .limit(10)
    .exec()
    .then(blogPost => {
      res.json({
        contactInfo: contactInfo.map(
          (contactInfo) => contactInfo.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


module.exports = router;
