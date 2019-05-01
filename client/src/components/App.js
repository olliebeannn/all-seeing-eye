import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import '../styles/reset.css';
import '../styles/base.scss';
import './App.scss';
import Header from './Header/Header';
import Watchlist from './Watchlist/Watchlist';
import Discover from './Discover/Discover';
import MovieDetail from './MovieDetail/MovieDetail';
import Seen from './Seen/Seen';

class App extends Component {
	componentDidMount() {
		console.log('calling fetchUser in app.js');
		this.props.fetchUser();
		console.log('calling fetchWatchlist in app.js');
		this.props.fetchWatchlist();
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<Header />
					<Route path="/watchlist" component={Watchlist} />
					<Route path="/discover" component={Discover} />
					<Route path="/seen" component={Seen} />
					<Route path="/movie/:id" component={MovieDetail} />
				</BrowserRouter>
			</div>
		);
	}
}

export default connect(
	null,
	actions
)(App);
