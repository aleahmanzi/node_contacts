const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();

const {contactInfo} = require('../models/contactmodels');

contactInfo.create('123', 'Aleah, Manzi', '603-540-8289', 'aleah.manzi@gmail.com');

// GET
router.get('/', (req, res) => {
  res.json(contactInfo.get());
});

router.post('/', (req, res) => {
  // ensure `name` and `budget` are in request body
  const requiredFields = ['_id', 'name'];
  console.log("the request", req.body);
    for (let i=0; i<requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in req.body)) {
      const message = `Missing \`${field}\` in request body`
      console.error(message);
      return res.status(400).send(message);
    }
  }

  const item = contactInfo.create(req.body._id, req.body.name);
  res.status(201).json(item);
});


module.exports = router;
