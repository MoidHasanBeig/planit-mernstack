import React from 'react';
import { useStateContext } from '../../stateManagement/context';

const Notifications = () => {
  const { state } = useStateContext();
  console.log(state);

  return (
    <div>
      {state.notifications && state.notifications.map((notification,i) => <li key={i}>{notification.content}</li>)}
    </div>
  );
}

export default Notifications;
