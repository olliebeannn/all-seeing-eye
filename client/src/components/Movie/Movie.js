import React from 'react';
import LinesEllipsis from 'react-lines-ellipsis';

import styles from './Movie.scss';
import image from './inception.png';

import Button from '../Button/Button';

const Movie = props => {
	return (
		<div className="Movie">
			<div className="Movie__poster">
				<img src={image} alt="movie poster" />
			</div>
			<div className="Movie__content">
				<div className="Movie__firstLine">
					<h1 className="Movie__title">
						{props.title}
						<span className="Movie__yearDirector">
							(2010, Dir: Ridley Scott)
						</span>
					</h1>
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
				<div className="Movie__buttonWrapper">
					<Button type="primary">Add to Watchlist</Button>
					<Button type="secondary">I've Seen It</Button>
				</div>
			</div>
		</div>
	);
};

export default Movie;
