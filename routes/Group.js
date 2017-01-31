const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const groupInfo = mongoose.model('groupInfo');

// GET REQUEST -- Groups

router.get('/', (req, res) => {
  console.log("hit group route");
  groupInfo
    .find()
    .then(groupInfo => {
      console.log("got group")
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



module.exports = router;
