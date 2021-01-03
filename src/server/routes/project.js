import { Router } from 'express';
import projectFunctions from '../functions/projectFunctions';

const projectRouter = Router();
const proFun = new projectFunctions();

projectRouter.route("/").post((req,res) => {
  const projConf = {
    title: req.body.title,
    members: req.body.members,
    creator: req.user._id
  }
  proFun.createProject(projConf,res);
});

export default projectRouter;
