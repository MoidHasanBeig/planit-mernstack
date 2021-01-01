const projectFunctions = {
  createProject: async (event,projDetails) => {
    event.preventDefault();
    await fetch('/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projDetails)
    });
  }
}

export default projectFunctions;
