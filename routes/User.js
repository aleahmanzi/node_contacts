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


// POST REQUEST

router.post('/', (req, res) => {

  const requiredFields = ['name', 'username', 'password', 'email'];
  requiredFields.forEach(field => {
    if (! (field in req.body && req.body[field])) {
      return res.status(400).json({message: `Must specify value for ${field}`});
    }
  });

  userInfo
    .create({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    })
    .then(
      userInfo => res.status(201).json(userInfo.apiRepr()))
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
  const updateableFields = ['street1'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  userInfo
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(userInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// DELETE REQUEST

router.delete('/:id', (req, res) => {
  userInfo
    .findByIdAndRemove(req.params.id)
    .then(userInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});

module.exports = router;
