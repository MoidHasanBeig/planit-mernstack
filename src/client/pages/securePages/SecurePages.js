import React,{ useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './Home';
import Notifications from './Notifications';
import Messages from './Messages';
import Profile from './Profile';
import MyNavbar from './components/MyNavbar';

import io from '../../../../node_modules/socket.io/client-dist/socket.io.js';
import socketFunctions from '../../functions/socketFunctions';
import { useStateContext } from '../../stateManagement/context';

const SecurePages = () => {
  const { setState } = useStateContext();

  useEffect(() => {
    let socket = io();
    socketFunctions(socket,setState);
    return () => socket.disconnect();
  },[]);

  return (
    <Router>
      <div className='secure-pages'>
        <MyNavbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/notifications" component={Notifications} />
          <Route path="/messages" component={Messages} />
          <Route path="/profile" component={Profile} />
        </Switch>
      </div>
    </Router>
  );
}

export default SecurePages;
