import React from 'react';
import { NavLink } from 'react-router-dom';

import './MobileMenu.scss';

const MobileMenu = props => {
  return (
    <div className="MobileMenu">
      <ul>
        <li className="MobileMenu__close" onClick={props.click}>
          Close Menu
        </li>
        <li>
          <NavLink to="/watchlist">Watchlist</NavLink>
        </li>
        <li>
          <NavLink to="/discover">Discover</NavLink>
        </li>
        <li>
          <NavLink to="/seen">Seen</NavLink>
        </li>
        <li className="MobileMenu__logout">
          <a href="/api/logout">Log out</a>
        </li>
      </ul>
    </div>
  );
};

export default MobileMenu;
