const userFunctions = {
  subscribe: (Project,projectId,socket) => {
    Project.find({_id: projectId}, (err,project) => {
      socket.join(project.name);
    })
  }
}

export default userFunctions;
