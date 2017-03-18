const express = require('express');
const router = require('express').Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const contactInfo = mongoose.model('contactInfo');


// GET REQUEST 

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

router.get('/:userId', (req, res) => {
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


// POST REQUEST

router.post('/', (req, res) => {

  const requiredFields = ['name'];
  requiredFields.forEach(field => {
    if (! (field in req.body && req.body[field])) {
      return res.status(400).json({message: `Must specify value for ${field}`});
    }
  });

  contactInfo
    .create({
      userId: req.body.id,
      name: req.body.name,
      email: req.body.email,
      birthday: req.body.birthday,
      phoneNumber: req.body.phoneNumber,
      company: req.body.company,
      groups: req.body.groups,
      pictures: req.body.pictures,
      address: req.body.address,
      spouse: req.body.spouse,
      connections: req.body.connections
    })
    .then(
      contactInfo => res.status(201).json(contactInfo.apiRepr()))
    .catch(err => {
      console.error(err);
      res.status(500).json({message: 'Internal server error'});
    });
});


// PUT REQUEST

router.put('/:id', (req, res) => {
  console.log("request body", req.body)
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    const message = (
      `Request path id (${req.params.id}) and request body id ` +
      `(${req.body.id}) must match`);
    console.error(message);
    res.status(400).json({message: message});
  }

  const toUpdate = {};
  const updateableFields = ['name', 'birthday', 'phoneNumber', 'email', 'company', 'address'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  contactInfo
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(contactInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// DELETE REQUEST

router.delete('/:id', (req, res) => {
  contactInfo
    .findByIdAndRemove(req.params.id)
    .then(contactInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = router;
