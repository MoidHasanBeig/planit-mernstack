import { Router } from 'express';
import User from '../models/users.model';

const userRouter = Router();

userRouter.route("/").get((req,res) => {
  const id = req.user;
  User.findById(id).
  populate({
    path: 'projects',
    populate: { path: 'creator', select: 'username' }
  }).
  populate('notifications').
  populate('contacts','username email _id image').
  exec((err,user) => res.send(user));
});

userRouter.route("/readnotifs").get((req,res) => {
  const id = req.user._id;
  console.log('read');
  User.updateOne({_id:id},{newnotifcount: 0},() => res.send('Notifications read'));
})

export default userRouter;
