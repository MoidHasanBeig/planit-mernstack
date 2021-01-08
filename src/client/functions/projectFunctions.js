const projectFunctions = new function () {
  this.createProject = async (event,projDetails) => {
    event.preventDefault();
    const data = await fetch('/project', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projDetails)
    }).then(res => res.json());
    console.log(data);
  }
  this.onNotification = (msg,setState) => {
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
        contacts: msg.projMembers ? filteredContacts : prevValue.contacts
      };
    });
  }
}

export default projectFunctions;
