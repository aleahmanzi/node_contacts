const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');
const userInfo = mongoose.model('userInfo');

const addressInfo = mongoose.model('addressInfo');


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = "374972509400-ruvdflor4ctv70d0gdqi28ufkcc5ac6k.apps.googleusercontent.com";
const { GOOGLE_CLIENT_SECRET } = require('../key.json') || process.env;

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/google/callback",
    //passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, done) {

       console.log(profile);
       userInfo.findOrCreate({ googleId: profile.id }, function (err, user) {
         return done(err, user);
       });
  }
));

router.get('/',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));


router.get('/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
