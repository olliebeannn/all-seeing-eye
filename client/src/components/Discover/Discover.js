import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

class Discover extends Component {
	constructor(props) {
		super(props);
		this.state = {
			movies: []
		};
	}

	componentDidMount() {
		axios.get('/api/fetch').then(res => {
			console.log(res.data);
			console.log(res.data.results);

			let movie = _.cloneDeep(
				_.pick(res.data.results[0], [
					'id',
					'title',
					'overview',
					'vote_average',
					'genre_ids'
				])
			);

			console.log(movie);

			let newMoviesState = [...this.state.movies, movie];

			this.setState({
				movies: newMoviesState
			});

			console.log(this.state.movies);
		});
	}

	render() {
		return <div>Discover</div>;
	}
}

export default Discover;
