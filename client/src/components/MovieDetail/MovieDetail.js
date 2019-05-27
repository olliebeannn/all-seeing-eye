import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import * as actions from '../../actions';

import '../../styles/base.scss';
import './MovieDetail.scss';

import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

class MovieDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      movieData: {}
    };
  }

  componentDidMount() {
    const movieId = this.props.match.params.id;

    axios.get(`/api/movie_detail/${movieId}`).then(res => {
      this.setState({
        movieData: res.data
      });
    });
  }

  generateToastId() {
    return Math.floor(Math.random() * 1000000);
  }

  onAddToWatchlist(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.addToWatchlist(movieId);
    this.props.addToast(movieName, 'add_watchlist', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);

    let newMovieData = _.cloneDeep(this.state.movieData);
    newMovieData.onWatchlist = true;

    this.setState({
      movieData: newMovieData
    });
  }

  onRemoveFromWatchlist(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.removeFromWatchlist(movieId);
    this.props.addToast(movieName, 'remove_watchlist', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);

    let newMovieData = _.cloneDeep(this.state.movieData);
    newMovieData.onWatchlist = false;

    this.setState({
      movieData: newMovieData
    });
  }

  onAddToSeen(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.addToSeen(movieId);
    this.props.addToast(movieName, 'add_seen', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);

    let newMovieData = _.cloneDeep(this.state.movieData);
    newMovieData.onSeen = true;

    this.setState({
      movieData: newMovieData
    });
  }

  onRemoveFromSeen(movieId, movieName) {
    const toastId = this.generateToastId();

    this.props.removeFromSeen(movieId);
    this.props.addToast(movieName, 'remove_seen', toastId);
    setTimeout(() => this.props.removeToast(toastId), 5000);

    let newMovieData = _.cloneDeep(this.state.movieData);
    newMovieData.onSeen = false;

    this.setState({
      movieData: newMovieData
    });
  }

  render() {
    const listCast = () => {
      const cast = [];

      this.state.movieData.cast.forEach(castMember => {
        cast.push(castMember.name);
      });

      return cast.join(', ');
    };

    const getReleaseYear = () => {
      return this.state.movieData.release_date.split('-')[0];
    };

    const displayWatchlistButton = () => {
      if (this.state.movieData.title) {
        if (this.state.movieData.onWatchlist) {
          return (
            <Button
              className="Button Button--primary"
              click={() =>
                this.onRemoveFromWatchlist(
                  this.state.movieData.movieId,
                  this.state.movieData.title
                )
              }
            >
              Remove from Watchlist
            </Button>
          );
        } else {
          return (
            <Button
              className="Button Button--primary"
              click={() =>
                this.onAddToWatchlist(
                  this.state.movieData.movieId,
                  this.state.movieData.title
                )
              }
            >
              Add to Watchlist
            </Button>
          );
        }
      }
    };

    const displaySeenButton = () => {
      if (this.state.movieData.title) {
        if (this.state.movieData.onSeen) {
          return (
            <Button
              className="Button Button--secondary ml1"
              click={() =>
                this.onRemoveFromSeen(
                  this.state.movieData.movieId,
                  this.state.movieData.title
                )
              }
            >
              Remove from Seen List
            </Button>
          );
        } else {
          return (
            <Button
              className="Button Button--secondary ml1"
              click={() =>
                this.onAddToSeen(
                  this.state.movieData.movieId,
                  this.state.movieData.title
                )
              }
            >
              I've Seen This
            </Button>
          );
        }
      }
    };

    const displayContent = () => {
      // let content = <div className="MovieDetail">Loading...</div>;
      let content = <Spinner />;

      if (this.state.movieData.title) {
        content = (
          <div className="MovieDetail">
            <div className="MovieDetail__poster">
              <img
                src={`https://image.tmdb.org/t/p/original/${
                  this.state.movieData.poster_path
                }`}
                alt="movie poster"
              />
            </div>
            <div className="MovieDetail__content">
              <div className="MovieDetail__firstLine">
                <h1 className="MovieDetail__title">
                  {this.state.movieData.title}
                  <span className="MovieDetail__year">
                    ({getReleaseYear()})
                  </span>
                </h1>
                <p className="MovieDetail__score">
                  {this.state.movieData.vote_average}
                </p>
              </div>
              <div className="MovieDetail__directorRuntime">
                Director: {this.state.movieData.directorName}, Runtime:{' '}
                {this.state.movieData.runtime} mins
              </div>
              <div className="MovieDetail__cast">Starring: {listCast()}</div>
              <div className="MovieDetail__overview">
                {this.state.movieData.overview}
              </div>
              <div className="MovieDetail__buttonWrapper">
                {displayWatchlistButton()}
                {displaySeenButton()}
              </div>
            </div>
          </div>
        );
      }

      return content;
    };

    return (
      <div className="MovieDetail__wrapper">
        <a href="#" onClick={() => this.props.history.goBack()}>
          ← Back
        </a>
        {displayContent()}
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(MovieDetail);
