import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';
import MovieList from '../MovieList/MovieList';

import styles from './Seen.scss';

class Seen extends Component {
  render() {
    return (
      <div className="Seen">
        <MovieList movies={this.props.seen} />
      </div>
    );
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
