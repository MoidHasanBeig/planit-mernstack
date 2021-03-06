require('dotenv').config();

import passport from 'passport';
import * as session from 'cookie-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../models/users.model';

const passportInit = (app,prodMode) => {

  app.use(session({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    expires: new Date(1926232513678)
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  const callbackUrL = prodMode
    ? "https://simplan.herokuapp.com/auth/google/callback"
    : "http://localhost:3000/auth/google/callback";

  passport.use(new GoogleStrategy({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: callbackUrL
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
            image: profile.photos[0].value,
            newnotifcount: 0
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
      const userDetails = {
        _id: user._id,
        email: user.email,
        username: user.username
      }
      done(err, userDetails);
    });
  });
}

export default passportInit;
