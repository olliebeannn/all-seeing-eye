import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import '../../styles/base.scss';
import './MovieDetail.scss';

class MovieDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			movieData: {}
		};
	}

	componentDidMount() {
		const movieId = this.props.match.params.id;
		console.log(movieId);

		axios.get(`/api/movie_detail/${movieId}`).then(res => {
			console.log('full data:', res.data);

			const selectedAttributes = [
				'id',
				'title',
				'overview',
				'vote_count',
				'vote_average',
				'release_date',
				'credits',
				'genres',
				'runtime',
				'original_language',
				'credits'
			];

			let movieData = _.cloneDeep(_.pick(res.data, selectedAttributes));

			// Extract director info from credits arrays
			const directorArray = res.data.credits.crew.filter(
				crewMem =>
					crewMem.department === 'Directing' &&
					crewMem.job === 'Director'
			);

			if (directorArray.length > 0) {
				console.log('called!');
				movieData.directorName = directorArray[0].name;
			}

			console.log('movie data:', movieData);

			this.setState({
				movieData: movieData
			});
		});
	}

	render() {
		return (
			<div className="MovieDetail">
				<p>MovieDetail</p>
			</div>
		);
	}
}

export default MovieDetail;
