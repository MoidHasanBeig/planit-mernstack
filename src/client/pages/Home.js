import React from 'react';
import io from '../../../node_modules/socket.io/client-dist/socket.io.js';
import jan from '../images/a.png'

const Home = () => {
  let socket = io();

  return (
    <div className='home-page'>
      <h1> Hello, routes! </h1>
      <img src={jan} />
    </div>
  );
}

export default Home;
