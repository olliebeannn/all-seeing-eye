import React from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';

import baseStyles from '../../styles/base.scss';
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
					<Link to={`/movie/${props.id}`}>
						<h1 className="Movie__title">{props.title}</h1>
					</Link>
					<p className="Movie__score">{props.voteAverage}</p>
				</div>
				<LinesEllipsis
					className="Movie__overview"
					text={props.overview}
					maxLine="2"
					ellipsis="..."
					trimRight
					basedOn="letters"
				/>
				<div className="Movie__buttonWrapper">
					<Button className="Button Button--primary">
						Add to Watchlist
					</Button>
					<Button className="Button Button--secondary ml1">
						I've Seen It
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Movie;
