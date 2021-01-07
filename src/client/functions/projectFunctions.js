const projectFunctions = {
  createProject: async (event,projDetails,setState) => {
    event.preventDefault();
    const data = await fetch('/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projDetails)
    }).then(res => res.text());
    console.log(data);
    setState(prevValue => {
      return {
        ...prevValue,
        contacts: [
          ...prevValue.contacts,
          {email:'hi'}
        ]
      }
    })
  }
}

export default projectFunctions;
