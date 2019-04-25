import React from 'react';

import styles from './Movie.scss';
import image from './inception.png';

const Movie = props => {
	return (
		<div className="Movie">
			<div className="Movie__poster">
				<img src={image} alt="movie poster" />
			</div>
			<div className="Movie__content">
				<div className="Movie__firstLine">
					<p className="Movie__title">{props.title}</p>
					<p className="Movie__score">{props.voteAverage}</p>
				</div>
				<p className="Movie__cast" />
				<p className="Movie__overview">{props.overview}</p>
			</div>
		</div>
	);
};

export default Movie;
