import React from 'react';
import { Navbar,Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const MobileNavbar = () => {

  return (
    <Navbar className='d-md-none' sticky="top"  bg="dark" variant="dark" expand="lg">
      <Navbar.Brand><h1 className="text-white-50 ml-2 fas fa-calendar-check"></h1></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link className='mx-3 nav-link' to='/'>Home</Link>
          <Link className='mx-3 nav-link' to='/notifications'>Notifications</Link>
          <Link className='mx-3 nav-link' to='/messages'>Messages</Link>
          <Link className='mx-3 nav-link' to='/profile'>Profile</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MobileNavbar;
