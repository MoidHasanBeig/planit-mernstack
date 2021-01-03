import mongoose from 'mongoose';
import Project from '../models/projects.model';
import User from '../models/users.model';
import Notification from '../models/notifications.model';
import { io,clients } from '../utils/socket_init';

const projectFunctions = function () {
  this.createProject = (conf,res) => {
    const membersArr = conf.members.split(",");
    let memberIds = [];
    User.find({email: { $in: membersArr}}).exec((err,foundMembers) => {
      foundMembers && foundMembers.forEach(doc => {
        memberIds.push(doc._id);
      });
      memberIds.push(conf.creator);
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
              clients[member].join(newProject._id);
            }
          });
          this.sendNotification(newProject._id,`You've been added to ${newProject.title} project by ${newProject.creator}`);
          res.send(newProject._id);
        }
      });
    });
  }
  this.sendNotification = (projId,content,task=null,to=null) => {
    const newNotif = new Notification({
      project: projId,
      content: content,
      read: false
    });
    newNotif.save(err => {
      if(!err) {
        if(!to) {
          io.to(projId).emit('notification',content);
        }
      }
    });
  }
}

export default projectFunctions;
