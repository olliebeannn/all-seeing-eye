import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import _ from 'lodash';

import styles from './Discover.scss';
import * as actions from '../../actions';

import Movie from '../Movie/Movie';
import MovieList from '../MovieList/MovieList';
import Button from '../Button/Button';

class Discover extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1
    };
  }

  componentDidMount() {
    this.props.loadDiscoverMovies(this.state.currentPage);
  }

  loadMoreMovies = () => {
    let page = this.state.currentPage;

    this.props.loadDiscoverMovies(page + 1);

    this.setState({ currentPage: page + 1 });
  };

  render() {
    let moviesToDisplay = null;

    if (this.props.discoverList) {
      moviesToDisplay = this.props.discoverList.filter(movie => !movie.onSeen);
    }

    return (
      <div className="Discover">
        <MovieList movies={moviesToDisplay} />
        <div className="Discover__loadMore">
          <Button
            className="Button Button--primary"
            click={this.loadMoreMovies}
          >
            Load More...
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ discoverList }) {
  return { discoverList };
}

export default connect(
  mapStateToProps,
  actions
)(Discover);
