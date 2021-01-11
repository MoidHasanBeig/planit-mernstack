import React from 'react';
import { useStateContext } from '../../stateManagement/context';

const ProjectView = (props) => {
  const { currentProject } = props;
  const { state } = useStateContext();
  return (
    <div>
      {state.projects && state.projects[state.projects.length - currentProject - 1].title}
    </div>
  );
}

export default ProjectView;
