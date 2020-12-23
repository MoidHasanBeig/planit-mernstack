import React, { Component} from "react";
import "./App.scss";
import jan from './a.png'

class App extends Component{
  render(){
    return(
      <div className="App">
        <h1> Hello, Moid! </h1>
        <img src={jan} />
      </div>
    );
  }
}

export default App;
