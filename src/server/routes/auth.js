require('dotenv').config();

import passport from 'passport';
import { Router } from 'express';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

const authRouter = Router();

const authScope = 'https://www.googleapis.com/auth/userinfo';

authRouter.route("/").get(passport.authenticate('google', { scope: [`${authScope}.profile`,`${authScope}.email`] }));
authRouter.route("/callback").get(passport.authenticate('google', { failureRedirect: '/login' }),(req, res) => res.redirect('/'));

export default authRouter;
