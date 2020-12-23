import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Page1 from "./components/Page1"
import "./App.scss";
import jan from './images/a.png'

function App(){
  return(
    <Router>
      <div className="App">
        <Switch>
          <Route path="/page1">
            <Page1 />
          </Route>
          <Route path="/">
            <h1> Hello, Moid! </h1>
            <img src={jan} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
