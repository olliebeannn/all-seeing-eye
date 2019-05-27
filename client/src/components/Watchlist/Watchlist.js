import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import * as actions from '../../actions';
import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import Spinner from '../Spinner/Spinner';

import styles from './Watchlist.scss';

class Watchlist extends Component {
  render() {
    let moviesToDisplay = null;

    let content = <Spinner />;

    if (this.props.watchlist) {
      moviesToDisplay = this.props.watchlist.filter(movie => movie.onWatchlist);
      content = <MovieList movies={moviesToDisplay} />;
    }

    return <div className="Watchlist">{content}</div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    watchlist: state.watchlist
  };
}

export default connect(
  mapStateToProps,
  actions
)(Watchlist);
