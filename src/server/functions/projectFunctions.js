const projectFunctions = {
  createProject: (conf) => {
    const membersArr = conf.members.split(",");
    let memberIds = [];
    membersArr.forEach((member) => {
      conf.User.find({email:member},(err,member) => {
        memberIds.push(member._id)
      })
    });
    const newProject = new conf.Project({
      title: conf.title,
      creator: conf.creator,
      members: memberIds
    });
    newProject.save();
  }
}

export default projectFunctions;
