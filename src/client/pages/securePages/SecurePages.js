import React,{ useState,useEffect } from 'react';
import io from '../../../../node_modules/socket.io/client-dist/socket.io.js';
import projectFunctions from '../../functions/projectFunctions';
import { useStateContext } from '../../stateManagement/context';

const SecurePages = () => {
  const { state,setState } = useStateContext();

  const [projDetails,setProjDetails] = useState({
    title: '',
    members: ''
  });
  let userDetails;
  let socket;

  useEffect(() => {
    socket = io();
    socket.on('connect', async () => {
      userDetails = await fetch('/getuser').then(res => res.json());
      console.log(socket.id,userDetails);
      setState(userDetails);
      socket.emit('userinfo',userDetails._id);

      socket.on('notification', (msg) => {
        console.log(msg);
        projectFunctions.onNotification(msg,setState);
      });
    });

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
      {state.notifications && state.notifications.map((notification,i) => <li key={i}>{notification.content}</li>)}
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

export default SecurePages;
