require('dotenv').config();

import passport from 'passport';
import session from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../models/users.model';

const passportInit = (app) => {

  app.use(session({
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({userid: profile.id}, (err,user) => {
        if (user) {
          done(err,user);
        }
        else {
          let newUser = new User({
            username: profile.displayName,
            email: profile.emails[0].value,
            userid: profile.id,
            image: profile.photos[0].value
          });
          newUser.save();
          done(err,newUser);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

export default passportInit;