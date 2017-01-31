const express = require('express');
const router = require('express').Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const contactInfo = mongoose.model('contactInfo');


// GET REQUEST -- Contacts

router.get('/', (req, res) => {
  contactInfo
    .find()
    .then(contactInfo => {
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
