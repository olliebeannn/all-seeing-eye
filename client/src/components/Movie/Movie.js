import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import LinesEllipsis from 'react-lines-ellipsis';
import axios from 'axios';

import baseStyles from '../../styles/base.scss';
import styles from './Movie.scss';
import image from './inception.png';
import * as actions from '../../actions';

import Button from '../Button/Button';

class Movie extends Component {
  generateToastId() {
    return Math.floor(Math.random() * 1000000);
  }

  onAddToWatchlist(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.addToWatchlist(movieId);
    this.props.addToast(movieName, 'add', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);
  }

  onRemoveFromWatchlist(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.removeFromWatchlist(movieId);
    this.props.addToast(movieName, 'remove', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);
  }

  render() {
    const displayWatchlistButton = () => {
      if (this.props.onWatchlist) {
        return (
          // <Button
          // 	className="Button Button--primary"
          // 	click={() => this.onRemoveFromWatchlist(this.props.id)}
          // >
          // 	Remove from Watchlist
          // </Button>
          // <Button
          // 	className="Button Button--primary"
          // 	click={() =>
          // 		this.props.removeFromWatchlist(this.props.id)
          // 	}
          // >
          <Button
            className="Button Button--primary"
            click={() =>
              this.onRemoveFromWatchlist(this.props.id, this.props.title)
            }
          >
            Remove from Watchlist
          </Button>
        );
      } else {
        return (
          // <Button
          // 	className="Button Button--primary"
          // 	click={() => this.onAddToWatchlist(this.props.id)}
          // >
          // 	Add to Watchlist
          // </Button>
          // <Button
          // 	className="Button Button--primary"
          // 	click={() => this.props.addToWatchlist(this.props.id)}
          // >
          <Button
            className="Button Button--primary"
            click={() =>
              this.onAddToWatchlist(this.props.movieId, this.props.title)
            }
          >
            Add to Watchlist
          </Button>
        );
      }
    };

    return (
      <div className="Movie">
        <div className="Movie__poster">
          <img
            src={`https://image.tmdb.org/t/p/original/${this.props.posterURL}`}
            alt="movie poster"
          />
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
            maxLine="3"
            ellipsis="..."
            trimRight
            basedOn="letters"
          />
          <div className="Movie__buttonWrapper">
            {displayWatchlistButton()}
            <Button className="Button Button--secondary ml1">
              I've Seen It
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(Movie);
