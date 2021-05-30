import { NavLink } from 'react-router-dom';

import './Navbar.scss';
const Navbar = () => {
  return (
    <div id="navigation-bar">
      <nav>
        <ul>
          <li>
            <NavLink to="/flares">Map</NavLink>
          </li>
          <li>
            <NavLink to="/tickets">Tickets</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
