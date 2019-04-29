import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import styles from './Discover.scss';

import Movie from '../Movie/Movie';

class Discover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		};
	}

	componentDidMount() {
		axios.get('/api/discover/fetch').then(res => {
			console.log(res);

			const selectedAttributes = [
				'id',
				'title',
				'overview',
				'vote_average',
				'genre_ids',
				'onWatchlist'
			];

			let newMoviesState = [...this.state.movies];

			res.data.forEach(movie => {
				newMoviesState.push(
					_.cloneDeep(_.pick(movie, selectedAttributes))
				);
			});

			this.setState({
				movies: newMoviesState
			});
		});
	}

	render() {
		let movieContent = 'Loading...';

		if (this.state.movies.length > 0) {
			movieContent = [];

			this.state.movies.forEach(movie =>
				movieContent.push(
					<Movie
						id={movie.id}
						title={movie.title}
						voteAverage={movie.vote_average}
						overview={movie.overview}
						key={movie.id}
						onWatchlist={movie.onWatchlist}
					/>
				)
			);
		}

		return (
			<div className="Discover">
				<div className="MovieContainer">{movieContent}</div>
			</div>
		);
	}
}

export default Discover;
