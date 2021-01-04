import Project from '../models/projects.model';
import User from '../models/users.model';

const userFunctions = new function () {
  this.addContacts = (contacts) => {
    User.updateMany({_id: contacts}, {$addToSet: {contacts: {$each: contacts}}}, (err,docs) => {
      console.log(docs);
    });
  }
  this.subscribe = (projectId,socket) => {
    Project.find({_id: projectId}, (err,project) => {
      socket.join(project.name);
    });
  }
}

export default userFunctions;
