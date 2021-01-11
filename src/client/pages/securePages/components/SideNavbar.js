import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

const SideNavbar = () => {
  const [active,setActive] = useState(window.location.pathname);

  return (
    <nav className="h-100 position-fixed col-md-3 col-lg-2 d-none d-md-block bg-dark sidebar">
      <h1 className="text-white-50 mt-3 ml-2 fas fa-calendar-check"></h1>
      <ul className="nav flex-column mt-4">
        <li className="nav-item">
          <Link
            onClick={() => setActive('/')}
            className={`btn-dark my-2 rounded-pill nav-link ${active==='/' && 'active'}`}
            to='/'
          >
            <i className="text-white-50 fas fa-home mr-2"></i>Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => setActive('/notifications')}
            className={`btn-dark my-2 rounded-pill nav-link ${active==='/notifications' && 'active'}`}
            to='/notifications'
          >
            <i className="text-white-50 fas fa-bell mr-2"></i>Notifications
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => setActive('/messages')}
            className={`btn-dark my-2 rounded-pill nav-link ${active==='/messages' && 'active'}`}
            to='/messages'
          >
            <i className="text-white-50 fas fa-envelope mr-2"></i>Messages
          </Link>
        </li>
        <li className="nav-item">
          <Link
            onClick={() => setActive('/profile')}
            className={`btn-dark my-2 rounded-pill nav-link ${active==='/profile' && 'active'}`}
            to='/profile'
          >
            <i className="text-white-50 fas fa-user mr-2"></i>Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SideNavbar;
