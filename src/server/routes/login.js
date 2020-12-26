import passport from 'passport';
import { Router } from 'express';
import session from 'express-session';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import User from '../models/users.model';

require('dotenv').config();

const loginRouter = Router();

const authScope = 'https://www.googleapis.com/auth/userinfo';

loginRouter.use(session({
  secret:process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
loginRouter.use(passport.initialize());
loginRouter.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    User.findOne({userid: profile.id}, (err,user) => {
      if (user) done(err,user);
      else {
        let newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          userid: profile.id,
          image: profile.photos[0].value
        });
        newUser.save();
        done(null,newUser);
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

loginRouter.route("/").get(passport.authenticate('google', { scope: [`${authScope}.profile`,`${authScope}.email`] }));
loginRouter.route("/callback").get(passport.authenticate('google', { failureRedirect: '/login' }),(req, res) => res.redirect('/'));
loginRouter.route("/authenticated").get((req,res) => res.send(req.user));

export default loginRouter;
