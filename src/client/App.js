import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import SecurePages from './pages/securePages/SecurePages';
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
            <Route exact path="/" component={SecurePages} />
            <Route path="/notifications" component={SecurePages} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
