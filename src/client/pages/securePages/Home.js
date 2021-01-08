import React,{ useState,useEffect } from 'react';
import io from '../../../../node_modules/socket.io/client-dist/socket.io.js';
import projectFunctions from '../../functions/projectFunctions';
import socketFunctions from '../../functions/socketFunctions';
import { useStateContext } from '../../stateManagement/context';

const Home = () => {
  const { state,setState } = useStateContext();

  const [projDetails,setProjDetails] = useState({
    title: '',
    members: ''
  });

  useEffect(() => {
    let socket = io();
    socketFunctions(socket,setState);
    return () => socket.disconnect();
  },[]);

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
    <div className='secure-pages'>
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
