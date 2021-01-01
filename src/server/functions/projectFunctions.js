import Project from '../models/projects.model';
import User from '../models/users.model';

const projectFunctions = {
  createProject: (conf) => {
    const membersArr = conf.members.split(",");
    let memberIds = [];
    User.find({email: { $in: membersArr}},(err,foundMembers) => {
      foundMembers && foundMembers.forEach(doc => {
        memberIds.push(doc._id);
      });
      const newProject = new Project({
        title: conf.title,
        creator: conf.creator,
        members: memberIds
      });
      newProject.save( () => {

      });
    });
  }
}

export default projectFunctions;
