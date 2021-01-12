import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

import CreateProjectModal from './components/CreateProjectModal';
import { useStateContext } from '../../stateManagement/context';

const Home = (props) => {
  const { state } = useStateContext();

  const [showModal,setShowModal] = useState(false);

  return (
    <div>
      <CreateProjectModal show={showModal} toggle={setShowModal}/>
      <h2 className="text-muted mt-3 mb-4">Your projects</h2>
      <div className="row row-cols-1 row-cols-md-3">
        <div className="col py-3">
          <div onClick={() => setShowModal(true)} className="btn bg-light card h-100">
            <div className="card-body w-50 d-flex align-items-center m-auto">
              <p className="text-center text-muted card-text">
                <i className="fas fa-calendar-plus mr-2"></i>Start a new project
              </p>
            </div>
          </div>
        </div>
        {state.projects && state.projects.slice(0).reverse().map((project,i) => {
          return (
            <Link
              key={i}
              onClick={() => props.setCurrentProject(i)}
              to='/projectview'
              className="text-dark nav-link p-0"
            >
              <div className="col py-3 h-100">
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{project.title}</h5>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                  </div>
                  <div className="card-footer">
                    <small className="text-muted">Members: {project.creator.username} + {project.members.length-1}</small>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
