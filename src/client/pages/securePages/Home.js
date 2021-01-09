import React,{ useState } from 'react';
import { useStateContext } from '../../stateManagement/context';
import projectFunctions from '../../functions/projectFunctions';

const Home = () => {
  const { state } = useStateContext();

  const [projDetails,setProjDetails] = useState({
    title: '',
    members: ''
  });

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
    <div>
      {state.projects && state.projects.map((project,i) => <li key={i}>{project.title} by {project.creator.username}</li>)}
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
