import React,{ useEffect } from 'react';
import { useStateContext } from '../../stateManagement/context';

const Notifications = () => {
  const { state,setState } = useStateContext();

  //reset notifications count on exiting notification page
  useEffect(() => {
    return async () => {
      if (state.newnotifcount) await fetch('/user/readnotifs')
      .then(() =>
        {
          console.log('read');
          setState(prevValue => {
          return {
            ...prevValue,
            newnotifcount: 0
          };
        })}
      );
    }
  },[]);

  return (
    <div>
      <h2 className="text-muted mt-3 mb-5">Notifications</h2>
      {state.notifications && state.notifications.slice(0).reverse().map((notification,i) => {
        return (
          <div key={i} className={`card my-2 ${i<state.newnotifcount && 'bg-secondary text-white'}`}>
            <div className="card-header small">
              {new Date(notification.createdAt).toDateString()}
            </div>
            <div className="card-body">
              <p className="mb-0">{notification.content}</p>
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default Notifications;
