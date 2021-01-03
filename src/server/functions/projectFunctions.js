import mongoose from 'mongoose';
import Project from '../models/projects.model';
import User from '../models/users.model';

const projectFunctions = {
  createProject: (conf,io,res) => {
    const membersArr = conf.members.split(",");
    let memberIds = [];
    User.find({email: { $in: membersArr}}).exec((err,foundMembers) => {
      foundMembers && foundMembers.forEach(doc => {
        memberIds.push(doc._id);
      });
      const newProject = new Project({
        _id: new mongoose.mongo.ObjectId(),
        title: conf.title,
        creator: conf.creator,
        members: memberIds
      });
      newProject.save(err => !err && res.send(newProject._id));
    });
  }
}

export default projectFunctions;
