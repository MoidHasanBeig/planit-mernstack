import { Router } from 'express';

const userRouter = Router();

userRouter.route("/").get((req,res) => res.json(req.user._id));

export default userRouter;
