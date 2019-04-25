import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import '../styles/reset.css';
import '../styles/base.scss';
import './App.scss';
import Header from './Header/Header';
import Watchlist from './Watchlist/Watchlist';
import Discover from './Discover/Discover';
import Seen from './Seen/Seen';

class App extends Component {
	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header />
					<Route path="/watchlist" component={Watchlist} />
					<Route path="/discover" component={Discover} />
					<Route path="/seen" component={Seen} />
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
