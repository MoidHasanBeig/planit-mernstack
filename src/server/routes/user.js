import { Router } from 'express';
import User from '../models/users.model';

const userRouter = Router();

userRouter.route("/").get((req,res) => {
  const id = req.user._id;
  User.findById(id).
  populate({
    path: 'projects',
    populate: { path: 'creator', select: 'username' }
  }).
  populate('notifications').
  populate('contacts','username email _id image').
  exec((err,user) => res.send(user));
});

export default userRouter;
