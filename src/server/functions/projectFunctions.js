import mongoose from 'mongoose';
import { io,clients } from '../utils/socket_init';
import userFunctions from './userFunctions';
import Project from '../models/projects.model';
import User from '../models/users.model';
import Notification from '../models/notifications.model';

const projectFunctions = new function () {
  //on creating new project
  this.createProject = (conf,res) => {
    const membersArr = conf.members.split(",");
    let memberIds = [];
    User.find({email: { $in: membersArr}}).exec((err,foundMembers) => {
      foundMembers && foundMembers.forEach(user => {
        memberIds.push(user._id);
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
          //add project id to each user document
          User.updateMany({_id: {$in: memberIds}}, {$push: {projects: newProject._id}}, (err,docs) => {
            console.log(docs);
          });
          //add contacts to all members of the project
          userFunctions.addContacts(memberIds);
          //create project room and join online users
          memberIds.forEach((member) => {
            console.log(member)
            if(clients[member]) {
              console.log("online:",clients[member].id);
              clients[member].join(newProject._id);
            }
          });
          this.sendNotification(memberIds,newProject._id,`You've been added to ${newProject.title} project by ${newProject.creator}`);
          res.send(newProject);
        }
      });
    });
  }

  //on sending a new notification
  this.sendNotification = (members,projId,content,task=null,to=null) => {
    const newNotif = new Notification({
      _id: new mongoose.mongo.ObjectId(),
      project: projId,
      content: content,
      read: false
    });
    newNotif.save(err => {
      if(!err) {
        if(!to) {
          //add notif id to each user document
          User.updateMany({_id: {$in: members}}, {$push: {notifications: newNotif._id}}, (err,docs) => {
            console.log(docs);
          });
          //send notif over socket
          io.to(projId).emit('notification',content);
        }
      }
    });
  }
}

export default projectFunctions;
