const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const groupInfo = mongoose.model('groupInfo');

// GET REQUEST -- Groups

router.get('/', (req, res) => {
  groupInfo
    .find()
    .then(groupInfo => {
      res.json({
        groupInfo: groupInfo.map(
          (groupInfo) => groupInfo.apiRepr())
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

  groupInfo
    .create({
      name: req.body.name,
      contacts: req.body.contacts, 
      picture: req.body.picture
    })
    .then(
      groupInfo => res.status(201).json(groupInfo.apiRepr()))
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
  const updateableFields = ['name', 'contacts', 'picture'];

  updateableFields.forEach(field => {
    if (field in req.body) {
      toUpdate[field] = req.body[field];
    }
  });

  groupInfo
    .findByIdAndUpdate(req.params.id, {$set: toUpdate})
    .then(groupInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});


// DELETE REQUEST

router.delete('/:id', (req, res) => {
  groupInfo
    .findByIdAndRemove(req.params.id)
    .then(groupInfo => res.status(204).end())
    .catch(err => res.status(500).json({message: 'Internal server error'}));
});

router.use('*', function(req, res) {
  res.status(404).json({message: 'Not Found'});
});


module.exports = router;
