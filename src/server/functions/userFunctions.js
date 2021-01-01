import Project from '../models/projects.model';

const userFunctions = {
  subscribe: (projectId,socket) => {
    Project.find({_id: projectId}, (err,project) => {
      socket.join(project.name);
    })
  }
}

export default userFunctions;
