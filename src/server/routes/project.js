import { Router } from 'express';
import projectFunctions from '../functions/projectFunctions';

const projectRouter = Router();

projectRouter.route("/").post((req,res) => {
  const projConf = {
    title: req.body.title,
    members: req.body.members,
    creator: req.user
  }
  projectFunctions.createProject(projConf,res);
});

export default projectRouter;
