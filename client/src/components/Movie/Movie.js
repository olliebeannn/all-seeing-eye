import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LinesEllipsis from 'react-lines-ellipsis';
import axios from 'axios';

import baseStyles from '../../styles/base.scss';
import styles from './Movie.scss';
import image from './inception.png';

import Button from '../Button/Button';

class Movie extends Component {
	onAddToWatchlist(movieId) {
		console.log('movieId', movieId);

		axios
			.post('/api/watchlist/update', {
				movieId: movieId,
				action: 'add'
			})
			.then(res => console.log(res));
	}

	render() {
		return (
			<div className="Movie">
				<div className="Movie__poster">
					<img src={image} alt="movie poster" />
				</div>
				<div className="Movie__content">
					<div className="Movie__firstLine">
						<Link to={`/movie/${this.props.id}`}>
							<h1 className="Movie__title">{this.props.title}</h1>
						</Link>
						<p className="Movie__score">{this.props.voteAverage}</p>
					</div>
					<LinesEllipsis
						className="Movie__overview"
						text={this.props.overview}
						maxLine="2"
						ellipsis="..."
						trimRight
						basedOn="letters"
					/>
					<div className="Movie__buttonWrapper">
						<Button
							className="Button Button--primary"
							click={() => this.onAddToWatchlist(this.props.id)}
						>
							Add to Watchlist
						</Button>
						<Button className="Button Button--secondary ml1">
							I've Seen It
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Movie;
