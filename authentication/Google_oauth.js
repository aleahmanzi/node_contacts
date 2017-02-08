const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');

const addressInfo = mongoose.model('addressInfo');


const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const GOOGLE_CLIENT_ID = "374972509400-eqik5st3gmk2vl9ij2qp7jh6b3pjdrl1.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "Q5avSRkQvZ4cY2DHGl3U2qXm";

passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "localhost:8080/auth/google/callback",
    passReqToCallback   : true
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOrCreate({ googleId: profile.id }, function (err, user) {
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
