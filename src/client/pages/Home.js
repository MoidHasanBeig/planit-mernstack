import React,{ useState,useEffect } from 'react';
import io from '../../../node_modules/socket.io/client-dist/socket.io.js';
import projectFunctions from '../functions/projectFunctions';

const Home = () => {
  const [projDetails,setProjDetails] = useState({
    title: '',
    members: ''
  });

  useEffect(() => {
    console.log('io');
    let socket = io();
  },[]);

  function handleChange(event) {
    const { name, value } = event.target;

    setProjDetails(prevValue => {
      return {
        ...prevValue,
        [name]: value
      };
    });
  }

  return (
    <div className='home-page'>
      <form>
        <label>
          Title:
          <input type="text" value={projDetails.title} onChange={handleChange} name="title" />
          <input type="text" value={projDetails.members} onChange={handleChange} name="members" />
        </label>
        <button className="btn btn-primary" onClick={(evt) => projectFunctions.createProject(evt,projDetails)}>Submit</button>
      </form>
    </div>
  );
}

export default Home;
