import { Router } from 'express';
import Project from '../models/projects.model';
import User from '../models/users.model';
import projectFunctions from '../functions/projectFunctions';

const projectRouter = Router();

projectRouter.route("/").post((req,res) => {
  const projConf = {
    Project,
    User,
    title: req.body.title,
    members: req.body.members,
    creator: req.user._id
  }
  projectFunctions.createProject(projConf);
});

export default projectRouter;
