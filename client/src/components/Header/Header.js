import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Header.scss';

class Header extends Component {
  renderContent() {
    let headerContent = <li className="Header__item" key="8" />;

    switch (this.props.auth) {
      case null:
        break;
      case false:
        headerContent = (
          <li className="Header__item" key="7">
            <a href="/auth/google">Sign in with Google</a>
          </li>
        );
        break;
      default:
        headerContent = [
          <li className="Header__item Header__tabLink" key="3">
            <NavLink to="/watchlist">Watchlist</NavLink>
          </li>,
          <li className="Header__item Header__tabLink" key="4">
            <NavLink to="/discover">Discover</NavLink>
          </li>,
          <li className="Header__item Header__tabLink" key="5">
            <NavLink to="/seen">Seen</NavLink>
          </li>,
          <li className="Header__item" key="6">
            <a href="/api/logout">Sign Out</a>
          </li>
        ];
    }

    return headerContent;
  }

  render() {
    return (
      <ul className="Header">
        <li className="Header__item Header__menuIcon" key="0">
          <i className="material-icons">menu</i>
        </li>
        <li className="Header__item Header__logo" key="1">
          <img
            src={process.env.PUBLIC_URL + '/images/logo-all-seeing-eye.svg'}
            alt="All Seeing Eye logo"
          />
        </li>
        <li className="Header__item Header__appName" key="2">
          <a href="/watchlist">The All Seeing Eye</a>
        </li>
        {this.renderContent()}
      </ul>
    );
  }
}

function mapStatetoProps({ auth }) {
  return { auth };
}

export default connect(mapStatetoProps)(Header);
