import React, { Component } from 'react';

import Movie from '../Movie/Movie';
import './MovieList.scss';

class MovieList extends Component {
  render() {
    // let movieContent = 'Loading...';
    let movieContent = ' ';

    if (this.props.movies && this.props.movies.length > 0) {
      movieContent = [];

      this.props.movies.forEach(movie =>
        movieContent.push(
          <Movie
            key={movie.movieId}
            movieId={movie.movieId}
            title={movie.title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
            onWatchlist={movie.onWatchlist}
            onSeen={movie.onSeen}
            posterURL={movie.poster_path}
            backdropUrl={movie.backdrop_path}
          />
        )
      );
    }

    return <div className="MovieList">{movieContent}</div>;
  }
}

export default MovieList;
