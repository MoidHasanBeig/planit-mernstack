import React from 'react';
import { useStateContext } from '../../stateManagement/context';

const Profile = () => {
  const { state } = useStateContext();

  return (
    <div>
      <img src={state.image}></img>
      {state.username}
      {state.contacts && state.contacts.map((contact,i) => <li key={i}>{contact.email}</li>)}
    </div>
  );
}

export default Profile;
