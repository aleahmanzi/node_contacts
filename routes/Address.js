const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const addressInfo = mongoose.model('addressInfo');

// GET REQUEST

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


// POST REQUEST

router.post('/', (req, res) => {

  const requiredFields = ['street1', 'city', 'state'];
  requiredFields.forEach(field => {
    if (! (field in req.body && req.body[field])) {
      return res.status(400).json({message: `Must specify value for ${field}`});
    }
  });

  addressInfo
    .create({
      street1: req.body.street1,
      street2: req.body.street2,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      country: req.body.country,
      coordinates: req.body.coordinates,
      phone: req.body.phone,
      contact: req.body.contact
    })
    .then(
      addressInfo => res.status(201).json(addressInfo.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});


// PUT REQUEST

router.put('/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['street1', 'street2', 'city', 'state', 'zip', 'coutry'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  addressInfo
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(addressInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// DELETE REQUEST

router.delete('/:id', (req, res) => {
  addressInfo
    .findByIdAndRemove(req.params.id)
    .then(addressInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});


module.exports = router;
