import React,{ useEffect,useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Home from './Home';
import ProjectView from './ProjectView';
import Notifications from './Notifications';
import Messages from './Messages';
import Profile from './Profile';
import MobileNavbar from './components/MobileNavbar';
import SideNavbar from './components/SideNavbar';
import NotFound from './NotFound';

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

  const [currentProject,setCurrentProject] = useState(0);

  return (
    <Router>
      <div className='secure-pages'>
        <MobileNavbar />
        <div className='container-fluid'>
          <div className='row'>
            <SideNavbar />
            <div className='main-container mt-2 col-md-9 ml-sm-auto col-lg-10 px-4'>
              <Switch>
                <Route exact path="/">
                  <Home setCurrentProject={setCurrentProject} />
                </Route>
                <Route exact path="/projectview">
                  <ProjectView currentProject={currentProject} />
                </Route>
                <Route exact path="/notifications" component={Notifications} />
                <Route exact path="/messages" component={Messages} />
                <Route exact path="/profile" component={Profile} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default SecurePages;
