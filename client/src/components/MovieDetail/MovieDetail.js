import React, { Component } from 'react';
import axios from 'axios';

import '../../styles/base.scss';
import './MovieDetail.scss';

class MovieDetail extends Component {
	componentDidMount() {
		const movieId = this.props.match.params.id;
		console.log(movieId);

		axios.get(`/api/movie_detail/${movieId}`).then(res => {
			console.log(res.data);

			const director = res.data.credits.crew.filter(
				crewMem =>
					crewMem.department === 'Directing' &&
					crewMem.job === 'Director'
			);

			console.log(director);
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
