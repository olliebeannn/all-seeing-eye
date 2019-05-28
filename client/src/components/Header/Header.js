import React, { Component } from 'react';
import { connect } from 'react-redux';

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
            <a href="/watchlist">Watchlist</a>
          </li>,
          <li className="Header__item Header__tabLink" key="4">
            <a href="/discover">Discover</a>
          </li>,
          <li className="Header__item Header__tabLink" key="5">
            <a href="/seen">Seen</a>
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
