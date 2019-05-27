import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import MovieList from '../MovieList/MovieList';
import Spinner from '../Spinner/Spinner';

import styles from './Seen.scss';

class Seen extends Component {
  render() {
    let moviesToDisplay = null;

    let content = <Spinner />;

    if (this.props.seen) {
      moviesToDisplay = this.props.seen.filter(movie => movie.onSeen);
      content = <MovieList movies={moviesToDisplay} />;
    }

    return <div className="Seen">{content}</div>;
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    seen: state.seen
  };
}

export default connect(
  mapStateToProps,
  actions
)(Seen);
