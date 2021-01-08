import React,{ useState } from 'react';
import { useStateContext } from '../../stateManagement/context';
import projectFunctions from '../../functions/projectFunctions';

const Home = () => {
  const { state } = useStateContext();

  const [projDetails,setProjDetails] = useState({
    title: '',
    members: ''
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setProjDetails(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div>
      {state.username}
      {state.contacts && state.contacts.map((contact,i) => <li key={i}>{contact.email}</li>)}
      <form>
        <label>
          Title:
          <input type="text" value={projDetails.title} onChange={handleChange} name="title" />
          <input type="text" value={projDetails.members} onChange={handleChange} name="members" />
        </label>
        <button className="btn btn-primary" onClick={(evt) => projectFunctions.createProject(evt,projDetails)}>Submit</button>
      </form>
    </div>
  );
}

export default Home;
