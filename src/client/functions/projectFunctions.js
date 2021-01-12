const projectFunctions = new function () {
  this.createProject = async (event,projDetails,toggle,setProjDetails) => {
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
    toggle(false);
    setProjDetails({
      title: '',
      members: ''
    });
  }
  this.onNotification = (msg,setState) => {
    console.log('msg:',msg);
    setState(prevValue => {
      const seen = new Set(); //eslint-disable-line
      let updatedContacts = [...prevValue.contacts,...msg.projMembers];
      let filteredContacts = updatedContacts.filter(contact => {
        const duplicate = seen.has(contact.email);
        seen.add(contact.email);
        return !duplicate;
      });
      return {
        ...prevValue,
        notifications: [...prevValue.notifications,msg],
        contacts: msg.projMembers ? filteredContacts : prevValue.contacts,
        projects: [...prevValue.projects, msg.newProject],
        newnotifcount: prevValue.newnotifcount + 1
      };
    });
  }
}

export default projectFunctions;
