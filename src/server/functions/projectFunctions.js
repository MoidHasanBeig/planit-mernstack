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
    membersArr.push(conf.creator.email);
    let memberIds = [];
    let projMembers = [];
    User.find({email: { $in: membersArr}}).exec((err,foundMembers) => {
      foundMembers && foundMembers.forEach(user => {
        projMembers.push({
          email: user.email,
          name: user.username,
          id: user._id,
          image: user.image
        });
        memberIds.push(user._id);
      });
      const newProject = new Project({
        _id: new mongoose.mongo.ObjectId(),
        title: conf.title,
        creator: conf.creator._id,
        members: memberIds
      });
      newProject.save(err => {
        if(!err) {
          //add project id to each user document
          User.updateMany({_id: {$in: memberIds}}, {$push: {projects: newProject._id}}, (err,docs) => {
            console.log(docs);
          });
          userFunctions.updateNotificationCount(memberIds);
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
          const projDetails = {
            ...newProject._doc,
            creator: {
              username: conf.creator.username
            }
          }
          this.sendNotification({
            type: 'newproject',
            members: memberIds,
            projId: newProject._id,
            content: `You've been added to ${conf.title} project by ${conf.creator.username}`,
            projMembers: projMembers,
            newProject: projDetails,
            createdAt: new Date()
          });
          res.send('New project added');
        }
      });
    });
  }

  //on sending a new notification
  this.sendNotification = (data) => {
    const newNotif = new Notification({
      _id: new mongoose.mongo.ObjectId(),
      project: data.projId,
      content: data.content
    });
    newNotif.save(err => {
      if(!err) {
        if(data.type === 'newproject') {
          //add notif id to each user document
          User.updateMany({_id: {$in: data.members}}, {$push: {notifications: newNotif._id}}, (err,docs) => {
            console.log(docs);
          });
        }
        //send notif over socket
        io.to(data.projId).emit('notification',data);
      }
    });
  }
}

export default projectFunctions;
