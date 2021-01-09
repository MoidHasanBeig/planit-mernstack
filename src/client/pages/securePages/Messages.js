import React from 'react';
import { useStateContext } from '../../stateManagement/context';

const Messages = () => {
  const { state } = useStateContext();

  return (
    <div>
      Messages: {state.messages && state.messages.map((message,i) => <li key={i}>{message}</li>)}
    </div>
  );
}

export default Messages;
