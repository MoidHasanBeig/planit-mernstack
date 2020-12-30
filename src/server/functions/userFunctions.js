const userActions = {
  subscribe: (projectId,socket) => {
    Project.find({_id: projectId}, (err,project) => {
      socket.join(project.name);
    })
  }
}
