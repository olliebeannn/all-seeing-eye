import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import styles from './Discover.scss';
import * as actions from '../../actions';

import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import Button from '../Button/Button';

class Discover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentPage: 1
		};
	}

	componentDidMount() {
		this.props.loadDiscoverMovies(this.state.currentPage);
	}

	loadMoreMovies = () => {
		let page = this.state.currentPage;

		this.props.loadDiscoverMovies(page + 1);

		this.setState({ currentPage: page + 1 });
	};

	render() {
		let movieContent = 'Loading...';

		// if (this.state.movies.length > 0) {
		// 	movieContent = [];
		//
		// 	this.state.movies.forEach(movie =>
		// 		movieContent.push(
		// 			<Movie
		// 				id={movie.id}
		// 				title={movie.title}
		// 				voteAverage={movie.vote_average}
		// 				overview={movie.overview}
		// 				key={movie.id}
		// 				onWatchlist={movie.onWatchlist}
		// 			/>
		// 		)
		// 	);
		// }

		if (this.props.discoverList && this.props.discoverList.length > 0) {
			movieContent = [];

			this.props.discoverList.forEach(movie =>
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

		return (
			<div className="Discover">
				<MovieList movies={this.props.discoverList} />
				<div className="Discover__loadMore">
					<Button
						className="Button Button--primary"
						click={this.loadMoreMovies}
					>
						Load More...
					</Button>
				</div>
			</div>
		);
	}
}

function mapStateToProps({ discoverList }) {
	return { discoverList };
}

export default connect(
	mapStateToProps,
	actions
)(Discover);
