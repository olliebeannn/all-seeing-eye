import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import * as actions from '../../actions';
import Movie from '../Movie/Movie';

import styles from './Watchlist.scss';

class Watchlist extends Component {
	// Process for displaying movies:
	// After mount, get the updated user (use existing action creator?) to extract their watchlist
	// Call backend API to get movie details for watchlist movies (and put on local state?)
	// Display those via movie components
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		movies: []
	// 	};
	// }

	componentDidMount() {
		// Update the state of auth if it's changed since login
		// Maybe unnecessary or not the right place?
		// this.props.fetchUser();
		// axios.get('/api/watchlist/fetch').then(res => {
		// 	// console.log(res);
		//
		// 	const selectedAttributes = [
		// 		'id',
		// 		'title',
		// 		'overview',
		// 		'vote_average',
		// 		'genre_ids',
		// 		'onWatchlist'
		// 	];
		//
		// 	let newMoviesState = [];
		//
		// 	res.data.forEach(movie => {
		// 		newMoviesState.push(
		// 			_.cloneDeep(_.pick(movie, selectedAttributes))
		// 		);
		// 	});
		//
		// 	this.setState({
		// 		movies: newMoviesState
		// 	});
		// });
	}

	render() {
		let movieContent = 'Loading...';

		// if (this.state.movies.length > 0) {
		// 	movieContent = [];
		//
		// 	this.state.movies.forEach(movie =>
		if (this.props.watchlist && this.props.watchlist.length > 0) {
			movieContent = [];

			this.props.watchlist.forEach(movie => {
				if (movie.onWatchlist) {
					movieContent.push(
						<Movie
							id={movie.id}
							title={movie.title}
							voteAverage={movie.vote_average}
							overview={movie.overview}
							key={movie.id}
							onWatchlist={movie.onWatchlist}
						/>
					);
				}
			});
		}

		return (
			<div className="Watchlist">
				<div className="Watchlist__container">{movieContent}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		auth: state.auth,
		watchlist: state.watchlist
	};
}

export default connect(
	mapStateToProps,
	actions
)(Watchlist);
