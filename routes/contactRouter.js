const express = require('express');
const router = require('express').Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {contact} = require('../models/contactmodels');


// GET REQUEST
router.get('/', (req, res) => {
  contact
    .find()
    .limit(10)
    .exec()
    .then(blogPost => {
      res.json({
        contact: contact.map(
          (contact) => contact.apiRepr())
      });
    })
    .catch(
      err => {
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    });
});


module.exports = router;
