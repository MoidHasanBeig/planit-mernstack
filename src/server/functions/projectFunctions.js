import mongoose from 'mongoose';
import Project from '../models/projects.model';
import User from '../models/users.model';
import { io,clients } from '../utils/socket_init';

const projectFunctions = {
  createProject: (conf,res) => {
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
      newProject.save(err => {
        if(!err) {
          //create project room and join online users
          memberIds.forEach((member) => {
            console.log(member)
            if(clients[member]) {
              console.log("online:",clients[member].id);
              clients[member].join('newproject');
            }
          });
          io.to('newproject').emit('NewProject','yayyyyy');
          res.send(newProject._id);
        }
      });
    });
  }
}

export default projectFunctions;
