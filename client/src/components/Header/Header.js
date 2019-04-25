import React, { Component } from 'react';

import styles from './Header.scss';

class Header extends Component {
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
				<li className="Header__item">
					<a href="/auth/google">Sign in with Google</a>
				</li>
			</ul>
		);
	}
}

export default Header;
