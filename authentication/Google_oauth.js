
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const jsonParser=require('body-parser').json();
const mongoose = require('mongoose');
const userInfo = mongoose.model('userInfo');

const GOOGLE_CLIENT_ID = "374972509400-ruvdflor4ctv70d0gdqi28ufkcc5ac6k.apps.googleusercontent.com";
const { GOOGLE_CLIENT_SECRET } = require('../key.json') || process.env;

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));
router.use(passport.initialize());
router.use(passport.session());
passport.use(new GoogleStrategy({
    clientID:     GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/google/callback",
  },
  
  function(accessToken, refreshToken, profile, done) {
    console.log("Google", profile);

    userInfo.findOne({'google.id': profile.id}).exec()
      .then(function (user) {

        if (user) {
          return user;
        } else {
          return userInfo.create({
            name: profile.name.givenName,
            email: profile.emails[0].value,
            google: {
              id: profile.id
            }
          });
        }

      })
      .then(function (userToLogin) {
        console.log("the newly created user", userToLogin)
        console.log("accesstoken", accessToken)
        done(null, userToLogin);
      })
      .catch(function (err) {
        console.error('Error creating user', err);
        done(err);
      });
  }
));

router.get('/', passport.authenticate('google', { 
	scope: [
	'https://www.googleapis.com/auth/userinfo.email'
	]
	}));


router.get('/callback', passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;


