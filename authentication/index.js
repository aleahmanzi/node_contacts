let session = require('express-session');
let MongoStore = require('connect-mongo')(session);
let passport = require('passport');
let mongoose = require('mongoose');
let userInfo = mongoose.model('userInfo');

let {SESSION_SECRET} = require('../key.json');
if(!SESSION_SECRET) {
  SESSION_SECRET = process.env.SESSION_SECRET
}

module.exports = function(app) {
  app.use(session({
    secret: SESSION_SECRET,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    resave: false,
    saveUninitialized: false,
    cookie: {maxAge: 1470409855938}
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(userId, done){
    console.log("HERE IS THE USER", userId);
    userInfo.findById(userId, done);
  });

  app.get('/session', function(req, res){
    if(req.user){
      res.status(200).send({user: req.user});
    } else {
      res.status(404).send();

    }
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
    res.status(200).end();
  });

};