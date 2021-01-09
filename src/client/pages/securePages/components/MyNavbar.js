import React from 'react';
import { Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

import { useStateContext } from '../../../stateManagement/context';

const MyNavbar = () => {
  const { state } = useStateContext();

  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand>Plan it!</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className='nav-link' to='/'>Home</Link>
          <Link className='nav-link' to='/notifications'>Notifications</Link>
          <Link className='nav-link' to='/messages'>Messages</Link>
        </Nav>
        <Link className='nav-link' to='/profile'>
          <img src={state.image} width="30" height="30"></img>
        </Link>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;
