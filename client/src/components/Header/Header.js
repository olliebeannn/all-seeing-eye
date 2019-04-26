import React, { Component } from 'react';
import { connect } from 'react-redux';

import styles from './Header.scss';

class Header extends Component {
	renderContent() {
		let loginButton = <li className="Header__item" />;

		switch (this.props.auth) {
			case null:
				break;
			case false:
				loginButton = (
					<li className="Header__item">
						<a href="/auth/google">Sign in with Google</a>
					</li>
				);
				break;
			default:
				loginButton = (
					<li className="Header__item">
						<a href="/api/logout">Sign Out</a>
					</li>
				);
		}

		return loginButton;
	}

	render() {
		return (
			<ul className="Header">
				<li className="Header__item">
					<a href="/">The All Seeing Eye</a>
				</li>
				<li className="Header__item">
					<a href="/watchlist">Watchlist</a>
				</li>
				<li className="Header__item">
					<a href="/discover">Discover</a>
				</li>
				<li className="Header__item">
					<a href="/seen">Seen</a>
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
