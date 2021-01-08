import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './pages/securePages/Home';
import Notifications from './pages/securePages/Notifications';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import StateProvider from './stateManagement/context';

import "./App.scss";

const App = () => {

  return(
    <StateProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route exact path="/notifications" component={Notifications} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
