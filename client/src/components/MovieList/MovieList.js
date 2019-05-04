import React, { Component } from 'react';

import Movie from '../Movie/Movie';
import styles from './MovieList.scss';

class MovieList extends Component {
	render() {
		let movieContent = 'Loading...';

		if (this.props.movies && this.props.movies.length > 0) {
			movieContent = [];

			this.props.movies.forEach(movie =>
				movieContent.push(
					<Movie
						id={movie.id}
						title={movie.title}
						voteAverage={movie.vote_average}
						overview={movie.overview}
						key={movie.id}
						onWatchlist={movie.onWatchlist}
						posterURL={movie.poster_path}
						backdropUrl={movie.backdrop_path}
					/>
				)
			);
		}

		return <div className="MovieList">{movieContent}</div>;
	}
}

export default MovieList;
