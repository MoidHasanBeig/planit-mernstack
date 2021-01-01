import { Router } from 'express';
import projectFunctions from '../functions/projectFunctions';

const projectRouter = Router();

projectRouter.route("/").post((req) => {
  const projConf = {
    title: req.body.title,
    members: req.body.members,
    creator: req.user._id
  }
  projectFunctions.createProject(projConf);
});

export default projectRouter;
