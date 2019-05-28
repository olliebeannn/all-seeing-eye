import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import MovieList from '../MovieList/MovieList';
import Spinner from '../Spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';

import './Seen.scss';

class Seen extends Component {
  render() {
    let moviesToDisplay = null;

    let content = <Spinner />;

    if (this.props.seen) {
      if (this.props.seen.length) {
        moviesToDisplay = this.props.seen.filter(movie => movie.onSeen);
        content = <MovieList movies={moviesToDisplay} />;
      } else {
        content = (
          <EmptyList
            text="You haven’t saved anything to your Seen list"
            buttonText="Go to Discover"
            image={process.env.PUBLIC_URL + '/images/seen-empty.png'}
          />
        );
      }
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
