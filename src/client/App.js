import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SecurePages from './pages/securePages/SecurePages';
import Login from './pages/Login';
import StateProvider from './stateManagement/context';

import "./App.scss";

const App = () => {

  return(
    <StateProvider>
      <Router>
        <div className="App h-100">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={SecurePages} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
