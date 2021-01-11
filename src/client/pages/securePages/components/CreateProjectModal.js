import React,{ useState } from 'react';
import { Modal,Button } from 'react-bootstrap';
import projectFunctions from '../../../functions/projectFunctions';

const CreateProjectModal = (props) => {
  const { show,toggle } = props;

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

  function onCancel() {
    toggle(false);
    setProjDetails({
      title: '',
      members: ''
    });
  }


  return (
    <Modal show={show} onHide={() => toggle(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Modal title</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form>
          <label>
            Title:
            <input type="text" value={projDetails.title} onChange={handleChange} name="title" />
            <input type="text" value={projDetails.members} onChange={handleChange} name="members" />
          </label>
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button
          onClick={onCancel}
          variant="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={(evt) => projectFunctions.createProject(evt,projDetails,toggle,setProjDetails)}
          variant="primary"
        >
          Create project
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CreateProjectModal;
