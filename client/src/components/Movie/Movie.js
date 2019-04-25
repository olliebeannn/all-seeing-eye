import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

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
					<h1 className="Movie__title">{props.title}</h1>
					<p className="Movie__score">{props.voteAverage}</p>
				</div>
				<p className="Movie__cast" />
				<LinesEllipsis
					className="Movie__overview"
					text={props.overview}
					maxLine="2"
					ellipsis="..."
					trimRight
					basedOn="letters"
				/>
			</div>
		</div>
	);
};

export default Movie;
