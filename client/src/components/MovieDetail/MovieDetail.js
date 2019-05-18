import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';

import '../../styles/base.scss';
import './MovieDetail.scss';
import image from './inception.png';
import selectedDetailAttributes from '../../utils/selectedDetailAttributes';

import Button from '../Button/Button';

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

    const displayContent = () => {
      let content = <div className="MovieDetail">Loading...</div>;

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
      }

      return content;
    };

    return (
      <div className="MovieDetail__wrapper">
        <Link to="/discover">← Back</Link>
        {displayContent()}
      </div>
    );
  }
}

export default MovieDetail;
